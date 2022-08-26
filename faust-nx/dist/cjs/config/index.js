"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = exports.setConfig = void 0;
const once_js_1 = __importDefault(require("lodash/once.js"));
const index_js_1 = require("../hooks/index.js");
let config;
function setConfig(_config) {
    return (0, once_js_1.default)(() => {
        config = _config;
        const { experimentalPlugins: plugins } = _config;
        plugins === null || plugins === void 0 ? void 0 : plugins.forEach((plugin) => {
            var _a;
            (_a = plugin === null || plugin === void 0 ? void 0 : plugin.apply) === null || _a === void 0 ? void 0 : _a.call(plugin, index_js_1.hooks);
        });
    })();
}
exports.setConfig = setConfig;
function getConfig() {
    return config;
}
exports.getConfig = getConfig;
