import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 1. READ: Fetch all products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('https://dummyjson.com/products');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
});

// 2. DELETE: Remove a product
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`https://dummyjson.com/products/${id}`);
        return id; // Return the ID so we can filter it out of our local state
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to delete product');
    }
});

// 3. CREATE: Add a new product
export const addProduct = createAsyncThunk('products/addProduct', async (productData, { rejectWithValue }) => {
    try {
        const response = await axios.post('https://dummyjson.com/products/add', productData);
        return response.data; // Returns the newly created product object
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to add product');
    }
});

// 4. UPDATE: Edit an existing product
export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, ...productData }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`https://dummyjson.com/products/${id}`, productData);

        // THE FIX: We merge the API's response with our exact productData.
        // This forces Redux to accept the '0' that DummyJSON ignored!
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
            // Fetch Handlers
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

            // Delete Handler: Filter out the deleted ID from the items array
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.id !== action.payload);
                state.total -= 1;
            })

            // Add Handler: Push the new product to the top of the array
            .addCase(addProduct.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
                state.total += 1;
            })

            // Update Handler: Find the item and replace its data
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.items.findIndex((item) => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            });
    },
});

export default productSlice.reducer;
