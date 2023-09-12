import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { SocialMedium } from "@src/components/EditProfile/AddSocialMedia";
import apiBaseUrl from "@src/libs/apiBaseUlr";

export interface Data {
	email?: string;
	password?: string;
	path?: string;
	firstname?: string;
	surname?: string;
	username?: string;
	country?: string;
	state?: string;
	city?: string;
	profilePics?: string;
	dateOfBirth?: string;
	gender?: string;
	phoneNumber?: string;
	age?: number;
	occupation?: string;
}

export interface UserInfo extends Data {
	_id?: string;
	friends?: string[];
	profileViews?: number;
	impressionCount?: number;
	posts?: [];
	socialMedia?: SocialMedium[];
}

// export interface AuthData {
// 	user: UserInfo;
// 	token: string;
// }

// define the async thunk
export const authApi = createAsyncThunk(
	"user",
	async (data: Data, { rejectWithValue }) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			const path = data?.path;
			delete data.path;
			const response = await axios.post(
				`${apiBaseUrl}/api/user/${path}`,
				data,
				config
			);
			if (response) {
				localStorage.setItem("userData", JSON.stringify(response.data));
				return response.data;
			}
		} catch (error) {
			if (error.response && error.response.data.message) {
				const errorMessage = error.response.data.message;
				if (errorMessage.message) {
					return rejectWithValue(errorMessage.message.split(":")[2]);
				}
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export interface AuthInitialState {
	loading: boolean;
	error: any;
}

const initialState: AuthInitialState = {
	loading: false,
	error: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(authApi.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(authApi.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
		builder.addCase(authApi.fulfilled, (state, action) => {
			state.loading = false;
			state.error = null;
		});
	},
});

export const selectAuth = (state: RootState) => state.auth;
const authReducer = authSlice.reducer;

export default authReducer;
