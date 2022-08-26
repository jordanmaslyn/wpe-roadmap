"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useApollo = exports.addApolloState = exports.initializeApollo = exports.APOLLO_STATE_PROP_NAME = void 0;
const react_1 = require("react");
const deepmerge_1 = __importDefault(require("deepmerge"));
const isEqual_js_1 = __importDefault(require("lodash/isEqual.js"));
exports.APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';
const windowApolloState = typeof window !== 'undefined' ? window[exports.APOLLO_STATE_PROP_NAME] : {};
function initializeApollo(client, initialState = null) {
    client.restore(windowApolloState);
    if (initialState) {
        const existingCache = client.extract();
        const data = (0, deepmerge_1.default)(existingCache, initialState, {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            arrayMerge: (destination, source) => [
                ...source,
                destination.filter((d) => source.every((s) => !(0, isEqual_js_1.default)(d, s))),
            ],
        });
        client.cache.restore(data);
    }
    return client;
}
exports.initializeApollo = initializeApollo;
function addApolloState(client, pageProps) {
    if (pageProps === null || pageProps === void 0 ? void 0 : pageProps.props) {
        // eslint-disable-next-line no-param-reassign
        pageProps.props[exports.APOLLO_STATE_PROP_NAME] = client.cache.extract();
    }
    return pageProps;
}
exports.addApolloState = addApolloState;
function useApollo(client, pageProps) {
    const state = pageProps[exports.APOLLO_STATE_PROP_NAME];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const store = (0, react_1.useMemo)(() => initializeApollo(client, state), [state, client]);
    return store;
}
exports.useApollo = useApollo;
