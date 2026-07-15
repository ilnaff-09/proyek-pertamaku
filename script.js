// ==========================================
// 1. FUNGSI KALKULATOR DINAMIS
// ==========================================
function hitungGaya() {
    const massa = parseFloat(document.getElementById('massa').value);
    const percepatan = parseFloat(document.getElementById('percepatan').value);

    if (isNaN(massa) || isNaN(percepatan)) {
        document.getElementById('hasilGaya').innerHTML = "⚠️ Masukkan angka yang valid!";
        return;
    }

    const gaya = massa * percepatan;
    document.getElementById('hasilGaya').innerHTML = `💪 Gaya = ${gaya} Newton`;
}

function hitungEnergi() {
    const massa = parseFloat(document.getElementById('massa2').value);
    const kecepatan = parseFloat(document.getElementById('kecepatan').value);

    if (isNaN(massa) || isNaN(kecepatan)) {
        document.getElementById('hasilEnergi').innerHTML = "⚠️ Masukkan angka yang valid!";
        return;
    }

    const energi = 0.5 * massa * (kecepatan * kecepatan);
    document.getElementById('hasilEnergi').innerHTML = `🌀 Ek = ${energi} Joule`;
}

// ==========================================
// 2. DATA PROYEK (ARRAY) & RENDER
// ==========================================
const proyekSaya = [
    {
        judul: "Simulasi Gerak Parabola",
        deskripsi: "Visualisasi lintasan peluru dengan HTML Canvas (Fisika)",
        tag: "JavaScript"
    },
    {
        judul: "Dashboard Sensor IoT",
        deskripsi: "Menampilkan data suhu dan kelembaban dari Arduino",
        tag: "React + Node.js"
    },
    {
        judul: "Kalkulator Fisika Interaktif",
        deskripsi: "Website ini sendiri! Menghitung Gaya dan Energi Kinetik",
        tag: "HTML + CSS + JS"
    }
];

function renderProyek() {
    const container = document.getElementById('project-list');
    let htmlString = '';
    for (let i = 0; i < proyekSaya.length; i++) {
        const proyek = proyekSaya[i];
        htmlString += `
            <div class="project-card">
                <h3>${proyek.judul}</h3>
                <p>${proyek.deskripsi}</p>
                <span class="tag">${proyek.tag}</span>
            </div>
        `;
    }
    container.innerHTML = htmlString;
}
renderProyek();

// ==========================================
// 3. CATATAN EKSPERIMEN + LOCALSTORAGE
// ==========================================
let catatanEksperimen = [];

function simpanKeLocalStorage() {
    localStorage.setItem('dataCatatan', JSON.stringify(catatanEksperimen));
    console.log("💾 Data berhasil disimpan ke LocalStorage!");
}

function loadDariLocalStorage() {
    const dataTersimpan = localStorage.getItem('dataCatatan');
    
    if (dataTersimpan) {
        catatanEksperimen = JSON.parse(dataTersimpan);
        console.log("📂 Data berhasil dimuat dari LocalStorage:", catatanEksperimen);
    } else {
        console.log("📭 Belum ada data tersimpan di LocalStorage.");
    }
    
    renderCatatan();
}

function simpanCatatan() {
    const judul = document.getElementById('inputJudul').value;
    const hasil = document.getElementById('inputHasil').value;

    if (judul === "" || hasil === "") {
        showToast("Judul dan hasil harus diisi!", "error");
        return;
    }

    catatanEksperimen.push({
        judul: judul,
        hasil: hasil
    });

    document.getElementById('inputJudul').value = "";
    document.getElementById('inputHasil').value = "";

    renderCatatan();
    simpanKeLocalStorage();
    showToast("Catatan eksperimen berhasil disimpan! ✅", "success");
}

function renderCatatan() {
    const container = document.getElementById('daftarCatatan');
    let html = "";

    for (let i = 0; i < catatanEksperimen.length; i++) {
        const data = catatanEksperimen[i];
        html += `
            <div class="catatan-item">
                <strong>${data.judul}</strong>
                <span>${data.hasil}</span>
            </div>
        `;
    }

    if (catatanEksperimen.length === 0) {
        html = "<p class='empty-catatan'>Belum ada catatan. Tambahkan eksperimenmu!</p>";
    }

    container.innerHTML = html;
}
renderCatatan();

// ==========================================
// 4. OTOMATIS KALKULATOR & LOAD DATA SAAT LOAD
// ==========================================
window.onload = function() {
    hitungGaya();
    hitungEnergi();
    loadDariLocalStorage();
    applyThemeOnLoad(); // <-- Terapkan tema yang tersimpan
    initScrollAnimations(); // <-- Aktifkan animasi scroll
};

// ==========================================
// 5. FUNGSI TOAST NOTIFICATION
// ==========================================
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    
    if (!container) {
        console.warn("Toast container tidak ditemukan di HTML!");
        return;
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? '✅' : type === 'error' ? '⚠️' : 'ℹ️';
    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// ==========================================
// 6. DARK MODE TOGGLE (FITUR BARU!)
// ==========================================
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Ubah ikon tombol
    const btn = document.getElementById('theme-toggle');
    if (btn) {
        btn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    }
}

function applyThemeOnLoad() {
    const savedTheme = localStorage.getItem('theme');
    const html = document.documentElement;
    const btn = document.getElementById('theme-toggle');
    
    // Jika tidak ada tema tersimpan, cek preferensi sistem (opsional)
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
        if (btn) {
            btn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
        }
    } else {
        // Default: light, tapi tombol tetap 🌙
        if (btn) btn.textContent = '🌙';
    }
}

// Event listener untuk tombol
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('theme-toggle');
    if (btn) {
        btn.addEventListener('click', toggleTheme);
    }
});

// ==========================================
// 7. SCROLL ANIMATIONS (FITUR BARU!)
// ==========================================
function initScrollAnimations() {
    const hiddenElements = document.querySelectorAll('.hidden');
    
    if (hiddenElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-up');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Sedikit trigger lebih awal
    });
    
    hiddenElements.forEach(el => observer.observe(el));
}