# PoolTokenSwapper

Контракт выполняет обмены между пул токенами и базовыми активами dHEDGE, поддерживает whitelist маршрутов и позволяет poolManager вызывать разрешённые транзакции.

## Состояние
- `poolFactory (address)` — фабрика dHEDGE для проверок guard и цен. Устанавливается в `initialize()` и используется во всех проверках активов и пулов. 【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L74-L95】
- `poolLogic (address)` — псевдоадрес пула для guard совместимости, фиксируется как адрес контракта при `initialize()`.【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L74-L95】
- `manager (address)` — адрес poolManager, которому разрешён `execTransaction`. Задаётся в `initialize()` и обновляется `setManager()`.【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L74-L95】【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L290-L295】
- `assetConfiguration (mapping(address => bool))` — whitelist поддерживаемых активов. Обновляется `_setAssets()` при `initialize()` и `setAssets()`.【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L56-L280】【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L442-L447】
- `poolConfiguration (mapping(address => PoolData))` — параметры разрешённых пулов с флагом и swap fee. Настраивается `_setPools()` из `initialize()` и `setPools()`.【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L57-L288】【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L450-L455】
- `swapWhitelist (mapping(address => bool))` — список адресов, которым разрешено вызывать `swap`. Заполняется `_setSwapWhitelist()` из `initialize()` и `setSwapWhitelist()`.【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L58-L302】【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L463-L466】
- `FEE_DENOMINATOR (uint256)` — база 10_000 для расчёта swap fee. Используется в `_getSwapFee()` и проверках минимального выхода. 【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L60-L61】【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L469-L472】

## Публичные и external функции
### Инициализация
`initialize(address _factory, address _manager, AssetConfig[] calldata _assetConfigs, PoolConfig[] calldata _poolConfigs, SwapWhitelistConfig[] calldata _swapWhitelist)`
- Кто может вызывать — однократно poolTokenSwapperOwner при развёртывании прокси.
- Что делает — задаёт фабрику, менеджера, whitelist активов/пулов и список разрешённых отправителей для `swap`.
- Побочные эффекты — инициализирует upgradable базовые контракты, настраивает все маппинги и роль manager.
- Важные проверки — требует валидные активы и пулы через `_setAssets`/`_setPools`, проверяет ненулевой `_manager`.【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L74-L95】【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L442-L461】

### Обмены
`swap(address tokenIn, address tokenOut, uint256 amountIn, uint256 minAmountOut)`
- Кто может вызывать — адрес из `swapWhitelist` при активном контракте (не paused).
- Что делает — определяет тип маршрута (asset↔pool) и вызывает соответствующий внутренний swap.
- Побочные эффекты — переводит токены между пользователем и контрактом, эмитирует `Swap`.
- Важные проверки — проверяет whitelist, статус пула/актива и требуемый `minAmountOut` в внутренних функциях `swap*`.【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L130-L225】【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L171-L225】

### Управление транзакциями пула
`execTransaction(address to, bytes calldata data)`
- Кто может вызывать — poolManager, сохранённый в `manager`.
- Что делает — выполняет whitelisted внешнюю транзакцию от имени контракта (допустимые контракты/активы). 
- Побочные эффекты — делает внешний вызов через `tryAssemblyCall`, эмитирует `TokenSwapperTransactionExecuted`.
- Важные проверки — требует ненулевой `to`, получает разрешение от guard фабрики, проверяет тип транзакции и успех вызова. 【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L230-L272】

### Настройки poolTokenSwapperOwner
`setAssets(AssetConfig[] calldata _assetConfigs)`
- Кто может вызывать — poolTokenSwapperOwner.
- Что делает — обновляет whitelist активов и их статус.
- Побочные эффекты — вызывает `_setAssets`, включая/отключая активы.
- Важные проверки — каждое значение должно быть валидным активом фабрики и не может быть пулом.【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L276-L280】【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L442-L447】

`setPools(PoolConfig[] calldata _poolConfigs)`
- Кто может вызывать — poolTokenSwapperOwner.
- Что делает — задаёт доступные пулы и их swap fee.
- Побочные эффекты — обновляет `poolConfiguration` через `_setPools`.
- Важные проверки — адрес должен быть зарегистрированным пулом фабрики; swap fee записывается без дополнительных ограничений, но применяется в `_getSwapFee`.【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L283-L288】【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L450-L455】

`setManager(address _manager)`
- Кто может вызывать — poolTokenSwapperOwner.
- Что делает — переназначает poolManager для `execTransaction`.
- Побочные эффекты — вызывает `_setManager`, обновляя адрес и проверяя валидность.
- Важные проверки — запрещён нулевой адрес. 【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L290-L295】【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L458-L461】

`setSwapWhitelist(SwapWhitelistConfig[] calldata _swapWhitelist)`
- Кто может вызывать — poolTokenSwapperOwner.
- Что делает — включает или выключает адреса, которым разрешён `swap`.
- Побочные эффекты — обновляет `swapWhitelist` через `_setSwapWhitelist`.
- Важные проверки — список может содержать любые адреса; хранение напрямую перезаписывается. 【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L297-L302】【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L463-L466】

`salvage(IERC20Upgradeable _token, uint256 _amount)`
- Кто может вызывать — poolTokenSwapperOwner.
- Что делает — выводит произвольный токен с контракта владельцу.
- Побочные эффекты — переводит `_amount` указанного токена на адрес владельца.
- Важные проверки — полагается на SafeERC20; дополнительных ограничений нет. 【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L304-L310】

`pause()` / `unpause()`
- Кто может вызывать — poolTokenSwapperOwner.
- Что делает — приостанавливает или возобновляет `swap` и `execTransaction`.
- Побочные эффекты — включает/выключает Pausable флаг.
- Важные проверки — нет дополнительных проверок, используется модификатор onlyOwner. 【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L312-L322】

## Events
- `TokenSwapperTransactionExecuted(address swapper, address manager, uint16 transactionType)` — фиксация выполнения транзакции менеджера. Эмитится в — `execTransaction()`.【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L63-L272】
- `Swap(address user, address tokenIn, address tokenOut, uint256 amountIn, uint256 amountOut)` — успешный обмен пользователя. Эмитится в — `swapAssetToPool()`, `swapPoolToAsset()`, `swapPoolToPool()`.【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L66-L225】

## Безопасность и контроль доступа
- poolTokenSwapperOwner управляет whitelist активов, пулов, swap отправителей и адресом poolManager, а также может паузить контракт и извлекать лишние токены.【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L74-L322】
- swapWhitelist участники могут вызывать только `swap`, причём маршруты ограничены разрешёнными активами/пулами и минимальным ожидаемым количеством. 【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L130-L225】
- poolManager (manager) может вызывать `execTransaction`, но каждый вызов проходит через guard фабрики и может касаться только поддерживаемых адресов. 【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L230-L272】
