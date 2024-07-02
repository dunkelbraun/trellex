"use client";

import { EditableText } from "@components/editable-text";
import { Text } from "@components/text";
import { useScroller } from "@hooks/scroller";
import { useContext, useState } from "react";
import { View } from "reshaped";
import { type ColumnWithItems } from "../_lib/column";
import {
	disableButtonPointerEvents,
	DraggableItemProvider,
	enableButtonPointerEvents,
	onEventWithCardDrag,
} from "../_lib/dnd";
import { ColumnProvider } from "../_lib/providers";
import { updateColumnName } from "../actions";
import { AddCard } from "./add-card";
import { ColumnCard } from "./card";

export function Column({ column }: { column: ColumnWithItems }) {
	const [acceptsDrop, setAcceptsDrop] = useState(false);
	const draggableProvider = useContext(DraggableItemProvider);

	const listRef = useScroller<HTMLUListElement>({
		behavior: "instant",
		direction: "bottom",
		condition: (record) => {
			return (
				record.length === 1 && record[0].addedNodes.length === 1 && record[0].nextSibling === null
			);
		},
	});

	const divRef = useScroller<HTMLDivElement>({
		behavior: "instant",
		direction: "bottom",
		refToScroll: listRef,
		observeSubtree: true,
		condition: (record) => {
			return record.length === 2 && record[1].addedNodes[0]?.nodeName !== "BUTTON";
		},
	});

	return (
		<ColumnProvider
			value={{
				id: column.id,
				name: column.name,
				boardId: column.boardId,
				order: column.order,
				nextItemOrder:
					column.items.length === 0 ? 1 : column.items[column.items.length - 1].order + 1,
			}}
		>
			<View
				backgroundColor="neutral-faded"
				shadow="raised"
				borderRadius="medium"
				borderColor={acceptsDrop ? "primary" : "neutral-faded"}
				paddingTop={4}
				width={88}
				direction="column"
				maxHeight="100%"
				className="flex-shrink-0 overflow-hidden"
				attributes={{
					onDragOver: onEventWithCardDrag((event) => {
						if (column.items.length === 0) {
							event.preventDefault();
							setAcceptsDrop(true);
						}
					}),
					onDragLeave: () => setAcceptsDrop(false),
					onDrop: onEventWithCardDrag(() => {
						if (column.items.length === 0) draggableProvider.order = "1";
						draggableProvider.toColumn = column.id;
						setAcceptsDrop(false);
					}),
					onDragStart: disableButtonPointerEvents,
					onPointerMove: enableButtonPointerEvents,
				}}
			>
				<View grow paddingStart={4}>
					<Text as="h2" variant="body-2" weight="bold">
						<EditableText
							text={column.name}
							input={{ name: "name", id: column.id, label: "Edit column name" }}
							buttonLabel={`Edit column "${column.name}" name`}
							action={updateColumnName}
						/>
					</Text>
				</View>
				<ul ref={listRef} className="overflow-auto pt-4 has-[li]:pt-0 mb-[2px] has-[li]:mb-0">
					{column.items
						.sort((a, b) => a.order - b.order)
						.map((item, index, cards) => {
							index + 1 === cards.length ? item.order + 1 : cards[index + 1].order;
							return (
								<ColumnCard
									key={item.id}
									item={item}
									previousOrder={index === 0 ? 0 : cards[index - 1].order}
									nextOrder={index + 1 === cards.length ? item.order + 1 : cards[index + 1].order}
								/>
							);
						})}
				</ul>
				<View attributes={{ ref: divRef }}>
					<AddCard />
				</View>
			</View>
		</ColumnProvider>
	);
}
