"use strict";

/* Elementos principales */
const botonMenu = document.getElementById("boton-menu");
const menuPrincipal = document.getElementById("menu-principal");
const anioActual = document.getElementById("anio-actual");

/* Año automático del pie de página */
if (anioActual) {
    anioActual.textContent = new Date().getFullYear();
}

/* Cerrar el menú móvil */
function cerrarMenu() {
    if (!botonMenu || !menuPrincipal) {
        return;
    }

    menuPrincipal.classList.remove("menu--activo");
    botonMenu.setAttribute("aria-expanded", "false");
    botonMenu.setAttribute("aria-label", "Abrir menú de navegación");
    botonMenu.textContent = "☰";
    document.body.classList.remove("menu-abierto");
}

/* Abrir o cerrar el menú */
if (botonMenu && menuPrincipal) {
    botonMenu.addEventListener("click", () => {
        const menuEstaAbierto =
            menuPrincipal.classList.toggle("menu--activo");

        botonMenu.setAttribute(
            "aria-expanded",
            String(menuEstaAbierto)
        );

        botonMenu.setAttribute(
            "aria-label",
            menuEstaAbierto
                ? "Cerrar menú de navegación"
                : "Abrir menú de navegación"
        );

        botonMenu.textContent = menuEstaAbierto ? "✕" : "☰";

        document.body.classList.toggle(
            "menu-abierto",
            menuEstaAbierto
        );
    });
}

/* Cerrar el menú al seleccionar una opción */
document
    .querySelectorAll("#menu-principal a")
    .forEach((enlace) => {
        enlace.addEventListener("click", cerrarMenu);
    });

/* Cerrar el menú al presionar Escape */
document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
        cerrarMenu();
    }
});

/* Cerrar el menú al hacer clic por fuera */
document.addEventListener("click", (evento) => {
    if (!botonMenu || !menuPrincipal) {
        return;
    }

    const clicDentroDelMenu =
        menuPrincipal.contains(evento.target);

    const clicEnBoton =
        botonMenu.contains(evento.target);

    const menuEstaAbierto =
        menuPrincipal.classList.contains("menu--activo");

    if (
        menuEstaAbierto &&
        !clicDentroDelMenu &&
        !clicEnBoton
    ) {
        cerrarMenu();
    }
});

/* Restablecer navegación al volver a vista de computador */
window.addEventListener("resize", () => {
    if (window.innerWidth > 720) {
        cerrarMenu();
    }
});