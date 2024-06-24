"use client";

import { useOptimistic, useRef } from "react";
import { EditableText } from "../../../components/editable-text";
import { useScroller } from "../../../hooks/scroller";
import { updateBoardName, type getBoardData } from "../queries";
import type { BoardColumn } from "../types";
import { Column } from "./column";
import { NewColumn } from "./new-column";

interface BoardProps {
	board: NonNullable<Awaited<ReturnType<typeof getBoardData>>>;
}

export function Board({ board }: BoardProps) {
	const [optimisticColumns, addOptimisticColumn] = useOptimistic(
		board.columns,
		(state: BoardColumn[], newColumn: BoardColumn) => [...state, newColumn],
	);

	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const columnsRef = useScroller<HTMLDivElement>({
		behavior: "instant",
		direction: "right",
		condition: (record) => {
			return record.length === 1 && record[0].addedNodes.length === 1;
		},
		refToScroll: scrollContainerRef,
	});

	return (
		<div
			className="h-full min-h-0 flex flex-col overflow-x-scroll pr-8"
			style={{ backgroundColor: board.color }}
			ref={scrollContainerRef}
		>
			<h1>
				<EditableText
					initialName={board.name}
					fieldName="name"
					id={board.id}
					buttonLabel={`Edit board "${board.name}" name`}
					inputLabel="Edit board name"
					action={updateBoardName}
					inputClassName="mx-8 my-4 text-2xl font-medium border border-slate-400 rounded-lg py-1 px-2 text-black"
					buttonClassName="mx-8 my-4 text-2xl font-medium block rounded-lg text-left border border-transparent py-1 px-2 text-slate-800"
				/>
			</h1>

			<div ref={columnsRef} className="flex flex-grow min-h-0 h-full items-start gap-4 px-8 pb-4">
				{optimisticColumns.map((col) => {
					return <Column key={col.id} column={col}></Column>;
				})}
				<NewColumn
					order={board.columns.length + 1}
					boardId={board.id}
					optimisticAdd={addOptimisticColumn}
					editInitially={board.columns.length === 0}
				/>
			</div>
		</div>
	);
}
