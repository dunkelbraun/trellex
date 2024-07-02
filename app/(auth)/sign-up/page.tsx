import Link from "next/link";
import { Text, View } from "reshaped";
import AuthForm from "../_components/auth-form";
import { signUp } from "./actions";

export default function SignupPage() {
	return (
		<>
			<AuthForm buttonLabel="Sign Up" action={signUp}>
				<View direction="row" paddingTop={4}>
					<Text variant="body-3">
						Already have an account?{" "}
						<Link href="/login" className="underline">
							Log in
						</Link>
					</Text>
				</View>
			</AuthForm>
			<View gap={4} paddingTop={8}>
				<View direction="column" gap={2}>
					<Text as="h3" variant="body-3" weight="bold">
						Privacy Notice
					</Text>
					<Text as="p" variant="body-3">
						We won&#39;t use your email address for anything other than authenticating with this
						demo application. This app doesn&#39;t send email anyway, so you can put whatever fake
						email address you want.
					</Text>
				</View>
				<View direction="column" gap={1}>
					<Text as="h3" variant="body-3" weight="bold">
						Terms of Service
					</Text>
					<Text as="p" variant="body-3">
						This is a demo app, there are no terms of service. Don&#39;t be surprised if your data
						dissappears.
					</Text>
				</View>
			</View>
		</>
	);
}
