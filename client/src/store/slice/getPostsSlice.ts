import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { UserInfo } from "./authSlice";
import apiBaseUrl from "@src/libs/apiBaseUlr";

export const getPostsApi = createAsyncThunk(
	"getPosts",
	async (token: string, { rejectWithValue }) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};
			const url = `${apiBaseUrl}/api/posts/all`;
			const response = await axios.get(url, config);
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

export type Post = {
	_id?: string;
	caption?: string;
	postImages: string[];
	owner: UserInfo;
	commentsId: string[];
	likes: string[];
};

interface InitialState {
	loading: boolean;
	error: any;
	posts: Post[];
}

const initialState: InitialState = {
	loading: false,
	error: null,
	posts: [],
};

export const getPostsSlice = createSlice({
	name: "getPosts",
	initialState,
	reducers: {
		removePosts: (state) => {
			state.posts = [];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getPostsApi.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(getPostsApi.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
		builder.addCase(getPostsApi.fulfilled, (state, action) => {
			state.loading = false;
			state.error = null;
			state.posts = action.payload;
		});
	},
});

export const selectPosts = (state: RootState) => state.getPosts;
export const { removePosts } = getPostsSlice.actions;
const getPostsReducer = getPostsSlice.reducer;
export default getPostsReducer;
