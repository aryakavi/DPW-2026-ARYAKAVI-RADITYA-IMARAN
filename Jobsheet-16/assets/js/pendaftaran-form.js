let dataPeserta = [];
let dataKegiatan = [];
const pendaftaranSesi = new Set();
let nomorSesi = 0;

function isiTanggalHariIni() {
    const input = document.getElementById("tgl_daftar");
    if (!input) return;
    const hariIni = new Date();
    const bulan = String(hariIni.getMonth() + 1).padStart(2, "0");
    const tanggal = String(hariIni.getDate()).padStart(2, "0");
    input.value = hariIni.getFullYear() + "-" + bulan + "-" + tanggal;
}

function isiPilihanPeserta() {
    const select = document.getElementById("no_peserta");
    if (!select) return;
    select.replaceChildren();
    const kosong = document.createElement("option");
    kosong.value = "";
    kosong.textContent = "-- Pilih Peserta --";
    select.appendChild(kosong);

    dataPeserta.forEach(function (peserta) {
        const option = document.createElement("option");
        option.value = peserta.no_peserta;
        option.textContent = peserta.no_peserta + " - " + peserta.nama;
        select.appendChild(option);
    });
}

function isiPilihanKegiatan() {
    const select = document.getElementById("id_kegiatan");
    if (!select) return;
    const terpilih = select.value;
    select.replaceChildren();
    const kosong = document.createElement("option");
    kosong.value = "";
    kosong.textContent = "-- Pilih Kegiatan --";
    select.appendChild(kosong);

    dataKegiatan.forEach(function (kegiatan) {
        const option = document.createElement("option");
        option.value = kegiatan.id_kegiatan;
        option.textContent = kegiatan.nama_kegiatan + " (kuota: " + kegiatan.kuota + ")";
        option.disabled = kegiatan.kuota <= 0;
        select.appendChild(option);
    });

    if (terpilih) select.value = terpilih;
}

function ambilNamaPeserta(noPeserta) {
    const peserta = dataPeserta.find(function (item) { return item.no_peserta === noPeserta; });
    return peserta ? peserta.nama : "(peserta tidak dikenal)";
}

function ambilNamaKegiatan(idKegiatan) {
    const kegiatan = dataKegiatan.find(function (item) { return item.id_kegiatan === idKegiatan; });
    return kegiatan ? kegiatan.nama_kegiatan : "(kegiatan tidak dikenal)";
}

function tampilkanPesan(pesan, berhasil) {
    const status = document.getElementById("form-status");
    if (!status) return;
    status.textContent = pesan;
    status.style.color = berhasil ? "#2E8B57" : "#d9534f";
}

function tambahBarisHasil(pendaftaran) {
    const tbody = document.getElementById("hasil-pendaftaran");
    if (!tbody) return;
    const placeholder = tbody.querySelector("tr[data-status]");
    if (placeholder) placeholder.remove();

    const tr = document.createElement("tr");
    [pendaftaran.no_peserta, pendaftaran.nama, pendaftaran.kegiatan, pendaftaran.tgl_daftar, pendaftaran.status]
        .forEach(function (nilai) {
            const td = document.createElement("td");
            td.textContent = nilai;
            tr.appendChild(td);
        });
    tbody.prepend(tr);
}

async function muatDataForm() {
    const loading = document.getElementById("loading-indicator");
    if (loading) loading.style.display = "block";
    try {
        await new Promise(function (resolve) { setTimeout(resolve, 600); });
        const responses = await Promise.all([
            fetch("../data/peserta.json"),
            fetch("../data/kegiatan.json")
        ]);
        responses.forEach(function (res) {
            if (!res.ok) throw new Error("Gagal mengambil data (status " + res.status + ")");
        });
        dataPeserta = await responses[0].json();
        dataKegiatan = await responses[1].json();
        if (!Array.isArray(dataPeserta) || !Array.isArray(dataKegiatan)) {
            throw new Error("Struktur data tidak sesuai.");
        }
        isiPilihanPeserta();
        isiPilihanKegiatan();
    } catch (err) {
        tampilkanPesan("Gagal memuat data: " + err.message, false);
        const selectPeserta = document.getElementById("no_peserta");
        const selectKegiatan = document.getElementById("id_kegiatan");
        if (selectPeserta) selectPeserta.disabled = true;
        if (selectKegiatan) selectKegiatan.disabled = true;
    } finally {
        if (loading) loading.style.display = "none";
    }
}

function tanganiSubmit(e) {
    const selectPeserta = document.getElementById("no_peserta");
    const selectKegiatan = document.getElementById("id_kegiatan");
    const inputTanggal = document.getElementById("tgl_daftar");
    if (!selectPeserta || !selectKegiatan) return;

    const noPeserta = selectPeserta.value;
    const idKegiatan = selectKegiatan.value;
    if (noPeserta === "" || idKegiatan === "") return;

    e.preventDefault();

    const kegiatan = dataKegiatan.find(function (item) { return item.id_kegiatan === idKegiatan; });
    if (!kegiatan || kegiatan.kuota <= 0) {
        tampilkanPesan("Kegiatan sudah penuh, pilih kegiatan lain.", false);
        return;
    }

    const kunci = noPeserta + "|" + idKegiatan;
    if (pendaftaranSesi.has(kunci)) {
        tampilkanPesan("Peserta ini sudah terdaftar pada kegiatan tersebut.", false);
        return;
    }

    nomorSesi++;
    const tglDaftar = (inputTanggal && inputTanggal.value) || "-";
    const pendaftaran = {
        no_peserta: noPeserta,
        nama: ambilNamaPeserta(noPeserta),
        kegiatan: ambilNamaKegiatan(idKegiatan),
        tgl_daftar: tglDaftar,
        status: "Terdaftar"
    };
    pendaftaranSesi.add(kunci);
    kegiatan.kuota -= 1;
    tambahBarisHasil(pendaftaran);
    isiPilihanKegiatan();
    tampilkanPesan("Pendaftaran " + noPeserta + " -> " + pendaftaran.kegiatan + " tersimpan pada sesi ini. Sisa kuota: " + kegiatan.kuota + ".", true);

    selectPeserta.value = "";
    selectKegiatan.value = "";
}

document.addEventListener("DOMContentLoaded", function () {
    isiTanggalHariIni();
    const form = document.getElementById("form-tambah");
    if (form) form.addEventListener("submit", tanganiSubmit);
    muatDataForm();
});
