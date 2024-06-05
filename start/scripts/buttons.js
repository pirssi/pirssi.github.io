document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const themeToggleButton = document.getElementById("themeToggle");
  const styleToggleButton = document.getElementById("styleToggle");
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const setThemeAndStyle = (key, value) => {
    root.setAttribute(key, value);
    localStorage.setItem(key, value);
  };

  const toggleTheme = () => {
    const currentTheme = root.getAttribute("page-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setThemeAndStyle("page-theme", newTheme);
  };

  const toggleStyle = () => {
    const currentStyle = root.getAttribute("box-style");
    const newStyle = currentStyle === "transparent" ? "opaque" : "transparent";
    setThemeAndStyle("box-style", newStyle);
  };

  const initTheme = () => {
    const savedTheme = localStorage.getItem("page-theme");
    if (savedTheme) {
      setThemeAndStyle("page-theme", savedTheme);
    } else {
      const systemTheme = mediaQuery.matches ? "dark" : "light";
      setThemeAndStyle("page-theme", systemTheme);
    }
  };

  const initStyle = () => {
    const savedStyle = localStorage.getItem("box-style") || "opaque";
    setThemeAndStyle("box-style", savedStyle);
  };

  themeToggleButton.addEventListener("click", toggleTheme);
  styleToggleButton.addEventListener("click", toggleStyle);
  mediaQuery.addEventListener("change", (e) => {
    const systemTheme = e.matches ? "dark" : "light";
    setThemeAndStyle("page-theme", systemTheme);
  });

  initTheme();
  initStyle();
});
