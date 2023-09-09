import { Logger } from "./logger";
import { packageName } from "../data/pkg-name";
export const logger = new Logger(packageName);

export { default as measureExecutionTime } from "./measureExecutionTime"
