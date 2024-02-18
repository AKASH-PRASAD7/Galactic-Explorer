import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "@/config/config";

const initialState = {
  data: [],
  next: null,
  prev: null,
  error: "",
  loading: false,
};

const fetchData = createAsyncThunk(
  "starWars/fetchData",
  async (url: string) => {
    const response = await fetch(`${config.starWarsUrl}${url}/format=json`);
    const data = await response.json();
    return data.results;
  }
);

const starWars = createSlice({
  name: "starWars",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        // Update other state properties as needed
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = "Falied to fetch";
      });
  },
});

export default starWars.reducer;
export { fetchData };
