/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import messages from './messages';
import { Wrapper, QuestionText, CompWrapper, CompItem } from './styles';
import { compList } from '../../constants';

export default function HomePage() {
  const dispatch = useDispatch();

  const onClickComp = x => {
    dispatch(push(`/wordcloud/${x.id}`));
  };

  return (
    <Wrapper>
      <QuestionText>세 기업중 어떤 기업이 궁금하신가요?</QuestionText>
      <CompWrapper>
        {compList.map(x => (
          <CompItem onClick={() => onClickComp(x)} key={x.id}>
            {x.name}
          </CompItem>
        ))}
      </CompWrapper>
    </Wrapper>
  );
}
