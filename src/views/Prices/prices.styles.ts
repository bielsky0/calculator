import styled from "styled-components";
import { containerWidth, sizeUnits } from "../../theme/sizes";

export const HomeWrapper = styled.div`
  margin-bottom: ${sizeUnits(8)};
  margin-top: ${sizeUnits(8)};
  width: ${containerWidth};
`;

export const Container = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
`;
