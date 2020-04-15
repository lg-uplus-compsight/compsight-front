/**
 *
 * FinalPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';

export function FinalPage() {
  useInjectReducer({ key: 'finalPage', reducer });
  useInjectSaga({ key: 'finalPage', saga });

  return <div>ChartPage</div>;
}

FinalPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default compose(memo)(FinalPage);
