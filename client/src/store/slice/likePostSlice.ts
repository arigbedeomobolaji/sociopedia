import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiBaseUrl from "@src/libs/apiBaseUlr";
import axios from "axios";
interface Data {
	token: string;
	path: string;
	postId: string;
}
export const likePostAPi = createAsyncThunk(
	"likePost",
	async (data: Data, { rejectWithValue }) => {
		try {
			const token = data.token;
			const path = data.path;
			const postId = data.postId.toString();
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};
			const url = `${apiBaseUrl}/api/posts/${path}/${postId}`;
			const response = await axios.patch(url, {}, config);
			if (response.data) {
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

interface InitialState {
	loading: boolean;
	error: any;
	message: string;
}

const initialState: InitialState = {
	loading: false,
	error: null,
	message: "",
};

export const likePostSlice = createSlice({
	name: "likePost",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(likePostAPi.pending, (state) => {
			state.loading = true;
			state.error = null;
			state.message = "";
		});
		builder.addCase(likePostAPi.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
			state.message = "";
		});
		builder.addCase(likePostAPi.fulfilled, (state, action) => {
			state.loading = false;
			state.error = null;
			state.message = action.payload;
		});
	},
});

const likePostReducer = likePostSlice.reducer;
export default likePostReducer;
