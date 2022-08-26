"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextServerSideProps = exports.getNextStaticProps = void 0;
const isBoolean_js_1 = __importDefault(require("lodash/isBoolean.js"));
const isObject_js_1 = __importDefault(require("lodash/isObject.js"));
const client_js_1 = require("./client.js");
/**
 * This helper function lets you build a static site with your WordPress data
 *
 * @param {GetStaticPropsContext} context
 * @param {GetNextStaticPropsConfig} cfg
 */
async function getNextStaticProps(context, cfg) {
    const { notFound, redirect, client, Page } = cfg;
    const apolloClient = (0, client_js_1.initializeApollo)(client);
    if ((0, isBoolean_js_1.default)(notFound) && notFound === true) {
        return {
            notFound,
        };
    }
    if ((0, isObject_js_1.default)(redirect)) {
        return {
            redirect,
        };
    }
    if (Page.query) {
        await apolloClient.query({
            query: Page.query,
            variables: (Page === null || Page === void 0 ? void 0 : Page.variables) ? Page === null || Page === void 0 ? void 0 : Page.variables(context) : undefined,
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (0, client_js_1.addApolloState)(apolloClient, { props: {} });
}
exports.getNextStaticProps = getNextStaticProps;
/**
 * This helper function lets you server side render your page with WordPress data
 *
 * @param {GetServerSidePropsContext} context
 * @param {GetNextServerSidePropsConfig} cfg
 */
async function getNextServerSideProps(context, cfg) {
    const { notFound, redirect, client, Page } = cfg;
    const apolloClient = (0, client_js_1.initializeApollo)(client);
    if ((0, isBoolean_js_1.default)(notFound) && notFound === true) {
        return {
            notFound,
        };
    }
    if ((0, isObject_js_1.default)(redirect)) {
        return {
            redirect,
        };
    }
    if (Page.query) {
        await apolloClient.query({
            query: Page.query,
            variables: (Page === null || Page === void 0 ? void 0 : Page.variables) ? Page === null || Page === void 0 ? void 0 : Page.variables(context) : undefined,
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (0, client_js_1.addApolloState)(apolloClient, { props: {} });
}
exports.getNextServerSideProps = getNextServerSideProps;
