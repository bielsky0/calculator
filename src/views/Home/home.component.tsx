import { Hero } from "../../components/Hero";
import { Calculator } from "../../components/calculator";
import { HomeWrapper, Container } from "./home.styles";

export const Home = () => {
  return (
    <Container>
      <HomeWrapper>
        <Hero />
        <Calculator />
      </HomeWrapper>
    </Container>
  );
};
