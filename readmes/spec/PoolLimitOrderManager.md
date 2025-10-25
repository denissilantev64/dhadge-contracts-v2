# PoolLimitOrderManager

Контракт управляет лимитными ордерами пула и очередью их исполнения. Хранит заявки инвесторов на продажу долевых токенов по целевым ценам, выполняет их через EasySwapperV2 и конвертирует активы в расчётный токен. Ограничивает доступ к исполнению через authorizedKeeper и обслуживает интересы investor и poolManager, но limitOrderManagerOwner настраивает все параметры и риски.

## Состояние
* `poolFactory (address)` — источник проверки валидности пулов и активов, используется для получения цен и guard адресов.  Кто может менять — limitOrderManagerOwner через setPoolFactory() и initialize().【F:contracts/limitOrders/PoolLimitOrderManager.sol†L107-L528】
* `easySwapper (address)` — ссылка на EasySwapperV2, через который выводятся активы при исполнении ордеров и settlement.  Кто может менять — limitOrderManagerOwner через setEasySwapper() и initialize().【F:contracts/limitOrders/PoolLimitOrderManager.sol†L109-L535】
* `defaultSlippageTolerance (uint16)` — глобальный лимит проскальзывания для свопов при исполнении ордеров.  Кто может менять — limitOrderManagerOwner через setDefaultSlippageTolerance() и initialize().【F:contracts/limitOrders/PoolLimitOrderManager.sol†L111-L524】
* `limitOrderSettlementToken (address)` — токен, в который сводятся активы после исполнения ордеров.  Кто может менять — limitOrderManagerOwner через setLimitOrderSettlementToken() и initialize().【F:contracts/limitOrders/PoolLimitOrderManager.sol†L115-L542】
* `limitOrders (mapping(bytes32 => LimitOrderInfo))` — хранилище параметров ордеров (amount, цены, пользователь, пул, pricingAsset).  Кто может менять — создаётся и обновляется в createLimitOrder(), modifyLimitOrder(), _removeLimitOrder().【F:contracts/limitOrders/PoolLimitOrderManager.sol†L118-L392】
* `isAuthorizedKeeper (mapping(address => bool))` — whitelist authorizedKeeper, которые могут исполнять и отменять ордера.  Кто может менять — limitOrderManagerOwner через addAuthorizedKeeper() и removeAuthorizedKeeper().【F:contracts/limitOrders/PoolLimitOrderManager.sol†L122-L518】
* `limitOrderIds (EnumerableSet)` — набор идентификаторов ордеров для итерации и проверки существования.  Кто может менять — внутренние функции createLimitOrder(), modifyLimitOrder(), _removeLimitOrder().【F:contracts/limitOrders/PoolLimitOrderManager.sol†L124-L392】
* `usersToSettle (EnumerableSet)` — список инвесторов, у которых есть незавершённый settlement ордер.  Кто может менять — _processLimitOrderExecution() и _removeSettlementOrder().【F:contracts/limitOrders/PoolLimitOrderManager.sol†L126-L399】
* `структура разрешённых токенов/DEX` — не найдено в коде сверх проверок через poolFactory.isValidAsset().
* `salvage storage` — не найдено в коде.

## Публичные и external функции
### Управление ордерами инвестора
`createLimitOrder(LimitOrderInfo calldata limitOrderInfo_)`
* Кто может вызывать — investor, создающий ордер для собственного адреса.
* Что делает — проверяет пул, баланс долевых токенов, цены стоп-лосс и тейк-профит, затем записывает ордер и ID в набор.
* Побочные эффекты — резервирует запись в limitOrders, эмитирует LimitOrderCreated.
* Важные require / проверки безопасности — проверяет, что user совпадает с msg.sender, пул существует, актив валиден и цены корректны.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L170-L197】【F:contracts/limitOrders/PoolLimitOrderManager.sol†L443-L466】

`modifyLimitOrder(LimitOrderInfo calldata modificationInfo_)`
* Кто может вызывать — investor, который уже создал ордер на выбранный пул.
* Что делает — повторно валидирует параметры и заменяет значения в limitOrders.
* Побочные эффекты — обновляет запись ордера, эмитирует LimitOrderModified.
* Важные require / проверки безопасности — требует существование ордера и прохождение тех же проверок, что и при создании.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L185-L199】【F:contracts/limitOrders/PoolLimitOrderManager.sol†L443-L466】

`deleteLimitOrder(address pool_)`
* Кто может вызывать — investor, желающий отменить свой ордер на конкретный пул.
* Что делает — удаляет ордер и ID из набора, испускает событие.
* Побочные эффекты — очищает mapping и set, эмитирует LimitOrderDeleted.
* Важные require / проверки безопасности — использует _removeLimitOrder(), который проверяет наличие ордера и принадлежность инвестору через orderId.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L202-L206】【F:contracts/limitOrders/PoolLimitOrderManager.sol†L383-L392】

### Исполнение и обслуживание ордеров
`executeLimitOrders(LimitOrderExecution[] calldata orders_)`
* Кто может вызывать — только authorizedKeeper.
* Что делает — последовательно вызывает _executeLimitOrder для набора ордеров и переводит долевые токены из пулов.
* Побочные эффекты — переводит долевые токены на контракт, одобряет их для easySwapper, инициирует лимитные WithdrawalVault, добавляет инвесторов в очередь settlement, эмитирует события исполнения.
* Важные require / проверки безопасности — проверяет наличие ордера, валидирует цены и slippage, требует allowance долевых токенов инвестора, запрещает вызов сторонними адресами через модификатор и внутренний self-call guard.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L212-L339】

`executeSettlementOrders(SettlementOrderExecution[] calldata orders_)`
* Кто может вызывать — только authorizedKeeper.
* Что делает — завершает settlement ордера инвесторов: удаляет их из очереди и вызывает EasySwapperV2.completeLimitOrderWithdrawalFor с расчётом минимального приёма токена.
* Побочные эффекты — может конвертировать активы в settlement токен, эмитирует SettlementOrderExecuted и удаляет пользователя из usersToSettle.
* Важные require / проверки безопасности — проверяет право вызова, валидирует, что destData.destToken совпадает с limitOrderSettlementToken, рассчитывает минимальное количество через цены PoolFactory и defaultSlippageTolerance.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L233-L381】

`deleteLimitOrders(bytes32[] calldata orderIds_)`
* Кто может вызывать — только authorizedKeeper.
* Что делает — удаляет несколько ордеров из хранения, если инвестор уже вывел активы или отозвал allowance.
* Побочные эффекты — очищает записи и эмитирует LimitOrderDeleted для каждого ордера.
* Важные require / проверки безопасности — после удаления проверяет баланс и allowance инвестора, иначе откатывает операцию для ордера.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L253-L265】【F:contracts/limitOrders/PoolLimitOrderManager.sol†L402-L412】

### Настройки владельца
`addAuthorizedKeeper(address keeper_)`
* Кто может вызывать — только limitOrderManagerOwner.
* Что делает — добавляет адрес в whitelist исполнителей.
* Побочные эффекты — ставит флаг isAuthorizedKeeper[keeper_] = true, эмитирует AuthorizedKeeperAdded.
* Важные require / проверки безопасности — ограничено владельцем, дополнительных проверок нет.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L504-L510】

`removeAuthorizedKeeper(address keeper_)`
* Кто может вызывать — только limitOrderManagerOwner.
* Что делает — удаляет адрес из whitelist исполнителей.
* Побочные эффекты — сбрасывает флаг до false, эмитирует AuthorizedKeeperRemoved.
* Важные require / проверки безопасности — ограничено владельцем.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L512-L518】

`setDefaultSlippageTolerance(uint16 defaultSlippageTolerance_)`
* Кто может вызывать — только limitOrderManagerOwner.
* Что делает — задаёт глобальный предел проскальзывания для свопов settlement и withdrawData.
* Побочные эффекты — обновляет defaultSlippageTolerance, эмитирует SlippageToleranceSet.
* Важные require / проверки безопасности — значение должно быть >0 и <= SLIPPAGE_DENOMINATOR, иначе revert InvalidValue("slippage").【F:contracts/limitOrders/PoolLimitOrderManager.sol†L520-L524】【F:contracts/limitOrders/PoolLimitOrderManager.sol†L414-L421】

`setPoolFactory(IPoolFactory poolFactory_)`
* Кто может вызывать — только limitOrderManagerOwner.
* Что делает — переназначает фабрику пулов для валидации и цен.
* Побочные эффекты — обновляет poolFactory.
* Важные require / проверки безопасности — запрещает нулевой адрес через ZeroAddress("poolFactory").【F:contracts/limitOrders/PoolLimitOrderManager.sol†L526-L530】【F:contracts/limitOrders/PoolLimitOrderManager.sol†L423-L427】

`setEasySwapper(IEasySwapperV2 easySwapper_)`
* Кто может вызывать — только limitOrderManagerOwner.
* Что делает — назначает EasySwapperV2 для исполнения ордеров.
* Побочные эффекты — обновляет easySwapper.
* Важные require / проверки безопасности — запрещает нулевой адрес через ZeroAddress("easySwapper").【F:contracts/limitOrders/PoolLimitOrderManager.sol†L532-L536】【F:contracts/limitOrders/PoolLimitOrderManager.sol†L429-L433】

`setLimitOrderSettlementToken(address limitOrderSettlementToken_)`
* Кто может вызывать — только limitOrderManagerOwner.
* Что делает — выбирает токен, который будет получен при settle.
* Побочные эффекты — обновляет limitOrderSettlementToken, эмитирует SettlementTokenSet.
* Важные require / проверки безопасности — проверяет asset через poolFactory.isValidAsset().【F:contracts/limitOrders/PoolLimitOrderManager.sol†L538-L542】【F:contracts/limitOrders/PoolLimitOrderManager.sol†L435-L441】

`salvage(address token, uint256 amount)`
* Кто может вызывать — не найдено в коде.
* Что делает — не найдено в коде.
* Побочные эффекты — не найдено в коде.
* Важные require / проверки безопасности — не найдено в коде.

## Events
* `LimitOrderCreated(address user, address pool, bytes32 id)` — ордер создан и записан.  Эмитится в: createLimitOrder().【F:contracts/limitOrders/PoolLimitOrderManager.sol†L170-L197】
* `LimitOrderDeleted(address user, address pool, bytes32 id)` — ордер удалён из хранения.  Эмитится в: deleteLimitOrder(), _executeLimitOrder(), _removeLimitOrder(), deleteLimitOrders().【F:contracts/limitOrders/PoolLimitOrderManager.sol†L202-L392】
* `LimitOrderModified(address user, address pool, bytes32 id)` — параметры ордера изменены.  Эмитится в: modifyLimitOrder(), _executeLimitOrder() при частичном исполнении.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L185-L301】
* `LimitOrderExecuted(address user, address pool, bytes32 id)` — ордер исполнен полностью.  Эмитится в: _executeLimitOrder().【F:contracts/limitOrders/PoolLimitOrderManager.sol†L283-L312】
* `LimitOrderExecutedPartially(address user, address pool, bytes32 id, uint256 amount)` — частичное исполнение ордера.  Эмитится в: _executeLimitOrder().【F:contracts/limitOrders/PoolLimitOrderManager.sol†L290-L303】
* `LimitOrderExecutionFailed(bytes32 id, bytes reason)` — попытка исполнения завершилась revert.  Эмитится в: executeLimitOrdersSafe().【F:contracts/limitOrders/PoolLimitOrderManager.sol†L221-L230】
* `SettlementOrderCreated(address user)` — инвестор добавлен в очередь settlement.  Эмитится в: _processLimitOrderExecution().【F:contracts/limitOrders/PoolLimitOrderManager.sol†L332-L338】
* `SettlementOrderDeleted(address user)` — инвестор удалён из очереди settlement.  Эмитится в: _removeSettlementOrder().【F:contracts/limitOrders/PoolLimitOrderManager.sol†L394-L399】
* `SettlementOrderExecuted(address user, uint256 destTokenAmountReceived)` — завершён swap в settlement токен.  Эмитится в: _executeSettlementOrder().【F:contracts/limitOrders/PoolLimitOrderManager.sol†L341-L381】
* `SettlementOrderExecutionFailed(address user, bytes reason)` — попытка settlement завершилась revert.  Эмитится в: executeSettlementOrdersSafe().【F:contracts/limitOrders/PoolLimitOrderManager.sol†L241-L250】
* `AuthorizedKeeperAdded(address keeper)` — keeper добавлен.  Эмитится в: addAuthorizedKeeper().【F:contracts/limitOrders/PoolLimitOrderManager.sol†L504-L510】
* `AuthorizedKeeperRemoved(address keeper)` — keeper удалён.  Эмитится в: removeAuthorizedKeeper().【F:contracts/limitOrders/PoolLimitOrderManager.sol†L512-L518】
* `SlippageToleranceSet(uint16 slippageTolerance)` — обновлена глобальная толерантность к проскальзыванию.  Эмитится в: _setDefaultSlippageTolerance().【F:contracts/limitOrders/PoolLimitOrderManager.sol†L414-L421】
* `SettlementTokenSet(address token)` — установлен новый settlement токен.  Эмитится в: _setLimitOrderSettlementToken().【F:contracts/limitOrders/PoolLimitOrderManager.sol†L435-L441】

## Безопасность и контроль доступа
authorizedKeeper может переводить долевые токены пулов и активировать выводы через EasySwapperV2, но ограничен существующими ордерами, проверками цен и лимитом проскальзывания; без ордера исполнение невозможно.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L212-L339】
limitOrderManagerOwner определяет пул фабрики, адрес EasySwapper, список keeper и settlement токен, тем самым контролируя какие активы и маршруты разрешены и кто может их исполнять.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L504-L542】
investor создаёт и отменяет только свои ордера и не может назначить keeper или поменять лимиты, поэтому должен доверять keeper и владельцу контракта относительно своевременного исполнения и корректности цен.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L170-L265】【F:contracts/limitOrders/PoolLimitOrderManager.sol†L504-L542】
