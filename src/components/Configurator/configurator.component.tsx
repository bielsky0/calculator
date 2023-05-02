import { Container } from "./configurator.styles";

import { AddCombination } from "./components/AddCombination";
import { EditCombination } from "./components/EditCombination";
import { AddService } from "./components/AddService";
import { EditService } from "./components/EditService";

export const Configurator = () => {
  return (
    <Container>
      <AddCombination />
      <EditCombination />

      <AddService />
      <EditService />
    </Container>
  );
};
