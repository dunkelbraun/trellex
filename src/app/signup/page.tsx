/* eslint-disable react/no-unescaped-entities */

import { SignupForm } from "./form";

export default function Signup() {
	return (
		<div className="flex min-h-full flex-1 flex-col mt-20 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2
					id="signup-header"
					className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
				>
					Sign up
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
				<div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
					<SignupForm />
				</div>
				<div className="mt-8 space-y-2 mx-2">
					<h3 className="font-bold text-black">Privacy Notice</h3>
					<p>
						We won't use your email address for anything other than
						authenticating with this demo application. This app doesn't send
						email anyway, so you can put whatever fake email address you want.
					</p>
					<h3 className="font-bold text-black">Terms of Service</h3>
					<p>
						This is a demo app, there are no terms of service. Don't be
						surprised if your data dissappears.
					</p>
				</div>
			</div>
		</div>
	);
}
