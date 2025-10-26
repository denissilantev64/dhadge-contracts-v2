# Глоссарий

totalFundValue — суммарная стоимость активов пула в quote валюте по данным PoolManagerLogic.【F:contracts/PoolManagerLogic.sol†L333-L341】
totalSupply — общее количество долей пула, переменная ERC20 в PoolLogic.【F:contracts/PoolLogic.sol†L222-L358】
tokenPrice — расчетная цена одной доли пула, учитывающая невыпущенные комиссии poolManager.【F:contracts/PoolLogic.sol†L704-L717】
investorShares — баланс инвестора в долях пула, учитывается через ERC20 balanceOf в PoolLogic.【F:contracts/PoolLogic.sol†L222-L358】
managerFeeNumerator / denominator — параметры комиссии poolManager, numerator хранится в PoolManagerLogic, denominator приходит из Factory.【F:contracts/PoolManagerLogic.sol†L333-L355】【F:contracts/PoolFactory.sol†L308-L346】
performanceFeeNumerator / denominator — параметры success fee с тем же знаменателем из Factory.【F:contracts/PoolManagerLogic.sol†L333-L355】【F:contracts/PoolFactory.sol†L308-L346】
daoFeeNumerator / denominator — доля feeRecipient в новых комиссиях, задается poolFactoryOwner.【F:contracts/PoolFactory.sol†L308-L329】
exitCooldown — минимальный срок удержания долей после депозита, хранится в Factory и читается PoolLogic.【F:contracts/PoolFactory.sol†L415-L430】【F:contracts/PoolLogic.sol†L897-L903】
feeRecipient — адрес, получающий свою долю вновь выпущенных комиссионных долей.【F:contracts/PoolFactory.sol†L282-L329】【F:contracts/PoolLogic.sol†L802-L818】
poolManager — адрес poolManager из PoolManagerLogic.【F:contracts/PoolLogic.sol†L889-L918】
poolFactoryOwner — адрес, который управляет глобальными параметрами и паузами (модификатор onlyOwner).【F:contracts/PoolFactory.sol†L308-L525】

## NAV и цена доли

`totalFundValue()` в PoolManagerLogic суммирует стоимость всех поддерживаемых активов пула через `assetValue()` и прайс-фиды фабрики. PoolLogic читает это значение.【F:contracts/PoolManagerLogic.sol†L333-L341】【F:contracts/PoolLogic.sol†L901-L903】

`tokenPrice()` в PoolLogic берет текущий NAV, добавляет рассчитанные, но еще не выпущенные комиссии, и делит на скорректированный totalSupply.【F:contracts/PoolLogic.sol†L704-L717】【F:contracts/PoolLogic.sol†L728-L743】 Внутренний `_tokenPrice` возвращает $tokenPrice = totalFundValue / totalSupply$, масштабируя результат в 1e18.【F:contracts/PoolLogic.sol†L719-L726】 Если `totalSupply == 0`, функция возвращает 0, а депозиты первого инвестора минтят доли по номиналу внесенной стоимости, так как `_depositFor` при нулевом supply присваивает `liquidityMinted = usdAmount`.【F:contracts/PoolLogic.sol†L295-L303】

Фронтенд и бэкенд считывают NAV только через view-функции `totalFundValue()` и `tokenPrice()` без сайд-эффектов.【F:contracts/PoolManagerLogic.sol†L333-L341】【F:contracts/PoolLogic.sol†L704-L717】

## Депозит

Функции `deposit`, `depositFor`, `depositForWithCustomCooldown` расположены в PoolLogic и сводятся к приватному `_depositFor`.【F:contracts/PoolLogic.sol†L222-L358】 Механика:

1. Инвестор вносит `depositValue` (в USD эквиваленте после конверсии `_assetValue`).【F:contracts/PoolLogic.sol†L289-L296】 
2. Контракт читает текущую цену доли через NAV и supply после минта комиссии poolManager.【F:contracts/PoolLogic.sol†L285-L303】
3. Контракт минтит новые доли инвестора по формуле $mintedShares = depositValue / tokenPrice$.【F:contracts/PoolLogic.sol†L295-L324】
4. `totalSupply` увеличивается на `mintedShares` через `_mint`.【F:contracts/PoolLogic.sol†L320-L324】
5. Обновляются отметки `lastDeposit` и расчет кулдауна через `_calculateCooldown`, фиксируя `exitCooldown` или `customCooldown`.【F:contracts/PoolLogic.sol†L325-L337】【F:contracts/PoolLogic.sol†L832-L866】

Вызывать `deposit` может любой адрес, `depositFor` позволяет инвестору отправить активы другому получателю, а `depositForWithCustomCooldown` доступен только адресам из `customCooldownWhitelist` фабрики и устанавливает свой кулдаун в допустимых пределах.【F:contracts/PoolLogic.sol†L222-L258】【F:contracts/PoolFactory.sol†L128-L144】 Приватный пул проверяет whitelisting получателя и может отклонить депозит постороннего адреса.【F:contracts/PoolLogic.sol†L265-L269】 Установленные `exitCooldown` и `customCooldown` блокируют немедленный вывод, так как `lastExitCooldown` задает задержку перед `withdraw` и передачами.【F:contracts/PoolLogic.sol†L325-L337】【F:contracts/PoolLogic.sol†L868-L877】

Пример числовой, не ончейн: пусть `totalFundValue = 1 000 000` и `totalSupply = 100 000`, тогда `tokenPrice = 10`. Инвестор вносит `depositValue = 50 000`, получает `5 000` новых долей и новый `totalSupply = 105 000`.

## Вывод

Функции `withdraw`, `withdrawTo`, `withdrawSafe`, `withdrawToSafe` вызывают `_withdrawTo` внутри PoolLogic.【F:contracts/PoolLogic.sol†L364-L518】 Инвестор задает `sharesToBurn`, контракт проверяет право на вывод и рассчитывает долю пула `portion = sharesToBurn / totalSupply`.【F:contracts/PoolLogic.sol†L412-L455】 Затем активы распределяются пропорционально — прямой вывод активов (`withdraw` / `withdrawTo`) передает доли без защит, а `withdrawSafe` / `withdrawToSafe` используют guard-логику и параметры `_complexAssetsData` для сложных активов и слippage-контроля.【F:contracts/PoolLogic.sol†L387-L471】 После отправки активов доли инвестора сжигаются, итоговое предложение уменьшается на `sharesToBurn` за вычетом примененных exit fee — $newTotalSupply = totalSupply - sharesToBurn$ (с учетом, что реальный totalSupply после `_burn` равен `execution.supplyAfterBurn`).【F:contracts/PoolLogic.sol†L420-L506】 Проверки включают истечение кулдауна, статус паузы пула и фабрики, и требования guard для каждого актива при безопасном выводе.【F:contracts/PoolLogic.sol†L159-L167】【F:contracts/PoolLogic.sol†L412-L477】【F:contracts/PoolLogic.sol†L868-L877】

Инвестор не может вывести больше своей pro-rata NAV: `valueWithdrawn` вычисляется как доля от текущего NAV, и контракт проверяет, что фактический отток активов не превышает эту сумму. При неликвидных или ограниченных активах `withdrawSafe` может вернуть меньше определенных активов, оставаясь в лимитах guard.【F:contracts/PoolLogic.sol†L465-L505】 Если активы рискованные, guard может обработать их отдельно через `withdrawProcessing`.【F:contracts/PoolLogic.sol†L520-L560】

Пример числовой, не ончейн: инвестор держит `10 000` долей при `tokenPrice = 12`, его теоретическая доля NAV равна `120 000`. При выводе `2 500` долей ожидаемая сумма ≈ `30 000` номинала (до возможных exit fee и ограничений).

## Комиссии пула

PoolManagerLogic хранит параметры комиссий `performanceFeeNumerator` и `managerFeeNumerator`, а также лимиты и задержки, вместе со знаменателем `_MANAGER_FEE_DENOMINATOR` из фабрики.【F:contracts/PoolManagerLogic.sol†L333-L371】【F:contracts/PoolFactory.sol†L308-L346】 Пул не снимает комиссию из активов инвестора напрямую. Вместо этого PoolLogic периодически вызывает `mintManagerFee()`:

* Вычисляет текущую цену доли, сравнивает ее с `tokenPriceAtLastFeeMint`, и оценивает накопленные performance и management fee через `_availableManagerFee`.【F:contracts/PoolLogic.sol†L704-L776】
* Рассчитывает, сколько новых долей нужно выпустить, не трогая активы пула.【F:contracts/PoolLogic.sol†L784-L822】
* Минтит новые доли и распределяет их между `poolManager` и `feeRecipient` по долям `daoFeeNumerator/daoFeeDenominator`; остаток получает poolManager.【F:contracts/PoolLogic.sol†L802-L818】

Management fee описывается как выпуск $newShares_{manager} = totalSupply * managerFeeNumerator / D * dt$; точная формула начисления во времени см. `mintManagerFee()` в PoolLogic.【F:contracts/PoolLogic.sol†L746-L822】 Выпуск идёт через `_mint` без прямого списания активов инвестора. Performance fee выпускается только если `tokenPrice > tokenPriceAtLastFeeMint`; величина ограничена максимальными параметрами и задержкой изменения, устанавливаемыми через `announceFeeIncrease()` → `commitFeeIncrease()`.【F:contracts/PoolLogic.sol†L704-L776】【F:contracts/PoolManagerLogic.sol†L432-L514】 Лимиты `maximumPerformanceFeeNumerator`, `maximumPerformanceFeeNumeratorChange` и задержка `performanceFeeNumeratorChangeDelay` задаются фабрикой.【F:contracts/PoolManagerLogic.sol†L432-L514】【F:contracts/PoolFactory.sol†L399-L413】

Риск для инвестора — poolManager и feeRecipient получают новые доли без списания активов, увеличивая `totalSupply`. Это размывает процентную долю каждого инвестора, хотя номинальная стоимость его долей сохраняется, если NAV не изменился.【F:contracts/PoolLogic.sol†L784-L822】
Выпущенные новые доли распределяются между poolManager и feeRecipient. Это уменьшает процентную долю остальных инвесторов.

## Кулдауны и паузы

Factory управляет блокировками пула. `exitCooldown` и `customCooldown` запрещают вывод до истечения заданного срока после депозита, причем PoolLogic учитывает эти значения в `_calculateCooldown` и `getExitRemainingCooldown`.【F:contracts/PoolLogic.sol†L325-L337】【F:contracts/PoolLogic.sol†L832-L877】【F:contracts/PoolFactory.sol†L415-L430】 `pausedPools[pool]` блокирует депозиты, выводы и `mintManagerFee()` через модификатор `whenNotPaused`, а глобальная пауза фабрики (`_paused`, доступно через `paused()`) отключает `createFund` и любые действия, защищённые `whenNotFactoryPaused`, включая депозиты, выводы, торговлю и `mintManagerFee()`.【F:contracts/PoolLogic.sol†L159-L167】【F:contracts/PoolFactory.sol†L494-L523】 `tradingPausedPools[pool]` отключает торговые транзакции через `_execTransaction`. Все эти флаги ставятся и снимаются только `poolFactoryOwner`. Инвестор обойти их не может.【F:contracts/PoolLogic.sol†L600-L654】【F:contracts/PoolFactory.sol†L308-L525】

## Куда это идёт

* Этот документ — эталон для фронтенд калькуляторов.
* Эти формулы используются бэкендом для off-chain расчёта доли инвестора, ожидаемого вывода и накопленных комиссий.
* Эти параметры (особенно комиссии и паузы) — основа risk disclosure для клиента.
