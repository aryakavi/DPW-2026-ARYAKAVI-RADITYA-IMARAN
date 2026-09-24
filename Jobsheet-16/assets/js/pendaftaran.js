async function muatDaftarPendaftaran() {
    const tbody = document.querySelector(".table-responsive table tbody");
    const loading = document.getElementById("loading-indicator");
    if (!tbody || !loading) return;
    const table = tbody.closest("table");
    if (table.getAttribute("aria-busy") === "true") return;

    const reload = document.getElementById("reload-pendaftaran");
    if (reload) reload.disabled = true;
    table.setAttribute("aria-busy", "true");
    loading.style.display = "block";
    tbody.replaceChildren();
    table.dispatchEvent(new Event("table:updated"));

    try {
        await new Promise(function (resolve) { setTimeout(resolve, 600); });
        const responses = await Promise.all([
            fetch("../data/pendaftaran.json"),
            fetch("../data/peserta.json"),
            fetch("../data/kegiatan.json")
        ]);
        responses.forEach(function (res) {
            if (!res.ok) {
                throw new Error("Gagal mengambil data (status " + res.status + ")");
            }
        });

        const daftarPendaftaran = await responses[0].json();
        const daftarPeserta = await responses[1].json();
        const daftarKegiatan = await responses[2].json();

        if (!Array.isArray(daftarPendaftaran) || !Array.isArray(daftarPeserta) || !Array.isArray(daftarKegiatan)) {
            throw new Error("Struktur data pendaftaran tidak sesuai.");
        }

        const petaPeserta = new Map();
        daftarPeserta.forEach(function (peserta) {
            if (peserta && typeof peserta.no_peserta === "string") {
                petaPeserta.set(peserta.no_peserta, peserta.nama);
            }
        });
        const petaKegiatan = new Map();
        daftarKegiatan.forEach(function (kegiatan) {
            if (kegiatan && typeof kegiatan.id_kegiatan === "string") {
                petaKegiatan.set(kegiatan.id_kegiatan, kegiatan.nama_kegiatan);
            }
        });

        daftarPendaftaran.forEach(function (pendaftaran) {
            const nama = petaPeserta.get(pendaftaran.no_peserta) || "(peserta tidak dikenal)";
            const kegiatan = petaKegiatan.get(pendaftaran.id_kegiatan) || "(kegiatan tidak dikenal)";
            const tr = document.createElement("tr");
            [pendaftaran.no_peserta, nama, kegiatan, pendaftaran.tgl_daftar, pendaftaran.status].forEach(function (nilai) {
                const td = document.createElement("td");
                td.textContent = nilai;
                tr.appendChild(td);
            });
            const aksi = document.createElement("td");
            aksi.innerHTML = '<button type="button" class="btn-hapus">Hapus</button>';
            tr.appendChild(aksi);
            tbody.appendChild(tr);
        });

        if (daftarPendaftaran.length === 0) {
            tampilkanStatusPendaftaran(tbody, "Belum ada data pendaftaran.");
        }
    } catch (err) {
        tampilkanStatusPendaftaran(tbody, "Gagal memuat data: " + err.message);
    } finally {
        loading.style.display = "none";
        table.setAttribute("aria-busy", "false");
        if (reload) reload.disabled = false;
        table.dispatchEvent(new Event("table:updated"));
    }
}

function tampilkanStatusPendaftaran(tbody, pesan) {
    const tr = document.createElement("tr");
    tr.dataset.status = "true";
    const td = document.createElement("td");
    td.colSpan = 6;
    td.textContent = pesan;
    tr.appendChild(td);
    tbody.replaceChildren(tr);
}

document.addEventListener("DOMContentLoaded", function () {
    const reload = document.getElementById("reload-pendaftaran");
    if (reload) reload.addEventListener("click", muatDaftarPendaftaran);
    muatDaftarPendaftaran();
});
