/** @type {import('postcss-load-config').Config} */

import { getConfig } from "reshaped/config/postcss";

const config = {
	plugins: {
		...getConfig({
			themeMediaCSSPath: "./node_modules/reshaped/dist/cjs/themes/reshaped/media.css",
		}).plugins,
		tailwindcss: {},
		autoprefixer: {},
	},
};

export default config;
