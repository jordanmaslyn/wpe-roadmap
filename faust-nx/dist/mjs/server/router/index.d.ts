/// <reference types="node" />
import { IncomingMessage, ServerResponse } from 'http';
/**
 * A node handler for processing all incoming Faust.js API requests.
 *
 * @example ```ts
 * // filename: pages/api/faust/[[...route]].ts
 * import 'faust.config';
 * import { apiRouter } from '@faustjs/core/api';
 *
 * export default apiRouter;
 * ```
 *
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
export declare function apiRouter(req: IncomingMessage, res: ServerResponse): Promise<void>;
