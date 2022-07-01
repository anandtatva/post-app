import { combineReducers, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PostListSlice from "./reducer/post-list-slice";

const persistConfig = {
    key: "post-list",
    storage: AsyncStorage
}

const rootReducer = combineReducers({
    posts: PostListSlice
})

const persistReducers = persistReducer(persistConfig, rootReducer);

const store = createStore(persistReducers);

const persistor = persistStore(store);

export {
    store,
    persistor
}