import { WordPressTemplate } from '../getWordPressProps.js';
import { Plugin } from '../hooks/index.js';
export interface FaustNXConfig {
    templates: {
        [key: string]: WordPressTemplate;
    };
    disableLogging: boolean;
    loginPagePath?: string;
    experimentalPlugins: Plugin[];
}
export declare function setConfig(_config: FaustNXConfig): void;
export declare function getConfig(): Partial<FaustNXConfig>;
