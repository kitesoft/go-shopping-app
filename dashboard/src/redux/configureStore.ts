import { Action, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from "redux-persist/lib/storage/session";
import { ThunkAction } from "redux-thunk";
import rootReducer from "./rootReducer";

const RootStore = () => {
  const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user"],
    transforms: [
      encryptTransform({
        secretKey: "asfadsagfdsagadfs",
        onError: () => {},
      }),
    ],
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = configureStore({ reducer: persistedReducer });
  const persistor = persistStore(store);
  return { store, persistor };
};
const { store } = RootStore();
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export default RootStore;
