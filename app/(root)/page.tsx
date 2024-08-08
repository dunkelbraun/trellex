"use server";

import { dbUser } from "@lib/user";
import { UnauthenticatedHome } from "./_components/unauthenticated-home";
import { UserHome } from "./_components/user-home";

export default async function Home() {
	const user = await dbUser();
	return user?.id !== undefined ? <UserHome userId={user.id} /> : <UnauthenticatedHome />;
}
