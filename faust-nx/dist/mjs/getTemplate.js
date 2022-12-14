import { hooks } from './hooks/index.js';
export function getPossibleTemplates(node) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    let possibleTemplates = [];
    // CPT archive page
    // eslint-disable-next-line no-underscore-dangle
    if (node.__typename === 'ContentType' && node.isPostsPage === false) {
        if (node.name) {
            possibleTemplates.push(`archive-${node.name}`);
        }
        possibleTemplates.push('archive');
    }
    // Archive Page
    if (node.isTermNode) {
        const { taxonomyName } = node;
        switch (taxonomyName) {
            case 'category': {
                if (node.slug) {
                    possibleTemplates.push(`category-${node.slug}`);
                }
                if (node.databaseId) {
                    possibleTemplates.push(`category-${node.databaseId}`);
                }
                possibleTemplates.push(`category`);
                break;
            }
            case 'post_tag': {
                if (node.slug) {
                    possibleTemplates.push(`tag-${node.slug}`);
                }
                if (node.databaseId) {
                    possibleTemplates.push(`tag-${node.databaseId}`);
                }
                possibleTemplates.push(`tag`);
                break;
            }
            default: {
                if (taxonomyName) {
                    if (node.slug) {
                        possibleTemplates.push(`taxonomy-${taxonomyName}-${node.slug}`);
                    }
                    if (node.databaseId) {
                        possibleTemplates.push(`taxonomy-${taxonomyName}-${node.databaseId}`);
                    }
                    possibleTemplates.push(`taxonomy-${taxonomyName}`);
                }
                possibleTemplates.push(`taxonomy`);
            }
        }
        possibleTemplates.push(`archive`);
    }
    if (node.userId) {
        if (node.name) {
            possibleTemplates.push(`author-${node.name}`);
        }
        possibleTemplates.push(`author-${node.userId}`);
        possibleTemplates.push(`author`);
        possibleTemplates.push(`archive`);
    }
    // Singular page
    if (node.isContentNode) {
        if (((_b = (_a = node === null || node === void 0 ? void 0 : node.contentType) === null || _a === void 0 ? void 0 : _a.node) === null || _b === void 0 ? void 0 : _b.name) !== 'page' &&
            ((_d = (_c = node === null || node === void 0 ? void 0 : node.contentType) === null || _c === void 0 ? void 0 : _c.node) === null || _d === void 0 ? void 0 : _d.name) !== 'post') {
            if (((_f = (_e = node.contentType) === null || _e === void 0 ? void 0 : _e.node) === null || _f === void 0 ? void 0 : _f.name) && node.slug) {
                possibleTemplates.push(`single-${(_h = (_g = node.contentType) === null || _g === void 0 ? void 0 : _g.node) === null || _h === void 0 ? void 0 : _h.name}-${node.slug}`);
            }
            if ((_k = (_j = node.contentType) === null || _j === void 0 ? void 0 : _j.node) === null || _k === void 0 ? void 0 : _k.name) {
                possibleTemplates.push(`single-${(_m = (_l = node.contentType) === null || _l === void 0 ? void 0 : _l.node) === null || _m === void 0 ? void 0 : _m.name}`);
            }
        }
        if (((_p = (_o = node === null || node === void 0 ? void 0 : node.contentType) === null || _o === void 0 ? void 0 : _o.node) === null || _p === void 0 ? void 0 : _p.name) === 'page') {
            if (node.slug) {
                possibleTemplates.push(`page-${node.slug}`);
            }
            if (node.databaseId) {
                possibleTemplates.push(`page-${node.databaseId}`);
            }
            possibleTemplates.push(`page`);
        }
        if (((_r = (_q = node === null || node === void 0 ? void 0 : node.contentType) === null || _q === void 0 ? void 0 : _q.node) === null || _r === void 0 ? void 0 : _r.name) === 'post') {
            if (node.slug) {
                possibleTemplates.push(`single-${node.contentType.node.name}-${node.slug}`);
            }
            possibleTemplates.push(`single-${node.contentType.node.name}`);
            possibleTemplates.push(`single`);
        }
        possibleTemplates.push(`singular`);
    }
    possibleTemplates.push('index');
    possibleTemplates = hooks.applyFilters('possibleTemplatesList', possibleTemplates, { seedNode: node });
    return possibleTemplates;
}
export function getTemplate(seedNode, templates) {
    const possibleTemplates = getPossibleTemplates(seedNode);
    // eslint-disable-next-line no-console
    console.log('possible templates: ', possibleTemplates);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < possibleTemplates.length; i++) {
        const possibleTemplate = possibleTemplates[i];
        if (templates[possibleTemplate]) {
            return templates[possibleTemplate];
        }
    }
    return null;
}
