/* import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Game } from "@src/app/interface/gameInterface";
import axios from "axios";

interface GameState {
	games?: Game[];
	loading: boolean;
	singleGame?: Game;
}

const initialState: GameState = {
	games: [],
	loading: false,
	singleGame: undefined,
};

// actions ==> these are processes that get data from the backend

const getGames = createAsyncThunk<Game[]>(
	"games/getGame",
	async (_, thunkAPI) => {
		try {
			const response = await axios.get("http://localhost:8080/api/games");
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);
// reducers ==> reduce to a specific state ==> Change state

const gameSlice = createSlice(
 "games",
 initialState,
 reducers: {
  getGames: (state: { games: Game[]; }, action: PayloadAction<Game>) => {
   state.games = [...state.games, action.payload]
  }
 }
)

 */
