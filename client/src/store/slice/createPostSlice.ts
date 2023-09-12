import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { error } from "console";
import { RootState } from "../store";

interface Data {
	token: string;
	tweet: string;
	files: any[];
}

export const createPostApi = createAsyncThunk(
	"createPost",
	async (data: Data, { rejectWithValue }) => {
		try {
			const token = data?.token;
			delete data?.token;
			const filesReqBody = data.files.map((file): any => ({
				type: file.type,
			}));
			const files = data.files;
			const caption = data.tweet;
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};

			const response = await axios.post(
				"http://127.0.0.1:8080/api/upload",
				{ files: filesReqBody },
				config
			);
			let index = 0;
			const totalFiles = data.files.length;
			let postImages = [];
			if (response.data) {
				const data = response.data;
				for (let index = 0; index <= totalFiles; index++) {
					if (index === totalFiles) {
						const createResponse = await axios.post(
							"http://127.0.0.1:8080/api/posts",
							{
								caption,
								postImages,
							},
							config
						);
						if (createResponse.data) {
							return createResponse.data;
						}
					}

					const uploadToAWS = await axios.put(
						data[index].url,
						files[index],
						{
							headers: { "Content-Type": files[index].type },
						}
					);
					postImages = postImages.concat(data[index].key);
				}
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
	isCreated: boolean;
}

const initialState: InitialState = {
	loading: false,
	error: null,
	isCreated: false,
};

const createPostSlice = createSlice({
	name: "createPost",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(createPostApi.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(createPostApi.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
			state.isCreated = false;
		});
		builder.addCase(createPostApi.fulfilled, (state) => {
			state.loading = false;
			state.error = null;
			state.isCreated = true;
		});
	},
});

export const selectCreatePost = (state: RootState) => state.isCreated;
const createPostReducer = createPostSlice.reducer;
export default createPostReducer;
