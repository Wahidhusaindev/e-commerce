import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      // Simulate API call - replace with actual API endpoint
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      // Store token in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({ username: credentials.username }));

      return { username: credentials.username, token: data.token };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      // Register user
      const registerResponse = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!registerResponse.ok) {
        throw new Error("Registration failed");
      }

      const newUser = await registerResponse.json();

      // Automatically login after successful registration
      const loginResponse = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userData.username,
          password: userData.password,
        }),
      });

      if (!loginResponse.ok) {
        throw new Error("Registration successful but auto-login failed. Please login manually.");
      }

      const loginData = await loginResponse.json();

      // Store token in localStorage
      localStorage.setItem("token", loginData.token);
      localStorage.setItem("user", JSON.stringify({ username: userData.username }));

      return { username: userData.username, token: loginData.token };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Check if user is authenticated on app load
const getInitialAuthState = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (token && user) {
    try {
      const parsedUser = JSON.parse(user);
      // Basic token validation - check if token exists and is not empty
      if (token.trim() && parsedUser.username) {
        return {
          isAuthenticated: true,
          user: parsedUser,
          token: token,
          loading: false,
          error: null,
        };
      }
    } catch (error) {
      // If parsing fails, clear invalid data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }

  return {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: false,
    error: null,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialAuthState(),
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload;
      })
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload;
      })
      // Logout cases
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setLoading } = authSlice.actions;
export default authSlice.reducer;