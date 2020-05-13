import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface ProductCategory {
    id: number;
    name: string;
}

interface Products {
    id: number | string;
    name: string;
    price: number;
    date: string;
}

interface ProductCategoryState {
    productCategory: ProductCategory[];
    
}

interface ProductListState {
    productsList: Products[];
}

const initialState: ProductCategoryState & ProductListState = {
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
    productsList: [
        {
            id: 1,
            name: "Iphone 11 Pro",
            price: 12.000,
            date: "August 7th 2019",
        },
        {
            id: 2,
            name: "Iphone XS",
            price: 12.000,
            date: "Sepember 7th 2018",
        },
        {
            id: 1,
            name: "Iphone 11",
            price: 12.000,
            date: "July 27th 2019",
        }
    ],
}

export const products = createSlice({
    name: "products",
    initialState,
    reducers: {
        fetchCategory: (state = initialState, {payload}: PayloadAction<ProductCategory>) => {
            state.productCategory = [];
        },

        fetchProducts: (state = initialState, {payload}: PayloadAction<Products>) => {
            state.productsList = [];
        }
    },
})

export const { fetchCategory, fetchProducts } = products.actions;

export const categoryList = (state: RootState) => state.products.productCategory;

export const productsList = (state: RootState) => state.products.productsList;

export default products.reducer;