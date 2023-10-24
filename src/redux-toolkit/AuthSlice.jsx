import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    user: null,
    storeId: null,
  },
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        storeId: action.payload.storeId,
      };
    },
    logout: (state) => ({
      ...state,
      token: null,
      user: null,
      storeId: null,
    }),
    setStoreId: (state, action) => ({
      ...state,
      storeId: action.payload.storeId,
    }),
    setUser: (state, action) => ({
      ...state,
      user: action.payload.user,
    }),
    setToken: (state, action) => ({
      ...state,
      token: action.payload.token,
    }),
  },
});

export const { login, logout, setStoreId, setUser, setToken } =
  AuthSlice.actions;
export default AuthSlice.reducer;
