import Link from "next/link";
import { Button, Text, View } from "reshaped";

export function UnauthenticatedHome() {
	return (
		<View height="100%" direction="column" align="center" padding={10} paddingTop={24}>
			<View maxWidth={140} gap={4}>
				<Text as="p" variant="body-2">
					This demo app is a clone of <Link href="https://trellix.fly.dev">Trellix</Link> made
					with Next.js (version: 15.0.0-rc.0)
				</Text>
				<Text as="p" variant="body-2">
					If you want to play around, click sign up!
				</Text>
			</View>
			<View direction="row" gap={8} divided paddingTop={12} justify="center">
				<Button variant="ghost" color="neutral">
					<Link href="/sign-up">Sign up</Link>
				</Button>
				<Button variant="ghost" color="neutral">
					<Link href="/login">Login</Link>
				</Button>
			</View>
		</View>
	);
}
