import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector([selectUser], (user) => user.currentUser);

export const selectToggleAnnouncement = createSelector([selectUser], (user) => user.toggleAnnouncement);

export const selectToggleGroupAnnouncement = createSelector([selectUser], (user) => user.toggleGroupAnnouncement);
