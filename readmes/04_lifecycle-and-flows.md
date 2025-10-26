# Жизненный цикл пула dHEDGE

## Депозит инвестора
* Вход — investor вызывает `deposit()`, `depositFor()`, `depositForWithCustomCooldown()` в `PoolLogic`.
* Основные on-chain вызовы —
  1. `PoolLogic` вызывает `mintManagerFee()` перед приёмом депозита.
  2. `PoolLogic` считает `totalFundValue()` через `PoolManagerLogic`.
  3. Рассчитывает `tokenPrice()`.
  4. Минтит новые доли инвестору через `_mint`.
  5. Фиксирует кулдаун через `exitCooldown` или `customCooldown`.
* Состояние до — доли инвестора до входа, текущий `totalSupply`.
* Состояние после — новый `investorShares`, обновлённый `totalSupply`, записанный `lastDeposit` и кулдаун.
* Риски / контроль —
  * `poolFactoryOwner` может поставить пул на паузу и заблокировать депозит через `pausedPools(pool)` или `paused()`.
  * Приватный пул может отказать адресам вне `allowlist`.

## Вывод инвестора
* Вход — investor вызывает `withdraw()`, `withdrawTo()`, `withdrawSafe()`, `withdrawToSafe()` в `PoolLogic` после истечения кулдауна.
* Основные on-chain вызовы —
  1. Проверка кулдауна через `getExitRemainingCooldown()`.
  2. Проверка что пул не на паузе через `pausedPools(pool)` и `paused()`.
  3. Расчёт доли NAV `portion = sharesToBurn / totalSupply`.
  4. Выплата активов напрямую или через Safe-режим с guard и `_complexAssetsData`.
  5. Сжигание долей инвестора через `_burn`.
* Состояние до — баланс инвестора, `totalSupply` до `_burn`.
* Состояние после — уменьшенный `investorShares`, `totalSupply` после `_burn`.
* Риски / контроль —
  * `poolFactoryOwner` может заблокировать вывод через глобальную паузу и `pausedPools`.
  * `authorizedWithdrawer` в `EasySwapperV2` может завершить вывод за инвестора и направить средства выбранному получателю.
  * Комиссии выхода `exitFee` уменьшают фактическую сумму.

## Торговля активами пула
* Вход — `poolManager` или `trader` инициирует сделку через `execTransaction()` или `execTransactions()` в `PoolLogic`.
* Основные on-chain вызовы —
  1. `PoolLogic` проверяет, что пул не на паузе торговли через `tradingPausedPools(pool)`.
  2. Через `PoolFactory` получает `contractGuard` и `assetGuard`.
  3. Перед сделкой вызывает guard `preTxGuard()` или эквивалент.
  4. Выполняет целевой внешний вызов (DEX, lending и т. д.).
  5. После сделки вызывает guard `postTxGuard()` и проверяет лимиты.
* Состояние до — состав активов пула и список `supportedAssets`.
* Состояние после — обновлённые балансы активов пула.
* Риски / контроль —
  * Только `poolManager` или `trader` могут инициировать сделку.
  * `trader` ограничен `traderAssetChangeDisabled` и whitelist активов в `PoolManagerLogic`.
  * `poolFactoryOwner` через guards и `tradingPausedPools(pool)` может блокировать направления торговли или всю торговлю.

## Начисление комиссий
* Вход — любой адрес вызывает `mintManagerFee()` в `PoolLogic`.
* Основные on-chain вызовы —
  1. `PoolLogic` читает `tokenPrice()`.
  2. Рассчитывает management fee и performance fee относительно `tokenPriceAtLastFeeMint`.
  3. Минтит новые доли и распределяет их между `poolManager` и `feeRecipient`.
  4. Обновляет `tokenPriceAtLastFeeMint` и метки времени.
* Состояние до — `totalSupply` до выпуска комиссии.
* Состояние после — увеличенный `totalSupply`, корзина активов без изменений.
* Риски / контроль —
  * Выпуск новых долей размывает инвесторов.
  * Лимиты ставок и скорость роста комиссии задаёт `PoolFactory` через `announceFeeIncrease()` и `commitFeeIncrease()` в `PoolManagerLogic`.
  * `poolFactoryOwner` управляет допустимыми параметрами комиссий.

## Аварийная пауза
* Вход — `poolFactoryOwner` вызывает `pause()`, `setPoolsPaused()`, `setTradingPaused(pool, true)` или аналогичные функции в `PoolFactory`.
* Основные on-chain вызовы —
  1. Установка `_paused` или флагов `pausedPools[pool]` и `tradingPausedPools[pool]`.
  2. Пулы читают эти флаги в `deposit()`, `withdraw*()`, `execTransaction()`, `mintManagerFee()`.
* Состояние до — пулы работают штатно.
* Состояние после — заблокированы депозиты и или выводы и или торговля и или начисление комиссий.
* Риски / контроль —
  * `poolFactoryOwner` использует стоп-кран.
  * `investor` не может обойти паузу.
