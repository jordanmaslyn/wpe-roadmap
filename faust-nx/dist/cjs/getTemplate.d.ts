import { WordPressTemplate } from './getWordPressProps.js';
import { SeedNode } from './queries/seedQuery.js';
export declare function getPossibleTemplates(node: SeedNode): string[];
export declare function getTemplate(seedNode: SeedNode, templates: {
    [key: string]: WordPressTemplate;
}): WordPressTemplate | null;
