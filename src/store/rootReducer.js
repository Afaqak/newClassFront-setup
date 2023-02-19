import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import { coursesReducer } from './courses/courses.reducer';
import { announcementReducer } from './announcement/ancment.reducer';
import { postReducer } from './post/post.reducer';
const rootReducer = combineReducers({
  //reducers
  user: userReducer,
  courses: coursesReducer,
  announcement: announcementReducer,
  post: postReducer,
});

export default rootReducer;
