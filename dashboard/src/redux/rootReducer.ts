import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

/**
 * @description Aggregate all reducers into a root reducer
 */
const rootReducer = combineReducers({
  user:authSlice,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
