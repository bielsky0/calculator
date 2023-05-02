import Modal, { Props as ModalProps } from "react-modal";
import {
  ContentContainer,
  ModalContainer,
  OverlayContainer,
} from "./modal.styles";

export const ModalComponent = ({
  children,
  onRequestClose,
  ...props
}: ModalProps) => {
  const mainAppElement = document.querySelector("#root") as HTMLElement;

  return (
    <Modal
      {...props}
      className="_"
      overlayClassName="_"
      appElement={mainAppElement}
      onRequestClose={onRequestClose}
      overlayElement={(props, children) => (
        <OverlayContainer {...props}>{children}</OverlayContainer>
      )}
      contentElement={(props, children) => (
        <ContentContainer {...props}>{children}</ContentContainer>
      )}
    >
      <ModalContainer>{children}</ModalContainer>
    </Modal>
  );
};
