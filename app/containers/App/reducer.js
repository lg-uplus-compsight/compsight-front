/*
 *
 * app reducer
 *
 */
import produce from 'immer';
import { GET_ARTICLE, GET_YOUTUBE_COMMENTS } from './constants';

export const initialState = {
  loading: false,
  articleList: [],
  words: [],
  uniquePeople: [],
  dates: [],
  createdAt: null,
  youtubeLoading: false,
  comments: [],
  videoList: [],
  mainVideo: {
    id: {
      videoId: null,
    },
    snippet: {
      publishedAt: '',
      title: '',
      description: '',
      channelTitle: '',
    },
  },
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_ARTICLE.REQUEST:
        draft.loading = true;
        draft.createdAt = action.createdAt;
        break;
      case GET_ARTICLE.SUCCESS:
        draft.loading = false;
        draft.articleList = action.result;
        draft.words = action.words;
        draft.uniquePeople = action.uniquePeople;
        draft.uniqueKeyword = action.uniqueKeywor;
        draft.dates = action.dates;
        break;
      case GET_ARTICLE.FAIL:
        draft.loading = false;
        break;

      case GET_YOUTUBE_COMMENTS.REQUEST:
        draft.youtubeLoading = true;
        break;
      case GET_YOUTUBE_COMMENTS.SUCCESS:
        draft.youtubeLoading = false;
        draft.comments = action.comments;
        draft.videoList = action.videoList;
        draft.mainVideo = action.mainVideo;
        break;
      case GET_YOUTUBE_COMMENTS.FAIL:
        draft.youtubeLoading = false;
        break;
    }
  });

export default appReducer;
