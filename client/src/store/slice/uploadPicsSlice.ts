import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { useAppDispatch } from "@src/libs/hooks";
import { updateUserApi } from "./updateUserSlice";

export interface UploadPicsDataApi {
	token?: string;
	file: any;
}

export const uploadpicsApi = createAsyncThunk(
	"upload/picture",
	async (data: UploadPicsDataApi, { rejectWithValue }) => {
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
				"http://127.0.0.1:8080/api/upload",
				config
			);
			if (response.data) {
				console.log(response.data);
				await axios.put(response.data.url, data.file, {
					headers: { "Content-Type": data.file.type },
				});
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

export interface UploadPicsData {
	url: string;
	key: string;
}

export interface UploadPicsInitialState {
	loading: boolean;
	error: any;
	uploadPics: UploadPicsData;
}

export const initialState: UploadPicsInitialState = {
	loading: false,
	error: null,
	uploadPics: null,
};

export const uploadPicsSlice = createSlice({
	name: "uploadPics",
	initialState,
	reducers: {
		removeUploadPicsData: (state) => {
			state.uploadPics = null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(uploadpicsApi.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(uploadpicsApi.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
		builder.addCase(uploadpicsApi.fulfilled, (state, action) => {
			state.loading = false;
			state.error = null;
			state.uploadPics = action.payload;
		});
	},
});

export const selectUploadPics = (state: RootState) => state.uploadPics;
export const { removeUploadPicsData } = uploadPicsSlice.actions;
const uploadPicsReducer = uploadPicsSlice.reducer;

export default uploadPicsReducer;
