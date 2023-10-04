import { combineReducers } from "redux";
import postInfo from "./use/post";
import counter from "./counter/c";

export default combineReducers({
  postInfo,
  counter,
});
