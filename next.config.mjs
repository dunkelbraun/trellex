/** @type {import('next').NextConfig} */

const nextConfig = {
	transpilePackages: ["reshaped"],
	experimental: {
		reactCompiler: true,
		optimizePackageImports: ["reshaped"],
	},
};

export default nextConfig;
