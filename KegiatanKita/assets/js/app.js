function initNavToggle() {
    const toggleBtn = document.getElementById("nav-toggle-btn");
    const nav = document.querySelector("header nav");
    if (!toggleBtn || !nav) return;

    // perubahan yang untuk latihan 2, memasang class transition
    const mobile = window.matchMedia("(max-width: 480px)");
    nav.classList.add("transition");

    function syncNavState() {
        const terlihat = !mobile.matches || nav.classList.contains("nav-open");
        nav.inert = !terlihat;
        toggleBtn.setAttribute("aria-expanded", String(terlihat));
    }

    toggleBtn.addEventListener("click", function () {
        nav.classList.toggle("nav-open");
        syncNavState();
    });
    
    mobile.addEventListener("change", syncNavState);
    syncNavState();
}

function initHapusConfirm() {
    document.addEventListener("click", function (e) {
        if (!(e.target instanceof Element)) return;
        const btn = e.target.closest(".btn-hapus");
        if (!btn) return;

        const row = btn.closest("tr");
        if (!row) return;
        const nama = row.querySelector("td")?.textContent.trim() || "data ini";
        const yakin = confirm("Yakin ingin menghapus \"" + nama + "\"?");
        if (yakin) {
            row.remove();
            updateTableCounter();
        }
    });
}

// Latihan 3 Filter satu kolom pilih atau semua sel data
function initTableFilter() {
    const input = document.getElementById("search-input");
    const table = document.querySelector(".table-responsive table");
    const column = document.getElementById("search-column");
    if (!input || !table || !column) return;

    function filterRows() {
        const keyword = input.value.toLowerCase();
        const rows = table.querySelectorAll("tbody tr:not([data-status])");
        rows.forEach(function (row) {
            const cells = Array.from(row.querySelectorAll("td"));
            const teksKolom = column.value === "all"
                ? cells.slice(0, -1).map(function (cell) { return cell.textContent; }).join(" ")
                : cells[Number(column.value)]?.textContent || "";
            const teks = teksKolom.toLowerCase();
            row.style.display = teks.includes(keyword) ? "" : "none";
        });
        updateTableCounter();
    }

    input.addEventListener("keyup", filterRows);
    input.addEventListener("input", filterRows);
    // Latihan 3 untuk kolom langsung menerapkan kata kunci
    column.addEventListener("change", filterRows);
    table.addEventListener("table:updated", function () {
        initTableCounter();
        filterRows();
    });
}

// Latihan 4 menyimpan jumlah awal
function initTableCounter() {
    const counter = document.getElementById("table-counter");
    const table = document.querySelector(".table-responsive table");
    if (!counter || !table) return;

    counter.dataset.totalAwal = String(table.querySelectorAll("tbody tr:not([data-status])").length);
    updateTableCounter();
}

// Latihan 4 Hanya baris yang terlihat dihitung
function updateTableCounter() {
    const counter = document.getElementById("table-counter");
    const table = document.querySelector(".table-responsive table");
    if (!counter || !table) return;

    // UBAH: pesan gagal/kosong tidak dihitung sebagai data ketika fetch bermasalah.
    const rows = Array.from(table.querySelectorAll("tbody tr:not([data-status])"));
    const terlihat = rows.filter(function (row) {
        return getComputedStyle(row).display !== "none";
    }).length;
    const pesan = "Menampilkan " + terlihat + " dari " + counter.dataset.totalAwal + " " + counter.dataset.label;
    if (counter.textContent !== pesan) counter.textContent = pesan;
}

function tampilkanError(input, pesan) {
    hapusError(input);
    const span = document.createElement("span");
    span.className = "error";
    span.id = input.id + "-error";
    span.textContent = pesan;
    input.insertAdjacentElement("afterend", span);
    input.setAttribute("aria-invalid", "true");
    input.setAttribute("aria-describedby", span.id);
}

function hapusError(input) {
    const next = input.nextElementSibling;
    if (next && next.classList.contains("error")) {
        next.remove();
    }
    input.removeAttribute("aria-invalid");
    input.removeAttribute("aria-describedby");
}

// Latihan 5 blok diganti loop berdasar array nama field
function initValidasiForm() {
    const form = document.getElementById("form-tambah");
    if (!form) return;

    // Penambahan line Latihan 5 satu daftar untuk kedua form dan mengabaikan field yang tidak ada
    const fieldWajib = ["nama_kegiatan", "penyelenggara", "tahun", "kuota", "no_peserta", "nama", "asal", "id_kegiatan"];
    const fields = fieldWajib.map(function (nama) {
        return form.querySelector("[name='" + nama + "']");
    }).filter(function (input) {
        return input !== null;
    });

    form.noValidate = true;

    form.addEventListener("submit", function (e) {
        let valid = true;
        // Latihan 5 setiap input dalam daftar menjalani validasi yang sama
        fields.forEach(function (input) {
            hapusError(input);
            let pesan = "";

            if (input.value.trim() === "") {
                pesan = "Field ini wajib diisi.";
            } else if (input.name === "tahun") {
                const nilai = Number(input.value);
                if (!Number.isInteger(nilai) || nilai < 1900 || nilai > 2026) {
                    pesan = "Tahun harus berupa bilangan bulat di antara 1900-2026.";
                }
            } else if (input.name === "kuota") {
                const nilai = Number(input.value);
                if (input.value.trim() === "" || !Number.isInteger(nilai) || nilai < 0) {
                    pesan = "Kuota harus berupa bilangan bulat minimal 0.";
                }
            }

            if (pesan) {
                tampilkanError(input, pesan);
                valid = false;
            }
        });

        if (!valid) {
            e.preventDefault();
            // Latihan 5 mengikuti urutan field HTML bukan array.
            form.querySelector("[aria-invalid='true']").focus();
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
   initTableCounter();
   initNavToggle();
   initHapusConfirm();
   initTableFilter();
   initValidasiForm();
});
