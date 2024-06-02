"use server";

import { redirect } from "next/navigation.js";
import { createAccount } from "./queries";
import { validate } from "./validate";

export async function sigupUser(
	prevState: {
		ok: boolean;
		errors?: { email?: string; password?: string };
	},
	formData: FormData,
) {
	let email = String(formData.get("email") || "");
	let password = String(formData.get("password") || "");

	let errors = await validate(email, password);
	if (errors) {
		return { ok: false, errors };
	}

	let user = await createAccount(email, password);
	redirect("/");
}
