# PoolTokenSwapper

Контракт исполняет свопы между активами и пулами от имени dHEDGE пулов по заранее одобренным маршрутам. Работает как вспомогательный модуль для poolManager и swapWhitelist, удерживая токены временно во время обмена. Обслуживает интересы poolManager и investor, но poolTokenSwapperOwner управляет whitelists, комиссиями и может извлечь средства при salvage.

## Состояние
* `poolFactory (address)` — фабрика пулов, используется для проверки активов, получения guard адресов и цен.  Кто может менять — poolTokenSwapperOwner через initialize() и косвенно при redeploy, в контракте функции смены нет.【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L52-L336】
* `poolLogic (address)` — псевдоним для совместимости с guard, хранит адрес самого контракта.  Кто может менять — задаётся один раз в initialize().【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L53-L96】
* `manager (address)` — адрес исполнителя, который может вызывать execTransaction и управлять внешними протоколами.  Кто может менять — poolTokenSwapperOwner через setManager() и initialize().【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L54-L295】【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L458-L461】
* `assetConfiguration (mapping(address => bool))` — whitelist активов, доступных для обмена.  Кто может менять — poolTokenSwapperOwner через setAssets() и initialize().【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L56-L280】【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L442-L447】
* `poolConfiguration (mapping(address => PoolData))` — разрешённые пулы с их swap fee и статусом включено/выключено.  Кто может менять — poolTokenSwapperOwner через setPools() и initialize().【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L57-L288】【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L450-L456】
* `swapWhitelist (mapping(address => bool))` — список адресов, которым разрешено инициировать swap().  Кто может менять — poolTokenSwapperOwner через setSwapWhitelist() и initialize().【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L58-L301】【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L463-L467】
* `FEE_DENOMINATOR (uint256)` — знаменатель для расчёта комиссий пула.  Кто может менять — константа 10_000, изменить нельзя.【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L60-L61】

## Публичные и external функции
### Свопы
`swap(address tokenIn, address tokenOut, uint256 amountIn, uint256 minAmountOut)`
* Кто может вызывать — только адрес из swapWhitelist.
* Что делает — определяет тип обмена (asset→pool, pool→asset, pool→pool), рассчитывает котировку и вызывает внутренние функции обмена.
* Побочные эффекты — переводит токены между пользователем и контрактом, эмитирует Swap, удерживает swap fee через poolConfiguration.
* Важные require / проверки безопасности — требует, чтобы участвующие активы/пулы были whitelisted, проверяет minAmountOut и вызывает internal quote с контролем fee. Также контракт находится под whenNotPaused и nonReentrant.【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L98-L226】

### Управление пулом и протоколами
`execTransaction(address to, bytes calldata data)`
* Кто может вызывать — только manager, назначенный владельцем.
* Что делает — позволяет менеджеру вызвать whitelisted внешний протокол или пул, используя guard проверки dHEDGE.
* Побочные эффекты — исполняет произвольный call, может переводить активы, эмитирует TokenSwapperTransactionExecuted.
* Важные require / проверки безопасности — проверяет whenNotPaused, nonReentrant, требует txGuard > 0, запрещает нулевой адрес и использует AddressHelper.tryAssemblyCall для безопасного вызова.【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L228-L272】

### Настройки владельца
`setAssets(AssetConfig[] calldata _assetConfigs)`
* Кто может вызывать — только poolTokenSwapperOwner.
* Что делает — включает или отключает активы для обменов.
* Побочные эффекты — обновляет assetConfiguration, проверяет актив через factory.isValidAsset().
* Важные require / проверки безопасности — запрещает указывать пул как актив, использует валидацию IFactory.isValidAsset().【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L274-L447】

`setPools(PoolConfig[] calldata _poolConfigs)`
* Кто может вызывать — только poolTokenSwapperOwner.
* Что делает — настраивает список разрешённых пулов и их swap fee.
* Побочные эффекты — обновляет poolConfiguration, устанавливает флаг включения и размер комиссии.
* Важные require / проверки безопасности — проверяет, что адрес является пулом через factory.isPool(), хранит fee в PoolData.【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L283-L456】

`setManager(address _manager)`
* Кто может вызывать — только poolTokenSwapperOwner.
* Что делает — назначает нового manager для execTransaction.
* Побочные эффекты — обновляет manager.
* Важные require / проверки безопасности — запрещает нулевой адрес в _setManager().【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L290-L295】【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L458-L461】

`setSwapWhitelist(SwapWhitelistConfig[] calldata _swapWhitelist)`
* Кто может вызывать — только poolTokenSwapperOwner.
* Что делает — добавляет или удаляет адреса, которые могут звать swap().
* Побочные эффекты — обновляет mapping swapWhitelist.
* Важные require / проверки безопасности — только права владельца, дополнительные проверки отсутствуют.【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L297-L302】【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L463-L467】

`salvage(IERC20Upgradeable _token, uint256 _amount)`
* Кто может вызывать — только poolTokenSwapperOwner.
* Что делает — выводит указанный ERC20 токен, который остался на контракте.
* Побочные эффекты — переводит `_amount` токена владельцу.
* Важные require / проверки безопасности — никаких дополнительных проверок; ответственность несёт владелец.【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L304-L310】

`pause()` / `unpause()`
* Кто может вызывать — только poolTokenSwapperOwner.
* Что делает — глобально останавливает или возобновляет swap и execTransaction.
* Побочные эффекты — обновляет состояние паузы PausableUpgradeable.
* Важные require / проверки безопасности — защищено onlyOwner, применяется модификатор whenNotPaused к операциям.【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L312-L321】

## Events
* `TokenSwapperTransactionExecuted(address swapper, address manager, uint16 transactionType)` — зафиксирован вызов execTransaction с определённым типом транзакции.  Эмитится в: execTransaction().【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L63-L272】
* `Swap(address user, address tokenIn, address tokenOut, uint256 amountIn, uint256 amountOut)` — выполнен обмен между активами или пулами.  Эмитится в: swapAssetToPool(), swapPoolToAsset(), swapPoolToPool().【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L66-L226】

## Безопасность и контроль доступа
swapWhitelist может передавать активы через swap(), но ограничен списком активов и пулов, заданных owner, а каждая операция проверяет минимальное количество и удерживает комиссию согласно PoolData.【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L98-L226】【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L377-L438】
poolTokenSwapperOwner управляет whitelists, swap fee, менеджером и может вызвать salvage, что даёт технический контроль над активами, временно находящимися на контракте.【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L274-L310】
investor напрямую не взаимодействует с контрактом и не может инициировать произвольные свопы, полагаясь на manager и swapWhitelist для соблюдения политики пула.【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L98-L302】
