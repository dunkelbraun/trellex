import { Skeleton, Text, View } from "reshaped";

export function BoardCardSkeleton() {
	return (
		<View gap={4}>
			<View direction="column" gap={2} maxWidth={80}>
				<Text as="h2" variant="body-2" weight="bold">
					Boards
				</Text>
			</View>
			<View shadow="raised" width={{ s: undefined, m: 60 }} grow={{ s: true, m: false }}>
				<View paddingBottom={8}>
					<View
						direction="row"
						justify="space-between"
						align="center"
						gap={4}
						padding={4}
						paddingBottom={4}
						wrap={false}
					>
						<View grow paddingBlock={2}>
							<Skeleton borderRadius="small" />
						</View>
						<Skeleton width={5} height={5} />
					</View>
				</View>
				<View height={6} grow>
					<Skeleton height={6} />
				</View>
			</View>
		</View>
	);
}
