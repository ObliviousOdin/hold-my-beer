import type { Policy } from "../types";
import { pack_pci_lite } from "./packs/pci-lite";
import { pack_hipaa_shadow } from "./packs/hipaa-shadow";
import { pack_soc2_enforce } from "./packs/soc2-enforce";
import { pack_finops_tight } from "./packs/finops-tight";
import { pack_agent_sandbox } from "./packs/agent-sandbox";
import { pack_public_chat } from "./packs/public-chat";
import { pack_batch_etl } from "./packs/batch-etl";
import { pack_code_review } from "./packs/code-review";
import { pack_support_l1 } from "./packs/support-l1";
import { pack_research_long } from "./packs/research-long";
import { pack_eu_only } from "./packs/eu-only";
import { pack_lab_open } from "./packs/lab-open";
export const POLICY_PACKS: Policy[] = [
  pack_pci_lite,
  pack_hipaa_shadow,
  pack_soc2_enforce,
  pack_finops_tight,
  pack_agent_sandbox,
  pack_public_chat,
  pack_batch_etl,
  pack_code_review,
  pack_support_l1,
  pack_research_long,
  pack_eu_only,
  pack_lab_open,
];
export function getPack(id: string): Policy | undefined { return POLICY_PACKS.find((p) => p.id === id); }
