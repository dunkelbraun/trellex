import Link from "next/link.js";

export default function Home() {
	return (
		<div className="h-full flex flex-col items-center pt-20 bg-slate-900">
			<div className="flex w-full justify-evenly max-w-md mt-8 rounded-3xl p-10 bg-slate-800">
				<Link
					href="/signup"
					className="text-xl font-medium text-brand-aqua underline"
				>
					Sign up
				</Link>
				<div className="h-full border-r border-slate-500" />
				<Link
					href="/login"
					className="text-xl font-medium text-brand-aqua underline"
				>
					Login
				</Link>
			</div>
		</div>
	);
}
