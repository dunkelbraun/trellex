"use server";

import { setSession } from "@lib/session";
import { redirect } from "next/navigation";
import type { AuthFormState } from "../_components/auth-form";
import { accountExists, createAccount } from "../_lib/account";
import { userCredentialsSchema } from "../_lib/user-credentials";

export async function signUp(prevState: AuthFormState, formData: FormData) {
	const data = Object.fromEntries(formData.entries());
	const validation = await schema.safeParseAsync(data);
	if (validation.success) {
		const user = await createAccount(validation.data.email, validation.data.password);
		await setSession(user.id);
		redirect("/");
	}
	return {
		errors: validation.error.format(),
		formData,
	} satisfies AuthFormState;
}

const schema = userCredentialsSchema.extend({
	email: userCredentialsSchema.shape.email.refine(async (val) => !(await accountExists(val)), {
		message: "An account with this email already exists.",
	}),
});
