/*
 *
 * app reducer
 *
 */
import produce from 'immer';
import { GET_ARTICLE } from './constants';

export const initialState = {
  loading: false,
  articleList: [],
  words: [],
  uniquePeople: [],
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_ARTICLE.REQUEST:
        draft.loading = true;
        break;
      case GET_ARTICLE.SUCCESS:
        draft.loading = false;
        draft.articleList = action.result;
        draft.words = action.words;
        draft.uniquePeople = action.uniquePeople;
        break;
      case GET_ARTICLE.FAIL:
        draft.loading = false;
        break;
    }
  });

export default appReducer;
