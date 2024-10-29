"use client";

import type { Board } from "@prisma/client";
import { useOptimistic } from "react";
import { Text, View } from "reshaped";
import { BoardCard } from "./board-card";

interface BoardProps {
	boards: Board[];
}

export interface OptimisticBoard extends Board {
	deleted?: boolean;
}

export function Boards({ boards }: BoardProps) {
	const [optimisticBoards, addOptimisticBoard] = useOptimistic(
		boards as OptimisticBoard[],
		(state: OptimisticBoard[], newBoard: OptimisticBoard) => [
			...state.filter((item) => item.id !== newBoard.id),
			newBoard,
		],
	);

	return (
		<View gap={4}>
			<View direction="column" gap={2} maxWidth={80}>
				<Text as="h2" variant="body-2" weight="bold">
					Boards
				</Text>
			</View>
			<View gap={4} direction={{ s: "column", m: "row" }}>
				{optimisticBoards
					.filter((board) => board.deleted !== true)
					.map((board) => (
						<BoardCard
							key={board.id}
							board={board}
							optimisticBoardDelete={(board: OptimisticBoard) => {
								board.deleted = true;
								addOptimisticBoard(board);
							}}
						/>
					))}
			</View>
		</View>
	);
}
