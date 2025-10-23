# Спецификация расчёта комиссий в пулах dHEDGE (PoolLogic)

## 1. Источники параметров комиссий

### 1.1 Глобальные лимиты и доля DAO (PoolFactory)
- **Максимальные значения для комиссий**: `PoolFactory` хранит верхние пределы для `performanceFeeNumerator`, `managerFeeNumerator`, `entryFeeNumerator`, `exitFeeNumerator` и общий знаменатель `_MANAGER_FEE_DENOMINATOR`. Значения проверяются на то, что они не превышают знаменатель, и распространяются на все пулы. По умолчанию установлено соотношение `5000 / 10000` (50 %) для performance fee, `300 / 10000` (3 %) для management fee, `100 / 10000` (1 %) для entry/exit fee. `10000` выступает в роли «базисного знаменателя» (аналог 100 % = 10000).【F:contracts/PoolFactory.sol†L165-L170】【F:contracts/PoolFactory.sol†L369-L396】
- **DAO fee**: параметры `_daoFeeNumerator` и `_daoFeeDenominator` задаются владельцем фабрики и ограничиваются условием `numerator ≤ denominator`. Значение по умолчанию — `10 / 100` (10 % от начисленных manager fees).【F:contracts/PoolFactory.sol†L311-L328】
- **Доступ из пула**: `PoolFactory.getMaximumFee()` и `PoolFactory.getDaoFee()` вызываются из `PoolLogic`/`PoolManagerLogic`, чтобы получить актуальные лимиты и долю DAO при каждом расчёте.【F:contracts/PoolFactory.sol†L339-L347】【F:contracts/PoolFactory.sol†L327-L328】

### 1.2 Настройки менеджера (PoolManagerLogic)
- **Хранимые ставки**: для каждого пула `PoolManagerLogic` содержит текущие `performanceFeeNumerator`, `managerFeeNumerator`, `entryFeeNumerator`, `exitFeeNumerator` (тип `uint256`, измерение — доли от `_MANAGER_FEE_DENOMINATOR`).【F:contracts/PoolManagerLogic.sol†L74-L99】【F:contracts/PoolManagerLogic.sol†L352-L362】
- **Получение ставок**: функция `getFee()` возвращает четыре числителя и общий знаменатель. Именно эти значения использует `PoolLogic` для расчёта комиссий. `PoolManagerLogic` также агрегирует их в `FundSummary`, который может запрашиваться фронтом.【F:contracts/PoolManagerLogic.sol†L352-L362】【F:contracts/PoolLogic.sol†L675-L701】
- **Изменение ставок**:
  - Мгновенное уменьшение: `setFeeNumerator()` допускает снижение любого числителя, при этом выполняется проверка на максимум из фабрики.【F:contracts/PoolManagerLogic.sol†L344-L366】
  - Увеличение: `announceFeeIncrease()` фиксирует новые значения и задержку (`performanceFeeNumeratorChangeDelay` из фабрики). Требования: новые числители ≤ максимумов и, дополнительно, прирост `performanceFeeNumerator` ≤ `maximumPerformanceFeeNumeratorChange`. После задержки `commitFeeIncrease()` сначала вызывает `PoolLogic.mintManagerFee()` (чтобы «кристаллизовать» комиссии по старой ставке), а затем применяет новые значения. Менеджер может отменить объявление через `renounceFeeIncrease()`. Вся логика сопровождается событиями и защищена проверками владельца пула.【F:contracts/PoolManagerLogic.sol†L432-L514】

## 2. Ключевые состояния в PoolLogic
- `tokenPriceAtLastFeeMint` (`uint256`, 18 знаков после запятой): high-water mark цены токена пула. Инициализируется как `1e18`, обновляется при каждом успешном `_mintManagerFee()` до актуальной цены, если цена выросла, и сбрасывается в `1e18`, когда `totalSupply()` обнуляется при полном выходе инвесторов.【F:contracts/PoolLogic.sol†L147-L189】【F:contracts/PoolLogic.sol†L806-L809】【F:contracts/PoolLogic.sol†L457-L459】
- `lastFeeMintTime` (`uint256`, UNIX-время): момент последнего начисления manager fee. Инициализируется в конструкторе и обновляется только если начисленная streaming fee (`manager` fee) > 0, чтобы избежать систематической потери из-за округления.【F:contracts/PoolLogic.sol†L155-L188】【F:contracts/PoolLogic.sol†L812-L814】
- `lastDeposit`, `lastExitCooldown`: используются для блокировок вывода и не влияют на формулы комиссий, но обновляются одновременно с начислением entry/exit fee внутри операций депозита/вывода.【F:contracts/PoolLogic.sol†L325-L345】【F:contracts/PoolLogic.sol†L417-L448】

## 3. Функции расчёта стоимости и комиссий

### 3.1 Цена токена
- `tokenPrice()` возвращает цену в 18‑значной шкале, учитывая ещё не сминченные manager fees: к текущему `totalSupply()` прибавляется гипотетическая сумма токенов, которая была бы создана при вызове `_mintManagerFee()` в текущий момент. Это предотвращает «разводнение» новых вкладчиков, пока комиссии не начислены фактически.【F:contracts/PoolLogic.sol†L704-L710】
- `tokenPriceWithoutManagerFee()` возвращает «сырую» цену без учёта потенциальных комиссий (пригодна для диагностики, но завышает стоимость доли).【F:contracts/PoolLogic.sol†L713-L717】
- Базовая функция `_tokenPrice(fundValue, tokenSupply)` делит суммарную стоимость активов (`totalFundValue`, USD с 18 десятичными) на объём токенов (включая 18 десятичных), возвращая цену с точностью `1e18` (т.е. 1 USD = 1e18). При нулевом supply или стоимости возвращается 0.【F:contracts/PoolLogic.sol†L720-L726】

### 3.2 Доступные к начислению manager fees
- `calculateAvailableManagerFee(fundValue)` — публичная вью-функция. По переданной суммарной стоимости пула рассчитывает ожидаемые performance и streaming fees, используя текущее `totalSupply()` и ставки менеджера. Возвращает сумму токенов, которую можно сминтить при вызове `mintManagerFee()`. Применяется во фронте для отображения «не начисленных» комиссий.【F:contracts/PoolLogic.sol†L728-L744】

### 3.3 Внутренний расчёт `_availableManagerFee`
Функция принимает:
- `_fundValue` (`uint256`, USD × 1e18);
- `_tokenSupply` (`uint256`, количество токенов × 1e18);
- `_performanceFeeNumerator`, `_managerFeeNumerator`, `_feeDenominator` (`uint256`, доли от `_MANAGER_FEE_DENOMINATOR`).

Возвращает пару `(performanceFee, streamingFee)` в токенах пула (18 знаков). Логика:
1. Если `totalSupply` или `fundValue` равны 0 — комиссий нет.【F:contracts/PoolLogic.sol†L754-L762】
2. Вычисляется `currentTokenPrice = _fundValue * 1e18 / _tokenSupply` — актуальная цена доли.【F:contracts/PoolLogic.sol†L763-L765】
3. **Performance fee** начисляется только если `currentTokenPrice > tokenPriceAtLastFeeMint` (новый максимум). Сначала рассчитывается доля прибыли в USD: `feeUsdAmount = (currentTokenPrice - tokenPriceAtLastFeeMint) * _performanceFeeNumerator * _tokenSupply / (_feeDenominator * 1e18)`. Затем эта сумма конвертируется в токены по формуле `performanceFee = feeUsdAmount * _tokenSupply / (_fundValue - feeUsdAmount)`, что обеспечивает неизменность итоговой цены после минтинга (см. пример в разделе 7.1).【F:contracts/PoolLogic.sol†L765-L770】
4. **Streaming fee (management fee)** начисляется пропорционально времени с момента `lastFeeMintTime`. Если переменная ещё не инициализирована (старые пулы), комиссия не начисляется. Формула: `streamingFee = _tokenSupply * timeChange * _managerFeeNumerator / _feeDenominator / 365 days`, где `timeChange = block.timestamp - lastFeeMintTime`. Таким образом, годовая ставка равна `_managerFeeNumerator / _feeDenominator`, начисляемая непрерывно во времени.【F:contracts/PoolLogic.sol†L772-L776】

### 3.4 Минтинг комиссий `_mintManagerFee`
При любом вызове возвращает `(fundValue, amountMinted)`:
1. Снимает текущую оценку пула `fundValue = _totalValue()` и `tokenSupply = totalSupply()`; затем получает ставки через `_managerFees()` (проксирует `PoolManagerLogic.getFee()`).【F:contracts/PoolLogic.sol†L787-L793】【F:contracts/PoolLogic.sol†L909-L916】
2. Вызывает `_availableManagerFee(...)` для расчёта `performanceFee` и `streamingFee`, суммирует их в `amountMinted` и делит на долю DAO: `daoFee = amountMinted * daoFeeNumerator / daoFeeDenominator`, `managerFee = amountMinted - daoFee`.【F:contracts/PoolLogic.sol†L793-L805】
3. Обновляет high-water mark: если текущая цена (`_tokenPrice(fundValue, tokenSupply)`) превышает `tokenPriceAtLastFeeMint`, новое значение записывается. Это означает, что performance fee зафиксировал новый максимум. Если цена ниже — переменная не меняется.【F:contracts/PoolLogic.sol†L806-L809】
4. Обновляет `lastFeeMintTime`, но только если `streamingFee > 0`, чтобы исключить «проскакивание» времени из-за округления до нуля.【F:contracts/PoolLogic.sol†L812-L814】
5. Выпускает токены DAO и менеджеру (`_mint()`), если их доля положительна, и эмитит событие `ManagerFeeMinted`. Событие включает суммарную сумму (`available`), долю DAO, долю менеджера и обновлённый high-water mark. После этого вызывается `_emitFactoryEvent()` для удобства off-chain индексации.【F:contracts/PoolLogic.sol†L816-L820】

## 4. Комиссии при действиях пользователей

### 4.1 Депозит (`deposit`, `depositFor`, `depositForWithCustomCooldown` → `_depositFor`)
Порядок действий при каждом депозите:
1. Проверяются права/списки, валидность актива и отсутствие NFT (ERC721) через `supportsInterface`.【F:contracts/PoolLogic.sol†L266-L283】
2. **Перед начислением долей** пул вызывает `_mintManagerFee()` — это гарантирует, что все начисленные ранее комиссии будут сминчены до изменения `totalSupply`. Возвращённое значение `fundValue` используется для рассчёта цены доли до депозита.【F:contracts/PoolLogic.sol†L285-L288】【F:contracts/PoolLogic.sol†L787-L800】
3. Токены переводятся в пул, рассчитывается их стоимость `usdAmount = _assetValue(_asset, _amount)` (USD × 1e18). Затем высчитывается базовое количество долей `liquidityMinted`: если supply > 0 — пропорционально текущей цене, иначе 1:1 к USD (старт пула).【F:contracts/PoolLogic.sol†L289-L301】
4. **Entry fee**: если `entryFeeNumerator > 0`, вычисляется `entryFee = liquidityMinted * entryFeeNumerator / denominator`. Эта сумма минтится менеджеру, а доли инвестора уменьшаются на величину комиссии. Комиссия берётся в токенах пула и не затрагивает активы. Эмитится `EntryFeeMinted`.【F:contracts/PoolLogic.sol†L303-L314】
5. Проводятся проверки на минимальный выпуск (`≥ 100000`), затем доли инвестора минтятся. Обновляются `lastExitCooldown` и `lastDeposit`, рассчитывается баланс и выполняется проверка `minDepositUSD`. Эмитится событие `Deposit`.【F:contracts/PoolLogic.sol†L316-L358】
6. Суммарная стоимость пула увеличивается на `usdAmount` (т.е. актив вносится полностью, entry fee не уменьшает активы внутри пула).【F:contracts/PoolLogic.sol†L335-L345】

### 4.2 Вывод (`withdraw`, `withdrawTo`, `withdrawSafe`, `withdrawToSafe` → `_withdrawTo`)
1. Проверяется истечение cooldown и достаточность долей. Для контроля консистентности рассчитывается `execution.supplyAfterBurn = totalSupply - amount`, с проверкой порога `100000`, если остаток не ноль.【F:contracts/PoolLogic.sol†L417-L429】
2. Перед распределением активов вызывается `_mintManagerFee()` — комиссии за период между депозитом и выводом начисляются заранее.【F:contracts/PoolLogic.sol†L431-L433】
3. **Exit fee**: если заданы ставки, вычисляется `exitFee = fundTokens * exitFeeNumerator / denominator`. Комиссия удерживается из долей выводящего (т.е. `_fundTokenAmount` уменьшается), эквивалентная сумма переводится менеджеру, и эмитится `ExitFeeMinted`. Из-за удержания supply после вычитания возвращается на исходный уровень, чтобы сохранить цену доли.【F:contracts/PoolLogic.sol†L434-L448】
4. Рассчитывается пропорция `portion = _fundTokenAmount * 1e18 / totalSupply()`, сжигаются доли инвестора. Если в результате `totalSupply() == 0`, high-water mark сбрасывается в `1e18`.【F:contracts/PoolLogic.sol†L451-L459】
5. Для каждого поддерживаемого актива рассчитывается доля, выполняется обработка guard’ами и перевод активов пользователю. Поддерживаются сложные сценарии (Aave, flash-loans) через `withdrawProcessing`. Сбор всех выведенных активов отражается в событии `Withdrawal`. Инварианты проверяют соответствие стоимости и supply после комиссий.【F:contracts/PoolLogic.sol†L461-L517】

### 4.3 Прямой вызов `mintManagerFee()`
- Любой желающий (обычно автоматизация или фронт) может вызвать функцию напрямую, если пул не приостановлен. Это начисляет накопленные performance/streaming fees без необходимости депозита/вывода. Комиссии распределяются между менеджером и DAO по текущим ставкам, high-water mark обновляется, `lastFeeMintTime` фиксируется (если ставка management > 0).【F:contracts/PoolLogic.sol†L779-L820】

### 4.4 Обновление ставок комиссий
- При `commitFeeIncrease()` менеджер обязан дождаться задержки и автоматически вызывает `PoolLogic.mintManagerFee()` перед применением новых числителей. Это гарантирует, что высокая water mark и time-based комиссии будут рассчитаны по старым ставкам, исключая ретроспективное применение новых комиссий к прошлому периоду. После commit временные переменные анонса обнуляются.【F:contracts/PoolManagerLogic.sol†L496-L514】

## 5. Поведение `tokenPriceAtLastFeeMint`
- **Инициализация**: `1e18` (т.е. цена 1 USD) при создании пула.【F:contracts/PoolLogic.sol†L183-L189】
- **Обновление**: после `_mintManagerFee()` присваивается текущая цена, если она выше сохранённой. Это реализует high-water mark для performance fee — комиссию можно начислить только при обновлении максимума цены доли. В противном случае значение сохраняется, и следующая попытка начислить performance fee вернёт 0, пока цена не превысит максимум.【F:contracts/PoolLogic.sol†L806-L809】【F:contracts/PoolLogic.sol†L765-L770】
- **Сброс**: при полном обнулении supply (все инвесторы вышли) переменная возвращается к `1e18`, чтобы новый цикл инвестиций стартовал без исторического максимума. Это предотвращает «залипание» высоких отметок после рестарта пула.【F:contracts/PoolLogic.sol†L455-L459】

## 6. События и мониторинг
- `ManagerFeeMinted(pool, manager, available, daoFee, managerFee, tokenPriceAtLastFeeMint)` — основное событие начисления комиссий. `available` совпадает с `amountMinted` (токены пула), `daoFee`/`managerFee` — итоговое распределение, `tokenPriceAtLastFeeMint` — новая high-water mark.【F:contracts/PoolLogic.sol†L124-L131】【F:contracts/PoolLogic.sol†L816-L820】
- `EntryFeeMinted(manager, entryFeeAmount)` и `ExitFeeMinted(manager, exitFeeAmount)` фиксируют моментальные комиссии при депозитах/выводах.【F:contracts/PoolLogic.sol†L135-L137】【F:contracts/PoolLogic.sol†L303-L314】【F:contracts/PoolLogic.sol†L434-L448】
- `Deposit` и `Withdrawal` содержат полную информацию о суммах, долях и таймштампе операции (включая сумму комиссий через `fundTokensReceived`/`fundTokensWithdrawn`). Это позволяет восстановить историю начислений в сочетании с `ManagerFeeMinted`.【F:contracts/PoolLogic.sol†L347-L358】【F:contracts/PoolLogic.sol†L506-L517】

## 7. Примеры расчётов

### 7.1 Performance fee при росте цены
**Условия:**
- `tokenPriceAtLastFeeMint = 1.5e18` (1.50 USD);
- Текущая цена `currentTokenPrice = 1.8e18` (1.80 USD);
- `totalSupply = 1_000_000 * 1e18` (1 000 000 долей);
- `fundValue = 1_800_000 * 1e18` (1.8 M USD);
- `performanceFeeNumerator = 2000`, `feeDenominator = 10000` (20 %).

**Расчёт:**
1. Рост цены: `ΔP = 0.3e18`.
2. Прибыль фонда: `profit = ΔP * totalSupply / 1e18 = 300_000 USD`.
3. Доля менеджера: `feeUsdAmount = profit * 2000 / 10000 = 60_000 USD` (формула из `_availableManagerFee`).【F:contracts/PoolLogic.sol†L765-L769】
4. Конвертация в токены: `performanceFee = feeUsdAmount * totalSupply / (fundValue - feeUsdAmount) ≈ 34_483 токенов`. После минтинга общий supply ≈ 1 034 483, стоимость активов = 1 800 000 USD + 0 (комиссия — выпуск токенов), цена доли остаётся ≈ 1.80 USD. High-water mark обновляется до `1.8e18`.
5. Из этих токенов 10 % (≈ 3 448) отправится на DAO (при DAO fee 10 %), остальное — менеджеру.【F:contracts/PoolFactory.sol†L311-L328】【F:contracts/PoolLogic.sol†L802-L818】

### 7.2 Streaming fee (management fee) за 30 дней
**Условия:**
- `managerFeeNumerator = 300`, `feeDenominator = 10000` (3 % годовых);
- `totalSupply = 1_000_000 * 1e18`;
- С последнего начисления прошло `timeChange = 30 дней`.

**Расчёт:**
`streamingFee = totalSupply * timeChange * 300 / 10000 / 365 days ≈ 1_000_000 * (30/365) * 0.03 ≈ 2_466 токенов`. Эти токены распределятся между DAO и менеджером после вызова `mintManagerFee()`. `lastFeeMintTime` сдвинется на текущий `block.timestamp`, поскольку комиссия > 0.【F:contracts/PoolLogic.sol†L772-L814】

### 7.3 Депозит с entry fee и вывод с exit fee
**Условия:**
- Действующие ставки: `entryFeeNumerator = 100`, `exitFeeNumerator = 50`, `feeDenominator = 10000` (1 % вход, 0.5 % выход).
- Инвестор вносит актив на 100 000 USD при текущем `fundValue = 1 000 000 USD`, `totalSupply = 1_000_000` токенов.

**Депозит:**
1. `_mintManagerFee()` начисляет накопленные комиссии (если были).【F:contracts/PoolLogic.sol†L285-L288】
2. Новые доли до комиссии: `liquidityMinted = 100_000 * 1_000_000 / 1_000_000 = 100_000` токенов.
3. Entry fee = `100_000 * 100 / 10000 = 1_000` токенов → минтятся менеджеру, инвестор получает `99_000` токенов. Активы в пуле увеличиваются на полные 100 000 USD. Событие `EntryFeeMinted` фиксирует 1 000 токенов комиссии.【F:contracts/PoolLogic.sol†L303-L358】

**Вывод 50 000 токенов:**
1. `_mintManagerFee()` начисляет комиссии с момента депозита.【F:contracts/PoolLogic.sol†L431-L433】
2. Exit fee = `50_000 * 50 / 10000 = 250` токенов → переводится менеджеру, объём долей к сжиганию = `49_750`. Supply после сжигания снижается на 49 750, а 250 компенсируют менеджеру (суммарный supply уменьшается на 49 500). Событие `ExitFeeMinted` фиксирует комиссию.【F:contracts/PoolLogic.sol†L434-L448】
3. Инвестор получает активы, пропорциональные `49_750 / totalSupply` после начисления комиссий.【F:contracts/PoolLogic.sol†L451-L517】

## 8. Рекомендации по мониторингу и интеграции
- **Расчёт стоимости доли**: фронтенду следует использовать `tokenPrice()` — она учитывает не начисленные комиссии и даёт корректную оценку стоимости для новых инвесторов.【F:contracts/PoolLogic.sol†L704-L710】
- **Отображение невыплаченных комиссий**: `calculateAvailableManagerFee()` выдаёт общий объём токенов, который будет выпущен при ближайшем `mintManagerFee()`. Для детализации можно повторно вызвать и разобрать `_availableManagerFee` через off-chain симуляцию (контракт сам возвращает сумму без разбивки).【F:contracts/PoolLogic.sol†L728-L744】
- **High-water mark**: храните и отображайте `tokenPriceAtLastFeeMint` как последнюю зафиксированную цену. Новая performance fee не начислится, пока `tokenPrice()` (после корректировки на комиссию) не превысит это значение. Это удобно для объяснения инвесторам, почему в конкретный момент performance fee равна нулю.【F:contracts/PoolLogic.sol†L806-L809】【F:contracts/PoolLogic.sol†L765-L770】
- **События**: для построения отчётности по комиссиям достаточно отслеживать `ManagerFeeMinted`, `EntryFeeMinted`, `ExitFeeMinted`. Сумма комиссий в USD может быть восстановлена через исторические `tokenPrice()` и `fundValue` из `Deposit`/`Withdrawal` событий или через off-chain оценку активов.

Эта спецификация охватывает все сценарии начисления комиссий в текущей версии `PoolLogic` и сопряжённых контрактах, описывая последовательность действий и формулы, необходимые для точного моделирования финансовых потоков.
