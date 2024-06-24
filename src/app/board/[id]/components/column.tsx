"use client";

import { PlusIcon } from "@heroicons/react/16/solid";
import { useOptimistic, useRef, useState } from "react";
import { EditableText } from "../../../components/editable-text";
import { useScroller } from "../../../hooks/scroller";
import type { RenderedItem } from "../item";
import { updateColumnName } from "../queries";
import { CONTENT_TYPES, type BoardColumn } from "../types";
import { AddCard } from "./add-card";
import { Card } from "./card";
import { MoveCard, updateMoveCardForm } from "./move-card";

interface ColumnProps {
	column: BoardColumn;
}

export function Column({ column }: ColumnProps) {
	const [acceptDrop, setAcceptDrop] = useState(false);
	const [edit, setEdit] = useState(false);
	const columnRef = useRef<HTMLDivElement>(null);
	const moveCardFormRef = useRef<HTMLFormElement>(null);
	const [optimisticItems, addOptimisticItem] = useOptimisticItems(column.items);
	const listRef = useScroller<HTMLUListElement>({
		behavior: "instant",
		direction: "bottom",
		condition: (record) =>
			record.length === 1 && record[0].addedNodes.length === 1 && record[0].nextSibling === null,
	});

	return (
		<div
			className={
				"flex-shrink-0 flex flex-col overflow-hidden max-h-full w-80 border-slate-400 rounded-xl shadow-sm shadow-slate-400 bg-slate-100 " +
				(acceptDrop ? `outline outline-2 outline-brand-red` : ``)
			}
			ref={columnRef}
			onDragOver={(event) => {
				if (column.items.length === 0 && event.dataTransfer.types.includes(CONTENT_TYPES.card)) {
					event.preventDefault();
					setAcceptDrop(true);
				}
			}}
			onDragLeave={() => setAcceptDrop(false)}
			onDrop={(event) => {
				if (column.items.length === 0) {
					updateMoveCardForm(event, column.boardId, column.id, 1, moveCardFormRef.current!);
					moveCardFormRef.current!.requestSubmit();
				}
				setAcceptDrop(false);
			}}
		>
			<div className="p-2">
				<EditableText
					initialName={column.name}
					fieldName="name"
					id={column.id}
					inputLabel="Edit column name"
					buttonLabel={`Edit column "${column.name}" name`}
					action={updateColumnName}
					inputClassName="border border-slate-400 w-full rounded-lg py-1 px-2 font-medium text-black"
					buttonClassName="block rounded-lg text-left w-full border border-transparent py-1 px-2 font-medium text-slate-600"
				/>
			</div>

			<MoveCard
				ref={moveCardFormRef}
				boardId={column.boardId}
				optimisticUpdate={addOptimisticItem}
			/>
			<ul ref={listRef} className="flex-grow overflow-auto min-h-[2px]">
				{optimisticItems
					.filter(
						(item) =>
							(item.status ?? "created") !== "deleted" && (item.status ?? "created") !== "moved",
					)
					.map((item, index, items) => (
						<Card
							columnRef={columnRef}
							item={item}
							key={item.id}
							previousOrder={optimisticItems[index - 1] ? optimisticItems[index - 1].order : 0}
							nextOrder={
								optimisticItems[index + 1] ? optimisticItems[index + 1].order : item.order + 1
							}
							optimisticUpdate={addOptimisticItem}
						/>
					))}
			</ul>
			{edit ? (
				<AddCard
					columnId={column.id}
					order={
						optimisticItems.length === 0 ? 1 : optimisticItems[optimisticItems.length - 1].order + 1
					}
					boardId={column.boardId}
					optimisticUpdate={addOptimisticItem}
					setEdit={setEdit}
				/>
			) : (
				<div className="p-2 pt-1">
					<button
						className="flex items-center gap-2 rounded-lg text-left w-full p-2 font-medium text-slate-500 hover:bg-slate-200 focus:bg-slate-200"
						onClick={() => setEdit(true)}
					>
						<PlusIcon height={20} width={20} /> Add a card
					</button>
				</div>
			)}
		</div>
	);
}

function useOptimisticItems(items: RenderedItem[]) {
	const [optimisticItems, addOptimisticItem] = useOptimistic(
		items.sort((a, b) => a.order - b.order),
		(state: RenderedItem[], newItem: RenderedItem) => {
			return [...state.filter((item) => item.id !== newItem.id), newItem].sort(
				(a, b) => a.order - b.order,
			);
		},
	);
	const optimisticUpdate = (item: RenderedItem, status?: RenderedItem["status"]) => {
		addOptimisticItem(status === undefined ? item : { ...item, status });
	};
	return [optimisticItems, optimisticUpdate] as const;
}
