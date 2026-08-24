import type { Policy } from "../../types";

export const pack_soc2_enforce : Policy = {
  id: 'pack-soc2-enforce',
  name: 'SOC 2 enforce',
  mode: 'enforce',
  description: 'SSO-only keys, deny-deprecated, require json for eval harnesses. This pack is versioned, reason-coded, and safe to shadow before enforce.',
  rules: [
    {
      id: 'soc2-enforce-r1',
      kind: 'max-tokens',
      value: 8192 as never,
      mode: 'enforce',
      reasonCode: 'BGT.TOKEN_CAP',
    },
    {
      id: 'soc2-enforce-r2',
      kind: 'jailbreak',
      value: 'block' as never,
      mode: 'enforce',
      reasonCode: 'SEC.JAILBREAK',
    },
    {
      id: 'soc2-enforce-r3',
      kind: 'pii-redact',
      value: 'digits+email' as never,
      mode: 'enforce',
      reasonCode: 'SEC.PII',
    },
  ],
};

export const pack_soc2_enforce_doc = {
  title: 'SOC 2 enforce',
  rollout: [
    'Install in observe mode on a single workload.',
    'Diff reason codes for a week against the previous pack.',
    'Promote to shadow, then enforce once false-positive rate is under 2%.',
    'Keep a restore point so operators can undo a bad change.',
  ],
  falsePositiveNotes: 'Jailbreak detectors fire on red-team prompts and on some code comments. Tune before enforce.',
  owner: 'platform-security',
};
