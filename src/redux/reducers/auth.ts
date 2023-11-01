import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";

interface IState {
  isAuthenticated?: boolean;
  account?: any;
  loading?: boolean;
}

const initialState: IState = {
  isAuthenticated: false,
  account: {},
  loading: false
};

const slicer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticate: (
      state: WritableDraft<IState>,
      action: PayloadAction<{
        isAuthenticated?: boolean;
        account?: any;
        loading?: boolean
      }>
    ) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.account = action.payload.account;
      state.loading = action.payload.loading;
    },
  },
});

export const { setAuthenticate } = slicer.actions;

export default slicer.reducer;
