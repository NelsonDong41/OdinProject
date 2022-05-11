function setTheme(){
    const root = document.documentElement;
    const newTheme = root.className === "dark" ? "light" : "dark";
    root.className = newTheme;

    document.querySelector('.theme-name').textContent = newTheme;
}