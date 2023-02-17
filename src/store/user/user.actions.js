import { createAction } from '../../../utils/actions';

import { UserActionTypes } from './user.action';

export const setCurrentUser = (user) => createAction(UserActionTypes.SET_CURRENT_USER, user);

export const setToggleAnnouncement = (payload) => createAction(UserActionTypes.TOGGLE_ANNOUCEMENT, payload);

export const setToggleGroupAnnouncement = (payload) => createAction(UserActionTypes.TOGGLE_GROUP_ANNOUCEMENT, payload);

export const setToggleUserInfo = (payload) => createAction(UserActionTypes.TOGGLE_USER_INFO, payload);
