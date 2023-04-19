import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import noteReducer from './slice/noteSlice'
import counterReducer from './slice/counterSlice'
import changeThemeReducer from './slice/changeThemeSlice';

const store = configureStore({
    reducer: {
      notes: noteReducer,
      counter: counterReducer,
      changeTheme: changeThemeReducer
    },
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const wrapper = createWrapper(() => store);
