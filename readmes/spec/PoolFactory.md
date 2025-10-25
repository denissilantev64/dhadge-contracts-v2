# PoolFactory

PoolFactory развёртывает новые пулы на базе прокси PoolLogic и PoolManagerLogic.
Хранит глобальные лимиты комиссий, допустимых активов, exit cooldown и флаги паузы.
Поддерживает ссылки на guard системы, AssetHandler и daoAddress как feeRecipient.
Позволяет пулу ретранслировать события через фабрику для удобства индексаторов.

## Состояние
* `deployedFunds (address[])` — список всех развёрнутых пулов для фронтенда и бэкенда.【F:contracts/PoolFactory.sol†L98-L243】
  Кто может менять — автоматически внутри createFund().【F:contracts/PoolFactory.sol†L184-L244】
* `daoAddress (address)` — адрес feeRecipient, получает часть комиссий из mintManagerFee().【F:contracts/PoolFactory.sol†L100-L243】
  Кто может менять — только poolFactoryOwner через setDAOAddress().【F:contracts/PoolFactory.sol†L274-L289】
* `governanceAddress (address)` — источник карт contractGuard и assetGuard в IGovernance.【F:contracts/PoolFactory.sol†L101-L305】
  Кто может менять — только poolFactoryOwner через setGovernanceAddress().【F:contracts/PoolFactory.sol†L292-L306】
* `_assetHandler (address)` — адрес AssetHandler, даёт цены и типы активов.【F:contracts/PoolFactory.sol†L103-L492】
  Кто может менять — только poolFactoryOwner через setAssetHandler().【F:contracts/PoolFactory.sol†L480-L492】
* `_daoFeeNumerator (uint256)` и `_daoFeeDenominator (uint256)` — доля комиссий, отправляемая feeRecipient при mintManagerFee().【F:contracts/PoolFactory.sol†L104-L321】
  Кто может менять — только poolFactoryOwner через setDaoFee().【F:contracts/PoolFactory.sol†L308-L322】
* `isPool (mapping(address => bool))` — реестр валидных PoolLogic прокси для проверок доступа.【F:contracts/PoolFactory.sol†L107-L232】
  Кто может менять — createFund() после деплоя пула.【F:contracts/PoolFactory.sol†L184-L232】
* `maximumPerformanceFeeNumerator (uint256)` и `_MANAGER_FEE_DENOMINATOR (uint256)` — глобальные пределы performance fee и знаменатель комиссий.【F:contracts/PoolFactory.sol†L109-L396】
  Кто может менять — только poolFactoryOwner через setMaximumFee().【F:contracts/PoolFactory.sol†L349-L397】
* `maximumManagerFeeNumerator (uint256)` — лимит management fee для всех пулов.【F:contracts/PoolFactory.sol†L131-L397】
  Кто может менять — только poolFactoryOwner через setMaximumFee().【F:contracts/PoolFactory.sol†L349-L397】
* `maximumEntryFeeNumerator (uint256)` и `maximumExitFeeNumerator (uint256)` — верхние границы entry и exit fee пула.【F:contracts/PoolFactory.sol†L137-L397】【F:contracts/PoolFactory.sol†L142-L397】
  Кто может менять — только poolFactoryOwner через setMaximumFee().【F:contracts/PoolFactory.sol†L349-L397】
* `maximumPerformanceFeeNumeratorChange (uint256)` — ограничение шага увеличения performance fee после анонса.【F:contracts/PoolFactory.sol†L120-L405】
  Кто может менять — только poolFactoryOwner через setMaximumPerformanceFeeNumeratorChange().【F:contracts/PoolFactory.sol†L399-L405】
* `performanceFeeNumeratorChangeDelay (uint256)` — глобальная задержка перед вступлением в силу повышенных комиссий.【F:contracts/PoolFactory.sol†L121-L413】
  Кто может менять — только poolFactoryOwner через setPerformanceFeeNumeratorChangeDelay().【F:contracts/PoolFactory.sol†L407-L413】
* `_exitCooldown (uint256)` — обязательный кулдаун вывода для инвесторов всех пулов.【F:contracts/PoolFactory.sol†L113-L431】
  Кто может менять — только poolFactoryOwner через setExitCooldown().【F:contracts/PoolFactory.sol†L415-L425】
* `customCooldownWhitelist (mapping(address => bool))` — адреса, которым разрешён depositForWithCustomCooldown в пулах.【F:contracts/PoolFactory.sol†L128-L258】
  Кто может менять — только poolFactoryOwner через addCustomCooldownWhitelist()/removeCustomCooldownWhitelist().【F:contracts/PoolFactory.sol†L246-L258】
* `_maximumSupportedAssetCount (uint256)` — предел активов в whitelist пула, считывается PoolManagerLogic.【F:contracts/PoolFactory.sol†L115-L451】
  Кто может менять — только poolFactoryOwner через setMaximumSupportedAssetCount().【F:contracts/PoolFactory.sol†L433-L445】
* `receiverWhitelist (mapping(address => bool))` — адреса, которые могут принимать заблокированные pool tokens.【F:contracts/PoolFactory.sol†L134-L272】
  Кто может менять — только poolFactoryOwner через addReceiverWhitelist()/removeReceiverWhitelist().【F:contracts/PoolFactory.sol†L260-L272】
* `pausedPools (mapping(address => bool))` — глобальная блокировка депозита, вывода, mint fee и трансферов пула.【F:contracts/PoolFactory.sol†L139-L523】
  Кто может менять — только poolFactoryOwner через setPoolsPaused().【F:contracts/PoolFactory.sol†L510-L523】
* `tradingPausedPools (mapping(address => bool))` — флаг запрета execTransaction в выбранном пуле.【F:contracts/PoolFactory.sol†L144-L523】
  Кто может менять — только poolFactoryOwner через setPoolsPaused().【F:contracts/PoolFactory.sol†L510-L523】
* `paused() (bool PausableUpgradeable)` — глобальная остановка всех createFund и операций фабрики.【F:contracts/PoolFactory.sol†L204-L507】
  Кто может менять — только poolFactoryOwner через pause()/unpause().【F:contracts/PoolFactory.sol†L494-L503】
* `poolVersion (mapping(address => uint256))`, `poolStorageVersion (uint256)`, `poolPerformanceAddress (address)` и `_exitFeeNumerator/_exitFeeDenominator` — устаревшие переменные, оставлены для совместимости хранилища.【F:contracts/PoolFactory.sol†L117-L126】
* `PoolPausedInput` — структура для пакетного обновления флагов паузы пула.【F:contracts/PoolFactory.sol†L50-L96】

## Публичные и external функции
### Деплой и реестр пулов
`createFund(bool _privatePool, address _manager, string _managerName, string _fundName, string _fundSymbol, uint256 _performanceFeeNumerator, uint256 _managerFeeNumerator, IHasSupportedAsset.Asset[] _supportedAssets)`
* Кто может вызывать — любой адрес.
* Что делает — деплоит прокси PoolLogic и PoolManagerLogic через ProxyFactory, линкует их, записывает пул в реестр и эмитит FundCreated.【F:contracts/PoolFactory.sol†L184-L244】
* Побочные эффекты — добавляет адрес в deployedFunds и isPool, передаёт стартовые комиссии и whitelist активов прокси менеджеру.【F:contracts/PoolFactory.sol†L214-L244】
* Важные require / проверки безопасности — запрещает вызов во время глобальной паузы фабрики.【F:contracts/PoolFactory.sol†L203-L205】

`getDeployedFunds()`
* Кто может вызывать — любой адрес.
* Что делает — возвращает массив всех пулов для индексации интерфейсом.【F:contracts/PoolFactory.sol†L545-L549】
* Побочные эффекты — нет.
* Важные require / проверки безопасности — нет.

`getInvestedPools(address _user)`
* Кто может вызывать — любой адрес.
* Что делает — перечисляет пулы, где investor держит долевые токены, используя PoolLogic.balanceOf().【F:contracts/PoolFactory.sol†L551-L569】
* Побочные эффекты — нет.
* Важные require / проверки безопасности — нет.

`getManagedPools(address _manager)`
* Кто может вызывать — любой адрес.
* Что делает — возвращает список пулов, где указан poolManager по данным PoolManagerLogic.manager().【F:contracts/PoolFactory.sol†L571-L589】
* Побочные эффекты — нет.
* Важные require / проверки безопасности — нет.

`emitPoolEvent()`
* Кто может вызывать — только poolLogic из реестра благодаря onlyPool модификатору.【F:contracts/PoolFactory.sol†L173-L595】
* Что делает — пробрасывает событие PoolEvent для индексации без подписки на каждый пул.【F:contracts/PoolFactory.sol†L592-L595】
* Побочные эффекты — эмитит PoolEvent.
* Важные require / проверки безопасности — проверяет, что msg.sender зарегистрирован как пул.【F:contracts/PoolFactory.sol†L173-L175】

`emitPoolManagerEvent()`
* Кто может вызывать — только действующий PoolManagerLogic через onlyPoolManager модификатор.【F:contracts/PoolFactory.sol†L178-L599】
* Что делает — эмитит PoolManagerEvent от имени менеджера.
* Побочные эффекты — событие для индексации.
* Важные require / проверки безопасности — проверяет, что msg.sender связан с валидным пулом и назначен как его менеджер.【F:contracts/PoolFactory.sol†L178-L181】

### Глобальные лимиты и комиссии
`setMaximumFee(uint256 _maxPerformanceFeeNumerator, uint256 _maxManagerFeeNumerator, uint256 _maxEntryFeeNumerator, uint256 _maxExitFeeNumerator)`
* Кто может вызывать — только poolFactoryOwner.
* Что делает — обновляет верхние пределы всех комиссий и общий знаменатель, которые PoolManagerLogic обязан соблюдать.【F:contracts/PoolFactory.sol†L349-L397】
* Побочные эффекты — влияет на будущие установки комиссий в пулах.
* Важные require / проверки безопасности — новые значения не превышают знаменатель.【F:contracts/PoolFactory.sol†L369-L382】

`setMaximumPerformanceFeeNumeratorChange(uint256 _amount)`
* Кто может вызывать — только poolFactoryOwner.
* Что делает — задаёт глобальный лимит шага повышения performance fee, применимый к announceFeeIncrease().【F:contracts/PoolFactory.sol†L399-L405】
* Побочные эффекты — ограничивает poolManager при повышении fee.
* Важные require / проверки безопасности — простое присвоение с onlyOwner.

`setPerformanceFeeNumeratorChangeDelay(uint256 _delay)`
* Кто может вызывать — только poolFactoryOwner.
* Что делает — устанавливает глобальную задержку перед commitFeeIncrease().【F:contracts/PoolFactory.sol†L407-L413】
* Побочные эффекты — влияет на время, когда poolManager может применить новые комиссии.
* Важные require / проверки безопасности — onlyOwner.

`setExitCooldown(uint256 _cooldown)`
* Кто может вызывать — только poolFactoryOwner.
* Что делает — задаёт единый exit cooldown для всех инвесторов, который проверяет PoolLogic при выводе.【F:contracts/PoolFactory.sol†L415-L425】
* Побочные эффекты — меняет обязательную задержку перед withdraw.
* Важные require / проверки безопасности — onlyOwner.

`setMaximumSupportedAssetCount(uint256 _count)`
* Кто может вызывать — только poolFactoryOwner.
* Что делает — обновляет лимит supportedAssets для каждого пула.【F:contracts/PoolFactory.sol†L433-L445】
* Побочные эффекты — ограничивает poolManager при добавлении активов.
* Важные require / проверки безопасности — onlyOwner.

`setDaoFee(uint256 _numerator, uint256 _denominator)`
* Кто может вызывать — только poolFactoryOwner.
* Что делает — задаёт долю комиссий, уходящих feeRecipient при mintManagerFee().【F:contracts/PoolFactory.sol†L308-L322】
* Побочные эффекты — изменяет распределение между feeRecipient и poolManager.
* Важные require / проверки безопасности — проверяет, что numerator не превышает denominator.【F:contracts/PoolFactory.sol†L315-L322】

`setDAOAddress(address _daoAddress)`
* Кто может вызывать — только poolFactoryOwner.
* Что делает — обновляет feeRecipient (daoAddress), куда перечисляется доля DAO.【F:contracts/PoolFactory.sol†L274-L289】
* Побочные эффекты — меняет получателя комиссий.
* Важные require / проверки безопасности — запрещает нулевой адрес.【F:contracts/PoolFactory.sol†L284-L289】

`setGovernanceAddress(address _governanceAddress)`
* Кто может вызывать — только poolFactoryOwner.
* Что делает — обновляет источник guard конфигурации и governance хуков.【F:contracts/PoolFactory.sol†L292-L306】
* Побочные эффекты — переключает контракты с картами guard.
* Важные require / проверки безопасности — проверяет ненулевой адрес.【F:contracts/PoolFactory.sol†L300-L306】

### Паузы и безопасность
`pause()` / `unpause()`
* Кто может вызывать — только poolFactoryOwner.
* Что делает — включает или снимает глобальную паузу фабрики PausableUpgradeable.【F:contracts/PoolFactory.sol†L494-L503】
* Побочные эффекты — запрещает createFund и любые функции с whenNotPaused у наследников.
* Важные require / проверки безопасности — onlyOwner от OpenZeppelin PausableUpgradeable.

`isPaused()`
* Кто может вызывать — любой адрес.
* Что делает — возвращает текущий статус глобальной паузы фабрики.【F:contracts/PoolFactory.sol†L504-L508】
* Побочные эффекты — нет.
* Важные require / проверки безопасности — нет.

`setPoolsPaused(PoolPausedInput[] _pools)`
* Кто может вызывать — только poolFactoryOwner.
* Что делает — массово обновляет pausedPools и tradingPausedPools для конкретных пулов, действуя как стоп-кран по депозитам, выводам и торговле.【F:contracts/PoolFactory.sol†L510-L523】
* Побочные эффекты — PoolLogic читает эти флаги и блокирует deposit, withdraw, execTransaction при true.
* Важные require / проверки безопасности — проверяет, что адрес действительно зарегистрирован как пул.【F:contracts/PoolFactory.sol†L517-L523】

### Guards и whitelist активов
`setAssetHandler(address _handler)`
* Кто может вызывать — только poolFactoryOwner.
* Что делает — назначает новый AssetHandler, предоставляющий цены и типы активов для всех пулов.【F:contracts/PoolFactory.sol†L480-L492】
* Побочные эффекты — меняет источник данных для isValidAsset и getAssetPrice.
* Важные require / проверки безопасности — отклоняет нулевой адрес.【F:contracts/PoolFactory.sol†L486-L492】

`isValidAsset(address _asset)`
* Кто может вызывать — любой адрес.
* Что делает — проверяет, есть ли прайс-агрегатор в AssetHandler, выступает глобальной проверкой whitelist активов.【F:contracts/PoolFactory.sol†L453-L458】
* Побочные эффекты — нет.
* Важные require / проверки безопасности — нет.

`getContractGuard(address _extContract)`
* Кто может вызывать — любой адрес.
* Что делает — возвращает назначенный contractGuard через governanceAddress для проверки сделок пула.【F:contracts/PoolFactory.sol†L528-L533】
* Побочные эффекты — нет.
* Важные require / проверки безопасности — нет.

`getAssetGuard(address _extAsset)`
* Кто может вызывать — любой адрес.
* Что делает — возвращает guard для типа актива через governanceAddress, если актив поддерживается.【F:contracts/PoolFactory.sol†L535-L543】
* Побочные эффекты — нет.
* Важные require / проверки безопасности — проверяет isValidAsset перед запросом guard.【F:contracts/PoolFactory.sol†L539-L543】

`addCustomCooldownWhitelist(address _extAddress)` / `removeCustomCooldownWhitelist(address _extAddress)`
* Кто может вызывать — только poolFactoryOwner.
* Что делает — управляет адресами, которые могут инициировать депозиты с кастомным кулдауном в пулах.【F:contracts/PoolFactory.sol†L246-L258】
* Побочные эффекты — обновляет customCooldownWhitelist.
* Важные require / проверки безопасности — нет кроме onlyOwner.

`addReceiverWhitelist(address _extAddress)` / `removeReceiverWhitelist(address _extAddress)`
* Кто может вызывать — только poolFactoryOwner.
* Что делает — управляет списком адресов, принимающих токены с активным кулдауном, что контролирует передачу заблокированных долей.【F:contracts/PoolFactory.sol†L260-L272】
* Побочные эффекты — обновляет receiverWhitelist.
* Важные require / проверки безопасности — нет кроме onlyOwner.

### Вспомогательные view
`getDaoFee()`
* Кто может вызывать — любой адрес.
* Что делает — возвращает текущую долю комиссий feeRecipient и знаменатель.【F:contracts/PoolFactory.sol†L324-L329】
* Побочные эффекты — нет.
* Важные require / проверки безопасности — нет.

`getMaximumFee()`
* Кто может вызывать — любой адрес.
* Что делает — выдаёт лимиты всех комиссий и знаменатель для интерфейсов и PoolManagerLogic.【F:contracts/PoolFactory.sol†L333-L347】
* Побочные эффекты — нет.
* Важные require / проверки безопасности — нет.

`getExitCooldown()`
* Кто может вызывать — любой адрес.
* Что делает — сообщает глобальный кулдаун выхода, используемый PoolLogic при проверке withdraw.【F:contracts/PoolFactory.sol†L427-L431】
* Побочные эффекты — нет.
* Важные require / проверки безопасности — нет.

`getMaximumSupportedAssetCount()`
* Кто может вызывать — любой адрес.
* Что делает — возвращает лимит активов, чтобы frontends и poolManager знали потолок whitelist.【F:contracts/PoolFactory.sol†L433-L451】
* Побочные эффекты — нет.
* Важные require / проверки безопасности — нет.

`getAssetPrice(address _asset)` / `getAssetType(address _asset)` / `getAssetHandler()`
* Кто может вызывать — любой адрес.
* Что делает — проксирует цены, типы и адрес AssetHandler для отображения и проверок пула.【F:contracts/PoolFactory.sol†L460-L478】
* Побочные эффекты — нет.
* Важные require / проверки безопасности — нет.

## Events
* `FundCreated(address fundAddress, bool isPoolPrivate, string fundName, string managerName, address manager, uint256 time, uint256 performanceFeeNumerator, uint256 managerFeeNumerator, uint256 managerFeeDenominator)` — сигнал развёртывания нового пула с начальными параметрами.【F:contracts/PoolFactory.sol†L56-L243】
  Эмитится в: createFund().【F:contracts/PoolFactory.sol†L184-L244】
* `PoolEvent(address poolAddress)` — единая точка подписки на события пула через фабрику.【F:contracts/PoolFactory.sol†L68-L595】
  Эмитится в: emitPoolEvent().【F:contracts/PoolFactory.sol†L592-L595】
* `PoolManagerEvent(address poolManagerAddress)` — прокси событие для действий PoolManagerLogic.【F:contracts/PoolFactory.sol†L70-L599】
  Эмитится в: emitPoolManagerEvent().【F:contracts/PoolFactory.sol†L597-L599】
* `DAOAddressSet(address daoAddress)` — фиксация нового feeRecipient.【F:contracts/PoolFactory.sol†L72-L289】
  Эмитится в: setDAOAddress() и initialize().【F:contracts/PoolFactory.sol†L146-L170】【F:contracts/PoolFactory.sol†L274-L289】
* `GovernanceAddressSet(address governanceAddress)` — обновление governanceAddress для guard системы.【F:contracts/PoolFactory.sol†L74-L306】
  Эмитится в: setGovernanceAddress() и initialize().【F:contracts/PoolFactory.sol†L146-L170】【F:contracts/PoolFactory.sol†L292-L306】
* `DaoFeeSet(uint256 numerator, uint256 denominator)` — изменение доли комиссий feeRecipient.【F:contracts/PoolFactory.sol†L76-L321】
  Эмитится в: setDaoFee() и initialize().【F:contracts/PoolFactory.sol†L146-L170】【F:contracts/PoolFactory.sol†L308-L322】
* `ExitCooldownSet(uint256 cooldown)` — новая величина exit cooldown для всех пулов.【F:contracts/PoolFactory.sol†L78-L425】
  Эмитится в: setExitCooldown() и initialize().【F:contracts/PoolFactory.sol†L146-L170】【F:contracts/PoolFactory.sol†L415-L425】
* `MaximumSupportedAssetCountSet(uint256 count)` — изменение лимита активов пула.【F:contracts/PoolFactory.sol†L80-L445】
  Эмитится в: setMaximumSupportedAssetCount() и initialize().【F:contracts/PoolFactory.sol†L146-L170】【F:contracts/PoolFactory.sol†L433-L445】
* `SetMaximumFee(uint256 performanceFeeNumerator, uint256 managerFeeNumerator, uint256 entryFeeNumerator, uint256 exitFeeNumerator, uint256 denominator)` — новые глобальные потолки комиссий.【F:contracts/PoolFactory.sol†L82-L396】
  Эмитится в: setMaximumFee() и initialize().【F:contracts/PoolFactory.sol†L146-L170】【F:contracts/PoolFactory.sol†L349-L397】
* `SetMaximumPerformanceFeeNumeratorChange(uint256 amount)` — обновление лимита шага повышения performance fee.【F:contracts/PoolFactory.sol†L90-L405】
  Эмитится в: setMaximumPerformanceFeeNumeratorChange() и initialize().【F:contracts/PoolFactory.sol†L146-L170】【F:contracts/PoolFactory.sol†L399-L405】
* `SetAssetHandler(address assetHandler)` — фиксация нового AssetHandler.【F:contracts/PoolFactory.sol†L92-L492】
  Эмитится в: setAssetHandler() и initialize().【F:contracts/PoolFactory.sol†L146-L170】【F:contracts/PoolFactory.sol†L480-L492】
* `SetPerformanceFeeNumeratorChangeDelay(uint256 delay)` — изменение глобального таймлока на рост комиссий.【F:contracts/PoolFactory.sol†L94-L413】
  Эмитится в: setPerformanceFeeNumeratorChangeDelay() и initialize().【F:contracts/PoolFactory.sol†L146-L170】【F:contracts/PoolFactory.sol†L407-L413】
* `PoolPauseStatusChanged(address pool, bool pausedShares, bool pausedTrading)` — обновление статуса паузы пула и торговли.【F:contracts/PoolFactory.sol†L96-L523】
  Эмитится в: setPoolsPaused().【F:contracts/PoolFactory.sol†L510-L523】

## Безопасность и контроль доступа
poolFactoryOwner может централизованно менять лимиты комиссий, whitelist активов, паузы, адрес feeRecipient и governanceAddress, что даёт полный контроль протокола.【F:contracts/PoolFactory.sol†L246-L523】
createFund регистрирует новый пул и подключает его к системе guard через setPoolManagerLogic и реестр isPool, что предотвращает несанкционированные execTransaction вне фабрики.【F:contracts/PoolFactory.sol†L214-L233】
PoolLogic и PoolManagerLogic читают глобальные параметры из фабрики при проверке пауз, кулдаунов, лимитов комиссий и daoFee, поэтому сбой или компрометация фабрики влияет на все пулы.【F:contracts/PoolFactory.sol†L98-L523】
investor не может обойти глобальные флаги паузы, потому что PoolLogic проверяет pausedPools, tradingPausedPools и глобальную паузу перед депозитом, выводом и торговлей.【F:contracts/PoolFactory.sol†L139-L523】
