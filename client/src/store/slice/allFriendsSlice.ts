import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface Data {
	token?: string;
}

export const otherUsersApi = createAsyncThunk(
	"otherUsers",
	async (data: Data, { rejectWithValue }) => {
		try {
			const token = data?.token;
			delete data?.token;
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};

			const response = await axios.get(
				"http://127.0.0.1:8080/api/user/allusers",
				config
			);
			if (response.data) {
				localStorage.setItem(
					"otherUsers",
					JSON.stringify(response.data)
				);
				return response.data;
			}
		} catch (error) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			}
			return rejectWithValue(error.message);
		}
	}
);

export interface PotentialFriend {
	name: string;
	email: string;
	_id: string;
	occupation: string;
	profilePics: string;
}

export interface OtherUsers {
	potentialFriends: PotentialFriend[];
}

export interface InitialState {
	loading: boolean;
	error: any;
	otherUsers: OtherUsers;
}

export const initialState: InitialState = {
	loading: false,
	error: null,
	otherUsers: null,
};

export const otherUsersSlice = createSlice({
	name: "otherUsers",
	initialState,
	reducers: {
		addOtherUsers: (state, action) => {
			state.loading = false;
			state.error = null;
			state.otherUsers = action.payload;
			localStorage.setItem("otherUsers", action.payload);
		},
		removeOtherUsers: (state) => {
			state.otherUsers = null;
			localStorage.removeItem("otherUsers");
		},
	},
	extraReducers: (builder) => {
		builder.addCase(otherUsersApi.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(otherUsersApi.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
		builder.addCase(otherUsersApi.fulfilled, (state, action) => {
			state.loading = false;
			state.error = null;
			state.otherUsers = action.payload;
		});
	},
});

export const selectOtherUsers = (state: RootState) => state.otherUsers;
export const { addOtherUsers, removeOtherUsers } = otherUsersSlice.actions;
const otherUsersReducer = otherUsersSlice.reducer;

export default otherUsersReducer;
