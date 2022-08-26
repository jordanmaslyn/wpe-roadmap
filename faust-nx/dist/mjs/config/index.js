import once from 'lodash/once.js';
import { hooks } from '../hooks/index.js';
let config;
export function setConfig(_config) {
    return once(() => {
        config = _config;
        const { experimentalPlugins: plugins } = _config;
        plugins === null || plugins === void 0 ? void 0 : plugins.forEach((plugin) => {
            var _a;
            (_a = plugin === null || plugin === void 0 ? void 0 : plugin.apply) === null || _a === void 0 ? void 0 : _a.call(plugin, hooks);
        });
    })();
}
export function getConfig() {
    return config;
}
