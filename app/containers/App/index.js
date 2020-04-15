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

import HomePage from 'containers/HomePage';
import WordCloudPage from 'containers/WordCloudPage';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { useInjectSaga } from 'utils/injectSaga';

import { useDispatch } from 'react-redux';
import { AnimatedSwitch, spring } from 'react-router-transition';
import GlobalStyle from '../../global-styles';
import saga from './saga';
import { getArticleAction } from './actions';

function mapStyles(styles) {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`,
  };
}

// wrap the `spring` helper to use a bouncy config
function bounce(val) {
  return spring(val, {
    stiffness: 330,
    damping: 22,
  });
}

// child matches will...
const bounceTransition = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0,
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: bounce(0),
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: bounce(1),
  },
};

export default function App() {
  const dispatch = useDispatch();
  useInjectSaga({ key: 'app', saga });

  useEffect(() => {
    dispatch(getArticleAction());
  }, []);
  return (
    <>
      <AnimatedSwitch
        atEnter={bounceTransition.atEnter}
        atLeave={bounceTransition.atLeave}
        atActive={bounceTransition.atActive}
        mapStyles={mapStyles}
        className="switch-wrapper"
      >
        <Route exact path="/" component={HomePage} />
        <Route exact path="/wordcloud" component={WordCloudPage} />
        <Route component={NotFoundPage} />
      </AnimatedSwitch>
      <GlobalStyle />
    </>
  );
}
