export type ThemeMode = "light" | "dark";

export interface Theme {
  mode: ThemeMode;
  color: string;
  background: string;
  toggleBorder: string;
  gradient: string;
}
