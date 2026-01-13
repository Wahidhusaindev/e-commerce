import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Mock payment processing function
const processPayment = async (paymentData) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Simulate payment success/failure (90% success rate)
  const isSuccess = Math.random() > 0.1;

  if (!isSuccess) {
    throw new Error("Payment failed. Please try again.");
  }

  return {
    orderId: `ORD-${Date.now()}`,
    transactionId: `TXN-${Math.random().toString(36).substr(2, 9)}`,
    status: "completed",
    timestamp: new Date().toISOString()
  };
};

// Async thunk for processing payment
export const processOrderPayment = createAsyncThunk(
  "payment/processOrderPayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const result = await processPayment(paymentData);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    currentOrder: null,
    orderHistory: JSON.parse(localStorage.getItem("orderHistory")) || [],
    loading: false,
    error: null,
    lastOrder: null,
  },
  reducers: {
    clearPaymentError: (state) => {
      state.error = null;
    },
    clearLastOrder: (state) => {
      state.lastOrder = null;
    },
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(processOrderPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(processOrderPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.lastOrder = {
          ...state.currentOrder,
          ...action.payload,
        };
        // Add to order history
        state.orderHistory.unshift(state.lastOrder);
        localStorage.setItem("orderHistory", JSON.stringify(state.orderHistory));
        // Clear current order
        state.currentOrder = null;
        state.error = null;
      })
      .addCase(processOrderPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPaymentError, clearLastOrder, setCurrentOrder } = paymentSlice.actions;
export default paymentSlice.reducer;