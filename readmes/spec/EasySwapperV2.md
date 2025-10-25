# EasySwapperV2

Контракт управляет депозитами и выводами инвесторов, создаёт WithdrawalVault и использует внешний swapper.

## Состояние
- `swapper (address)` — внешний агрегатор свопов. Меняет easySwapperOwner через `setSwapper()`.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L45-L498】
- `wrappedNativeToken (address)` — токен для обёртки нативных депозитов. Задаётся в `initialize()` и неизменен.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L107-L120】
- `customCooldown (uint256)` — пониженный кулдаун для whitelisted пулов. Настраивает easySwapperOwner через `setCustomCooldown()` и `initialize()`.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L51-L505】
- `withdrawalContracts (mapping(address => address))` — WithdrawalVault для стандартных выводов инвесторов. Обновляется в `_deployVault()` и `_initWithdrawalFor()`.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L53-L520】
- `customCooldownDepositsWhitelist (mapping(address => bool))` — пулы с разрешённым `customCooldown`. Управляет easySwapperOwner через `setCustomCooldownWhitelist()`.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L56-L456】
- `dHedgePoolFactory (address)` — адрес фабрики для проверок пулов и активов. Настраивает easySwapperOwner через `setdHedgePoolFactory()`.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L59-L477】
- `isAuthorizedWithdrawer (mapping(address => bool))` — whitelist authorizedWithdrawer. Изменяет easySwapperOwner через `setAuthorizedWithdrawers()`.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L61-L485】
- `limitOrderContracts (mapping(address => address))` — WithdrawalVault для лимитных выводов. Создаётся в `_deployVault()` и `initLimitOrderWithdrawalFor()`.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L64-L520】

## Публичные и external функции
### Депозиты
`nativeDeposit(address _dHedgeVault, uint256 _expectedAmountReceived)`
- Кто может вызывать — investor.
- Что делает — заворачивает нативный токен, депонирует в пул и получает долевые токены.
- Побочные эффекты — вызывает `_nativeDeposit()` с `DEFAULT_COOLDOWN`, увеличивает allowance пула и использует `depositForWithCustomCooldown`.
- Важные проверки — пул должен быть валиден, проверяется ожидаемое количество долевых токенов и паузы пула.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L238-L240】【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L600-L612】

`nativeDepositWithCustomCooldown(address _dHedgeVault, uint256 _expectedAmountReceived)`
- Кто может вызывать — investor из `customCooldownDepositsWhitelist`.
- Что делает — проводит нативный депозит с `customCooldown`.
- Побочные эффекты — вызывает `_nativeDeposit()` с кастомным кулдауном и обновляет allowance.
- Важные проверки — модификатор `isCustomCooldownAllowed` проверяет whitelist и параметры entry fee.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L247-L252】【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L88-L95】

### Инициация вывода
`initWithdrawal(address _dHedgeVault, uint256 _amountIn, IPoolLogic.ComplexAsset[] memory _complexAssetsData)`
- Кто может вызывать — investor.
- Что делает — передаёт долевые токены контракту, создаёт или использует WithdrawalVault и инициирует `withdrawToSafe`.
- Побочные эффекты — деплоит vault при первом вызове, записывает его в `withdrawalContracts`, эмитирует `WithdrawalInitiated`.
- Важные проверки — требует валидный пул, проверяет allowance долевых токенов и параметры сложных активов.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L260-L280】【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L642-L659】

`initLimitOrderWithdrawalFor(address _user, address _dHedgeVault, uint256 _amountIn, IPoolLogic.ComplexAsset[] memory _complexAssetsData)`
- Кто может вызывать — контракты лимитных ордеров вроде PoolLimitOrderManager.
- Что делает — инициирует вывод по лимитному ордеру и сохраняет vault для `_user` в `limitOrderContracts`.
- Побочные эффекты — переводит долевые токены пользователя, создаёт vault при необходимости, эмитирует `WithdrawalInitiated` и добавляет адрес в очередь settlement.
- Важные проверки — требует валидный пул, проверяет allowance и соответствие `complexAssetsData` требованиям guard.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L282-L296】【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L642-L660】

### Завершение вывода инвестора
`completeWithdrawal(IWithdrawalVault.MultiInSingleOutData calldata _swapData, uint256 _expectedDestTokenAmount)`
- Кто может вызывать — investor с активным WithdrawalVault.
- Что делает — свопает активы vault в один токен и отправляет инвестору.
- Побочные эффекты — обращается к swapper через vault, очищает записи активов, эмитирует `WithdrawalCompleted`.
- Важные проверки — проверяет существование vault и минимальное количество токена через `swapToSingleAsset`.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L303-L309】【F:contracts/swappers/easySwapperV2/WithdrawalVault.sol†L47-L109】

`completeWithdrawal()`
- Кто может вызывать — investor.
- Что делает — забирает активы из vault без свопа.
- Побочные эффекты — вызывает `_claimTokensFromVault`, обновляет хранилище, эмитирует `WithdrawalCompleted`.
- Важные проверки — удостоверяется, что vault принадлежит инвестору и активы можно вернуть напрямую.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L311-L315】【F:contracts/swappers/easySwapperV2/WithdrawalVault.sol†L110-L157】

### Завершение лимитного вывода
`completeLimitOrderWithdrawal(IWithdrawalVault.MultiInSingleOutData calldata _swapData, uint256 _expectedDestTokenAmount)`
- Кто может вызывать — investor с активным лимитным vault.
- Что делает — свопает активы лимитного vault и отправляет токен инвестору.
- Побочные эффекты — вызывает swap через vault, эмитирует `WithdrawalCompleted`.
- Важные проверки — проверяет наличие лимитного vault и минимальный `destTokenAmount`.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L321-L326】【F:contracts/swappers/easySwapperV2/WithdrawalVault.sol†L47-L122】

`completeLimitOrderWithdrawal()`
- Кто может вызывать — investor.
- Что делает — завершает лимитный вывод без свопа и получает активы напрямую.
- Побочные эффекты — вызывает `completeLimitOrderWithdrawalFor(msg.sender)`, эмитирует `WithdrawalCompleted`.
- Важные проверки — делегирует проверки в версию без swap данных и использует `recoverAssets` vault.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L328-L332】【F:contracts/swappers/easySwapperV2/WithdrawalVault.sol†L110-L157】

`completeLimitOrderWithdrawalFor(address _user, IWithdrawalVault.MultiInSingleOutData calldata _swapData, uint256 _expectedDestTokenAmount)`
- Кто может вызывать — authorizedWithdrawer.
- Что делает — завершает лимитный вывод инвестора со свопом и отправляет токен получателю.
- Побочные эффекты — использует swapper через vault `_user`, эмитирует `WithdrawalCompleted`.
- Важные проверки — модификатор `onlyAuthorizedWithdrawers` проверяет whitelist, vault контролирует принадлежность и минимальный `destTokenAmount`.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L339-L345】【F:contracts/swappers/easySwapperV2/WithdrawalVault.sol†L47-L122】

`completeLimitOrderWithdrawalFor(address _user)`
- Кто может вызывать — любой адрес.
- Что делает — переводит активы из лимитного vault пользователю без свопа.
- Побочные эффекты — вызывает `_claimTokensFromVault` для лимитного режима, эмитирует `WithdrawalCompleted`.
- Важные проверки — проверяет наличие vault и совпадение depositor в `recoverAssets()`.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L347-L351】【F:contracts/swappers/easySwapperV2/WithdrawalVault.sol†L110-L157】

### Дополнительные функции
`partialWithdraw(uint256 _portion, address _to)`
- Кто может вызывать — пул через PoolLogic.
- Что делает — выдаёт долю активов vault пулу в процессе `withdrawProcessing`.
- Побочные эффекты — вызывает `recoverAssets` в vault, эмитирует `WithdrawalCompleted`.
- Важные проверки — проверяет диапазон `_portion` и использует vault вызывающего пула.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L353-L360】

`unrollAndClaim(address _dHedgeVault, uint256 _amountIn, IPoolLogic.ComplexAsset[] memory _complexAssetsData)`
- Кто может вызывать — investor.
- Что делает — выполняет вывод без свопа в один шаг через `initWithdrawal` и прямой `recoverAssets`.
- Побочные эффекты — создаёт или переиспользует vault, вызывает `recoverAssets`, эмитирует `WithdrawalCompleted`.
- Важные проверки — наследует проверки `initWithdrawal` и требует доступ к активам vault.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L363-L383】

### Настройки easySwapperOwner
`setCustomCooldownWhitelist(WhitelistSetting[] calldata _whitelistSettings)`
- Кто может вызывать — easySwapperOwner.
- Что делает — включает или отключает `customCooldown` для пулов.
- Побочные эффекты — обновляет `customCooldownDepositsWhitelist`.
- Важные проверки — проверяет, что адреса являются dHEDGE пулами через `isdHedgeVault()`.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L449-L456】

`setSwapper(ISwapper _swapper)`
- Кто может вызывать — easySwapperOwner.
- Что делает — назначает новый swapper.
- Побочные эффекты — обновляет адрес `swapper`.
- Важные проверки — запрещает нулевой адрес во внутреннем `_setSwapper`.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L459-L498】

`setCustomCooldown(uint256 _customCooldown)`
- Кто может вызывать — easySwapperOwner.
- Что делает — устанавливает значение `customCooldown`.
- Побочные эффекты — обновляет переменную для будущих депозитов.
- Важные проверки — диапазон от 5 минут до `DEFAULT_COOLDOWN` проверяется в `_setCustomCooldown`.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L465-L505】

`setdHedgePoolFactory(address _dHedgePoolFactory)`
- Кто может вызывать — easySwapperOwner.
- Что делает — задаёт адрес фабрики пулов.
- Побочные эффекты — обновляет `dHedgePoolFactory`.
- Важные проверки — запрещён нулевой адрес.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L471-L477】

`setAuthorizedWithdrawers(WhitelistSetting[] calldata _whitelistSettings)`
- Кто может вызывать — easySwapperOwner.
- Что делает — выдаёт или отзывает роль authorizedWithdrawer.
- Побочные эффекты — обновляет `isAuthorizedWithdrawer` и эмитирует событие.
- Важные проверки — ограничено правами easySwapperOwner, дополнительных проверок адресов нет.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L479-L485】

## Events
- `ZapDepositCompleted(address depositor, address dHedgeVault, IERC20 vaultDepositToken, IERC20 userDepositToken, uint256 amountReceived, uint256 lockupTime)` — завершение депозита через swapper. Эмитится в — `_zapDeposit()`.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L67-L74】【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L560-L594】
- `WithdrawalInitiated(address withdrawalVault, address depositor, address dHedgeVault, uint256 amountWithdrawn)` — старт вывода и фиксация vault. Эмитится в — `_initWithdrawalFor()`.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L75-L688】
- `WithdrawalCompleted(address withdrawalVault, address depositor)` — завершение вывода и выдача активов. Эмитится в — `_completeWithdrawal()`, `_claimTokensFromVault()`, `partialWithdraw()`, `unrollAndClaim()`.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L303-L383】
- `WithdrawalVaultCreated(address withdrawalVault, address depositor)` — развёртывание vault для стандартного вывода. Эмитится в — `_deployVault()`.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L507-L516】
- `LimitOrderVaultCreated(address limitOrderVault, address depositor)` — развёртывание vault для лимитного вывода. Эмитится в — `_deployVault()`.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L507-L520】
- `AuthorizedWithdrawersSet(WhitelistSetting[] whitelistSettings)` — обновление списка authorizedWithdrawer. Эмитится в — `setAuthorizedWithdrawers()`.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L479-L485】

## Безопасность и контроль доступа
- easySwapperOwner управляет swapper, `customCooldown`, whitelist пулов и адресом фабрики, влияя на инфраструктуру, но не получая прямого доступа к активам без операций WithdrawalVault.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L449-L505】
- authorizedWithdrawer завершает лимитные выводы через `completeLimitOrderWithdrawalFor`, не имея прав менять настройки и полагаясь на ограничения vault.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L339-L485】
- investor инициирует и завершает выводы, указывает `_expectedDestTokenAmount` для защиты от проскальзывания и может выбирать прямой вывод без свопа, оставаясь зависимым от настроек easySwapperOwner и swapper.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L260-L333】
