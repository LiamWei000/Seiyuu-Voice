// Pastikan HTML selesai dimuat sebelum menjalankan script
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("nav-menu");

    // Mengambil semua tautan di dalam navigasi
    const navLinks = nav ? nav.querySelectorAll("a") : [];

    // Keamanan: Cek apakah elemen benar-benar ada di halaman
    if (toggle && nav) {

        // 1. Fungsi Toggle Menu
        toggle.addEventListener("click", (e) => {
            e.stopPropagation(); // Mencegah klik tembus ke document
            nav.classList.toggle("active");

            // Update aria-expanded untuk aksesibilitas
            const isActive = nav.classList.contains("active");
            toggle.setAttribute("aria-expanded", isActive);
        });

        // 2. Tutup menu otomatis saat tautan diklik (UX untuk mobile)
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("active");
                toggle.setAttribute("aria-expanded", "false");
            });
        });

        // 3. Tutup menu jika user mengklik sembarang tempat di luar menu
        document.addEventListener("click", (e) => {
            const isClickInsideMenu = nav.contains(e.target);
            const isClickOnToggle = toggle.contains(e.target);

            if (!isClickInsideMenu && !isClickOnToggle && nav.classList.contains("active")) {
                nav.classList.remove("active");
                toggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    initClock();

    // const yearEl = document.getElementById("year");
    // if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// document.getElementById("year").textContent = new Date().getFullYear();

/* ===============================
   COPY INTRO (Better UX)
================================= */
// function copyIntro() {
//     const intro = document.getElementById("introText");
//     const status = document.getElementById("copyStatus");

//     if (!intro) return;

//     navigator.clipboard.writeText(intro.innerText)
//         .then(() => {
//             if (!status) return;
//             status.style.display = "block";
//             status.textContent = "Berhasil disalin! ✨";

//             setTimeout(() => {
//                 status.style.display = "none";
//             }, 2000);
//         })
//         .catch(() => {
//             if (!status) return;
//             status.style.display = "block";
//             status.textContent = "Gagal menyalin ❌";
//         });
// }

/* ===============================
   LIVE CLOCK
================================= */
// function initClock() {
//     const clock = document.getElementById("clock");
//     if (!clock) return;

//     const updateClock = () => {
//         clock.textContent = new Date().toLocaleTimeString("id-ID", {
//             hour: "2-digit",
//             minute: "2-digit",
//             second: "2-digit"
//         });
//     };

//     updateClock();
//     setInterval(updateClock, 1000);
// }

if (!localStorage.getItem("theme")) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.body.classList.add("dark");
        toggleBtn.textContent = "☀️";
    }
}

const toggleBtn = document.getElementById("theme-toggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    toggleBtn.textContent = "☀️";
}

// Toggle click
toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        toggleBtn.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "light");
        toggleBtn.textContent = "🌙";
    }
});