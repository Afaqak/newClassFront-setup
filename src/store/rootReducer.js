import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import { coursesReducer } from "./courses/courses.reducer";
const rootReducer = combineReducers({
    //reducers
    user: userReducer,
    courses: coursesReducer,

});

export default rootReducer;