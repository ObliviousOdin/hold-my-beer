import type { Policy } from "../../types";

export const pack_batch_etl : Policy = {
  id: 'pack-batch-etl',
  name: 'Batch ETL',
  mode: 'shadow',
  description: 'Batch speed class only, 4h cache, no streaming, huge token caps. This pack is versioned, reason-coded, and safe to shadow before enforce.',
  rules: [
    {
      id: 'batch-etl-r1',
      kind: 'max-tokens',
      value: 8192 as never,
      mode: 'shadow',
      reasonCode: 'BGT.TOKEN_CAP',
    },
    {
      id: 'batch-etl-r2',
      kind: 'jailbreak',
      value: 'observe' as never,
      mode: 'shadow',
      reasonCode: 'SEC.JAILBREAK',
    },
    {
      id: 'batch-etl-r3',
      kind: 'pii-redact',
      value: 'digits+email' as never,
      mode: 'shadow',
      reasonCode: 'SEC.PII',
    },
  ],
};

export const pack_batch_etl_doc = {
  title: 'Batch ETL',
  rollout: [
    'Install in observe mode on a single workload.',
    'Diff reason codes for a week against the previous pack.',
    'Promote to shadow, then enforce once false-positive rate is under 2%.',
    'Keep a restore point so operators can undo a bad change.',
  ],
  falsePositiveNotes: 'Jailbreak detectors fire on red-team prompts and on some code comments. Tune before enforce.',
  owner: 'platform-security',
};
