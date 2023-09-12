import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@store/store";

export interface ChangeTheme {
	isDark: boolean;
}

const initialState: ChangeTheme = {
	isDark: false,
};

export const changeThemeSlice = createSlice({
	name: "changeTheme",
	initialState,
	reducers: {
		toggleTheme: (state) => {
			const toggledTheme = !state.isDark;
			state.isDark = toggledTheme;
		},
		forceToggleTheme: (state, actions: PayloadAction<boolean>) => {
			state.isDark = actions.payload;
		},
	},
});

//extract actions
export const { toggleTheme, forceToggleTheme } = changeThemeSlice.actions;

//extract selector
export const selectChangeTheme = (state: RootState) => state.changeTheme.isDark;

//Extract reducer
export default changeThemeSlice.reducer;
