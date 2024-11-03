import { sessionUserId } from "@lib/session";
import "@styles/base.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import { Divider, Reshaped, Skeleton, View } from "reshaped";
import "reshaped/themes/reshaped/theme.css";
import { NavBarLeft } from "./_components/nav-bar/nav-bar-left";
import { NavBarRight } from "./_components/nav-bar/nav-bar-right";

export const metadata: Metadata = {
	title: "Trellex",
	description: "Trellex, a Next.js demo",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="en" data-rs-theme="reshaped" data-rs-color-mode="light">
			<body>
				<Reshaped theme="reshaped">
					<View direction="column" height="100vh">
						<header>
							<View
								direction="row"
								align="center"
								justify="space-between"
								paddingInline={4}
								paddingBlock={1}
							>
								<NavBarLeft userId={sessionUserId()} />
								<Suspense fallback={<Skeleton height={6} width={20} />}>
									<NavBarRight userId={sessionUserId()} />
								</Suspense>
							</View>
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
