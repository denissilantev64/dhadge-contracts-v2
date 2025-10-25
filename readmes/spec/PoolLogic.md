# PoolLogic

PoolLogic хранит активы пула, выпускает долевые токены ERC20 и взаимодействует с PoolManagerLogic для расчётов стоимости.
Инвесторы вносят и выводят средства через deposit*/withdraw*, а долевые токены отражают их долю.
poolManager и trader исполняют сделки через execTransaction/execTransactions с обязательной проверкой guard.
Комиссионные доли выпускаются для feeRecipient и poolManager вызовом mintManagerFee().

## Состояние
* `privatePool (bool)` — флаг приватного пула, включающий проверки членства и ограничения transfer через `_beforeTokenTransfer()`.
  Кто может менять — poolManager через setPoolPrivate() и при создании пула в initialize().【F:contracts/PoolLogic.sol†L139-L220】
* `creator (address)` — адрес, инициировавший развёртывание прокси пула. Используется как метаданные создания.
  Кто может менять — задаётся один раз в initialize().【F:contracts/PoolLogic.sol†L141-L189】
* `creationTime (uint256)` — метка времени создания пула, используется для отображения и аналитики.
  Кто может менять — задаётся один раз в initialize().【F:contracts/PoolLogic.sol†L143-L189】
* `factory (address)` — адрес PoolFactory для чтения пауз, лимитов комиссий, daoAddress и guard конфигурации.
  Кто может менять — только в initialize() при создании пула.【F:contracts/PoolLogic.sol†L145-L361】
* `tokenPriceAtLastFeeMint (uint256)` — цена долевого токена на момент последнего успешного mintManagerFee(). Обновляется в mintManagerFee() и сбрасывается до 1e18, если после вывода totalSupply становится нулевым.
  Кто может менять — mintManagerFee() и _withdrawTo() при полном выводе.【F:contracts/PoolLogic.sol†L147-L821】【F:contracts/PoolLogic.sol†L472-L517】
* `lastDeposit (mapping(address => uint256))` — время последнего депозита адреса для расчёта кулдауна на вывод.
  Кто может менять — автоматически в _depositFor() для получателя токенов.【F:contracts/PoolLogic.sol†L149-L333】
* `poolManagerLogic (address)` — активный контракт PoolManagerLogic, задающий whitelist активов, комиссии и доступ к ролям.
  Кто может менять — только poolFactoryOwner через setPoolManagerLogic().【F:contracts/PoolLogic.sol†L151-L887】
* `lastWhitelistTransfer (mapping(address => uint256))` — зарезервированное хранилище для будущих ограничений transfer. Сейчас не используется и не обновляется после объявления.
  Кто может менять — нет активных обновлений в текущей версии.【F:contracts/PoolLogic.sol†L153-L209】
* `lastFeeMintTime (uint256)` — время последнего успешного стримингового начисления management fee.
  Кто может менять — initialize() и mintManagerFee().【F:contracts/PoolLogic.sol†L155-L821】
* `lastExitCooldown (mapping(address => uint256))` — персональный кулдаун на вывод для адреса инвестора.
  Кто может менять — автоматически в _depositFor() с учётом выбранного кулдауна.【F:contracts/PoolLogic.sol†L157-L333】
* Переменные ERC20Upgradeable (`_totalSupply`, `_balances`, `_allowances`) — отражают долевые токены инвесторов и их разрешения.
  Кто может менять — внутренние вызовы `_mint` и `_burn` из deposit*, withdraw*, mintManagerFee() и начисление комиссий при entry/exit.【F:contracts/PoolLogic.sol†L269-L517】【F:contracts/PoolLogic.sol†L787-L821】

## Публичные и external функции
### Функции депозита
* `initialize(address _factory, bool _privatePool, string _fundName, string _fundSymbol)`
  * Кто может вызывать — однократно из прокси при развёртывании пула.
  * Что делает — задаёт фабрику, приватность, метаданные и стартовые параметры комиссий пула.
  * Побочные эффекты — инициализирует ERC20 имя/символ, включает reentrancy guard, записывает creator, creationTime, lastFeeMintTime и базовую цену токена.
  * Важные require / проверки безопасности — модификатор `initializer` запрещает повторный вызов.【F:contracts/PoolLogic.sol†L169-L189】
* `deposit(address _asset, uint256 _amount)`
  * Кто может вызывать — любой investor или poolManager; для приватного пула получатель должен быть в whitelist.
  * Что делает — принимает разрешённый актив, рассчитывает его стоимость в USD эквиваленте и минтит долевые токены отправителю.
  * Побочные эффекты — переводит активы в пул, вызывает _mintManagerFee(), обновляет lastDeposit и lastExitCooldown, может начислить entry fee poolManager.
  * Важные require / проверки безопасности — проверка пауз фабрики и пула, whitelist приватного пула, проверка deposit asset, блокировка NFT и минимальный размер ликвидности/депозита.【F:contracts/PoolLogic.sol†L236-L361】
* `depositFor(address _recipient, address _asset, uint256 _amount)`
  * Кто может вызывать — любой адрес; если пул приватный, `_recipient` должен быть poolManager или whitelisted investor.
  * Что делает — депонирует актив и минтит долевые токены на `_recipient`.
  * Побочные эффекты — те же, что у deposit, но с обновлением кулдауна и баланса для `_recipient`.
  * Важные require / проверки безопасности — проверяет доступ `_recipient`, допустимый актив, паузы и минимальный депозит.【F:contracts/PoolLogic.sol†L236-L361】
* `depositForWithCustomCooldown(address _recipient, address _asset, uint256 _amount, uint256 _cooldown)`
  * Кто может вызывать — адрес из `customCooldownWhitelist` фабрики.
  * Что делает — депонирует актив и задаёт пользовательский кулдаун для `_recipient`.
  * Побочные эффекты — обновляет lastExitCooldown кастомным значением, вызывает _mintManagerFee(), может начислить entry fee.
  * Важные require / проверки безопасности — проверяет whitelist отправителя, диапазон `_cooldown`, паузы, whitelist приватного пула и допустимый актив.【F:contracts/PoolLogic.sol†L248-L345】

### Функции вывода
* `withdraw(uint256 _fundTokenAmount)`
  * Кто может вызывать — investor с достаточным балансом долевых токенов после окончания кулдауна.
  * Что делает — списывает указанное количество долей и пропорционально возвращает активы пула без пользовательских параметров по сложным позициям.
  * Побочные эффекты — уменьшает totalSupply, переводит активы вызывающему, может начислить exit fee, обновляет `tokenPriceAtLastFeeMint` при опустошении пула, эмитирует Withdrawal.
  * Важные require / проверки безопасности — проверяет паузы, кулдаун, остаток totalSupply, доступные активы, guard обработку и инварианты стоимости.【F:contracts/PoolLogic.sol†L367-L517】
* `withdrawTo(address _recipient, uint256 _fundTokenAmount)`
  * Кто может вызывать — investor, прошедший кулдаун и владеющий достаточными долями.
  * Что делает — выполняет вывод без кастомных параметров, но переводит активы на указанный `_recipient`.
  * Побочные эффекты — аналог withdraw с адресом получателя, может начислить exit fee, эмитирует Withdrawal.
  * Важные require / проверки безопасности — такие же, как в withdraw, включая проверки пауз, кулдауна и инвариантов.【F:contracts/PoolLogic.sol†L379-L517】
* `withdrawSafe(uint256 _fundTokenAmount, IPoolLogic.ComplexAsset[] memory _complexAssetsData)`
  * Кто может вызывать — investor после кулдауна с достаточными долями.
  * Что делает — выводит долю пула с возможностью указать обработку сложных активов и допустимую просадку по каждому активу.
  * Побочные эффекты — уменьшает totalSupply, обрабатывает внешние транзакции guard, переводит активы вызывающему, может начислить exit fee.
  * Важные require / проверки безопасности — те же общие проверки, плюс соответствие `_complexAssetsData` supportedAssets и лимит проскальзывания.【F:contracts/PoolLogic.sol†L393-L517】
* `withdrawToSafe(address _recipient, uint256 _fundTokenAmount, IPoolLogic.ComplexAsset[] memory _complexAssetsData)`
  * Кто может вызывать — investor после кулдауна с достаточными долями.
  * Что делает — выводит активы на `_recipient` с пользовательскими параметрами по сложным позициям и лимитами проскальзывания.
  * Побочные эффекты — аналог withdrawSafe, но адрес получателя отделён от инициатора.
  * Важные require / проверки безопасности — идентичны withdrawSafe: проверки пауз, кулдауна, соответствия `_complexAssetsData` и инвариантов пула.【F:contracts/PoolLogic.sol†L404-L517】

### Исполнение сделок
* `execTransaction(address to, bytes calldata data)`
  * Кто может вызывать — только poolManager или trader; публичные вызовы доступны, если guard отметил транзакцию как публичную.
  * Что делает — выполняет одиночную транзакцию с внешним протоколом от имени пула через guard-проверку.
  * Побочные эффекты — может перемещать активы, эмитирует TransactionExecuted, уведомляет фабрику.
  * Важные require / проверки безопасности — проверка пауз, whitelist контракта или актива, валидация guard, запрет нулевого адреса, контроль роли и вызов afterTxGuard.【F:contracts/PoolLogic.sol†L604-L655】
* `execTransactions(TxToExecute[] calldata txs)`
  * Кто может вызывать — только poolManager или trader; публичные вызовы возможны для транзакций, отмеченных guard.
  * Что делает — выполняет серию транзакций через последовательные вызовы _execTransaction.
  * Побочные эффекты — может перемещать активы пула и генерирует события TransactionExecuted для каждой операции.
  * Важные require / проверки безопасности — для каждого элемента выполняются те же проверки пауз, guard и afterTxGuard, что и в execTransaction.【F:contracts/PoolLogic.sol†L604-L672】

### Управление пулом
* `setPoolPrivate(bool _privatePool)`
  * Кто может вызывать — только poolManager.
  * Что делает — включает или отключает приватный режим пула.
  * Побочные эффекты — обновляет `privatePool`, эмитирует PoolPrivacyUpdated и событие фабрики.
  * Важные require / проверки безопасности — проверка роли poolManager.【F:contracts/PoolLogic.sol†L213-L220】
* `setPoolManagerLogic(address _poolManagerLogic)`
  * Кто может вызывать — factory или poolFactoryOwner.
  * Что делает — переназначает PoolManagerLogic и тем самым меняет набор разрешённых активов и ролей.
  * Побочные эффекты — обновляет `poolManagerLogic`, эмитирует PoolManagerLogicSet и событие фабрики.
  * Важные require / проверки безопасности — запрещает нулевой адрес и ограничивает доступ фабрикой или её владельцем.【F:contracts/PoolLogic.sol†L881-L887】

### Расчётные функции
* `totalFundValue()`
  * Кто может вызывать — любой адрес.
  * Что делает — возвращает совокупную стоимость активов пула в quote валюте через вызов `IPoolManagerLogic(poolManagerLogic).totalFundValue()`.
  * Побочные эффекты — нет.
  * Важные require / проверки безопасности — нет (view).【F:contracts/PoolLogic.sol†L900-L904】【F:contracts/PoolManagerLogic.sol†L296-L343】
* `assetValue(address _asset)` / `assetValue(address _asset, uint256 _amount)`
  * Кто может вызывать — любой адрес.
  * Что делает — оценивает стоимость актива пула или конкретного количества через PoolManagerLogic.
  * Побочные эффекты — нет.
  * Важные require / проверки безопасности — нет (view).【F:contracts/PoolLogic.sol†L904-L906】【F:contracts/PoolManagerLogic.sol†L280-L312】
* `isPoolPrivate()`
  * Кто может вызывать — любой адрес.
  * Что делает — возвращает текущий режим приватности пула (публичный геттер переменной `privatePool`).
  * Побочные эффекты — нет.
  * Важные require / проверки безопасности — нет (view).【F:contracts/PoolLogic.sol†L139-L220】
* `getFundSummary()`
  * Кто может вызывать — любой адрес.
  * Что делает — возвращает агрегированные данные пула: имя, totalSupply, цену долевого токена, адрес poolManager, текущие комиссии, приватность и время создания.
  * Побочные эффекты — нет.
  * Важные require / проверки безопасности — нет, чтение из состояния и PoolManagerLogic.【F:contracts/PoolLogic.sol†L675-L701】
* `tokenPrice()`
  * Кто может вызывать — любой адрес.
  * Что делает — рассчитывает цену долевого токена с учётом невыпущенных комиссий.
  * Побочные эффекты — нет.
  * Важные require / проверки безопасности — нет (view).【F:contracts/PoolLogic.sol†L706-L711】
* `tokenPriceWithoutManagerFee()`
  * Кто может вызывать — любой адрес.
  * Что делает — возвращает цену долевого токена без учёта невыпущенных комиссий poolManager.
  * Побочные эффекты — нет.
  * Важные require / проверки безопасности — нет (view).【F:contracts/PoolLogic.sol†L715-L717】
* `calculateAvailableManagerFee(uint256 _fundValue)`
  * Кто может вызывать — любой адрес.
  * Что делает — рассчитывает сумму performance и management fee, доступную к выпуску при заданной стоимости пула.
  * Побочные эффекты — нет.
  * Важные require / проверки безопасности — нет, чистое чтение параметров комиссий.【F:contracts/PoolLogic.sol†L732-L743】
* `getExitRemainingCooldown(address _depositor)`
  * Кто может вызывать — любой адрес.
  * Что делает — возвращает оставшееся время кулдауна для инвестора.
  * Побочные эффекты — нет.
  * Важные require / проверки безопасности — нет (view).【F:contracts/PoolLogic.sol†L871-L877】

ERC20 функции (`totalSupply()`, `balanceOf(address)`, `transfer`, `transferFrom`) — стандартные функции долевого токена пула. Они отражают долю investor в пуле и могут блокироваться для приватных пулов через `_beforeTokenTransfer()` при активном кулдауне или паузах.【F:contracts/PoolLogic.sol†L189-L220】

### Функции комиссий
* `mintManagerFee()`
  * Кто может вызывать — любой адрес (часто poolManager или автоматизация).
  * Что делает — рассчитывает накопленные performance и management fee, минтит долевые токены для feeRecipient (daoAddress) и poolManager.
  * Побочные эффекты — увеличивает totalSupply, обновляет `tokenPriceAtLastFeeMint` и `lastFeeMintTime`, переводит комиссионные доли, эмитирует ManagerFeeMinted и событие фабрики.
  * Важные require / проверки безопасности — проверка пауз, чтение лимитов комиссий с фабрики, использование `_totalValue()` и `getDaoFee()` для расчёта долей.【F:contracts/PoolLogic.sol†L779-L821】

### Вспомогательные функции
* `executeOperation(address[] calldata assets, uint256[] calldata amounts, uint256[] calldata premiums, address initiator, bytes calldata params)`
  * Кто может вызывать — только Aave lending pool, разрешённый соответствующим asset guard.
  * Что делает — исполняет последовательность транзакций guard в рамках flashloan и проверяет возврат долга с премией.
  * Побочные эффекты — выполняет внешние вызовы и требует, чтобы баланс покрывал сумму долга плюс премию.
  * Важные require / проверки безопасности — проверяет инициатора, адрес лендинга через guard и достаточный остаток активов после операций.【F:contracts/PoolLogic.sol†L928-L956】
* `onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data)`
  * Кто может вызывать — ERC721 контракты, прошедшие проверку через соответствующий guard.
  * Что делает — подтверждает приём NFT пулом после валидации оператора guard-ом.
  * Побочные эффекты — нет, возвращает селектор совместимости.
  * Важные require / проверки безопасности — проверяет guard оператора и валидацию `verifyERC721` перед приёмом токена.【F:contracts/PoolLogic.sol†L971-L984】

## Events
* `Deposit(address fundAddress, address investor, address assetDeposited, uint256 amountDeposited, uint256 valueDeposited, uint256 fundTokensReceived, uint256 totalInvestorFundTokens, uint256 fundValue, uint256 totalSupply, uint256 time)` — фиксирует параметры депозита для индексации.
  Эмитится в: deposit(), depositFor(), depositForWithCustomCooldown().【F:contracts/PoolLogic.sol†L320-L358】
* `Withdrawal(address fundAddress, address investor, uint256 valueWithdrawn, uint256 fundTokensWithdrawn, uint256 totalInvestorFundTokens, uint256 fundValue, uint256 totalSupply, WithdrawnAsset[] withdrawnAssets, uint256 time)` — сигнализирует о завершённом выводе и возвращённых активах.
  Эмитится в: withdraw(), withdrawTo(), withdrawSafe(), withdrawToSafe().【F:contracts/PoolLogic.sol†L367-L517】
* `TransactionExecuted(address pool, address manager, uint16 transactionType, uint256 time)` — позволяет отслеживать каждую торговую операцию пула.
  Эмитится в: execTransaction(), execTransactions() (через _execTransaction).【F:contracts/PoolLogic.sol†L604-L672】
* `PoolPrivacyUpdated(bool isPoolPrivate)` — отражает смену режима приватности пула.
  Эмитится в: setPoolPrivate().【F:contracts/PoolLogic.sol†L213-L220】
* `ManagerFeeMinted(address pool, address manager, uint256 available, uint256 daoFee, uint256 managerFee, uint256 tokenPriceAtLastFeeMint)` — фиксирует выпуск комиссионных долей для feeRecipient и poolManager.
  Эмитится в: mintManagerFee() / _mintManagerFee().【F:contracts/PoolLogic.sol†L787-L821】
* `PoolManagerLogicSet(address poolManagerLogic, address from)` — сигнализирует о смене логики менеджера.
  Эмитится в: setPoolManagerLogic().【F:contracts/PoolLogic.sol†L881-L887】
* `EntryFeeMinted(address manager, uint256 entryFeeAmount)` — отражает начисление entry fee poolManager при депозите.
  Эмитится в: deposit(), depositFor(), depositForWithCustomCooldown().【F:contracts/PoolLogic.sol†L303-L314】
* `ExitFeeMinted(address manager, uint256 exitFeeAmount)` — фиксирует удержанную exit fee при выводе.
  Эмитится в: withdraw(), withdrawTo(), withdrawSafe(), withdrawToSafe().【F:contracts/PoolLogic.sol†L434-L448】

## Безопасность и контроль доступа
poolManager и trader могут перемещать активы пула только через execTransaction()/execTransactions(), и каждая транзакция проходит guard-проверку с валидацией адреса и пост-проверкой afterTxGuard.【F:contracts/PoolLogic.sol†L604-L672】
poolFactoryOwner может приостановить фабрику или отдельные пулы, что блокирует депозиты, выводы и торговлю через модификаторы whenNotFactoryPaused, whenNotPaused и проверку tradingPausedPools.【F:contracts/PoolLogic.sol†L159-L166】【F:contracts/PoolLogic.sol†L604-L605】
mintManagerFee() минтит новые долевые токены и распределяет их между feeRecipient (daoAddress фабрики) и poolManager, уменьшая долю остальных инвесторов.【F:contracts/PoolLogic.sol†L787-L821】
investor защищён кулдауном на вывод, whitelist приватного пула, ограничениями разрешённых активов из PoolManagerLogic и guard-проверками, включая контроль проскальзывания для сложных активов.【F:contracts/PoolLogic.sol†L236-L361】【F:contracts/PoolLogic.sol†L416-L505】【F:contracts/PoolLogic.sol†L604-L636】
