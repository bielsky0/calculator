import { ROUTES } from "../../../app/config/routes";
import {
  Container,
  Link,
  Navigation,
  NavigationWrapper,
} from "./navbar.styles";

export const Navbar = () => {
  return (
    <Container>
      <NavigationWrapper>
        <Navigation>
          <Link to={ROUTES.home}>Kalkulator</Link>
          <Link to={ROUTES.prices}>Konfigurator</Link>
        </Navigation>
      </NavigationWrapper>
    </Container>
  );
};
