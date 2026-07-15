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
// 3. CATATAN EKSPERIMEN (BARU!)
// ==========================================
const catatanEksperimen = [];

function simpanCatatan() {
    const judul = document.getElementById('inputJudul').value;
    const hasil = document.getElementById('inputHasil').value;

    if (judul === "" || hasil === "") {
        alert("⚠️ Judul dan hasil harus diisi!");
        return;
    }

    catatanEksperimen.push({
        judul: judul,
        hasil: hasil
    });

    document.getElementById('inputJudul').value = "";
    document.getElementById('inputHasil').value = "";

    renderCatatan();
    console.log("Catatan saat ini:", catatanEksperimen);
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
// 4. OTOMATIS KALKULATOR SAAT PERTAMA LOAD
// ==========================================
window.onload = function() {
    hitungGaya();
    hitungEnergi();
};