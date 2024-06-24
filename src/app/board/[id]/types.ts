import type { getBoardData } from "./queries";

export const CONTENT_TYPES = {
	card: "application/remix-card",
	column: "application/remix-column",
};

export interface MoveCardFormElements extends HTMLFormControlsCollection {
	order: HTMLInputElement;
	columnId: HTMLInputElement;
	id: HTMLInputElement;
	title: HTMLInputElement;
}

export type BoardColumn = NonNullable<Awaited<ReturnType<typeof getBoardData>>>["columns"][0];
