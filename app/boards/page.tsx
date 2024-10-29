"use server";

import { ensureUser } from "@lib/user";
import { Suspense } from "react";
import { View } from "reshaped";
import { BoardCardSkeleton } from "./_components/board-card-skeleton";
import { BoardCards } from "./_components/board-cards";
import { BoardHeader } from "./_components/board-header";
import { NewBoard } from "./_components/new-board";
import { getHomeData } from "./_lib/queries";

export default async function Page() {
	const user = await ensureUser();

	return (
		<View padding={4} gap={12}>
			<NewBoard />
			<Suspense fallback={<BoardCardSkeleton />}>
				<View gap={4}>
					<BoardHeader />
					<BoardCards boards={getHomeData(user.id)} />
				</View>
			</Suspense>
		</View>
	);
}
