import { combineReducers } from "redux";
import {
  dataReducer,
  searchDataReducer,
  searchReducer,
} from "./productReducer";

const rootReducer = combineReducers({
  data: dataReducer,
  searchdata: searchDataReducer,
  search: searchReducer,
});
export default rootReducer;
