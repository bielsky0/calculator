import styled from "styled-components";
import { Label as label } from "../../../../theme/typography";
import { sizeUnits } from "../../../../theme/sizes";

export const Container = styled.div``;

export const SelectedContainer = styled.div`
  border: solid 1px #eee;
  font-size: 14px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const OptionsContainer = styled.ul`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: ${sizeUnits(15)};
  margin: ${sizeUnits(2)};
`;

export const OptionContainer = styled.li`
  display: flex;
  padding: ${sizeUnits(1)};
  cursor: pointer;
`;

export const Checkbox = styled.input``;

export const Label = styled(label)``;
