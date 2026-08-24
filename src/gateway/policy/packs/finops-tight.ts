import type { Policy } from "../../types";

export const pack_finops_tight : Policy = {
  id: 'pack-finops-tight',
  name: 'FinOps tight',
  mode: 'shadow',
  description: 'Least-cost routing, $0.02 request cap, degrade to mini models at 80% budget. This pack is versioned, reason-coded, and safe to shadow before enforce.',
  rules: [
    {
      id: 'finops-tight-r1',
      kind: 'max-tokens',
      value: 2048 as never,
      mode: 'shadow',
      reasonCode: 'BGT.TOKEN_CAP',
    },
    {
      id: 'finops-tight-r2',
      kind: 'jailbreak',
      value: 'observe' as never,
      mode: 'shadow',
      reasonCode: 'SEC.JAILBREAK',
    },
    {
      id: 'finops-tight-r3',
      kind: 'pii-redact',
      value: 'digits+email' as never,
      mode: 'shadow',
      reasonCode: 'SEC.PII',
    },
    {
      id: 'finops-tight-r4',
      kind: 'min-quality',
      value: 'utility' as never,
      mode: 'shadow',
      reasonCode: 'BGT.DEGRADE',
    },
  ],
};

export const pack_finops_tight_doc = {
  title: 'FinOps tight',
  rollout: [
    'Install in observe mode on a single workload.',
    'Diff reason codes for a week against the previous pack.',
    'Promote to shadow, then enforce once false-positive rate is under 2%.',
    'Keep a restore point so operators can undo a bad change.',
  ],
  falsePositiveNotes: 'Jailbreak detectors fire on red-team prompts and on some code comments. Tune before enforce.',
  owner: 'platform-security',
};
