import type { Policy } from "../../types";

export const pack_support_l1 : Policy = {
  id: 'pack-support-l1',
  name: 'Support L1',
  mode: 'shadow',
  description: 'Fast utility models, citation JSON, 700 token cap, cache 15m. This pack is versioned, reason-coded, and safe to shadow before enforce.',
  rules: [
    {
      id: 'support-l1-r1',
      kind: 'max-tokens',
      value: 2048 as never,
      mode: 'shadow',
      reasonCode: 'BGT.TOKEN_CAP',
    },
    {
      id: 'support-l1-r2',
      kind: 'jailbreak',
      value: 'observe' as never,
      mode: 'shadow',
      reasonCode: 'SEC.JAILBREAK',
    },
    {
      id: 'support-l1-r3',
      kind: 'pii-redact',
      value: 'digits+email' as never,
      mode: 'shadow',
      reasonCode: 'SEC.PII',
    },
  ],
};

export const pack_support_l1_doc = {
  title: 'Support L1',
  rollout: [
    'Install in observe mode on a single workload.',
    'Diff reason codes for a week against the previous pack.',
    'Promote to shadow, then enforce once false-positive rate is under 2%.',
    'Keep a restore point so operators can undo a bad change.',
  ],
  falsePositiveNotes: 'Jailbreak detectors fire on red-team prompts and on some code comments. Tune before enforce.',
  owner: 'platform-security',
};
