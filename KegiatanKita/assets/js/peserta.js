async function muatDaftarPeserta() {
    const tbody = document.querySelector(".table-responsive table tbody");
    const loading = document.getElementById("loading-indicator");
    if (!tbody || !loading) return;
    const table = tbody.closest("table");
    if (table.getAttribute("aria-busy") === "true") return;

    const reload = document.getElementById("reload-peserta");
    if (reload) reload.disabled = true;
    table.setAttribute("aria-busy", "true");
    loading.style.display = "block";
    tbody.replaceChildren();
    table.dispatchEvent(new Event("table:updated"));

    try {
        await new Promise(function (resolve) { setTimeout(resolve, 600); });
        const res = await fetch("../data/peserta.json");
        if (!res.ok) {
            throw new Error("Gagal mengambil data (status " + res.status + ")");
        }
        const daftarPeserta = await res.json();
        if (!Array.isArray(daftarPeserta) || !daftarPeserta.every(function (peserta) {
            return peserta && typeof peserta.no_peserta === "string"
                && typeof peserta.nama === "string"
                && typeof peserta.asal === "string"
                && typeof peserta.no_hp === "string";
        })) {
            throw new Error("Struktur data peserta tidak sesuai.");
        }

        daftarPeserta.forEach(function (peserta) {
            const tr = document.createElement("tr");
            [peserta.no_peserta, peserta.nama, peserta.asal, peserta.no_hp].forEach(function (nilai) {
                const td = document.createElement("td");
                td.textContent = nilai;
                tr.appendChild(td);
            });
            const aksi = document.createElement("td");
            aksi.innerHTML = '<button type="button">Edit</button> '
                + '<button type="button" class="btn-hapus">Hapus</button>';
            tr.appendChild(aksi);
            tbody.appendChild(tr);
        });

        if (daftarPeserta.length === 0) {
            tampilkanStatusPeserta(tbody, "Belum ada data peserta.");
        }
    } catch (err) {
        tampilkanStatusPeserta(tbody, "Gagal memuat data: " + err.message);
    } finally {
        loading.style.display = "none";
        table.setAttribute("aria-busy", "false");
        if (reload) reload.disabled = false;
        table.dispatchEvent(new Event("table:updated"));
    }
}

function tampilkanStatusPeserta(tbody, pesan) {
    const tr = document.createElement("tr");
    tr.dataset.status = "true";
    const td = document.createElement("td");
    td.colSpan = 5;
    td.textContent = pesan;
    tr.appendChild(td);
    tbody.replaceChildren(tr);
}

document.addEventListener("DOMContentLoaded", function () {
    const reload = document.getElementById("reload-peserta");
    if (reload) reload.addEventListener("click", muatDaftarPeserta);
    muatDaftarPeserta();
});
