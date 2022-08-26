import React from 'react';
import { useQuery } from '@apollo/client';
import { getTemplate } from '../getTemplate.js';
import { getConfig } from '../config/index.js';
export function WordPressTemplate(props) {
    const { templates } = getConfig();
    if (!templates) {
        throw new Error('Templates are required. Please add them to your config.');
    }
    const { __SEED_NODE__: seedNode } = props;
    const template = getTemplate(seedNode, templates);
    /**
     * This code block exists above the !template conditional
     * as React Hooks can not be behind conditionals
     */
    const res = useQuery(template === null || template === void 0 ? void 0 : template.query, {
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
    return React.cloneElement(React.createElement(Component, null), Object.assign(Object.assign({}, props), { data, error, loading }), null);
}
