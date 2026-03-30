// ==========================
// SMOOTH SCROLL (SAFE + OFFSET)
// ==========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");

        // Skip kalau cuma "#"
        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        // Safety check (biar gak error)
        if (!target) return;

        e.preventDefault();

        // Offset navbar (biar gak ketutup header)
        const navbarHeight = document.querySelector(".navbar")?.offsetHeight || 0;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.pageYOffset -
            navbarHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });
    });
});


// ==========================
// MOBILE MENU TOGGLE
// ==========================
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

if (toggle && nav) {
    toggle.addEventListener("click", () => {
        nav.classList.toggle("active");
    });

    // Auto close menu saat klik link
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
        });
    });
}


// ==========================
// GLITCH EFFECT (OPTIMIZED)
// ==========================
const glitch = document.querySelector(".glitch");

if (glitch) {
    let lastFlicker = 0;

    const glitchFlicker = (time) => {
        // Batasi update biar gak berat (performance)
        if (time - lastFlicker > 120) {
            glitch.style.opacity = Math.random() > 0.92 ? "0.6" : "1";
            lastFlicker = time;
        }

        requestAnimationFrame(glitchFlicker);
    };

    requestAnimationFrame(glitchFlicker);
}


// ==========================
// OPTIONAL: SCROLL ACTIVE LINK
// ==========================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove("active");
    }
});