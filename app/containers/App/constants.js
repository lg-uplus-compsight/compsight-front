/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const GET_ARTICLE = {
  REQUEST: 'compsight/app/GET_ARTICLE_REQUEST',
  SUCCESS: 'compsight/app/GET_ARTICLE_SUCCESS',
  FAIL: 'compsight/app/GET_ARTICLE_FAIL',
};

export const GET_YOUTUBE_COMMENTS = {
  REQUEST: 'compsight/app/GET_YOUTUBE_COMMENTS_REQUEST',
  SUCCESS: 'compsight/app/GET_YOUTUBE_COMMENTS_SUCCESS',
  FAIL: 'compsight/app/GET_YOUTUBE_COMMENTS_FAIL',
};
