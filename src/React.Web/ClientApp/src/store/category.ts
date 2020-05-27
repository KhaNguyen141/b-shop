import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';

import categoryService from "../services/category-service";

interface ProductCategory {
    id: number;
    name: string;
}

interface ProductCategoryState {
    productCategory: ProductCategory[];
}

const initialState: ProductCategoryState = {
    productCategory: [],
  };

export const productsCategory = createSlice({
    name: "category",
    initialState,
    reducers: {
      fetchCategories: (state, { payload }: PayloadAction<ProductCategory[]>) => {
        state.productCategory = payload;
      },
    },
});


export const { fetchCategories } = productsCategory.actions;

export const fetchCategoriesAsync = (): AppThunk => async (dispatch) => {
    const data = await categoryService.findAllAsync();
    dispatch(fetchCategories(data));
};

export const selectCategories = (state: RootState) => state.category.productCategory ;

export default productsCategory.reducer;