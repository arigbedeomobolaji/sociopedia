// src/redux/store.js
import {
	Action,
	ThunkAction,
	combineReducers,
	configureStore,
} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import thunk from "redux-thunk";
import authReducer from "./slice/authSlice";
import logoutReducer from "./slice/logoutSlice";
import changeThemeReducer from "./slice/changeThemeSlice";
import commentsReducer from "./slice/commentSlice";
import updateUserReducer from "./slice/updateUserSlice";
import getMeReducer from "./slice/userDataSlice";
import { createWrapper } from "next-redux-wrapper";
import otherUsersReducer from "./slice/allFriendsSlice";
import editFriendsReducer from "./slice/editFriendSlice";
import uploadPicsReducer from "./slice/uploadPicsSlice";
import createPostReducer from "./slice/createPostSlice";
import getPostsReducer from "./slice/getPostsSlice";
import likePostReducer from "./slice/likePostSlice";
import addCommentReducer from "./slice/commentSlice";

const persistConfig = {
	key: "root",
	storage,
	version: 1,
	stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
	me: getMeReducer,
	auth: authReducer,
	getPosts: getPostsReducer,
	likePost: likePostReducer,
	createPost: createPostReducer,
	addComment: addCommentReducer,
	updateUser: updateUserReducer,
	otherUsers: otherUsersReducer,
	uploadPics: uploadPicsReducer,
	editFriend: editFriendsReducer,
	logout: logoutReducer,
	changeTheme: changeThemeReducer,
	comments: commentsReducer,
});

const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== "production",
	middleware: [thunk],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;

export const wrapper = createWrapper<any>(() => persistor);
