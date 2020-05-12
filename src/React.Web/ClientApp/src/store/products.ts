import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface ProductCategory {
    id: number;
    name: string;
}

interface ProductCategoryState {
    productCategory: ProductCategory[];
    
}

const initialState: ProductCategoryState = {
    productCategory: [                
    {
        id: 1,
        name: "Apple",
    },
    {
        id: 2,
        name: "Samsung",
    },
    {
        id: 3,
        name: "Nokia",
    },
    {
        id: 4,
        name: "Xiaomi",
    },
    {
        id: 5,
        name: "Huawei",
    },
],
}

export const category = createSlice({
    name: "category",
    initialState,
    reducers: {
        fetchCategory: (state, {payload}: PayloadAction<ProductCategory>) => {
            state.productCategory = [];
        },
    },
})

export const { fetchCategory } = category.actions;

export const categoryList = (state: RootState) => state.products.productCategory;

export default category.reducer;