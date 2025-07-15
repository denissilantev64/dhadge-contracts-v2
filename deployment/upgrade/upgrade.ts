import fs from "fs";
import { task, types } from "hardhat/config";
import { executeInSeries, getTag, nonceLog, tryVerify } from "../deploymentHelpers";
import { IJob, IVersions } from "../types";
import { getDeploymentData } from "./getDeploymentData";
import { aaveV2LendingPoolAssetGuardJob } from "./jobs/assetGuards/aaveV2LendingPoolAssetGuardJob";
import { aaveV3LendingPoolAssetGuardJob } from "./jobs/assetGuards/aaveV3LendingPoolAssetGuardJob";
import { arrakisLiquidityGaugeV4AssetGuardJob } from "./jobs/assetGuards/arrakisLiquidityGaugeV4AssetGuardJob";
import { balancerV2GaugeAssetGuardJob } from "./jobs/assetGuards/balancerV2GaugeAssetGuardJob";
import { dhedgeOptionMarketWrapperForLyraJob } from "./jobs/assetGuards/dhedgeOptionMarketWrapperForLyraJob";
import { erc20GuardJob } from "./jobs/assetGuards/erc20AssetGuardJob";
import { synthetixFuturesMarketAssetGuardJob } from "./jobs/assetGuards/synthetixFuturesMarketAssetGuardJob";
import { lendingEnabledAssetGuardJob } from "./jobs/assetGuards/lendingEnabledAssetGuardJob";
import { lyraOptionMarketWrapperAssetGuardJob } from "./jobs/assetGuards/lyraOptionMarketWrapperAssetGuardJob";
import { maiVaultAssetGuardJob } from "./jobs/assetGuards/maiVaultAssetGuardJob";
import { quickLpAssetGuardJob } from "./jobs/assetGuards/quickLpAssetGuardJob";
import { stargateLPAssetGuardJob } from "./jobs/assetGuards/stargateLPAssetGuardJob";
import { sushiLpAssetGuardJob } from "./jobs/assetGuards/sushiLpAssetGuardJob";
import { uniV3AssetGuardJob } from "./jobs/assetGuards/uniV3AssetGuardJob";
import { velodromeLPAssetGuardJob } from "./jobs/assetGuards/velodromeLPAssetGuardJob";
import { assetHandlerJob } from "./jobs/assetHandlerJob";
import { assetsJob } from "./jobs/assetsJob";
import { aaveIncentivesControllerContractGuardJob } from "./jobs/contractGuards/aaveIncentivesControllerContractGuardJob";
import { aaveIncentivesControllerV3ContractGuardJob } from "./jobs/contractGuards/aaveIncentivesControllerV3ContractGuardJob";
import { aaveV2LendingPoolContractGuardJob } from "./jobs/contractGuards/aaveV2LendingPoolContractGuardJob";
import { aaveV3LendingPoolContractGuardJob } from "./jobs/contractGuards/aaveV3LendingPoolContractGuardJob";
import { arrakisLiquidityGaugeV4ContractGuardJob } from "./jobs/contractGuards/arrakisLiquidityGaugeV4ContractGuardJob";
import { arrakisV1RouterStakingContractGuardJob } from "./jobs/contractGuards/arrakisV1RouterStakingContractGuardJob";
import { balancerMerkleOrchardContractGuardJob } from "./jobs/contractGuards/balancerMerkleOrchardContractGuardJob";
import { balancerv2ContractGuardJob } from "./jobs/contractGuards/balancerv2ContractGuardJob";
import { balancerV2GaugeContractGuardJob } from "./jobs/contractGuards/balancerV2GaugeContractGuardJob";
import { easySwapperContractGuardJob } from "./jobs/contractGuards/easySwapperContractGuardJob";
import { erc721ContractGuardJob } from "./jobs/contractGuards/erc721ContractGuardJob";
import { synthetixFuturesMarketContractGuardJob } from "./jobs/contractGuards/synthetixFuturesMarketContractGuardJob";
import { lyraMarketsContractGuardJob } from "./jobs/contractGuards/lyraMarketsContractGuardJob";
import { lyraOptionMarketWrapperContractGuardJob } from "./jobs/contractGuards/lyraOptionMarketWrapperContractGuardJob";
import { quickStakingRewardsContractGuardJob } from "./jobs/contractGuards/quickStakingRewardsContractGuardJob";
import { stargateLpStakingContractGuardJob } from "./jobs/contractGuards/stargateLpStakingContractGuardJob";
import { stargateRouterContractGuardJob } from "./jobs/contractGuards/stargateRouterContractGuardJob";
import { sushiMiniChefV2ContractGuardJob } from "./jobs/contractGuards/sushiMiniChefV2ContractGuardJob";
import { uniswapV3NonFungiblePositionGuardJob } from "./jobs/contractGuards/uniswapV3NonFungiblePositionContractGuardJob";
import { uniswapV3RouterContractGuardJob } from "./jobs/contractGuards/uniswapV3RouterContractGuardJob";
import { velodromeGaugeContractGuardJob } from "./jobs/contractGuards/velodromeGaugeContractGuardJob";
import { velodromeRouterGuardJob } from "./jobs/contractGuards/velodromeRouterGuardJob";
import { nftTrackerJob } from "./jobs/nftTrackerJob";
import { pauseJob } from "./jobs/pauseJob";
import { poolFactoryJob } from "./jobs/poolFactoryJob";
import { poolLogicJob } from "./jobs/poolLogicJob";
import { poolManagerLogicJob } from "./jobs/poolManagerLogicJob";
import { removeAssetsJob } from "./jobs/removeAssetsJob";
import { rewardDistributionJob } from "./jobs/rewardDistributionJob";
import { dhedgeStakingV2NFTJSONJob } from "./jobs/stakingV2/dhedgeStakingNFTJsonJob";
import { dhedgeStakingV2Job } from "./jobs/stakingV2/dhedgeStakingV2Job";
import { easySwapperJob } from "./jobs/swapper/easySwapperJob";
import { easySwapperConfigurationJob } from "./jobs/swapper/easySwapperConfigurationJob";
import { superSwapperJob } from "./jobs/swapper/superSwapperJob";
import { uniV3V2RouterJob } from "./jobs/swapper/uniV3V2RouterJob";
import { veloUniV2RouterJob } from "./jobs/swapper/veloUniV2RouterJob";
import { unpauseJob } from "./jobs/unpauseJob";
import { lyraOptionMarketContractGuardJob } from "./jobs/contractGuards/lyraOptionMarketContractGuardJob";
import { synthetixPerpsV2MarketContractGuardJob } from "./jobs/contractGuards/synthetixPerpsV2MarketContractGuardJob";
import { synthetixPerpsV2MarketAssetGuardJob } from "./jobs/assetGuards/synthetixPerpsV2MarketAssetGuardJob";
import { dhedgeStakingV2ConfigurationJob } from "./jobs/stakingV2/dhedgeStakingV2ConfigurationJob";
import { synthRedeemerContractGuardJob } from "./jobs/contractGuards/synthRedeemerContractGuardJob";
import { slippageAccumulatorJob } from "./jobs/slippageAccumulatorJob";
import { zeroExContractGuardJob } from "./jobs/contractGuards/zeroExContractGuardJob";
import { velodromeV2GaugeContractGuardJob } from "./jobs/contractGuards/velodromeV2GaugeContractGuardJob";
import { velodromeV2RouterGuardJob } from "./jobs/contractGuards/velodromeV2RouterGuardJob";
import { velodromeV2LPAssetGuardJob } from "./jobs/assetGuards/velodromeV2LPAssetGuardJob";
import { veloV2UniV2RouterJob } from "./jobs/swapper/veloV2UniV2RouterJob";
import { deprecateContractGuardsJob } from "./jobs/deprecateContractGuardsJob";
import { closedContractGuardJob } from "./jobs/contractGuards/closedContractGuardJob";
import { synthetixV3ContractGuardJob } from "./jobs/contractGuards/synthetixV3ContractGuardJob";
import { synthetixV3AssetGuardJob } from "./jobs/assetGuards/synthetixV3AssetGuardJob";
import { synthetixV3PerpsAssetGuardJob } from "./jobs/assetGuards/synthetixV3PerpsAssetGuardJob";
import { poolTokenSwapperJob } from "./jobs/poolTokenSwapperJob";
import { poolTokenSwapperGuardJob } from "./jobs/contractGuards/poolTokenSwapperGuardJob";
import { ramsesLPAssetGuardJob } from "./jobs/assetGuards/ramsesLPAssetGuardJob";
import { ramsesRouterGuardJob } from "./jobs/contractGuards/ramsesRouterGuardJob";
import { ramsesXRamGuardJob } from "./jobs/contractGuards/ramsesXRamGuardJob";
import { ramsesUniV2RouterJob } from "./jobs/swapper/ramsesUniV2RouterJob";
import { synthetixV3SpotMarketContractGuardJob } from "./jobs/contractGuards/synthetixV3SpotMarketContractGuardJob";
import { synthetixV3PerpsMarketContractGuardJob } from "./jobs/contractGuards/synthetixV3PerpsMarketContractGuardJob";
import { sonneFinanceComptrollerContractGuardJob } from "./jobs/contractGuards/sonneFinanceComptrollerContractGuardJob";
import { aaveDebtTokenContractGuardJob } from "./jobs/contractGuards/aaveDebtTokenContractGuardJob";
import { aaveMigrationHelperGuardJob } from "./jobs/contractGuards/aaveMigrationHelperGuardJob";
import { flatMoneyDelayedOrderGuardJob } from "./jobs/contractGuards/flatMoneyDelayedOrderGuardJob";
import { flatMoneyCollateralAssetGuardJob } from "./jobs/assetGuards/flatMoneyCollateralAssetGuardJob";
import { flatMoneyUNITAssetGuardJob } from "./jobs/assetGuards/flatMoneyUNITAssetGuardJob";
import { v1SynthRedeemJob } from "./jobs/v1SynthRedeem/v1SynthRedeemJob";
import { oneInchV6ContractGuardJob } from "./jobs/contractGuards/oneInchV6ContractGuardJob";
import { velodromeCLAssetGuardJob } from "./jobs/assetGuards/velodromeCLAssetGuardJob";
import { velodromeNonfungiblePositionGuardJob } from "./jobs/contractGuards/velodromeNonfungiblePositionGuardJob";
import { enableVelodromeCLGaugeContractGuardJob } from "./jobs/velodromeCL/enableVelodromeCLGaugeContractGuardJob";
import { byPassAssetGuardJob } from "./jobs/assetGuards/byPassAssetGuardJob";
import { flatMoneyPerpMarketAssetGuardJob } from "./jobs/assetGuards/flatMoneyPerpMarketAssetGuardJob";
import { velodromeNonfungiblePositionGuardOldJob } from "./jobs/contractGuards/velodromeNonfungiblePositionGuardOldJob";
import { rewardAssetGuardJob } from "./jobs/assetGuards/rewardAssetGuardJob";
import { compoundV3CometRewardsContractGuardJob } from "./jobs/contractGuards/compoundV3CometRewardsContractGuardJob";
import { compoundV3CometAssetGuardJob } from "./jobs/assetGuards/compoundV3CometAssetGuardJob";
import { easySwapperV2Job } from "./jobs/easySwapperV2/easySwapperV2Job";
import { withdrawalVaultJob } from "./jobs/easySwapperV2/withdrawalVaultJob";
import { easySwapperV2ConfigurationJob } from "./jobs/easySwapperV2/easySwapperV2ConfigurationJob";
import { easySwapperV2ContractGuardJob } from "./jobs/contractGuards/easySwapperV2ContractGuardJob";
import { ramsesNonfungiblePositionGuardJob } from "./jobs/contractGuards/ramsesNonfungiblePositionGuardJob";
import { ramsesCLAssetGuardJob } from "./jobs/assetGuards/ramsesCLAssetGuardJob";
import { easySwapperV2UnrolledAssetsGuardJob } from "./jobs/assetGuards/easySwapperV2UnrolledAssetsGuardJob";
import { gmxExchangeRouterContractGuardJob } from "./jobs/contractGuards/gmxExchangeRouterContractGuardJob";
import { gmxPerpMarketAssetGuardJob } from "./jobs/assetGuards/gmxPerpMarketAssetGuardJob";
import { changeAssetsJob } from "./jobs/changeAssetsJob";
import { pseudoPurgeJob } from "./jobs/pseudoPurge/pseudoPurgeJob";
import { angleDistributorContractGuardJob } from "./jobs/contractGuards/angleDistributorContractGuardJob";
import { poolLimitOrderManagerJob } from "./jobs/poolLimitOrderManager/poolLimitOrderManagerJob";
import { poolLimitOrderManagerConfigurationJob } from "./jobs/poolLimitOrderManager/poolLimitOrderManagerConfigurationJob";
import { pancakeNonfungiblePositionGuardJob } from "./jobs/contractGuards/pancakeNonfungiblePositionGuardJob";
import { pancakeMasterChefV3GuardJob } from "./jobs/contractGuards/pancakeMasterChefV3GuardJob";
import { pancakeCLAssetGuardJob } from "./jobs/assetGuards/pancakeCLAssetGuardJob";
import { acrossContractGuardJob } from "./jobs/contractGuards/acrossContractGuardJob";
import { skyPSM3ContractGuardJob } from "./jobs/contractGuards/skyPSM3ContractGuardJob";
import { flatMoneyOptionsOrderAnnouncementGuardJob } from "./jobs/contractGuards/flatMoneyOptionsOrderAnnouncementGuardJob";
import { flatMoneyOptionsOrderExecutionGuardJob } from "./jobs/contractGuards/flatMoneyOptionsOrderExecutionGuardJob";
import { flatMoneyOptionsMarketAssetGuardJob } from "./jobs/assetGuards/flatMoneyOptionsMarketAssetGuardJob";
import { fluidTokenAssetGuardJob } from "./jobs/assetGuards/fluidTokenAssetGuardJob";
import { odosV2ContractGuardJob } from "./jobs/contractGuards/odosV2ContractGuardJob";
import { flatMoneyV2PerpMarketAssetGuardJob } from "./jobs/assetGuards/flatMoneyV2PerpMarketAssetGuardJob";
import { flatMoneyV2UNITAssetGuardJob } from "./jobs/assetGuards/flatMoneyV2UNITAssetGuardJob";
import { flatMoneyV2OrderAnnouncementGuardJob } from "./jobs/contractGuards/flatMoneyV2OrderAnnouncementGuardJob";
import { flatMoneyV2OrderExecutionGuardJob } from "./jobs/contractGuards/flatMoneyV2OrderExecutionGuardJob";
import { pendleRouterV4ContractGuardJob } from "./jobs/contractGuards/pendleRouterV4ContractGuardJob";
import { pendlePTAssetGuardJob } from "./jobs/assetGuards/pendlePTAssetGuardJob";
import { allowApproveContractGuardJob } from "./jobs/contractGuards/allowApproveContractGuardJob";

const jobs: { [key: string]: IJob<void> } = {
  // Swappers related
  velouniv2router: veloUniV2RouterJob,
  velov2univ2router: veloV2UniV2RouterJob,
  univ3v2router: uniV3V2RouterJob,
  ramsesuniv2router: ramsesUniV2RouterJob,
  superswapper: superSwapperJob,
  easyswapper: easySwapperJob,
  easyswapperconfiguration: easySwapperConfigurationJob,

  // External
  rewarddistribution: rewardDistributionJob,
  slippageaccumulator: slippageAccumulatorJob,
  v1synthredeem: v1SynthRedeemJob,

  pause: pauseJob,

  // Upgradable
  assethandler: assetHandlerJob,
  poolfactory: poolFactoryJob,
  poollogic: poolLogicJob,
  poolmanagerlogic: poolManagerLogicJob,
  nfttracker: nftTrackerJob,
  pooltokenswapper: poolTokenSwapperJob,
  poollimitordermanager: poolLimitOrderManagerJob,
  limitorderconfig: poolLimitOrderManagerConfigurationJob,

  // Dhedge Staking V2
  dhedgestakingv2nftjson: dhedgeStakingV2NFTJSONJob,
  dhedgestakingv2: dhedgeStakingV2Job,
  dhedgestakingv2configuration: dhedgeStakingV2ConfigurationJob,

  // Asset Guards
  aavev2lendingpoolassetguard: aaveV2LendingPoolAssetGuardJob,
  aavev3lendingpoolassetguard: aaveV3LendingPoolAssetGuardJob,
  sushilpassetguard: sushiLpAssetGuardJob,
  erc20guard: erc20GuardJob,
  erc721guard: erc721ContractGuardJob,
  lendingenabledassetguard: lendingEnabledAssetGuardJob,
  quicklpassetguard: quickLpAssetGuardJob,
  univ3assetguard: uniV3AssetGuardJob,
  arrakisliquiditygaugev4assetguard: arrakisLiquidityGaugeV4AssetGuardJob,
  dhedgeoptionmarketwrapperforlyra: dhedgeOptionMarketWrapperForLyraJob,
  lyraoptionmarketwrapperassetguard: lyraOptionMarketWrapperAssetGuardJob,
  balancerv2gaugeassetguard: balancerV2GaugeAssetGuardJob,
  velodromelpassetguard: velodromeLPAssetGuardJob,
  synthetixfuturesmarketassetguard: synthetixFuturesMarketAssetGuardJob,
  maivaultassetguard: maiVaultAssetGuardJob,
  stargatelpassetguard: stargateLPAssetGuardJob,
  synthetixperpsv2marketassetguard: synthetixPerpsV2MarketAssetGuardJob,
  velodromev2lpassetguard: velodromeV2LPAssetGuardJob,
  synthetixv3assetguard: synthetixV3AssetGuardJob,
  synthetixv3perpsassetguard: synthetixV3PerpsAssetGuardJob,
  ramseslpassetguard: ramsesLPAssetGuardJob,
  flatmoneycollateralassetguard: flatMoneyCollateralAssetGuardJob,
  flatmoneyunitassetguard: flatMoneyUNITAssetGuardJob,
  velodromeclassetguard: velodromeCLAssetGuardJob,
  bypassassetguard: byPassAssetGuardJob,
  flatmoneyperpmarketassetguard: flatMoneyPerpMarketAssetGuardJob,
  rewardassetguard: rewardAssetGuardJob,
  compoundv3cometassetguard: compoundV3CometAssetGuardJob,
  ramsesclassetguard: ramsesCLAssetGuardJob,
  easyswapperv2unrolledassetsguard: easySwapperV2UnrolledAssetsGuardJob,
  gmxperpmarketassetguard: gmxPerpMarketAssetGuardJob,
  pancakeclassetguard: pancakeCLAssetGuardJob,
  flatmoneyoptionsmarketassetguard: flatMoneyOptionsMarketAssetGuardJob,
  fluidtokenassetguard: fluidTokenAssetGuardJob,
  flatmoneyv2perpmarketassetguard: flatMoneyV2PerpMarketAssetGuardJob,
  flatmoneyv2unitassetguard: flatMoneyV2UNITAssetGuardJob,
  pendleptassetguard: pendlePTAssetGuardJob,

  // Contract Guards
  closedcontractguard: closedContractGuardJob,
  aavev2lendingpoolguard: aaveV2LendingPoolContractGuardJob,
  aavev3lendingpoolguard: aaveV3LendingPoolContractGuardJob,
  uniswapv3routerguard: uniswapV3RouterContractGuardJob,
  velodromerouterguard: velodromeRouterGuardJob,
  balancerv2guard: balancerv2ContractGuardJob,
  balancerv2gaugecontractguard: balancerV2GaugeContractGuardJob,
  balancermerkleorchardguard: balancerMerkleOrchardContractGuardJob,
  quickstakingrewardsguard: quickStakingRewardsContractGuardJob,
  sushiminichefv2guard: sushiMiniChefV2ContractGuardJob,
  easyswapperguard: easySwapperContractGuardJob,
  aaveincentivescontrollerguard: aaveIncentivesControllerContractGuardJob,
  aaveincentivescontrollerv3guard: aaveIncentivesControllerV3ContractGuardJob,
  uniswapv3nonfungiblepositionguard: uniswapV3NonFungiblePositionGuardJob,
  arrakisliquiditygaugev4guard: arrakisLiquidityGaugeV4ContractGuardJob,
  arrakisv1routerstakingguard: arrakisV1RouterStakingContractGuardJob,
  velodromegaugecontractguard: velodromeGaugeContractGuardJob,
  synthetixfuturesmarketcontractguard: synthetixFuturesMarketContractGuardJob,
  lyraoptionmarketwrappercontractguard: lyraOptionMarketWrapperContractGuardJob,
  lyraoptionmarketcontractguard: lyraOptionMarketContractGuardJob,
  lyramarketscontractguard: lyraMarketsContractGuardJob,
  stargateroutercontractguard: stargateRouterContractGuardJob,
  stargatelpstakingcontractguard: stargateLpStakingContractGuardJob,
  synthetixperpsv2marketcontractguard: synthetixPerpsV2MarketContractGuardJob,
  synthredeemercontractguard: synthRedeemerContractGuardJob,
  zeroexcontractguard: zeroExContractGuardJob,
  velodromev2gaugecontractguard: velodromeV2GaugeContractGuardJob,
  velodromev2routerguard: velodromeV2RouterGuardJob,
  synthetixv3contractguard: synthetixV3ContractGuardJob,
  pooltokenswapperguard: poolTokenSwapperGuardJob,
  ramsesrouterguard: ramsesRouterGuardJob,
  ramsesxramguard: ramsesXRamGuardJob,
  synthetixv3spotmarketcontractguard: synthetixV3SpotMarketContractGuardJob,
  synthetixv3perpsmarketcontractguard: synthetixV3PerpsMarketContractGuardJob,
  sonnecomptrollerguard: sonneFinanceComptrollerContractGuardJob,
  aavedebttokencontractguard: aaveDebtTokenContractGuardJob,
  aavemigrationhelperguard: aaveMigrationHelperGuardJob,
  flatmoneydelayedorderguard: flatMoneyDelayedOrderGuardJob,
  oneinchv6guard: oneInchV6ContractGuardJob,
  velodromenonfungiblepositionguard: velodromeNonfungiblePositionGuardJob,
  enablevelodromeclgaugecontractguard: enableVelodromeCLGaugeContractGuardJob,
  velodromenonfungiblepositionguardold: velodromeNonfungiblePositionGuardOldJob,
  compoundv3cometrewardscontractguard: compoundV3CometRewardsContractGuardJob,
  easyswapperv2contractguard: easySwapperV2ContractGuardJob,
  ramsesnonfungiblepositionguard: ramsesNonfungiblePositionGuardJob,
  gmxexchangeroutercontractguard: gmxExchangeRouterContractGuardJob,
  angledistributorguard: angleDistributorContractGuardJob,
  pancakenonfungiblepositionguard: pancakeNonfungiblePositionGuardJob,
  pancakemasterchefv3guard: pancakeMasterChefV3GuardJob,
  acrosscontractguard: acrossContractGuardJob,
  skypsm3contractguard: skyPSM3ContractGuardJob,
  flatmoneyoptionsorderannouncementguard: flatMoneyOptionsOrderAnnouncementGuardJob,
  flatmoneyoptionsorderexecutionguard: flatMoneyOptionsOrderExecutionGuardJob,
  odosv2contractguardjob: odosV2ContractGuardJob,
  flatmoneyv2orderannouncementguard: flatMoneyV2OrderAnnouncementGuardJob,
  flatmoneyv2orderexecutionguard: flatMoneyV2OrderExecutionGuardJob,
  pendlerouterv4contractguard: pendleRouterV4ContractGuardJob,
  allowapproveguard: allowApproveContractGuardJob,

  // Governance
  assets: assetsJob,
  removeassets: removeAssetsJob,
  deprecatecontractguards: deprecateContractGuardsJob,
  changeassets: changeAssetsJob,
  pseudopurge: pseudoPurgeJob,

  // EasySwapperV2
  easyswapperv2: easySwapperV2Job,
  withdrawalvault: withdrawalVaultJob,
  easyswapperv2configuration: easySwapperV2ConfigurationJob,

  lyraGroup: async (...args) => {
    await nftTrackerJob(...args);
    await erc721ContractGuardJob(...args);
    await lyraOptionMarketWrapperContractGuardJob(...args);
    await lyraOptionMarketContractGuardJob(...args);
    await dhedgeOptionMarketWrapperForLyraJob(...args);
    await lyraOptionMarketWrapperAssetGuardJob(...args);
    await lyraMarketsContractGuardJob(...args);
    await assetsJob(...args);
  },

  // Example of how to verify any contract that isn't verified
  // Can edit this job
  verifycontract: async (config, hre, versions) => {
    await tryVerify(
      hre,
      versions[config.newTag].contracts.DhedgeUniV3V2Router,
      "contracts/routers/DhedgeUniV3V2Router.sol:DhedgeUniV3V2Router",
      [],
    );
  },

  // has to be last
  unpause: unpauseJob,
};

const upgradeTask = task("upgrade", "Upgrade contracts")
  .addParam("production", "run in production environment", false, types.boolean)
  .addParam("restartnonce", "propose transactions", false, types.boolean)
  .addOptionalParam("usenonce", "propose transactions", undefined, types.int)
  .addParam("execute", "propose transactions", false, types.boolean)
  .addParam("specific", "run only specified tasks", false, types.boolean)
  .addOptionalParam(
    "keepversion",
    "keep the previous release published version. don't update it",
    false,
    types.boolean,
  );

Object.keys(jobs).forEach((job) => {
  // We make each job a taskArg for hardhat :)
  upgradeTask.addOptionalParam(job, "run " + job, false, types.boolean);
});

upgradeTask.setAction(async (taskArgs, hre) => {
  const ethers = hre.ethers;
  const network = await ethers.provider.getNetwork();
  console.log("Network:", network.name);

  if (taskArgs.restartnonce) {
    console.log("Restarting from last submitted nonce.");
  }

  console.log(`${taskArgs.production ? "Production" : "Staging"} environment.`);
  const { addresses, filenames } = getDeploymentData(network.chainId, taskArgs.production ? "production" : "staging");

  await hre.run("compile");

  const versions: IVersions = JSON.parse(fs.readFileSync(filenames.versionsFileName, "utf-8"));

  if (!versions) {
    throw new Error("No versions file");
  }
  const writeVersions = () => {
    const data = JSON.stringify(versions, null, 2);
    fs.writeFileSync(filenames.versionsFileName, data);
  };

  // TODO: This code needs to be reviewed and refactored
  const oldTag = Object.keys(versions)[Object.keys(versions).length - 1];
  let newTag: string;
  // I don't really understand this logic where if were not specifying jobs it doesnt use a new tag?
  if (!taskArgs.specific || taskArgs.keepversion) {
    newTag = oldTag;
    console.log(`Using Old Tag: ${oldTag}`);
  } else {
    // update to latest release version
    newTag = await getTag();
    console.log(`Using New Tag: ${newTag}`);
  }

  versions[newTag] = {
    contracts: { ...versions[oldTag]?.contracts },
    network,
    lastUpdated: new Date().toUTCString(),
    config: { ...versions[oldTag]?.config },
  };

  try {
    const jobsToRun = Object.keys(jobs)
      .filter((key) => {
        return !taskArgs.specific || taskArgs[key];
      })
      .map(
        (key) => () =>
          jobs[key](
            {
              execute: taskArgs.execute,
              restartnonce: taskArgs.restartnonce,
              useNonce: taskArgs.usenonce,
              newTag,
              oldTag,
              chainId: network.chainId,
            },
            hre,
            versions,
            filenames,
            addresses,
          ),
      );
    await executeInSeries(jobsToRun);
  } catch (e) {
    console.error(e);
    console.log("UPGRADE EXIT UNEXPECTED");
  } finally {
    if (taskArgs.execute) {
      console.log("Updating versions.json");
      writeVersions();
      console.log("Updating csv");
      // TODO: Shouldn't be using a mutable export/import to pass out this data
      nonceLog.forEach((nl) => {
        console.log("- ", nl.nonce, " - ", nl.message);
      });
    }
  }
});
