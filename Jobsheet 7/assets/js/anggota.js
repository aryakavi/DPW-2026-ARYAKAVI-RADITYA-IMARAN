async function muatDaftarAnggota() {
    const tbody = document.querySelector(".table-responsive table tbody");
    const loading = document.getElementById("loading-indicator");
    if (!tbody || !loading) return;
    const table = tbody.closest("table");
    if (table.getAttribute("aria-busy") === "true") return;

    table.setAttribute("aria-busy", "true");
    loading.style.display = "block";
    tbody.replaceChildren();
    table.dispatchEvent(new Event("table:updated"));

    try {
        await new Promise(function (resolve) { setTimeout(resolve, 600); });
        const res = await fetch("../data/anggota.json");
        if (!res.ok) {
            throw new Error("Gagal mengambil data (status " + res.status + ")");
        }
        const daftarAnggota = await res.json();
        if (!Array.isArray(daftarAnggota) || !daftarAnggota.every(function (anggota) {
            return anggota && typeof anggota.no_anggota === "string" && typeof anggota.nama === "string"
                && typeof anggota.alamat === "string" && typeof anggota.no_hp === "string";
        })) {
            throw new Error("Struktur data anggota tidak sesuai.");
        }

        daftarAnggota.forEach(function (anggota) {
            const tr = document.createElement("tr");
            [anggota.no_anggota, anggota.nama, anggota.alamat, anggota.no_hp].forEach(function (nilai) {
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

        if (daftarAnggota.length === 0) {
            tampilkanStatusAnggota(tbody, "Belum ada data anggota.");
        }
    } catch (err) {
        tampilkanStatusAnggota(tbody, "Gagal memuat data: " + err.message);
    } finally {
        loading.style.display = "none";
        table.setAttribute("aria-busy", "false");
        table.dispatchEvent(new Event("table:updated"));
    }
}
function tampilkanStatusAnggota(tbody, pesan) {
    const tr = document.createElement("tr");
    tr.dataset.status = "true";
    const td = document.createElement("td");
    td.colSpan = 5;
    td.textContent = pesan;
    tr.appendChild(td);
    tbody.replaceChildren(tr);
}

document.addEventListener("DOMContentLoaded", muatDaftarAnggota);
