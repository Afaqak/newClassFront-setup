import { createAction } from '../../../utils/actions';

import { UserActionTypes } from './user.action';
export const setCurrentUser = (user) => createAction(UserActionTypes.SET_CURRENT_USER, user);

export const setToggleBroadcast = (payload) => createAction(UserActionTypes.TOGGLE_BROADCAST, payload);
