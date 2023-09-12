import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import apiBaseUrl from "@src/libs/apiBaseUlr";

interface Data {
	token?: string;
	path?: string;
	userId: string;
}

export const editFriendsApi = createAsyncThunk(
	"editFriends",
	async (data: Data, { rejectWithValue }) => {
		try {
			const token = data?.token;
			const path = data?.path;
			delete data?.token;
			delete data?.path;
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};

			const response = await axios.patch(
				`${apiBaseUrl}/api/user/friends/${path}`,
				data,
				config
			);
			if (response.data) {
				localStorage.setItem("userData", JSON.stringify(response.data));
				return `user successfully ${
					path === "add" ? "added" : "removed"
				}`;
			}
		} catch (error) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			}
			return rejectWithValue(error.message);
		}
	}
);

export interface InitialState {
	loading: boolean;
	error: any;
	message: string;
}

export const initialState: InitialState = {
	loading: false,
	error: null,
	message: null,
};

export const editFriendsSlice = createSlice({
	name: "addFriend",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(editFriendsApi.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(editFriendsApi.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
		builder.addCase(editFriendsApi.fulfilled, (state, action) => {
			state.loading = false;
			state.error = null;
			state.message = action.payload;
		});
	},
});

export const selectEditFriend = (state: RootState) => state.addFriend;
const EditFriendReducer = editFriendsSlice.reducer;
export default EditFriendReducer;
