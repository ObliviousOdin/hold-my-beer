import { create } from "zustand";
import type { Budget, CanonicalRequest, EvidenceRecord, GovernanceMode, RoutePool, VirtualKey } from "./types";
import { handleGatewayRequest, type EngineState } from "./engine";
import {
  DEMO_BUDGETS,
  DEMO_HEALTH,
  DEMO_KEYS,
  DEMO_ORG,
  DEMO_POLICIES,
  DEMO_POOLS,
} from "./seed";
import { EVIDENCE_FIXTURES } from "./fixtures/history";

interface GatewayStore {
  mode: GovernanceMode;
  keys: VirtualKey[];
  pools: RoutePool[];
  budgets: Budget[];
  evidence: EvidenceRecord[];
  labKey: string;
  run: (req: CanonicalRequest) => ReturnType<typeof handleGatewayRequest>;
  setMode: (m: GovernanceMode) => void;
  toggleTarget: (poolId: string, targetId: string) => void;
  patchBudget: (id: string, hard: number) => void;
  revokeKey: (id: string) => void;
  resetDemo: () => void;
}

function engineState(s: Pick<GatewayStore, "mode" | "keys" | "pools" | "budgets">): EngineState {
  return {
    keys: s.keys,
    pools: s.pools,
    budgets: s.budgets,
    policies: DEMO_POLICIES,
    health: DEMO_HEALTH,
    now: Date.now(),
    mode: s.mode,
  };
}

export const useGateway = create<GatewayStore>()((set, get) => ({
  mode: DEMO_ORG.mode,
  keys: DEMO_KEYS,
  pools: DEMO_POOLS,
  budgets: DEMO_BUDGETS,
  evidence: EVIDENCE_FIXTURES.slice(0, 80),
  labKey: "hmb_lab_test",
  run: (req) => {
    const s = get();
    const result = handleGatewayRequest({ apiKey: s.labKey, request: req }, engineState(s));
    set({ evidence: [result.evidence, ...s.evidence].slice(0, 400) });
    if (result.ok) {
      set({
        keys: s.keys.map((k) =>
          k.prefix.startsWith("hmb_lab")
            ? {
                ...k,
                spendUsd: k.spendUsd + result.evidence.settledUsd,
                requestCount: k.requestCount + 1,
                lastUsedAt: result.evidence.ts,
              }
            : k,
        ),
      });
    }
    return result;
  },
  setMode: (m) => set({ mode: m }),
  toggleTarget: (poolId, targetId) =>
    set({
      pools: get().pools.map((p) =>
        p.id === poolId
          ? { ...p, targets: p.targets.map((t) => (t.id === targetId ? { ...t, enabled: !t.enabled } : t)) }
          : p,
      ),
    }),
  patchBudget: (id, hard) =>
    set({
      budgets: get().budgets.map((b) => (b.id === id ? { ...b, hardLimitUsd: hard, softLimitUsd: hard * 0.8 } : b)),
    }),
  revokeKey: (id) => set({ keys: get().keys.map((k) => (k.id === id ? { ...k, revoked: true } : k)) }),
  resetDemo: () =>
    set({
      mode: DEMO_ORG.mode,
      keys: DEMO_KEYS,
      pools: DEMO_POOLS,
      budgets: DEMO_BUDGETS,
      evidence: EVIDENCE_FIXTURES.slice(0, 80),
    }),
}));
