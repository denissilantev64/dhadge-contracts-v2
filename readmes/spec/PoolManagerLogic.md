# PoolManagerLogic

Хранит параметры пула: whitelist активов, лимиты и комиссии. Определяет manager и trader для пула. Поставляет данные стоимости пула для фронтенда через PoolLogic. Навешивает guard-ограничения на сделки перед их выполнением.

## Состояние
* `factory (address)` — адрес фабрики пула, источник глобальных пауз, лимитов и guard настроек.
  Кто может менять — только в initialize().【F:contracts/PoolManagerLogic.sol†L69-L123】
* `poolLogic (address)` — адрес связанного PoolLogic, которому разрешено торговать активами.
  Кто может менять — initialize() и poolFactoryOwner через setPoolLogic().【F:contracts/PoolManagerLogic.sol†L70-L553】
* `supportedAssets (Asset[])` — текущий список разрешённых активов с флагом депозита.
  Кто может менять — initialize() и changeAssets().【F:contracts/PoolManagerLogic.sol†L72-L205】
* `assetPosition (mapping(address => uint256))` — индекс актива в supportedAssets для быстрых проверок.
  Кто может менять — initialize(), changeAssets(), _addAsset(), _removeAsset().【F:contracts/PoolManagerLogic.sol†L72-L248】
* `announcedPerformanceFeeNumerator (uint256)` — будущий performance fee после таймлока.
  Кто может менять — announceFeeIncrease(), renounceFeeIncrease(), commitFeeIncrease().【F:contracts/PoolManagerLogic.sol†L75-L513】
* `announcedFeeIncreaseTimestamp (uint256)` — момент, когда можно применить повышение комиссии.
  Кто может менять — announceFeeIncrease(), renounceFeeIncrease(), commitFeeIncrease().【F:contracts/PoolManagerLogic.sol†L75-L513】
* `performanceFeeNumerator (uint256)` — действующая ставка performance fee.
  Кто может менять — initialize(), setFeeNumerator(), commitFeeIncrease().【F:contracts/PoolManagerLogic.sol†L75-L513】
* `announcedManagerFeeNumerator (uint256)` — будущая ставка management fee после таймлока.
  Кто может менять — announceFeeIncrease(), renounceFeeIncrease(), commitFeeIncrease().【F:contracts/PoolManagerLogic.sol†L79-L513】
* `managerFeeNumerator (uint256)` — текущая management fee.
  Кто может менять — initialize(), setFeeNumerator(), commitFeeIncrease().【F:contracts/PoolManagerLogic.sol†L78-L513】
* `nftMembershipCollectionAddress (address)` — коллекция NFT, дающая доступ в приватный пул.
  Кто может менять — только manager через setNftMembershipCollectionAddress().【F:contracts/PoolManagerLogic.sol†L83-L567】
* `minDepositUSD (uint256)` — минимальный депозит в долларах, проксируется PoolLogic.
  Кто может менять — initialize() и manager через setMinDepositUSD().【F:contracts/PoolManagerLogic.sol†L86-L579】
* `announcedEntryFeeNumerator (uint256)` — будущая entry fee после таймлока.
  Кто может менять — announceFeeIncrease(), renounceFeeIncrease(), commitFeeIncrease().【F:contracts/PoolManagerLogic.sol†L88-L513】
* `entryFeeNumerator (uint256)` — действующая entry fee.
  Кто может менять — initialize(), setFeeNumerator(), commitFeeIncrease().【F:contracts/PoolManagerLogic.sol†L88-L419】
* `announcedExitFeeNumerator (uint256)` — будущая exit fee после таймлока.
  Кто может менять — announceFeeIncrease(), renounceFeeIncrease(), commitFeeIncrease().【F:contracts/PoolManagerLogic.sol†L91-L513】
* `exitFeeNumerator (uint256)` — действующая exit fee.
  Кто может менять — initialize(), setFeeNumerator(), commitFeeIncrease().【F:contracts/PoolManagerLogic.sol†L91-L419】
* `traderAssetChangeDisabled (bool)` — запрет для trader менять whitelist активов.
  Кто может менять — только manager через setTraderAssetChangeDisabled().【F:contracts/PoolManagerLogic.sol†L94-L521】
* `manager (address)` — текущий poolManager, контролирует комиссии, whitelist, роли.
  Кто может менять — initialize() и manager через changeManager().【F:contracts/Managed.sol†L30-L78】【F:contracts/PoolManagerLogic.sol†L105-L123】
* `trader (address)` — адрес trader, допускается к торговым вызовам.
  Кто может менять — manager через setTrader() и removeTrader().【F:contracts/Managed.sol†L36-L126】

## Публичные и external функции
### Управление активами
`changeAssets(Asset[] _addAssets, address[] _removeAssets)`
* Кто может вызывать — poolManager, poolFactoryOwner или trader если не запрещено.
* Что делает — добавляет и убирает активы пула, обновляет supportedAssets и assetPosition, проверяет whitelist фабрики и лимит.
* Побочные эффекты — эмитирует AssetAdded/AssetRemoved, вызывает emitPoolManagerEvent() в фабрике.
* Важные require / проверки безопасности — валидность актива через IHasAssetInfo, запрет добавления пулов когда пул имеет прайс агрегатор, лимит supportedAssets, требование хотя бы одного депозитного актива.【F:contracts/PoolManagerLogic.sol†L148-L205】

### Комиссии
`setFeeNumerator(uint256 _performanceFeeNumerator, uint256 _managerFeeNumerator, uint256 _entryFeeNumerator, uint256 _exitFeeNumerator)`
* Кто может вызывать — только poolManager.
* Что делает — снижает действующие комиссии до новых значений и эмитирует ManagerFeeSet.
* Побочные эффекты — обновляет performanceFeeNumerator, managerFeeNumerator, entryFeeNumerator, exitFeeNumerator, вызывает событие фабрики.
* Важные require / проверки безопасности — новые значения не выше текущих и внутри лимитов фабрики.【F:contracts/PoolManagerLogic.sol†L373-L429】

`announceFeeIncrease(uint256 _performanceFeeNumerator, uint256 _managerFeeNumerator, uint256 _entryFeeNumerator, uint256 _exitFeeNumerator)`
* Кто может вызывать — только poolManager.
* Что делает — записывает будущие комиссии и стартует таймер повышения.
* Побочные эффекты — обновляет announced* переменные, ставит announcedFeeIncreaseTimestamp, эмитирует ManagerFeeIncreaseAnnounced и событие фабрики.
* Важные require / проверки безопасности — соблюдает максимальные лимиты фабрики и ограничение на шаг performance fee, использует delay из фабрики.【F:contracts/PoolManagerLogic.sol†L432-L480】

`renounceFeeIncrease()`
* Кто может вызывать — только poolManager.
* Что делает — очищает объявленные значения комиссий до нуля.
* Побочные эффекты — сбрасывает announced* переменные и таймер, эмитирует ManagerFeeIncreaseRenounced и событие фабрики.
* Важные require / проверки безопасности — нет дополнительных проверок, но доступ ограничен менеджером.【F:contracts/PoolManagerLogic.sol†L482-L493】

`commitFeeIncrease()`
* Кто может вызывать — только poolManager.
* Что делает — после задержки минтит накопленные комиссии через PoolLogic и применяет объявленные ставки.
* Побочные эффекты — вызывает mintManagerFee() в PoolLogic, обновляет действующие fee, очищает announced* переменные.
* Важные require / проверки безопасности — требует, чтобы текущее время превысило announcedFeeIncreaseTimestamp.【F:contracts/PoolManagerLogic.sol†L495-L513】

`getFee()`
* Кто может вызывать — любой адрес.
* Что делает — возвращает действующие комиссии и знаменатель фабрики.
* Побочные эффекты — нет.
* Важные require / проверки безопасности — нет (view).【F:contracts/PoolManagerLogic.sol†L346-L355】

`getFeeIncreaseInfo()`
* Кто может вызывать — любой адрес.
* Что делает — возвращает объявленные значения комиссий и время активации.
* Побочные эффекты — нет.
* Важные require / проверки безопасности — нет (view).【F:contracts/PoolManagerLogic.sol†L523-L536】

### Стоимость пула и NAV
`totalFundValue()`
* Кто может вызывать — любой адрес.
* Что делает — суммирует стоимость всех активов пула через цены фабрики.
* Побочные эффекты — нет.
* Важные require / проверки безопасности — нет (view).【F:contracts/PoolManagerLogic.sol†L333-L342】

`assetValue(address _asset, uint256 _amount)`
* Кто может вызывать — любой адрес.
* Что делает — оценивает стоимость заданного количества актива по Chainlink цене из фабрики.
* Побочные эффекты — нет.
* Важные require / проверки безопасности — нет (view).【F:contracts/PoolManagerLogic.sol†L292-L301】

`assetValue(address _asset)`
* Кто может вызывать — любой адрес.
* Что делает — оценивает полный баланс актива пула.
* Побочные эффекты — нет.
* Важные require / проверки безопасности — нет (view).【F:contracts/PoolManagerLogic.sol†L303-L308】

`getFundComposition()`
* Кто может вызывать — любой адрес.
* Что делает — возвращает массив поддерживаемых активов, их балансы и цены для отображения.
* Побочные эффекты — нет.
* Важные require / проверки безопасности — нет (view).【F:contracts/PoolManagerLogic.sol†L310-L331】

### Управление ролями и доступом
`initialize(address _factory, address _manager, string _managerName, address _poolLogic, uint256 _performanceFeeNumerator, uint256 _managerFeeNumerator, Asset[] _supportedAssets)`
* Кто может вызывать — только прокси при развёртывании пула.
* Что делает — задаёт фабрику, manager, базовые комиссии и стартовый whitelist активов.
* Побочные эффекты — инициализирует Managed, вызывает _setFeeNumerator и _changeAssets.
* Важные require / проверки безопасности — проверка ненулевых адресов и модификатор initializer.【F:contracts/PoolManagerLogic.sol†L97-L123】

`changeManager(address _newManager, string _newManagerName)`
* Кто может вызывать — текущий poolManager.
* Что делает — переводит роль manager на новый адрес и обновляет имя.
* Побочные эффекты — обновляет manager и managerName, эмитирует ManagerUpdated.
* Важные require / проверки безопасности — запрещает нулевой адрес нового manager.【F:contracts/Managed.sol†L70-L78】

`setTrader(address _newTrader)`
* Кто может вызывать — только poolManager.
* Что делает — назначает trader, который сможет торговать и менять активы при разрешении.
* Побочные эффекты — обновляет trader.
* Важные require / проверки безопасности — запрещает нулевой адрес trader.【F:contracts/Managed.sol†L116-L121】

`removeTrader()`
* Кто может вызывать — только poolManager.
* Что делает — удаляет trader и оставляет только manager для торговли.
* Побочные эффекты — сбрасывает trader в ноль.
* Важные require / проверки безопасности — нет дополнительных проверок.【F:contracts/Managed.sol†L123-L126】

`setPoolLogic(address _poolLogic)`
* Кто может вызывать — только poolFactoryOwner.
* Что делает — переназначает PoolLogic прокси на новый адрес после апгрейда.
* Побочные эффекты — обновляет poolLogic, эмитирует PoolLogicSet и событие фабрики.
* Важные require / проверки безопасности — проверяет, что новый PoolLogic ссылается на текущий PoolManagerLogic и что вызов сделал владелец фабрики.【F:contracts/PoolManagerLogic.sol†L539-L553】

`setNftMembershipCollectionAddress(address _newNftMembershipCollectionAddress)`
* Кто может вызывать — только poolManager.
* Что делает — включает NFT коллекцию для допуска инвесторов или очищает её.
* Побочные эффекты — обновляет nftMembershipCollectionAddress.
* Важные require / проверки безопасности — проверяет, что адрес коллекции возвращает balanceOf и не равен нулю, иначе отклоняет.【F:contracts/PoolManagerLogic.sol†L555-L567】

`addMembers(address[] _members)` / `removeMembers(address[] _members)`
* Кто может вызывать — только poolManager.
* Что делает — массово вносит или удаляет адреса из member whitelist Managed.
* Побочные эффекты — обновляет приватный список участников.
* Важные require / проверки безопасности — пропускает уже добавленных или отсутствующих адресов, работает только для manager.【F:contracts/Managed.sol†L80-L114】

`addMember(address _member)` / `removeMember(address _member)`
* Кто может вызывать — только poolManager.
* Что делает — управляет отдельными адресами whitelist.
* Побочные эффекты — обновляет _memberList и _memberPosition.
* Важные require / проверки безопасности — проверяет наличие адреса в списке, защищено onlyManager.【F:contracts/Managed.sol†L100-L114】

`getMembers()` / `numberOfMembers()`
* Кто может вызывать — любой адрес.
* Что делает — предоставляет список членов и их количество для фронтенда.
* Побочные эффекты — нет.
* Важные require / проверки безопасности — нет (view).【F:contracts/Managed.sol†L64-L132】

### Паузы и лимиты
`setTraderAssetChangeDisabled(bool _disabled)`
* Кто может вызывать — только poolManager.
* Что делает — запрещает или разрешает trader менять whitelist активов.
* Побочные эффекты — обновляет traderAssetChangeDisabled.
* Важные require / проверки безопасности — нет дополнительных проверок, защищено onlyManager.【F:contracts/PoolManagerLogic.sol†L516-L521】

`setMinDepositUSD(uint256 _minDepositUSD)`
* Кто может вызывать — только poolManager.
* Что делает — задаёт минимальный депозит в USD, на который опирается PoolLogic при deposit.
* Побочные эффекты — обновляет minDepositUSD, эмитирует MinDepositUpdated и событие фабрики.
* Важные require / проверки безопасности — нет дополнительных проверок, но вызывает internal setter с событием.【F:contracts/PoolManagerLogic.sol†L569-L579】

`isMemberAllowed(address _member)` / `isNftMemberAllowed(address _member)`
* Кто может вызывать — любой адрес.
* Что делает — проверяет, допускается ли адрес через whitelist или NFT коллекцию.
* Побочные эффекты — нет.
* Важные require / проверки безопасности — нет (view).【F:contracts/PoolManagerLogic.sol†L581-L594】

## Events
* `AssetAdded(address fundAddress, address manager, address asset, bool isDeposit)` — сигнал добавления или обновления актива с пометкой депозита.
  Эмитится в: changeAssets() через _addAsset().【F:contracts/PoolManagerLogic.sol†L41-L218】
* `AssetRemoved(address fundAddress, address manager, address asset)` — удаление актива из whitelist.
  Эмитится в: changeAssets() через _removeAsset().【F:contracts/PoolManagerLogic.sol†L43-L248】
* `ManagerFeeSet(address fundAddress, address manager, uint256 performanceFeeNumerator, uint256 managerFeeNumerator, uint256 entryFeeNumerator, uint256 exitFeeNumerator, uint256 denominator)` — фиксация новых действующих комиссий.
  Эмитится в: initialize() через _setFeeNumerator(), setFeeNumerator(), commitFeeIncrease().【F:contracts/PoolManagerLogic.sol†L45-L429】
* `ManagerFeeIncreaseAnnounced(uint256 performanceFeeNumerator, uint256 managerFeeNumerator, uint256 entryFeeNumerator, uint256 exitFeeNumerator, uint256 announcedFeeActivationTime)` — объявление повышения комиссий с таймлоком.
  Эмитится в: announceFeeIncrease().【F:contracts/PoolManagerLogic.sol†L55-L480】
* `ManagerFeeIncreaseRenounced()` — отмена ранее объявленного повышения комиссий.
  Эмитится в: renounceFeeIncrease().【F:contracts/PoolManagerLogic.sol†L63-L493】
* `PoolLogicSet(address poolLogic, address from)` — смена связанного PoolLogic.
  Эмитится в: setPoolLogic().【F:contracts/PoolManagerLogic.sol†L65-L553】
* `MinDepositUpdated(uint256 minDepositUSD)` — обновление минимального депозита.
  Эмитится в: setMinDepositUSD(), _setMinDepositUSD().【F:contracts/PoolManagerLogic.sol†L67-L579】

## Безопасность и контроль доступа
poolManager управляет whitelist активов и комиссиями, но лимиты и задержки диктует фабрика (максимум активов, cap комиссий, timelock на повышение).【F:contracts/PoolManagerLogic.sol†L148-L480】
trader может торговать и менять whitelist только когда traderAssetChangeDisabled == false, иначе изменения активов доступны лишь manager и poolFactoryOwner.【F:contracts/PoolManagerLogic.sol†L148-L521】
poolFactoryOwner контролирует связь между PoolManagerLogic и PoolLogic. Он может через PoolManagerLogic.setPoolLogic() переназначить используемый PoolLogic и через PoolLogic.setPoolManagerLogic() (доступно factory или poolFactoryOwner) переназначить PoolManagerLogic. Это даёт poolFactoryOwner фактический контроль над апгрейдами пула.【F:contracts/PoolLogic.sol†L881-L887】【F:contracts/PoolManagerLogic.sol†L539-L553】
Все сделки пула проходят через PoolLogic.execTransaction* и guard, который проверяет адреса активов и возвращает баланс, поэтому любое снятие средств возможно только в рамках guard-проверенной транзакции.【F:contracts/PoolLogic.sol†L604-L672】【F:contracts/PoolManagerLogic.sol†L192-L233】
