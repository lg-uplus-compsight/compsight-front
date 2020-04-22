import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

export const QuestionText = styled.h1`
  color: white;
`;

export const CompWrapper = styled.div`
  display: flex;
  margin-top: 1rem;
  flex-direction: row;
`;

export const CompItem = styled.div`
  display: flex;
  cursor: pointer;
  color: white;
  justify-content: center;
  border-radius: 20px;
  align-items: center;
  width: 200px;
  height: 200px;
  font-size: 1.5rem;
  margin-right: 1rem;
  border: 1px solid white;
  &:last-child {
    margin-right: 0;
  }
`;
