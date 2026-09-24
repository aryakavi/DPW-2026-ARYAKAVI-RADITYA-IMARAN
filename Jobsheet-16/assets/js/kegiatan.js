async function muatDaftarKegiatan() {
    const tbody = document.querySelector(".table-responsive table tbody");
    const loading = document.getElementById("loading-indicator");
    if (!tbody || !loading) return;
    const table = tbody.closest("table");
    if (table.getAttribute("aria-busy") === "true") return;

    const reload = document.getElementById("reload-kegiatan");
    if (reload) reload.disabled = true;
    table.setAttribute("aria-busy", "true");
    loading.style.display = "block";
    tbody.replaceChildren();
    table.dispatchEvent(new Event("table:updated"));

    try {
        await new Promise(function (resolve) { setTimeout(resolve, 600); });
        const res = await fetch("../data/kegiatan.json");
        if (!res.ok) {
            throw new Error("Gagal mengambil data (status " + res.status + ")");
        }
        const daftarKegiatan = await res.json();
        if (!Array.isArray(daftarKegiatan) || !daftarKegiatan.every(function (kegiatan) {
            return kegiatan && typeof kegiatan.nama_kegiatan === "string"
                && typeof kegiatan.penyelenggara === "string"
                && Number.isInteger(kegiatan.tahun)
                && Number.isInteger(kegiatan.kuota) && kegiatan.kuota >= 0;
        })) {
            throw new Error("Struktur data kegiatan tidak sesuai.");
        }

        daftarKegiatan.forEach(function (kegiatan) {
            const tr = document.createElement("tr");
            [kegiatan.nama_kegiatan, kegiatan.penyelenggara, kegiatan.tahun, kegiatan.kuota].forEach(function (nilai) {
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

        if (daftarKegiatan.length === 0) {
            tampilkanStatusKegiatan(tbody, "Belum ada data kegiatan.");
        }
    } catch (err) {
        tampilkanStatusKegiatan(tbody, "Gagal memuat data: " + err.message);
    } finally {
        loading.style.display = "none";
        table.setAttribute("aria-busy", "false");
        if (reload) reload.disabled = false;
        table.dispatchEvent(new Event("table:updated"));
    }
}

function tampilkanStatusKegiatan(tbody, pesan) {
    const tr = document.createElement("tr");
    tr.dataset.status = "true";
    const td = document.createElement("td");
    td.colSpan = 5;
    td.textContent = pesan;
    tr.appendChild(td);
    tbody.replaceChildren(tr);
}

document.addEventListener("DOMContentLoaded", function () {
    const reload = document.getElementById("reload-kegiatan");
    if (reload) reload.addEventListener("click", muatDaftarKegiatan);
    muatDaftarKegiatan();
});
