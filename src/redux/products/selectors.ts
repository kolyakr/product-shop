import { RootState } from "../store";
import { Product } from "../../types";

export const selectProducts = (state: RootState): Product[] =>
  state.products.products;

export const selectIsLoading = (state: RootState): boolean =>
  state.products.isLoading;

export const selectError = (state: RootState): string | null =>
  state.products.error;

export const selectProductById =
  (id: number | string) =>
  (state: RootState): Product | undefined =>
    state.products.products.find((product) => product.id === Number(id));

export const selectSortedProducts =
  (sortType: "name" | "count") =>
  (state: RootState): Product[] => {
    return [...state.products.products].sort((a, b) => {
      if (sortType === "name") return a.name.localeCompare(b.name);
      if (sortType === "count") return b.count - a.count;
      return 0;
    });
  };
