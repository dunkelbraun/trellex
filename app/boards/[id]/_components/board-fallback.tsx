import { Skeleton, View } from "reshaped";

export function BoardFallBack() {
	return (
		<View direction="column" height="100%" gap={4} paddingBlock={8} paddingStart={8}>
			<View padding={2.5}>
				<Skeleton width={40} height={8} />
			</View>
			<View
				gap={4}
				borderRadius="medium"
				borderColor="neutral-faded"
				shadow="raised"
				direction="row"
				wrap={false}
				align="start"
				width={88}
			>
				<View padding={4} gap={4}>
					<Skeleton height={12} width={80} />
					<View gap={4}>
						<Skeleton />
						<Skeleton />
					</View>
					<Skeleton height={8} width={80} />
				</View>
			</View>
		</View>
	);
}
