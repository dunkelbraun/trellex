"use client";

import { useActionState, type ReactNode } from "react";
import { Button, FormControl, Text, TextField, View } from "reshaped";
import { type ZodFormattedError } from "zod";

export interface AuthFormState {
	formData: FormData;
	errors?: ZodFormattedError<
		{
			email: string;
			password: string;
		},
		string
	>;
}

interface FormProps {
	buttonLabel: string;
	action: (prevState: AuthFormState, formData: FormData) => Promise<AuthFormState>;
	children: ReactNode;
}

export default function AuthForm({ action, buttonLabel, children }: FormProps) {
	const [state, formAction, isPending] = useActionState(action, { formData: new FormData() });

	return (
		<View padding={8} borderRadius="medium" shadow="raised" backgroundColor="page">
			<form action={formAction}>
				<View gap={4}>
					<View textAlign="center" paddingBottom={8}>
						<Text variant="featured-3" weight="bold">
							{buttonLabel}
						</Text>
					</View>
					<View gap={4}>
						<FormControl hasError={state?.errors?.email !== undefined}>
							<FormControl.Label>Email address</FormControl.Label>
							<TextField
								id="email"
								defaultValue={state?.formData.get("email")?.toString() ?? ""}
								inputAttributes={{
									type: "email",
									autoFocus: true,
									required: true,
									autoComplete: "off",
								}}
								name="email"
							/>
							<FieldErrors errors={state?.errors?.email?._errors} />
						</FormControl>
						<FormControl hasError={state?.errors?.password !== undefined}>
							<FormControl.Label>Password</FormControl.Label>
							<TextField
								id="email"
								name="password"
								inputAttributes={{ type: "password", required: true }}
							/>
							<FieldErrors errors={state?.errors?.password?._errors} />
						</FormControl>
					</View>
					<View paddingTop={4}>
						<Button
							loading={isPending}
							type="submit"
							variant="solid"
							color="primary"
							fullWidth={true}
						>
							{buttonLabel}
						</Button>
					</View>
				</View>
			</form>
			{children}
		</View>
	);
}

function FieldErrors({ errors }: { errors?: string[] }) {
	return (
		errors && errors.map((error, idx) => <FormControl.Error key={idx}>{error}</FormControl.Error>)
	);
}
