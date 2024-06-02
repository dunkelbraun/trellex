"use client";

import Link from "next/link.js";
import { useActionState } from "react";
import { sigupUser } from "./action";

export function SignupForm() {
	const [state, formAction] = useActionState(sigupUser, {
		ok: true,
		errors: {},
	});

	return (
		<form action={formAction} className="space-y-6">
			<div>
				<label
					htmlFor="email"
					className="block text-sm font-medium leading-6 text-gray-900"
				>
					Email address{" "}
					{state?.errors?.email && (
						<span id="email-error" className="text-brand-red">
							{state.errors.email}
						</span>
					)}
				</label>
				<input
					autoFocus
					id="email"
					name="email"
					type="email"
					autoComplete="email"
					aria-describedby={
						state?.errors?.email ? "email-error" : "signup-header"
					}
					className="form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-blue sm:text-sm sm:leading-6"
					required
				/>
			</div>

			<div>
				<label
					htmlFor="password"
					className="block text-sm font-medium leading-6 text-gray-900"
				>
					Password{" "}
					{state?.errors?.password && (
						<span id="password-error" className="text-brand-red">
							{state.errors.password}
						</span>
					)}
				</label>
				<input
					id="password"
					name="password"
					type="password"
					autoComplete="current-password"
					aria-describedby="password-error"
					className="form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-blue sm:text-sm sm:leading-6"
					required
				/>
			</div>

			<button
				type="submit"
				className="flex w-full justify-center rounded-md bg-brand-blue px-1 py-1 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
			>
				Sign in
			</button>

			<div className="text-sm text-slate-500">
				Already have an account?{" "}
				<Link className="underline" href="/login">
					Log in
				</Link>
				.
			</div>
		</form>
	);
}
