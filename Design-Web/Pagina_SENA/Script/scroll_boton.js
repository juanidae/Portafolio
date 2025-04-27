// Mostrar / ocultar botón
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    const btn = document.getElementById("scrollToTopBtn");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
}

// Volver arriba con desplazamiento suave
document.addEventListener("DOMContentLoaded", function() {
    const btn = document.getElementById("scrollToTopBtn");
    btn.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
