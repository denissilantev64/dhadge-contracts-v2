# Глоссарий и соглашения по терминологии

## Роли и власть
poolFactoryOwner — может паузить пулы, менять лимиты комиссий, управлять whitelist активов и адресом daoAddress на фабрике.
Синонимы, НЕ использовать в тексте — "governance", "DAO owner", "factory owner", "owner (PoolFactory)".

poolManager — управляет активами пула, настраивает комиссии, приватность и делегатов.
Синонимы, НЕ использовать в тексте — "fund manager", "manager", "dhedgeManager".

trader — исполняет сделки пула через guard и может менять состав активов, если разрешено poolManager.
Синонимы, НЕ использовать в тексте — "delegate trader", "trusted trader", "asset manager".

investor — держит доли пула, вносит и выводит средства, получает расчётную стоимость доли при операциях.
Синонимы, НЕ использовать в тексте — "LP", "user", "liquidity provider".

authorizedKeeper — вызывает исполнение лимитных ордеров и управляет движением активов в PoolLimitOrderManager.
Синонимы, НЕ использовать в тексте — "keeper", "bot executor", "limit order executor".

authorizedWithdrawer — завершает выводы и свопы инвестора через EasySwapperV2.
Синонимы, НЕ использовать в тексте — "withdrawal bot", "swapper", "escrow".

swapWhitelist — может вызывать свопы активов и долей через PoolTokenSwapper.
Синонимы, НЕ использовать в тексте — "swapper whitelist", "authorized swapper", "router".

feeRecipient — получает доли из комиссий, назначенных фабрикой и пулом.
Синонимы, НЕ использовать в тексте — "dao address", "protocol treasury", "fee sink".

## Ключевые контракты и где про них читать
- PoolLogic — держит активы инвесторов, выпускает и сжигает долевые токены, исполняет сделки пула, начисляет комиссии. См. spec/PoolLogic.md.
- PoolManagerLogic — права менеджера, whitelist активов, комиссии, NAV. См. spec/PoolManagerLogic.md.
- PoolFactory — реестр пулов, лимиты комиссий, паузы, daoAddress, guard. См. spec/PoolFactory.md.
- EasySwapperV2 — вывод и конверсия активов для инвестора, роль authorizedWithdrawer. См. spec/EasySwapperV2.md.
- PoolLimitOrderManager — лимитные ордера пула, роль authorizedKeeper. См. spec/PoolLimitOrderManager.md.
- PoolTokenSwapper — сервисный своп через whitelist маршрутов, роль poolTokenSwapperOwner и swapWhitelist. См. spec/PoolTokenSwapper.md.
- 01c-roles-and-permissions.md — матрица власти.
- 03_token-economics.md — NAV, цена доли, комиссии, кулдауны.
- 04_lifecycle-and-flows.md — сценарии депозит, вывод, торговля, пауза в терминах ролей.

## Экономические величины
| Термин | Определение | Где рассчитывается |
| --- | --- | --- |
| totalFundValue | суммарная стоимость активов пула в quote валюте | PoolManagerLogic.totalFundValue(); см. 03_token-economics.md |
| tokenPrice | цена одной доли с учётом невыпущенных комиссий | PoolLogic.tokenPrice(); см. 03_token-economics.md |
| exitCooldown | время блокировки вывода после депозита | Устанавливается через Factory; см. 03_token-economics.md |
| performanceFee | доли, которые минтятся менеджеру и feeRecipient когда цена доли выросла с момента последнего mintManagerFee() | См. PoolLogic.md |
| managementFee | доли, которые минтятся менеджеру и feeRecipient во времени | См. PoolLogic.md |
| daoFee | доля новых комиссионных токенов, которая уходит feeRecipient | Задаётся через Factory; см. PoolFactory.md |

## Правила для фронтенда и саппорта
- Никогда не называть poolFactoryOwner просто "DAO" во внешних текстах. Всегда poolFactoryOwner.
- Всегда называть токен пула "долевая доля пула" или "доля пула", не "LP токен".
- В интерфейсе показывать tokenPrice и totalFundValue как расчётные view значения. Не утверждать, что это гарантированная цена выхода.
- При объяснении комиссий инвестору говорить "выпуск новых долей менеджеру и feeRecipient", не "списание комиссии с вас".
- При объяснении кулдауна использовать "кулдаун вывода" а не "локап".
- Если пул приватный, в интерфейсе обозначать "приватный пул" и не обещать доступ любому адресу.
- Эти правила нужны боту и людям.
