import styled, { css } from "styled-components";
import { color } from "../../../../theme";

export const SelectContainer = styled.div`
  position: relative;
  margin: 0;
  margin-top: 10px;
`;

export const SelectLabelButton = styled.button`
  padding: 0.3rem 0.5rem;
  min-width: 7rem;
  font-size: 0.9rem;
  font-weight: 500;
  background: papayawhip;
  border: none;
  border-radius: 5px;
  align-items: center;
  justify-content: space-between;
  color: ${color.text};

  cursor: pointer;
`;

export const DropdownStyle = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  max-height: 40vmax;
  min-width: 10rem;
  padding: 0.4rem;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background: ${color.navbarColor};
  border: 1.5px solid slategrey;
  transition: max-height 0.2s ease;
  overflow: scroll;
  ${(p) =>
    p.isVisible !== true &&
    css`
      max-height: 40px;
      visibility: hidden;
    `}
`;

export const DropdownItem = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  width: 90%;
  margin: 0.15rem 0;
  padding: 0.3rem 0.5rem;
  font-size: 0.9rem;
  font-weight: 400;
  border-radius: 0.3rem;
  cursor: pointer;
  ${(p) =>
    p.active &&
    css`
      font-weight: 500;
    `}
  &:hover, :focus, :focus:hover {
    background-color: #166edc;
    outline: none;
  }
`;
