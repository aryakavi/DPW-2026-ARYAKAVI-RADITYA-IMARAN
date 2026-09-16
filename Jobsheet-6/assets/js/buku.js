async function muatDaftarBuku() {
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
        const res = await fetch("../data/buku.json");
        if (!res.ok) {
            throw new Error("Gagal mengambil data (status " + res.status + ")");
        }
        const daftarBuku = await res.json();
        if (!Array.isArray(daftarBuku) || !daftarBuku.every(function (buku) {
            return buku && typeof buku.judul === "string" && typeof buku.pengarang === "string"
                && Number.isInteger(buku.tahun) && Number.isInteger(buku.stok) && buku.stok >= 0;
        })) {
            throw new Error("Struktur data buku tidak sesuai.");
        }

        daftarBuku.forEach(function (buku) {
            const tr = document.createElement("tr");
            [buku.judul, buku.pengarang, buku.tahun, buku.stok].forEach(function (nilai) {
                const td = document.createElement("td");
                td.textContent = nilai;
                tr.appendChild(td);
            });
            const aksi = document.createElement("td");
            aksi.innerHTML = '<button type="button">Edit</button> '
                + '<button type="button" class="btn-detail">Detail</button> '
                + '<button type="button" class="btn-hapus">Hapus</button>';
            tr.appendChild(aksi);
            tbody.appendChild(tr);
        });

        if (daftarBuku.length === 0) {
            tampilkanStatusBuku(tbody, "Belum ada data buku.");
        }
    } catch (err) {
        tampilkanStatusBuku(tbody, "Gagal memuat data: " + err.message);
    } finally {
        loading.style.display = "none";
        table.setAttribute("aria-busy", "false");
        table.dispatchEvent(new Event("table:updated"));
    }
}

function tampilkanStatusBuku(tbody, pesan) {
    const tr = document.createElement("tr");
    tr.dataset.status = "true";
    const td = document.createElement("td");
    td.colSpan = 5;
    td.textContent = pesan;
    tr.appendChild(td);
    tbody.replaceChildren(tr);
}

document.addEventListener("DOMContentLoaded", muatDaftarBuku);
