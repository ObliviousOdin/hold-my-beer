import type { Policy } from "../../types";

export const pack_agent_sandbox : Policy = {
  id: 'pack-agent-sandbox',
  name: 'Agent sandbox',
  mode: 'shadow',
  description: 'Tool allowlist, no image, max 8 hops, deny outbound hosts. This pack is versioned, reason-coded, and safe to shadow before enforce.',
  rules: [
    {
      id: 'agent-sandbox-r1',
      kind: 'max-tokens',
      value: 8192 as never,
      mode: 'shadow',
      reasonCode: 'BGT.TOKEN_CAP',
    },
    {
      id: 'agent-sandbox-r2',
      kind: 'jailbreak',
      value: 'observe' as never,
      mode: 'shadow',
      reasonCode: 'SEC.JAILBREAK',
    },
    {
      id: 'agent-sandbox-r3',
      kind: 'pii-redact',
      value: 'digits+email' as never,
      mode: 'shadow',
      reasonCode: 'SEC.PII',
    },
    {
      id: 'agent-sandbox-r4',
      kind: 'tool-allowlist',
      value: ['search', 'retrieve', 'calendar.read'] as never,
      mode: 'shadow',
      reasonCode: 'POL.TOOLS',
    },
  ],
};

export const pack_agent_sandbox_doc = {
  title: 'Agent sandbox',
  rollout: [
    'Install in observe mode on a single workload.',
    'Diff reason codes for a week against the previous pack.',
    'Promote to shadow, then enforce once false-positive rate is under 2%.',
    'Keep a restore point so operators can undo a bad change.',
  ],
  falsePositiveNotes: 'Jailbreak detectors fire on red-team prompts and on some code comments. Tune before enforce.',
  owner: 'platform-security',
};
