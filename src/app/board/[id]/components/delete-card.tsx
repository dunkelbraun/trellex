"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import { deleteItem } from "../actions";
import type { RenderedItem } from "../item";

interface DeleteCardProps {
	item: RenderedItem;
	optimisticUpdate: (item: RenderedItem, status?: RenderedItem["status"]) => void;
}

export function DeleteCard({ item, optimisticUpdate }: DeleteCardProps) {
	return (
		<form
			action={async () => {
				optimisticUpdate(item, "deleted");
				await deleteItem(item);
			}}
		>
			<button
				aria-label="Delete card"
				className="absolute top-4 right-4 hover:text-brand-red disabled:text-slate-300 disabled:cursor-not-allowed"
				type="submit"
				disabled={item.status === "pending"}
			>
				<TrashIcon className="h-4 w-4" />
			</button>
		</form>
	);
}
