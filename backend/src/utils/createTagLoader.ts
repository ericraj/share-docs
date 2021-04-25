import DataLoader from "dataloader";
import { Tag } from "../entities";

export const createTagLoader = () => {
  return new DataLoader<number, Tag>(async tagIds => {
    const tags = await Tag.findByIds(tagIds as number[]);
    const tagIdToTag: Record<number, Tag> = {};
    tags.forEach(u => {
      tagIdToTag[u.id] = u;
    });
    const res = tagIds.map(tagId => tagIdToTag[tagId]);
    return res;
  });
};
