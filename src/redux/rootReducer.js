import {combineReducers} from "redux";
import {getHeroesReducer} from "./heroes/getHeroesReducer";

export const rootReducer = combineReducers({
    getHeroes: getHeroesReducer
})