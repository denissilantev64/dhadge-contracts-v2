# Жизненный цикл пула dHEDGE

## Депозит инвестора
* Вход — investor вызывает deposit, depositFor или depositForWithCustomCooldown в PoolLogic.
* Основные on-chain шаги —
  1. PoolLogic вызывает mintManagerFee, чтобы учесть накопленные комиссии.
  2. PoolLogic запрашивает totalFundValue через PoolManagerLogic.
  3. Рассчитывается tokenPrice с учетом невыпущенных комиссий.
  4. Минтятся новые доли пула инвестору и обновляется totalSupply.
  5. Фиксируется кулдаун вывода на основе exitCooldown или customCooldown.
* Состояние до — investor держит исходные доли пула и видит прежний totalSupply.
* Состояние после — investor получает больше долей пула, обновляются lastDeposit и метки кулдауна.
* Риски и контроль —
  * poolFactoryOwner может включить паузу пула и остановить депозит.
  * Приватный пул через whitelist в PoolLogic блокирует адреса вне allowlist.
  * easySwapperOwner не влияет на депозит, но может ограничить маршруты для будущего вывода.

## Вывод инвестора
* Вход — investor вызывает withdraw, withdrawTo, withdrawSafe или withdrawToSafe после истечения кулдауна.
* Основные on-chain шаги —
  1. PoolLogic проверяет, что кулдаун вывода завершен.
  2. Проверяются флаги пауза пула и глобальная пауза фабрики.
  3. Рассчитывается доля пула portion = sharesToBurn / totalSupply.
  4. Выплата активов идет напрямую или через guard-логику для сложных активов.
  5. Доли инвестора сжигаются и обновляется totalSupply.
* Состояние до — investor удерживает доли пула и видит текущее значение totalSupply.
* Состояние после — доли инвестора и totalSupply уменьшаются, активы отправлены получателю.
* Риски и контроль —
  * poolFactoryOwner может держать паузу пула и заблокировать вывод.
  * authorizedWithdrawer завершает операции EasySwapperV2 и обязан следовать параметрам инвестора.
  * easySwapperOwner настраивает поддержку активов для безопасных выводов.
  * Комиссия exitFee и ограничения guard снижают фактический объём выплаты.

## Торговля активами пула
* Вход — poolManager или trader инициирует сделку через execTransaction или execTransactions.
* Основные on-chain шаги —
  1. PoolLogic проверяет отсутствие флага tradingPausedPools и глобальной паузы.
  2. Получает contractGuard и assetGuard из PoolFactory.
  3. Вызывает предторговые проверки guard и применяет лимиты.
  4. Исполняет целевой внешний вызов для обмена или перемещения активов.
  5. Вызывает постпроверки guard и фиксирует изменения активов.
* Состояние до — пул держит текущий набор supportedAssets и долей пула без изменений.
* Состояние после — обновлённые балансы активов пула и возможные новые позиции.
* Риски и контроль —
  * Только poolManager или trader могут инициировать сделки, остальные адреса отклоняются.
  * authorizedKeeper исполняет лимитные ордера через PoolLimitOrderManager, но не может менять параметры пула.
  * limitOrderManagerOwner и poolTokenSwapperOwner управляют whitelists исполнителей и маршрутов.
  * poolFactoryOwner может включить tradingPausedPools или изменить guards, что остановит сделки.

## Начисление комиссий
* Вход — любой адрес вызывает mintManagerFee в PoolLogic.
* Основные on-chain шаги —
  1. PoolLogic рассчитывает tokenPrice и доступные комиссии.
  2. Вычисляет размер новых долей пула для poolManager и feeRecipient.
  3. Минтит доли пула и распределяет их между poolManager и feeRecipient.
  4. Обновляет tokenPriceAtLastFeeMint и отметки времени.
* Состояние до — totalSupply не включает новые комиссионные доли, метки времени старые.
* Состояние после — totalSupply увеличен на выпущенные доли пула, NAV не меняется.
* Риски и контроль —
  * Выпуск новых долей пула размывает долю инвесторов.
  * poolFactoryOwner задает лимиты комиссий и задержки изменения.
  * feeRecipient получает свою часть автоматически, инвестор не может остановить выпуск.

## Аварийная пауза
* Вход — poolFactoryOwner вызывает pause, setPoolsPaused или setTradingPaused в PoolFactory.
* Основные on-chain шаги —
  1. Устанавливаются флаги глобальной паузы, паузы пула или паузы торговли.
  2. PoolLogic учитывает эти флаги при deposit, withdraw, execTransaction и mintManagerFee.
* Состояние до — пул работает без ограничений паузы.
* Состояние после — заблокированы депозиты, выводы, начисление комиссий и или торговля.
* Риски и контроль —
  * Инвесторы зависят от решений poolFactoryOwner и не могут обойти паузу пула.
  * authorizedKeeper и authorizedWithdrawer не могут выполнять действия, когда пул на паузе.
  * swapWhitelist и easySwapperOwner ожидают снятия паузы для возобновления сервисов.
