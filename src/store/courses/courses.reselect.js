import { createSelector } from 'reselect';

const selectCourses = (state) => state.courses;

export const selectCoursesList = createSelector([selectCourses], (courses) => courses.courses);
