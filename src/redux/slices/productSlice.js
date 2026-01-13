import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("https://fakestoreapi.com/products", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Add timeout
                signal: AbortSignal.timeout(10000) // 10 second timeout
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching products:', error);
            return rejectWithValue(error.message || 'Failed to fetch products');
        }
    }
);

const productSlice = createSlice({
    name: "products",
    initialState: {
        data: [],
        status: "idle",
        error: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "success";
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || 'Failed to fetch products';
                // Provide fallback data for demo purposes
                state.data = [
                    {
                        id: 1,
                        title: "Sample Product",
                        price: 29.99,
                        description: "This is a sample product description.",
                        category: "sample",
                        image: "https://via.placeholder.com/300x300?text=Product",
                        rating: { rate: 4.5, count: 10 }
                    }
                ];
            });
    },
});

export const { clearError } = productSlice.actions;
export default productSlice.reducer;
