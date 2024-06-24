"use client";

import { startTransition, useRef, useState, type DragEvent, type RefObject } from "react";
import { outsideRect } from "../../../utils";
import { itemSchema, type RenderedItem } from "../item";
import { CONTENT_TYPES, type MoveCardFormElements } from "../types";
import { DeleteCard } from "./delete-card";
import { MoveCard } from "./move-card";

interface CardProps {
	nextOrder: number;
	previousOrder: number;
	item: RenderedItem;
	optimisticUpdate: (item: RenderedItem, status?: RenderedItem["status"]) => void;
	columnRef: RefObject<HTMLDivElement>;
}

export function Card({ nextOrder, previousOrder, item, optimisticUpdate, columnRef }: CardProps) {
	const [acceptDrop, setAcceptDrop] = useState<"none" | "top" | "bottom">("none");
	const moveCardFormRef = useRef<HTMLFormElement>(null);

	const moveCard = (event: DragEvent<HTMLLIElement>) => {
		event.preventDefault();
		const transferItem = itemSchema.parse(
			JSON.parse(event.dataTransfer.getData(CONTENT_TYPES.card)),
		);
		let droppedOrder = acceptDrop === "top" ? previousOrder : nextOrder;
		let moveOrder = (droppedOrder + item.order) / 2;
		const inputs = moveCardFormRef.current?.elements as MoveCardFormElements;
		inputs.columnId.value = item.columnId;
		inputs.order.value = moveOrder.toString();
		inputs.title.value = transferItem.title;
		inputs.id.value = transferItem.id;
		moveCardFormRef.current?.requestSubmit();
		setAcceptDrop("none");
	};

	return (
		<li
			className={
				"border-t-2 border-b-2 -mb-[2px] last:mb-0 cursor-grab active:cursor-grabbing px-2 py-1 " +
				(acceptDrop === "top"
					? "border-t-brand-red border-b-transparent"
					: acceptDrop === "bottom"
						? "border-b-brand-red border-t-transparent"
						: "border-t-transparent border-b-transparent")
			}
			onDragOver={(event) => {
				if (event.dataTransfer.types.includes(CONTENT_TYPES.card)) {
					event.preventDefault();
					event.stopPropagation();
					let rect = event.currentTarget.getBoundingClientRect();
					let midpoint = (rect.top + rect.bottom) / 2;
					setAcceptDrop(event.clientY <= midpoint ? "top" : "bottom");
				}
			}}
			onDragLeave={() => setAcceptDrop("none")}
			onDrop={moveCard}
		>
			<div
				draggable
				className="bg-white shadow shadow-slate-300 border-slate-300 text-sm rounded-lg w-full py-1 px-2 relative"
				onDragStart={(event) => setEventDataTransfer(event, item)}
				onDragEnd={(event) => {
					if (event.dataTransfer.dropEffect === "move") {
						const rect = columnRef.current!.getBoundingClientRect();
						const coords = { x: event.clientX, y: event.clientY };
						if (outsideRect({ rect, coords })) {
							startTransition(() => optimisticUpdate(item, "deleted"));
						}
					}
				}}
			>
				<h3>{item.title}</h3>
				<div className="mt-2">{item.content || <>&nbsp;</>}</div>
				<DeleteCard item={item} optimisticUpdate={optimisticUpdate} />
				<MoveCard
					ref={moveCardFormRef}
					boardId={item.boardId}
					optimisticUpdate={optimisticUpdate}
				/>
			</div>
		</li>
	);
}

function setEventDataTransfer(event: DragEvent<HTMLDivElement>, item: RenderedItem) {
	event.dataTransfer.effectAllowed = "move";
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
}
