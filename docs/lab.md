# Test Lab

> Protocol-faithful simulators and a capped live xAI path.

Hold My Beer sits in front of model APIs the way a good bartender sits in front of the taps:
one surface, a hard stop when the tab is done, and a receipt that finance can actually read.

## Why this exists

LiteLLM proved that an OpenAI-compatible proxy with 100+ providers is the right shape.
Portkey proved that guardrails belong in the request path.
Helicone proved that traces matter.
Bifrost proved that virtual keys and budgets can be fast.
AI Gateway HQ argued for evidence without prompt archives — then forgot to publish pricing.
Hold My Beer takes the best of those ideas, writes them in TypeScript, and refuses to be vague.

## Test Lab

### Test Lab — section 1

Operators configure this from the taproom console. The engine evaluates the rule on every request, emits reason code family notes, and records an integrity hash over the decision tuple (workload, alias, model, outcome, usd, latency). Prompt bodies are never written. Section 1 of `lab` walks through a concrete failure: the primary target 429s, the circuit opens, the next weighted target is selected, the reserve is settled against actual usage, and FinOps sees the failover as a first-class event instead of a mysterious spike.

```ts
// lab example 1
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

### Test Lab — section 2

Operators configure this from the taproom console. The engine evaluates the rule on every request, emits reason code family notes, and records an integrity hash over the decision tuple (workload, alias, model, outcome, usd, latency). Prompt bodies are never written. Section 2 of `lab` walks through a concrete failure: the primary target 429s, the circuit opens, the next weighted target is selected, the reserve is settled against actual usage, and FinOps sees the failover as a first-class event instead of a mysterious spike.

```ts
// lab example 2
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

### Test Lab — section 3

Operators configure this from the taproom console. The engine evaluates the rule on every request, emits reason code family notes, and records an integrity hash over the decision tuple (workload, alias, model, outcome, usd, latency). Prompt bodies are never written. Section 3 of `lab` walks through a concrete failure: the primary target 429s, the circuit opens, the next weighted target is selected, the reserve is settled against actual usage, and FinOps sees the failover as a first-class event instead of a mysterious spike.

```ts
// lab example 3
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

### Test Lab — section 4

Operators configure this from the taproom console. The engine evaluates the rule on every request, emits reason code family notes, and records an integrity hash over the decision tuple (workload, alias, model, outcome, usd, latency). Prompt bodies are never written. Section 4 of `lab` walks through a concrete failure: the primary target 429s, the circuit opens, the next weighted target is selected, the reserve is settled against actual usage, and FinOps sees the failover as a first-class event instead of a mysterious spike.

```ts
// lab example 4
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

### Test Lab — section 5

Operators configure this from the taproom console. The engine evaluates the rule on every request, emits reason code family notes, and records an integrity hash over the decision tuple (workload, alias, model, outcome, usd, latency). Prompt bodies are never written. Section 5 of `lab` walks through a concrete failure: the primary target 429s, the circuit opens, the next weighted target is selected, the reserve is settled against actual usage, and FinOps sees the failover as a first-class event instead of a mysterious spike.

```ts
// lab example 5
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

### Test Lab — section 6

Operators configure this from the taproom console. The engine evaluates the rule on every request, emits reason code family notes, and records an integrity hash over the decision tuple (workload, alias, model, outcome, usd, latency). Prompt bodies are never written. Section 6 of `lab` walks through a concrete failure: the primary target 429s, the circuit opens, the next weighted target is selected, the reserve is settled against actual usage, and FinOps sees the failover as a first-class event instead of a mysterious spike.

```ts
// lab example 6
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

### Test Lab — section 7

Operators configure this from the taproom console. The engine evaluates the rule on every request, emits reason code family notes, and records an integrity hash over the decision tuple (workload, alias, model, outcome, usd, latency). Prompt bodies are never written. Section 7 of `lab` walks through a concrete failure: the primary target 429s, the circuit opens, the next weighted target is selected, the reserve is settled against actual usage, and FinOps sees the failover as a first-class event instead of a mysterious spike.

```ts
// lab example 7
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

### Test Lab — section 8

Operators configure this from the taproom console. The engine evaluates the rule on every request, emits reason code family notes, and records an integrity hash over the decision tuple (workload, alias, model, outcome, usd, latency). Prompt bodies are never written. Section 8 of `lab` walks through a concrete failure: the primary target 429s, the circuit opens, the next weighted target is selected, the reserve is settled against actual usage, and FinOps sees the failover as a first-class event instead of a mysterious spike.

```ts
// lab example 8
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

### Test Lab — section 9

Operators configure this from the taproom console. The engine evaluates the rule on every request, emits reason code family notes, and records an integrity hash over the decision tuple (workload, alias, model, outcome, usd, latency). Prompt bodies are never written. Section 9 of `lab` walks through a concrete failure: the primary target 429s, the circuit opens, the next weighted target is selected, the reserve is settled against actual usage, and FinOps sees the failover as a first-class event instead of a mysterious spike.

```ts
// lab example 9
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

### Test Lab — section 10

Operators configure this from the taproom console. The engine evaluates the rule on every request, emits reason code family notes, and records an integrity hash over the decision tuple (workload, alias, model, outcome, usd, latency). Prompt bodies are never written. Section 10 of `lab` walks through a concrete failure: the primary target 429s, the circuit opens, the next weighted target is selected, the reserve is settled against actual usage, and FinOps sees the failover as a first-class event instead of a mysterious spike.

```ts
// lab example 10
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

### Test Lab — section 11

Operators configure this from the taproom console. The engine evaluates the rule on every request, emits reason code family notes, and records an integrity hash over the decision tuple (workload, alias, model, outcome, usd, latency). Prompt bodies are never written. Section 11 of `lab` walks through a concrete failure: the primary target 429s, the circuit opens, the next weighted target is selected, the reserve is settled against actual usage, and FinOps sees the failover as a first-class event instead of a mysterious spike.

```ts
// lab example 11
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

### Test Lab — section 12

Operators configure this from the taproom console. The engine evaluates the rule on every request, emits reason code family notes, and records an integrity hash over the decision tuple (workload, alias, model, outcome, usd, latency). Prompt bodies are never written. Section 12 of `lab` walks through a concrete failure: the primary target 429s, the circuit opens, the next weighted target is selected, the reserve is settled against actual usage, and FinOps sees the failover as a first-class event instead of a mysterious spike.

```ts
// lab example 12
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

### Test Lab — section 13

Operators configure this from the taproom console. The engine evaluates the rule on every request, emits reason code family notes, and records an integrity hash over the decision tuple (workload, alias, model, outcome, usd, latency). Prompt bodies are never written. Section 13 of `lab` walks through a concrete failure: the primary target 429s, the circuit opens, the next weighted target is selected, the reserve is settled against actual usage, and FinOps sees the failover as a first-class event instead of a mysterious spike.

```ts
// lab example 13
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

### Test Lab — section 14

Operators configure this from the taproom console. The engine evaluates the rule on every request, emits reason code family notes, and records an integrity hash over the decision tuple (workload, alias, model, outcome, usd, latency). Prompt bodies are never written. Section 14 of `lab` walks through a concrete failure: the primary target 429s, the circuit opens, the next weighted target is selected, the reserve is settled against actual usage, and FinOps sees the failover as a first-class event instead of a mysterious spike.

```ts
// lab example 14
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

### Test Lab — section 15

Operators configure this from the taproom console. The engine evaluates the rule on every request, emits reason code family notes, and records an integrity hash over the decision tuple (workload, alias, model, outcome, usd, latency). Prompt bodies are never written. Section 15 of `lab` walks through a concrete failure: the primary target 429s, the circuit opens, the next weighted target is selected, the reserve is settled against actual usage, and FinOps sees the failover as a first-class event instead of a mysterious spike.

```ts
// lab example 15
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

### Test Lab — section 16

Operators configure this from the taproom console. The engine evaluates the rule on every request, emits reason code family notes, and records an integrity hash over the decision tuple (workload, alias, model, outcome, usd, latency). Prompt bodies are never written. Section 16 of `lab` walks through a concrete failure: the primary target 429s, the circuit opens, the next weighted target is selected, the reserve is settled against actual usage, and FinOps sees the failover as a first-class event instead of a mysterious spike.

```ts
// lab example 16
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

### Test Lab — section 17

Operators configure this from the taproom console. The engine evaluates the rule on every request, emits reason code family notes, and records an integrity hash over the decision tuple (workload, alias, model, outcome, usd, latency). Prompt bodies are never written. Section 17 of `lab` walks through a concrete failure: the primary target 429s, the circuit opens, the next weighted target is selected, the reserve is settled against actual usage, and FinOps sees the failover as a first-class event instead of a mysterious spike.

```ts
// lab example 17
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
- [Cache](./cache.md)
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
