export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export type SearchPizzaParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: string;
};

export type Pizza = {
  id: string;
  title: string;
  price: number;
  sizes: number[];
  types: number[];
  rating: number;
  imageUrl: string;
};

export interface I_PizzaSlice {
  items: Pizza[];
  status: "loading" | "success" | "error";
}
