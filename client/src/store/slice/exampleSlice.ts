// STEP 1
/* 

//  terminologies about @reduxjs/toolkit

methods
1. createSlice  ==> makes it easier to define reducer, actions and the initialState under one object.

2. configureStore ==> an abstraction for the Redux createStore(). it removes the dependency of defining reducers separately and creating a store again.

3. createAsyncThunk ==> This function simplifies making asynchronous calls. It automatically dispatches many different actions for managing the state of the calls and provides a standardised way to handle errors.


*/
// 1. creating Action and Reducer

// Part 1 - we import the necessary functions from the @reduxjs/toolkit package
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../exampleStore";

// Part 2 - a. we create the type definition for our initial state
// b. initialise the initialState for the issueReducer
export interface IssueInitialState {
	projectIssues: string[];
}

const initialState: IssueInitialState = {
	projectIssues: [],
};

// Part 3 - we define a slice using redux toolkits createSlice which has the logic of the issueReducer as well as the different actions associated with it.
/* 
// createSlice accepts an object with a few properties 

a. name: the name of the slice
b. initialState: the initial state of the reducer function
c. reducers: an object that accepts different actions we want to define for our reducer



*/
export const issueSlice = createSlice({
	name: "issue",
	initialState,
	reducers: {
		addIssue: (state, action: PayloadAction<string>) => {
			state.projectIssues = [...state.projectIssues, action.payload];
		},
	},
});

// part 4
/* 
addIssue action is dispatched whenever a new issue is submitted.
issueReducer stores all the submitted issues by dispatching the addIssue action
*/
export const { addIssue } = issueSlice.actions;
export const selectIssue = (state: RootState) => state.issue.projectIssues;
export default issueSlice.reducer;

// STEP 2
// configure the issueReducer in our exampleStore.ts
// go to exampleStore.ts from more

// STEP 3
// pass the store to our App check "src/app/layout.tsx"
// using the Provider and store

// STEP 4
// use our app with Redux Toolkit
// a. dipatch() is used to dispatch any actions to the store
// b. useSelector() is used for accessing any state properties

/*
// here we dispatch the addIssue action when the form button is clicked

const handleClick = () => {
 dispatch(addIssue(textInput))
}
*/

/* 
// access projectIssue list stored in our reducer store
const issueList = useSelector((state: RootState) => state.issye.projectIssues);

*/

// check asynchronousSlice.ts for how to make asynchronous call using creatAsyncThunk()
