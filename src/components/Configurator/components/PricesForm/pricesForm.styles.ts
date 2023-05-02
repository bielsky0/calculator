import styled from "styled-components";
import { Label as label } from "../../../../theme/typography";
import { color } from "../../../../theme";
import { sizeUnits } from "../../../../theme/sizes";
import { smallRadius } from "../../../../theme/border";
import { primaryMain } from "../../../../theme/color";

export const Container = styled.div``;

export const PricesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${sizeUnits(2)};
  margin-bottom: ${sizeUnits(2)};
`;

export const Label = styled(label)``;

export const Button = styled.button`
  border: none;
  border-radius: ${smallRadius};
  width: content;
  height: content;
  color: ${color.white};
  background-color: ${primaryMain};
  padding-right: 1em;
  padding-left: 1em;

  padding-bottom: 0.5em;
  padding-top: 0.5em;

  margin: 0.5em;
  &:hover {
    cursor: pointer;
  }
`;

export const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: ${color.text};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

export const PriceWrapper = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
`;

export const AddWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RemoveButton = styled(Button)`
  padding-right: ${sizeUnits(0.5)};
  padding-left: ${sizeUnits(0.5)};

  padding-bottom: ${sizeUnits(0.1)};
  padding-top: ${sizeUnits(0.1)};
`;
