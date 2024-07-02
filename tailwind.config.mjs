import { getTheme } from "reshaped/config/tailwind";

module.exports = {
	content: ["./app/**/*.{js,jsx,ts,tsx}", "./lib/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			...getTheme(),
			outlineColor: getTheme().borderColor,
		},
	},
};
