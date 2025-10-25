# Архитектура ядра dHEDGE

Этот документ описывает только ключевые контракты ядра (PoolFactory, PoolLogic, PoolManagerLogic, EasySwapperV2, PoolLimitOrderManager, PoolTokenSwapper и т.п.) и роли, которые реально управляют активами. Это сокращённая версия всей карты связей. Полная версия находится в `01b-contract-relationships.md`.

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
  - poolFactoryOwner -> addCustomCooldownWhitelist removeCustomCooldownWhitelist addReceiverWhitelist removeReceiverWhitelist setDAOAddress setGovernanceAddress setDaoFee setMaximumFee setMaximumPerformanceFeeNumeratorChange setPerformanceFeeNumeratorChangeDelay setExitCooldown setMaximumSupportedAssetCount setAssetHandler setPoolsPaused pause unpause

#### Governance

* Вызывает
  - нет
* Хранит ссылки на
  - mapping(address => address) contractGuards — хранит guard адреса вроде PoolTokenSwapperGuard.
  - mapping(uint16 => address) assetGuards — хранит guard адреса активов.
* Наследует
  - IGovernance — задаёт интерфейс доступа к guard конфигурации.
* Админские права
  - governanceOwner -> setContractGuard setAssetGuard

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
  - poolManager -> setPoolPrivate execTransaction execTransactions
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
  - poolManager -> changeAssets setFeeNumerator announceFeeIncrease renounceFeeIncrease commitFeeIncrease setTraderAssetChangeDisabled setNftMembershipCollectionAddress setMinDepositUSD changeManager addMembers removeMembers addMember removeMember setTrader removeTrader
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
  - poolManager -> changeManager addMembers removeMembers addMember removeMember setTrader removeTrader

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
  - easySwapperOwner -> setCustomCooldownWhitelist setSwapper setCustomCooldown setdHedgePoolFactory setAuthorizedWithdrawers
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
  - dhedgeEasySwapperOwner -> setWithdrawProps setSwapRouter setPoolAllowed setFee setFeeSink setManagerFeeBypass salvage

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
  - limitOrderManagerOwner -> addAuthorizedKeeper removeAuthorizedKeeper setDefaultSlippageTolerance setPoolFactory setEasySwapper setLimitOrderSettlementToken
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
  - assetHandlerOwner -> setChainlinkTimeout addAsset addAssets removeAsset

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
  - poolFactoryOwner -> setLogic

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
  - poolTokenSwapperOwner -> setAssets setPools setManager setSwapWhitelist salvage pause unpause
  - poolManager -> execTransaction
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

* poolFactoryOwner
  - Меняет whitelist активов через PoolFactory, переназначение AssetHandler и установку contractGuard/assetGuard, а также разворачивает новые реализации PoolLogic и PoolManagerLogic.
  - Ставит пулы на паузу, управляет глобальными кулдаунами и лимитами комиссий, переназначает daoAddress и governanceAddress.
* governanceOwner
  - Назначает contractGuard и assetGuard, определяя допустимые протоколы и активы для всех пулов.
* assetHandlerOwner
  - Обновляет whitelist активов и параметры прайс-фидов, влияя на доступные активы для всех пулов.
* poolManager
  - Исполняет сделки от имени пула через PoolManagerLogic и PoolLogic.execTransaction() под проверками guard-ов и whitelist-ов.
  - Меняет состав активов, комиссии, whitelist участников и трейдера только в рамках глобальных ограничений фабрики.
* trader
  - Действует в рамках разрешений, выданных poolManager, может исполнять сделки и changeAssets, если traderAssetChangeDisabled не отключён, при этом ограничен whitelist активов и guard проверками.
* investor
  - Вносит и выводит собственные доли через deposit/withdraw, но не управляет whitelist активов, комиссиями, guard-ами и паузами.
* authorizedKeeper и authorizedWithdrawer
  - Исполняют лимитные ордера и завершают выводы в рамках заранее заданных параметров, не меняя настройки протокола и whitelist активов.

# Блок 3. Текстовый обзор архитектуры

PoolLogic хранит активы инвесторов и минтит или сжигает долевые токены при депозитах и выводах. poolManager управляет активами пула через PoolManagerLogic и вызовы PoolLogic.execTransaction(), которые проходят проверки whitelist активов и guard конфигурации. poolFactoryOwner задаёт лимиты комиссий, whitelist активов и может ставить отдельные пулы или весь протокол на паузу. feeRecipient получает вознаграждение через mintManagerFee(), когда начисляются комиссии DAO и менеджеру. authorizedKeeper и authorizedWithdrawer исполняют заранее разрешённые лимитные ордера и выводы, не имея полномочий менять параметры протокола.
