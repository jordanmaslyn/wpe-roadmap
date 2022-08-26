"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWordPressProps = void 0;
const seedQuery_js_1 = require("./queries/seedQuery.js");
const getTemplate_js_1 = require("./getTemplate.js");
const client_js_1 = require("./client.js");
const index_js_1 = require("./config/index.js");
const index_js_2 = require("./hooks/index.js");
function isSSR(ctx) {
    return ctx.req !== undefined;
}
async function getWordPressProps(options) {
    var _a, _b;
    const { templates } = (0, index_js_1.getConfig)();
    if (!templates) {
        throw new Error('Templates are required. Please add them to your config.');
    }
    const { client, ctx } = options;
    if (!client) {
        throw new Error('getWordPressProps: client is required. Please add it as a prop.');
    }
    let resolvedUrl = null;
    if (!isSSR(ctx)) {
        const wordPressNodeParams = (_a = ctx.params) === null || _a === void 0 ? void 0 : _a.wordpressNode;
        if (wordPressNodeParams && Array.isArray(wordPressNodeParams)) {
            resolvedUrl = `/${wordPressNodeParams.join('/')}`;
        }
        else {
            resolvedUrl = '/';
        }
    }
    else {
        resolvedUrl = ctx.req.url;
    }
    if (!resolvedUrl) {
        return {
            notFound: true,
        };
    }
    const seedQuery = index_js_2.hooks.applyFilters('seedQueryDocumentNode', seedQuery_js_1.SEED_QUERY, {
        resolvedUrl,
    });
    const seedQueryRes = await client.query({
        query: seedQuery,
        variables: { uri: resolvedUrl },
    });
    const seedNode = (_b = seedQueryRes === null || seedQueryRes === void 0 ? void 0 : seedQueryRes.data) === null || _b === void 0 ? void 0 : _b.node;
    if (!seedNode) {
        return {
            notFound: true,
        };
    }
    const template = (0, getTemplate_js_1.getTemplate)(seedNode, templates);
    if (!template) {
        return {
            notFound: true,
        };
    }
    if (template.query) {
        await client.query({
            query: template.query,
            variables: (template === null || template === void 0 ? void 0 : template.variables) ? template.variables(seedNode) : undefined,
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (0, client_js_1.addApolloState)(client, {
        props: {
            __SEED_NODE__: seedNode,
        },
    });
}
exports.getWordPressProps = getWordPressProps;
