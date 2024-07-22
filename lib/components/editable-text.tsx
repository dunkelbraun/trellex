"use client";

import { useEffect, useOptimistic, useRef, useState, type SyntheticEvent } from "react";

interface EditableTextProps {
	text: string;
	input: {
		name: string;
		id: string | number;
		label: string;
	};
	buttonLabel: string;
	action: (formData: FormData) => Promise<{ name: string }>;
}

export function EditableText({ action, text, input, buttonLabel }: EditableTextProps) {
	const [optimisticName, addOptimisticName] = useOptimistic(
		text,
		(_state: string, newName: string) => newName,
	);
	const inputRef = useRef<HTMLInputElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	const [visible, setVisible] = useState<"input" | "button" | "button-selected">("button");

	useEffect(() => {
		if (visible === "input") inputRef.current?.select();
		if (visible === "button-selected") buttonRef.current?.focus();
	}, [visible]);

	return visible === "input" ? (
		<form
			action={async (formData: FormData) => {
				const name = (formData.get(input.name) ?? "").toString().trim();
				if (name !== "" && name !== text) {
					addOptimisticName(name);
					await action(formData);
				}
			}}
			onSubmit={({ nativeEvent: { submitter } }: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
				setVisible(submitter === null ? "button" : "button-selected");
			}}
		>
			<input
				type="text"
				name={input.name}
				defaultValue={optimisticName}
				aria-label={input.label}
				onBlur={({ currentTarget: { form } }) => form?.requestSubmit()}
				required={true}
				autoComplete="off"
				spellCheck="false"
				ref={inputRef}
				onKeyDown={({ key }: { key: string }) => {
					if (key === "Escape") {
						setVisible("button-selected");
					}
				}}
				style={{
					padding: "10px",
					borderRadius: 4,
					boxSizing: "border-box",
					position: "relative",
				}}
			/>
			<input type="hidden" name="id" value={input.id.toString()} />
			<button type="submit" hidden></button>
		</form>
	) : (
		<button
			ref={buttonRef}
			type="button"
			aria-label={buttonLabel}
			onClick={() => setVisible("input")}
			style={{
				border: "none",
				backgroundColor: "transparent",
				padding: "10px 10px 10px 10px",
			}}
			tabIndex={0}
		>
			{optimisticName || "Edit"}
		</button>
	);
}
