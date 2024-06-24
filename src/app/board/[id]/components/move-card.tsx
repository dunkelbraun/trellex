"use client";

import type { DragEvent } from "react";
import { createColumnItem } from "../actions";
import { itemSchema, parseItemForm, type RenderedItem } from "../item";
import { CONTENT_TYPES, type MoveCardFormElements } from "../types";

interface MoveCardProps {
	boardId: number;
	optimisticUpdate: (item: RenderedItem, status?: RenderedItem["status"]) => void;
	ref: React.ForwardedRef<HTMLFormElement>;
}

export function MoveCard({ boardId, optimisticUpdate, ref }: MoveCardProps) {
	return (
		<form
			ref={ref}
			action={async (form) => {
				const card = parseItemForm(form);
				optimisticUpdate(card);
				await createColumnItem(card);
			}}
		>
			<input type="hidden" name="id" value="" />
			<input type="hidden" name="boardId" value={boardId} />
			<input type="hidden" name="columnId" value="" />
			<input type="hidden" name="order" value="" />
			<input type="hidden" name="title" value="" />
			<input type="hidden" name="content" value="" />
		</form>
	);
}

export function updateMoveCardForm(
	event: DragEvent<HTMLDivElement>,
	boardId: number,
	columnId: string,
	order: number,
	form: HTMLFormElement,
) {
	let transfer = JSON.parse(event.dataTransfer.getData(CONTENT_TYPES.card));
	const card = itemSchema.parse({ ...transfer, boardId });
	const inputs = form.elements as MoveCardFormElements;
	inputs.columnId.value = columnId;
	inputs.title.value = card.title;
	inputs.id.value = card.id;
	inputs.order.value = card.order.toString();
	inputs.order.value = order.toString();
}
