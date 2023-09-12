import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState, store } from "../store";
import { UserInfo } from "./authSlice";
import apiBaseUrl from "@src/libs/apiBaseUlr";

export const getMeApi = createAsyncThunk(
	"getMeApi",
	async (token: string, { rejectWithValue }) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};

			const response = await axios.get(
				`${apiBaseUrl}/api/user/me`,
				config
			);

			if (response.data) {
				localStorage.setItem("userData", JSON.stringify(response.data));
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

export interface UserData {
	user: UserInfo;
	token: string;
}

export interface InitialState {
	loading: boolean;
	error: any;
	userData: UserData;
}

export const initialState: InitialState = {
	loading: false,
	error: null,
	userData: null,
};

const getMeSlice = createSlice({
	name: "me",
	initialState,
	reducers: {
		getMe: (state) => {
			state.userData = JSON.parse(localStorage.getItem("userData"));
		},
		removeMe: (state) => {
			localStorage.removeItem("userData");
			state.userData = null;
		},
		addFriend: (state, action: PayloadAction<string>) => {
			state.userData.user.friends.push(action.payload);
			localStorage.setItem("userData", JSON.stringify(state.userData));
		},
		removeFriend: (state, action: PayloadAction<string>) => {
			const friends = state.userData.user.friends.filter(
				(friend) => friend !== action.payload
			);
			state.userData.user.friends = friends;
			localStorage.setItem("userData", JSON.stringify(state.userData));
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getMeApi.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(getMeApi.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
		builder.addCase(getMeApi.fulfilled, (state, action) => {
			state.loading = false;
			state.error = null;
			state.userData = action.payload;
		});
	},
});

export const selectMe = (state: RootState) => state.me;
export const { getMe, removeMe, addFriend, removeFriend } = getMeSlice.actions;
const getMeReducer = getMeSlice.reducer;

export default getMeReducer;
