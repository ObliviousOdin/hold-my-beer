import type { Policy } from "../../types";

export const pack_eu_only : Policy = {
  id: 'pack-eu-only',
  name: 'EU only',
  mode: 'shadow',
  description: 'Region lock eu-west/eu-central, deny US-only hosts. This pack is versioned, reason-coded, and safe to shadow before enforce.',
  rules: [
    {
      id: 'eu-only-r1',
      kind: 'max-tokens',
      value: 8192 as never,
      mode: 'shadow',
      reasonCode: 'BGT.TOKEN_CAP',
    },
    {
      id: 'eu-only-r2',
      kind: 'jailbreak',
      value: 'observe' as never,
      mode: 'shadow',
      reasonCode: 'SEC.JAILBREAK',
    },
    {
      id: 'eu-only-r3',
      kind: 'pii-redact',
      value: 'digits+email' as never,
      mode: 'shadow',
      reasonCode: 'SEC.PII',
    },
    {
      id: 'eu-only-r4',
      kind: 'region-lock',
      value: ['eu-west', 'eu-central'] as never,
      mode: 'shadow',
      reasonCode: 'POL.REGION',
    },
  ],
};

export const pack_eu_only_doc = {
  title: 'EU only',
  rollout: [
    'Install in observe mode on a single workload.',
    'Diff reason codes for a week against the previous pack.',
    'Promote to shadow, then enforce once false-positive rate is under 2%.',
    'Keep a restore point so operators can undo a bad change.',
  ],
  falsePositiveNotes: 'Jailbreak detectors fire on red-team prompts and on some code comments. Tune before enforce.',
  owner: 'platform-security',
};
