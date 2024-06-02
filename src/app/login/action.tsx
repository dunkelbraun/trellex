"use server";

import { redirect } from "next/navigation.js";
import { setSession } from "../session/session";
import { loginUser } from "./queries";
import { validate } from "./validate";

export async function login(
	prevState: {
		ok: boolean;
		email: string;
		password: string;
		errors?: { email?: string; password?: string };
	},
	formData: FormData,
) {
	let email = String(formData.get("email") || "");
	let password = String(formData.get("password") || "");

	let errors = validate(email, password);
	if (errors) {
		return { ok: false, errors, email, password };
	}

	let userId = await loginUser(email, password);
	if (userId === false) {
		return {
			ok: false,
			errors: { password: "Invalid credentials" },
			email,
			password,
		};
	}
	await setSession(userId);
	return redirect("/");
}
