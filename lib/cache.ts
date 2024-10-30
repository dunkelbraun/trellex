export const cacheTagResolver = {
	user: ({ userId }: { userId: string }) => `user-${userId}`,
	userBoards: ({ userId }: { userId: string }) => `user-${userId}-boards`,
	userBoard: ({ userId, boardId }: { userId: string; boardId: number }) =>
		`user-${userId}-board-${boardId}`,
};
