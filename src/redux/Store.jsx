// Store.jsx
import { persistStore, persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import userSlice from "./User";
import emailSlice from "./Email"; // Make sure the filename matches correctly

const userPersistConfig = {
  key: "user",
  storage,
};

const emailPersistConfig = {
  key: "email",
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userSlice);
const persistedEmailReducer = persistReducer(emailPersistConfig, emailSlice);

const rootReducer = {
  user: persistedUserReducer,
  email: persistedEmailReducer,
};

const Store = configureStore({
  reducer: rootReducer,
});

const persistor = persistStore(Store);

export { Store, persistor };
