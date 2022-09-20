import { setConfig } from "./faust-nx/dist/mjs";
import templates from "./wp-templates";

/**
 * @type {import('faust-nx').FaustNXConfig}
 **/
export default setConfig({
  templates,
  experimentalPlugins: [],
});
