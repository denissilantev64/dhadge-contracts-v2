# EasySwapperV2

Контракт обрабатывает выводы инвесторов из пулов и разворачивает сложные активы в отдельные WithdrawalVault. Выполняет свопы через внешний swapper, чтобы выдать один целевой токен с проверкой ожиданий по количеству. Поддерживает интересы investor и poolManager, но easySwapperOwner контролирует whitelists и точки интеграции, а authorizedWithdrawer завершает операции.

## Состояние
* `swapper (address)` — адрес внешнего агрегатора свопов, через него проходят продажи активов из WithdrawalVault.  Кто может менять — easySwapperOwner через setSwapper().【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L45-L462】
* `wrappedNativeToken (address)` — обёрнутый нативный токен, который принимается при депозитах и выводах.  Кто может менять — устанавливается в initialize() и далее не меняется.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L47-L123】
* `customCooldown (uint256)` — сокращённый кулдаун для депозитов, позволяющий быстрее выводить средства после zaps.  Кто может менять — easySwapperOwner через setCustomCooldown() и initialize().【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L50-L505】
* `withdrawalContracts (mapping(address => address))` — хранилище WithdrawalVault для стандартных выводов инвестора.  Кто может менять — создаётся автоматически в _deployVault() при initWithdrawal().【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L53-L521】
* `customCooldownDepositsWhitelist (mapping(address => bool))` — список пулов, которым разрешён сниженный кулдаун депозитов.  Кто может менять — easySwapperOwner через setCustomCooldownWhitelist().【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L56-L456】
* `dHedgePoolFactory (address)` — ссылка на PoolFactory для проверки пула и цен.  Кто может менять — easySwapperOwner через setdHedgePoolFactory().【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L59-L477】
* `isAuthorizedWithdrawer (mapping(address => bool))` — список адресов authorizedWithdrawer, которые могут завершать лимитные выводы.  Кто может менять — easySwapperOwner через setAuthorizedWithdrawers().【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L61-L485】
* `limitOrderContracts (mapping(address => address))` — WithdrawalVault для лимитных выводов, управляется вместе с limit orders.  Кто может менять — создаётся автоматически в _deployVault() и initLimitOrderWithdrawalFor().【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L64-L520】
* `карта разрешённых пулов` — не найдено в коде.
* `feeNumerator/feeDenominator` — не найдено в коде.
* `feeSink / feeRecipient` — не найдено в коде.
* `manager fee bypass` — не найдено в коде.
* `лимиты проскальзывания и маршрутов свопа` — не найдено в коде.

## Публичные и external функции
### Запуск вывода
`initWithdrawal(address _dHedgeVault, uint256 _amountIn, IPoolLogic.ComplexAsset[] memory _complexAssetsData)`
* Кто может вызывать — investor, который держит долевые токены пула.
* Что делает — переводит долевые токены на контракт, создаёт или повторно использует WithdrawalVault и инициирует withdrawToSafe с раскрытием сложных активов.  Возвращает список активов для отслеживания.
* Побочные эффекты — создаёт прокси WithdrawalVault при первом вызове, обновляет mapping withdrawalContracts, эмитирует WithdrawalInitiated.
* Важные require / проверки безопасности — проверяет, что адрес пула признан isdHedgeVault(), и что контракт получил allowance долевых токенов пула.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L260-L360】【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L642-L660】

`initLimitOrderWithdrawalFor(address _user, address _dHedgeVault, uint256 _amountIn, IPoolLogic.ComplexAsset[] memory _complexAssetsData)`
* Кто может вызывать — контракты лимитных ордеров, например PoolLimitOrderManager.
* Что делает — инициирует вывод для инвестора при исполнении лимитного ордера и запоминает vault в limitOrderContracts.
* Побочные эффекты — переводит долевые токены пользователя, открывает WithdrawalVault для лимитного режима, заносит инвестора в очередь settlement через события.
* Важные require / проверки безопасности — требует isdHedgeVault(), проверяет allowance долевых токенов, использует guard-параметры complexAssetsData.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L282-L345】【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L642-L660】

### Завершение вывода
`completeWithdrawal(IWithdrawalVault.MultiInSingleOutData calldata _swapData, uint256 _expectedDestTokenAmount)`
* Кто может вызывать — investor, завершивший первый шаг вывода.
* Что делает — свопает все активы из WithdrawalVault в один токен по заданным маршрутам и отправляет инвестору.
* Побочные эффекты — вызывает swapper.swap через vault, очищает записи о токенах, эмитирует WithdrawalCompleted.
* Важные require / проверки безопасности — проверяет наличие созданного vault и минимальное ожидаемое количество через require в vault.swapToSingleAsset().【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L299-L360】【F:contracts/swappers/easySwapperV2/WithdrawalVault.sol†L47-L109】

`completeLimitOrderWithdrawalFor(address _user, IWithdrawalVault.MultiInSingleOutData calldata _swapData, uint256 _expectedDestTokenAmount)`
* Кто может вызывать — только authorizedWithdrawer из whitelist.
* Что делает — завершает вывод по лимитному ордеру и переводит конвертированный токен инвестору.
* Побочные эффекты — вызывает swapper через vault пользователя, эмитирует WithdrawalCompleted.
* Важные require / проверки безопасности — модификатор onlyAuthorizedWithdrawers проверяет whitelist, vault контролирует минимальное количество токена и принадлежность depositor.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L334-L345】【F:contracts/swappers/easySwapperV2/WithdrawalVault.sol†L47-L122】

`completeLimitOrderWithdrawalFor(address _user)`
* Кто может вызывать — любой адрес.
* Что делает — переводит все активы из лимитного WithdrawalVault пользователю без свопа.
* Побочные эффекты — очищает vault и эмитирует WithdrawalCompleted.
* Важные require / проверки безопасности — проверяет наличие vault и принадлежность depositor, операции происходят внутри recoverAssets().【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L347-L360】【F:contracts/swappers/easySwapperV2/WithdrawalVault.sol†L110-L157】

### Настройки владельца
`setCustomCooldownWhitelist(WhitelistSetting[] calldata _whitelistSettings)`
* Кто может вызывать — только easySwapperOwner.
* Что делает — включает или выключает пониженный кулдаун депозитов для выбранных пулов.
* Побочные эффекты — обновляет mapping customCooldownDepositsWhitelist, проверяет, что адрес является валидным пулом.
* Важные require / проверки безопасности — require(isdHedgeVault()), защита от нулевых адресов через проверку пула.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L449-L456】

`setSwapper(ISwapper _swapper)`
* Кто может вызывать — только easySwapperOwner.
* Что делает — назначает внешний агрегатор свопов.
* Побочные эффекты — обновляет адрес swapper.
* Важные require / проверки безопасности — запрещает нулевой адрес.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L459-L498】

`setCustomCooldown(uint256 _customCooldown)`
* Кто может вызывать — только easySwapperOwner.
* Что делает — задаёт новый сокращённый кулдаун депозитов.
* Побочные эффекты — обновляет customCooldown.
* Важные require / проверки безопасности — диапазон от 5 минут до DEFAULT_COOLDOWN проверяется в internal setter.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L465-L505】

`setdHedgePoolFactory(address _dHedgePoolFactory)`
* Кто может вызывать — только easySwapperOwner.
* Что делает — указывает актуальный PoolFactory для проверок.
* Побочные эффекты — обновляет dHedgePoolFactory.
* Важные require / проверки безопасности — запрещён нулевой адрес.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L471-L477】

`setAuthorizedWithdrawers(WhitelistSetting[] calldata _whitelistSettings)`
* Кто может вызывать — только easySwapperOwner.
* Что делает — выдаёт или отзывает роль authorizedWithdrawer.
* Побочные эффекты — обновляет mapping isAuthorizedWithdrawer, эмитирует AuthorizedWithdrawersSet.
* Важные require / проверки безопасности — ограничено владельцем, проверок адресов нет кроме прав владельца.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L479-L485】

`salvage(address token, uint256 amount)`
* Кто может вызывать — не найдено в коде.
* Что делает — не найдено в коде.
* Побочные эффекты — не найдено в коде.
* Важные require / проверки безопасности — не найдено в коде.

`setPoolAllowed(address pool, bool allowed)`
* Кто может вызывать — не найдено в коде.
* Что делает — не найдено в коде.
* Побочные эффекты — не найдено в коде.
* Важные require / проверки безопасности — не найдено в коде.

`setFee(...) / setFeeSink(...) / setManagerFeeBypass(...)`
* Кто может вызывать — не найдено в коде.
* Что делает — не найдено в коде.
* Побочные эффекты — не найдено в коде.
* Важные require / проверки безопасности — не найдено в коде.

## Events
* `ZapDepositCompleted(address depositor, address dHedgeVault, IERC20 vaultDepositToken, IERC20 userDepositToken, uint256 amountReceived, uint256 lockupTime)` — завершение депозита через swapper и запись полученного количества.  Эмитится в: _zapDeposit().【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L586-L594】
* `WithdrawalInitiated(address withdrawalVault, address depositor, address dHedgeVault, uint256 amountWithdrawn)` — запуск вывода и создание WithdrawalVault.  Эмитится в: _initWithdrawalFor().【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L642-L660】
* `WithdrawalCompleted(address withdrawalVault, address depositor)` — завершение вывода и выдача активов или токена.  Эмитится в: _completeWithdrawal(), _claimTokensFromVault(), partialWithdraw(), unrollAndClaim().【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L299-L383】
* `WithdrawalVaultCreated(address withdrawalVault, address depositor)` — развёртывание стандартного WithdrawalVault.  Эмитится в: _deployVault().【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L507-L521】
* `LimitOrderVaultCreated(address limitOrderVault, address depositor)` — развёртывание WithdrawalVault для лимитного вывода.  Эмитится в: _deployVault().【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L507-L520】
* `AuthorizedWithdrawersSet(WhitelistSetting[] whitelistSettings)` — обновление списка authorizedWithdrawer.  Эмитится в: setAuthorizedWithdrawers().【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L479-L485】

## Безопасность и контроль доступа
easySwapperOwner управляет swapper, whitelist пулов с пониженным кулдауном и адреса PoolFactory, поэтому контролирует инфраструктуру и может косвенно влиять на обработку активов, но не может напрямую забирать средства без дополнительных функций salvage.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L449-L485】
authorizedWithdrawer может инициировать перевод активов из WithdrawalVault инвестору, однако не может менять настройки swapper, whitelist или кулдаунов.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L334-L485】
investor запускает и завершает вывод, но не имеет прав менять комиссии или whitelists и должен доверять easySwapperOwner и authorizedWithdrawer в части корректности маршрутов. Контроль за проскальзыванием осуществляется через `_expectedDestTokenAmount`, который передаётся в каждую операцию завершения.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L299-L360】
