import { Suspense } from "react";
import { Text, View } from "reshaped";
import { TrellexLink, TrellexLinkFallBack } from "./trellex-link";

export function NavBarLeft({ userId }: { userId: Promise<string | undefined> }) {
	return (
		<View direction="row" gap={2}>
			<Suspense fallback={<TrellexLinkFallBack />}>
				<TrellexLink userId={userId} />
			</Suspense>
			<Text variant="body-3">a Next.js demo</Text>
		</View>
	);
}
