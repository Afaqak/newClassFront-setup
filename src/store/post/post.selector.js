import { createSelector } from 'reselect';

const selectPost = (state) => state.post;

export const selectPostPage = createSelector([selectPost], (post) => post.page);
