import { SET_POST } from './post.action.t';
import { createAction } from '../../../utils/actions';

export const setPost = (payload) => createAction(SET_POST.SET_PAGE, payload);
