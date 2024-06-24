"use client";

import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import { CancelButton } from "../../../components/cancel-button";
import { SaveButton } from "../../../components/save-button";
import { createColumnItem } from "../actions";
import { parseItemForm, type RenderedItem } from "../item";

interface AddCardProps {
	columnId: string;
	order: number;
	optimisticUpdate: (item: RenderedItem, status?: RenderedItem["status"]) => void;
	boardId: number;
	setEdit: Dispatch<SetStateAction<boolean>>;
}

export function AddCard({ columnId, order, optimisticUpdate, boardId, setEdit }: AddCardProps) {
	const ref = useRef<HTMLFormElement>(null);
	const [textAreaValue, setTextAreValue] = useState("");
	return (
		<div className="border-2 px-2 py-1 border-t-2 border-b-2 border-transparent">
			<form
				ref={ref}
				onSubmit={() => setTextAreValue("")}
				action={async (form: FormData) => {
					const item = parseItemForm(form);
					ref.current?.reset();
					optimisticUpdate(item, "pending");
					await createColumnItem(item);
					optimisticUpdate(item, "created");
				}}
			>
				<div>
					<input type="hidden" name="id" value={crypto.randomUUID()} />
					<input type="hidden" name="columnId" value={columnId} />
					<input type="hidden" name="order" value={order} />
					<input type="hidden" name="boardId" value={boardId} />
					<input type="hidden" name="content" value="" />
					<textarea
						autoFocus
						required
						value={textAreaValue === "" ? undefined : textAreaValue}
						name="title"
						placeholder="Enter a title for this card"
						className="outline-none shadow text-sm rounded-lg w-full py-1 px-2 resize-none placeholder:text-sm placeholder:text-slate-500 h-14"
						onKeyDown={(event) => {
							switch (event.key) {
								case "Enter":
									event.preventDefault();
									event.currentTarget.form?.requestSubmit();
									break;
								case "Escape":
									setEdit(false);
									break;
								default:
									break;
							}
						}}
						onChange={(event) => {
							setTextAreValue(event.currentTarget.value);
							let el = event.currentTarget;
							el.style.height = el.scrollHeight + "px";
						}}
					/>
					<div className="flex justify-between">
						<SaveButton>Save Card</SaveButton>
						<CancelButton onClick={() => setEdit(false)}>Cancel</CancelButton>
					</div>
				</div>
			</form>
		</div>
	);
}
