# Системный обзор

## Список контрактов

| contract_name | file_path | deploy_info | purpose |
| --- | --- | --- | --- |
| AaveDebtTokenContractGuard | contracts/guards/contractGuards/aaveMigrationHelper/AaveDebtTokenContractGuard.sol | Polygon: 0xd0DD27DC984c1AC18a6fec6FCdB4C18af08887d4 | Controls pool transactions interacting with Aave Debt Token. |
| AaveIncentivesControllerGuard | contracts/guards/contractGuards/AaveIncentivesControllerGuard.sol | Polygon: 0xAF33891D6DD4e6fF6b1D676D77001B0F73197689 | Controls pool transactions interacting with Aave Incentives Controller. |
| AaveIncentivesControllerV3Guard | contracts/guards/contractGuards/AaveIncentivesControllerV3Guard.sol | Polygon: 0x91d3602Dfe4B150E6c39119AcB5e50AbfC7204e9; Arbitrum: 0xD52d10651686E9E27160B7Ec85534f0Fb76173D9; Optimism: 0x2fAC63DBE4BD4f3D118909193Ff2563Da027eB88; Base: 0x9f4655D46B5C3A40ABAa92BF2665849253E7F1bc | Controls pool transactions interacting with Aave Incentives Controller V3. |
| AaveLendingPoolAssetGuard | contracts/guards/assetGuards/AaveLendingPoolAssetGuard.sol | Polygon: 0xF0cF578F86e4693b204c6Fa985Cb185B50ED36E0 | Validates pool exposure to Aave Lending Pool assets. |
| AaveLendingPoolGuardV2 | contracts/guards/contractGuards/AaveLendingPoolGuardV2.sol | Polygon: 0xb4592C7e03d97Ff2203aA169c0cB553af0a52482 | Controls pool transactions interacting with Aave Lending Pool V2. |
| AaveLendingPoolGuardV3 | contracts/guards/contractGuards/AaveLendingPoolGuardV3.sol | Mainnet: 0xBE9Fa04B41336130ef613b1cbb458d0708B10AC3; Polygon: 0xbd80DC9A9821a519C842Dc8F00F82264aeB68B45; Arbitrum: 0x41fc87D21Aad871EdC65E7AE512b105c8D57Ac74; Optimism: 0x19810194215869b649B606d03a218A2ab2cF7C61 | Controls pool transactions interacting with Aave Lending Pool V3. |
| AaveLendingPoolGuardV3L2Pool | contracts/guards/contractGuards/AaveLendingPoolGuardV3L2Pool.sol | Arbitrum: 0x443aaD2D36292cECcC6931b7824eDfCc996fC954; Optimism: 0x896bA0CDe6E2e7491f47e5Ae59592B45e488Ab01; Base: 0xb6478D9ad197e50F99571Bf98f0BDc92756ec21f | Controls pool transactions interacting with Aave Lending Pool V3 L2 Pool. |
| AaveMigrationHelperGuard | contracts/guards/contractGuards/aaveMigrationHelper/AaveMigrationHelperGuard.sol | Polygon: 0xD131aff6138155cA384C0A7e5e91e73f0Ab7dd0E | Controls pool transactions interacting with Aave Migration Helper. |
| AcrossContractGuard | contracts/guards/contractGuards/across/AcrossContractGuard.sol | Arbitrum: 0xAc8DC0420d3938FF8acDD2e550B5b7eE7ab7b1d8; Optimism: 0xAEFeF50A2Cf9fD45038Eb63F8e63Eb11839C704C; Base: 0x533a6e8902565E80f5582b116460D7af35956C19 | Controls pool transactions interacting with Across. |
| AllowApproveContractGuard | contracts/guards/contractGuards/AllowApproveContractGuard.sol | Optimism: 0x184Ed594176c54DC30C7Af1B51AECF4206AEFBb1 | Controls pool transactions interacting with Allow Approve. |
| AngleDistributorContractGuard | contracts/guards/contractGuards/AngleDistributorContractGuard.sol | Base: 0x2005A4824C8A88611b4B46e866750b6Fe4F2705f | Controls pool transactions interacting with Angle Distributor. |
| ArrakisLiquidityGaugeV4AssetGuard | contracts/guards/assetGuards/ArrakisLiquidityGaugeV4AssetGuard.sol | Polygon: 0xC6191Ed2db3c043505C2ED2e3FbFDFe1B9b2061F; Optimism: 0x1d03AC30495ab48d94905d1098566B3F86ed172E | Validates pool exposure to Arrakis Liquidity Gauge V4 assets. |
| ArrakisLiquidityGaugeV4ContractGuard | contracts/guards/contractGuards/ArrakisLiquidityGaugeV4ContractGuard.sol | Polygon: 0x6ABB2f1373c06b21655e90864433A3E0d5d8bdC1; Optimism: 0x794BC23E04aA3D3d7403e60e177a76DC5198e344 | Controls pool transactions interacting with Arrakis Liquidity Gauge V4. |
| ArrakisV1RouterStakingGuard | contracts/guards/contractGuards/ArrakisV1RouterStakingGuard.sol | Polygon: 0xCA6C89dfF08E4040052088eaF21f59b1D4bc5fA2; Optimism: 0xA382E11AD946ea5b0641C4A41bCc7d95a3f563CB | Controls pool transactions interacting with Arrakis V1 Router Staking. |
| AssetHandler | contracts/priceAggregators/AssetHandler.sol | Mainnet: 0x8F028683392a6Eb91d47EE0442D1B52f64893769; Arbitrum: 0x46c56Ca71F3FCd36d65AB3Ea642D9F777C966c03; Optimism: 0x2B3779AC26dDDCe403A71E818E4C7491A495B195; Base: 0x9A7D300AaD5F0d59F14c64C7DD607b530fad29a7 | Provides Asset Handler pricing for pool valuation. |
| BalancerComposableStablePoolAggregator | contracts/priceAggregators/BalancerComposableStablePoolAggregator.sol | unknown | Provides Balancer Composable Stable Pool pricing for pool valuation. |
| BalancerDHedgePoolPriceOracle | contracts/oracles/BalancerDHedgePoolPriceOracle.sol | unknown | Calculates dHEDGE pool valuations using Balancer DHedge Pool data. |
| BalancerMerkleOrchardGuard | contracts/guards/contractGuards/BalancerMerkleOrchardGuard.sol | Polygon: 0x75bE6311B6F649F4D8Be433c8AFFaf67d9CaD826 | Controls pool transactions interacting with Balancer Merkle Orchard. |
| BalancerStablePoolAggregator | contracts/priceAggregators/BalancerStablePoolAggregator.sol | unknown | Provides Balancer Stable Pool pricing for pool valuation. |
| BalancerV2GaugeAssetGuard | contracts/guards/assetGuards/BalancerV2GaugeAssetGuard.sol | Polygon: 0xD77d3BBD09e5E2af45610cEaE9091ea4C41814Bc; Arbitrum: 0x08Dfe9B8017AB3fde66a6A43A154ccC6f07B107B | Validates pool exposure to Balancer V2 Gauge assets. |
| BalancerV2GaugeContractGuard | contracts/guards/contractGuards/BalancerV2GaugeContractGuard.sol | Polygon: 0x2583A4580F3014552197B47C542d8c5f88A8C772; Arbitrum: 0x72232EBf4D5D447AA39685b197d393004807b955 | Controls pool transactions interacting with Balancer V2 Gauge. |
| BalancerV2Guard | contracts/guards/contractGuards/BalancerV2Guard.sol | Polygon: 0xC6CF4B058c51cf474c5984180e693AF438222363, 0xf9Dd3000500E5ea6921E515a87f1C101dF1ee09e; Arbitrum: 0x116157DF6afDFD191cdcb026378F87D2b66E4383 | Controls pool transactions interacting with Balancer V2. |
| BalancerV2LPAggregator | contracts/priceAggregators/BalancerV2LPAggregator.sol | unknown | Provides Balancer V2 LPAggregator pricing for pool valuation. |
| BaseUpgradeabilityProxy | contracts/upgradability/BaseUpgradeabilityProxy.sol | unknown | Upgradeable proxy implementation for protocol contracts. |
| ByPassAssetGuard | contracts/guards/assetGuards/ByPassAssetGuard.sol | Polygon: 0x2B6737daFb942E2b70EA14C6C9B01D46eA7E1310; Optimism: 0x179F30518d2004e7D7697788E5cCfF4fe1c322eE; Base: 0x00bC9798a926ED2e9031C2870bb7550F9D80ADEE | Validates pool exposure to By Pass assets. |
| ChainlinkPythPriceAggregator | contracts/priceAggregators/ChainlinkPythPriceAggregator.sol | unknown | Provides Chainlink Pyth pricing for pool valuation. |
| ClosedAssetGuard | contracts/guards/assetGuards/ClosedAssetGuard.sol | unknown | Validates pool exposure to Closed assets. |
| ClosedContractGuard | contracts/guards/contractGuards/ClosedContractGuard.sol | Polygon: 0x32f9AEE0AB90D01917dCb4ECDE4E8eFA9B827Cdc; Arbitrum: 0x60a30E15bF02Ee355fAf60cDB8B6c0C455697675; Optimism: 0x60158EfA98fe2c305fE54837f4d01E88a5DE113F; Base: 0x8E0367ba035Dd3525bE1e894b0b6c1C3C9A87141 | Controls pool transactions interacting with Closed. |
| CompoundV3CometAssetGuard | contracts/guards/assetGuards/CompoundV3CometAssetGuard.sol | Arbitrum: 0x81567c5E1A6D6683ecFBC54927150e7cc1Cf41C4; Optimism: 0x5d8F5A3cBB98E7C76Ab95F9324ae57768b1be8c5; Base: 0x1fa1814fEADa03df792ab603c8a93D193f98C331 | Validates pool exposure to Compound V3 Comet assets. |
| CompoundV3CometContractGuard | contracts/guards/contractGuards/compound/CompoundV3CometContractGuard.sol | Arbitrum: 0xc24cdb9Ff88894652D1d676d125d0671167FC10d; Optimism: 0x74c1810F3Cf4780bD1859d32Ff61672cE1204192; Base: 0x87De1fAC89E47159B991E3310f6Bb7b4AD6E8869 | Controls pool transactions interacting with Compound V3 Comet. |
| CompoundV3CometRewardsContractGuard | contracts/guards/contractGuards/compound/CompoundV3CometRewardsContractGuard.sol | Arbitrum: 0x040A514dD5f3aB9FF9cE0f863cc9b7F4D4558641; Optimism: 0xd121a50879Cd3d065BAf17C271d147B596DAa30a; Base: 0xaB9a62192dA98d256CBF60808daB20FF63B4Ed58 | Controls pool transactions interacting with Compound V3 Comet Rewards. |
| CustomCrossAggregator | contracts/priceAggregators/CustomCrossAggregator.sol | unknown | Provides Custom Cross pricing for pool valuation. |
| DhedgeEasySwapper | contracts/swappers/easySwapper/DhedgeEasySwapper.sol | Polygon: 0x59F68B80A0F6C6400BE2E62F58c1DD89Ab832268; Arbitrum: 0x0843E589bf27911528bF02D7080fA87F40CBABDf; Optimism: 0x39f36763fD62C7b384720f81C1326EC334dc6712; Base: 0xCB321A43e1765dA847051a64268Efa53744721D7 | Handles investor deposits and withdrawals using legacy EasySwapper flows. |
| DhedgeNftTrackerStorage | contracts/utils/tracker/DhedgeNftTrackerStorage.sol | Polygon: 0x4150a35D8b2cD2a485750540efd3D546011bCccc; Arbitrum: 0x67e34Cc20F8A982d7D804C8A5199f1e3E895d398; Optimism: 0x56dda05845F4F334E69d514E12b27B3aE24EaB80; Base: 0xe2317CA7ab6D54608470ae368b04E7a00164Be36 | Stores NFT position tracking data for pools and guards. |
| DhedgeOptionMarketWrapperForLyra | contracts/utils/lyra/DhedgeOptionMarketWrapperForLyra.sol | Optimism: 0xBEFa33261Ce1dF58F47e274165Cf85D504336421 | Wraps Lyra option markets for pool-compatible execution. |
| DHedgePoolAggregator | contracts/priceAggregators/DHedgePoolAggregator.sol | unknown | Provides DHedge Pool pricing for pool valuation. |
| DhedgeRamsesUniV2Router | contracts/routers/DhedgeRamsesUniV2Router.sol | Arbitrum: 0x68B027DeC5237ffa1b0219d982792A9e9d977Ff3 | Routes swaps across Ramses and other UniV2-style pools. |
| DhedgeStakingV2 | contracts/stakingv2/DhedgeStakingV2.sol | Polygon: 0xc07e348f669bbe839d95743A1e4a57985AAE29ED; Optimism: 0xa3D7Fb85D8A8713c2B0cAD1929d8fc79a6a2AC89 | Core staking contract controlling VDHT emission schedules. |
| DhedgeStakingV2NFTJson | contracts/stakingv2/DhedgeStakingV2NFTJson.sol | Polygon: 0xAdb97F1dc5932F1A5014acCa6A9E92dFE340b92a; Optimism: 0xD328d6F4D734F4Ab74dfe462F767d5dB4Ad5C111 | Generates on-chain metadata for staking position NFTs. |
| DhedgeStakingV2RewardsCalculator | contracts/stakingv2/DhedgeStakingV2RewardsCalculator.sol | unknown | Tracks staking reward accrual inputs for vdHT. |
| DhedgeStakingV2Storage | contracts/stakingv2/DhedgeStakingV2Storage.sol | unknown | Holds staking configuration and balances for vdHT. |
| DhedgeStakingV2VDHTCalculator | contracts/stakingv2/DhedgeStakingV2VDHTCalculator.sol | unknown | Calculates vdHT voting power from staking positions. |
| DhedgeSuperSwapper | contracts/routers/DhedgeSuperSwapper.sol | Mainnet: 0x0e2b20d47228729e8649aF41138d479b172F30b6; Polygon: 0xd4A9Fd5925bD85554D22C6359B83B4501A3ABa76; Arbitrum: 0x4AF5FC6930599A1117600817CB7fAE428B15CAf6; Optimism: 0x64a9c356bc131eDF1430C24F47e9dC735Ed237Ef; Base: 0x9bE950d8bff36F09E5D460271859F94C7C58344C | Routes swaps across multiple venues to optimise pool trades. |
| DhedgeUniV3V2Router | contracts/routers/DhedgeUniV3V2Router.sol | Mainnet: 0xc49b0e838C2a83adaE7D82d82792082DD5cfAf8A; Polygon: 0xeb0E2889B97Fbeb0e7b2e75CC30Ebd514FD76bEd; Arbitrum: 0x9f9eeb27C9a9B17923F475DC624d33Be9A764C35; Optimism: 0x645dc92aDF7632b433FAeCe370a74C378E7236f8; Base: 0x7432BA001d31D80C23c58b34F345E258567e6a0b | Combines Uniswap V3 and V2 routing for manager trades. |
| DhedgeVeloUniV2Router | contracts/routers/DhedgeVeloUniV2Router.sol | Optimism: 0xB687162d66280074Bf2784902B57F3F1212297E5 | Routes swaps via Velodrome and Uniswap V2-style liquidity. |
| DhedgeVeloV2UniV2Router | contracts/routers/DhedgeVeloV2UniV2Router.sol | Optimism: 0x2fF5e8e7017e67FDdf80C4ba1A92691d498eDe29; Base: 0x3ed3E205A7e046bbD53e9B1C4E99CD9EC078AF2c | Routes swaps via Velodrome V2 and Uniswap V2-style pools. |
| DodoDHedgePoolPriceOracle | contracts/oracles/DodoDHedgePoolPriceOracle.sol | unknown | Calculates dHEDGE pool valuations using Dodo DHedge Pool data. |
| DQUICKPriceAggregator | contracts/priceAggregators/dQUICKPriceAggregator.sol | unknown | Provides DQUICKPrice pricing for pool valuation. |
| DynamicBonds | contracts/DynamicBonds.sol | Polygon: 0x04965f01e531311f1686be8d6904e9a361191749 | Manages dynamic bond sales swapping deposits for target tokens. |
| EasySwapperGuard | contracts/guards/contractGuards/EasySwapperGuard.sol | Polygon: 0x813a65aCc4b61530075B040f1689531966d62910; Arbitrum: 0x60b8a1972f0f43809fEA643cFd4Dce86528a0b59; Optimism: 0x476eE8b22ab667720AE5Df709f87130BBa44a06C; Base: 0x4DEfb40ea23ca2eFF1a9Ac4f98a8A5F138f57795 | Controls pool transactions interacting with Easy Swapper. |
| EasySwapperV2 | contracts/swappers/easySwapperV2/EasySwapperV2.sol | Mainnet: 0xc8fd7e4e901393A5699b3d27947EB7787336a611; Polygon: 0xB3a81Fe03e2A0259E5EbC3567463f8b08d912eB7; Arbitrum: 0x8ED0b3d9F6904adD0b0d43a1af1A837dC2e803aA; Optimism: 0xD499FB6eA0472cD1F03e5e4b7836d72f255860dA; Base: 0x4eC45B5a9BB79dBb767315A65A3D025902A439Bc | Handles investor deposits and withdrawals for the upgraded EasySwapper. |
| EasySwapperV2ContractGuard | contracts/guards/contractGuards/EasySwapperV2ContractGuard.sol | Polygon: 0xfC2621aD46EE9a80A286Adbe371426556996C06d; Arbitrum: 0x9d69210CF152056Afb5DE540149082d3c93e9667; Optimism: 0x50e440E9E5F1ABaBbb46755cc3f483882426cf12; Base: 0x516FB0354aE22901E8E9378074d7941F35BD3983 | Controls pool transactions interacting with Easy Swapper V2. |
| EasySwapperV2UnrolledAssetsGuard | contracts/guards/assetGuards/EasySwapperV2UnrolledAssetsGuard.sol | Polygon: 0xDcA7Ee1Cf0B1aD24900F06A805322ca7e2e4A071; Arbitrum: 0x1d8986db4fA5355CA491FdC55539eA17da2216F6; Optimism: 0x2b844c457e1699Cdc3c98C19BDBd0D14bf0a678d; Base: 0x8aE987DbAC9dE602fA9C915E4E161A319bF8AE46 | Validates pool exposure to Easy Swapper V2 Unrolled Assets assets. |
| ERC20Guard | contracts/guards/assetGuards/ERC20Guard.sol | Mainnet: 0x412b514310ef5c0f52dc43f07f804400c8bf8578; Polygon: 0x2033271d6932A82E720F0dDEc7736a0495b4db12, 0x3Cf903B98755CBf2174fDBD2e1027e538745A918, 0x65A1C0bE1151aEAcddc698e5dAcC4ed3c566744F, 0xB46B97E525aCE3db8f5e4F770eCD51fb25b364e2, 0xEe05745451CDc4942271fDc8626CB3aE98145590; Arbitrum: 0xE8cDcD1EA58Cbb216019Ed6101e6F6C9c9F077b0; Optimism: 0x7389aF54F1a4A4f8DB681Af6710Be3F35E3a9E74; Base: 0xDA5Db345A4415a90F93D1c9065CE51a2B8B91549 | Validates pool exposure to ERC20 assets. |
| ERC4626PriceAggregator | contracts/priceAggregators/ERC4626PriceAggregator.sol | unknown | Provides ERC4626 pricing for pool valuation. |
| ERC721ContractGuard | contracts/guards/contractGuards/ERC721ContractGuard.sol | Optimism: 0x6de4c78b94ABAB75532c8dA42473823be924841B | Controls pool transactions interacting with ERC721. |
| ETHCrossAggregator | contracts/priceAggregators/ETHCrossAggregator.sol | unknown | Provides ETHCross pricing for pool valuation. |
| ExponentialNoError | contracts/utils/sonne/ExponentialNoError.sol | unknown | Provides Compound-style fixed-point math for Sonne integrations. |
| FixedPriceAggregator | contracts/priceAggregators/FixedPriceAggregator.sol | unknown | Provides Fixed pricing for pool valuation. |
| FlatMoneyBasisContractGuard | contracts/guards/contractGuards/flatMoney/shared/FlatMoneyBasisContractGuard.sol | unknown | Controls pool transactions interacting with Flat Money Basis. |
| FlatMoneyCollateralAssetGuard | contracts/guards/assetGuards/flatMoney/FlatMoneyCollateralAssetGuard.sol | Arbitrum: 0xC2C7E276cC7b525f7a4a42Dbfe5DB93626CBd7eF; Optimism: 0xfEC31677334ebF3fa43274085D373785bdeF4553; Base: 0x7b8E17d3f3331e82DF202Dc7a6a6012C94bDA989 | Validates pool exposure to Flat Money Collateral assets. |
| FlatMoneyDelayedOrderContractGuard | contracts/guards/contractGuards/flatMoney/FlatMoneyDelayedOrderContractGuard.sol | Base: 0x2d1F7aa5f26E7540e07eC55eC8271F06ff59B6de | Controls pool transactions interacting with Flat Money Delayed Order. |
| FlatMoneyOptionsMarketAssetGuard | contracts/guards/assetGuards/flatMoney/v2/FlatMoneyOptionsMarketAssetGuard.sol | Arbitrum: 0x580a949035bAB6838765f08f613a842f7E367866 | Validates pool exposure to Flat Money Options Market assets. |
| FlatMoneyOptionsOrderAnnouncementGuard | contracts/guards/contractGuards/flatMoney/v2/FlatMoneyOptionsOrderAnnouncementGuard.sol | Arbitrum: 0x5B1469a7Eb117c57F3894aC4Efc51157bD598005 | Controls pool transactions interacting with Flat Money Options Order Announcement. |
| FlatMoneyOptionsOrderExecutionGuard | contracts/guards/contractGuards/flatMoney/v2/FlatMoneyOptionsOrderExecutionGuard.sol | Arbitrum: 0x4779d0da8e0a8f8355C4d9B7A92A32555A634169 | Controls pool transactions interacting with Flat Money Options Order Execution. |
| FlatMoneyOrderHelperGuard | contracts/guards/assetGuards/flatMoney/FlatMoneyOrderHelperGuard.sol | unknown | Validates pool exposure to Flat Money Order Helper assets. |
| FlatMoneyPerpMarketAssetGuard | contracts/guards/assetGuards/flatMoney/FlatMoneyPerpMarketAssetGuard.sol | Base: 0x3Ee9f17c2450E170987EC0FC0dd54976C207e3FD | Validates pool exposure to Flat Money Perp Market assets. |
| FlatMoneyUNITAssetGuard | contracts/guards/assetGuards/flatMoney/FlatMoneyUNITAssetGuard.sol | Base: 0xB54EB255d6F77d38F527317A2339a96bEd9a7F93 | Validates pool exposure to Flat Money UNITAsset assets. |
| FlatMoneyUNITPriceAggregator | contracts/priceAggregators/FlatMoneyUNITPriceAggregator.sol | unknown | Provides Flat Money UNITPrice pricing for pool valuation. |
| FlatMoneyV2BasisAssetGuard | contracts/guards/assetGuards/flatMoney/v2/shared/FlatMoneyV2BasisAssetGuard.sol | unknown | Validates pool exposure to Flat Money V2 Basis assets. |
| FlatMoneyV2OrderAnnouncementGuard | contracts/guards/contractGuards/flatMoney/v2/FlatMoneyV2OrderAnnouncementGuard.sol | Optimism: 0x2A1A4968fd82edd0D3604BBfD3d509eADD257ed1 | Controls pool transactions interacting with Flat Money V2 Order Announcement. |
| FlatMoneyV2OrderExecutionGuard | contracts/guards/contractGuards/flatMoney/v2/FlatMoneyV2OrderExecutionGuard.sol | Optimism: 0xbB967EFaaEBA1E69A2951c58CC57d6c671ef405c | Controls pool transactions interacting with Flat Money V2 Order Execution. |
| FlatMoneyV2OrderHelperGuard | contracts/guards/assetGuards/flatMoney/v2/FlatMoneyV2OrderHelperGuard.sol | unknown | Validates pool exposure to Flat Money V2 Order Helper assets. |
| FlatMoneyV2PerpMarketAssetGuard | contracts/guards/assetGuards/flatMoney/v2/FlatMoneyV2PerpMarketAssetGuard.sol | Optimism: 0x7A1F0D2cb00217fAE30E878108a5Ec557200506A | Validates pool exposure to Flat Money V2 Perp Market assets. |
| FlatMoneyV2UNITAssetGuard | contracts/guards/assetGuards/flatMoney/v2/FlatMoneyV2UNITAssetGuard.sol | Optimism: 0x7F29E7106673709B709A8BaF89C099C1a39583Cd | Validates pool exposure to Flat Money V2 UNITAsset assets. |
| FluidTokenAssetGuard | contracts/guards/assetGuards/fluid/FluidTokenAssetGuard.sol | Arbitrum: 0xB9A84C300165C44e45c30d1Ddc6Cb8E12f79962E; Base: 0x9134069fAa797304Da01903838551073F0B44c41 | Validates pool exposure to Fluid Token assets. |
| FluidTokenContractGuard | contracts/guards/contractGuards/fluid/FluidTokenContractGuard.sol | Arbitrum: 0xB954CED0748fdcf04d57f28Cf5786a42409f52c8; Base: 0x1e393066C9a15C3704f7e3BD53A469ad49192E4f | Controls pool transactions interacting with Fluid Token. |
| FluidTokenPriceAggregator | contracts/priceAggregators/FluidTokenPriceAggregator.sol | unknown | Provides Fluid Token pricing for pool valuation. |
| GmxExchangeRouterContractGuard | contracts/guards/contractGuards/gmx/GmxExchangeRouterContractGuard.sol | Arbitrum: 0xEDB6e992c12D719AD89fBA7049b19b7bBf4e733c | Controls pool transactions interacting with Gmx Exchange Router. |
| GmxPerpMarketAssetGuard | contracts/guards/assetGuards/gmx/GmxPerpMarketAssetGuard.sol | Arbitrum: 0x1523A51450868899105a3c2e6C1b49ea4892AB86 | Validates pool exposure to Gmx Perp Market assets. |
| Governance | contracts/Governance.sol | Mainnet: 0xFa2837ecaC0136f7dE9221DB2b13fe9192De4BD2; Polygon: 0x206CbDa3381e7afdF448621b90f549f89555A588, 0x9e826B99f736EA29f89168be347197A8DD260806; Arbitrum: 0x0b844847558A5814CD0d5Ca539AdF62A5486c826; Optimism: 0xa9F912c1dB1b844fd96192Ac3B496E9d8F445bc9; Base: 0x5f8DEe0D89c9acF30666C1A3cD92C996ca6c3B7B | Provides DAO-level governance over pool factories and guards. |
| HackerPriceAggregator | contracts/priceAggregators/HackerPriceAggregator.sol | unknown | Provides Hacker pricing for pool valuation. |
| InitializableUpgradeabilityProxy | contracts/upgradability/InitializableUpgradeabilityProxy.sol | unknown | Proxy with initializer support for upgradeable deployments. |
| LyraOptionMarketContractGuard | contracts/guards/contractGuards/LyraOptionMarketContractGuard.sol | Optimism: 0x2Bd6B94Bb5cA5d63bE943342560322eFda4fe590 | Controls pool transactions interacting with Lyra Option Market. |
| LyraOptionMarketWrapperAssetGuard | contracts/guards/assetGuards/LyraOptionMarketWrapperAssetGuard.sol | Optimism: 0x8f4491ED76bE9680ec801CBc070fA12067B5071a | Validates pool exposure to Lyra Option Market Wrapper assets. |
| LyraOptionMarketWrapperContractGuard | contracts/guards/contractGuards/LyraOptionMarketWrapperContractGuard.sol | Optimism: 0xbA7522351a4AB86209444761Cd80AB74730888eC | Controls pool transactions interacting with Lyra Option Market Wrapper. |
| LyraOptionMarketWrapperContractGuardRollups | contracts/guards/contractGuards/LyraOptionMarketWrapperContractGuardRollups.sol | unknown | Controls pool transactions interacting with Lyra Option Market Wrapper Rollups. |
| MaiVaultAssetGuard | contracts/guards/assetGuards/mai/MaiVaultAssetGuard.sol | unknown | Validates pool exposure to Mai Vault assets. |
| MaiVaultContractGuard | contracts/guards/contractGuards/MaiVaultContractGuard.sol | unknown | Controls pool transactions interacting with Mai Vault. |
| MaiVaultWithdrawProcessing | contracts/guards/assetGuards/mai/MaiVaultWithdrawProcessing.sol | unknown | Validates pool exposure to Mai Vault Withdraw Processing assets. |
| Managed | contracts/Managed.sol | unknown | Base pool contract that enforces manager permissions and fee settings. |
| MaticXPriceAggregator | contracts/priceAggregators/MaticXPriceAggregator.sol | unknown | Provides Matic XPrice pricing for pool valuation. |
| MedianTWAPAggregator | contracts/priceAggregators/MedianTWAPAggregator.sol | unknown | Provides Median TWAPAggregator pricing for pool valuation. |
| NftTrackerConsumerGuard | contracts/guards/contractGuards/shared/NftTrackerConsumerGuard.sol | unknown | Controls pool transactions interacting with Nft Tracker Consumer. |
| OdosV2ContractGuard | contracts/guards/contractGuards/odos/OdosV2ContractGuard.sol | Mainnet: 0xFcdB2c85c799f51737AEFb5DdFF0B35f77DDB33a; Polygon: 0xf16F4Bac052d7856a3765Bdc218f64E3d50131d2; Arbitrum: 0x313d9A0D53c3F7AE0712d05f6d112af12dCB227b; Optimism: 0x7fd63E29063EC847A71fE5fFe0d7e398E03D6675; Base: 0xc877a20C878d0ADAE55d1067480B641305C2965f | Controls pool transactions interacting with Odos V2. |
| OneInchV4Guard | contracts/guards/contractGuards/OneInchV4Guard.sol | Polygon: 0x708Fb18D76Ca9E80792810758aCd81E60C6D987d, 0xC0db6Be34Fc59F40BB6285C7db82eC702737cDCD; Optimism: 0x8711fDA4252113F0D883e878C6A9DbAD76Cf7D4C | Controls pool transactions interacting with One Inch V4. |
| OneInchV5Guard | contracts/guards/contractGuards/OneInchV5Guard.sol | Polygon: 0x065B9EB1024375bfB0A160dd1943DDDDe92457C7; Arbitrum: 0xc0B92A955C336Bdc85cA60F0DaA9bF5EDB13fb42; Optimism: 0xf8Ed6aee2A036aE2b326e9fb09d9CFf40745fE40; Base: 0xFeF15116DcdB396932dcBD7D635B35f292C525C5 | Controls pool transactions interacting with One Inch V5. |
| OneInchV6Guard | contracts/guards/contractGuards/OneInchV6Guard.sol | Mainnet: 0xBB9b6133beA9359116D186759cEAB60B262387Dc; Polygon: 0x6eA74aad445b7fc1622ccc9dfAfe2CD79Fe3f64d; Arbitrum: 0x0987936b0cDf586c93F78583D675dff354f0C7b6; Optimism: 0xc58FBDC977AbAD70C7A5de2ade19e2d4bA9b7de3; Base: 0x809295F5DD8384eAB05a01289Fa7e26317CA994F | Controls pool transactions interacting with One Inch V6. |
| OpenAssetGuard | contracts/guards/assetGuards/OpenAssetGuard.sol | Polygon: 0x291EB769f9CeDe9f08b9E26d65e46aBfFc80d62d, 0x2f144f635129fbccac27c1c09e4ac4d2cab6f62b | Validates pool exposure to Open assets. |
| OutsidePositionWithdrawalHelper | contracts/guards/assetGuards/OutsidePositionWithdrawalHelper.sol | unknown | Validates pool exposure to Outside Position Withdrawal Helper assets. |
| PancakeCLAssetGuard | contracts/guards/assetGuards/pancake/PancakeCLAssetGuard.sol | Arbitrum: 0x92BCa1c27aCE6abD222cEb1eF4f242E1Ef770889; Base: 0xb98A17E241Fc4677CBA7217A2Fe30Bb4A10F094E | Validates pool exposure to Pancake CLAsset assets. |
| PancakeCLBaseContractGuard | contracts/guards/contractGuards/pancake/PancakeCLBaseContractGuard.sol | unknown | Controls pool transactions interacting with Pancake CLBase. |
| PancakeMasterChefV3Guard | contracts/guards/contractGuards/pancake/PancakeMasterChefV3Guard.sol | Arbitrum: 0x3A8e9C4B990A577F32666f9099C2C1f09bCeD611; Base: 0x7c6FeC82A272Bd3B76c1571D3764662a33469362 | Controls pool transactions interacting with Pancake Master Chef V3. |
| PancakeNonfungiblePositionGuard | contracts/guards/contractGuards/pancake/PancakeNonfungiblePositionGuard.sol | Arbitrum: 0x1eF16801a18B217962cdf5b4107c5b4B1D8B781E; Base: 0x05C5AF09090Aea7ce95C160DcCC37C8e7C8E88F6 | Controls pool transactions interacting with Pancake Nonfungible Position. |
| PendlePTAssetGuard | contracts/guards/assetGuards/pendle/PendlePTAssetGuard.sol | Mainnet: 0xc3d9533705949108bd4bc72066bfe63b8a5ee934 | Validates pool exposure to Pendle PTAsset assets. |
| PendlePTPriceAggregator | contracts/priceAggregators/PendlePTPriceAggregator.sol | unknown | Provides Pendle PTPrice pricing for pool valuation. |
| PendleRouterV4ContractGuard | contracts/guards/contractGuards/pendle/PendleRouterV4ContractGuard.sol | Mainnet: 0x47c174a58cb674a1e8a22039961ca741154cfef2 | Controls pool transactions interacting with Pendle Router V4. |
| PoolFactory | contracts/PoolFactory.sol | Mainnet: 0x8292b98669CAf8C1ff0a99854195cDca470A9E16; Polygon: 0x9e5490176816C6A545aa5514491386A13DBF44a3; Arbitrum: 0x3e619D37783Fe94B4E9dA29B7109548747f4B3B5; Optimism: 0xC7cA0340A824a08C80742d0ce4c8dCEA62293b1f; Base: 0x1B55225545165484BaC7d5D9744661427037741e | Deploys new pools and wires guards, assets, and governance settings. |
| PoolLimitOrderManager | contracts/limitOrders/PoolLimitOrderManager.sol | Polygon: 0xe3EDf68788aD941977758b2cdEECf8ea3D3cb560; Arbitrum: 0xbe2441CCc90F32DFD62E2555df105eA9afbf8F7F; Optimism: 0x86Bbc51a6afB2A9D8aa6D39Bd2306bd7D5C1FAE6; Base: 0x48262128685e7DbB5D4158a3DE15F812f18791D5 | Manages pool-controlled limit orders across supported venues. |
| PoolLogic | contracts/PoolLogic.sol | Mainnet: 0xC1Dc6Ca31585A3F256331489124feAF0b91cEb96; Polygon: 0x451024781348393EC89c02E8Fc347E19ed3cf4Da, 0x7EF064Fd491c05083D5F987E771b3FF9Ce7b5510, 0x972Ac6c728733B1f0c57BBE285926a5f2d5F3183, 0xB2cd0A958a622316187277f9650Ef6017F0D482c, 0xb44D46a67e12438918ac93d55276cf52CaDc0745, 0xf21848C9852eE543606D3C92962272D70028D3f1; Arbitrum: 0x39a079B68819485E73cac54dBCFC902985781E0A; Optimism: 0x7e5Eb8a0D74463cC1E3d360488543bb4F8D79A6A; Base: 0x974e457d77eB13eDcA36Ef1f86781b49f3fa4aDB | Implements pool accounting and investor share minting/burning. |
| PoolManagerLogic | contracts/PoolManagerLogic.sol | Mainnet: 0x4917c53Dea80D50cd467C57cE69Cf6E203A8B0D9; Polygon: 0x4b928feF16408e76a4f550E6e5cB15eA7C79c14b, 0x9A3de79a99adCAA5fd15510B7024a138f6d842A6, 0xD9A6F8a221818470B59e97115A0DB41bDd0CD7Eb, 0xFf3A3E3f2970B667d8D61405634EDB4557b5F233, 0xa1A104211B595834093C2b039334F3633B58a111, 0xaC7666F2F92776FF6DAbD4e0A2b6207FB1BEEECB; Arbitrum: 0xAF111c25eD8d5143c352884F1608B43C4DC0E05F; Optimism: 0x84C80D621607AEA5c02DAC52EAa9B2390eBFfC02; Base: 0x705138Fc3151503Db8e4F53dA1579dd784a26589 | Lets pool managers execute trades under guard constraints. |
| PoolTokenSwapper | contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol | Optimism: 0x700e62F15B404287C93Ff86Cd7C9df283e123471 | Manages share redemptions for tailored withdrawal baskets. |
| PoolTokenSwapperGuard | contracts/guards/contractGuards/PoolTokenSwapperGuard.sol | Optimism: 0xE291032af1297eDEC0dF75cFaB93dCa7dCaC32Ea | Controls pool transactions interacting with Pool Token Swapper. |
| PrivateTokenSwap | contracts/swappers/PrivateTokenSwap.sol | unknown | Executes OTC swaps for pools under manager control. |
| Proxy | contracts/upgradability/Proxy.sol | unknown | Fallback proxy forwarding calls to implementation logic. |
| ProxyFactory | contracts/upgradability/ProxyFactory.sol | unknown | Deploys upgradeable proxy instances for pool infrastructure. |
| PythPriceAggregator | contracts/priceAggregators/PythPriceAggregator.sol | unknown | Provides Pyth pricing for pool valuation. |
| QuickLPAssetGuard | contracts/guards/assetGuards/QuickLPAssetGuard.sol | Polygon: 0x52819cD403b2a2e1C3C9D0bEC3EA4edCE5688FdF, 0x624484f6a600ab9b785E53b620fB4d641dcDecd6 | Validates pool exposure to Quick LPAsset assets. |
| QuickStakingRewardsGuard | contracts/guards/contractGuards/QuickStakingRewardsGuard.sol | Polygon: 0x66509140E08A58a1CC0eEF29C565FE9c68E3EFAF, 0xBe1abFCBCE1F4B472cb21B1d1deD0Dc3F5c501d0 | Controls pool transactions interacting with Quick Staking Rewards. |
| RamsesCLAssetGuard | contracts/guards/assetGuards/ramsesCL/RamsesCLAssetGuard.sol | Arbitrum: 0x030c7C2833d0cd321255ef13775EB9458B6CEbDC | Validates pool exposure to Ramses CLAsset assets. |
| RamsesGaugeContractGuard | contracts/guards/contractGuards/ramses/RamsesGaugeContractGuard.sol | Arbitrum: 0x64608491f5A0082292867fC698254D25E0279286 | Controls pool transactions interacting with Ramses Gauge. |
| RamsesLPAssetGuard | contracts/guards/assetGuards/RamsesLPAssetGuard.sol | Arbitrum: 0x7628433e0FAcc77342161541dc0466e1e0C7C90D | Validates pool exposure to Ramses LPAsset assets. |
| RamsesNonfungiblePositionGuard | contracts/guards/contractGuards/ramsesCL/RamsesNonfungiblePositionGuard.sol | Arbitrum: 0xc8EDAeE48f360277aB70139Ac84935D83B32a1FB | Controls pool transactions interacting with Ramses Nonfungible Position. |
| RamsesRouterContractGuard | contracts/guards/contractGuards/ramses/RamsesRouterContractGuard.sol | Arbitrum: 0xA782433758D3C2520c60De9c0ba91Ab4b8318aA4 | Controls pool transactions interacting with Ramses Router. |
| RamsesStableLPAggregator | contracts/priceAggregators/RamsesStableLPAggregator.sol | unknown | Provides Ramses Stable LPAggregator pricing for pool valuation. |
| RamsesTWAPAggregator | contracts/priceAggregators/RamsesTWAPAggregator.sol | unknown | Provides Ramses TWAPAggregator pricing for pool valuation. |
| RamsesVariableLPAggregator | contracts/priceAggregators/RamsesVariableLPAggregator.sol | unknown | Provides Ramses Variable LPAggregator pricing for pool valuation. |
| RamsesXRamContractGuard | contracts/guards/contractGuards/ramses/RamsesXRamContractGuard.sol | Arbitrum: 0xf9839a9AeB0b882997E29D45c3D26766ED1EcCfD | Controls pool transactions interacting with Ramses XRam. |
| RewardAssetGuard | contracts/guards/assetGuards/RewardAssetGuard.sol | Mainnet: 0x3c92fb7604e3759b0847347dcd9384f2569a93ec; Optimism: 0x751C1F743ad723EC96fF548782A45353691E5a07; Base: 0x20E125DA16D93De54D69189f6Aa89F0Ee8ecf799 | Validates pool exposure to Reward assets. |
| RewardDistribution | contracts/distribution/RewardDistribution.sol | unknown | Streams reward tokens to configured recipients. |
| SkyPSM3ContractGuard | contracts/guards/contractGuards/SkyPSM3ContractGuard.sol | Base: 0x4c8992A23f1c783D6EFE0B7186A58C60e61A8c9C | Controls pool transactions interacting with Sky PSM3. |
| SlippageAccumulator | contracts/utils/SlippageAccumulator.sol | Mainnet: 0x165D338aa7327549F51D8c372F997B08ed260835; Polygon: 0xb23D4ccFaD52bB632a85c9a5d64c334B90B60E61; Arbitrum: 0xd145573EBd7c015e5C869960377E541Ee469357C; Optimism: 0x82Fd96f88d7a9aA95880f94bD41f437280abf8b2; Base: 0x75aD8f922a8C4386E4bf58C1648E22316ACb608f | Accumulates slippage usage across guarded transactions. |
| SlippageAccumulatorUser | contracts/utils/SlippageAccumulatorUser.sol | unknown | Registers authorised users for slippage accounting. |
| SonneFinanceComptrollerGuard | contracts/guards/contractGuards/sonne/SonneFinanceComptrollerGuard.sol | Optimism: 0xeb983280C9dEf6132d74b81DF32c17B10D981F6A | Controls pool transactions interacting with Sonne Finance Comptroller. |
| SonneFinanceCTokenGuard | contracts/guards/contractGuards/sonne/SonneFinanceCTokenGuard.sol | Optimism: 0xd05b087EF163F2d2625EB501f438b050f113160A | Controls pool transactions interacting with Sonne Finance CToken. |
| SonneFinancePriceAggregator | contracts/priceAggregators/SonneFinancePriceAggregator.sol | unknown | Provides Sonne Finance pricing for pool valuation. |
| StargateLPAssetGuard | contracts/guards/assetGuards/StargateLPAssetGuard.sol | Polygon: 0xE3a2625e5DED7a5c406a772a814c388381041486; Optimism: 0x18921F28c08DBf4f09a18191904fE4689A337463 | Validates pool exposure to Stargate LPAsset assets. |
| StargateLpStakingContractGuard | contracts/guards/contractGuards/StargateLpStakingContractGuard.sol | Polygon: 0x0bAa2c1943B9c8BE74792Af7387f024ed5C33265; Optimism: 0x6DE2a40897a0aE21AFf9b1D0d7688bA7D56785eE | Controls pool transactions interacting with Stargate Lp Staking. |
| StargateRouterContractGuard | contracts/guards/contractGuards/StargateRouterContractGuard.sol | Polygon: 0xe8d20D2105aC0d66C9A9a44266b93606EAf2a840; Optimism: 0x37776D08A5121a9CEC7C7E4c433Fe9344EB84C49 | Controls pool transactions interacting with Stargate Router. |
| SushiLPAssetGuard | contracts/guards/assetGuards/SushiLPAssetGuard.sol | Polygon: 0x2ada4bb6b2e06681e110be339affa1a1fcd9c9b9, 0x68c3fbAB170fF6D68B12A47c820a7155670195F2, 0x933016150e26179F9Fb49e416E7911c90d8890Da, 0xF291D94C6DE82D67655170dFE90D16204a4b4EBf, 0xf62a78b250025c6ed4C870eeE0C852cB61485a5b | Validates pool exposure to Sushi LPAsset assets. |
| SushiMiniChefV2Guard | contracts/guards/contractGuards/SushiMiniChefV2Guard.sol | Polygon: 0x47C444b9d91D1F8ceF52f3170218EF89819d6E1b, 0x624660220C13bC6C987A05fa4f46cde4Cbe0D8d3, 0xB80344Bc1EA92502dE950d88Bb1fc9A41b29BE77, 0xf66bd3E6AAd8f2Bb9d988d87Fcc38b2CfEf29B89 | Controls pool transactions interacting with Sushi Mini Chef V2. |
| SynthetixFuturesMarketAssetGuard | contracts/guards/assetGuards/SynthetixFuturesMarketAssetGuard.sol | Optimism: 0x11F8536f3a3c7bb16C3aC08FdEBf3A819ABE3105 | Validates pool exposure to Synthetix Futures Market assets. |
| SynthetixFuturesMarketContractGuard | contracts/guards/contractGuards/SynthetixFuturesMarketContractGuard.sol | Optimism: 0x2b1bE43b733D2C232276524830D4CCcAaC8CeAb3 | Controls pool transactions interacting with Synthetix Futures Market. |
| SynthetixGuard | contracts/guards/contractGuards/SynthetixGuard.sol | Optimism: 0xEFEFCa1f7C5ac491d6fE720E6D6725255290D621 | Controls pool transactions interacting with Synthetix. |
| SynthetixPerpsV2MarketAssetGuard | contracts/guards/assetGuards/SynthetixPerpsV2MarketAssetGuard.sol | Optimism: 0xC7B98aCa5879FC5DaB713F1642cc910097E88525 | Validates pool exposure to Synthetix Perps V2 Market assets. |
| SynthetixPerpsV2MarketContractGuard | contracts/guards/contractGuards/SynthetixPerpsV2MarketContractGuard.sol | Optimism: 0x7Be5a89b49B3dc17373838ca7432C1C4c23fa61C | Controls pool transactions interacting with Synthetix Perps V2 Market. |
| SynthetixV3AssetGuard | contracts/guards/assetGuards/synthetixV3/SynthetixV3AssetGuard.sol | Arbitrum: 0xF9FeEAD56eE6Cb4564CA8A57328Ff4Fda64DD4F2; Optimism: 0x1F13fF8F5DBc661374F57d766d5FEa20Eef27a8f; Base: 0xD35513A77A61B9479851f73387079569F365acd0 | Validates pool exposure to Synthetix V3 assets. |
| SynthetixV3ContractGuard | contracts/guards/contractGuards/synthetixV3/SynthetixV3ContractGuard.sol | Arbitrum: 0xb1aeaecc3b5a0a0034dd16172c821152af2bfa12; Optimism: 0x7210212b3f058D91F9d09da0bCbA508455ae220C; Base: 0xf04bFbaC6bD8799a091e65Cc9b6f95627cf22472 | Controls pool transactions interacting with Synthetix V3. |
| SynthetixV3PerpsAssetGuard | contracts/guards/assetGuards/synthetixV3/SynthetixV3PerpsAssetGuard.sol | Base: 0x8CF57e20E3CD422603C96E6ea98582Fa60C19C22 | Validates pool exposure to Synthetix V3 Perps assets. |
| SynthetixV3PerpsMarketContractGuard | contracts/guards/contractGuards/synthetixV3/SynthetixV3PerpsMarketContractGuard.sol | Base: 0x227B5A2aaE1403B2382E24c425e64726712B6293 | Controls pool transactions interacting with Synthetix V3 Perps Market. |
| SynthetixV3SpotMarketContractGuard | contracts/guards/contractGuards/synthetixV3/SynthetixV3SpotMarketContractGuard.sol | Arbitrum: 0x5b85b46d98cec87Cac9890FC755Bad065c4b717a; Base: 0x4FdF868B5372b3952b98aEda7478Da6f925d892F | Controls pool transactions interacting with Synthetix V3 Spot Market. |
| SynthPriceAggregator | contracts/priceAggregators/SynthPriceAggregator.sol | unknown | Provides Synth pricing for pool valuation. |
| SynthRedeemerContractGuard | contracts/guards/contractGuards/SynthRedeemerContractGuard.sol | Optimism: 0x770351F796a448F88fF94638A462ecD1599b3636 | Controls pool transactions interacting with Synth Redeemer. |
| TxDataUtils | contracts/utils/TxDataUtils.sol | unknown | Provides shared calldata decoding utilities for guards. |
| UniswapV2RouterGuard | contracts/guards/contractGuards/UniswapV2RouterGuard.sol | Polygon: 0x3047511a1b78f63E132E3884c987eA315dd46045, 0x4D703Dfc3a001C77c619Dba67aca1Ce7510F0d9D, 0x66C7f4822BCdC29290f0E44Df5F2F20dd5Ba2794, 0x8130906D038ac7161f07cF76FC119Cc72764b65f, 0xe599ED237195Bc9519de657Dcc3CA53A914e29f5 | Controls pool transactions interacting with Uniswap V2 Router. |
| UniswapV3AssetGuard | contracts/guards/assetGuards/UniswapV3AssetGuard.sol | Polygon: 0xEc127Cf6A71ec8C0A66f07DF104fF58B7A47FDd5; Arbitrum: 0xd735AfFe6BaccFa94461d97779d787EcD9f4120B; Optimism: 0xA0736773645C2AFcD844cF6807E0F0F2A80885E7 | Validates pool exposure to Uniswap V3 assets. |
| UniswapV3NonfungiblePositionGuard | contracts/guards/contractGuards/uniswapV3/UniswapV3NonfungiblePositionGuard.sol | Polygon: 0x6D736562dd51C71a69714FC0a9dE17A74E3917ca; Arbitrum: 0xFb47a975546E8704AD2588af907a973B3316e5A2; Optimism: 0x44aCc1a230535E365A79e69Bf1E2C66EF359371F | Controls pool transactions interacting with Uniswap V3 Nonfungible Position. |
| UniswapV3RouterGuard | contracts/guards/contractGuards/uniswapV3/UniswapV3RouterGuard.sol | Polygon: 0x2fAC14E4337969C39a2Eb17f8683E0CF702945c4; Arbitrum: 0x25EBFbcc8FDD120CADf97843a2157639AcA306bf; Optimism: 0x1BB21c7DFc81040E518FE5E75C1D2B27a3A3B186 | Controls pool transactions interacting with Uniswap V3 Router. |
| UniV2LPAggregator | contracts/priceAggregators/UniV2LPAggregator.sol | unknown | Provides Uni V2 LPAggregator pricing for pool valuation. |
| UniV3TWAPAggregator | contracts/priceAggregators/UniV3TWAPAggregator.sol | unknown | Provides Uni V3 TWAPAggregator pricing for pool valuation. |
| USDPriceAggregator | contracts/priceAggregators/USDPriceAggregator.sol | Mainnet: 0x4D4010338beD13483CC85de051d28d2B4f3b6484; Polygon: 0xE4831972d8E78A947051BCfe9658Cdf4BEFF9c51; Arbitrum: 0x16fE67E412AC7732F18Eeb318e24651C85AFcF76; Optimism: 0xE02cd1Eeb72388634Da7fdE8143367b7fA544BE7; Base: 0xe84e43dd22a608efbc7f453f16c2bf398876417a | Provides USDPrice pricing for pool valuation. |
| VaultProxyFactory | contracts/swappers/easySwapperV2/VaultProxyFactory.sol | unknown | Deploys vault proxies that custody EasySwapper V2 assets. |
| VelodromeCLAssetGuard | contracts/guards/assetGuards/velodrome/VelodromeCLAssetGuard.sol | Optimism: 0xBbe188a91Cae9FC2416573581C26bDB8Fd8e1b1d; Base: 0x2CDD076165C441B0696B94beBA300fD5759f9893 | Validates pool exposure to Velodrome CLAsset assets. |
| VelodromeCLGaugeContractGuard | contracts/guards/contractGuards/velodrome/VelodromeCLGaugeContractGuard.sol | Optimism: 0x6c117e181723EC2F9DFf4392F341b170c5d304e6; Base: 0x3527EFef441514119cF768C5FC03E13ACC40ff48 | Controls pool transactions interacting with Velodrome CLGauge. |
| VelodromeGaugeContractGuard | contracts/guards/contractGuards/velodrome/VelodromeGaugeContractGuard.sol | Optimism: 0xb87613327712BaaE4490876EFf657f310252105f | Controls pool transactions interacting with Velodrome Gauge. |
| VelodromeLPAssetGuard | contracts/guards/assetGuards/velodrome/VelodromeLPAssetGuard.sol | Optimism: 0x387cBE87EDD46FC5042042CE5c9683BF36EDa65e | Validates pool exposure to Velodrome LPAsset assets. |
| VelodromeNonfungiblePositionGuard | contracts/guards/contractGuards/velodrome/VelodromeNonfungiblePositionGuard.sol | Optimism: 0x6168BF09c55C18ABd6C795a6dA8aDf45C25B4CB2; Base: 0xe8707507586A59b68680c82014D5b6f7B78E250A | Controls pool transactions interacting with Velodrome Nonfungible Position. |
| VelodromeNonfungiblePositionGuardOld | contracts/guards/contractGuards/velodrome/VelodromeNonfungiblePositionGuardOld.sol | Optimism: 0x76faa59174640C2CcB04f22B4E13191da7949f8B | Controls pool transactions interacting with Velodrome Nonfungible Position Old. |
| VelodromePairContractGuard | contracts/guards/contractGuards/velodrome/VelodromePairContractGuard.sol | Optimism: 0xdF1Be9157baCe4CE3037241472e1fa4160eF7afB; Base: 0x81ff393b7096fe40173164163A93AFc145b85f59 | Controls pool transactions interacting with Velodrome Pair. |
| VelodromeRouterGuard | contracts/guards/contractGuards/velodrome/VelodromeRouterGuard.sol | Optimism: 0x992EF3C97E9F79e3894392408b0Bd4f91CaA9612 | Controls pool transactions interacting with Velodrome Router. |
| VelodromeStableLPAggregator | contracts/priceAggregators/VelodromeStableLPAggregator.sol | unknown | Provides Velodrome Stable LPAggregator pricing for pool valuation. |
| VelodromeTWAPAggregator | contracts/priceAggregators/VelodromeTWAPAggregator.sol | unknown | Provides Velodrome TWAPAggregator pricing for pool valuation. |
| VelodromeV2GaugeContractGuard | contracts/guards/contractGuards/velodrome/VelodromeV2GaugeContractGuard.sol | Optimism: 0x58873Da55E263D882Bd9F1d0c3A7D0861D7bDA78; Base: 0x35a075CDCc286bAa324d9c02fd0e954634C6C4DF | Controls pool transactions interacting with Velodrome V2 Gauge. |
| VelodromeV2LPAssetGuard | contracts/guards/assetGuards/velodrome/VelodromeV2LPAssetGuard.sol | Optimism: 0x9E2704694B96FC79D9D933eB68Fc20DD6446079A; Base: 0x5005E1F30bfCfe55BEda58106FDf22Db3DDAa7e6 | Validates pool exposure to Velodrome V2 LPAsset assets. |
| VelodromeV2RouterGuard | contracts/guards/contractGuards/velodrome/VelodromeV2RouterGuard.sol | Optimism: 0xF9b12e42964F3899ddD485c517dd90572b801163; Base: 0x92DEFBFfe1f17452155cA549cc404fB834b3f990 | Controls pool transactions interacting with Velodrome V2 Router. |
| VelodromeV2TWAPAggregator | contracts/priceAggregators/VelodromeV2TWAPAggregator.sol | unknown | Provides Velodrome V2 TWAPAggregator pricing for pool valuation. |
| VelodromeVariableLPAggregator | contracts/priceAggregators/VelodromeVariableLPAggregator.sol | unknown | Provides Velodrome Variable LPAggregator pricing for pool valuation. |
| WithdrawalVault | contracts/swappers/easySwapperV2/WithdrawalVault.sol | Mainnet: 0xd16a609611fcebd3cd5ca0b7111aaec4570cf543; Polygon: 0x6Ffb38C93f52Df32Db46629E4c8417658d9D2D53; Arbitrum: 0xC3F7f6dcB2d0f64d43Cc130984bE3B00AEBe3804; Optimism: 0xcca737ea9Dd753c47081E817B564e988A02620b2; Base: 0x0a74bB846922f1fa7217cD87A054A2B1941Ea565 | Temporarily holds assets awaiting EasySwapper V2 withdrawals. |
| ZeroExContractGuard | contracts/guards/contractGuards/ZeroExContractGuard.sol | Polygon: 0x1D7612FcEe43D4Ed25DDEe5b79d44414dAED6617; Arbitrum: 0xCEAB4dE8141CCA8c8eBEd72Ba46872f541c69064; Optimism: 0xc0F390Ff18A89D0787f0927306F594Ee264fCFB0; Base: 0x86837253574f52DF2C2338a9e9dD9478F9840B0F | Controls pool transactions interacting with Zero Ex. |

## Не включено

- `contracts/distribution/RewardsAPYCalculator.sol` — библиотека
- `contracts/guards/assetGuards/velodrome/VelodromeHelpers.sol` — библиотека
- `contracts/guards/contractGuards/flatMoney/shared/FlatMoneyV2OptionsConfig.sol` — библиотека
- `contracts/guards/contractGuards/flatMoney/shared/FlatMoneyV2PerpsConfig.sol` — библиотека
- `contracts/interfaces/IAggregatorV3Interface.sol` — только интерфейс
- `contracts/interfaces/IAggregatorV3InterfaceWithOwner.sol` — только интерфейс
- `contracts/interfaces/IAssetHandler.sol` — только интерфейс
- `contracts/interfaces/IERC20.sol` — только интерфейс
- `contracts/interfaces/IERC20Extended.sol` — только интерфейс
- `contracts/interfaces/IERC721Enumerable.sol` — только интерфейс
- `contracts/interfaces/IGovernance.sol` — только интерфейс
- `contracts/interfaces/IHasAssetInfo.sol` — только интерфейс
- `contracts/interfaces/IHasDaoInfo.sol` — только интерфейс
- `contracts/interfaces/IHasFeeInfo.sol` — только интерфейс
- `contracts/interfaces/IHasGuardInfo.sol` — только интерфейс
- `contracts/interfaces/IHasOwnable.sol` — только интерфейс
- `contracts/interfaces/IHasPausable.sol` — только интерфейс
- `contracts/interfaces/IHasSupportedAsset.sol` — только интерфейс
- `contracts/interfaces/IManaged.sol` — только интерфейс
- `contracts/interfaces/IPoolFactory.sol` — только интерфейс
- `contracts/interfaces/IPoolLogic.sol` — только интерфейс
- `contracts/interfaces/IPoolManagerLogic.sol` — только интерфейс
- `contracts/interfaces/ITransactionTypes.sol` — только интерфейс
- `contracts/interfaces/IWETH.sol` — только интерфейс
- `contracts/interfaces/aave/IAaveIncentivesControllerV3.sol` — только интерфейс
- `contracts/interfaces/aave/IAaveMigrationHelperGuard.sol` — только интерфейс
- `contracts/interfaces/aave/IAaveProtocolDataProvider.sol` — только интерфейс
- `contracts/interfaces/aave/ICreditDelegationToken.sol` — только интерфейс
- `contracts/interfaces/aave/IFlashLoanReceiver.sol` — только интерфейс
- `contracts/interfaces/aave/IMigrationHelper.sol` — только интерфейс
- `contracts/interfaces/aave/v2/ILendingPool.sol` — только интерфейс
- `contracts/interfaces/aave/v3/DataTypes.sol` — только интерфейс
- `contracts/interfaces/aave/v3/IAaveV3Pool.sol` — только интерфейс
- `contracts/interfaces/aave/v3/IL2Pool.sol` — только интерфейс
- `contracts/interfaces/across/V3SpokePoolInterface.sol` — только интерфейс
- `contracts/interfaces/angle/IDistributor.sol` — только интерфейс
- `contracts/interfaces/arrakis/IArrakisV1RouterStaking.sol` — только интерфейс
- `contracts/interfaces/arrakis/IArrakisVaultV1.sol` — только интерфейс
- `contracts/interfaces/arrakis/ILiquidityGaugeV4.sol` — только интерфейс
- `contracts/interfaces/balancer/IBalancerComposablePool.sol` — только интерфейс
- `contracts/interfaces/balancer/IBalancerMerkleOrchard.sol` — только интерфейс
- `contracts/interfaces/balancer/IBalancerPool.sol` — только интерфейс
- `contracts/interfaces/balancer/IBalancerV2Vault.sol` — только интерфейс
- `contracts/interfaces/balancer/IBalancerWeightedPool.sol` — только интерфейс
- `contracts/interfaces/balancer/IRateProvider.sol` — только интерфейс
- `contracts/interfaces/balancer/IRewardsContract.sol` — только интерфейс
- `contracts/interfaces/balancer/IRewardsOnlyGauge.sol` — только интерфейс
- `contracts/interfaces/compound/ICompoundV3Comet.sol` — только интерфейс
- `contracts/interfaces/compound/ICompoundV3CometRewards.sol` — только интерфейс
- `contracts/interfaces/curve/ICurveCryptoSwap.sol` — только интерфейс
- `contracts/interfaces/flatMoney/IDelayedOrder.sol` — только интерфейс
- `contracts/interfaces/flatMoney/IFlatcoinVault.sol` — только интерфейс
- `contracts/interfaces/flatMoney/ILeverageModule.sol` — только интерфейс
- `contracts/interfaces/flatMoney/IOracleModule.sol` — только интерфейс
- `contracts/interfaces/flatMoney/IPointsModule.sol` — только интерфейс
- `contracts/interfaces/flatMoney/IStableModule.sol` — только интерфейс
- `contracts/interfaces/flatMoney/IViewer.sol` — только интерфейс
- `contracts/interfaces/flatMoney/swapper/ISwapper.sol` — только интерфейс
- `contracts/interfaces/flatMoney/v2/IFlatcoinVaultV2.sol` — только интерфейс
- `contracts/interfaces/flatMoney/v2/ILeverageModuleV2.sol` — только интерфейс
- `contracts/interfaces/flatMoney/v2/IOracleModuleV2.sol` — только интерфейс
- `contracts/interfaces/flatMoney/v2/IOrderAnnouncementModule.sol` — только интерфейс
- `contracts/interfaces/fluid/IFToken.sol` — только интерфейс
- `contracts/interfaces/gmx/IGmxBaseOrderUtils.sol` — только интерфейс
- `contracts/interfaces/gmx/IGmxCallbackReceiver.sol` — только интерфейс
- `contracts/interfaces/gmx/IGmxCustomPriceFeedProvider.sol` — только интерфейс
- `contracts/interfaces/gmx/IGmxDataStore.sol` — только интерфейс
- `contracts/interfaces/gmx/IGmxDeposit.sol` — только интерфейс
- `contracts/interfaces/gmx/IGmxDepositHandler.sol` — только интерфейс
- `contracts/interfaces/gmx/IGmxDepositUtils.sol` — только интерфейс
- `contracts/interfaces/gmx/IGmxEvent.sol` — только интерфейс
- `contracts/interfaces/gmx/IGmxExchangeRouter.sol` — только интерфейс
- `contracts/interfaces/gmx/IGmxExchangeRouterContractGuard.sol` — только интерфейс
- `contracts/interfaces/gmx/IGmxMarket.sol` — только интерфейс
- `contracts/interfaces/gmx/IGmxMarketPoolValueInfo.sol` — только интерфейс
- `contracts/interfaces/gmx/IGmxOracleUtils.sol` — только интерфейс
- `contracts/interfaces/gmx/IGmxOrder.sol` — только интерфейс
- `contracts/interfaces/gmx/IGmxOrderHandler.sol` — только интерфейс
- `contracts/interfaces/gmx/IGmxPosition.sol` — только интерфейс
- `contracts/interfaces/gmx/IGmxPrice.sol` — только интерфейс
- `contracts/interfaces/gmx/IGmxReader.sol` — только интерфейс
- `contracts/interfaces/gmx/IGmxReferralStorage.sol` — только интерфейс
- `contracts/interfaces/gmx/IGmxRoleStore.sol` — только интерфейс
- `contracts/interfaces/gmx/IGmxSwapPricingUtils.sol` — только интерфейс
- `contracts/interfaces/gmx/IGmxVirtualTokenResolver.sol` — только интерфейс
- `contracts/interfaces/gmx/IGmxWithdrawal.sol` — только интерфейс
- `contracts/interfaces/gmx/IGmxWithdrawalHandler.sol` — только интерфейс
- `contracts/interfaces/gmx/IGmxWithdrawalUtils.sol` — только интерфейс
- `contracts/interfaces/guards/IAaveLendingPoolAssetGuard.sol` — только интерфейс
- `contracts/interfaces/guards/IAddAssetCheckGuard.sol` — только интерфейс
- `contracts/interfaces/guards/IAssetGuard.sol` — только интерфейс
- `contracts/interfaces/guards/IComplexAssetGuard.sol` — только интерфейс
- `contracts/interfaces/guards/IERC721VerifyingGuard.sol` — только интерфейс
- `contracts/interfaces/guards/IGuard.sol` — только интерфейс
- `contracts/interfaces/guards/IMutableBalanceAssetGuard.sol` — только интерфейс
- `contracts/interfaces/guards/ISwapDataConsumingGuard.sol` — только интерфейс
- `contracts/interfaces/guards/ITxTrackingGuard.sol` — только интерфейс
- `contracts/interfaces/lyra/IGWAVOracle.sol` — только интерфейс
- `contracts/interfaces/lyra/ILiquidityPool.sol` — только интерфейс
- `contracts/interfaces/lyra/ILyraQuoter.sol` — только интерфейс
- `contracts/interfaces/lyra/ILyraRegistry.sol` — только интерфейс
- `contracts/interfaces/lyra/IOptionGreekCache.sol` — только интерфейс
- `contracts/interfaces/lyra/IOptionMarket.sol` — только интерфейс
- `contracts/interfaces/lyra/IOptionMarketViewer.sol` — только интерфейс
- `contracts/interfaces/lyra/IOptionMarketWrapper.sol` — только интерфейс
- `contracts/interfaces/lyra/IOptionToken.sol` — только интерфейс
- `contracts/interfaces/lyra/IShortCollateral.sol` — только интерфейс
- `contracts/interfaces/lyra/ISynthetixAdapter.sol` — только интерфейс
- `contracts/interfaces/mai/IStableQiVault.sol` — только интерфейс
- `contracts/interfaces/maticx/IMaticXPool.sol` — только интерфейс
- `contracts/interfaces/odos/IOdosRouterV2.sol` — только интерфейс
- `contracts/interfaces/oneInch/IAggregationRouterV3.sol` — только интерфейс
- `contracts/interfaces/oneInch/IAggregationRouterV5.sol` — только интерфейс
- `contracts/interfaces/oneInch/IAggregationRouterV6.sol` — только интерфейс
- `contracts/interfaces/pancake/IPancakeCLPool.sol` — только интерфейс
- `contracts/interfaces/pancake/IPancakeMasterChefV3.sol` — только интерфейс
- `contracts/interfaces/pancake/IPancakeNonfungiblePositionManager.sol` — только интерфейс
- `contracts/interfaces/pendle/IPActionMarketCoreStatic.sol` — только интерфейс
- `contracts/interfaces/pendle/IPActionMintRedeemStatic.sol` — только интерфейс
- `contracts/interfaces/pendle/IPActionMiscV3.sol` — только интерфейс
- `contracts/interfaces/pendle/IPActionSwapPTV3.sol` — только интерфейс
- `contracts/interfaces/pendle/IPAllActionTypeV3.sol` — только интерфейс
- `contracts/interfaces/pendle/IPLimitRouter.sol` — только интерфейс
- `contracts/interfaces/pendle/IPMarket.sol` — только интерфейс
- `contracts/interfaces/pendle/IPMarketFactoryV3.sol` — только интерфейс
- `contracts/interfaces/pendle/IPPrincipalToken.sol` — только интерфейс
- `contracts/interfaces/pendle/IPSwapAggregator.sol` — только интерфейс
- `contracts/interfaces/pendle/IPYieldContractFactory.sol` — только интерфейс
- `contracts/interfaces/pendle/IPYieldToken.sol` — только интерфейс
- `contracts/interfaces/pendle/IStandardizedYield.sol` — только интерфейс
- `contracts/interfaces/pyth/IPyth.sol` — только интерфейс
- `contracts/interfaces/quick/IDragonLair.sol` — только интерфейс
- `contracts/interfaces/quick/IStakingRewards.sol` — только интерфейс
- `contracts/interfaces/quick/IStakingRewardsFactory.sol` — только интерфейс
- `contracts/interfaces/ramses/IRamsesGaugeV2.sol` — только интерфейс
- `contracts/interfaces/ramses/IRamsesNonfungiblePositionManager.sol` — только интерфейс
- `contracts/interfaces/ramses/IRamsesRouter.sol` — только интерфейс
- `contracts/interfaces/ramses/IRamsesV2Pool.sol` — только интерфейс
- `contracts/interfaces/ramses/IRamsesVoter.sol` — только интерфейс
- `contracts/interfaces/ramses/IXRam.sol` — только интерфейс
- `contracts/interfaces/sky/IPSM3.sol` — только интерфейс
- `contracts/interfaces/sonne/CTokenInterfaces.sol` — только интерфейс
- `contracts/interfaces/sonne/ComptrollerInterface.sol` — только интерфейс
- `contracts/interfaces/sonne/ComptrollerLensInterface.sol` — только интерфейс
- `contracts/interfaces/sonne/InterestRateModel.sol` — только интерфейс
- `contracts/interfaces/sonne/PriceOracle.sol` — только интерфейс
- `contracts/interfaces/stargate/IStargateFactory.sol` — только интерфейс
- `contracts/interfaces/stargate/IStargateLpStaking.sol` — только интерфейс
- `contracts/interfaces/stargate/IStargatePool.sol` — только интерфейс
- `contracts/interfaces/stargate/IStargateRouter.sol` — только интерфейс
- `contracts/interfaces/sushi/IMiniChefV2.sol` — только интерфейс
- `contracts/interfaces/synthetix/IAddressResolver.sol` — только интерфейс
- `contracts/interfaces/synthetix/IExchangeRates.sol` — только интерфейс
- `contracts/interfaces/synthetix/IExchanger.sol` — только интерфейс
- `contracts/interfaces/synthetix/IFuturesMarket.sol` — только интерфейс
- `contracts/interfaces/synthetix/IFuturesMarketSettings.sol` — только интерфейс
- `contracts/interfaces/synthetix/IPerpsV2Market.sol` — только интерфейс
- `contracts/interfaces/synthetix/IPerpsV2MarketSettings.sol` — только интерфейс
- `contracts/interfaces/synthetix/ISynth.sol` — только интерфейс
- `contracts/interfaces/synthetix/ISynthAddressProxy.sol` — только интерфейс
- `contracts/interfaces/synthetix/ISynthRedeemer.sol` — только интерфейс
- `contracts/interfaces/synthetix/ISynthetix.sol` — только интерфейс
- `contracts/interfaces/synthetix/ISystemStatus.sol` — только интерфейс
- `contracts/interfaces/synthetix/IVirtualSynth.sol` — только интерфейс
- `contracts/interfaces/synthetixV3/IAccountModule.sol` — только интерфейс
- `contracts/interfaces/synthetixV3/IAsyncOrderModule.sol` — только интерфейс
- `contracts/interfaces/synthetixV3/IAsyncOrderSettlementPythModule.sol` — только интерфейс
- `contracts/interfaces/synthetixV3/IAtomicOrderModule.sol` — только интерфейс
- `contracts/interfaces/synthetixV3/ICollateralConfigurationModule.sol` — только интерфейс
- `contracts/interfaces/synthetixV3/ICollateralModule.sol` — только интерфейс
- `contracts/interfaces/synthetixV3/IIssueUSDModule.sol` — только интерфейс
- `contracts/interfaces/synthetixV3/ILiquidationModule.sol` — только интерфейс
- `contracts/interfaces/synthetixV3/IPerpsAccountModule.sol` — только интерфейс
- `contracts/interfaces/synthetixV3/IPoolConfigurationModule.sol` — только интерфейс
- `contracts/interfaces/synthetixV3/IPoolModule.sol` — только интерфейс
- `contracts/interfaces/synthetixV3/IRewardDistributor.sol` — только интерфейс
- `contracts/interfaces/synthetixV3/IRewardsManagerModule.sol` — только интерфейс
- `contracts/interfaces/synthetixV3/ISpotMarketConfigurationModule.sol` — только интерфейс
- `contracts/interfaces/synthetixV3/ISpotMarketFactoryModule.sol` — только интерфейс
- `contracts/interfaces/synthetixV3/ISynthetixV3ContractGuard.sol` — только интерфейс
- `contracts/interfaces/synthetixV3/ISynthetixV3PerpsMarketContractGuard.sol` — только интерфейс
- `contracts/interfaces/synthetixV3/ISynthetixV3SpotMarketContractGuard.sol` — только интерфейс
- `contracts/interfaces/synthetixV3/IVaultModule.sol` — только интерфейс
- `contracts/interfaces/synthetixV3/IWrapperModule.sol` — только интерфейс
- `contracts/interfaces/uniswapV2/IUniswapV2Factory.sol` — только интерфейс
- `contracts/interfaces/uniswapV2/IUniswapV2Pair.sol` — только интерфейс
- `contracts/interfaces/uniswapV2/IUniswapV2Router.sol` — только интерфейс
- `contracts/interfaces/uniswapV2/IUniswapV2RouterSwapOnly.sol` — только интерфейс
- `contracts/interfaces/uniswapV3/IMulticallExtended.sol` — только интерфейс
- `contracts/interfaces/uniswapV3/IUniswapV3Pool.sol` — только интерфейс
- `contracts/interfaces/uniswapV3/IV3SwapRouter.sol` — только интерфейс
- `contracts/interfaces/velodrome/IVelodromeCLFactory.sol` — только интерфейс
- `contracts/interfaces/velodrome/IVelodromeCLGauge.sol` — только интерфейс
- `contracts/interfaces/velodrome/IVelodromeCLPool.sol` — только интерфейс
- `contracts/interfaces/velodrome/IVelodromeFactory.sol` — только интерфейс
- `contracts/interfaces/velodrome/IVelodromeGauge.sol` — только интерфейс
- `contracts/interfaces/velodrome/IVelodromeNonfungiblePositionManager.sol` — только интерфейс
- `contracts/interfaces/velodrome/IVelodromePair.sol` — только интерфейс
- `contracts/interfaces/velodrome/IVelodromeRouter.sol` — только интерфейс
- `contracts/interfaces/velodrome/IVelodromeV2Factory.sol` — только интерфейс
- `contracts/interfaces/velodrome/IVelodromeV2Gauge.sol` — только интерфейс
- `contracts/interfaces/velodrome/IVelodromeV2Pair.sol` — только интерфейс
- `contracts/interfaces/velodrome/IVelodromeV2Router.sol` — только интерфейс
- `contracts/interfaces/velodrome/IVelodromeV2Voter.sol` — только интерфейс
- `contracts/interfaces/velodrome/IVelodromeVoter.sol` — только интерфейс
- `contracts/interfaces/zeroEx/ITransformERC20Feature.sol` — только интерфейс
- `contracts/stakingv2/Base64.sol` — библиотека
- `contracts/stakingv2/interfaces/IDhedgeStakingV2.sol` — только интерфейс
- `contracts/stakingv2/interfaces/IDhedgeStakingV2NFTJson.sol` — только интерфейс
- `contracts/stakingv2/interfaces/IDhedgeStakingV2Storage.sol` — только интерфейс
- `contracts/swappers/easySwapper/EasySwapperArrakisHelpers.sol` — библиотека
- `contracts/swappers/easySwapper/EasySwapperBalancerV2Helpers.sol` — библиотека
- `contracts/swappers/easySwapper/EasySwapperStructs.sol` — библиотека
- `contracts/swappers/easySwapper/EasySwapperSwap.sol` — библиотека
- `contracts/swappers/easySwapper/EasySwapperSynthetixHelpers.sol` — библиотека
- `contracts/swappers/easySwapper/EasySwapperV2LpHelpers.sol` — библиотека
- `contracts/swappers/easySwapper/EasySwapperV3Helpers.sol` — библиотека
- `contracts/swappers/easySwapper/EasySwapperVelodromeCLHelpers.sol` — библиотека
- `contracts/swappers/easySwapper/EasySwapperVelodromeLPHelpers.sol` — библиотека
- `contracts/swappers/easySwapper/EasySwapperWithdrawer.sol` — библиотека
- `contracts/swappers/easySwapperV2/interfaces/IEasySwapperV2.sol` — только интерфейс
- `contracts/swappers/easySwapperV2/interfaces/IWithdrawalVault.sol` — только интерфейс
- `contracts/swappers/easySwapperV2/libraries/SwapperV2Helpers.sol` — библиотека
- `contracts/swappers/poolTokenSwapper/IFactory.sol` — вспомогательный файл
- `contracts/test/AaveFlashloanMock.sol` — тестовый мок
- `contracts/test/AaveWithdrawTrickContract.sol` — тестовый мок
- `contracts/test/DhedgeSwapTest.sol` — тестовый мок
- `contracts/test/FlashSwapperTest.sol` — тестовый мок
- `contracts/test/FlatMoneyUNITPriceAggregatorTest.sol` — тестовый мок
- `contracts/test/GmxTimeKeyViewer.sol` — тестовый мок
- `contracts/test/Imports.sol` — тестовый мок
- `contracts/test/MockContract.sol` — тестовый мок
- `contracts/test/PoolLogicExposed.sol` — тестовый мок
- `contracts/test/RewardsAPYCalculatorTest.sol` — тестовый мок
- `contracts/test/SwapRouterMock.sol` — тестовый мок
- `contracts/test/TestAssets.sol` — тестовый мок
- `contracts/test/UniswapV3PriceLibraryTest.sol` — тестовый мок
- `contracts/test/WETH9.sol` — тестовый мок
- `contracts/test/WeeklyWindowsHelperTest.sol` — тестовый мок
- `contracts/upgradability/Address.sol` — библиотека
- `contracts/upgradability/HasLogic.sol` — вспомогательный файл
- `contracts/utils/AddressHelper.sol` — библиотека
- `contracts/utils/BalancerLib.sol` — библиотека
- `contracts/utils/DateTime.sol` — библиотека
- `contracts/utils/DhedgeMath.sol` — библиотека
- `contracts/utils/DhedgeSwap.sol` — библиотека
- `contracts/utils/PrecisionHelper.sol` — библиотека
- `contracts/utils/SafeERC20.sol` — библиотека
- `contracts/utils/chainlinkPyth/ChainlinkPythPriceLib.sol` — библиотека
- `contracts/utils/commonCL/CLPriceLibrary.sol` — библиотека
- `contracts/utils/flatMoney/libraries/FlatcoinModuleKeys.sol` — библиотека
- `contracts/utils/gmx/GmxAfterExcutionLib.sol` — библиотека
- `contracts/utils/gmx/GmxAfterTxValidatorLib.sol` — библиотека
- `contracts/utils/gmx/GmxClaimableCollateralTrackerLib.sol` — библиотека
- `contracts/utils/gmx/GmxDataStoreLib.sol` — библиотека
- `contracts/utils/gmx/GmxHelperLib.sol` — библиотека
- `contracts/utils/gmx/GmxMarketUtils.sol` — библиотека
- `contracts/utils/gmx/GmxPosition.sol` — библиотека
- `contracts/utils/gmx/GmxPositionCollateralAmountLib.sol` — библиотека
- `contracts/utils/gmx/GmxPriceLib.sol` — библиотека
- `contracts/utils/gmx/GmxStructs.sol` — библиотека
- `contracts/utils/oneInch/libraries/AddressLib.sol` — библиотека
- `contracts/utils/oneInch/libraries/ProtocolLib.sol` — библиотека
- `contracts/utils/pancake/PancakeCLPositionValue.sol` — библиотека
- `contracts/utils/pancake/PoolAddress.sol` — библиотека
- `contracts/utils/pendle/PendlePTHandlerLib.sol` — библиотека
- `contracts/utils/pyth/PythPriceLib.sol` — библиотека
- `contracts/utils/ramses/AddressArrayLib.sol` — библиотека
- `contracts/utils/ramses/PoolAddress.sol` — библиотека
- `contracts/utils/ramses/RamsesCLPositionValue.sol` — библиотека
- `contracts/utils/synthetixV3/libraries/SynthetixV3Structs.sol` — библиотека
- `contracts/utils/synthetixV3/libraries/WeeklyWindowsHelper.sol` — библиотека
- `contracts/utils/uniswap/UniswapV2OracleLibrary.sol` — библиотека
- `contracts/utils/uniswap/UniswapV3PriceLibrary.sol` — библиотека
- `contracts/utils/uniswap/UniswapV3QuoterLibrary.sol` — библиотека
- `contracts/utils/uniswap/libraries/BitMath.sol` — библиотека
- `contracts/utils/uniswap/libraries/FixedPoint96.sol` — библиотека
- `contracts/utils/uniswap/libraries/FullMath.sol` — библиотека
- `contracts/utils/uniswap/libraries/LiquidityMath.sol` — библиотека
- `contracts/utils/uniswap/libraries/LowGasSafeMath.sol` — библиотека
- `contracts/utils/uniswap/libraries/SafeCast.sol` — библиотека
- `contracts/utils/uniswap/libraries/SqrtPriceMath.sol` — библиотека
- `contracts/utils/uniswap/libraries/SwapMath.sol` — библиотека
- `contracts/utils/uniswap/libraries/Tick.sol` — библиотека
- `contracts/utils/uniswap/libraries/TickBitmap.sol` — библиотека
- `contracts/utils/uniswap/libraries/TickMath.sol` — библиотека
- `contracts/utils/uniswap/libraries/UnsafeMath.sol` — библиотека
- `contracts/utils/uniswap/libraries/legacy/FixedPoint.sol` — библиотека
- `contracts/utils/uniswap/libraries/legacy/FullMath.sol` — библиотека
- `contracts/utils/velodrome/PoolAddress.sol` — библиотека
- `contracts/utils/velodrome/VelodromeCLPositionValue.sol` — библиотека
- `contracts/utils/velodrome/VelodromeCLPriceLibrary.sol` — библиотека
- `contracts/v2.4.1/GovernanceV24.sol` — историческая версия v2.4.1
- `contracts/v2.4.1/ManagedV24.sol` — историческая версия v2.4.1
- `contracts/v2.4.1/PoolFactoryV24.sol` — историческая версия v2.4.1
- `contracts/v2.4.1/PoolLogicV24.sol` — историческая версия v2.4.1
- `contracts/v2.4.1/PoolManagerLogicV24.sol` — историческая версия v2.4.1
- `contracts/v2.4.1/guards/IAaveLendingPoolAssetGuard.sol` — историческая версия v2.4.1
- `contracts/v2.4.1/guards/IAssetGuard.sol` — историческая версия v2.4.1
- `contracts/v2.4.1/guards/IGuard.sol` — историческая версия v2.4.1
- `contracts/v2.4.1/interfaces/IGovernance.sol` — только интерфейс
- `contracts/v2.4.1/interfaces/IHasAssetInfo.sol` — только интерфейс
- `contracts/v2.4.1/interfaces/IHasDaoInfo.sol` — только интерфейс
- `contracts/v2.4.1/interfaces/IHasFeeInfo.sol` — только интерфейс
- `contracts/v2.4.1/interfaces/IHasGuardInfo.sol` — только интерфейс
- `contracts/v2.4.1/interfaces/IHasOwnable.sol` — только интерфейс
- `contracts/v2.4.1/interfaces/IHasPausable.sol` — только интерфейс
- `contracts/v2.4.1/interfaces/IHasSupportedAsset.sol` — только интерфейс
- `contracts/v2.4.1/interfaces/IManaged.sol` — только интерфейс
- `contracts/v2.4.1/interfaces/IPoolLogic.sol` — только интерфейс
- `contracts/v2.4.1/interfaces/IPoolManagerLogic.sol` — только интерфейс
