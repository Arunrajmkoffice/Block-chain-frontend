import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk, withExtraArgument } from 'redux-thunk';
import { authReducer } from "./auth/reducer";
import { dataReducer} from "./data/reducer";
// import { dataReducer } from "./data/reducer";

const root = combineReducers({
    auth:authReducer,data:dataReducer
})

export const store = legacy_createStore(
    root,
    applyMiddleware(thunk)
)