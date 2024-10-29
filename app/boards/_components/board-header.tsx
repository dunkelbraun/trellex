import { Text, View } from "reshaped";

export function BoardHeader() {
	return (
		<View direction="column" gap={2} maxWidth={80}>
			<Text as="h2" variant="body-2" weight="bold">
				Boards
			</Text>
		</View>
	);
}
