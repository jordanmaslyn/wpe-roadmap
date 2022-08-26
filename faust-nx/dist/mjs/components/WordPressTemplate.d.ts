import React, { PropsWithChildren } from 'react';
import { SeedNode } from '../queries/seedQuery.js';
export declare type WordPressTemplateProps = PropsWithChildren<{
    __SEED_NODE__: SeedNode;
}>;
export declare function WordPressTemplate(props: WordPressTemplateProps): React.FunctionComponentElement<any> | null;
