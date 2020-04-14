import { GET_ARTICLE } from './constants';

export function getArticleAction() {
  return {
    type: GET_ARTICLE.REQUEST,
  };
}
