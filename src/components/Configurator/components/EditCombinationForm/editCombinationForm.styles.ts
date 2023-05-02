import styled from "styled-components";
import { color } from "../../../../theme";
import { Label as label } from "../../../../theme/typography";
import { sizeUnits } from "../../../../theme/sizes";
import { smallRadius } from "../../../../theme/border";
import { primaryMain } from "../../../../theme/color";

export const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: ${color.text};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin: ${sizeUnits(2)};
`;

export const Label = styled(label)``;

export const SubmitButton = styled.button`
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

export const Container = styled.div``;
