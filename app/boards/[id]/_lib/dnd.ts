import { createContext, type DragEvent, type DragEventHandler, type UIEvent } from "react";

export const CONTENT_TYPES = {
	card: "application/trellex-card",
};

export class DraggableItem {
	get itemId() {
		return localStorage.getItem("draggable-item-id") || "";
	}

	set itemId(itemId: string) {
		localStorage.setItem("draggable-item-id", itemId);
	}

	get fromColumn() {
		return localStorage.getItem("draggable-from-column-id") || "";
	}
	set fromColumn(columnId: string) {
		localStorage.setItem("draggable-from-column-id", columnId);
	}

	get toColumn() {
		return localStorage.getItem("draggable-to-column-id") || "";
	}
	set toColumn(columnId: string) {
		localStorage.setItem("draggable-to-column-id", columnId);
	}

	set order(order: string | undefined) {
		localStorage.setItem("draggable-order", order ?? "");
	}

	get order() {
		let order = localStorage.getItem("draggable-order");
		return order ? order : undefined;
	}

	clear() {
		this.itemId = "";
		this.fromColumn = "";
		this.toColumn = "";
		this.order = undefined;
	}
}

export const DraggableItemProvider = createContext<DraggableItem>(new DraggableItem());

export const onEventWithCardDrag =
	(handler: DragEventHandler<HTMLElement>) => (event: DragEvent<HTMLDivElement>) => {
		if (event.dataTransfer.types.includes(CONTENT_TYPES.card)) {
			handler(event);
		}
	};

export function enableButtonPointerEvents(event: UIEvent) {
	for (const button of event.currentTarget.getElementsByTagName("button")) {
		if (button.getAttribute("data-disabled-pointer-events") === "true") {
			button.removeAttribute("data-disabled-pointer-events");
			button.style.pointerEvents = "auto";
		}
	}
}

export function disableButtonPointerEvents(event: UIEvent) {
	for (const button of event.currentTarget.getElementsByTagName("button")) {
		button.setAttribute("data-disabled-pointer-events", "true");
		button.style.pointerEvents = "none";
	}
}
