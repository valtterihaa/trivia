import { combineReducers } from "redux";
import setupReducer from "./redux/reducers/setupSlice";
import triviaReducer from "./redux/reducers/triviaSlice";

const rootReducer = combineReducers({
    setup: setupReducer,
    trivia: triviaReducer
})

export default rootReducer