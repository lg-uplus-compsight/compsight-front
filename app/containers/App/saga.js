import { call, put, takeLatest, all } from 'redux-saga/effects';
import _ from 'lodash';
import { GET_ARTICLE } from './constants';
import { API_URL } from '../../constants';
import { getRequest } from '../../utils/request';

function* getArticleSaga() {
  const url = `${API_URL}/articles`;

  try {
    const keywordList = [];
    const peopleList = [];
    const result = yield call(getRequest, { url });
    result.map(x => x.keywords.map(y => keywordList.push(y)));
    result.map(x => x.people.map(y => peopleList.push(y)));
    const uniqueList = _.uniq(keywordList);
    const uniquePeople = _.uniq(peopleList);

    const words = uniqueList.map(x => ({
      text: x,
      value: keywordList.filter(y => y === x).length,
    }));

    // console.log(result);
    yield put({
      type: GET_ARTICLE.SUCCESS,
      result,
      words,
      uniqueList,
      uniquePeople,
    });
  } catch (error) {
    console.log(error);
    yield put({ type: GET_ARTICLE.FAIL, error });
  }
}

// Individual exports for testing
export default function* rootSaga() {
  // See example in containers/HomePage/saga.js
  yield all([takeLatest(GET_ARTICLE.REQUEST, getArticleSaga)]);
}
