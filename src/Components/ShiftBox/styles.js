import styled from 'styled-components';

export const ShiftBoxContainer = styled.div`
  box-sizing: border-box;
  width: ${({ width }) => `${width * 100}px`};

  position: absolute;
  left: ${({ start }) => `${start * 100}px`};
  top: ${({ yStart }) => `${yStart * 100}px`};
  font-size: 12px;
  height: 95px;
  background: ${({ color }) => color};
  padding: 10px;
  overflow: hidden;
  cursor: pointer;
`;
