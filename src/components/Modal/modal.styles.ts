import styled from "styled-components";

export const OverlayContainer = styled.div`
  position: fixed;
  inset: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 15;
  backdrop-filter: blur(2px);
`;

export const ContentContainer = styled.div`
  position: absolute;
  outline: none;
  height: fit-content;
  width: fit-content;
  border-radius: 16px;
  top: 0;
  bottom: 0;
  margin: auto;
  left: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-content: center;

  &:focus {
    box-shadow: none;
  }
`;

export const ModalContainer = styled.div`
  border-radius: 16px;
  background-color: white;
  box-shadow: 0px 0px 13px -8px rgba(66, 68, 90, 1);

  padding: 16px;
  &:focus {
    box-shadow: none;
  }
`;
