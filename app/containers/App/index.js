/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import WordCloudPage from 'containers/WordCloudPage';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { useInjectSaga } from 'utils/injectSaga';

import { useDispatch } from 'react-redux';
import GlobalStyle from '../../global-styles';
import saga from './saga';
import { getArticleAction } from './actions';

export default function App() {
  const dispatch = useDispatch();
  useInjectSaga({ key: 'app', saga });

  useEffect(() => {
    dispatch(getArticleAction());
  }, []);
  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/wordcloud" component={WordCloudPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </>
  );
}
