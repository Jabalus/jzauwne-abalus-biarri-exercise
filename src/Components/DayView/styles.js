import styled from 'styled-components';

export const ContainerDiv = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  & > h3 {
    padding: 10px;
  }
`;

export const HourContainerDiv = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
`;

export const HourDiv = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100px;
  border-right: 1px solid #b5b5b5;
  padding: 10px;
`;
