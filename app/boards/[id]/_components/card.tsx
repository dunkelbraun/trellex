"use client";

import { Text } from "@components/text";
import { TrashIcon } from "@heroicons/react/24/outline";
import type { Item } from "@prisma/client";
import { useContext, useState, type DragEvent } from "react";
import { Button, View } from "reshaped";
import { CONTENT_TYPES, DraggableItemProvider } from "../_lib/dnd";
import { BoardProvider } from "../_lib/providers";
import { deleteItem } from "../actions";

export function ColumnCard({
	item,
	previousOrder,
	nextOrder,
}: {
	item: Item;
	previousOrder: number;
	nextOrder: number;
}) {
	const draggableProvider = useContext(DraggableItemProvider);
	const board = useContext(BoardProvider);
	let [acceptDrop, setAcceptDrop] = useState<"none" | "top" | "bottom">("none");

	return (
		<View
			as="li"
			className="hover:cursor-grab active:cursor-grabbing -mt-[16px] first:-mt-[0px]"
			key={item.id}
			attributes={{
				onDragOver: (event: DragEvent<HTMLDivElement>) => {
					if (event.dataTransfer.types.includes(CONTENT_TYPES.card)) {
						event.stopPropagation();
						event.preventDefault();
						let rect = event.currentTarget.getBoundingClientRect();
						let midpoint = (rect.top + rect.bottom) / 2;
						setAcceptDrop(event.clientY <= midpoint ? "top" : "bottom");
					}
				},
				onDragLeave: (event: DragEvent<HTMLElement>) => {
					event.stopPropagation();
					setAcceptDrop("none");
				},
				onDrop: (event: DragEvent<HTMLDivElement>) => {
					let droppedOrder = acceptDrop === "top" ? previousOrder : nextOrder;
					draggableProvider.order = `${(droppedOrder + item.order) / 2}`;
					setAcceptDrop("none");
				},
			}}
		>
			<View>
				<DropAreaIndicator position="top" acceptDrop={acceptDrop} />
				<View paddingInline={3}>
					<View
						borderRadius="medium"
						borderColor="neutral"
						backgroundColor="page"
						shadow="raised"
						className="translate-x-0 translate-y-0"
						attributes={{
							draggable: true,
							onDragStart: (event: DragEvent<HTMLElement>) => {
								event.dataTransfer.effectAllowed = "move";
								event.dataTransfer.dropEffect = "move";
								event.dataTransfer.setData(
									CONTENT_TYPES.card,
									JSON.stringify({
										id: item.id,
										title: item.title,
										columnId: item.columnId,
										order: item.order,
										boardId: item.boardId,
										content: item.content,
									}),
								);
								draggableProvider.itemId = item.id;
								draggableProvider.fromColumn = item.columnId;
							},
						}}
					>
						<View
							direction="row"
							align="center"
							justify="space-between"
							padding={2}
							paddingStart={4}
						>
							<View grow>
								<Text as="h3" variant="body-3" maxLines={4}>
									{item.title}
								</Text>
							</View>
							<form
								action={async () => {
									board.addOptimistic({
										kind: "card",
										item: item,
										ops: [{ columnId: item.columnId, type: "remove" }],
									});
									await deleteItem(item);
								}}
							>
								<Button
									type="submit"
									variant="ghost"
									icon={<TrashIcon />}
									attributes={{
										tabIndex: 0,
										"aria-label": "Delete card",
									}}
								/>
							</form>
						</View>
					</View>
				</View>
				<DropAreaIndicator position="bottom" acceptDrop={acceptDrop} />
			</View>
		</View>
	);
}

function DropAreaIndicator({
	position,
	acceptDrop,
}: {
	position: "top" | "bottom";
	acceptDrop: "top" | "bottom" | "none";
}) {
	return (
		<View paddingInline={1}>
			<View height="7px" />
			<View height="2px" {...(position === acceptDrop ? { backgroundColor: "critical" } : {})} />
			<View height="7px" />
		</View>
	);
}
