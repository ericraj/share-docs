import DataLoader from "dataloader";
import { User } from "../entities";

const createUserLoader = () =>
  new DataLoader<number, User>(async userIds => {
    const users = await User.findByIds(userIds as number[]);
    const userIdToUser: Record<number, User> = {};
    users.forEach(u => {
      userIdToUser[u.id] = u;
    });
    const res = userIds.map(userId => userIdToUser[userId]);
    return res;
  });

export default createUserLoader;
