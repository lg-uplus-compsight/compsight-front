import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the wordCloudPage state domain
 */

const selectWordCloudPageDomain = state => state.wordCloudPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by WordCloudPage
 */

const makeSelectWordCloudPage = () =>
  createSelector(
    selectWordCloudPageDomain,
    substate => substate,
  );

export default makeSelectWordCloudPage;
export { selectWordCloudPageDomain };
