"use client";

import { Text } from "@components/text";
import { useFormStatus } from "react-dom";
import { Button, FormControl, TextField, View, useFormControl } from "reshaped";
import { createBoardAction } from "../actions";

export function NewBoard() {
	return (
		<form action={createBoardAction}>
			<View direction="row" gap={4} align="baseline" divided>
				<View direction="column">
					<Text as="h2" variant="body-2" weight="bold" align="start">
						New Board
					</Text>
				</View>
				<View direction="column" gap={4} paddingBottom={2} width={64}>
					<View gap={2}>
						<FormControl>
							<FormControl.Label>Name</FormControl.Label>
							<TextField
								name="name"
								id="board-name"
								inputAttributes={{
									autoFocus: true,
									required: true,
									autoComplete: "off",
									spellCheck: "false",
								}}
							/>
						</FormControl>
					</View>
					<View gap={2}>
						<FormControl>
							<FormControl.Label>Color</FormControl.Label>
							<ColorInput />
						</FormControl>
					</View>
					<View paddingTop={4}>
						<SubmitButton />
					</View>
				</View>
			</View>
		</form>
	);
}

function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<Button
			loading={pending}
			type="submit"
			variant="faded"
			color="primary"
			fullWidth={true}
			attributes={{ tabIndex: 0 }}
		>
			Create
		</Button>
	);
}

function ColorInput() {
	const { attributes } = useFormControl();
	return (
		<input
			{...attributes}
			id="board-color"
			name="color"
			type="color"
			defaultValue="#f9f9fb"
			tabIndex={0}
			style={{ inlineSize: "60px", height: "36px" }}
		/>
	);
}
