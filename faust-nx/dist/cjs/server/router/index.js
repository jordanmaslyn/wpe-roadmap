"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const trimEnd_js_1 = __importDefault(require("lodash/trimEnd.js"));
const middleware_js_1 = require("../auth/middleware.js");
const index_js_1 = require("../../utils/index.js");
const constants_js_1 = require("../../lib/constants.js");
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
// eslint-disable-next-line consistent-return
async function apiRouter(req, res) {
    const parsedUrl = (0, index_js_1.parseUrl)(req.url);
    const pathname = (0, trimEnd_js_1.default)(parsedUrl === null || parsedUrl === void 0 ? void 0 : parsedUrl.pathname, '/');
    switch (pathname) {
        case `${constants_js_1.FAUSTNX_API_BASE_PATH}/${constants_js_1.TOKEN_ENDPOINT_PARTIAL_PATH}`:
            return (0, middleware_js_1.authorizeHandler)(req, res);
        case `${constants_js_1.FAUSTNX_API_BASE_PATH}/${constants_js_1.LOGOUT_ENDPOINT_PARTIAL_PATH}`:
            return (0, middleware_js_1.logoutHandler)(req, res);
        default:
            res.statusCode = 404;
            res.end();
    }
}
exports.apiRouter = apiRouter;
