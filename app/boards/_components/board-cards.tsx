"use client";

import type { Board } from "@prisma/client";
import { use, useOptimistic } from "react";
import { View } from "reshaped";
import { BoardCard } from "./board-card";

interface BoardCardProps {
	boards: Promise<Board[]>;
}

export interface OptimisticBoard extends Board {
	deleted?: boolean;
}

export function BoardCards({ boards }: BoardCardProps) {
	const [optimisticBoards, addOptimisticBoard] = useOptimistic(
		use(boards) as OptimisticBoard[],
		(state: OptimisticBoard[], newBoard: OptimisticBoard) => [
			...state.filter((item) => item.id !== newBoard.id),
			newBoard,
		],
	);

	return (
		<View gap={4} direction={{ s: "column", m: "row" }}>
			{optimisticBoards
				.filter((board) => board.deleted !== true)
				.map((board) => (
					<BoardCard
						key={board.id}
						board={board}
						optimisticBoardDeleteAction={(board: OptimisticBoard) => {
							board.deleted = true;
							addOptimisticBoard(board);
						}}
					/>
				))}
		</View>
	);
}
