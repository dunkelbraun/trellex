"use client";

import Link from "next/link";
import { Text, View } from "reshaped";

export function NavBarLeft({ isLoggedIn }: { isLoggedIn: boolean }) {
	return (
		<View direction="row" gap={2}>
			<Link href={isLoggedIn ? "/boards" : "/"} prefetch={true}>
				<Text variant="body-3" weight="bold">
					Trellex
				</Text>
			</Link>
			<Text variant="body-3">a Next.js demo</Text>
		</View>
	);
}
