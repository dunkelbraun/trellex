import { View } from "reshaped";
import { getHomeData } from "../_lib/queries";
import { Boards } from "./boards";
import { NewBoard } from "./new-board";

export async function UserHome({ userId }: { userId: string }) {
	let boards = await getHomeData(userId);

	return (
		<View padding={4} gap={12}>
			<NewBoard />
			<Boards boards={boards} />
		</View>
	);
}
