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

#### 4.1.1 Параметры и предусловия
- **`_recipient`** — конечный получатель долей пула. Должен быть менеджером, участником whitelist (если пул приватный) или любым адресом в публичных пулах. Для вызова `depositForWithCustomCooldown` дополнительно проверяется whitelist фабрики, разрешающий передачу пользовательского cooldown.【F:contracts/PoolLogic.sol†L250-L333】【F:contracts/PoolFactory.sol†L128-L135】
- **`_asset`** — адрес депонируемого ERC20. Контракт убеждается, что актив разрешён для депозита (`isDepositAsset`) и не реализует интерфейс ERC721 (NFT), вызывая `supportsInterface` с ограничением по газу. Только активы из списка `supportedAssets` допускаются к внесению.【F:contracts/PoolLogic.sol†L269-L283】【F:contracts/PoolManagerLogic.sol†L189-L207】
- **`_amount`** — количество токенов `_asset`, которое переводится на баланс пула. Для успешного депозита пользователь обязан заранее выставить allowance; фактический перевод выполняется через безопасный `tryAssemblyCall` к `transferFrom`.【F:contracts/PoolLogic.sol†L289-L301】
- **`_cooldown`** — длительность локапа для пользовательской версии депозита. Значение должно находиться в диапазоне `[5 минут; _exitCooldown()]`, иначе операция отклоняется. Стандартные функции (`deposit`, `depositFor`) используют глобальный cooldown из фабрики.【F:contracts/PoolLogic.sol†L250-L333】【F:contracts/PoolFactory.sol†L206-L226】

#### 4.1.2 Формулы выпуска долей
1. До внесения активов пул вызывает `_mintManagerFee()`, чтобы «кристаллизовать» накопленные комиссии и зафиксировать актуальные `fundValue` и `totalSupply`. Это защищает существующих держателей от размывания долей новыми депозитами.【F:contracts/PoolLogic.sol†L285-L288】【F:contracts/PoolLogic.sol†L787-L805】
2. Стоимость входящего актива оценивается как `usdAmount = _assetValue(_asset, _amount)` (USD × 1e18). Если supply уже существует, базовое количество долей рассчитывается пропорционально цене: `liquidityMintedBase = usdAmount * totalSupplyBefore / fundValue`. Для первого депозита (нулевой supply) используется линейная конверсия `liquidityMintedBase = usdAmount`.【F:contracts/PoolLogic.sol†L289-L301】
3. **Entry fee** применяется при положительном `entryFeeNumerator`: `entryFee = liquidityMintedBase * entryFeeNumerator / denominator`. Комиссия минтится менеджеру, после чего инвестор получает `liquidityMinted = liquidityMintedBase - entryFee`. Комиссия выплачивается исключительно в токенах пула и не уменьшает объём активов под управлением.【F:contracts/PoolLogic.sol†L303-L314】
4. Прежде чем минтить доли инвестору, контракт проверяет ограничение `liquidityMinted ≥ 100000`, предотвращая атаки инфляции через микродепозиты и обеспечивая стабильность расчётов. Только после этого `_recipient` получает новые токены пула.【F:contracts/PoolLogic.sol†L316-L323】

#### 4.1.3 Побочные эффекты и события
- После выпуска долей пересчитываются `lastExitCooldown` и `lastDeposit` для адреса инвестора, учитывая сумму нового выпуска и выбранный cooldown. Это позволяет системе корректно блокировать быстрые выводы после депозита.【F:contracts/PoolLogic.sol†L325-L333】
- Проверка `minDepositUSD` гарантирует, что совокупная стоимость долей пользователя после операции не опускается ниже минимального порога, заданного менеджером. Нарушение условия приводит к отмене транзакции, что защищает пулы с KYC/AML-требованиями от дробления долей.【F:contracts/PoolLogic.sol†L335-L345】【F:contracts/PoolManagerLogic.sol†L221-L247】
- Событие `Deposit` логирует актив, сумму в USD, количество выпущенных долей, итоговый баланс инвестора и обновлённое значение `fundValue`. Если комиссия взималась, параллельно эмитится `EntryFeeMinted`. В завершение вызывается `_emitFactoryEvent()` для синхронизации с фабрикой пула.【F:contracts/PoolLogic.sol†L313-L362】
- Итоговая стоимость пула увеличивается ровно на `usdAmount`, поскольку entry fee выплачивается за счёт дополнительных токенов, а не из депонированного актива.【F:contracts/PoolLogic.sol†L335-L345】

### 4.2 Вывод (`withdraw`, `withdrawTo`, `withdrawSafe`, `withdrawToSafe` → `_withdrawTo`)

#### 4.2.1 Параметры и режимы
- **`_recipient`** — адрес получателя активов. В `withdraw` и `withdrawSafe` равен `msg.sender`, в `withdrawTo`/`withdrawToSafe` задаётся явно. Безопасные версии требуют массив `ComplexAsset[]` для точного закрытия внешних позиций и контроля проскальзывания.【F:contracts/PoolLogic.sol†L364-L410】
- **`_fundTokenAmount`** — количество долей, списываемых с пользователя. Перед выполнением проверяется право на вывод (`lastDeposit[msg.sender] < block.timestamp`), достаточность баланса и минимальный остаток supply (`supplyAfterBurn ≥ 100000` либо полный выход). Эти проверки предотвращают ранние выводы и защищают от манипуляций supply.【F:contracts/PoolLogic.sol†L417-L429】
- **`_complexAssetsData`** — массив структур с адресом актива, пользовательскими `withdrawData` и `slippageTolerance`. Его длина должна совпадать с количеством поддерживаемых активов; для простых активов элементы могут быть пустыми структурами.【F:contracts/PoolLogic.sol†L387-L471】

#### 4.2.2 Расчёт комиссий и пропорций
1. Пул вызывает `_mintManagerFee()`, чтобы начислить накопленные performance/streaming fees и получить свежие значения `fundValue` и `feesMinted`. Это выравнивает high-water mark и защищает оставшихся инвесторов от размывания при выходе крупного участника.【F:contracts/PoolLogic.sol†L431-L433】【F:contracts/PoolLogic.sol†L793-L809】
2. **Exit fee**: `exitFee = requestedAmount * exitFeeNumerator / denominator`. Комиссия удерживается из `_fundTokenAmount`, а `execution.supplyAfterBurn` увеличивается на ту же величину, чтобы итоговый supply учитывал выпуск комиссии менеджеру. Комиссионные токены переводятся менеджеру (`transfer`), а событие `ExitFeeMinted` фиксирует объём комиссии.【F:contracts/PoolLogic.sol†L434-L448】
3. После учёта комиссии вычисляется доля портфеля: `portion = netFundTokenAmount * 1e18 / totalSupply()`. Именно она используется для пропорционального списания активов и расчёта USD-стоимости вывода `valueWithdrawn = portion * fundValue / 1e18`. При полном выходе (`totalSupply() == 0`) high-water mark сбрасывается к `1e18`, что предотвращает «залипание» прошлых максимумов.【F:contracts/PoolLogic.sol†L451-L459】【F:contracts/PoolLogic.sol†L497-L504】

#### 4.2.3 Обработка активов и инварианты
- Каждый поддерживаемый актив проходит через `_withdrawProcessing`, который может выполнить дополнительную логику (погашение долга, разбор позиций) и вернуть фактическую сумму к отправке и флаг внешней обработки. Для ERC20 активов без сложностей функция просто рассчитывает пропорциональный баланс и переводит его получателю.【F:contracts/PoolLogic.sol†L461-L488】
- После завершения цикла массив `WithdrawnAsset[]` урезается до фактически выведенных позиций и включается в событие `Withdrawal` — это облегчает фронтенду отображение структуры выхода.【F:contracts/PoolLogic.sol†L481-L517】
- Два инварианта защищают корректность состояния: разница между прежней и новой стоимостью пула не может превышать оценку выведенной доли (с допуском 1e15), а сумма `execution.supplyAfterBurn + execution.feesMinted` должна совпадать с текущим `totalSupply()`. Нарушение любого условия приводит к откату транзакции.【F:contracts/PoolLogic.sol†L499-L505】

#### 4.2.4 События и дополнительные эффекты
- Событие `Withdrawal` публикует стоимость вывода, количество сожжённых долей, остаток на балансе получателя и список активов, что облегчает построение отчётности и проверку комиссий. Если начислялась exit fee, событие `ExitFeeMinted` фиксирует её объём. При полном обнулении supply переменная `tokenPriceAtLastFeeMint` принудительно сбрасывается до 1e18.【F:contracts/PoolLogic.sol†L434-L517】【F:contracts/PoolLogic.sol†L455-L459】

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

## 9. Справочник функций, переменных и формул

### 9.1 Публичные функции PoolLogic
- **`tokenPrice()`** — цена доли, учитывающая виртуальный выпуск manager fee. Использует `_availableManagerFee` и `_tokenPrice`, чтобы добавить к `totalSupply` ожидаемые токены комиссии перед делением стоимости на supply.【F:contracts/PoolLogic.sol†L704-L726】
- **`tokenPriceWithoutManagerFee()`** — диагностическая цена без учёта невыплаченных комиссий; может отличаться от фактической стоимости доли и не предназначена для пользовательских интерфейсов.【F:contracts/PoolLogic.sol†L713-L717】
- **`calculateAvailableManagerFee(uint256 fundValue)`** — возвращает потенциальный выпуск токенов комиссии в случае немедленного `mintManagerFee()`. Используется для отображения «не начисленных» комиссий во фронтенде.【F:contracts/PoolLogic.sol†L728-L744】
- **`mintManagerFee()`** — начисляет performance и streaming fee, распределяет долю DAO/менеджера, обновляет `tokenPriceAtLastFeeMint` и `lastFeeMintTime`, возвращает `(fundValue, amountMinted)`. Доступна любому адресу при незаблокированном пуле.【F:contracts/PoolLogic.sol†L779-L820】
- **`deposit` / `depositFor` / `depositForWithCustomCooldown`** — публичные фасады для `_depositFor` с различными наборами параметров (получатель, кастомный cooldown). Возвращают количество токенов, выпущенных инвестору.【F:contracts/PoolLogic.sol†L230-L333】
- **`withdraw` / `withdrawTo`** — устаревшие фасады `_withdrawTo`, сохраняемые для обратной совместимости (без обработки сложных активов). Рекомендуется переходить на безопасные варианты.【F:contracts/PoolLogic.sol†L364-L385】
- **`withdrawSafe` / `withdrawToSafe`** — современные фасады `_withdrawTo`, принимающие массив `ComplexAsset[]` для детальной конфигурации вывода и ограничения проскальзывания по каждому активу.【F:contracts/PoolLogic.sol†L387-L410】

### 9.2 Ключевые внутренние функции
- **`_availableManagerFee(...)`** — чистый расчёт `(performanceFee, streamingFee)` в токенах пула по текущим ставкам и состоянию. Применяется как внутри `_mintManagerFee()`, так и при расчёте `tokenPrice()`.【F:contracts/PoolLogic.sol†L748-L777】
- **`_mintManagerFee()`** — агрегирует стоимость пула, ставки комиссий, вызывает `_availableManagerFee`, распределяет долю DAO (`daoFee`) и менеджера, обновляет high-water mark и таймштамп, эмитит `ManagerFeeMinted`. 【F:contracts/PoolLogic.sol†L787-L820】
- **`_managerFees()`** — локальный геттер, возвращающий текущие числители/знаменатель комиссий из `PoolManagerLogic`. Используется во всех местах, где требуется актуальная ставка (депозиты, выводы, минт комиссий).【F:contracts/PoolLogic.sol†L891-L916】
- **`_tokenPrice(fundValue, tokenSupply)`** — расчёт цены доли без учёта виртуальных комиссий. Применяется в проверках (`minDepositUSD`) и при обновлении `tokenPriceAtLastFeeMint`.【F:contracts/PoolLogic.sol†L720-L726】
- **`_withdrawProcessing(...)`** — универсальная обработка вывода для каждого поддерживаемого актива: закрытие внешних позиций, расчёт пропорции, ограничение проскальзывания. Возвращает фактический баланс и флаг внешней обработки для события `Withdrawal`.【F:contracts/PoolLogic.sol†L465-L488】【F:contracts/PoolLogic.sol†L520-L581】

### 9.3 Переменные и константы
- **`performanceFeeNumerator`, `managerFeeNumerator`, `entryFeeNumerator`, `exitFeeNumerator`** — текущие ставки, управляемые `PoolManagerLogic`. Их значения ограничены максимумами фабрики (`_MANAGER_FEE_DENOMINATOR`). Изменяются через `setFeeNumerator`, `announceFeeIncrease`/`commitFeeIncrease`.【F:contracts/PoolManagerLogic.sol†L344-L514】【F:contracts/PoolFactory.sol†L333-L380】
- **`maximumPerformanceFeeNumeratorChange`, `performanceFeeNumeratorChangeDelay`** — глобальные параметры фабрики, ограничивающие шаг и задержку повышения performance fee. Применяются при анонсе и коммите новых ставок. 【F:contracts/PoolFactory.sol†L120-L122】【F:contracts/PoolManagerLogic.sol†L432-L507】
- **`tokenPriceAtLastFeeMint`** — high-water mark цены токена, обновляется только при успешном `_mintManagerFee()` и сбрасывается при полном выходе инвесторов (`totalSupply == 0`). Определяет, начисляется ли performance fee.【F:contracts/PoolLogic.sol†L147-L189】【F:contracts/PoolLogic.sol†L806-L809】【F:contracts/PoolLogic.sol†L455-L459】
- **`lastFeeMintTime`** — последний момент начисления streaming fee. Используется в `_availableManagerFee` для расчёта временного интервала и обновляется только при ненулевой комиссии, чтобы избежать накопления ошибки. 【F:contracts/PoolLogic.sol†L155-L188】【F:contracts/PoolLogic.sol†L772-L814】
- **`lastDeposit`, `lastExitCooldown`** — карты адресов к временным меткам и пользовательским cooldown. Обновляются в `_depositFor` и проверяются в `_withdrawTo`, обеспечивая соблюдение локапов. 【F:contracts/PoolLogic.sol†L325-L361】【F:contracts/PoolLogic.sol†L417-L433】
- **`_daoFeeNumerator`, `_daoFeeDenominator`** — доля DAO в менеджерских комиссиях, задаваемая владельцем фабрики и применяемая при каждом `_mintManagerFee()`. Значение по умолчанию — 10 % (10/100).【F:contracts/PoolFactory.sol†L308-L329】【F:contracts/PoolLogic.sol†L802-L818】

### 9.4 Основные формулы (USD × 1e18, токены × 1e18)
- **Performance fee (USD)**: `feeUsdAmount = max(currentPrice - tokenPriceAtLastFeeMint, 0) * totalSupply / 1e18 * performanceFeeNumerator / denominator`. Конвертация в токены: `performanceFee = feeUsdAmount * totalSupply / (fundValue - feeUsdAmount)` — сохраняет неизменной цену доли после выпуска.【F:contracts/PoolLogic.sol†L763-L770】
- **Streaming fee (токены)**: `streamingFee = totalSupply * (block.timestamp - lastFeeMintTime) * managerFeeNumerator / denominator / 365 days`. Если `lastFeeMintTime == 0`, комиссия не начисляется до первой фиксации времени.【F:contracts/PoolLogic.sol†L772-L776】
- **Entry fee (токены)**: `entryFee = liquidityMintedBase * entryFeeNumerator / denominator`. Инвестор получает `liquidityMintedBase - entryFee`, комиссия выплачивается токенами пула менеджеру.【F:contracts/PoolLogic.sol†L303-L323】
- **Exit fee (токены)**: `exitFee = requestedAmount * exitFeeNumerator / denominator`. Комиссия удерживается в токенах пула, supply корректируется обратно, чтобы сохранить цену доли.【F:contracts/PoolLogic.sol†L434-L448】
- **Стоимость вывода**: `valueWithdrawn = portion * fundValue / 1e18`, где `portion = netFundTokenAmount * 1e18 / totalSupply()`. Формула используется в инвариантах и событии `Withdrawal`.【F:contracts/PoolLogic.sol†L451-L517】

Эта спецификация охватывает все сценарии начисления комиссий в текущей версии `PoolLogic` и сопряжённых контрактах, описывая последовательность действий и формулы, необходимые для точного моделирования финансовых потоков.
