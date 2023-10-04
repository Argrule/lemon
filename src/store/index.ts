import { legacy_createStore as createStore } from "redux";
import rootReducer from "./reducers";

const store = createStore(rootReducer); // 创建数据存储仓库
export default store;
