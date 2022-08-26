"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaustNXProvider = void 0;
const react_1 = __importDefault(require("react"));
const client_1 = require("@apollo/client");
const client_js_1 = require("../client.js");
function FaustNXProvider(props) {
    const { client, pageProps, children } = props;
    const apolloClient = (0, client_js_1.useApollo)(client, pageProps);
    return react_1.default.createElement(client_1.ApolloProvider, { client: apolloClient }, children);
}
exports.FaustNXProvider = FaustNXProvider;
