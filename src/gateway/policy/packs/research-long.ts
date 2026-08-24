import type { Policy } from "../../types";

export const pack_research_long : Policy = {
  id: 'pack-research-long',
  name: 'Research long-context',
  mode: 'shadow',
  description: 'Need 128k+ context, frontier quality, spend alerts not hard block. This pack is versioned, reason-coded, and safe to shadow before enforce.',
  rules: [
    {
      id: 'research-long-r1',
      kind: 'max-tokens',
      value: 8192 as never,
      mode: 'shadow',
      reasonCode: 'BGT.TOKEN_CAP',
    },
    {
      id: 'research-long-r2',
      kind: 'jailbreak',
      value: 'observe' as never,
      mode: 'shadow',
      reasonCode: 'SEC.JAILBREAK',
    },
    {
      id: 'research-long-r3',
      kind: 'pii-redact',
      value: 'digits+email' as never,
      mode: 'shadow',
      reasonCode: 'SEC.PII',
    },
  ],
};

export const pack_research_long_doc = {
  title: 'Research long-context',
  rollout: [
    'Install in observe mode on a single workload.',
    'Diff reason codes for a week against the previous pack.',
    'Promote to shadow, then enforce once false-positive rate is under 2%.',
    'Keep a restore point so operators can undo a bad change.',
  ],
  falsePositiveNotes: 'Jailbreak detectors fire on red-team prompts and on some code comments. Tune before enforce.',
  owner: 'platform-security',
};
