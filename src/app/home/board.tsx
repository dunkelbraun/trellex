"use client";

import { TrashIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { deleteBoardAction } from "./actions";

export function Board({ name, id, color }: { name: string; id: number; color: string }) {
	return (
		<Link
			prefetch={true}
			href={`/board/${id}`}
			className="w-60 h-40 p-4 block border-b-8 shadow rounded hover:shadow-lg bg-white relative"
			style={{ borderColor: color }}
		>
			<form action={deleteBoardAction} onClick={(event) => event.stopPropagation()}>
				<input type="hidden" name="intent" value="delete-board" />
				<input type="hidden" name="boardId" value={id} />
				<div className="font-bold">{name}</div>
				<DeleteBoardButton />
			</form>
		</Link>
	);
}

export function DeleteBoardButton() {
	const { pending } = useFormStatus();

	return (
		<button
			aria-label="Delete board"
			className="absolute h-5 w-5 top-4 right-4 text-gray-500 hover:text-brand-red"
			type="submit"
			disabled={pending}
		>
			<TrashIcon />
		</button>
	);
}
