import DataLoader from "dataloader";
import { Category } from "../entities";

export const createCategoryLoader = () => {
  return new DataLoader<number, Category>(async categoryIds => {
    const categories = await Category.findByIds(categoryIds as number[]);
    const categoryIdToCategory: Record<number, Category> = {};
    categories.forEach(u => {
      categoryIdToCategory[u.id] = u;
    });
    const res = categoryIds.map(categoryId => categoryIdToCategory[categoryId]);
    return res;
  });
};
