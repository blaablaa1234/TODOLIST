import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type Mode = "light" | "dark";

interface ThemeContextProps {
  mode: Mode;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
);

export const ModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setTheme] = useState<Mode>(() => {
    const storedTheme = localStorage.getItem("mode");
    return storedTheme === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useMode = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used in a ThemeProvider");
  }
  return context;
};
