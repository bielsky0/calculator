import styled from "styled-components";
import { color } from "../../../../theme";
import { bigRadius } from "../../../../theme/border";
import { primaryMain } from "../../../../theme/color";
import { sizeUnits } from "../../../../theme/sizes";
import { H3, H4, Label } from "../../../../theme/typography";

export const Container = styled.div`
  border-radius: ${bigRadius};
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 13px -8px rgba(66, 68, 90, 1);
  padding: ${sizeUnits(4)};
  margin: ${sizeUnits(2)};
  background-color: ${color.white};

  justify-content: space-between;
  transition: 0.1s;
  &:hover {
    background-color: ${primaryMain};
    color: ${color.white};
    cursor: pointer;
  }
`;

export const TitleWrapper = styled.div`
  /* margin-bottom: ${sizeUnits(2)}; */
`;

export const Title = styled(H3)`
  font-weight: bold;
`;

export const PriceWrapper = styled.div``;

export const Price = styled(H4)``;

export const DescriptionWrapper = styled.div`
  padding-top: ${sizeUnits(1)};
  padding-bottom: ${sizeUnits(1)};
`;

export const Description = styled(Label)``;
