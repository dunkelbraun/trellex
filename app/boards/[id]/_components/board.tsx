"use client";

import { EditableText } from "@components/editable-text";
import { Text } from "@components/text";
import { useScroller } from "@hooks/scroller";
import { notFound } from "next/navigation";
import { startTransition, use, useRef, type DragEvent } from "react";
import { View } from "reshaped";
import { useOptimisticBoard, type BoardWithColumnsAndItems } from "../_lib/board";
import { CONTENT_TYPES, DraggableItem, DraggableItemProvider } from "../_lib/dnd";
import { itemSchema } from "../_lib/item";
import { BoardProvider } from "../_lib/providers";
import { createColumnItem, updateBoardName } from "../actions";
import { Column } from "./column";
import { NewColumn } from "./new-column";

export function Board({ board: boardData }: { board: Promise<BoardWithColumnsAndItems | null> }) {
	const board = use(boardData);
	if (board == null) {
		notFound();
	}
	const { optimisticBoard, addOptimistic } = useOptimisticBoard(board);
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const scrollMutationRef = useScroller<HTMLDivElement>({
		behavior: "instant",
		direction: "right",
		refToScroll: scrollContainerRef,
		condition: (record) => {
			if (record.length === 1) return true;
			return record[1].addedNodes[0].nodeName === "BUTTON" ? false : true;
		},
	});

	const draggableItem = new DraggableItem();

	return (
		<DraggableItemProvider value={draggableItem}>
			<BoardProvider value={{ board, addOptimistic: addOptimistic }}>
				<View
					direction="column"
					height="100%"
					className={`bg-[${board.color}]`}
					attributes={{
						style: {
							backgroundColor: board.color,
						},
						onDrop: async (event: DragEvent<HTMLDivElement>) => {
							event.stopPropagation();
							event.preventDefault();
							const transferData = itemSchema.safeParse(
								JSON.parse(event.dataTransfer.getData(CONTENT_TYPES.card)),
							);
							if (transferData.success) {
								transferData.data.order = parseFloat(draggableItem.order ?? "0");
								transferData.data.columnId = draggableItem.toColumn;
								startTransition(() => {
									addOptimistic({
										kind: "card",
										item: transferData.data,
										ops: [
											{ columnId: draggableItem.toColumn, type: "add" },
											...(draggableItem.fromColumn !== draggableItem.toColumn
												? [
														{
															columnId: draggableItem.fromColumn,
															type: "remove" as const,
														},
													]
												: []),
										],
									});
								});
								await createColumnItem(transferData.data);
							}
						},
					}}
				>
					<View
						minHeight="100%"
						maxHeight="100%"
						direction="column"
						grow={false}
						className="overflow-x-scroll overflow-y-hidden"
						paddingBlock={8}
						paddingStart={8}
						gap={4}
						attributes={{
							ref: scrollContainerRef,
						}}
					>
						<Text as="h1" variant="body-1" weight="bold">
							<EditableText
								text={board.name}
								input={{ name: "name", id: board.id, label: "Edit board name" }}
								buttonLabel={`Edit board "${board.name}" name`}
								action={updateBoardName}
							/>
						</Text>
						<View
							gap={4}
							direction="row"
							wrap={false}
							align="start"
							width="100%"
							minHeight="0px"
							height="100%"
							grow
							attributes={{
								ref: scrollMutationRef,
							}}
						>
							{optimisticBoard.columns.map((col) => (
								<Column key={col.id} column={col}></Column>
							))}
							<NewColumn />
							<View width={6} height={1} />
						</View>
					</View>
				</View>
			</BoardProvider>
		</DraggableItemProvider>
	);
}
