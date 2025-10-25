# PoolLimitOrderManager

Контракт управляет лимитными и settlement ордерами для инвесторов dHEDGE, взаимодействует с EasySwapperV2 и контролирует исполнение через авторизованных keeper.

## Состояние
- `poolFactory (address)` — фабрика пулов, используется для проверки валидности пулов и активов. Настраивает limitOrderManagerOwner через `initialize()` и `setPoolFactory()`.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L149-L161】【F:contracts/limitOrders/PoolLimitOrderManager.sol†L526-L529】
- `easySwapper (address)` — адрес EasySwapperV2 для вывода активов. Задаёт limitOrderManagerOwner через `initialize()` и `setEasySwapper()`.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L149-L161】【F:contracts/limitOrders/PoolLimitOrderManager.sol†L532-L535】
- `defaultSlippageTolerance (uint16)` — глобальный лимит допустимого отклонения цены (доля от 10_000). Настраивается при `initialize()` и в `setDefaultSlippageTolerance()`.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L149-L161】【F:contracts/limitOrders/PoolLimitOrderManager.sol†L520-L523】
- `limitOrderSettlementToken (address)` — токен, в который сводятся settlement ордера. Меняется limitOrderManagerOwner через `initialize()` и `setLimitOrderSettlementToken()`.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L149-L161】【F:contracts/limitOrders/PoolLimitOrderManager.sol†L538-L541】
- `limitOrders (mapping(bytes32 => LimitOrderInfo))` — хранит активные ордера инвесторов по ключу user+pool. Обновляется при создании, изменении, частичном исполнении и удалении ордера.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L120-L311】
- `isAuthorizedKeeper (mapping(address => bool))` — whitelist keeper адресов. Меняет limitOrderManagerOwner через `addAuthorizedKeeper()` и `removeAuthorizedKeeper()`.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L122-L518】
- `limitOrderIds (EnumerableSet.Bytes32Set)` — множество идентификаторов ордеров для выборки и проверок. Заполняется в `createLimitOrder()` и очищается при удалении или полном исполнении.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L125-L311】
- `usersToSettle (EnumerableSet.AddressSet)` — очередь пользователей, ожидающих settlement. Обновляется в `_processLimitOrderExecution()` и `_removeSettlementOrder()`.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L128-L399】

## Публичные и external функции
### Инициализация
`initialize(address admin_, IPoolFactory poolFactory_, IEasySwapperV2 easySwapper_, uint16 defaultSlippageTolerance_, address limitOrderSettlementToken_)`
- Кто может вызывать — однократно limitOrderManagerOwner при развёртывании прокси.
- Что делает — задаёт фабрику, EasySwapperV2, допуск по проскальзыванию и settlement токен.
- Побочные эффекты — устанавливает владельца, записывает параметры состояния.
- Важные проверки — запрещает нулевые адреса, убеждается что settlement токен валиден в `poolFactory`.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L149-L161】

### Работа инвестора с ордерами
`createLimitOrder(LimitOrderInfo calldata limitOrderInfo_)`
- Кто может вызывать — investor.
- Что делает — создаёт лимитный ордер на вывод долевых токенов пула по условиям stop-loss/take-profit.
- Побочные эффекты — сохраняет данные в `limitOrders`, добавляет id в `limitOrderIds`, эмитирует `LimitOrderCreated`.
- Важные проверки — проверяет, что пользователь создаёт ордер для себя, пул валиден, баланс достаточен, цена актива и агрегатор допустимы.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L170-L183】【F:contracts/limitOrders/PoolLimitOrderManager.sol†L443-L466】

`modifyLimitOrder(LimitOrderInfo calldata modificationInfo_)`
- Кто может вызывать — investor, владеющий ордером.
- Что делает — обновляет параметры существующего ордера (amount, цены, pricingAsset).
- Побочные эффекты — перезаписывает `limitOrders[orderId]`, эмитирует `LimitOrderModified`.
- Важные проверки — переиспользует `_validateLimitOrderInfo`, убеждается что ордер существует.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L190-L200】【F:contracts/limitOrders/PoolLimitOrderManager.sol†L443-L466】

`deleteLimitOrder(address pool_)`
- Кто может вызывать — investor.
- Что делает — удаляет собственный ордер для указанного пула.
- Побочные эффекты — вызывает `_removeLimitOrder`, очищает `limitOrders` и `limitOrderIds`, эмитирует `LimitOrderDeleted`.
- Важные проверки — проверяет наличие ордера; при вызове `_removeLimitOrder` убеждается, что id существует.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L202-L205】【F:contracts/limitOrders/PoolLimitOrderManager.sol†L383-L391】

### Исполнение ордеров keeper
`executeLimitOrders(LimitOrderExecution[] calldata orders_)`
- Кто может вызывать — authorizedKeeper.
- Что делает — последовательно исполняет набор лимитных ордеров с учётом частичных исполнений.
- Побочные эффекты — для каждого ордера вызывает `_executeLimitOrder`, что может уменьшить amount, переместить токены и добавить пользователя в settlement очередь.
- Важные проверки — убеждается что caller whitelisted, `_processLimitOrderExecution` проверяет цены и слippage, подтверждает allowance инвестора.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L212-L239】【F:contracts/limitOrders/PoolLimitOrderManager.sol†L320-L338】

`executeLimitOrdersSafe(LimitOrderExecution[] calldata orders_)`
- Кто может вызывать — authorizedKeeper.
- Что делает — пытается исполнить каждый ордер и фиксирует неудачи событием без общего отката.
- Побочные эффекты — при ошибке эмитирует `LimitOrderExecutionFailed`, успешные ордера обрабатываются как в обычной версии.
- Важные проверки — тот же whitelist keeper, внутренние проверки `_executeLimitOrder` обеспечивают контроль цены и доступа.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L221-L231】【F:contracts/limitOrders/PoolLimitOrderManager.sol†L283-L339】

`executeSettlementOrders(SettlementOrderExecution[] calldata orders_)`
- Кто может вызывать — authorizedKeeper.
- Что делает — завершает очередь settlement, сводя активы vault в settlement токен через EasySwapperV2.
- Побочные эффекты — для каждого пользователя вызывает `_executeSettlementOrder`, что удаляет адрес из `usersToSettle` и эмитирует `SettlementOrderExecuted`.
- Важные проверки — проверяет whitelist keeper; внутри `_executeSettlementOrder` сверяет, что dest токен совпадает с `limitOrderSettlementToken` и рассчитывает минимальное количество с учётом `defaultSlippageTolerance`.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L233-L380】

`executeSettlementOrdersSafe(SettlementOrderExecution[] calldata orders_)`
- Кто может вызывать — authorizedKeeper.
- Что делает — выполняет settlement по каждому пользователю, продолжая при ошибках.
- Побочные эффекты — при ошибке эмитирует `SettlementOrderExecutionFailed`, успешные вызовы идентичны `executeSettlementOrders`.
- Важные проверки — остаются в `_executeSettlementOrder`; whitelist проверяется модификатором.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L241-L249】【F:contracts/limitOrders/PoolLimitOrderManager.sol†L341-L380】

`deleteLimitOrders(bytes32[] calldata orderIds_)`
- Кто может вызывать — authorizedKeeper.
- Что делает — удаляет список ордеров (например, после ручного вывода инвестором).
- Побочные эффекты — вызывает `_removeLimitOrder` для каждого id, эмитирует `LimitOrderDeleted` и при необходимости отклоняет удаление.
- Важные проверки — `_canDeleteLimitOrder` требует, чтобы у инвестора не было баланса или allowance пула; при несоблюдении условий операция ревертится.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L253-L265】【F:contracts/limitOrders/PoolLimitOrderManager.sol†L402-L412】

### Просмотр состояния
`getAllLimitOrderIds()`
- Кто может вызывать — любой адрес.
- Что делает — возвращает массив идентификаторов активных ордеров.
- Побочные эффекты — нет.
- Важные проверки — нет, чтение из `limitOrderIds`.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L267-L271】

`getAllUsersToSettle()`
- Кто может вызывать — любой адрес.
- Что делает — возвращает список пользователей, ожидающих settlement.
- Побочные эффекты — нет.
- Важные проверки — нет, чтение из `usersToSettle`.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L273-L277】

### Управление keeper и параметрами
`addAuthorizedKeeper(address keeper_)`
- Кто может вызывать — limitOrderManagerOwner.
- Что делает — добавляет keeper в whitelist.
- Побочные эффекты — ставит `isAuthorizedKeeper[keeper_] = true`, эмитирует `AuthorizedKeeperAdded`.
- Важные проверки — нет дополнительных проверок адреса. 【F:contracts/limitOrders/PoolLimitOrderManager.sol†L504-L510】

`removeAuthorizedKeeper(address keeper_)`
- Кто может вызывать — limitOrderManagerOwner.
- Что делает — исключает keeper из whitelist.
- Побочные эффекты — устанавливает `isAuthorizedKeeper[keeper_] = false`, эмитирует `AuthorizedKeeperRemoved`.
- Важные проверки — нет дополнительных проверок адреса. 【F:contracts/limitOrders/PoolLimitOrderManager.sol†L512-L518】

`setDefaultSlippageTolerance(uint16 defaultSlippageTolerance_)`
- Кто может вызывать — limitOrderManagerOwner.
- Что делает — обновляет глобальный лимит проскальзывания для исполнения ордеров.
- Побочные эффекты — задаёт `defaultSlippageTolerance`, эмитирует `SlippageToleranceSet`.
- Важные проверки — значение должно быть >0 и ≤10_000, иначе `InvalidValue`.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L520-L523】【F:contracts/limitOrders/PoolLimitOrderManager.sol†L414-L420】

`setPoolFactory(IPoolFactory poolFactory_)`
- Кто может вызывать — limitOrderManagerOwner.
- Что делает — переназначает фабрику пулов для валидации активов.
- Побочные эффекты — обновляет `poolFactory`.
- Важные проверки — запрещает нулевой адрес. 【F:contracts/limitOrders/PoolLimitOrderManager.sol†L526-L529】【F:contracts/limitOrders/PoolLimitOrderManager.sol†L423-L427】

`setEasySwapper(IEasySwapperV2 easySwapper_)`
- Кто может вызывать — limitOrderManagerOwner.
- Что делает — указывает EasySwapperV2, который выполняет выводы.
- Побочные эффекты — обновляет `easySwapper`.
- Важные проверки — запрещает нулевой адрес. 【F:contracts/limitOrders/PoolLimitOrderManager.sol†L532-L535】【F:contracts/limitOrders/PoolLimitOrderManager.sol†L429-L433】

`setLimitOrderSettlementToken(address limitOrderSettlementToken_)`
- Кто может вызывать — limitOrderManagerOwner.
- Что делает — задаёт токен, который получают пользователи при settlement.
- Побочные эффекты — обновляет `limitOrderSettlementToken`, эмитирует `SettlementTokenSet`.
- Важные проверки — токен должен быть валидным активом `poolFactory`.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L538-L541】【F:contracts/limitOrders/PoolLimitOrderManager.sol†L435-L441】

## Events
- `LimitOrderCreated(address user, address pool, bytes32 id)` — создание лимитного ордера. Эмитится в — `createLimitOrder()`.
- `LimitOrderDeleted(address user, address pool, bytes32 id)` — удаление ордера. Эмитится в — `_removeLimitOrder()` и частичном исполнении при полном закрытии. 【F:contracts/limitOrders/PoolLimitOrderManager.sol†L202-L391】
- `LimitOrderModified(address user, address pool, bytes32 id)` — обновление параметров ордера или уменьшение суммы при частичном исполнении. Эмитится в — `modifyLimitOrder()` и `_executeLimitOrder()` при частичной сделке. 【F:contracts/limitOrders/PoolLimitOrderManager.sol†L190-L311】
- `LimitOrderExecuted(address user, address pool, bytes32 id)` — полное исполнение ордера. Эмитится в — `_executeLimitOrder()` при полном погашении. 【F:contracts/limitOrders/PoolLimitOrderManager.sol†L283-L312】
- `LimitOrderExecutedPartially(address user, address pool, bytes32 id, uint256 amount)` — частичное исполнение. Эмитится в — `_executeLimitOrder()` при снижении amount. 【F:contracts/limitOrders/PoolLimitOrderManager.sol†L290-L302】
- `LimitOrderExecutionFailed(bytes32 id, bytes reason)` — фиксация ошибки исполнения. Эмитится в — `executeLimitOrdersSafe()`.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L221-L229】
- `SettlementOrderCreated(address user)` — постановка пользователя в очередь settlement. Эмитится в — `_processLimitOrderExecution()`.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L336-L338】
- `SettlementOrderDeleted(address user)` — удаление пользователя из очереди. Эмитится в — `_removeSettlementOrder()`.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L394-L399】
- `SettlementOrderExecuted(address user, uint256 destTokenAmountReceived)` — успешный settlement. Эмитится в — `_executeSettlementOrder()`.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L341-L380】
- `SettlementOrderExecutionFailed(address user, bytes reason)` — ошибка при settlement. Эмитится в — `executeSettlementOrdersSafe()`.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L241-L249】
- `AuthorizedKeeperAdded(address keeper)` — добавление keeper. Эмитится в — `addAuthorizedKeeper()`.
- `AuthorizedKeeperRemoved(address keeper)` — удаление keeper. Эмитится в — `removeAuthorizedKeeper()`.
- `SlippageToleranceSet(uint16 slippageTolerance)` — обновление `defaultSlippageTolerance`. Эмитится в — `_setDefaultSlippageTolerance()` и косвенно через `setDefaultSlippageTolerance()`.
- `SettlementTokenSet(address token)` — установка settlement токена. Эмитится в — `_setLimitOrderSettlementToken()`.

## Безопасность и контроль доступа
- limitOrderManagerOwner назначает фабрику, EasySwapperV2, settlement токен и управляет списком authorizedKeeper, тем самым контролируя доступ к исполнению ордеров и допустимый уровень проскальзывания.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L149-L541】
- authorizedKeeper исполняет лимитные и settlement ордера, но каждый вызов проверяется на валидность ордера, цены и лимиты проскальзывания, а также ограничен whitelist-ом. 【F:contracts/limitOrders/PoolLimitOrderManager.sol†L212-L380】
- investor создаёт, изменяет и удаляет собственные ордера и должен предоставить allowance долевых токенов; проверки `_validateLimitOrderInfo` гарантируют корректность пула, активов и цен. 【F:contracts/limitOrders/PoolLimitOrderManager.sol†L170-L205】【F:contracts/limitOrders/PoolLimitOrderManager.sol†L443-L466】
- poolManager косвенно участвует, поскольку исполнение ордеров проходит через EasySwapperV2 и WithdrawalVault пула; контракт не даёт poolManager дополнительных прав и опирается на правила, заданные фабрикой и guard настройками пула. 【F:contracts/limitOrders/PoolLimitOrderManager.sol†L320-L380】【F:contracts/limitOrders/PoolLimitOrderManager.sol†L443-L488】
