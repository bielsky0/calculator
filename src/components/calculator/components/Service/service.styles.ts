import styled, { css } from "styled-components";
import { bigRadius } from "../../../../theme/border";
import {
  serviceHeight,
  serviceWidth,
  sizeUnits,
} from "../../../../theme/sizes";
import { primaryMain } from "../../../../theme/color";
import { color } from "../../../../theme";
import { H3, H4, Label } from "../../../../theme/typography";

interface ContaienrProps {
  isPicked: boolean;
  isPickable: boolean;
}

export const Container = styled.div<ContaienrProps>`
  border-radius: ${bigRadius};
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 13px -8px rgba(66, 68, 90, 1);
  padding: ${sizeUnits(1)};
  margin: ${sizeUnits(1)};
  background-color: ${({ isPicked, isPickable }) => {
    if (!isPickable) return "#D3D3D3";
    return isPicked ? primaryMain : color.white;
  }};
  width: ${serviceWidth};
  height: ${serviceHeight};
  color: ${({ isPicked, isPickable }) => {
    if (!isPickable) {
      return color.white;
    }

    return isPicked ? color.white : "inherit";
  }};
  justify-content: space-between;
  transition: 0.1s;

  ${({ isPickable, isPicked }) => {
    if (isPicked)
      return css`
        &:hover {
          cursor: pointer;
        }
      `;
    if (isPickable)
      return css`
        &:hover {
          border: 2px solid ${primaryMain};
          cursor: pointer;
        }
      `;

    return css`
      &:hover {
        cursor: default;
      }
    `;
  }}
`;

export const TitleWrapper = styled.div``;

export const Title = styled(H3)`
  font-weight: bold;
`;

export const PriceWrapper = styled.div``;

export const Price = styled(H4)``;

export const DescriptionWrapper = styled.div`
  padding-top: ${sizeUnits(2)};
  padding-bottom: ${sizeUnits(1)};
`;

export const Description = styled(Label)``;
