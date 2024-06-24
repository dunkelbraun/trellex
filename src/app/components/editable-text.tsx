"use client";

import { useEffect, useOptimistic, useRef, useState, type SyntheticEvent } from "react";

interface EditableTextProps {
	initialName: string;
	fieldName: string;
	id: string | number;
	inputLabel: string;
	buttonLabel: string;
	inputClassName: string;
	buttonClassName: string;
	action: (formData: FormData) => Promise<{ name: string }>;
}

export function EditableText({
	action,
	initialName,
	fieldName,
	id,
	inputLabel,
	buttonLabel,
	inputClassName,
	buttonClassName,
}: EditableTextProps) {
	const [optimisticName, addOptimisticName] = useOptimistic(
		initialName,
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
				const name = (formData.get(fieldName) ?? "").toString().trim();
				if (name !== "" && name !== initialName) {
					addOptimisticName(name);
					await action(formData);
				}
			}}
			onSubmit={({ nativeEvent: { submitter } }: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
				setVisible(submitter === null ? "button" : "button-selected");
			}}
		>
			<input
				required
				ref={inputRef}
				type="text"
				aria-label={inputLabel}
				name={fieldName}
				defaultValue={optimisticName}
				className={inputClassName}
				onBlur={({ currentTarget: { form } }) => form?.requestSubmit()}
				onKeyDown={({ key }) => {
					if (key === "Escape") {
						setVisible("button-selected");
					}
				}}
			/>
			<input type="hidden" name="id" value={id.toString()} />
			<button hidden></button>
		</form>
	) : (
		<button
			ref={buttonRef}
			type="button"
			aria-label={buttonLabel}
			onClick={() => setVisible("input")}
			className={buttonClassName}
		>
			{optimisticName || <span className="text-slate-400 italic">Edit</span>}
		</button>
	);
}
