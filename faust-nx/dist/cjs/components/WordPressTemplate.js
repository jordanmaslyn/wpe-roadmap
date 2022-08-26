"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordPressTemplate = void 0;
const react_1 = __importDefault(require("react"));
const client_1 = require("@apollo/client");
const getTemplate_js_1 = require("../getTemplate.js");
const index_js_1 = require("../config/index.js");
function WordPressTemplate(props) {
    const { templates } = (0, index_js_1.getConfig)();
    if (!templates) {
        throw new Error('Templates are required. Please add them to your config.');
    }
    const { __SEED_NODE__: seedNode } = props;
    const template = (0, getTemplate_js_1.getTemplate)(seedNode, templates);
    /**
     * This code block exists above the !template conditional
     * as React Hooks can not be behind conditionals
     */
    const res = (0, client_1.useQuery)(template === null || template === void 0 ? void 0 : template.query, {
        variables: (template === null || template === void 0 ? void 0 : template.variables) ? template === null || template === void 0 ? void 0 : template.variables(seedNode) : undefined,
        ssr: true,
        skip: !(template === null || template === void 0 ? void 0 : template.query),
    });
    if (!template) {
        console.error('No template found');
        return null;
    }
    const { Component } = template;
    const { data, error, loading } = res !== null && res !== void 0 ? res : {};
    return react_1.default.cloneElement(react_1.default.createElement(Component, null), Object.assign(Object.assign({}, props), { data, error, loading }), null);
}
exports.WordPressTemplate = WordPressTemplate;
