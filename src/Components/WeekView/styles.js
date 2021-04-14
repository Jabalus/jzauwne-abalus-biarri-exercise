import styled from 'styled-components';

export const WeekViewContainerDiv = styled.div`
  box-sizing: border-box;
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

export const RoleRowHeader = styled.div`
  box-sizing: border-box;
  width: 300px;
  height: ${({ noOfRows }) => noOfRows * 100}px;
  padding: 15px;
  margin: 15px 0;
  border-right: 5px solid #ffffff;
  background: ${({ color }) => color};
  text-align: center;
`;

export const RoleRowContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin-top: 150px;
`;

export const WeekViewWrapperDiv = styled.div`
  box-sizing: border-box;
  display: flex;
`;

export const RoleTimelineBody = styled.div`
  box-sizing: border-box;
  display: flex;
  height: ${({ noOfRows }) => noOfRows * 100}px;
  margin: 15px 0;
  position: relative;
`;
