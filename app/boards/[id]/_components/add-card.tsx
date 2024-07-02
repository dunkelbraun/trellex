"use client";

import { Text } from "@components/text";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { startTransition, useContext, useRef, useState, type KeyboardEvent } from "react";
import { Button, TextArea, View } from "reshaped";
import { enableButtonPointerEvents } from "../_lib/dnd";
import { BoardProvider, ColumnProvider } from "../_lib/providers";
import { createColumnItem } from "../actions";

export function AddCard() {
	const column = useContext(ColumnProvider);
	const board = useContext(BoardProvider);
	const [addCard, setEditCard] = useState(false);
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	const [textValue, setTextValue] = useState("");

	const item = {
		id: crypto.randomUUID(),
		columnId: column.id,
		order: column.nextItemOrder,
		boardId: column.boardId,
		content: "",
		title: "",
	};

	return addCard ? (
		<View paddingBottom={3} paddingInline={2}>
			<form
				onSubmit={() => {
					if (textAreaRef.current) {
						textAreaRef.current.style.height = "52px";
					}
					item.title = textValue.trim();
					setTextValue("");
				}}
				action={async () => {
					if (item.title !== "") {
						startTransition(() => {
							board.addOptimistic({
								kind: "card",
								item,
								ops: [{ columnId: column.id, type: "add" }],
							});
						});
						await createColumnItem(item);
					}
				}}
				onBlur={(event) => {
					if (event.relatedTarget === null || !event.currentTarget?.contains(event.relatedTarget)) {
						setEditCard(false);
					}
				}}
			>
				<View borderRadius="medium" borderColor="neutral" backgroundColor="page" shadow="raised">
					<TextArea
						value={textValue}
						name="title"
						placeholder="Enter a title for this card"
						variant="headless"
						inputAttributes={{
							ref: textAreaRef,
							autoFocus: true,
							required: true,
							autoComplete: "off",
							spellCheck: "false",
							style: {
								resize: "none",
								height: "52px",
								fontSize: "var(--rs-font-size-body-3)",
								lineHeight: "var(--rs-line-height-body-3)",
								padding: "15px",
							},
							onKeyDown: async (event: KeyboardEvent<HTMLTextAreaElement>) => {
								event.stopPropagation();
								switch (event.key) {
									case "Enter":
										event.preventDefault();
										event.currentTarget.form?.requestSubmit();
										break;
									case "Escape":
										setTextValue("");
										setEditCard(false);
										break;
								}
							},
						}}
						onChange={({ value, event }) => {
							setTextValue(value);
							if (event) {
								event.stopPropagation();
								event.preventDefault();
								event.target.style.height = event.target.scrollHeight + 2 + "px";
							}
						}}
					/>
				</View>
				<View direction="row" justify="end" gap={4} paddingTop={6}>
					<Button
						variant="ghost"
						color="neutral"
						onClick={() => {
							setTextValue("");
							setEditCard(false);
						}}
					>
						Cancel
					</Button>
					<Button type="submit" variant="faded" color="primary">
						Save Card
					</Button>
				</View>
			</form>
		</View>
	) : (
		<View
			paddingInline={2}
			paddingBottom={2}
			attributes={{
				onPointerLeave: enableButtonPointerEvents,
			}}
		>
			<Button
				fullWidth
				variant="ghost"
				size="large"
				color="inherit"
				onClick={() => setEditCard(true)}
				attributes={{
					style: {
						justifyContent: "start",
					},
				}}
			>
				<PlusCircleIcon width={20} height={20} />
				<Text color="neutral-faded" weight="semibold">
					Add Card
				</Text>
			</Button>
		</View>
	);
}
