# Блок 1. Граф взаимодействий

#### PoolFactory

* Вызывает
  - PoolLogic.setPoolManagerLogic
  - PoolManagerLogic.poolLogic
  - PoolLogic.poolManagerLogic
  - PoolLogic.balanceOf
  - Managed.manager
  - AssetHandler.priceAggregators
  - AssetHandler.getUSDPrice
  - AssetHandler.assetTypes
  - Governance.contractGuards
  - Governance.assetGuards
* Хранит ссылки на
  - address governanceAddress — адрес Governance.
  - address _assetHandler — активный AssetHandler.
* Наследует
  - ProxyFactory — разворачивает прокси пулов и менеджеров.
  - IHasDaoInfo — хранит параметры DAO и получателя комиссий.
  - IHasFeeInfo — задаёт глобальные лимиты комиссий и кулдаунов.
  - IHasAssetInfo — предоставляет проверку и лимит по активам.
  - IHasGuardInfo — проксирует адреса guard контрактов.
  - IHasPausable — управляет глобальными паузами пулов.
* Админские права
  - owner -> addCustomCooldownWhitelist removeCustomCooldownWhitelist addReceiverWhitelist removeReceiverWhitelist setDAOAddress setGovernanceAddress setDaoFee setMaximumFee setMaximumPerformanceFeeNumeratorChange setPerformanceFeeNumeratorChangeDelay setExitCooldown setMaximumSupportedAssetCount setAssetHandler setPoolsPaused pause unpause

#### Governance

* Вызывает
  - нет
* Хранит ссылки на
  - mapping(address => address) contractGuards — хранит guard адреса вроде PoolTokenSwapperGuard.
  - mapping(uint16 => address) assetGuards — хранит guard адреса активов.
* Наследует
  - IGovernance — задаёт интерфейс доступа к guard конфигурации.
* Админские права
  - owner -> setContractGuard setAssetGuard

#### PoolLogic

* Вызывает
  - PoolFactory.receiverWhitelist
  - PoolFactory.customCooldownWhitelist
  - PoolFactory.isPaused
  - PoolFactory.pausedPools
  - PoolFactory.tradingPausedPools
  - PoolFactory.getExitCooldown
  - PoolFactory.getDaoFee
  - PoolFactory.daoAddress
  - PoolFactory.emitPoolEvent
  - PoolFactory.governanceAddress
  - PoolManagerLogic.isDepositAsset
  - PoolManagerLogic.minDepositUSD
  - PoolManagerLogic.totalFundValue
  - PoolManagerLogic.assetValue
  - PoolManagerLogic.getFee
  - PoolManagerLogic.isMemberAllowed
  - Governance.assetGuards
  - Managed.manager
  - Managed.managerName
  - Managed.trader
* Хранит ссылки на
  - address factory — связанная PoolFactory.
  - address poolManagerLogic — активный PoolManagerLogic.
* Наследует
  - IFlashLoanReceiver — реализует обработку Aave флешкредитов.
* Админские права
  - manager -> setPoolPrivate execTransaction execTransactions
  - trader -> execTransaction execTransactions (если guard помечен как закрытый)
  - poolFactoryOwner -> setPoolManagerLogic

#### PoolManagerLogic

* Вызывает
  - PoolFactory.isPool
  - PoolFactory.getMaximumSupportedAssetCount
  - PoolFactory.isValidAsset
  - PoolFactory.getAssetPrice
  - PoolFactory.getMaximumFee
  - PoolFactory.maximumPerformanceFeeNumeratorChange
  - PoolFactory.performanceFeeNumeratorChangeDelay
  - PoolFactory.emitPoolManagerEvent
  - PoolLogic.mintManagerFee
  - PoolLogic.poolManagerLogic
* Хранит ссылки на
  - address factory — источник глобальных ограничений (PoolFactory).
  - address poolLogic — управляемый PoolLogic.
* Наследует
  - Managed — хранит менеджера, трейдера и список участников.
  - IHasSupportedAsset — раскрывает список поддерживаемых активов пула.
  - IPoolManagerLogic — стандартизирует интерфейс менеджера пула.
* Админские права
  - manager -> changeAssets setFeeNumerator announceFeeIncrease renounceFeeIncrease commitFeeIncrease setTraderAssetChangeDisabled setNftMembershipCollectionAddress setMinDepositUSD changeManager addMembers removeMembers addMember removeMember setTrader removeTrader
  - trader -> changeAssets (если traderAssetChangeDisabled == false)
  - poolFactoryOwner -> changeAssets setPoolLogic

#### Managed

* Вызывает
  - нет
* Хранит ссылки на
  - нет
* Наследует
  - IManaged — описывает роли менеджера, трейдера и участников.
* Админские права
  - manager -> changeManager addMembers removeMembers addMember removeMember setTrader removeTrader

#### EasySwapperV2

* Вызывает
  - PoolManagerLogic.getFee
  - PoolManagerLogic.assetValue
  - PoolLogic.poolManagerLogic
  - PoolLogic.tokenPrice
  - PoolLogic.depositForWithCustomCooldown
  - PoolLogic.depositFor
  - PoolLogic.withdrawToSafe
  - PoolFactory.isPool
* Хранит ссылки на
  - address dHedgePoolFactory — реестр пулов из PoolFactory.
* Наследует
  - VaultProxyFactory — деплоит withdrawal- и limit-order-вольты.
  - IEasySwapperV2 — задаёт интерфейс для двуступенчатых выводов.
* Админские права
  - owner -> setCustomCooldownWhitelist setSwapper setCustomCooldown setdHedgePoolFactory setAuthorizedWithdrawers
  - authorizedWithdrawer -> completeLimitOrderWithdrawalFor

#### DhedgeEasySwapper

* Вызывает
  - PoolLogic.depositForWithCustomCooldown
  - PoolLogic.depositFor
  - PoolLogic.tokenPrice
  - PoolLogic.poolManagerLogic
  - PoolManagerLogic.getFee
  - PoolManagerLogic.assetValue
  - PoolFactory.isPool
  - Managed.manager
* Хранит ссылки на
  - нет
* Наследует
  - нет
* Админские права
  - owner -> setWithdrawProps setSwapRouter setPoolAllowed setFee setFeeSink setManagerFeeBypass salvage

#### PoolLimitOrderManager

* Вызывает
  - PoolFactory.getAssetPrice
  - PoolFactory.isPool
  - PoolFactory.isValidAsset
  - PoolLogic.balanceOf
  - EasySwapperV2.initLimitOrderWithdrawalFor
  - EasySwapperV2.getTrackedAssetsFromLimitOrders
  - EasySwapperV2.completeLimitOrderWithdrawalFor
* Хранит ссылки на
  - IPoolFactory poolFactory — проверка пулов и цен.
  - IEasySwapperV2 easySwapper — маршрутизация выводов в EasySwapperV2.
  - address limitOrderSettlementToken — выбранный актив расчётов (валидируется через PoolFactory).
* Наследует
  - нет
* Админские права
  - owner -> addAuthorizedKeeper removeAuthorizedKeeper setDefaultSlippageTolerance setPoolFactory setEasySwapper setLimitOrderSettlementToken
  - authorizedKeeper -> executeLimitOrders executeLimitOrdersSafe executeSettlementOrders executeSettlementOrdersSafe deleteLimitOrders

#### AssetHandler

* Вызывает
  - нет
* Хранит ссылки на
  - mapping(address => uint16) assetTypes — типы активов для пула.
  - mapping(address => address) priceAggregators — источники цены активов.
* Наследует
  - IAssetHandler — предоставляет прайсинг и типизацию активов.
* Админские права
  - owner -> setChainlinkTimeout addAsset addAssets removeAsset

#### Proxy

* Вызывает
  - нет
* Хранит ссылки на
  - нет
* Наследует
  - нет
* Админские права
  - не найдено в коде

#### ProxyFactory

* Вызывает
  - нет
* Хранит ссылки на
  - address poolLogic — логика PoolLogic для новых прокси.
  - address poolManagerLogic — логика PoolManagerLogic для новых прокси.
* Наследует
  - HasLogic — хранит адреса реализаций логики.
* Админские права
  - owner -> setLogic

#### PoolTokenSwapper

* Вызывает
  - PoolFactory.getContractGuard
  - PoolFactory.getAssetGuard
  - PoolFactory.isPool
  - PoolFactory.getAssetHandler
  - PoolFactory.getAssetPrice
  - PoolFactory.isValidAsset
  - AssetHandler.priceAggregators
* Хранит ссылки на
  - address poolFactory — фабрика пулов для проверки и цен.
* Наследует
  - TxDataUtils — парсит calldata и методы.
* Админские права
  - owner -> setAssets setPools setManager setSwapWhitelist salvage pause unpause
  - manager -> execTransaction
  - swapWhitelist -> swap

#### PoolTokenSwapperGuard

* Вызывает
  - PoolManagerLogic.poolLogic
  - PoolManagerLogic.isSupportedAsset
* Хранит ссылки на
  - нет
* Наследует
  - TxDataUtils — извлекает сигнатуры и параметры.
  - IGuard — предоставляет интерфейс guard проверок.
  - ITransactionTypes — маркирует типы транзакций пула.
  - SlippageAccumulatorUser — учитывает накопленный слippage пула.
* Админские права
  - не найдено в коде

# Блок 2. Дерево управления и прав

* Governance или owner
  - Через PoolFactory owner задаёт комиссии, кулдауны и лимиты активов, а также может паузить конкретные пулы (setMaximumFee, setExitCooldown, setMaximumSupportedAssetCount, setPoolsPaused).
  - Через PoolFactory owner переназначает DAO и Governance адреса, а также выбирает AssetHandler, влияя на список валидных активов.
  - Owner Governance контракта назначает contractGuards и assetGuards, определяя какие протоколы доступны менеджерам.
* PoolManager или manager или trader
  - Менеджер PoolManagerLogic может добавлять и удалять активы, менять комиссии пула, объявлять и коммитить повышение комиссий и управлять whitelist участников.
  - Менеджер PoolLogic выполняет сделки через execTransaction/execTransactions, которые проверяются guard-ами из PoolFactory.
  - Trader адрес, если включён, может инициировать changeAssets и совершать guarded транзакции через PoolLogic, но ограничен whitelisted активами.
  - Менеджер, назначенный в PoolTokenSwapper, может вызывать execTransaction для маршрутизатора обменов, соблюдая guard проверки.
* Investor или LP
  - Инвесторы вносят и выводят средства через PoolLogic (deposit, depositFor, depositForWithCustomCooldown, withdraw, withdrawSafe) и получают/сжигают долевые токены.
  - Пользователи могут пользоваться обёртками EasySwapperV2 и DhedgeEasySwapper для депозитов/выводов, а также создавать лимитные ордера в PoolLimitOrderManager.
  - Инвесторы не изменяют комиссии, whitelist активов и не управляют guard конфигурацией.
* Keeper или automation
  - Авторизованные keeper-ы PoolLimitOrderManager исполняют и отменяют лимитные и сеттлмент ордера, а также инициируют выводы через EasySwapperV2.
  - Авторизованные withdrawer адреса в EasySwapperV2 завершают limit-order выводы от имени пользователей, не меняя настройки протокола.

# Блок 3. Текстовый обзор архитектуры

PoolLogic хранит активы инвесторов и выпускает ERC20 токены пула при депозитах и сжигает их при выводах. PoolLogic допускает сделки только после проверки guard-ами и whitelist-ами из PoolManagerLogic и Governance, поэтому менеджер и трейдер ограничены разрешёнными активами. Комиссии начисляются через PoolLogic.mintManagerFee, которое вычисляет долю менеджера и DAO и минтит новые токены им. Ключевые рисковые параметры контролируют owner PoolFactory и Governance: они задают лимиты активов, комиссии, whitelist получателей и могут ставить пулы на паузу, в то время как менеджер может менять набор активов только в рамках этих глобальных ограничений.
