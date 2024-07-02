import type { ReactNode } from "react";
import { Container, View } from "reshaped";

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<Container width={130}>
			<View gap={8} paddingTop={16}>
				{children}
			</View>
		</Container>
	);
}
