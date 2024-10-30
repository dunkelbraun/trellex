import { getSession } from "@lib/session";
import { View } from "reshaped";
import { NavBarLeft } from "./nav-bar-left";
import { NavBarRight } from "./nav-bar-right";

export async function NavBar() {
	const accountId = (await getSession()).userId;

	return (
		<View direction="row" align="center" justify="space-between" paddingInline={4} paddingBlock={1}>
			<NavBarLeft isLoggedIn={accountId !== undefined} />
			<NavBarRight accountId={accountId} />
		</View>
	);
}
