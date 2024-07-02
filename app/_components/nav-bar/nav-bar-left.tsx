"use client";

import { Link, Text, View } from "reshaped";

export function NavBarLeft() {
	return (
		<View direction="row" gap={2}>
			<Link variant="plain" href="/home" color="inherit">
				<Text variant="body-3" weight="bold">
					Trellex
				</Text>
			</Link>
			<Text variant="body-3">a Next.js demo</Text>
		</View>
	);
}
