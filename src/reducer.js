import { combineReducers } from "redux";
import triviaReducer from "./redux/reducers/triviaSlice";

const rootReducer = combineReducers({
    trivia: triviaReducer
})

export default rootReducer