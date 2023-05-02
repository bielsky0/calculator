import React from "react";

import { createRoot } from "react-dom/client";
import { App } from "../app.component";
import { RouterProvider } from "../providers";
import { GlobalContextProvider } from "../../context/global";
import { GlobalStyle } from "../../theme/global";

export const initApp = () => {
  const container = document.getElementById("root") as HTMLElement;

  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <RouterProvider>
        <GlobalContextProvider>
          <App />
          <GlobalStyle />
        </GlobalContextProvider>
      </RouterProvider>
    </React.StrictMode>
  );
};
