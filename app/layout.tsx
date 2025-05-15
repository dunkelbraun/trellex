import "@styles/base.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Divider, Reshaped, View } from "reshaped";
import "reshaped/themes/reshaped/theme.css";
import { NavBar } from "./_components/nav-bar";
import type { ReactNode } from "react";

export const metadata: Metadata = {
	title: "Trellex",
	description: "Trellex, a Next.js demo",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" data-rs-theme="reshaped" data-rs-color-mode="light">
			<body>
				<Reshaped theme="reshaped">
					<View direction="column" height="100vh">
						<header>
							<NavBar />
							<View backgroundColor="neutral-faded">
								<Divider />
							</View>
						</header>
						<View as="main" height="100%" minHeight="0px" grow>
							{children}
							<SpeedInsights />
							<Analytics />
						</View>
					</View>
				</Reshaped>
			</body>
		</html>
	);
}
