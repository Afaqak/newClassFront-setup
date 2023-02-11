import { createSelector } from 'reselect';

const getAnnouncement = (state) => state.announcement;

export const selectAnnouncement = createSelector([getAnnouncement], (announcement) => announcement.announcement);
