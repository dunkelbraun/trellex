"use client";

import { Text } from "@components/text";
import { ExclamationTriangleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { delay } from "@lib/delay";
import Link from "next/link";
import { startTransition } from "react";
import { Button, Card, Modal, View, useToggle } from "reshaped";
import { deleteBoardAction } from "../actions";
import type { OptimisticBoard } from "./board-cards";

interface BoardProps {
	board: OptimisticBoard;
	optimisticBoardDelete: (boardToDelete: OptimisticBoard) => void;
}

export function BoardCard({ board, optimisticBoardDelete }: BoardProps) {
	const { active, activate, deactivate } = useToggle(false);

	return (
		<>
			<Link href={`/boards/${board.id}`}>
				<View shadow="raised">
					<View
						grow={{ s: true, m: false }}
						width={{ s: undefined, m: 60 }}
						backgroundColor="neutral-faded"
						paddingBottom={8}
					>
						<View
							direction="row"
							justify="space-between"
							align="center"
							gap={2}
							padding={4}
							paddingBottom={4}
							wrap={false}
						>
							<View grow>
								<Text as="h3" variant="body-3" weight="semibold" maxLines={1}>
									{board.name}
								</Text>
							</View>
							<Button
								variant="ghost"
								aria-label="Delete board"
								onClick={(event) => {
									event.stopPropagation();
									event.preventDefault();
									activate();
								}}
								attributes={{
									tabIndex: 0,
								}}
							>
								<TrashIcon height={16} width={16} />
							</Button>
						</View>
					</View>
					<View
						height={6}
						attributes={{ style: { backgroundColor: board.color, borderColor: board.color } }}
					></View>
				</View>
			</Link>
			<Modal padding={0} active={active} onClose={deactivate}>
				<Card padding={4}>
					<View direction="row" gap={4} paddingBottom={4}>
						<View
							borderRadius="circular"
							backgroundColor="critical-faded"
							height={10}
							width={10}
							padding={2}
						>
							<Text color="critical">
								<ExclamationTriangleIcon height={24} width={24} />
							</Text>
						</View>
						<View.Item grow>
							<View direction="column" gap={1}>
								<Text weight="semibold" variant="body-2">
									Delete Board
								</Text>
								<Text>Are you sure you want to delete the board?</Text>
								<Text>All data will be lost.</Text>
							</View>
						</View.Item>
					</View>
					<form
						action={async (formData: FormData) => {
							deactivate();
							delay(200, async () => {
								startTransition(async () => {
									optimisticBoardDelete(board);
									await deleteBoardAction(formData);
								});
							});
						}}
					>
						<View direction="row" gap={3} justify="end">
							<Button
								color="neutral"
								variant="faded"
								onClick={deactivate}
								attributes={{
									tabIndex: 0,
								}}
							>
								Cancel
							</Button>
							<input type="hidden" name="boardId" value={board.id} />
							<Button
								color="critical"
								variant="faded"
								type="submit"
								attributes={{
									tabIndex: 0,
								}}
							>
								Delete Board
							</Button>
						</View>
					</form>
				</Card>
			</Modal>
		</>
	);
}
