import type { WorkTool, WorkToolLane } from "./content/types";
import { WORK_TOOLS } from "./content";

export type { WorkToolLane, WorkTool } from "./content/types";
export { WORK_TOOLS };

const GROUP_ORDER: Record<NonNullable<WorkTool["group"]>, number> = { ai: 0, tool: 1 };

export function toolsForLane(lane: WorkToolLane): WorkTool[] {
  return WORK_TOOLS.filter((t) => t.lane === lane).sort(
    (a, b) => GROUP_ORDER[a.group ?? "tool"] - GROUP_ORDER[b.group ?? "tool"],
  );
}

export function getAllTools(): WorkTool[] {
  return [...WORK_TOOLS];
}