import type { Policy } from "../../types";

export const pack_code_review : Policy = {
  id: 'pack-code-review',
  name: 'Code review',
  mode: 'shadow',
  description: 'Prefer code-native models, require repo metadata, deny image. This pack is versioned, reason-coded, and safe to shadow before enforce.',
  rules: [
    {
      id: 'code-review-r1',
      kind: 'max-tokens',
      value: 8192 as never,
      mode: 'shadow',
      reasonCode: 'BGT.TOKEN_CAP',
    },
    {
      id: 'code-review-r2',
      kind: 'jailbreak',
      value: 'observe' as never,
      mode: 'shadow',
      reasonCode: 'SEC.JAILBREAK',
    },
    {
      id: 'code-review-r3',
      kind: 'pii-redact',
      value: 'digits+email' as never,
      mode: 'shadow',
      reasonCode: 'SEC.PII',
    },
    {
      id: 'code-review-r4',
      kind: 'deny-model',
      value: ['openai/gpt-image-1'] as never,
      mode: 'shadow',
      reasonCode: 'POL.DENY_MODEL',
    },
  ],
};

export const pack_code_review_doc = {
  title: 'Code review',
  rollout: [
    'Install in observe mode on a single workload.',
    'Diff reason codes for a week against the previous pack.',
    'Promote to shadow, then enforce once false-positive rate is under 2%.',
    'Keep a restore point so operators can undo a bad change.',
  ],
  falsePositiveNotes: 'Jailbreak detectors fire on red-team prompts and on some code comments. Tune before enforce.',
  owner: 'platform-security',
};
