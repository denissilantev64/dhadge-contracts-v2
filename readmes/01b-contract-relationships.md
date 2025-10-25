### 1. Граф взаимодействий (adjacency list)

#### AaveDebtTokenContractGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolFactory.getContractGuard()` — получение настроек гвардов
* Хранит ссылки на:
  * нет
* Наследует:
  * `IGuard` — базовая логика из протокола
  * `ITransactionTypes` — базовая логика из протокола
  * `TxDataUtils` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### AaveIncentivesControllerGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `IGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### AaveIncentivesControllerV3Guard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `IGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### AaveLendingPoolAssetGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
  * `PoolFactory.isValidAsset()` — проверка допустимых активов фабрики
* Хранит ссылки на:
  * нет
* Наследует:
  * `ClosedAssetGuard` — базовая логика из протокола
  * `IAaveLendingPoolAssetGuard` — базовая логика из протокола
  * `ISwapDataConsumingGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### AaveLendingPoolGuardV2

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
  * `PoolFactory.isValidAsset()` — проверка допустимых активов фабрики
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `IGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### AaveLendingPoolGuardV3

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `ITransactionTypes` — базовая логика из протокола
  * `ITxTrackingGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### AaveLendingPoolGuardV3L2Pool

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
* Хранит ссылки на:
  * нет
* Наследует:
  * нет
* Админские права:
  * не найдено в коде

#### AaveMigrationHelperGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `IGuard` — базовая логика из протокола
  * `ITransactionTypes` — базовая логика из протокола
  * `TxDataUtils` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### AcrossContractGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `IGuard` — базовая логика из протокола
  * `ITransactionTypes` — базовая логика из протокола
  * `TxDataUtils` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### AllowApproveContractGuard

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `IGuard` — базовая логика из протокола
  * `ITransactionTypes` — базовая логика из протокола
  * `TxDataUtils` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### AngleDistributorContractGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `IGuard` — базовая логика из протокола
  * `ITransactionTypes` — базовая логика из протокола
  * `TxDataUtils` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### ArrakisLiquidityGaugeV4AssetGuard

* Вызывает:
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
  * `PoolFactory.isValidAsset()` — проверка допустимых активов фабрики
* Хранит ссылки на:
  * нет
* Наследует:
  * `ERC20Guard` — базовая логика из протокола
  * `IAddAssetCheckGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### ArrakisLiquidityGaugeV4ContractGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
  * `PoolFactory.isValidAsset()` — проверка допустимых активов фабрики
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `IGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### ArrakisV1RouterStakingGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
  * `PoolFactory.isValidAsset()` — проверка допустимых активов фабрики
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `IGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### AssetHandler

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `IAssetHandler` — базовая логика из протокола
* Админские права:
  * `owner` → может вызывать addAsset, addAssets, removeAsset, setChainlinkTimeout

#### BalancerComposableStablePoolAggregator

* Вызывает:
  * `PoolFactory.isValidAsset()` — проверка допустимых активов фабрики
* Хранит ссылки на:
  * `PoolFactory` (поле `factory` — адрес фабрики пула)
* Наследует:
  * `IAggregatorV3Interface` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### BalancerDHedgePoolPriceOracle

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `IRateProvider` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### BalancerMerkleOrchardGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `IGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### BalancerStablePoolAggregator

* Вызывает:
  * `PoolFactory.isValidAsset()` — проверка допустимых активов фабрики
* Хранит ссылки на:
  * `PoolFactory` (поле `factory` — адрес фабрики пула)
* Наследует:
  * `IAggregatorV3Interface` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### BalancerV2GaugeAssetGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
  * `PoolFactory.isValidAsset()` — проверка допустимых активов фабрики
* Хранит ссылки на:
  * нет
* Наследует:
  * `ERC20Guard` — базовая логика из протокола
  * `IAddAssetCheckGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### BalancerV2GaugeContractGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
  * `PoolFactory.isValidAsset()` — проверка допустимых активов фабрики
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `IGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### BalancerV2Guard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `IGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### BalancerV2LPAggregator

* Вызывает:
  * `PoolFactory.isValidAsset()` — проверка допустимых активов фабрики
* Хранит ссылки на:
  * `PoolFactory` (поле `factory` — адрес фабрики пула)
* Наследует:
  * `IAggregatorV3Interface` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### BaseUpgradeabilityProxy

* Вызывает:
  * нет
* Хранит ссылки на:
  * `PoolFactory` (поле `factory` — адрес фабрики пула)
* Наследует:
  * `Proxy` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### ByPassAssetGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
  * `PoolFactory.getContractGuard()` — получение настроек гвардов
  * `PoolManagerLogic.manager()/trader()` — чтение ролей менеджера и трейдера
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `IGuard` — базовая логика из протокола
  * `IAssetGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### ChainlinkPythPriceAggregator

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `IGmxCustomPriceFeedProvider` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### ClosedAssetGuard

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `IGuard` — базовая логика из протокола
  * `IAssetGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### ClosedContractGuard

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `IGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### CompoundV3CometAssetGuard

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `ERC20Guard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### CompoundV3CometContractGuard

* Вызывает:
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `IGuard` — базовая логика из протокола
  * `ITransactionTypes` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### CompoundV3CometRewardsContractGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
  * `PoolFactory.isValidAsset()` — проверка допустимых активов фабрики
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `IGuard` — базовая логика из протокола
  * `ITransactionTypes` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### CustomCrossAggregator

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `IAggregatorV3Interface` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### DhedgeEasySwapper

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolFactory.конфигурация фабрики` — чтение настроек фабрики и пауз
  * `PoolManagerLogic.manager()/trader()` — чтение ролей менеджера и трейдера
* Хранит ссылки на:
  * нет
* Наследует:
  * нет
* Админские права:
  * `owner` → может вызывать salvage, setFee, setFeeSink, setManagerFeeBypass, setPoolAllowed, setSwapRouter, setWithdrawProps

#### DhedgeNftTrackerStorage

* Вызывает:
  * `PoolFactory.getContractGuard()` — получение настроек гвардов
* Хранит ссылки на:
  * нет
* Наследует:
  * нет
* Админские права:
  * `owner` → может вызывать addDataByUintId, removeDataByIndex, removeDataByUintId

#### DhedgeOptionMarketWrapperForLyra

* Вызывает:
  * `PoolFactory.getContractGuard()` — получение настроек гвардов
* Хранит ссылки на:
  * нет
* Наследует:
  * нет
* Админские права:
  * не найдено в коде

#### DHedgePoolAggregator

* Вызывает:
  * нет
* Хранит ссылки на:
  * `PoolLogic` (поле `poolLogic` — адрес пула)
* Наследует:
  * `IAggregatorV3Interface` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### DhedgeRamsesUniV2Router

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `IUniswapV2RouterSwapOnly` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### DhedgeStakingV2

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `IDhedgeStakingV2` — базовая логика из протокола
  * `DhedgeStakingV2Storage` — базовая логика из протокола
  * `DhedgeStakingV2VDHTCalculator` — базовая логика из протокола
  * `DhedgeStakingV2RewardsCalculator` — базовая логика из протокола
* Админские права:
  * `owner` → может вызывать salvage

#### DhedgeStakingV2NFTJson

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * нет
* Админские права:
  * не найдено в коде

#### DhedgeStakingV2RewardsCalculator

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * нет
* Админские права:
  * не найдено в коде

#### DhedgeStakingV2Storage

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `IDhedgeStakingV2Storage` — базовая логика из протокола
* Админские права:
  * `owner` → может вызывать configurePool, setDHTCap, setEmissionsRate, setMaxDurationBoostSeconds, setMaxPerformanceBoostNumerator, setMaxVDurationTimeSeconds, setRewardStreamingTime, setStakeDurationDelaySeconds, setStakingRatio, setTokenUriGenerator

#### DhedgeStakingV2VDHTCalculator

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * нет
* Админские права:
  * не найдено в коде

#### DhedgeSuperSwapper

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `IUniswapV2RouterSwapOnly` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### DhedgeUniV3V2Router

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `IUniswapV2RouterSwapOnly` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### DhedgeVeloUniV2Router

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `IUniswapV2RouterSwapOnly` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### DhedgeVeloV2UniV2Router

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `IUniswapV2RouterSwapOnly` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### DodoDHedgePoolPriceOracle

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * нет
* Админские права:
  * не найдено в коде

#### DQUICKPriceAggregator

* Вызывает:
  * `PoolFactory.isValidAsset()` — проверка допустимых активов фабрики
* Хранит ссылки на:
  * `PoolFactory` (поле `factory` — адрес фабрики пула)
* Наследует:
  * `IAggregatorV3Interface` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### DynamicBonds

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * нет
* Админские права:
  * `owner` → может вызывать addBondOptions, forceWithdraw, setBondTerms, setMaxPayoutAvailable, setMinBondPrice, setTreasury, updateBondOption, updateBondOptions

#### EasySwapperGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `IGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### EasySwapperV2

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolFactory.конфигурация фабрики` — чтение настроек фабрики и пауз
* Хранит ссылки на:
  * нет
* Наследует:
  * `VaultProxyFactory` — базовая логика из протокола
  * `IEasySwapperV2` — базовая логика из протокола
* Админские права:
  * `owner` → может вызывать setAuthorizedWithdrawers, setCustomCooldown, setCustomCooldownWhitelist, setSwapper, setdHedgePoolFactory

#### EasySwapperV2ContractGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
  * `PoolFactory.isValidAsset()` — проверка допустимых активов фабрики
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `ITransactionTypes` — базовая логика из протокола
  * `SlippageAccumulatorUser` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### EasySwapperV2UnrolledAssetsGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
* Хранит ссылки на:
  * нет
* Наследует:
  * `ClosedAssetGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### ERC20Guard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
  * `PoolFactory.конфигурация фабрики` — чтение настроек фабрики и пауз
  * `PoolFactory.getContractGuard()` — получение настроек гвардов
  * `Governance.contractGuards()/assetGuards()` — чтение карт гвардов протокола
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `IGuard` — базовая логика из протокола
  * `IAssetGuard` — базовая логика из протокола
  * `ITransactionTypes` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### ERC4626PriceAggregator

* Вызывает:
  * `PoolFactory.конфигурация фабрики` — чтение настроек фабрики и пауз
* Хранит ссылки на:
  * нет
* Наследует:
  * `IAggregatorV3Interface` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### ERC721ContractGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolFactory.getContractGuard()` — получение настроек гвардов
  * `PoolManagerLogic.manager()/trader()` — чтение ролей менеджера и трейдера
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `IGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### ETHCrossAggregator

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `IAggregatorV3Interface` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### ExponentialNoError

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * нет
* Админские права:
  * не найдено в коде

#### FixedPriceAggregator

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `IAggregatorV3Interface` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### FlatMoneyBasisContractGuard

* Вызывает:
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
  * `PoolFactory.isValidAsset()` — проверка допустимых активов фабрики
  * `PoolFactory.конфигурация фабрики` — чтение настроек фабрики и пауз
* Хранит ссылки на:
  * `PoolLogic` (поле `poolLogic` — адрес пула)
* Наследует:
  * `NftTrackerConsumerGuard` — базовая логика из протокола
  * `IGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### FlatMoneyCollateralAssetGuard

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `ERC20Guard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### FlatMoneyDelayedOrderContractGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
* Хранит ссылки на:
  * нет
* Наследует:
  * `FlatMoneyBasisContractGuard` — базовая логика из протокола
  * `IERC721VerifyingGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### FlatMoneyOptionsMarketAssetGuard

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `FlatMoneyV2BasisAssetGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### FlatMoneyOptionsOrderAnnouncementGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
* Хранит ссылки на:
  * нет
* Наследует:
  * `FlatMoneyBasisContractGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### FlatMoneyOptionsOrderExecutionGuard

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `FlatMoneyBasisContractGuard` — базовая логика из протокола
  * `IERC721VerifyingGuard` — базовая логика из протокола
  * `ClosedContractGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### FlatMoneyOrderHelperGuard

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * нет
* Админские права:
  * не найдено в коде

#### FlatMoneyPerpMarketAssetGuard

* Вызывает:
  * `PoolFactory.getContractGuard()` — получение настроек гвардов
* Хранит ссылки на:
  * нет
* Наследует:
  * `OutsidePositionWithdrawalHelper` — базовая логика из протокола
  * `FlatMoneyOrderHelperGuard` — базовая логика из протокола
  * `ClosedAssetGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### FlatMoneyUNITAssetGuard

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `FlatMoneyOrderHelperGuard` — базовая логика из протокола
  * `ERC20Guard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### FlatMoneyUNITPriceAggregator

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `IAggregatorV3Interface` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### FlatMoneyV2BasisAssetGuard

* Вызывает:
  * `PoolFactory.getContractGuard()` — получение настроек гвардов
* Хранит ссылки на:
  * нет
* Наследует:
  * `OutsidePositionWithdrawalHelper` — базовая логика из протокола
  * `FlatMoneyV2OrderHelperGuard` — базовая логика из протокола
  * `ClosedAssetGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### FlatMoneyV2OrderAnnouncementGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
* Хранит ссылки на:
  * нет
* Наследует:
  * `FlatMoneyOptionsOrderAnnouncementGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### FlatMoneyV2OrderExecutionGuard

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `FlatMoneyBasisContractGuard` — базовая логика из протокола
  * `IERC721VerifyingGuard` — базовая логика из протокола
  * `ClosedContractGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### FlatMoneyV2OrderHelperGuard

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * нет
* Админские права:
  * не найдено в коде

#### FlatMoneyV2PerpMarketAssetGuard

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `FlatMoneyV2BasisAssetGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### FlatMoneyV2UNITAssetGuard

* Вызывает:
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
  * `PoolFactory.getContractGuard()` — получение настроек гвардов
* Хранит ссылки на:
  * нет
* Наследует:
  * `FlatMoneyV2OrderHelperGuard` — базовая логика из протокола
  * `ERC20Guard` — базовая логика из протокола
  * `IAddAssetCheckGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### FluidTokenAssetGuard

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `ERC20Guard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### FluidTokenContractGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `IGuard` — базовая логика из протокола
  * `ITransactionTypes` — базовая логика из протокола
  * `TxDataUtils` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### FluidTokenPriceAggregator

* Вызывает:
  * `PoolFactory.конфигурация фабрики` — чтение настроек фабрики и пауз
* Хранит ссылки на:
  * нет
* Наследует:
  * `IAggregatorV3Interface` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### GmxExchangeRouterContractGuard

* Вызывает:
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
  * `PoolFactory.isValidAsset()` — проверка допустимых активов фабрики
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `ITxTrackingGuard` — базовая логика из протокола
  * `ITransactionTypes` — базовая логика из протокола
  * `IGmxExchangeRouterContractGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### GmxPerpMarketAssetGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
  * `PoolFactory.конфигурация фабрики` — чтение настроек фабрики и пауз
  * `PoolFactory.getContractGuard()` — получение настроек гвардов
* Хранит ссылки на:
  * нет
* Наследует:
  * `OutsidePositionWithdrawalHelper` — базовая логика из протокола
  * `ERC20Guard` — базовая логика из протокола
  * `IAddAssetCheckGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### Governance

* Вызывает:
  * `Governance.contractGuards()/assetGuards()` — чтение карт гвардов протокола
* Хранит ссылки на:
  * нет
* Наследует:
  * `IGovernance` — базовая логика из протокола
* Админские права:
  * `owner` → может вызывать setAssetGuard, setContractGuard

#### HackerPriceAggregator

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `IAggregatorV3Interface` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### InitializableUpgradeabilityProxy

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `BaseUpgradeabilityProxy` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### LyraOptionMarketContractGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `LyraOptionMarketWrapperContractGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### LyraOptionMarketWrapperAssetGuard

* Вызывает:
  * `PoolFactory.isValidAsset()` — проверка допустимых активов фабрики
  * `PoolFactory.getContractGuard()` — получение настроек гвардов
* Хранит ссылки на:
  * нет
* Наследует:
  * `ClosedAssetGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### LyraOptionMarketWrapperContractGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `ITxTrackingGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### LyraOptionMarketWrapperContractGuardRollups

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `LyraOptionMarketWrapperContractGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### MaiVaultAssetGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolFactory.getContractGuard()` — получение настроек гвардов
* Хранит ссылки на:
  * нет
* Наследует:
  * `MaiVaultWithdrawProcessing` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### MaiVaultContractGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `IGuard` — базовая логика из протокола
  * `ITxTrackingGuard` — базовая логика из протокола
  * `ITransactionTypes` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### MaiVaultWithdrawProcessing

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolFactory.getContractGuard()` — получение настроек гвардов
* Хранит ссылки на:
  * нет
* Наследует:
  * `ClosedAssetGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### Managed

* Вызывает:
  * `PoolManagerLogic.manager()/trader()` — чтение ролей менеджера и трейдера
* Хранит ссылки на:
  * нет
* Наследует:
  * `IManaged` — базовая логика из протокола
* Админские права:
  * `manager` → может вызывать addMember, addMembers, changeManager, removeMember, removeMembers, removeTrader, setTrader
  * `manager/trader` → может исполнять торговые операции и менять активы

#### MaticXPriceAggregator

* Вызывает:
  * `PoolFactory.isValidAsset()` — проверка допустимых активов фабрики
* Хранит ссылки на:
  * `PoolFactory` (поле `factory` — адрес фабрики пула)
* Наследует:
  * `IAggregatorV3Interface` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### MedianTWAPAggregator

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `IAggregatorV3Interface` — базовая логика из протокола
* Админские права:
  * `owner` → может вызывать pause, setUpdateInterval, setVolatilityTripLimit, unpause, withdraw

#### NftTrackerConsumerGuard

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `ITransactionTypes` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### OdosV2ContractGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `ITransactionTypes` — базовая логика из протокола
  * `SlippageAccumulatorUser` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### OneInchV4Guard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `IGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### OneInchV5Guard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `IGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### OneInchV6Guard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `ITransactionTypes` — базовая логика из протокола
  * `SlippageAccumulatorUser` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### OpenAssetGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolFactory.getContractGuard()` — получение настроек гвардов
  * `PoolManagerLogic.manager()/trader()` — чтение ролей менеджера и трейдера
* Хранит ссылки на:
  * нет
* Наследует:
  * `IGuard` — базовая логика из протокола
  * `TxDataUtils` — базовая логика из протокола
* Админские права:
  * `owner` → может вызывать setValidAsset

#### OutsidePositionWithdrawalHelper

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * нет
* Админские права:
  * не найдено в коде

#### PancakeCLAssetGuard

* Вызывает:
  * `PoolFactory.isValidAsset()` — проверка допустимых активов фабрики
  * `PoolFactory.getContractGuard()` — получение настроек гвардов
* Хранит ссылки на:
  * нет
* Наследует:
  * `ClosedAssetGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### PancakeCLBaseContractGuard

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `NftTrackerConsumerGuard` — базовая логика из протокола
  * `ITxTrackingGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### PancakeMasterChefV3Guard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `IERC721VerifyingGuard` — базовая логика из протокола
  * `PancakeCLBaseContractGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### PancakeNonfungiblePositionGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `PancakeCLBaseContractGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### PendlePTAssetGuard

* Вызывает:
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `ERC20Guard` — базовая логика из протокола
  * `IAddAssetCheckGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### PendlePTPriceAggregator

* Вызывает:
  * `PoolFactory.конфигурация фабрики` — чтение настроек фабрики и пауз
* Хранит ссылки на:
  * нет
* Наследует:
  * `IAggregatorV3Interface` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### PendleRouterV4ContractGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `ITransactionTypes` — базовая логика из протокола
  * `SlippageAccumulatorUser` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### PoolFactory

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
  * `PoolFactory.isValidAsset()` — проверка допустимых активов фабрики
  * `PoolFactory.getContractGuard()` — получение настроек гвардов
  * `Governance.contractGuards()/assetGuards()` — чтение карт гвардов протокола
  * `PoolFactory.daoAddress()` — получение адреса DAO для комиссий
  * `PoolFactory.getMaximumFee()` — чтение лимитов комиссий
  * `PoolFactory.pausedPools()` — проверка статуса паузы пула
  * `PoolManagerLogic.manager()/trader()` — чтение ролей менеджера и трейдера
* Хранит ссылки на:
  * `Governance` (поле `governanceAddress` — контракт конфигурации гвардов)
* Наследует:
  * `ProxyFactory` — базовая логика из протокола
  * `IHasDaoInfo` — базовая логика из протокола
  * `IHasFeeInfo` — базовая логика из протокола
  * `IHasAssetInfo` — базовая логика из протокола
  * `IHasGuardInfo` — базовая логика из протокола
  * `IHasPausable` — базовая логика из протокола
* Админские права:
  * `owner` → может вызывать addCustomCooldownWhitelist, addReceiverWhitelist, pause, removeCustomCooldownWhitelist, removeReceiverWhitelist, setAssetHandler, setDAOAddress, setDaoFee, setExitCooldown, setGovernanceAddress, setMaximumFee, setMaximumPerformanceFeeNumeratorChange, setMaximumSupportedAssetCount, setPerformanceFeeNumeratorChangeDelay, setPoolsPaused, unpause
  * `pool` → может вызывать emitPoolEvent, emitPoolManagerEvent
  * `PoolManagerLogic` → может вызывать emitPoolManagerEvent

#### PoolLimitOrderManager

* Вызывает:
  * `PoolFactory.конфигурация фабрики` — чтение настроек фабрики и пауз
* Хранит ссылки на:
  * нет
* Наследует:
  * нет
* Админские права:
  * `owner` → может вызывать addAuthorizedKeeper, removeAuthorizedKeeper, setDefaultSlippageTolerance, setEasySwapper, setLimitOrderSettlementToken, setPoolFactory

#### PoolLogic

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
  * `PoolFactory.конфигурация фабрики` — чтение настроек фабрики и пауз
  * `PoolFactory.getContractGuard()` — получение настроек гвардов
  * `Governance.contractGuards()/assetGuards()` — чтение карт гвардов протокола
  * `PoolFactory.daoAddress()` — получение адреса DAO для комиссий
  * `PoolFactory.getMaximumFee()` — чтение лимитов комиссий
  * `PoolFactory.pausedPools()` — проверка статуса паузы пула
  * `PoolManagerLogic.manager()/trader()` — чтение ролей менеджера и трейдера
* Хранит ссылки на:
  * `EasySwapperV2` (поле `creator` — создатель прокси EasySwapper)
  * `PoolManagerLogic` (поле `poolManagerLogic` — адрес логики менеджера пула)
  * `PoolFactory` (поле `factory` — адрес фабрики пула)
* Наследует:
  * `IFlashLoanReceiver` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### PoolManagerLogic

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
  * `PoolFactory.isValidAsset()` — проверка допустимых активов фабрики
  * `PoolFactory.конфигурация фабрики` — чтение настроек фабрики и пауз
  * `PoolFactory.getContractGuard()` — получение настроек гвардов
  * `PoolFactory.getMaximumFee()` — чтение лимитов комиссий
* Хранит ссылки на:
  * нет
* Наследует:
  * `IPoolManagerLogic` — базовая логика из протокола
  * `IHasSupportedAsset` — базовая логика из протокола
* Админские права:
  * `manager` → может вызывать announceFeeIncrease, commitFeeIncrease, renounceFeeIncrease, setFeeNumerator, setMinDepositUSD, setNftMembershipCollectionAddress, setTraderAssetChangeDisabled

#### PoolTokenSwapper

* Вызывает:
  * `PoolFactory.getContractGuard()` — получение настроек гвардов
* Хранит ссылки на:
  * `PoolLogic` (поле `poolLogic` — адрес пула)
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
* Админские права:
  * `owner` → может вызывать pause, salvage, setAssets, setManager, setPools, setSwapWhitelist, unpause
  * `manager` → может вызывать execTransaction

#### PoolTokenSwapperGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `IGuard` — базовая логика из протокола
  * `ITransactionTypes` — базовая логика из протокола
  * `SlippageAccumulatorUser` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### PrivateTokenSwap

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * нет
* Админские права:
  * `owner` → может вызывать setExchangeRate, withdrawAdmin

#### Proxy

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * нет
* Админские права:
  * не найдено в коде

#### ProxyFactory

* Вызывает:
  * нет
* Хранит ссылки на:
  * `PoolLogic` (поле `poolLogic` — адрес пула)
  * `PoolManagerLogic` (поле `poolManagerLogic` — адрес логики менеджера пула)
* Наследует:
  * `HasLogic` — базовая логика из протокола
* Админские права:
  * `owner` → может вызывать setLogic

#### PythPriceAggregator

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `IGmxCustomPriceFeedProvider` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### QuickLPAssetGuard

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `ERC20Guard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### QuickStakingRewardsGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `IGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### RamsesCLAssetGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
  * `PoolFactory.isValidAsset()` — проверка допустимых активов фабрики
  * `PoolFactory.getContractGuard()` — получение настроек гвардов
* Хранит ссылки на:
  * нет
* Наследует:
  * `ERC20Guard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### RamsesGaugeContractGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `IGuard` — базовая логика из протокола
  * `ITransactionTypes` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### RamsesLPAssetGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolFactory.isValidAsset()` — проверка допустимых активов фабрики
* Хранит ссылки на:
  * нет
* Наследует:
  * `ERC20Guard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### RamsesNonfungiblePositionGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
  * `PoolFactory.isValidAsset()` — проверка допустимых активов фабрики
* Хранит ссылки на:
  * нет
* Наследует:
  * `NftTrackerConsumerGuard` — базовая логика из протокола
  * `ITxTrackingGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### RamsesRouterContractGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `IGuard` — базовая логика из протокола
  * `ITransactionTypes` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### RamsesStableLPAggregator

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `VelodromeStableLPAggregator` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### RamsesTWAPAggregator

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `VelodromeTWAPAggregator` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### RamsesVariableLPAggregator

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `UniV2LPAggregator` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### RamsesXRamContractGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `IGuard` — базовая логика из протокола
  * `ITransactionTypes` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### RewardAssetGuard

* Вызывает:
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
  * `PoolFactory.isValidAsset()` — проверка допустимых активов фабрики
* Хранит ссылки на:
  * нет
* Наследует:
  * `ERC20Guard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### RewardDistribution

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * нет
* Админские права:
  * `owner` → может вызывать launch, setRewardAmountPerSecond, setRewardToken, setWhitelistedPools, withdrawAdmin

#### SkyPSM3ContractGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `ITransactionTypes` — базовая логика из протокола
  * `SlippageAccumulatorUser` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### SlippageAccumulator

* Вызывает:
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
  * `PoolFactory.isValidAsset()` — проверка допустимых активов фабрики
  * `PoolFactory.getContractGuard()` — получение настроек гвардов
* Хранит ссылки на:
  * нет
* Наследует:
  * нет
* Админские права:
  * `owner` → может вызывать setDecayTime, setMaxCumulativeSlippage

#### SlippageAccumulatorUser

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
* Хранит ссылки на:
  * нет
* Наследует:
  * `ITxTrackingGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### SonneFinanceComptrollerGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `IGuard` — базовая логика из протокола
  * `ITransactionTypes` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### SonneFinanceCTokenGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `IGuard` — базовая логика из протокола
  * `ITransactionTypes` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### SonneFinancePriceAggregator

* Вызывает:
  * `PoolFactory.isValidAsset()` — проверка допустимых активов фабрики
* Хранит ссылки на:
  * нет
* Наследует:
  * `IAggregatorV3Interface` — базовая логика из протокола
  * `ExponentialNoError` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### StargateLPAssetGuard

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `ERC20Guard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### StargateLpStakingContractGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
  * `PoolFactory.isValidAsset()` — проверка допустимых активов фабрики
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `IGuard` — базовая логика из протокола
  * `ITransactionTypes` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### StargateRouterContractGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `IGuard` — базовая логика из протокола
  * `ITransactionTypes` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### SushiLPAssetGuard

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `ERC20Guard` — базовая логика из протокола
* Админские права:
  * `owner` → может вызывать setSushiPoolId

#### SushiMiniChefV2Guard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `IGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### SynthetixFuturesMarketAssetGuard

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `ClosedAssetGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### SynthetixFuturesMarketContractGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `IGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### SynthetixGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
  * `PoolFactory.getContractGuard()` — получение настроек гвардов
  * `PoolManagerLogic.manager()/trader()` — чтение ролей менеджера и трейдера
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `IGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### SynthetixPerpsV2MarketAssetGuard

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `ClosedAssetGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### SynthetixPerpsV2MarketContractGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `IGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### SynthetixV3AssetGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolFactory.isValidAsset()` — проверка допустимых активов фабрики
  * `PoolFactory.getContractGuard()` — получение настроек гвардов
* Хранит ссылки на:
  * нет
* Наследует:
  * `ClosedAssetGuard` — базовая логика из протокола
  * `IMutableBalanceAssetGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### SynthetixV3ContractGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
  * `PoolFactory.isValidAsset()` — проверка допустимых активов фабрики
  * `PoolFactory.конфигурация фабрики` — чтение настроек фабрики и пауз
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `ITxTrackingGuard` — базовая логика из протокола
  * `ITransactionTypes` — базовая логика из протокола
  * `IERC721VerifyingGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### SynthetixV3PerpsAssetGuard

* Вызывает:
  * `PoolFactory.getContractGuard()` — получение настроек гвардов
* Хранит ссылки на:
  * нет
* Наследует:
  * `OutsidePositionWithdrawalHelper` — базовая логика из протокола
  * `ClosedAssetGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### SynthetixV3PerpsMarketContractGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
  * `PoolFactory.getContractGuard()` — получение настроек гвардов
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `ITxTrackingGuard` — базовая логика из протокола
  * `ITransactionTypes` — базовая логика из протокола
  * `IERC721VerifyingGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### SynthetixV3SpotMarketContractGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
  * `PoolFactory.isValidAsset()` — проверка допустимых активов фабрики
  * `PoolFactory.getContractGuard()` — получение настроек гвардов
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `ITransactionTypes` — базовая логика из протокола
  * `SlippageAccumulatorUser` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### SynthPriceAggregator

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `IAggregatorV3Interface` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### SynthRedeemerContractGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `IGuard` — базовая логика из протокола
  * `ITransactionTypes` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### TxDataUtils

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * нет
* Админские права:
  * не найдено в коде

#### UniswapV2RouterGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `IGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### UniswapV3AssetGuard

* Вызывает:
  * `PoolFactory.isValidAsset()` — проверка допустимых активов фабрики
  * `PoolFactory.getContractGuard()` — получение настроек гвардов
* Хранит ссылки на:
  * нет
* Наследует:
  * `ERC20Guard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### UniswapV3NonfungiblePositionGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `NftTrackerConsumerGuard` — базовая логика из протокола
  * `ITxTrackingGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### UniswapV3RouterGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `ITransactionTypes` — базовая логика из протокола
  * `SlippageAccumulatorUser` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### UniV2LPAggregator

* Вызывает:
  * `PoolFactory.isValidAsset()` — проверка допустимых активов фабрики
* Хранит ссылки на:
  * `PoolFactory` (поле `factory` — адрес фабрики пула)
* Наследует:
  * `IAggregatorV3Interface` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### UniV3TWAPAggregator

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `IAggregatorV3Interface` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### USDPriceAggregator

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `IAggregatorV3Interface` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### VaultProxyFactory

* Вызывает:
  * нет
* Хранит ссылки на:
  * `WithdrawalVault` (поле `vaultLogic` — адрес реализации хранилища EasySwapperV2)
* Наследует:
  * `HasLogic` — базовая логика из протокола
* Админские права:
  * `owner` → может вызывать setLogic

#### VelodromeCLAssetGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolFactory.isValidAsset()` — проверка допустимых активов фабрики
  * `PoolFactory.getContractGuard()` — получение настроек гвардов
* Хранит ссылки на:
  * нет
* Наследует:
  * `ERC20Guard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### VelodromeCLGaugeContractGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
  * `PoolFactory.getContractGuard()` — получение настроек гвардов
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `IGuard` — базовая логика из протокола
  * `ITransactionTypes` — базовая логика из протокола
  * `IERC721VerifyingGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### VelodromeGaugeContractGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `IGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### VelodromeLPAssetGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolFactory.isValidAsset()` — проверка допустимых активов фабрики
* Хранит ссылки на:
  * нет
* Наследует:
  * `ERC20Guard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### VelodromeNonfungiblePositionGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `NftTrackerConsumerGuard` — базовая логика из протокола
  * `ITxTrackingGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### VelodromeNonfungiblePositionGuardOld

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `NftTrackerConsumerGuard` — базовая логика из протокола
  * `ClosedContractGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### VelodromePairContractGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `IGuard` — базовая логика из протокола
  * `ITransactionTypes` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### VelodromeRouterGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `IGuard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### VelodromeStableLPAggregator

* Вызывает:
  * `PoolFactory.isValidAsset()` — проверка допустимых активов фабрики
* Хранит ссылки на:
  * `PoolFactory` (поле `factory` — адрес фабрики пула)
* Наследует:
  * `IAggregatorV3Interface` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### VelodromeTWAPAggregator

* Вызывает:
  * `PoolFactory.isValidAsset()` — проверка допустимых активов фабрики
* Хранит ссылки на:
  * нет
* Наследует:
  * `IAggregatorV3Interface` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### VelodromeV2GaugeContractGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `IGuard` — базовая логика из протокола
  * `ITransactionTypes` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### VelodromeV2LPAssetGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolFactory.isValidAsset()` — проверка допустимых активов фабрики
* Хранит ссылки на:
  * нет
* Наследует:
  * `ERC20Guard` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### VelodromeV2RouterGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `IGuard` — базовая логика из протокола
  * `ITransactionTypes` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### VelodromeV2TWAPAggregator

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `IAggregatorV3Interface` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### VelodromeVariableLPAggregator

* Вызывает:
  * нет
* Хранит ссылки на:
  * нет
* Наследует:
  * `UniV2LPAggregator` — базовая логика из протокола
* Админские права:
  * не найдено в коде

#### WithdrawalVault

* Вызывает:
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
  * `PoolFactory.isValidAsset()` — проверка допустимых активов фабрики
* Хранит ссылки на:
  * `EasySwapperV2` (поле `creator` — создатель прокси EasySwapper)
* Наследует:
  * `IWithdrawalVault` — базовая логика из протокола
* Админские права:
  * `creator` → может вызывать recoverAssets, swapToSingleAsset, unrollAssets

#### ZeroExContractGuard

* Вызывает:
  * `PoolManagerLogic.poolLogic()` — получение адреса пула или параметров менеджера
  * `PoolManagerLogic.isSupportedAsset()` — проверка whitelist активов пула
* Хранит ссылки на:
  * нет
* Наследует:
  * `TxDataUtils` — базовая логика из протокола
  * `ITransactionTypes` — базовая логика из протокола
  * `SlippageAccumulatorUser` — базовая логика из протокола
* Админские права:
  * не найдено в коде
### 2. Дерево управления и прав

* DAO / Governance
  * `PoolFactory` (owner) может переназначать DAO и Governance адреса, менять параметры комиссий, лимит активов и ставить пулы на паузу, контролируя экономику и доступ к средствам. 【F:contracts/PoolFactory.sol†L276-L347】【F:contracts/PoolFactory.sol†L399-L523】
  * `Governance` (owner) задаёт соответствия контрактов и типов активов их гвардам, тем самым определяя, какие интеграции доступны менеджерам. 【F:contracts/Governance.sol†L38-L74】
  * `DhedgeStakingV2Storage` (owner) настраивает эмиссию vdHT: лимиты ставок, параметры буста, список пулов и генератор метаданных, что позволяет централизованно управлять стейкинговыми стимулами. 【F:contracts/stakingv2/DhedgeStakingV2Storage.sol†L90-L185】
  * `DhedgeEasySwapper` (owner) утверждает пулы, маршрутизаторы и комиссии для пользовательских депозитов, контролируя условия быстрого входа/выхода. 【F:contracts/swappers/easySwapper/DhedgeEasySwapper.sol†L63-L117】
  * `DynamicBonds` (owner) определяет параметры продаж облигаций (трезори, лимиты, цены и сроки), влияя на выпуск и стоимость бондов. 【F:contracts/DynamicBonds.sol†L144-L220】
* Manager
  * `PoolManagerLogic` позволяет менеджеру и назначенному трейдеру изменять список активов, объявлять и применять повышение комиссий, а также отключать возможность трейдера менять активы; фабрика может вмешаться как владелец. 【F:contracts/PoolManagerLogic.sol†L148-L180】【F:contracts/PoolManagerLogic.sol†L373-L520】
  * Контракт `Managed` даёт менеджеру полномочия назначать трейдера и участников, а также менять самого менеджера, формируя команду управления пулом. 【F:contracts/Managed.sol†L24-L150】
* Investor / LP
  * Инвесторы используют функции `deposit*` и `withdraw*` `PoolLogic` для обмена активов на долевые токены и обратного выкупа; система проверяет whitelist активов и рассчитывает комиссии. Они не имеют доступа к `execTransaction`, если вызов не помечен как публичный гвардом. 【F:contracts/PoolLogic.sol†L240-L360】【F:contracts/PoolLogic.sol†L600-L672】
  * Инвесторы не могут менять состав активов, комиссии или параметры пула — эти операции защищены модификаторами onlyManager/onlyOwner. 【F:contracts/PoolManagerLogic.sol†L148-L520】
* Keeper / automation
  * не найдено в коде

### 3. Текстовый обзор архитектуры

Активы инвесторов фактически хранятся в `PoolLogic`, который удерживает депозитированные токены и выпускает ERC20-доли при входе. 【F:contracts/PoolLogic.sol†L240-L360】 Тот же контракт рассчитывает и выпускает долевые токены менеджера и DAO при начислении management/performance комиссий через `_mintManagerFee()`. 【F:contracts/PoolLogic.sol†L780-L820】 Выпуск и сжигание долей инвестора происходит внутри `PoolLogic` при депозитах и выводах, с учётом настроек комиссий из `PoolManagerLogic`. 【F:contracts/PoolLogic.sol†L240-L360】【F:contracts/PoolManagerLogic.sol†L373-L520】 Управляющие активами осуществляются через `execTransaction`, который допускает только менеджера или назначенного трейдера после проверки гвардами, а список поддерживаемых активов обновляется `PoolManagerLogic` с участием тех же ролей и фабрики. 【F:contracts/PoolLogic.sol†L600-L672】【F:contracts/PoolManagerLogic.sol†L148-L180】 Таким образом именно менеджер и его трейдер определяют ребалансировку пула, в то время как DAO контролирует глобальные лимиты, гварды и комиссионные параметры.
