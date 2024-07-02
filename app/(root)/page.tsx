import { getSession } from "@lib/session";
import { UnauthenticatedHome } from "./_components/unauthenticated-home";
import { UserHome } from "./_components/user-home";
import { getHomeData } from "./_lib/queries";

async function userBoards() {
	const userId = (await getSession()).userId!;
	return getHomeData(userId);
}

export default async function Home() {
	const userId = (await getSession()).userId;
	return userId !== undefined ? <UserHome userId={userId} /> : <UnauthenticatedHome />;
}
