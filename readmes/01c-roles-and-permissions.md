# Роли и полномочия dHEDGE

#### owner (PoolFactory)

* Права по управлению активами пула
  `PoolManagerLogic.changeAssets()` — owner фабрики может напрямую добавлять и удалять поддерживаемые активы пула через вызов, обходя менеджера.【F:contracts/PoolManagerLogic.sol†L148-L179】
  `PoolLogic.setPoolManagerLogic()` — owner или сама фабрика могут переназначить активный PoolManagerLogic, что меняет весь код управления активами.【F:contracts/PoolLogic.sol†L879-L887】
  `PoolFactory.setPoolsPaused()` — owner может остановить переводы долей и торговлю во всех выбранных пулах.【F:contracts/PoolFactory.sol†L510-L524】

* Права по настройкам протокола
  `PoolFactory.addCustomCooldownWhitelist()` / `removeCustomCooldownWhitelist()` — управляет адресами с правом ставить кастомный кулдаун на депозиты.【F:contracts/PoolFactory.sol†L246-L258】
  `PoolFactory.addReceiverWhitelist()` / `removeReceiverWhitelist()` — контролирует, кто может получать токены во время кулдауна.【F:contracts/PoolFactory.sol†L260-L272】
  `PoolFactory.setDAOAddress()` и `setGovernanceAddress()` — переназначает DAO и Governance адреса.【F:contracts/PoolFactory.sol†L276-L306】
  `PoolFactory.setDaoFee()` — задаёт долю комиссий DAO.【F:contracts/PoolFactory.sol†L308-L322】
  `PoolFactory.setMaximumFee()` и `setMaximumPerformanceFeeNumeratorChange()` / `setPerformanceFeeNumeratorChangeDelay()` — выставляет глобальные лимиты комиссий и задержку повышения комиссий менеджеров.【F:contracts/PoolFactory.sol†L333-L414】
  `PoolFactory.setExitCooldown()` — меняет глобальный кулдаун на вывод.【F:contracts/PoolFactory.sol†L415-L431】
  `PoolFactory.setMaximumSupportedAssetCount()` и `setAssetHandler()` — задаёт лимит активов и выбирает AssetHandler, влияя на whitelist активов.【F:contracts/PoolFactory.sol†L433-L492】
  `PoolFactory.pause()` / `unpause()` — глобально ставит на паузу депозиты, выводы и торговлю.【F:contracts/PoolFactory.sol†L494-L507】

* Доступ к деньгам пользователей
  1. Прямого вывода активов из пула не найдено в коде.
  2. Может назначить daoAddress и governanceAddress, которые участвуют в распределении комиссий и guard логике.【F:contracts/PoolFactory.sol†L276-L306】
  3. Может направлять комиссионную эмиссию на любой адрес через `setDAOAddress()` и вызов `PoolLogic.mintManagerFee()`, который минтит доли DAO и менеджеру.【F:contracts/PoolFactory.sol†L276-L322】【F:contracts/PoolLogic.sol†L780-L820】

* Жёсткие ограничения
  Любые изменения активов проходят проверки guard-ов и лимитов на стороне PoolManagerLogic (валидный актив, максимум активов, минимум депозитных активов).【F:contracts/PoolManagerLogic.sol†L168-L214】

#### owner (Governance)

* Права по управлению активами пула
  `Governance.setContractGuard()` — выбирает guard для внешних протоколов, определяя, куда менеджер может отправлять средства пула.【F:contracts/Governance.sol†L38-L55】
  `Governance.setAssetGuard()` — назначает asset guard для типов активов, что позволяет или запрещает добавлять актив в пул.【F:contracts/Governance.sol†L57-L74】

* Права по настройкам протокола
  Управление guard-ами фактически задаёт протокольный whitelist стратегий и активов.【F:contracts/Governance.sol†L38-L74】

* Доступ к деньгам пользователей
  1. Прямых функций вывода нет.
  2. Может назначить guard контракты, которые затем получают доступ к активам через менеджера.【F:contracts/Governance.sol†L38-L74】
  3. Минтинг вознаграждений не предусмотрен.

* Жёсткие ограничения
  Требуется указывать ненулевые адреса guard-ов, иначе изменения отклоняются.【F:contracts/Governance.sol†L48-L74】

#### owner (AssetHandler)

* Права по управлению активами пула
  `AssetHandler.addAsset()` / `addAssets()` / `removeAsset()` — формирует список валидных активов с прайс-фидами, без которых пул не сможет добавить актив.【F:contracts/priceAggregators/AssetHandler.sol†L110-L146】

* Права по настройкам протокола
  `AssetHandler.setChainlinkTimeout()` — задаёт таймаут прайс-фидов для расчётов пула.【F:contracts/priceAggregators/AssetHandler.sol†L110-L118】

* Доступ к деньгам пользователей
  1. Функций вывода нет.
  2. Может опосредованно разрешать или запрещать активы, что влияет на капитал инвесторов.【F:contracts/priceAggregators/AssetHandler.sol†L118-L146】
  3. Минтинг не предусмотрен.

* Жёсткие ограничения
  Требуется ненулевой адрес агрегатора и актива, иначе транзакция отклоняется.【F:contracts/priceAggregators/AssetHandler.sol†L121-L135】

#### owner (EasySwapperV2)

* Права по управлению активами пула
  `EasySwapperV2.setAuthorizedWithdrawers()` — решает, кто завершает выводы через EasySwapper, влияя на выпуск активов из пулов.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L479-L485】
  `EasySwapperV2.setCustomCooldownWhitelist()` и `setCustomCooldown()` — регулирует возможность депозитов с пониженным кулдауном, влияя на ликвидность пулов.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L449-L505】
  `EasySwapperV2.setdHedgePoolFactory()` / `setSwapper()` — задаёт фабрику пулов и роутер свопов, что определяет маршруты движения активов.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L461-L477】

* Права по настройкам протокола
  Управление whitelists и параметрами кулдауна/сваппера относится к настройкам пользовательских выводов.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L449-L505】

* Доступ к деньгам пользователей
  1. Прямого вывода активов нет.
  2. Может назначить доверенных withdrawer-ов, которые завершают выводы и маршрутизируют активы пользователей.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L479-L485】【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L334-L345】
  3. Минтинг наград не предусмотрен.

* Жёсткие ограничения
  Whitelist для кастомного кулдауна проверяет, что адрес является пулом dHEDGE и что entry fee не ниже 0.1%.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L86-L101】【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L449-L456】

#### owner (PoolLimitOrderManager)

* Права по управлению активами пула
  `PoolLimitOrderManager.addAuthorizedKeeper()` / `removeAuthorizedKeeper()` — выбирает keepers, которые могут исполнять лимитные ордера и перемещать активы через EasySwapper.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L504-L518】

* Права по настройкам протокола
  `PoolLimitOrderManager.setDefaultSlippageTolerance()` / `setPoolFactory()` / `setEasySwapper()` / `setLimitOrderSettlementToken()` — настраивает параметры исполнения ордеров и актив расчётов.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L520-L541】

* Доступ к деньгам пользователей
  1. Прямого вывода нет.
  2. Может назначать keeper-ов, которые затем управляют исполнением ордеров пользователей.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L504-L541】【F:contracts/limitOrders/PoolLimitOrderManager.sol†L212-L265】
  3. Минтинг наград не предусмотрен.

* Жёсткие ограничения
  Установка адресов сопровождается проверками на валидность (например, при установке settlement токена вызывается проверка через фабрику).【F:contracts/limitOrders/PoolLimitOrderManager.sol†L520-L541】

#### owner (DhedgeEasySwapper)

* Права по управлению активами пула
  `DhedgeEasySwapper.setWithdrawProps()` и `setSwapRouter()` — управляет логикой вывода и свопа при депозитах/выводах через обёртку.【F:contracts/swappers/easySwapper/DhedgeEasySwapper.sol†L74-L84】
  `DhedgeEasySwapper.setPoolAllowed()` — определяет, какие пулы могут использовать кастомный кулдаун при депозитах через контракт.【F:contracts/swappers/easySwapper/DhedgeEasySwapper.sol†L86-L91】

* Права по настройкам протокола
  `DhedgeEasySwapper.setFee()` / `setFeeSink()` / `setManagerFeeBypass()` — задаёт и распределяет комиссии обёртки.【F:contracts/swappers/easySwapper/DhedgeEasySwapper.sol†L93-L114】

* Доступ к деньгам пользователей
  1. `salvage()` позволяет вывести все ETH, накопленные в контракте, напрямую владельцу.【F:contracts/swappers/easySwapper/DhedgeEasySwapper.sol†L116-L118】
  2. Может назначать адреса с обходом комиссии, что меняет финансовые потоки пользователей.【F:contracts/swappers/easySwapper/DhedgeEasySwapper.sol†L109-L114】
  3. Устанавливая ненулевую комиссию и сборщика, владелец получает вознаграждение с депозитов.【F:contracts/swappers/easySwapper/DhedgeEasySwapper.sol†L93-L107】

* Жёсткие ограничения
  Комиссия проверяется на условие `feeDenominator >= feeNumerator`, иначе транзакция отклоняется.【F:contracts/swappers/easySwapper/DhedgeEasySwapper.sol†L97-L101】

#### owner (PoolTokenSwapper)

* Права по управлению активами пула
  `PoolTokenSwapper.setAssets()` и `setPools()` — определяет, какие активы и пулы доступны для свопов через контракт.【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L276-L288】
  `PoolTokenSwapper.setManager()` — назначает адрес, который сможет проводить произвольные транзакции через `execTransaction`.【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L290-L295】
  `PoolTokenSwapper.setSwapWhitelist()` — контролирует список адресов, которые могут выполнять свопы активов и долей пулов.【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L297-L302】【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L98-L101】

* Права по настройкам протокола
  Управление конфигурацией активов, пулов и whitelist-ов определяет все параметры работы своппера.【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L276-L302】

* Доступ к деньгам пользователей
  1. `salvage()` позволяет вывести любые токены, находящиеся на балансе своппера, в пользу владельца.【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L304-L309】
  2. Может назначать менеджера и whitelist адресов, которые затем будут перемещать активы пулов через своппер.【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L228-L272】【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L276-L302】
  3. Минтинг вознаграждений не предусмотрен.

* Жёсткие ограничения
  При выполнении `execTransaction` менеджер проходит guard-проверки на whitelist активов и пулов, что ограничивает произвольный вывод средств.【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L230-L272】

#### manager

* Права по управлению активами пула
  `PoolLogic.execTransaction()` / `execTransactions()` — менеджер выполняет сделки от имени пула через guard-ы.【F:contracts/PoolLogic.sol†L620-L673】
  `PoolManagerLogic.changeAssets()` — добавляет и удаляет активы пула.【F:contracts/PoolManagerLogic.sol†L148-L179】
  `PoolManagerLogic.setTrader()` / `removeTrader()` / `addMember()` / `removeMember()` — управляет доступом к ролям и whitelist участников.【F:contracts/Managed.sol†L73-L126】

* Права по настройкам протокола
  `PoolManagerLogic.setFeeNumerator()` — может снижать комиссии пула.【F:contracts/PoolManagerLogic.sol†L373-L393】
  `PoolManagerLogic.announceFeeIncrease()` → `commitFeeIncrease()` — повышает комиссии после задержки и предварительного минтинга комиссий.【F:contracts/PoolManagerLogic.sol†L432-L514】
  `PoolManagerLogic.setTraderAssetChangeDisabled()` и `setMinDepositUSD()` — управляет доп. настройками пула.【F:contracts/PoolManagerLogic.sol†L516-L578】
  `PoolLogic.setPoolPrivate()` — делает пул приватным или публичным.【F:contracts/PoolLogic.sol†L211-L220】

* Доступ к деньгам пользователей
  1. Может выводить средства через сделки `execTransaction()` при условии прохождения guard-ов.【F:contracts/PoolLogic.sol†L620-L654】
  2. Назначает трейдера, членов пула и может сменить PoolManagerLogic через фабрику, влияя на доступ других ролей.【F:contracts/Managed.sol†L73-L126】【F:contracts/PoolLogic.sol†L879-L887】
  3. Получает вознаграждение через `PoolLogic.mintManagerFee()` и комиссию на вход/выход, которую может начислить себе.【F:contracts/PoolLogic.sol†L780-L820】【F:contracts/PoolLogic.sol†L303-L314】【F:contracts/PoolLogic.sol†L434-L448】

* Жёсткие ограничения
  Все сделки проходят через contract/asset guard, который проверяет whitelist и публичность транзакций; смена активов требует, чтобы актив был валиден и чтобы не превышался максимум активов, а повышение комиссий требует announce → delay → commit.【F:contracts/PoolLogic.sol†L620-L654】【F:contracts/PoolManagerLogic.sol†L168-L214】【F:contracts/PoolManagerLogic.sol†L432-L507】

#### trader

* Права по управлению активами пула
  `PoolLogic.execTransaction()` — трейдер может выполнять guarded транзакции, если guard пометил операцию как закрытую и разрешает трейдера.【F:contracts/PoolLogic.sol†L620-L641】
  `PoolManagerLogic.changeAssets()` — трейдер может менять состав активов, пока менеджер не отключил такую возможность флагом `traderAssetChangeDisabled`.【F:contracts/PoolManagerLogic.sol†L151-L179】【F:contracts/PoolManagerLogic.sol†L516-L520】

* Права по настройкам протокола
  Не найдено в коде.

* Доступ к деньгам пользователей
  1. Может перемещать активы пула через `execTransaction()` в рамках guard-ов.【F:contracts/PoolLogic.sol†L620-L654】
  2. Не назначает роли и не управляет whitelist-ами.
  3. Минтинг вознаграждений не предусмотрен.

* Жёсткие ограничения
  Действует только в рамках guard-ов и пока менеджер не отключил возможность менять активы трейдеру.【F:contracts/PoolLogic.sol†L620-L641】【F:contracts/PoolManagerLogic.sol†L516-L520】

#### investor / LP

* Права по управлению активами пула
  `PoolLogic.deposit()` / `depositFor()` — вносит средства и получает долевые токены.【F:contracts/PoolLogic.sol†L222-L238】
  `PoolLogic.withdrawSafe()` / `withdrawToSafe()` — инициирует вывод своей доли активов из пула.【F:contracts/PoolLogic.sol†L387-L409】

* Права по настройкам протокола
  Не найдено в коде.

* Доступ к деньгам пользователей
  1. Может вывести только собственную долю через функции withdraw.【F:contracts/PoolLogic.sol†L387-L517】
  2. Не назначает других адресов для вывода.
  3. Минтинг вознаграждений не предусмотрен.

* Жёсткие ограничения
  Депозит требует членства для приватных пулов, whitelist активов и минимального депозита; вывод возможен после кулдауна и с проверкой слippage/инвариантов.【F:contracts/PoolLogic.sol†L260-L347】【F:contracts/PoolLogic.sol†L412-L505】

#### authorized withdrawer (EasySwapperV2)

* Права по управлению активами пула
  `EasySwapperV2.completeLimitOrderWithdrawalFor()` — завершает выводы из пулов, переводя активы или settlement токен пользователю.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L334-L345】

* Права по настройкам протокола
  Не найдено в коде.

* Доступ к деньгам пользователей
  1. Может высвободить активы из withdrawal vault пользователя, но адрес получателя фиксирован пользователем/протоколом.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L334-L351】
  2. Не назначает новых адресов.
  3. Минтинг вознаграждений не предусмотрен.

* Жёсткие ограничения
  Доступ возможен только при нахождении в whitelist owner-а EasySwapperV2.【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L97-L101】【F:contracts/swappers/easySwapperV2/EasySwapperV2.sol†L479-L485】

#### authorized keeper (PoolLimitOrderManager)

* Права по управлению активами пула
  `PoolLimitOrderManager.executeLimitOrders()` / `executeSettlementOrders()` — keeper исполняет лимитные и settlement ордера, перемещая долевые токены и вызывая EasySwapper для конвертации в базовые активы.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L212-L381】

* Права по настройкам протокола
  Не найдено в коде.

* Доступ к деньгам пользователей
  1. Управляет активами пользователей в рамках ордеров: переводит их долевые токены в EasySwapper и выкупает settlement токен, который отправляется пользователю.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L320-L381】
  2. Не может назначать новых адресов.
  3. Минтинг вознаграждений не предусмотрен.

* Жёсткие ограничения
  Требует whitelist в контракте и проходит проверки цены, допустимого slippage и соответствия settlement токена.【F:contracts/limitOrders/PoolLimitOrderManager.sol†L135-L265】【F:contracts/limitOrders/PoolLimitOrderManager.sol†L320-L378】

#### swapWhitelist (PoolTokenSwapper)

* Права по управлению активами пула
  `PoolTokenSwapper.swap()` — whitelisted адресы могут обменивать активы и доли пулов по настройкам владельца своппера.【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L137-L225】

* Права по настройкам протокола
  Не найдено в коде.

* Доступ к деньгам пользователей
  1. Управляют только собственными активами; прямого доступа к чужим средствам нет.
  2. Не назначают новых участников.
  3. Минтинг наград не предусмотрен.

* Жёсткие ограничения
  Свопы возможны только по заранее включённым активам/пулам и при соблюдении minAmountOut; все операции идут через `whenNotPaused` и whitelist владельца.【F:contracts/swappers/poolTokenSwapper/PoolTokenSwapper.sol†L137-L225】

#### daoAddress

* Права по управлению активами пула
  Не найдено в коде.

* Права по настройкам протокола
  Не найдено в коде.

* Доступ к деньгам пользователей
  1. Не может напрямую вывести активы пула.
  2. Не назначает другие адреса.
  3. Получает доли пула при каждом вызове `PoolLogic.mintManagerFee()`, а также может инициировать вызов самостоятельно, так как функция публична.【F:contracts/PoolLogic.sol†L780-L820】

* Жёсткие ограничения
  Размер вознаграждения определяется текущими параметрами комиссий пула и настройками DAO fee.【F:contracts/PoolLogic.sol†L780-L820】

### Матрица контроля

| Роль | Может менять whitelist активов | Может менять ставки комиссий | Может торговать активами пула | Может напрямую вывести активы инвесторов | Может выпускать себе вознаграждение |
| ---- | ------------------------------ | ---------------------------- | ----------------------------- | ---------------------------------------- | ----------------------------------- |
| owner (PoolFactory) | да | да | нет | нет | через ограничение: setDAOAddress + mintManagerFee |
| owner (Governance) | да | нет | нет | нет | нет |
| owner (AssetHandler) | да | нет | нет | нет | нет |
| owner (EasySwapperV2) | нет | нет | нет | нет | нет |
| owner (PoolLimitOrderManager) | нет | нет | нет | нет | нет |
| owner (DhedgeEasySwapper) | через ограничение: setPoolAllowed | да | нет | да | да |
| owner (PoolTokenSwapper) | да | да | нет | да | нет |
| manager | да | через ограничение: announceFeeIncrease → commitFeeIncrease | да | через ограничение: execTransaction под guard | да |
| trader | через ограничение: если traderAssetChangeDisabled == false | нет | через ограничение: только whitelisted транзакции | нет | нет |
| investor / LP | нет | нет | нет | через ограничение: вывод своей доли после кулдауна | нет |
| authorized withdrawer | нет | нет | нет | через ограничение: завершает вывод пользователю | нет |
| authorized keeper | нет | нет | через ограничение: исполняет limit order через EasySwapper | через ограничение: исполняет ордер в пользу пользователя | нет |
| swapWhitelist | нет | нет | через ограничение: только включённые активы/пулы | нет | нет |
| daoAddress | нет | нет | нет | нет | да |
