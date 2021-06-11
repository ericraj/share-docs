import DataLoader from "dataloader";
import { Tag } from "../entities";

const createTagLoader = () =>
  new DataLoader<number, Tag>(async tagIds => {
    const tags = await Tag.findByIds(tagIds as number[]);
    const tagIdToTag: Record<number, Tag> = {};
    tags.forEach(u => {
      tagIdToTag[u.id] = u;
    });
    const res = tagIds.map(tagId => tagIdToTag[tagId]);
    return res;
  });

export default createTagLoader;
