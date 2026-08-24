import type { Policy } from "../../types";

export const pack_hipaa_shadow : Policy = {
  id: 'pack-hipaa-shadow',
  name: 'HIPAA shadow',
  mode: 'observe',
  description: 'Observe-mode PII and jailbreak detectors for clinical copilots. This pack is versioned, reason-coded, and safe to shadow before enforce.',
  rules: [
    {
      id: 'hipaa-shadow-r1',
      kind: 'max-tokens',
      value: 8192 as never,
      mode: 'observe',
      reasonCode: 'BGT.TOKEN_CAP',
    },
    {
      id: 'hipaa-shadow-r2',
      kind: 'jailbreak',
      value: 'observe' as never,
      mode: 'observe',
      reasonCode: 'SEC.JAILBREAK',
    },
    {
      id: 'hipaa-shadow-r3',
      kind: 'pii-redact',
      value: 'digits+email' as never,
      mode: 'observe',
      reasonCode: 'SEC.PII',
    },
  ],
};

export const pack_hipaa_shadow_doc = {
  title: 'HIPAA shadow',
  rollout: [
    'Install in observe mode on a single workload.',
    'Diff reason codes for a week against the previous pack.',
    'Promote to shadow, then enforce once false-positive rate is under 2%.',
    'Keep a restore point so operators can undo a bad change.',
  ],
  falsePositiveNotes: 'Jailbreak detectors fire on red-team prompts and on some code comments. Tune before enforce.',
  owner: 'platform-security',
};
