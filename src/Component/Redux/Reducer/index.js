import { combineReducers } from "redux";
import dataReducer from "./productReducer";

const rootReducer = combineReducers({
  data: dataReducer,
});
export default rootReducer;
