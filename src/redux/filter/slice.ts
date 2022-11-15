import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { I_FilterSlice, Sort, SortPropertyEnum } from "redux/filter/types";
import { RootState } from "redux/store";

const initialState: I_FilterSlice = {
  searchValue: "",
  categoryId: 0,

  currentPage: 1,
  sort: {
    name: "популярності",
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<I_FilterSlice>) {
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
    },
  },
});

export const selectSort = (state: RootState) => state.filter.sort;

export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;
export default filterSlice.reducer;
