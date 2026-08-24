import type { Policy } from "../../types";

export const pack_lab_open : Policy = {
  id: 'pack-lab-open',
  name: 'Lab open',
  mode: 'observe',
  description: 'Observe everything, never block, perfect for Test Lab. This pack is versioned, reason-coded, and safe to shadow before enforce.',
  rules: [
    {
      id: 'lab-open-r1',
      kind: 'max-tokens',
      value: 8192 as never,
      mode: 'observe',
      reasonCode: 'BGT.TOKEN_CAP',
    },
    {
      id: 'lab-open-r2',
      kind: 'jailbreak',
      value: 'observe' as never,
      mode: 'observe',
      reasonCode: 'SEC.JAILBREAK',
    },
    {
      id: 'lab-open-r3',
      kind: 'pii-redact',
      value: 'digits+email' as never,
      mode: 'observe',
      reasonCode: 'SEC.PII',
    },
  ],
};

export const pack_lab_open_doc = {
  title: 'Lab open',
  rollout: [
    'Install in observe mode on a single workload.',
    'Diff reason codes for a week against the previous pack.',
    'Promote to shadow, then enforce once false-positive rate is under 2%.',
    'Keep a restore point so operators can undo a bad change.',
  ],
  falsePositiveNotes: 'Jailbreak detectors fire on red-team prompts and on some code comments. Tune before enforce.',
  owner: 'platform-security',
};
