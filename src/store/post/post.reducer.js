import { SET_POST } from './post.action.t';
const InitialState = {
  page: 1,
};

export const postReducer = (state = InitialState, action) => {
  switch (action.type) {
    case SET_POST.SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    default:
      return state;
  }
};
