import { GET_ARTICLE, GET_YOUTUBE_COMMENTS } from './constants';

export function getArticleAction({ createdAt }) {
  return {
    type: GET_ARTICLE.REQUEST,
    createdAt,
  };
}

export function getYoutubeAction({ query }) {
  return {
    type: GET_YOUTUBE_COMMENTS.REQUEST,
    query,
  };
}
