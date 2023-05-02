import {
  Container,
  Heading,
  HeadingWrapper,
  SubHeading,
  SubHeadingWrapper,
} from "./hero.styles";

export const Hero = () => {
  return (
    <Container>
      <HeadingWrapper>
        <Heading>Łącz się w swoim stylu</Heading>
      </HeadingWrapper>
      <SubHeadingWrapper>
        <SubHeading>
          Wybierz usługi telekomunikacyjne, które pasują do Ciebie!
        </SubHeading>
      </SubHeadingWrapper>
    </Container>
  );
};
