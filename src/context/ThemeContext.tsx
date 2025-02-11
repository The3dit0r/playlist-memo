import { useContext, createContext, useState } from "react";

type ThemeType = {
  sbWidth: number;
  setSidebarWidth(w: number | ((ow: number) => number)): void;
};

const def = {
  sbWidth: 450,
};

const ThemeContext = createContext<ThemeType | null>(null);

export function ThemeProvider(props: { children: React.ReactNode }) {
  const [sbWidth, setSbWidth] = useState(def.sbWidth);
  function setSidebarWidth(w: number | ((ow: number) => number)) {
    let i = 0;

    if (typeof w === "function") i = w(sbWidth);
    else i = w;

    const val = Math.max(300, Math.min(i, 600));
    setSbWidth(val);
  }

  const value = {
    sbWidth,
    setSidebarWidth,
  };

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error("useTheme must be used within it's provided context");
  }

  return theme;
}
