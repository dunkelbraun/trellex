import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { getSession } from "./lib/session";

export async function middleware(request: NextRequest) {
	const session = await getSession(await cookies());
	const pathName = new URL(request.url).pathname;
	if (
		!session.userId &&
		pathName !== "/" &&
		!pathName.startsWith("/sign-up") &&
		!pathName.startsWith("/login")
	) {
		return Response.redirect(new URL("/login", request.url));
	}
	if (session.userId !== undefined && pathName === "/") {
		return Response.redirect(new URL("/boards", request.url));
	}
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
