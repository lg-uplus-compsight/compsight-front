/**
 *
 * WordCloudPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import ReactWordcloud from 'react-wordcloud';
import GridLoader from 'react-spinners/GridLoader';
import makeSelectWordCloudPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { Wrapper } from './styles';
import { words } from './constants';
import { theme } from '../../constants';

const options = {
  colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
  fontFamily: 'Nanum Gothic',
  fontSizes: [16, 60],
  deterministic: false,
  rotations: 1,
  rotationAngles: [0],

  transitionDuration: 1000,
};

export function WordCloudPage() {
  useInjectReducer({ key: 'wordCloudPage', reducer });
  useInjectSaga({ key: 'wordCloudPage', saga });

  const appState = useSelector(state => state.app);
  const { words, loading } = appState;

  return (
    <Wrapper>
      {loading ? (
        <GridLoader size={20} color={theme.mainColor} />
      ) : (
        <ReactWordcloud options={options} words={words} />
      )}
    </Wrapper>
  );
}

WordCloudPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  wordCloudPage: makeSelectWordCloudPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(WordCloudPage);
