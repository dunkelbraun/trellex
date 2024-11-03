"use client";

import Link from "next/link";
import { use } from "react";
import { Text } from "reshaped";

export function TrellexLink({ userId }: { userId: Promise<string | undefined> }) {
	return (
		<Link href={use(userId) !== undefined ? "/boards" : "/"}>
			<Text variant="body-3" weight="bold">
				Trellex
			</Text>
		</Link>
	);
}

export function TrellexLinkFallBack() {
	return (
		<Text variant="body-3" weight="bold">
			Trellex
		</Text>
	);
}
