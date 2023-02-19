
const root = document.querySelector(':root');
const checkbox = document.querySelector('.switch__input');

let tema = localStorage.getItem("tema") != null
    ? localStorage.getItem("tema")
    : "light";

function aplicarTema() {
    if (tema === "dark") {
        root.style.setProperty('--background', '#fff');
        return;

    } else {
        root.style.setProperty("--background", "#1E1E1E");
    }
}
checkbox.addEventListener("click", () => {
    if (tema === "light") {
        tema = "dark";
    } else {
        tema = "light";
    }
    localStorage.setItem("tema", tema);
    aplicarTema();

});