import { createAction } from '../../../utils/actions';
import { courseActionType } from './courses.actions.t';

export const setCoursesData = (courses) => createAction(courseActionType.SET_COURSES, courses);
