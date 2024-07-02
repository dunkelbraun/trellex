import type { Board, Column, Item } from "@prisma/client";
import { useOptimistic } from "react";
import type { ColumnWithItems } from "./column";
export type BoardWithColumnsAndItems = Board & { columns: (Column & { items: Item[] })[] };

interface AddOptimisticItem {
	kind: "card";
	item: Item;
	ops: { columnId: string; type: "add" | "remove" }[];
}

interface AddOptimisticColumn {
	kind: "column";
	item: ColumnWithItems;
}

export type AddOptimisticAction = (action: AddOptimisticItem | AddOptimisticColumn) => void;

export function useOptimisticBoard(board: BoardWithColumnsAndItems) {
	const [optimisticBoard, addOptimistic] = useOptimistic(
		board,
		(state: BoardWithColumnsAndItems, newItem: AddOptimisticItem | AddOptimisticColumn) => {
			switch (newItem.kind) {
				case "column":
					return {
						...state,
						columns: [
							...state.columns.filter((col) => col.id !== newItem.item.id),
							newItem.item,
						].sort((a, b) => a.order - b.order),
					};
				case "card":
					const addTo = newItem.ops.find((op) => op.type === "add")?.columnId;
					const removeFrom = newItem.ops.find((op) => op.type === "remove")?.columnId;
					const newColumns = state.columns.reduce(
						(acc, col) => {
							switch (col.id) {
								case removeFrom:
									acc.push({
										...col,
										items: col.items.filter((item) => item.id !== newItem.item.id),
									});
									return acc;
								case addTo:
									acc.push({
										...col,
										items: [
											...col.items.filter((item) => item.id !== newItem.item.id),
											newItem.item,
										],
									});
									return acc;
								default:
									acc.push(col);
									return acc;
							}
							return acc;
						},
						[] as BoardWithColumnsAndItems["columns"],
					);
					return { ...state, columns: newColumns };
			}
		},
	);
	return { optimisticBoard, addOptimistic };
}
