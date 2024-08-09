"use client";

import Link from "next/link";
import { Text, View } from "reshaped";

export function NavBarLeft() {
	return (
		<View direction="row" gap={2}>
			<Link href="/">
				<Text variant="body-3" weight="bold">
					Trellex
				</Text>
			</Link>
			<Text variant="body-3">a Next.js demo</Text>
		</View>
	);
}
