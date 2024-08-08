"use server";

import { getSession } from "@lib/session";
import { UnauthenticatedHome } from "./_components/unauthenticated-home";
import { UserHome } from "./_components/user-home";

export default async function Home() {
	const userId = (await getSession()).userId;
	return userId !== undefined ? <UserHome userId={userId} /> : <UnauthenticatedHome />;
}
