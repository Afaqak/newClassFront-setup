import { UserActionTypes } from './user.action';

const INITIAL_STATE = {
  currentUser: null,
  toggleAnnouncement: false,
  toggleGroupAnnouncement: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case UserActionTypes.TOGGLE_ANNOUCEMENT:
      return {
        ...state,
        toggleAnnouncement: action.payload,
      };
    case UserActionTypes.TOGGLE_GROUP_ANNOUCEMENT:
      return {
        ...state,
        toggleGroupAnnouncement: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
