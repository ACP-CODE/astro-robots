import { performance } from "perf_hooks";

export function measureExecutionTime(callback: () => void): number {
  const startTime = performance.now();
  callback();
  const endTime = performance.now();
  const executionTime = Math.floor(endTime - startTime);
  return executionTime;
}
