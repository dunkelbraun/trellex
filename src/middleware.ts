import type { NextRequest } from "next/server";
import { getSession } from "./app/session/session";

export async function middleware(request: NextRequest) {
	console.log("get session");
	const session = await getSession();
	console.log("session", session);

	if (!session.userId && !request.nextUrl.pathname.startsWith("/login")) {
		return Response.redirect(new URL("/login", request.url));
	}
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
