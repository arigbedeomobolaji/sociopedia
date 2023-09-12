import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import apiBaseUrl from "@src/libs/apiBaseUlr";

export const logoutUser = createAsyncThunk(
	"user/logout",
	async (token: string, { rejectWithValue }) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};
			const response = await axios.post(
				`${apiBaseUrl}/api/user/logout`,
				{ token },
				config
			);
			if (response?.data) {
				localStorage.removeItem("userData");
				localStorage.removeItem("otherUsers");
				return response.data;
			}
		} catch (error) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export interface LogoutInitialState {
	loading: boolean;
	error: any;
}

const initialState: LogoutInitialState = {
	loading: false,
	error: null,
};

const logoutSlice = createSlice({
	name: "logout",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(logoutUser.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(logoutUser.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
		builder.addCase(logoutUser.fulfilled, (state) => {
			state.loading = false;
			state.error = null;
		});
	},
});

export const selectLogout = (state: RootState) => state.logout;
export const logoutAction = logoutSlice.actions;
const logoutReducer = logoutSlice.reducer;
export default logoutReducer;
