/** @type {import('postcss-load-config').Config} */

import reshaped from "reshaped/config/postcss";

const config = {
	plugins: {
		...reshaped.config.plugins,
		tailwindcss: {},
		autoprefixer: {},
	},
};

export default config;
