import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the finalPage state domain
 */

const selectFinalPageDomain = state => state.finalPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FinalPage
 */

const makeSelectFinalPage = () =>
  createSelector(
    selectFinalPageDomain,
    substate => substate,
  );

export default makeSelectFinalPage;
export { selectFinalPageDomain };
