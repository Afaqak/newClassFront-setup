import { UserActionTypes } from './user.action';

const INITIAL_STATE = {
  currentUser: null,
  toggleBroadcast: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case UserActionTypes.TOGGLE_BROADCAST:
      return {
        ...state,
        toggleBroadcast: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
