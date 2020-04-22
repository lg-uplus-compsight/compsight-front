import { call, put, takeLatest, all, select } from 'redux-saga/effects';
import _ from 'lodash';
import { GET_ARTICLE, GET_YOUTUBE_COMMENTS } from './constants';
import { API_URL } from '../../constants';
import { getRequest } from '../../utils/request';
import videoJson from './video.json';
import commentJson from './comments.json';

function* getArticleSaga(action) {
  const { createdAt } = action;
  const appState = yield select(state => state.app);
  let params = '';
  if (createdAt) params = `?createdAt=${createdAt}`;
  const url = `${API_URL}/articles${params}`;
  try {
    const { articles, words, uniqueKeyword, uniquePeople, dates } = yield call(
      getRequest,
      { url },
    );
    // console.log(result);
    yield put({
      type: GET_ARTICLE.SUCCESS,
      result: articles,
      words,
      uniqueKeyword,
      uniquePeople,
      dates: params !== '' ? appState.dates : dates,
    });
  } catch (error) {
    console.log(error);
    yield put({ type: GET_ARTICLE.FAIL, error });
  }
}

function* getYoutubeSaga(action) {
  const { query } = action;
  const url = `${API_URL}/comments?query=${query}`;
  try {
    // const { video, comments } = yield call(getRequest, { url });
    const video = videoJson;
    const comments = commentJson;
    yield put({
      type: GET_YOUTUBE_COMMENTS.SUCCESS,
      video,
      videoList: video.items,
      mainVideo: video.items && video.items[0],
      comments,
    });
  } catch (error) {
    console.log(error);
    yield put({ type: GET_YOUTUBE_COMMENTS.FAIL, error });
  }
}

// Individual exports for testing
export default function* rootSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    takeLatest(GET_ARTICLE.REQUEST, getArticleSaga),
    takeLatest(GET_YOUTUBE_COMMENTS.REQUEST, getYoutubeSaga),
  ]);
}
