import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchIssues = createAsyncThunk<
	string[],
	void,
	{ rejectValue: string }
>("githubIssue/fetchIssues", async (_, thunkAPI) => {
	try {
		const response = await axios.get(
			"https://api.github.com/repos/github/hub/issues"
		);
		const data = response.data;
		const issues = data.map((issue: { title: string }) => issue.title);
		return issues;
	} catch (error) {
		return thunkAPI.rejectWithValue("failed to fetch issues.");
	}
});

export interface issueState {
	issues: string[];
	loading: boolean;
	error: string | null;
}

const initialState: issueState = {
	issues: [],
	loading: false,
	error: null,
};

export const issuesSliceGithub = createSlice({
	name: "github_issues",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchIssues.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchIssues.fulfilled, (state, action) => {
				state.loading = false;
				state.issues = action.payload;
			})
			.addCase(fetchIssues.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "something went wrong";
			});
	},
});

export default issuesSliceGithub.reducer;

/* 
From above let's understand fetchIssues first
a. we used the createAsyncThunk() API provided by the redux toolkit. it helps create asynchronous actions and handles tha app's loading and error states.

b. The action type name is the first argument passed to createAsyncThunk(). The Specific action type name we have defined is githubIssue/fetchIssues.

c. The second argument is function that returns a Promise, which resolves to the value that dispatches the action.

d. the third argument is an object that contains configuration options for the async thunk. In this case, we have specified that the async thunk will not be dispatched with any argument (hence the void type) and that if the Promise returned by  the async thunk will return an action with a rejected status along with a rejectValue property that contains the string "Failed to fetch Issues"


extraReducers
This object contains the reducers logic for the reducers not defined in the createSlice reducers object. It takes a builder object where different cases can be added using addCase for specific action types.

addCase
This method on the builder object creates a new case for the reducer function

API call states
the callback function passed to the addCase method is dispatched by createAsyncThunk(), which updates the different store objects based on the API call states (pending, fulfilled and error)
*/

// We can now use the GithunIssue reducer actions and the store in our app. Let's add the GithubIssueReducer to our store first.
