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
  height: 100px;
  border-right: 2px solid red;
  margin: 15px 0;
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
  height: 100px;
  margin: 15px 0;
  position: relative;
`;

export const ShiftBoxContainer = styled.div`
  box-sizing: border-box;
  min-width: ${({ width }) => `${width * 100}px`};
  border: 1px solid blue;
  position: absolute;
  left: ${({ start }) => `${start * 100}px`};
  top: ${({ yIndex }) => `${yIndex * 100}px`};
`;
