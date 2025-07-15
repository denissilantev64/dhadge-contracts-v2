// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import {IGmxPrice} from "./IGmxPrice.sol";

interface IGmxPosition {
  struct Props {
    Addresses addresses;
    Numbers numbers;
    Flags flags;
  }

  struct Addresses {
    address account;
    address market;
    address collateralToken;
  }

  struct Numbers {
    uint256 sizeInUsd;
    uint256 sizeInTokens;
    uint256 collateralAmount;
    uint256 borrowingFactor;
    uint256 fundingFeeAmountPerSize;
    uint256 longTokenClaimableFundingAmountPerSize;
    uint256 shortTokenClaimableFundingAmountPerSize;
    uint256 increasedAtTime;
    uint256 decreasedAtTime;
  }

  struct Flags {
    bool isLong;
  }

  struct PositionReferralFees {
    bytes32 referralCode;
    address affiliate;
    address trader;
    uint256 totalRebateFactor;
    uint256 affiliateRewardFactor;
    uint256 adjustedAffiliateRewardFactor;
    uint256 traderDiscountFactor;
    uint256 totalRebateAmount;
    uint256 traderDiscountAmount;
    uint256 affiliateRewardAmount;
  }

  struct PositionProFees {
    uint256 traderTier;
    uint256 traderDiscountFactor;
    uint256 traderDiscountAmount;
  }

  struct PositionBorrowingFees {
    uint256 borrowingFeeUsd;
    uint256 borrowingFeeAmount;
    uint256 borrowingFeeReceiverFactor;
    uint256 borrowingFeeAmountForFeeReceiver;
  }

  struct PositionFundingFees {
    uint256 fundingFeeAmount;
    uint256 claimableLongTokenAmount;
    uint256 claimableShortTokenAmount;
    uint256 latestFundingFeeAmountPerSize;
    uint256 latestLongTokenClaimableFundingAmountPerSize;
    uint256 latestShortTokenClaimableFundingAmountPerSize;
  }
  struct PositionUiFees {
    address uiFeeReceiver;
    uint256 uiFeeReceiverFactor;
    uint256 uiFeeAmount;
  }

  struct PositionLiquidationFees {
    uint256 liquidationFeeUsd;
    uint256 liquidationFeeAmount;
    uint256 liquidationFeeReceiverFactor;
    uint256 liquidationFeeAmountForFeeReceiver;
  }

  struct PositionFees {
    PositionReferralFees referral;
    PositionProFees pro;
    PositionFundingFees funding;
    PositionBorrowingFees borrowing;
    PositionUiFees ui;
    PositionLiquidationFees liquidation;
    IGmxPrice.Price collateralTokenPrice;
    uint256 positionFeeFactor;
    uint256 protocolFeeAmount;
    uint256 positionFeeReceiverFactor;
    uint256 feeReceiverAmount;
    uint256 feeAmountForPool;
    uint256 positionFeeAmountForPool;
    uint256 positionFeeAmount;
    uint256 totalCostAmountExcludingFunding;
    uint256 totalCostAmount;
    uint256 totalDiscountAmount;
  }

  struct ExecutionPriceResult {
    int256 priceImpactUsd;
    uint256 priceImpactDiffUsd;
    uint256 executionPrice;
  }

  struct PositionInfo {
    Props position;
    PositionFees fees;
    ExecutionPriceResult executionPriceResult;
    int256 basePnlUsd;
    int256 uncappedBasePnlUsd;
    int256 pnlAfterPriceImpactUsd;
  }
}
