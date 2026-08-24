import type { Policy } from "../../types";

export const pack_pci_lite : Policy = {
  id: 'pack-pci-lite',
  name: 'PCI-lite',
  mode: 'enforce',
  description: 'Block models that log prompts, lock region to us-east, cap tokens, redact digits. This pack is versioned, reason-coded, and safe to shadow before enforce.',
  rules: [
    {
      id: 'pci-lite-r1',
      kind: 'max-tokens',
      value: 8192 as never,
      mode: 'enforce',
      reasonCode: 'BGT.TOKEN_CAP',
    },
    {
      id: 'pci-lite-r2',
      kind: 'jailbreak',
      value: 'observe' as never,
      mode: 'enforce',
      reasonCode: 'SEC.JAILBREAK',
    },
    {
      id: 'pci-lite-r3',
      kind: 'pii-redact',
      value: 'digits+email' as never,
      mode: 'enforce',
      reasonCode: 'SEC.PII',
    },
  ],
};

export const pack_pci_lite_doc = {
  title: 'PCI-lite',
  rollout: [
    'Install in observe mode on a single workload.',
    'Diff reason codes for a week against the previous pack.',
    'Promote to shadow, then enforce once false-positive rate is under 2%.',
    'Keep a restore point so operators can undo a bad change.',
  ],
  falsePositiveNotes: 'Jailbreak detectors fire on red-team prompts and on some code comments. Tune before enforce.',
  owner: 'platform-security',
};
