/** @type {import('next').NextConfig} */

const nextConfig = {
	transpilePackages: ["reshaped"],
	experimental: {
		typedRoutes: true,
		reactCompiler: true,
		optimizePackageImports: ["reshaped"],
	},
};

export default nextConfig;
