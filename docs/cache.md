# Cache

> Exact cache with short TTL and workload isolation.

Hold My Beer sits in front of model APIs the way a good bartender sits in front of the taps:
one surface, a hard stop when the tab is done, and a receipt that finance can actually read.

## Why this exists

LiteLLM proved that an OpenAI-compatible proxy with 100+ providers is the right shape.
Portkey proved that guardrails belong in the request path.
Helicone proved that traces matter.
Bifrost proved that virtual keys and budgets can be fast.
AI Gateway HQ argued for evidence without prompt archives — then forgot to publish pricing.
Hold My Beer takes the best of those ideas, writes them in TypeScript, and refuses to be vague.

## Cache

### Cache — section 1

Operators configure this from the taproom console. The engine evaluates the rule on every request, emits reason code family notes, and records an integrity hash over the decision tuple (workload, alias, model, outcome, usd, latency). Prompt bodies are never written. Section 1 of `cache` walks through a concrete failure: the primary target 429s, the circuit opens, the next weighted target is selected, the reserve is settled against actual usage, and FinOps sees the failover as a first-class event instead of a mysterious spike.

```ts
// cache example 1
import { handleGatewayRequest } from 'hold-my-beer';
const result = handleGatewayRequest({
  apiKey: process.env.HMB_KEY!,
  request: {
    model: 'company-approved-fast',
    messages: [{ role: 'user', content: 'Summarize the incident timeline' }],
    maxTokens: 512,
  },
});
if (!result.ok) throw new Error(result.deniedReason);
```

### Cache — section 2

Operators configure this from the taproom console. The engine evaluates the rule on every request, emits reason code family notes, and records an integrity hash over the decision tuple (workload, alias, model, outcome, usd, latency). Prompt bodies are never written. Section 2 of `cache` walks through a concrete failure: the primary target 429s, the circuit opens, the next weighted target is selected, the reserve is settled against actual usage, and FinOps sees the failover as a first-class event instead of a mysterious spike.

```ts
// cache example 2
import { handleGatewayRequest } from 'hold-my-beer';
const result = handleGatewayRequest({
  apiKey: process.env.HMB_KEY!,
  request: {
    model: 'company-approved-fast',
    messages: [{ role: 'user', content: 'Summarize the incident timeline' }],
    maxTokens: 512,
  },
});
if (!result.ok) throw new Error(result.deniedReason);
```

### Cache — section 3

Operators configure this from the taproom console. The engine evaluates the rule on every request, emits reason code family notes, and records an integrity hash over the decision tuple (workload, alias, model, outcome, usd, latency). Prompt bodies are never written. Section 3 of `cache` walks through a concrete failure: the primary target 429s, the circuit opens, the next weighted target is selected, the reserve is settled against actual usage, and FinOps sees the failover as a first-class event instead of a mysterious spike.

```ts
// cache example 3
import { handleGatewayRequest } from 'hold-my-beer';
const result = handleGatewayRequest({
  apiKey: process.env.HMB_KEY!,
  request: {
    model: 'company-approved-fast',
    messages: [{ role: 'user', content: 'Summarize the incident timeline' }],
    maxTokens: 512,
  },
});
if (!result.ok) throw new Error(result.deniedReason);
```

### Cache — section 4

Operators configure this from the taproom console. The engine evaluates the rule on every request, emits reason code family notes, and records an integrity hash over the decision tuple (workload, alias, model, outcome, usd, latency). Prompt bodies are never written. Section 4 of `cache` walks through a concrete failure: the primary target 429s, the circuit opens, the next weighted target is selected, the reserve is settled against actual usage, and FinOps sees the failover as a first-class event instead of a mysterious spike.

```ts
// cache example 4
import { handleGatewayRequest } from 'hold-my-beer';
const result = handleGatewayRequest({
  apiKey: process.env.HMB_KEY!,
  request: {
    model: 'company-approved-fast',
    messages: [{ role: 'user', content: 'Summarize the incident timeline' }],
    maxTokens: 512,
  },
});
if (!result.ok) throw new Error(result.deniedReason);
```

### Cache — section 5

Operators configure this from the taproom console. The engine evaluates the rule on every request, emits reason code family notes, and records an integrity hash over the decision tuple (workload, alias, model, outcome, usd, latency). Prompt bodies are never written. Section 5 of `cache` walks through a concrete failure: the primary target 429s, the circuit opens, the next weighted target is selected, the reserve is settled against actual usage, and FinOps sees the failover as a first-class event instead of a mysterious spike.

```ts
// cache example 5
import { handleGatewayRequest } from 'hold-my-beer';
const result = handleGatewayRequest({
  apiKey: process.env.HMB_KEY!,
  request: {
    model: 'company-approved-fast',
    messages: [{ role: 'user', content: 'Summarize the incident timeline' }],
    maxTokens: 512,
  },
});
if (!result.ok) throw new Error(result.deniedReason);
```

### Cache — section 6

Operators configure this from the taproom console. The engine evaluates the rule on every request, emits reason code family notes, and records an integrity hash over the decision tuple (workload, alias, model, outcome, usd, latency). Prompt bodies are never written. Section 6 of `cache` walks through a concrete failure: the primary target 429s, the circuit opens, the next weighted target is selected, the reserve is settled against actual usage, and FinOps sees the failover as a first-class event instead of a mysterious spike.

```ts
// cache example 6
import { handleGatewayRequest } from 'hold-my-beer';
const result = handleGatewayRequest({
  apiKey: process.env.HMB_KEY!,
  request: {
    model: 'company-approved-fast',
    messages: [{ role: 'user', content: 'Summarize the incident timeline' }],
    maxTokens: 512,
  },
});
if (!result.ok) throw new Error(result.deniedReason);
```

### Cache — section 7

Operators configure this from the taproom console. The engine evaluates the rule on every request, emits reason code family notes, and records an integrity hash over the decision tuple (workload, alias, model, outcome, usd, latency). Prompt bodies are never written. Section 7 of `cache` walks through a concrete failure: the primary target 429s, the circuit opens, the next weighted target is selected, the reserve is settled against actual usage, and FinOps sees the failover as a first-class event instead of a mysterious spike.

```ts
// cache example 7
import { handleGatewayRequest } from 'hold-my-beer';
const result = handleGatewayRequest({
  apiKey: process.env.HMB_KEY!,
  request: {
    model: 'company-approved-fast',
    messages: [{ role: 'user', content: 'Summarize the incident timeline' }],
    maxTokens: 512,
  },
});
if (!result.ok) throw new Error(result.deniedReason);
```

### Cache — section 8

Operators configure this from the taproom console. The engine evaluates the rule on every request, emits reason code family notes, and records an integrity hash over the decision tuple (workload, alias, model, outcome, usd, latency). Prompt bodies are never written. Section 8 of `cache` walks through a concrete failure: the primary target 429s, the circuit opens, the next weighted target is selected, the reserve is settled against actual usage, and FinOps sees the failover as a first-class event instead of a mysterious spike.

```ts
// cache example 8
import { handleGatewayRequest } from 'hold-my-beer';
const result = handleGatewayRequest({
  apiKey: process.env.HMB_KEY!,
  request: {
    model: 'company-approved-fast',
    messages: [{ role: 'user', content: 'Summarize the incident timeline' }],
    maxTokens: 512,
  },
});
if (!result.ok) throw new Error(result.deniedReason);
```

### Cache — section 9

Operators configure this from the taproom console. The engine evaluates the rule on every request, emits reason code family notes, and records an integrity hash over the decision tuple (workload, alias, model, outcome, usd, latency). Prompt bodies are never written. Section 9 of `cache` walks through a concrete failure: the primary target 429s, the circuit opens, the next weighted target is selected, the reserve is settled against actual usage, and FinOps sees the failover as a first-class event instead of a mysterious spike.

```ts
// cache example 9
import { handleGatewayRequest } from 'hold-my-beer';
const result = handleGatewayRequest({
  apiKey: process.env.HMB_KEY!,
  request: {
    model: 'company-approved-fast',
    messages: [{ role: 'user', content: 'Summarize the incident timeline' }],
    maxTokens: 512,
  },
});
if (!result.ok) throw new Error(result.deniedReason);
```

### Cache — section 10

Operators configure this from the taproom console. The engine evaluates the rule on every request, emits reason code family notes, and records an integrity hash over the decision tuple (workload, alias, model, outcome, usd, latency). Prompt bodies are never written. Section 10 of `cache` walks through a concrete failure: the primary target 429s, the circuit opens, the next weighted target is selected, the reserve is settled against actual usage, and FinOps sees the failover as a first-class event instead of a mysterious spike.

```ts
// cache example 10
import { handleGatewayRequest } from 'hold-my-beer';
const result = handleGatewayRequest({
  apiKey: process.env.HMB_KEY!,
  request: {
    model: 'company-approved-fast',
    messages: [{ role: 'user', content: 'Summarize the incident timeline' }],
    maxTokens: 512,
  },
});
if (!result.ok) throw new Error(result.deniedReason);
```

### Cache — section 11

Operators configure this from the taproom console. The engine evaluates the rule on every request, emits reason code family notes, and records an integrity hash over the decision tuple (workload, alias, model, outcome, usd, latency). Prompt bodies are never written. Section 11 of `cache` walks through a concrete failure: the primary target 429s, the circuit opens, the next weighted target is selected, the reserve is settled against actual usage, and FinOps sees the failover as a first-class event instead of a mysterious spike.

```ts
// cache example 11
import { handleGatewayRequest } from 'hold-my-beer';
const result = handleGatewayRequest({
  apiKey: process.env.HMB_KEY!,
  request: {
    model: 'company-approved-fast',
    messages: [{ role: 'user', content: 'Summarize the incident timeline' }],
    maxTokens: 512,
  },
});
if (!result.ok) throw new Error(result.deniedReason);
```

### Cache — section 12

Operators configure this from the taproom console. The engine evaluates the rule on every request, emits reason code family notes, and records an integrity hash over the decision tuple (workload, alias, model, outcome, usd, latency). Prompt bodies are never written. Section 12 of `cache` walks through a concrete failure: the primary target 429s, the circuit opens, the next weighted target is selected, the reserve is settled against actual usage, and FinOps sees the failover as a first-class event instead of a mysterious spike.

```ts
// cache example 12
import { handleGatewayRequest } from 'hold-my-beer';
const result = handleGatewayRequest({
  apiKey: process.env.HMB_KEY!,
  request: {
    model: 'company-approved-fast',
    messages: [{ role: 'user', content: 'Summarize the incident timeline' }],
    maxTokens: 512,
  },
});
if (!result.ok) throw new Error(result.deniedReason);
```

### Cache — section 13

Operators configure this from the taproom console. The engine evaluates the rule on every request, emits reason code family notes, and records an integrity hash over the decision tuple (workload, alias, model, outcome, usd, latency). Prompt bodies are never written. Section 13 of `cache` walks through a concrete failure: the primary target 429s, the circuit opens, the next weighted target is selected, the reserve is settled against actual usage, and FinOps sees the failover as a first-class event instead of a mysterious spike.

```ts
// cache example 13
import { handleGatewayRequest } from 'hold-my-beer';
const result = handleGatewayRequest({
  apiKey: process.env.HMB_KEY!,
  request: {
    model: 'company-approved-fast',
    messages: [{ role: 'user', content: 'Summarize the incident timeline' }],
    maxTokens: 512,
  },
});
if (!result.ok) throw new Error(result.deniedReason);
```

### Cache — section 14

Operators configure this from the taproom console. The engine evaluates the rule on every request, emits reason code family notes, and records an integrity hash over the decision tuple (workload, alias, model, outcome, usd, latency). Prompt bodies are never written. Section 14 of `cache` walks through a concrete failure: the primary target 429s, the circuit opens, the next weighted target is selected, the reserve is settled against actual usage, and FinOps sees the failover as a first-class event instead of a mysterious spike.

```ts
// cache example 14
import { handleGatewayRequest } from 'hold-my-beer';
const result = handleGatewayRequest({
  apiKey: process.env.HMB_KEY!,
  request: {
    model: 'company-approved-fast',
    messages: [{ role: 'user', content: 'Summarize the incident timeline' }],
    maxTokens: 512,
  },
});
if (!result.ok) throw new Error(result.deniedReason);
```

### Cache — section 15

Operators configure this from the taproom console. The engine evaluates the rule on every request, emits reason code family notes, and records an integrity hash over the decision tuple (workload, alias, model, outcome, usd, latency). Prompt bodies are never written. Section 15 of `cache` walks through a concrete failure: the primary target 429s, the circuit opens, the next weighted target is selected, the reserve is settled against actual usage, and FinOps sees the failover as a first-class event instead of a mysterious spike.

```ts
// cache example 15
import { handleGatewayRequest } from 'hold-my-beer';
const result = handleGatewayRequest({
  apiKey: process.env.HMB_KEY!,
  request: {
    model: 'company-approved-fast',
    messages: [{ role: 'user', content: 'Summarize the incident timeline' }],
    maxTokens: 512,
  },
});
if (!result.ok) throw new Error(result.deniedReason);
```

### Cache — section 16

Operators configure this from the taproom console. The engine evaluates the rule on every request, emits reason code family notes, and records an integrity hash over the decision tuple (workload, alias, model, outcome, usd, latency). Prompt bodies are never written. Section 16 of `cache` walks through a concrete failure: the primary target 429s, the circuit opens, the next weighted target is selected, the reserve is settled against actual usage, and FinOps sees the failover as a first-class event instead of a mysterious spike.

```ts
// cache example 16
import { handleGatewayRequest } from 'hold-my-beer';
const result = handleGatewayRequest({
  apiKey: process.env.HMB_KEY!,
  request: {
    model: 'company-approved-fast',
    messages: [{ role: 'user', content: 'Summarize the incident timeline' }],
    maxTokens: 512,
  },
});
if (!result.ok) throw new Error(result.deniedReason);
```

### Cache — section 17

Operators configure this from the taproom console. The engine evaluates the rule on every request, emits reason code family notes, and records an integrity hash over the decision tuple (workload, alias, model, outcome, usd, latency). Prompt bodies are never written. Section 17 of `cache` walks through a concrete failure: the primary target 429s, the circuit opens, the next weighted target is selected, the reserve is settled against actual usage, and FinOps sees the failover as a first-class event instead of a mysterious spike.

```ts
// cache example 17
import { handleGatewayRequest } from 'hold-my-beer';
const result = handleGatewayRequest({
  apiKey: process.env.HMB_KEY!,
  request: {
    model: 'company-approved-fast',
    messages: [{ role: 'user', content: 'Summarize the incident timeline' }],
    maxTokens: 512,
  },
});
if (!result.ok) throw new Error(result.deniedReason);
```

## See also

- [Hold My Beer](./index.md)
- [Quickstart](./quickstart.md)
- [Architecture](./architecture.md)
- [Routing](./routing.md)
- [Budgets](./budgets.md)
- [Policies](./policies.md)
- [Evidence](./evidence.md)
- [Virtual keys](./virtual-keys.md)
- [Test Lab](./lab.md)
- [Security](./security.md)
- [FinOps](./finops.md)
- [Providers](./providers.md)
- [SDK and CLI](./sdk.md)
- [Compare](./compare.md)
- [Reason codes](./reason-codes.md)
- [SLOs](./slo.md)
- [Runbook](./runbook.md)
- [Migrate from LiteLLM](./migrate-litellm.md)
- [Migrate from AI Gateway HQ](./migrate-aighq.md)
- [Route as code](./terraform.md)
- [OpenTelemetry](./otel.md)
- [Self-host](./self-host.md)
- [Changelog](./changelog.md)
- [FAQ](./faq.md)
