"use server";

import { ensureUser } from "@lib/user";
import { View } from "reshaped";
import { Boards } from "./_components/boards";
import { NewBoard } from "./_components/new-board";
import { getHomeData } from "./_lib/queries";

export default async function Page() {
	const user = await ensureUser();
	let boards = await getHomeData(user.id);
	return (
		<View padding={4} gap={12}>
			<NewBoard />
			<Boards boards={boards} />
		</View>
	);
}
