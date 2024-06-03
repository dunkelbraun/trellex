"use server";

import { getSession } from "../session/session";
import { Board } from "./board";
import { getHomeData } from "./queries";

export async function Boards() {
	const userId = (await getSession()).userId!;
	let boards = await getHomeData(userId);
	return (
		<div className="p-8">
			<h2 className="font-bold mb-2 text-xl">Boards</h2>
			<nav className="flex flex-wrap gap-8">
				{boards.map((board) => (
					<Board
						key={board.id}
						name={board.name}
						id={board.id}
						color={board.color}
					/>
				))}
			</nav>
		</div>
	);
}
