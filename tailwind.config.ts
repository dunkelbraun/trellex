import forms from "@tailwindcss/forms";
import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	plugins: [forms({ strategy: "class" })],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter var", ...defaultTheme.fontFamily.sans],
			},
		},
		colors: {
			...colors,
			brand: {
				red: "#f44250",
				yellow: "#fecc1b",
				green: "#6bd968",
				aqua: "#3defe9",
				blue: "#3992ff",
				pink: "#d83bd2",
			},
		},
	},
};
export default config;
