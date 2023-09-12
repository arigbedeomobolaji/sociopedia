import { configureStore } from "@reduxjs/toolkit";
import issueReducer from "./slice/exampleSlice";
import githubIssueReducer from "./slice/asynchronousSlice";
import changeThemeReducer from "./slice/changeThemeSlice";

export const store = configureStore({
	reducer: {
		issue: issueReducer,
		githubIssue: githubIssueReducer,
		changeTheme: changeThemeReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// The code above configure and creates the store using the configureStore() function that accepts a reducer where we can pass all of the different reducers.
