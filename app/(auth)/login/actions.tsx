"use server";

import { cacheTagResolver } from "@lib/cache";
import { setSession } from "@lib/session";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation.js";
import z from "zod";
import type { AuthFormState } from "../_components/auth-form";
import { findUser } from "../_lib/account";
import { userCredentialsSchema } from "../_lib/user-credentials";

export async function signIn(prevState: AuthFormState, formData: FormData) {
	const data = Object.fromEntries(formData.entries());
	const validation = await schema.safeParseAsync(data);
	if (validation.success) {
		revalidateTag(cacheTagResolver.user({ userId: validation.data.userId }));
		await setSession(validation.data.userId);
		redirect("/boards");
	}

	return {
		errors: validation.error.format(),
		formData,
	} satisfies AuthFormState;
}

const schema = userCredentialsSchema.transform(async (val, ctx) => {
	const userId = await findUser(val.email, val.password);
	if (userId) {
		return { ...val, userId };
	} else {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			path: ["password"],
			message: "Invalid credentials",
		});
		return z.NEVER;
	}
});
