# Hold My Beer

**The AI gateway with a spine.**

We’ll hold the spend. You hold the beer.

Hold My Beer is an open-source AI gateway and control plane: one OpenAI-compatible endpoint, hard budgets *before* a provider is billed, cost-aware routing across 200+ models, and an evidence ledger that **never stores prompts**.

It takes the best ideas from [LiteLLM](https://github.com/BerriAI/litellm) (provider graph), [Portkey](https://github.com/Portkey-AI/gateway) (guardrails), [Helicone](https://github.com/Helicone/helicone) (traces), and [Bifrost](https://github.com/maximhq/bifrost) (virtual keys) — then adds the thing AI Gateway HQ argued for and forgot to price: a product you can actually operate.

- Live control plane: taproom console, test lab, FinOps, evidence
- TypeScript engine: authenticate → constrain → select → reconcile
- MIT licensed

## Quickstart

```bash
npm install
npm run dev
```

Point any OpenAI-compatible client at the gateway alias `company-approved-fast`. In this demo the Test Lab simulates upstreams; a capped live Grok path is available from the lab when you ask for it.

```python
from openai import OpenAI
import os

client = OpenAI(base_url="https://holdmybeer.ai/v1", api_key=os.environ["HMB_KEY"])
print(client.chat.completions.create(
    model="company-approved-fast",
    messages=[{"role": "user", "content": "Summarize the incident"}],
))
```

## Repository

- `src/gateway/` — engine, catalog, adapters, policy packs, FinOps, lab simulator
- `src/routes/` — marketing site + taproom console
- `docs/` — operator manuals
- `scripts/gen-gateway.py` — regenerates catalog, adapters, docs, tests

## Pricing (hosted)

| Plan | Price | Notes |
| --- | --- | --- |
| Lab | $0 | Simulated traffic, observe mode |
| Taproom | $49/mo | BYOK, 5M requests, 3 seats |
| Brewery | $199/mo | Enforce, SSO, FinOps exports |
| Distillery | Custom | VPC, SCIM, 24/7 |

BYOK is never marked up.

## License

MIT. See [LICENSE](./LICENSE).
