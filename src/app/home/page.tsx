import { createBoardAction } from "./actions";
import { Boards } from "./boards";

export default function Home() {
	return (
		<div className="h-full">
			<NewBoard />
			<Boards />
		</div>
	);
}

function NewBoard() {
	return (
		<form action={createBoardAction} className="p-8 max-w-md">
			<input type="hidden" name="intent" value="createBoard" />
			<div>
				<h2 className="font-bold mb-2 text-xl">New Board</h2>
				<label
					htmlFor="name"
					className="block text-sm font-medium leading-6 text-gray-900"
				>
					Name
				</label>
				<div className="mt-2">
					<input
						name="name"
						id="board-name"
						required
						className="form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-blue sm:text-sm sm:leading-6"
					/>
				</div>
			</div>

			<div className="mt-4 flex items-center gap-4">
				<div className="flex items-center gap-1">
					<label
						htmlFor="board-color"
						className="block text-sm font-medium leading-6 text-gray-900"
					>
						Color
					</label>
					<input
						id="board-color"
						name="color"
						type="color"
						defaultValue="#cbd5e1"
						className="bg-transparent"
					/>
				</div>
				<button
					type="submit"
					className="flex w-full justify-center rounded-md bg-brand-blue px-1 py-1 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
				>
					Create
				</button>
			</div>
		</form>
	);
}
