import styled from 'styled-components';
export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const LeftSection = styled.article`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
export const RightSection = styled.section`
  flex: 3;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const ArticleItem = styled.div`
  display: flex;
  border: 1px green solid;
  width: 100%;
  height: 70px;
  padding: 1rem;
  align-items: center;
`;
