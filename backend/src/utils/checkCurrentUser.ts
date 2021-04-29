export const checkCurrentUser = (creatorId: number, currentUserId: number) => {
  if (creatorId !== currentUserId) {
    throw new Error("not authorized");
  }
};
