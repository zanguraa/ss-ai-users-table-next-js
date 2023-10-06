import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users?_limit=10"
  );
  const data = await response.json();
  return data;
});

const initialState = {
  entities: [],
  loading: false,
} as any;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.entities.push(...action.payload);
    });
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
