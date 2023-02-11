import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import { coursesReducer } from './courses/courses.reducer';
import { announcementReducer } from './announcement/ancment.reducer';
const rootReducer = combineReducers({
  //reducers
  user: userReducer,
  courses: coursesReducer,
  announcement: announcementReducer,
});

export default rootReducer;
