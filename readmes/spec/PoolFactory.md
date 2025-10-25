# PoolFactory

PoolFactory разворачивает новые пулы как пару прокси PoolLogic и PoolManagerLogic.
Хранит глобальные лимиты комиссий, лимиты по активам, exit cooldown и флаги пауз.
Сохраняет daoAddress для feeRecipient, guard-настройки и ссылку на AssetHandler.
Держит реестр валидных пулов для фронтенда и бэкенда.

## Состояние
* daoAddress (address) — адрес feeRecipient, получает долю комиссий при mintManagerFee().【F:contracts/PoolFactory.sol†L100-L321】
  Кто может менять — только poolFactoryOwner через setDAOAddress() или initialize().【F:contracts/PoolFactory.sol†L146-L170】【F:contracts/PoolFactory.sol†L274-L289】
* governanceAddress (address) — источник contractGuard и assetGuard через IGovernance.【F:contracts/PoolFactory.sol†L101-L543】
  Кто может менять — только poolFactoryOwner через setGovernanceAddress() или initialize().【F:contracts/PoolFactory.sol†L146-L170】【F:contracts/PoolFactory.sol†L292-L306】
* _daoFeeNumerator/_daoFeeDenominator (uint256) — процент daoAddress от менеджерских комиссий пула.【F:contracts/PoolFactory.sol†L104-L329】
  Кто может менять — только poolFactoryOwner через setDaoFee() или initialize().【F:contracts/PoolFactory.sol†L146-L170】【F:contracts/PoolFactory.sol†L308-L322】
* maximumPerformanceFeeNumerator, maximumManagerFeeNumerator, maximumEntryFeeNumerator, maximumExitFeeNumerator, _MANAGER_FEE_DENOMINATOR (uint256) — верхние пределы комиссий для всех пулов.【F:contracts/PoolFactory.sol†L109-L396】
  Кто может менять — только poolFactoryOwner через setMaximumFee() или initialize().【F:contracts/PoolFactory.sol†L146-L170】【F:contracts/PoolFactory.sol†L349-L397】
* maximumPerformanceFeeNumeratorChange (uint256) — максимум шага повышения performance fee между апгрейдами.【F:contracts/PoolFactory.sol†L120-L405】
  Кто может менять — только poolFactoryOwner через setMaximumPerformanceFeeNumeratorChange() или initialize().【F:contracts/PoolFactory.sol†L146-L170】【F:contracts/PoolFactory.sol†L399-L405】
* performanceFeeNumeratorChangeDelay (uint256) — глобальная задержка на рост комиссий poolManager.【F:contracts/PoolFactory.sol†L121-L413】
  Кто может менять — только poolFactoryOwner через setPerformanceFeeNumeratorChangeDelay() или initialize().【F:contracts/PoolFactory.sol†L146-L170】【F:contracts/PoolFactory.sol†L407-L413】
* _exitCooldown (uint256) — минимальный кулдаун вывода для каждого investor в пулах.【F:contracts/PoolFactory.sol†L113-L431】
  Кто может менять — только poolFactoryOwner через setExitCooldown() или initialize().【F:contracts/PoolFactory.sol†L146-L170】【F:contracts/PoolFactory.sol†L415-L425】
* _maximumSupportedAssetCount (uint256) — предел активов, которые poolManager может держать в whitelist пула.【F:contracts/PoolFactory.sol†L115-L445】
  Кто может менять — только poolFactoryOwner через setMaximumSupportedAssetCount() или initialize().【F:contracts/PoolFactory.sol†L146-L170】【F:contracts/PoolFactory.sol†L433-L445】
* _assetHandler (address) — адрес AssetHandler, определяет цены, типы активов и список разрешённых deposit-активов.【F:contracts/PoolFactory.sol†L103-L492】
  Кто может менять — только poolFactoryOwner через setAssetHandler() или initialize().【F:contracts/PoolFactory.sol†L146-L170】【F:contracts/PoolFactory.sol†L480-L492】
* customCooldownWhitelist (mapping(address => bool)) — адреса, которым разрешён depositForWithCustomCooldown в пулах.【F:contracts/PoolFactory.sol†L128-L258】
  Кто может менять — только poolFactoryOwner через addCustomCooldownWhitelist()/removeCustomCooldownWhitelist().【F:contracts/PoolFactory.sol†L246-L258】
* receiverWhitelist (mapping(address => bool)) — адреса, принимающие fund tokens под активным кулдауном transfer из пула.【F:contracts/PoolFactory.sol†L134-L272】
  Кто может менять — только poolFactoryOwner через addReceiverWhitelist()/removeReceiverWhitelist().【F:contracts/PoolFactory.sol†L260-L272】
* _paused (bool) — глобальный флаг паузы фабрики. Если true блокируется createFund и другие функции с whenNotPaused.【F:contracts/PoolFactory.sol†L204-L507】
  Кто может менять — только poolFactoryOwner через pause()/unpause().【F:contracts/PoolFactory.sol†L494-L503】
* pausedPools (mapping(address => bool)) — флаги блокировки депозитов, выводов и fee mint для конкретных пулов.【F:contracts/PoolFactory.sol†L139-L523】
  Кто может менять — только poolFactoryOwner через setPoolsPaused().【F:contracts/PoolFactory.sol†L510-L523】
* tradingPausedPools (mapping(address => bool)) — запрет execTransaction для выбранных пулов.【F:contracts/PoolFactory.sol†L144-L523】
  Кто может менять — только poolFactoryOwner через setPoolsPaused().【F:contracts/PoolFactory.sol†L510-L523】
* deployedFunds (address[]) — список всех созданных PoolLogic прокси, нужен фронтенду и аналитике.【F:contracts/PoolFactory.sol†L98-L549】
  Кто может менять — автоматически внутри createFund().【F:contracts/PoolFactory.sol†L184-L244】
* isPool (mapping(address => bool)) — быстрый реестр валидных пулов для модификаторов доступа и фронтенда.【F:contracts/PoolFactory.sol†L107-L233】
  Кто может менять — автоматически внутри createFund().【F:contracts/PoolFactory.sol†L184-L233】
* poolLogic/poolManagerLogic (address) — шаблоны логики в ProxyFactory для новых прокси.【F:contracts/upgradability/ProxyFactory.sol†L29-L56】
  Кто может менять — только poolFactoryOwner через setLogic() или initialize().【F:contracts/upgradability/ProxyFactory.sol†L33-L56】

## Публичные и external функции
### Создание и реестр пулов
createFund(bool _privatePool, address _manager, string _managerName, string _fundName, string _fundSymbol, uint256 _performanceFeeNumerator, uint256 _managerFeeNumerator, IHasSupportedAsset.Asset[] _supportedAssets)

Кто может вызывать — любой адрес.
Что делает — деплоит прокси PoolLogic и PoolManagerLogic, связывает их, добавляет пул в реестр и записывает настройки manager fee.【F:contracts/PoolFactory.sol†L184-L244】
Побочные эффекты — пушит адрес в deployedFunds, отмечает isPool, эмитит FundCreated.【F:contracts/PoolFactory.sol†L214-L244】
Важные require / проверки безопасности — требует, что фабрика не на паузе инициализации, проверяет paused() через require(!paused()).【F:contracts/PoolFactory.sol†L203-L205】

getDeployedFunds()

Кто может вызывать — любой адрес.
Что делает — возвращает весь массив валидных пулов для интерфейсов.【F:contracts/PoolFactory.sol†L545-L549】
Побочные эффекты — нет.
Важные require / проверки безопасности — нет (view).

getInvestedPools(address _user)

Кто может вызывать — любой адрес.
Что делает — фильтрует deployedFunds по наличию долей investor через PoolLogic.balanceOf().【F:contracts/PoolFactory.sol†L551-L569】
Побочные эффекты — нет.
Важные require / проверки безопасности — нет (view).

getManagedPools(address _manager)

Кто может вызывать — любой адрес.
Что делает — возвращает пулы, где poolManagerLogic.manager() совпадает с адресом менеджера.【F:contracts/PoolFactory.sol†L571-L589】
Побочные эффекты — нет.
Важные require / проверки безопасности — нет (view).

isPool(address pool)

Кто может вызывать — любой адрес.
Что делает — возвращает статус адреса как валидного пула из реестра isPool.【F:contracts/PoolFactory.sol†L107-L233】
Побочные эффекты — нет.
Важные require / проверки безопасности — нет (view).

emitPoolEvent()

Кто может вызывать — только зарегистрированный PoolLogic благодаря модификатору onlyPool.【F:contracts/PoolFactory.sol†L173-L595】
Что делает — ретранслирует событие PoolEvent для индексаторов.【F:contracts/PoolFactory.sol†L592-L595】
Побочные эффекты — эмитит PoolEvent.
Важные require / проверки безопасности — проверяет, что msg.sender отмечен в isPool.【F:contracts/PoolFactory.sol†L173-L175】

emitPoolManagerEvent()

Кто может вызывать — только действующий PoolManagerLogic через onlyPoolManager.【F:contracts/PoolFactory.sol†L178-L599】
Что делает — эмитит PoolManagerEvent от имени менеджера пула.【F:contracts/PoolFactory.sol†L597-L599】
Побочные эффекты — событие для мониторинга.
Важные require / проверки безопасности — проверяет связку poolManagerLogic с активным пулом.【F:contracts/PoolFactory.sol†L178-L181】

### Глобальные лимиты и комиссии
setMaximumFee(uint256 _maxPerformanceFeeNumerator, uint256 _maxManagerFeeNumerator, uint256 _maxEntryFeeNumerator, uint256 _maxExitFeeNumerator)

Кто может вызывать — только poolFactoryOwner.
Что делает — обновляет глобальные потолки комиссий и знаменатель, которыми ограничены все poolManager.【F:contracts/PoolFactory.sol†L349-L397】
Побочные эффекты — снижает или повышает разрешённые ставки для текущих и будущих пулов.
Важные require / проверки безопасности — каждая доля не превышает знаменатель, иначе revert invalid fraction.【F:contracts/PoolFactory.sol†L369-L382】

setMaximumPerformanceFeeNumeratorChange(uint256 _amount)

Кто может вызывать — только poolFactoryOwner.
Что делает — задаёт максимум разового повышения performance fee менеджера.【F:contracts/PoolFactory.sol†L399-L405】
Побочные эффекты — влияет на расчёт лимитов в PoolManagerLogic.
Важные require / проверки безопасности — только проверка прав.

setPerformanceFeeNumeratorChangeDelay(uint256 _delay)

Кто может вызывать — только poolFactoryOwner.
Что делает — устанавливает задержку перед вступлением в силу повышения performance fee.【F:contracts/PoolFactory.sol†L407-L413】
Побочные эффекты — влияет на расписание повышения комиссий.
Важные require / проверки безопасности — только проверка прав.

setDaoFee(uint256 _numerator, uint256 _denominator)

Кто может вызывать — только poolFactoryOwner.
Что делает — задаёт долю daoAddress в новых manager fee mint.【F:contracts/PoolFactory.sol†L308-L322】
Побочные эффекты — меняет будущую долю feeRecipient по всем пулам.
Важные require / проверки безопасности — числитель не больше знаменателя, иначе revert invalid fraction.【F:contracts/PoolFactory.sol†L315-L321】

setDAOAddress(address _daoAddress)

Кто может вызывать — только poolFactoryOwner.
Что делает — обновляет адрес feeRecipient для распределения комиссий.【F:contracts/PoolFactory.sol†L274-L289】
Побочные эффекты — перенаправляет потоки комиссий DAO.
Важные require / проверки безопасности — запрещает нулевой адрес.【F:contracts/PoolFactory.sol†L284-L289】

setMaximumSupportedAssetCount(uint256 _count)

Кто может вызывать — только poolFactoryOwner.
Что делает — задаёт максимум активов в whitelist пула.【F:contracts/PoolFactory.sol†L433-L445】
Побочные эффекты — ограничивает poolManager при добавлении активов.
Важные require / проверки безопасности — только проверка прав.

setExitCooldown(uint256 _cooldown)

Кто может вызывать — только poolFactoryOwner.
Что делает — устанавливает глобальный кулдаун вывода для инвесторов.【F:contracts/PoolFactory.sol†L415-L425】
Побочные эффекты — влияет на блокировку withdraw во всех пулах.
Важные require / проверки безопасности — только проверка прав.

setLogic(address _poolLogic, address _poolManagerLogic)

Кто может вызывать — только poolFactoryOwner.
Что делает — обновляет шаблоны логики прокси для новых пулов.【F:contracts/upgradability/ProxyFactory.sol†L47-L56】
Побочные эффекты — будущие createFund используют новые реализации.
Важные require / проверки безопасности — запрещает нулевые адреса логик.【F:contracts/upgradability/ProxyFactory.sol†L50-L55】

### Паузы и аварийные рычаги
pause()

Кто может вызывать — только poolFactoryOwner.
Что делает — включает глобальную паузу фабрики и блокирует createFund и другие функции с whenNotPaused в пулах.【F:contracts/PoolFactory.sol†L494-L507】
Побочные эффекты — задействует paused(), влияет на модификаторы whenNotFactoryPaused в пулах.
Важные require / проверки безопасности — только проверка прав.

unpause()

Кто может вызывать — только poolFactoryOwner.
Что делает — снимает глобальную паузу фабрики.【F:contracts/PoolFactory.sol†L499-L507】
Побочные эффекты — восстановление createFund.
Важные require / проверки безопасности — только проверка прав.

setPoolsPaused(PoolPausedInput[] calldata _pools)

Кто может вызывать — только poolFactoryOwner.
Что делает — пакетно обновляет pausedPools и tradingPausedPools для указанных пулов.【F:contracts/PoolFactory.sol†L510-L523】
Побочные эффекты — блокирует депозиты, выводы, mint fee и торговлю в затронутых пулах, эмитит PoolPauseStatusChanged.【F:contracts/PoolFactory.sol†L510-L523】
Важные require / проверки безопасности — проверяет, что каждый адрес зарегистрирован в isPool.【F:contracts/PoolFactory.sol†L517-L523】

### Guards и whitelist активов
setAssetHandler(address _handler)

Кто может вызывать — только poolFactoryOwner.
Что делает — обновляет адрес AssetHandler для проверок активов и цен.【F:contracts/PoolFactory.sol†L480-L492】
Побочные эффекты — изменяет источник isValidAsset и getAssetPrice для всех пулов.
Важные require / проверки безопасности — запрещает нулевой адрес.【F:contracts/PoolFactory.sol†L486-L492】

addCustomCooldownWhitelist(address _extAddress) / removeCustomCooldownWhitelist(address _extAddress)

Кто может вызывать — только poolFactoryOwner.
Что делает — управляет адресами, которым разрешён кастомный депозитный кулдаун в пулах.【F:contracts/PoolFactory.sol†L246-L258】
Побочные эффекты — обновляет customCooldownWhitelist.
Важные require / проверки безопасности — только проверка прав.

addReceiverWhitelist(address _extAddress) / removeReceiverWhitelist(address _extAddress)

Кто может вызывать — только poolFactoryOwner.
Что делает — управляет адресами, принимающими fund tokens под кулдауном transfer.【F:contracts/PoolFactory.sol†L260-L272】
Побочные эффекты — обновляет receiverWhitelist.
Важные require / проверки безопасности — только проверка прав.

setGovernanceAddress(address _governanceAddress)

Кто может вызывать — только poolFactoryOwner.
Что делает — переназначает governanceAddress, влияя на contractGuard и assetGuard маппинги.【F:contracts/PoolFactory.sol†L292-L306】
Побочные эффекты — меняет источник guard-проверок для пулов.
Важные require / проверки безопасности — запрещает нулевой адрес.【F:contracts/PoolFactory.sol†L300-L306】

getContractGuard(address _extContract)

Кто может вызывать — любой адрес.
Что делает — читает назначенный contractGuard из governanceAddress для контроля транзакций пула.【F:contracts/PoolFactory.sol†L528-L533】
Побочные эффекты — нет.
Важные require / проверки безопасности — нет (view).

getAssetGuard(address _extAsset)

Кто может вызывать — любой адрес.
Что делает — возвращает guard для типа актива, если asset допущен AssetHandler.【F:contracts/PoolFactory.sol†L535-L543】
Побочные эффекты — нет.
Важные require / проверки безопасности — проверяет isValidAsset перед доступом к guard.【F:contracts/PoolFactory.sol†L539-L543】

### View-функции конфигурации
getDaoFee()

Кто может вызывать — любой адрес.
Что делает — возвращает текущий numerator и denominator для доли feeRecipient.【F:contracts/PoolFactory.sol†L324-L329】
Побочные эффекты — нет.
Важные require / проверки безопасности — нет (view).

getMaximumFee()

Кто может вызывать — любой адрес.
Что делает — показывает верхние границы комиссий и знаменатель для интерфейсов и пулов.【F:contracts/PoolFactory.sol†L333-L347】
Побочные эффекты — нет.
Важные require / проверки безопасности — нет (view).

getExitCooldown()

Кто может вызывать — любой адрес.
Что делает — возвращает глобальный кулдаун вывода для проверки в PoolLogic.【F:contracts/PoolFactory.sol†L427-L431】
Побочные эффекты — нет.
Важные require / проверки безопасности — нет (view).

getMaximumSupportedAssetCount()

Кто может вызывать — любой адрес.
Что делает — сообщает лимит активов для whitelist пула.【F:contracts/PoolFactory.sol†L433-L451】
Побочные эффекты — нет.
Важные require / проверки безопасности — нет (view).

getAssetHandler()

Кто может вызывать — любой адрес.
Что делает — возвращает адрес текущего AssetHandler для клиентов и пулов.【F:contracts/PoolFactory.sol†L474-L478】
Побочные эффекты — нет.
Важные require / проверки безопасности — нет (view).

isValidAsset(address _asset)

Кто может вызывать — любой адрес.
Что делает — проверяет, поддерживает ли AssetHandler актив и разрешён ли депозит.【F:contracts/PoolFactory.sol†L453-L458】
Побочные эффекты — нет.
Важные require / проверки безопасности — нет (view).

tradingPausedPools(address pool)

Кто может вызывать — любой адрес.
Что делает — показывает, запрещены ли execTransaction для пула.【F:contracts/PoolFactory.sol†L144-L523】
Побочные эффекты — нет.
Важные require / проверки безопасности — нет (view).

pausedPools(address pool)

Кто может вызывать — любой адрес.
Что делает — показывает, заблокированы ли депозиты и выводы пула через фабрику.【F:contracts/PoolFactory.sol†L139-L523】
Побочные эффекты — нет.
Важные require / проверки безопасности — нет (view).

isPaused()

Кто может вызывать — любой адрес.
Что делает — возвращает статус глобальной паузы фабрики.【F:contracts/PoolFactory.sol†L504-L507】
Побочные эффекты — нет.
Важные require / проверки безопасности — нет (view).

getAssetPrice(address _asset) / getAssetType(address _asset)

Кто может вызывать — любой адрес.
Что делает — проксирует USD цену и тип актива через AssetHandler для отображения и проверок пула.【F:contracts/PoolFactory.sol†L460-L472】
Побочные эффекты — нет.
Важные require / проверки безопасности — нет (view).

## Events
FundCreated(address fundAddress, bool isPoolPrivate, string fundName, string managerName, address manager, uint256 time, uint256 performanceFeeNumerator, uint256 managerFeeNumerator, uint256 managerFeeDenominator) — фиксирует запуск нового пула и его исходные параметры.【F:contracts/PoolFactory.sol†L56-L243】
Эмитится в — createFund().【F:contracts/PoolFactory.sol†L184-L244】

PoolEvent(address poolAddress) — единая точка подписки на события пула через фабрику.【F:contracts/PoolFactory.sol†L68-L595】
Эмитится в — emitPoolEvent().【F:contracts/PoolFactory.sol†L592-L595】

PoolManagerEvent(address poolManagerAddress) — событие, транслируемое от активного PoolManagerLogic.【F:contracts/PoolFactory.sol†L70-L599】
Эмитится в — emitPoolManagerEvent().【F:contracts/PoolFactory.sol†L597-L599】

DAOAddressSet(address daoAddress) — обновление daoAddress и feeRecipient пулами.【F:contracts/PoolFactory.sol†L72-L289】
Эмитится в — setDAOAddress(), initialize().【F:contracts/PoolFactory.sol†L146-L170】【F:contracts/PoolFactory.sol†L274-L289】

GovernanceAddressSet(address governanceAddress) — смена governanceAddress для guard-проверок.【F:contracts/PoolFactory.sol†L74-L306】
Эмитится в — setGovernanceAddress(), initialize().【F:contracts/PoolFactory.sol†L146-L170】【F:contracts/PoolFactory.sol†L292-L306】

DaoFeeSet(uint256 numerator, uint256 denominator) — изменение доли комиссий feeRecipient.【F:contracts/PoolFactory.sol†L76-L322】
Эмитится в — setDaoFee(), initialize().【F:contracts/PoolFactory.sol†L146-L170】【F:contracts/PoolFactory.sol†L308-L322】

ExitCooldownSet(uint256 cooldown) — новое значение exit cooldown для всех пулов.【F:contracts/PoolFactory.sol†L78-L425】
Эмитится в — setExitCooldown(), initialize().【F:contracts/PoolFactory.sol†L146-L170】【F:contracts/PoolFactory.sol†L415-L425】

MaximumSupportedAssetCountSet(uint256 count) — новый предел активов в whitelist пула.【F:contracts/PoolFactory.sol†L80-L445】
Эмитится в — setMaximumSupportedAssetCount(), initialize().【F:contracts/PoolFactory.sol†L146-L170】【F:contracts/PoolFactory.sol†L433-L445】

SetMaximumFee(uint256 performanceFeeNumerator, uint256 managerFeeNumerator, uint256 entryFeeNumerator, uint256 exitFeeNumerator, uint256 denominator) — обновлённые лимиты комиссий для всех пулов.【F:contracts/PoolFactory.sol†L82-L396】
Эмитится в — setMaximumFee(), initialize().【F:contracts/PoolFactory.sol†L146-L170】【F:contracts/PoolFactory.sol†L349-L397】

SetMaximumPerformanceFeeNumeratorChange(uint256 amount) — новая планка шага повышения performance fee.【F:contracts/PoolFactory.sol†L90-L405】
Эмитится в — setMaximumPerformanceFeeNumeratorChange(), initialize().【F:contracts/PoolFactory.sol†L146-L170】【F:contracts/PoolFactory.sol†L399-L405】

SetPerformanceFeeNumeratorChangeDelay(uint256 delay) — обновлённая задержка перед повышением комиссий.【F:contracts/PoolFactory.sol†L94-L413】
Эмитится в — setPerformanceFeeNumeratorChangeDelay(), initialize().【F:contracts/PoolFactory.sol†L146-L170】【F:contracts/PoolFactory.sol†L407-L413】

SetAssetHandler(address assetHandler) — новое значение AssetHandler для whitelist активов.【F:contracts/PoolFactory.sol†L92-L492】
Эмитится в — setAssetHandler(), initialize().【F:contracts/PoolFactory.sol†L146-L170】【F:contracts/PoolFactory.sol†L480-L492】

PoolPauseStatusChanged(address pool, bool pausedShares, bool pausedTrading) — фиксация паузы депозита и торговли конкретного пула.【F:contracts/PoolFactory.sol†L96-L523】
Эмитится в — setPoolsPaused().【F:contracts/PoolFactory.sol†L510-L523】

ProxyCreated(address proxy) — появление нового прокси PoolLogic или PoolManagerLogic при деплое.【F:contracts/upgradability/ProxyFactory.sol†L27-L82】
Эмитится в — deploy() внутри createFund().【F:contracts/PoolFactory.sol†L214-L227】【F:contracts/upgradability/ProxyFactory.sol†L73-L82】

## Безопасность и контроль доступа
poolFactoryOwner управляет лимитами комиссий, daoAddress, governanceAddress, whitelist активов, exit cooldown и паузами, поэтому это центральный рычаг контроля протокола.【F:contracts/PoolFactory.sol†L246-L523】
poolManager и trader выполняют транзакции только через PoolLogic, который читает pausedPools, tradingPausedPools, лимиты комиссий и daoFee из фабрики, поэтому poolFactoryOwner косвенно контролирует торговлю и комиссии каждого пула.【F:contracts/PoolFactory.sol†L98-L543】【F:contracts/PoolLogic.sol†L159-L361】
investor не может обойти паузы или кулдауны, потому что PoolLogic проверяет глобальные параметры фабрики перед депозитом и выводом.【F:contracts/PoolFactory.sol†L139-L523】【F:contracts/PoolLogic.sol†L236-L517】
Назначенные через governanceAddress guard-адреса ограничивают допустимые активы и транзакции пула, блокируя несанкционированные действия poolManager или trader.【F:contracts/PoolFactory.sol†L292-L543】【F:contracts/PoolLogic.sol†L604-L672】
