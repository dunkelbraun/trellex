import { getIronSession } from "iron-session";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers.js";

let secret = process.env.COOKIE_SECRET || "default";
if (secret === "default") {
	console.warn(
		"🚨 No COOKIE_SECRET environment variable set, using default. The app is insecure in production.",
	);
	secret = "password-must-be-at-least-32-characters-long";
}

export async function setSession(userId: string) {
	const session = await getIronSession<{ userId?: string }>(await cookies(), {
		password: secret,
		cookieName: "auth",
		cookieOptions: { secure: process.env.NODE_ENV === "production" ? true : false },
	});
	session.userId = userId;
	await session.save();
}

export async function getSession(requestCookies?: ReadonlyRequestCookies) {
	const session = await getIronSession<{ userId?: string }>(requestCookies ?? (await cookies()), {
		password: secret,
		cookieName: "auth",
	});
	return session;
}

export async function clearSession(cookies: ReadonlyRequestCookies) {
	cookies.delete("auth");
	const session = await getIronSession<{ userId?: string }>(cookies, {
		password: secret,
		cookieName: "auth",
		cookieOptions: { secure: process.env.NODE_ENV === "production" ? true : false },
	});
	session.destroy();
}
