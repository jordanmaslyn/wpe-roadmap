"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWpUrl = void 0;
function getWpUrl() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return process.env.NEXT_PUBLIC_WORDPRESS_URL;
}
exports.getWpUrl = getWpUrl;
