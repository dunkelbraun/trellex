"use client";

import { PlusIcon } from "@heroicons/react/20/solid";
import { delay } from "@lib/delay";
import {
	startTransition,
	useContext,
	useEffect,
	useRef,
	useState,
	type KeyboardEvent,
} from "react";
import { Button, TextField, View, useToggle } from "reshaped";
import { columnSchema } from "../_lib/column";
import { BoardProvider } from "../_lib/providers";
import { createColumn } from "../actions";

export function NewColumn() {
	const boardProvider = useContext(BoardProvider);
	const board = boardProvider.board;
	const { active, activate, deactivate } = useToggle(board?.columns.length === 0);
	const formRef = useRef<HTMLFormElement>(null);
	const [inputValue, setInputValue] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (!active) {
			setInputValue("");
		}
	}, [active]);

	const closeForm = () => {
		deactivate();
	};

	return active ? (
		<View
			width={88}
			padding={5.8}
			shadow="raised"
			backgroundColor="page-faded"
			borderColor="neutral-faded"
			borderRadius="medium"
		>
			<form
				ref={formRef}
				onSubmit={() => {
					setInputValue("");
					inputRef.current?.focus();
				}}
				action={async (formData: FormData) => {
					const column = columnSchema.parse(Object.fromEntries(formData.entries()));
					formRef.current?.reset();
					boardProvider.addOptimistic({ kind: "column", item: { ...column, items: [] } });
					await createColumn(column);
				}}
				onBlur={(event) => {
					if (event.relatedTarget !== null && !formRef.current?.contains(event.relatedTarget)) {
						delay(100, async () => {
							startTransition(() => deactivate());
						});
					}
				}}
			>
				<input type="hidden" name="boardId" value={board?.id} />
				<input type="hidden" name="order" value={(board?.columns.length ?? 0) + 1} />
				<input type="hidden" name="id" value={crypto.randomUUID()} />
				<TextField
					name="name"
					value={inputValue}
					inputAttributes={{
						ref: inputRef,
						required: true,
						autoFocus: true,
						autoComplete: "off",
						spellCheck: "false",
						onKeyDown: (event: KeyboardEvent<HTMLInputElement>) =>
							event.key === "Escape" && deactivate(),
						tabIndex: 0,
					}}
					onChange={({ event }) => event && setInputValue(event.currentTarget.value)}
				/>
				<View direction="row-reverse" justify="start" gap={4} paddingTop={4}>
					<Button
						type="submit"
						variant="faded"
						color="primary"
						attributes={{
							tabIndex: 0,
						}}
					>
						Save Column
					</Button>
					<Button
						variant="faded"
						color="neutral"
						onClick={deactivate}
						attributes={{
							tabIndex: 0,
						}}
					>
						Cancel
					</Button>
				</View>
			</form>
		</View>
	) : (
		<Button
			variant="ghost"
			color="primary"
			onClick={activate}
			attributes={{ "aria-label": "Add new column", tabIndex: 0 }}
		>
			<PlusIcon width={36} height={36} />
		</Button>
	);
}
