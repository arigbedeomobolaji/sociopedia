import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface Data {
	token: string;
	postId: string;
	comment: string;
}

export const addCommentApi = createAsyncThunk(
	"addComment",
	async (data: Data, { rejectWithValue }) => {
		try {
			const { token, postId } = data;
			delete data.token;
			delete data.postId;
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};

			const response = await axios.post(
				`http://127.0.0.1:8080/api/comments/${postId.toString()}`,
				data,
				config
			);
			if (response.data) {
				return response.data.message;
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

export const addCommentSlice = createSlice({
	name: "addComment",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(addCommentApi.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(addCommentApi.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
		builder.addCase(addCommentApi.fulfilled, (state, action) => {
			state.loading = false;
			state.error = null;
			state.message = action.payload;
		});
	},
});

export const selectAddComment = (state: RootState) => state.addComment;
const addCommentReducer = addCommentSlice.reducer;
export default addCommentReducer;
