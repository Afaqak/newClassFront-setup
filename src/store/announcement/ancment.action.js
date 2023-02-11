import { AncmentActionTypes } from './ancment.action.t';
import { createAction } from '../../../utils/actions';

export const setAnnouncementRedux = (announcement) => createAction(AncmentActionTypes.SET_ANNOUNCEMENT, announcement);
