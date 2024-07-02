import { Text } from "@components/text";
import Link from "next/link";
import { View } from "reshaped";
import AuthForm from "../_components/auth-form";
import { signIn } from "./actions";
export default async function SigninPage() {
	return (
		<AuthForm buttonLabel="Log In" action={signIn}>
			<View direction="row" paddingTop={4}>
				<Text variant="body-3">
					Don&#39;t have an account?{" "}
					<Link href="/sign-up" className="underline">
						Sign up
					</Link>
				</Text>
			</View>
		</AuthForm>
	);
}
