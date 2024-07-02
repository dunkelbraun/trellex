"use client";

import type { Column } from "@prisma/client";
import { createContext } from "react";
import type { AddOptimisticAction, BoardWithColumnsAndItems } from "./board";

export interface BoardProvider {
	board?: BoardWithColumnsAndItems;
	addOptimistic: AddOptimisticAction;
}

export const BoardProvider = createContext<BoardProvider>({
	addOptimistic: () => {},
});

interface ColumnProvider extends Column {
	nextItemOrder: number;
}

export const ColumnProvider = createContext<ColumnProvider>({
	id: "",
	name: "",
	boardId: 0,
	order: 0,
	nextItemOrder: 0,
});
