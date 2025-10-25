# PoolLogic

Контракт PoolLogic хранит активы инвесторов пула и выпускает долевые токены ERC20, отражающие их долю.
Он принимает депозиты и выводы, синхронизируя количество токенов с общей стоимостью активов пула.
Менеджер инициирует сделки протокола через execTransaction/execTransactions, которые проходят проверки guard.
Менеджерские и DAO комиссии начисляются минтингом долевых токенов через mintManagerFee.

## Состояние
* `privatePool (bool)` — флаг приватного пула, определяет необходимость проверки членства инвестора при депозите и может блокировать вторичный рынок токенов через _beforeTokenTransfer. Меняется менеджером или в initialize.【F:contracts/PoolLogic.sol†L139-L220】
* `creator (address)` — адрес, инициировавший деплой и получивший роль создателя. Используется как метаданные. Задается один раз в initialize.【F:contracts/PoolLogic.sol†L141-L189】
* `creationTime (uint256)` — метка времени создания пула, нужна для фронтенда и отчетности. Устанавливается в initialize и далее не меняется.【F:contracts/PoolLogic.sol†L143-L189】
* `factory (address)` — адрес PoolFactory, через него читаются паузы, guards, DAO информация и whitelist. Меняется только в initialize.【F:contracts/PoolLogic.sol†L145-L361】
* `tokenPriceAtLastFeeMint (uint256)` — цена долевого токена на момент последнего начисления комиссии, используется при расчетах performance fee. Обновляется при депозитах/выводах и mintManagerFee.【F:contracts/PoolLogic.sol†L147-L821】
* `lastDeposit (mapping(address => uint256))` — временная метка последнего депозита инвестора, нужна для расчета кулдауна и проверки немедленного вывода. Обновляется в _depositFor.【F:contracts/PoolLogic.sol†L149-L333】
* `poolManagerLogic (address)` — текущий менеджерский логик-контракт, через него проверяются активы, комиссии и лимиты. Меняется фабрикой или ее владельцем через setPoolManagerLogic.【F:contracts/PoolLogic.sol†L151-L887】
* `lastWhitelistTransfer (mapping(address => uint256))` — резерв под учет whitelist-переводов токенов. В текущей версии не изменяется и служит для будущих ограничений.【F:contracts/PoolLogic.sol†L153-L209】
* `lastFeeMintTime (uint256)` — временная метка последнего стримингового начисления комиссии, влияет на расчет management fee. Обновляется в initialize и mintManagerFee.【F:contracts/PoolLogic.sol†L155-L815】
* `lastExitCooldown (mapping(address => uint256))` — длительность текущего кулдауна на вывод для адреса, обновляется при каждом депозите. Читается при передаче токенов и вычислении оставшегося времени.【F:contracts/PoolLogic.sol†L157-L333】
* Переменные ERC20Upgradeable — общее предложение `_totalSupply` и балансы `_balances`, отражающие количество долевых токенов инвесторов. Меняются только внутренними вызовами `_mint` и `_burn` в депозитах, выводах и начислении комиссий.【F:contracts/PoolLogic.sol†L320-L818】

## Публичные и external функции
### Функции депозита
* `initialize(address _factory, bool _privatePool, string _fundName, string _fundSymbol)`
  * Кто может вызывать: только однократно из Proxy (initializer).
  * Что делает: задает фабрику, приватность, создателя, время создания и стартовые параметры комиссии.
  * Побочные эффекты: устанавливает state переменные, включает ERC20 имя/символ.
  * Важные require / проверки безопасности: модификатор `initializer` предотвращает повторный вызов.【F:contracts/PoolLogic.sol†L169-L189】
* `deposit(address _asset, uint256 _amount)`
  * Кто может вызывать: инвестор; если пул приватный — только член whitelist или сам менеджер.【F:contracts/PoolLogic.sol†L226-L268】
  * Что делает: принимает разрешенный актив, рассчитывает стоимость и минтит новые долевые токены инвестору.
  * Побочные эффекты: увеличивает totalSupply, переводит активы в пул, обновляет lastExitCooldown и lastDeposit, может начислить entry fee менеджеру, триггерит mintManagerFee.【F:contracts/PoolLogic.sol†L269-L361】
  * Важные require / проверки безопасности: проверка на паузы фабрики и пула, whitelist получателя, разрешенный депозитный актив, запрет NFT, минимальный размер ликвидности, проверка минимального депозита в долларах.【F:contracts/PoolLogic.sol†L265-L345】
* `depositFor(address _recipient, address _asset, uint256 _amount)`
  * Кто может вызывать: любой адрес; если пул приватный — получатель должен быть в whitelist или менеджер.【F:contracts/PoolLogic.sol†L236-L268】
  * Что делает: депонирует актив в пользу указанного получателя и минтит долевые токены на него.
  * Побочные эффекты: те же, что у deposit, но для `_recipient`.
  * Важные require / проверки безопасности: те же проверки активов, whitelists и минимального депозита, стандартный кулдаун.【F:contracts/PoolLogic.sol†L236-L361】
* `depositForWithCustomCooldown(address _recipient, address _asset, uint256 _amount, uint256 _cooldown)`
  * Кто может вызывать: адрес из `customCooldownWhitelist` фабрики.【F:contracts/PoolLogic.sol†L248-L255】
  * Что делает: депонирует актив за получателя и задает индивидуальный кулдаун на вывод.
  * Побочные эффекты: минтит долевые токены, обновляет lastExitCooldown с учетом кастомного значения, может начислить entry fee, запускает mintManagerFee.【F:contracts/PoolLogic.sol†L257-L333】
  * Важные require / проверки безопасности: проверка права отправителя, диапазона кулдауна, whitelists, разрешенного актива, NFT запрета, минимальной ликвидности и депозита.【F:contracts/PoolLogic.sol†L254-L345】

### Функции вывода
* `withdraw(uint256 _fundTokenAmount)`
  * Кто может вызывать: инвестор, владеющий долевыми токенами и прошедший кулдаун.【F:contracts/PoolLogic.sol†L367-L517】
  * Что делает: списывает указанное количество долевых токенов, пропорционально возвращает базовые активы и обрабатывает сложные позиции через guard без дополнительной защиты от проскальзывания.
  * Побочные эффекты: уменьшает totalSupply, переводит активы получателю, может начислить exit fee менеджеру, обновляет цену токена при опустошении пула, эмитирует событие Withdrawal.【F:contracts/PoolLogic.sol†L367-L517】
  * Важные require / проверки безопасности: проверка пауз, запрет мгновенного вывода после депозита, достаточный баланс долей, сохранение минимального остатка totalSupply, обязательная обработка guard, инвариант стоимости, проверка slippage для сложных активов, supply mismatch check.【F:contracts/PoolLogic.sol†L416-L505】
* `withdrawTo(address _recipient, uint256 _fundTokenAmount)`
  * Кто может вызывать: инвестор с достаточным балансом после кулдауна.【F:contracts/PoolLogic.sol†L379-L517】
  * Что делает: аналог withdraw, но переводит активы на `_recipient`.
  * Побочные эффекты: уменьшает totalSupply, переводит активы получателю, может начислить exit fee, генерирует Withdrawal.【F:contracts/PoolLogic.sol†L379-L517】
  * Важные require / проверки безопасности: те же, что в withdraw, включая проверку кулдауна и инвариантов.【F:contracts/PoolLogic.sol†L416-L505】
* `withdrawSafe(uint256 _fundTokenAmount, IPoolLogic.ComplexAsset[] memory _complexAssetsData)`
  * Кто может вызывать: инвестор, прошедший кулдаун и имеющий достаточный баланс.【F:contracts/PoolLogic.sol†L393-L517】
  * Что делает: осуществляет вывод с кастомными параметрами для каждого поддерживаемого актива, позволяя указать требования к сложным позициям и допустимую просадку.
  * Побочные эффекты: уменьшает totalSupply, проводит транзакции guard для погашения позиций, переводит активы получателю, может начислить exit fee и обновить tokenPriceAtLastFeeMint.【F:contracts/PoolLogic.sol†L416-L517】
  * Важные require / проверки безопасности: проверяет паузы, кулдаун, баланс долей, минимальный остаток totalSupply, корректность данных guard, лимит проскальзывания, инварианты стоимости и supply mismatch.【F:contracts/PoolLogic.sol†L416-L505】
* `withdrawToSafe(address _recipient, uint256 _fundTokenAmount, IPoolLogic.ComplexAsset[] memory _complexAssetsData)`
  * Кто может вызывать: инвестор после кулдауна и с достаточными долями.【F:contracts/PoolLogic.sol†L404-L517】
  * Что делает: выводит активы на заданный адрес с учетом расширенных параметров по каждому активу.
  * Побочные эффекты: аналог withdrawSafe для другого получателя.
  * Важные require / проверки безопасности: те же проверки пауз, кулдауна, балансов, guard и инвариантов.【F:contracts/PoolLogic.sol†L416-L505】

### Исполнение сделок
* `execTransaction(address to, bytes calldata data)`
  * Кто может вызывать: менеджер, трейдер либо любой адрес, если guard пометил транзакцию как публичную.【F:contracts/PoolLogic.sol†L640-L671】
  * Что делает: направляет вызов к внешнему протоколу или активу от имени пула после согласования с guard.
  * Побочные эффекты: может перемещать активы пула или менять его позиции, эмитирует TransactionExecuted и уведомляет фабрику.【F:contracts/PoolLogic.sol†L642-L655】
  * Важные require / проверки безопасности: проверка глобальной и торговой паузы, запрет нулевого адреса, обязательный guard, проверка whitelist актива, guard txType > 0, проверка прав вызывающего, вызов afterTxGuard для трекинга.【F:contracts/PoolLogic.sol†L604-L653】
* `execTransactions(TxToExecute[] calldata txs)`
  * Кто может вызывать: те же роли, что и для execTransaction на каждый отдельный вызов, поскольку _execTransaction проверяет доступ.【F:contracts/PoolLogic.sol†L669-L672】
  * Что делает: выполняет несколько последовательных операций пула.
  * Побочные эффекты: потенциально перемещает активы и генерирует события для каждой транзакции через внутренний вызов.
  * Важные require / проверки безопасности: применяет те же проверки guard и пауз для каждого элемента через _execTransaction.【F:contracts/PoolLogic.sol†L604-L672】

### Управление пулом
* `setPoolPrivate(bool _privatePool)`
  * Кто может вызывать: только текущий менеджер пула.【F:contracts/PoolLogic.sol†L213-L219】
  * Что делает: включает или выключает приватный режим.
  * Побочные эффекты: обновляет `privatePool`, влияет на проверку членства и передачу токенов, эмитирует событие и уведомляет фабрику.【F:contracts/PoolLogic.sol†L216-L220】
  * Важные require / проверки безопасности: проверка прав менеджера.【F:contracts/PoolLogic.sol†L213-L219】
* `setPoolManagerLogic(address _poolManagerLogic)`
  * Кто может вызывать: фабрика или владелец фабрики.【F:contracts/PoolLogic.sol†L881-L887】
  * Что делает: назначает новый логик-контракт менеджера, меняющий разрешенные активы, комиссии и guard настройки.
  * Побочные эффекты: обновляет `poolManagerLogic`, эмитирует событие для мониторинга.【F:contracts/PoolLogic.sol†L885-L887】
  * Важные require / проверки безопасности: запрещает нулевой адрес, ограничивает вызов владельцем экосистемы.【F:contracts/PoolLogic.sol†L881-L887】

### Расчетные функции для фронтенда
* `getFundSummary()`
  * Кто может вызывать: любой адрес.【F:contracts/PoolLogic.sol†L675-L702】
  * Что делает: возвращает агрегированные данные пула — имя, supply, стоимость, менеджера, комиссии и приватность.
  * Побочные эффекты: нет.
  * Важные require / проверки безопасности: нет, чистое чтение данных через poolManagerLogic.【F:contracts/PoolLogic.sol†L675-L701】
* `tokenPrice()`
  * Кто может вызывать: любой адрес.【F:contracts/PoolLogic.sol†L706-L711】
  * Что делает: рассчитывает цену долевого токена с учетом невыпущенной комиссии менеджера.
  * Побочные эффекты: нет.
  * Важные require / проверки безопасности: нет, чистые вычисления на основе total value и потенциальной комиссии.【F:contracts/PoolLogic.sol†L706-L711】
* `tokenPriceWithoutManagerFee()`
  * Кто может вызывать: любой адрес.【F:contracts/PoolLogic.sol†L715-L717】
  * Что делает: возвращает цену токена без учета невыпущенных комиссий.
  * Побочные эффекты: нет.
  * Важные require / проверки безопасности: нет.【F:contracts/PoolLogic.sol†L715-L717】
* `calculateAvailableManagerFee(uint256 _fundValue)`
  * Кто может вызывать: любой адрес, включая фронтенд.【F:contracts/PoolLogic.sol†L732-L743】
  * Что делает: вычисляет сумму performance и management fee, доступную к выпуску при текущей стоимости.
  * Побочные эффекты: нет.
  * Важные require / проверки безопасности: нет, опирается на данные из poolManagerLogic и состояния fee.【F:contracts/PoolLogic.sol†L732-L743】
* `getExitRemainingCooldown(address _depositor)`
  * Кто может вызывать: любой адрес, включая инвестора для проверки кулдауна.【F:contracts/PoolLogic.sol†L871-L877】
  * Что делает: возвращает оставшееся время до возможности вывода.
  * Побочные эффекты: нет.
  * Важные require / проверки безопасности: нет, простое чтение lastDeposit и lastExitCooldown.【F:contracts/PoolLogic.sol†L871-L877】

### Функции комиссий
* `mintManagerFee()`
  * Кто может вызывать: любой адрес (обычно менеджер или автоматизация).【F:contracts/PoolLogic.sol†L779-L782】
  * Что делает: минтит долевые токены для DAO и менеджера на основании накопленных performance и management fee.
  * Побочные эффекты: увеличивает totalSupply, обновляет `tokenPriceAtLastFeeMint` и `lastFeeMintTime`, переводит часть долей DAO и менеджеру, эмитирует ManagerFeeMinted.【F:contracts/PoolLogic.sol†L787-L821】
  * Важные require / проверки безопасности: проверяет паузы фабрики/пула, использует guards для расчета стоимости, применяет DAO комиссию из фабрики.【F:contracts/PoolLogic.sol†L779-L821】

### Вспомогательные функции
* `executeOperation(address[] calldata assets, uint256[] calldata amounts, uint256[] calldata premiums, address initiator, bytes calldata params)`
  * Кто может вызывать: только Aave Lending Pool, которому соответствует guard, после инициированного flashloan из пула.【F:contracts/PoolLogic.sol†L928-L956】
  * Что делает: выполняет цепочку транзакций, предоставленную guard, для обработки flashloan и проверяет возврат средств с учетом премии.
  * Побочные эффекты: может переводить активы в ходе flashloan, но требует, чтобы баланс после операций покрывал долг, эмитирования нет.
  * Важные require / проверки безопасности: проверяет инициатора, валидность guard и адреса лендинга, а также что после операций баланс ≥ долг + премия (защита от потерь).【F:contracts/PoolLogic.sol†L934-L956】
* `onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data)`
  * Кто может вызывать: ERC721 контракты, защищенные соответствующим guardом фабрики.【F:contracts/PoolLogic.sol†L971-L984】
  * Что делает: разрешает прием NFT в пул, если guard подтверждает корректность передачи.
  * Побочные эффекты: нет, возвращает селектор совместимости.
  * Важные require / проверки безопасности: проверяет, что оператор проходит через guard и верификацию IERC721VerifyingGuard.【F:contracts/PoolLogic.sol†L977-L983】

## Events
* `Deposit(address fundAddress, address investor, address assetDeposited, uint256 amountDeposited, uint256 valueDeposited, uint256 fundTokensReceived, uint256 totalInvestorFundTokens, uint256 fundValue, uint256 totalSupply, uint256 time)` — фронтенд отслеживает каждый депозит, количество долевых токенов и новую стоимость пула.【F:contracts/PoolLogic.sol†L95-L358】
* `Withdrawal(address fundAddress, address investor, uint256 valueWithdrawn, uint256 fundTokensWithdrawn, uint256 totalInvestorFundTokens, uint256 fundValue, uint256 totalSupply, WithdrawnAsset[] withdrawnAssets, uint256 time)` — сигнализирует об успешном выводе, объеме возвращенных активов и обновленном балансе инвестора для офчейн учета.【F:contracts/PoolLogic.sol†L108-L516】
* `TransactionExecuted(address pool, address manager, uint16 transactionType, uint256 time)` — позволяет бэкенду логировать каждую торговую операцию и тип транзакции после проверки guard.【F:contracts/PoolLogic.sol†L120-L654】
* `PoolPrivacyUpdated(bool isPoolPrivate)` — информирует интерфейсы о смене режима приватности пула.【F:contracts/PoolLogic.sol†L122-L219】
* `ManagerFeeMinted(address pool, address manager, uint256 available, uint256 daoFee, uint256 managerFee, uint256 tokenPriceAtLastFeeMint)` — фиксирует выпуск комиссионных долей для DAO и менеджера и облегчает учет вознаграждений.【F:contracts/PoolLogic.sol†L124-L821】
* `PoolManagerLogicSet(address poolManagerLogic, address from)` — уведомляет об обновлении логики менеджера, чтобы фронтенд обновил список активов и правил.【F:contracts/PoolLogic.sol†L133-L887】
* `EntryFeeMinted(address manager, uint256 entryFeeAmount)` — позволяет отследить, какую комиссию менеджер получил при депозите.【F:contracts/PoolLogic.sol†L135-L314】
* `ExitFeeMinted(address manager, uint256 exitFeeAmount)` — фиксирует удержанную комиссию при выводе для отчетности и аналитики.【F:contracts/PoolLogic.sol†L137-L448】

## Безопасность и контроль доступа
PoolManager и трейдер могут перемещать активы пула только через execTransaction/execTransactions, и каждая операция должна быть одобрена соответствующим guard, который задает тип транзакции и опционально отслеживает ее.【F:contracts/PoolLogic.sol†L604-L655】
Владелец фабрики может приостановить контракты или конкретный пул, а также торговлю, что блокирует депозиты, выводы и исполнение сделок за счет модификаторов whenNotFactoryPaused/whenNotPaused и проверки tradingPausedPools.【F:contracts/PoolLogic.sol†L159-L166】【F:contracts/PoolLogic.sol†L604-L605】
Комиссии начисляются через mintManagerFee — контракт рассчитывает доступные суммы, минтит долевые токены и распределяет их между DAO и менеджером, размывая доли инвесторов по прозрачной формуле.【F:contracts/PoolLogic.sol†L787-L821】
Инвесторов защищают кулдаун на вывод, whitelist приватного пула, проверки разрешенных активов через poolManagerLogic, лимиты минимального депозита, а также guard-проверки и ограничения проскальзывания при выводе сложных активов.【F:contracts/PoolLogic.sol†L265-L345】【F:contracts/PoolLogic.sol†L416-L505】【F:contracts/PoolLogic.sol†L604-L636】
