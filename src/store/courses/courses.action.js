import { createAction } from '../../../utils/actions';
import { courseActionType } from './courses.actions.t';

const setCoursesData = (courses) => createAction(courseActionType.SET_COURSES, courses);

export default setCoursesData;
