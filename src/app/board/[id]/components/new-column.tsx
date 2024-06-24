"use client";

import { PlusIcon } from "@heroicons/react/20/solid";
import { useRef, useState } from "react";
import { CancelButton } from "../../../components/cancel-button";
import { SaveButton } from "../../../components/save-button";
import { columnSchema, type Column } from "../colum";
import { createColumn } from "../queries";
import type { BoardColumn } from "../types";

interface NewColumnProps {
	order: number;
	boardId: number;
	optimisticAdd: (action: BoardColumn) => void;
	editInitially: boolean;
}

export function NewColumn({ order, boardId, optimisticAdd, editInitially }: NewColumnProps) {
	const [editing, setEditing] = useState(editInitially);
	const formRef = useRef<HTMLFormElement>(null);
	const [inputValue, setInputValue] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);

	const column: Column = {
		id: crypto.randomUUID(),
		boardId,
		order,
		name: inputValue,
	};

	const closeForm = () => {
		setEditing(false);
		setInputValue("");
	};
	return editing ? (
		<form
			ref={formRef}
			onSubmit={() => {
				setInputValue("");
				inputRef.current?.focus();
			}}
			action={async (formData: FormData) => {
				const column = columnSchema.parse(Object.fromEntries(formData.entries()));
				formRef.current?.reset();
				optimisticAdd({ ...column, items: [] });
				await createColumn(column);
			}}
			className="p-2 flex-shrink-0 flex flex-col gap-5 overflow-hidden max-h-full w-80 border rounded-xl shadow bg-slate-100"
		>
			<input type="hidden" name="boardId" value={column.boardId} />
			<input type="hidden" name="order" value={column.order} />
			<input type="hidden" name="id" value={column.id} />
			<input
				autoFocus
				required
				ref={inputRef}
				value={column.name}
				type="text"
				name="name"
				className="border border-slate-400 w-full rounded-lg py-1 px-2 font-medium text-black"
				onChange={(event) => {
					setInputValue(event.currentTarget.value);
				}}
				onKeyDown={(event) => {
					if (event.key === "Escape") {
						closeForm();
					}
				}}
				onBlur={(event) => {
					if (event.relatedTarget !== null && !formRef.current?.contains(event.relatedTarget)) {
						closeForm();
					}
				}}
			/>
			<div className="flex justify-between">
				<SaveButton>Save Column</SaveButton>
				<CancelButton onClick={() => setEditing(false)}>Cancel</CancelButton>
			</div>
		</form>
	) : (
		<button
			onClick={() => setEditing(true)}
			aria-label="Add new column"
			className="flex-shrink-0 flex justify-center h-16 w-16 bg-black hover:bg-white bg-opacity-10 hover:bg-opacity-5 rounded-xl"
		>
			<PlusIcon />
		</button>
	);
}
