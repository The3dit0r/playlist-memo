import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import "./helper.css";
import "./keyframes.css";

import App from "./App";

import { ThemeProvider } from "./context/ThemeContext.tsx";
import { UserDataProvider } from "./context/UserContext.tsx";
import { ContextMenuProvider } from "./context/ContextMenuContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ContextMenuProvider>
          <UserDataProvider>
            <App />
          </UserDataProvider>
        </ContextMenuProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
