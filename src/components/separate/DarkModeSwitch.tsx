import { Switch } from "@material-ui/core";
import { useTheme } from "next-themes";
import  { useEffect, useState } from "react";

export const DarkModeSwitch = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = () => {
    if (isMounted) {
      setTheme(theme === "light" ? "dark" : "light");
    }
  };

  return (
    <Switch
      color="default"
      inputProps={{ "aria-label": "checkbox with default color" }}
      onChange={handleChange}
    />
  );
};
