import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('https://dummyjson.com/products');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`https://dummyjson.com/products/${id}`);
    return id; 
  } catch (error) {
    if (error.response?.status === 404) {
      return id; 
    }
    return rejectWithValue(error.response?.data?.message || 'Failed to delete product');
  }
});

export const addProduct = createAsyncThunk('products/addProduct', async (productData, { rejectWithValue }) => {
    try {
        const response = await axios.post('https://dummyjson.com/products/add', productData);
        return response.data; 
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to add product');
    }
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, ...productData }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`https://dummyjson.com/products/${id}`, productData);

        return { ...response.data, ...productData, id };

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to update product');
    }
});

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        total: 0,
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => { state.isLoading = true; })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload.products;
                state.total = action.payload.total;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.id !== action.payload);
                state.total -= 1;
            })

            .addCase(addProduct.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
                state.total += 1;
            })

            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.items.findIndex((item) => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            });
    },
});

export default productSlice.reducer;
