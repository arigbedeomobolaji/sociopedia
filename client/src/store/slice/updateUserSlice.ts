import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "@store/slice/authSlice";
import axios from "axios";
import { RootState } from "../store";
import apiBaseUrl from "@src/libs/apiBaseUlr";

export interface UpdateData extends UserInfo {
	token?: string;
}
export const updateUserApi = createAsyncThunk(
	"updateUser",
	async (data: UpdateData, { rejectWithValue }) => {
		try {
			const token = data.token;
			delete data.token;
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};

			const response = await axios.patch(
				`${apiBaseUrl}/api/user/me`,
				data,
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
	user: UpdateData;
}
export interface InitialState {
	loading: boolean;
	error: any;
}

const initialState: InitialState = {
	loading: false,
	error: null,
};

export const updateUserSlice = createSlice({
	name: "updateUser",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(updateUserApi.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(updateUserApi.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
		builder.addCase(updateUserApi.fulfilled, (state) => {
			state.loading = false;
			state.error = null;
		});
	},
});

export const selectUpdateUser = (state: RootState) => state.updateUser;
const updateUserReducer = updateUserSlice.reducer;

export default updateUserReducer;
