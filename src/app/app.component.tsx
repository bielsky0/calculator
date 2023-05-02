import { Route, Routes as RouterRoutes } from "react-router-dom";

import { ROUTES } from "./config/routes";

import { Home, Prices } from "../views";
import { initializeFontFace } from "../theme/initializaFont";
import { useEffect } from "react";
import { Root } from "../views";

export const App = () => {
  useEffect(() => {
    initializeFontFace();
  });

  return (
    <RouterRoutes>
      <Route element={<Root />}>
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.prices} element={<Prices />} />
      </Route>
    </RouterRoutes>
  );
};
