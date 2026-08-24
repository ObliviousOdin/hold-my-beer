import type { Policy } from "../../types";

export const pack_public_chat : Policy = {
  id: 'pack-public-chat',
  name: 'Public chat',
  mode: 'enforce',
  description: 'Jailbreak enforce, rate-limit per key, hide provider names from clients. This pack is versioned, reason-coded, and safe to shadow before enforce.',
  rules: [
    {
      id: 'public-chat-r1',
      kind: 'max-tokens',
      value: 8192 as never,
      mode: 'enforce',
      reasonCode: 'BGT.TOKEN_CAP',
    },
    {
      id: 'public-chat-r2',
      kind: 'jailbreak',
      value: 'block' as never,
      mode: 'enforce',
      reasonCode: 'SEC.JAILBREAK',
    },
    {
      id: 'public-chat-r3',
      kind: 'pii-redact',
      value: 'digits+email' as never,
      mode: 'enforce',
      reasonCode: 'SEC.PII',
    },
  ],
};

export const pack_public_chat_doc = {
  title: 'Public chat',
  rollout: [
    'Install in observe mode on a single workload.',
    'Diff reason codes for a week against the previous pack.',
    'Promote to shadow, then enforce once false-positive rate is under 2%.',
    'Keep a restore point so operators can undo a bad change.',
  ],
  falsePositiveNotes: 'Jailbreak detectors fire on red-team prompts and on some code comments. Tune before enforce.',
  owner: 'platform-security',
};
