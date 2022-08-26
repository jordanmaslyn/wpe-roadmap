"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWpSecret = void 0;
function getWpSecret() {
    return process.env.FAUSTNX_SECRET_KEY;
}
exports.getWpSecret = getWpSecret;
