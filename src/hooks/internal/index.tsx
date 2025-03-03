import { useContext } from "react";

import { ContextMenuContext } from "@context/ContextMenuContext";
import { UserContext } from "@context/UserContext";
import { ThemeContext } from "@context/ThemeContext";

export function useContextMenu() {
  const data = useContext(ContextMenuContext);

  if (!data) {
    throw new Error("useContextMenu must be used within it's provided context");
  }

  return data;
}

export function useTheme() {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error("useTheme must be used within it's provided context");
  }

  return theme;
}

export function useUserData() {
  const data = useContext(UserContext);

  if (!data) {
    throw new Error("useUserData must be used within it's context provider");
  }

  return data;
}
