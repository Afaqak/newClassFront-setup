const INITIAL_STATE = {
  announcement: [],
};
const AncmentActionTypes = {
  SET_ANNOUNCEMENT: 'SET_ANNOUNCEMENT',
};

export const announcementReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AncmentActionTypes.SET_ANNOUNCEMENT:
      return {
        ...state,
        announcement: action.payload,
      };
    default:
      return state;
  }
};
