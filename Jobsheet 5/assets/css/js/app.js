function initNavToggle() {
    const toggleBtn = document.getElementById("nav-toggle-btn");
    const nav = document.querySelector("header nav");
    if (!toggleBtn || !nav) return;

    toggleBtn.addEventListener("click", function () {
        const terbuka = nav.classList.toggle("nav-open");
        toggleBtn.setAttribute("aria-expanded", String(terbuka));
    });
}

function initHapusConfirm() {
    document.querySelectorAll(".btn-hapus").forEach(function (btn) {
        btn.addEventListener("click", function () {
            const row = btn.closest("tr");
            const nama = row?.querySelector("td")?.textContent.trim() || "data ini";
            const yakin = confirm("Yakin ingin menghapus \"" + nama + "\"?");
            if (yakin && row) {
                row.remove();
            }
        });
    });
}

function initTableFilter() {
    const input = document.getElementById("search-input");
    const table = document.querySelector(".table-responsive table");
    if (!input || !table) return;

    function filterRows() {
        const keyword = input.value.toLowerCase();
        const rows = table.querySelectorAll("tbody tr");
        rows.forEach(function (row) {
            const teks = row.textContent.toLowerCase();
            row.style.display = teks.includes(keyword) ? "" : "none";
        });
    }

    input.addEventListener("keyup", filterRows);
    input.addEventListener("input", filterRows);
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

function initValidasiForm() {
    const form = document.getElementById("form-tambah");
    if (!form) return;

    form.noValidate = true;

    form.addEventListener("submit", function (e) {
        let valid = true;

        const judul = form.querySelector("[name='judul'], [name='nama']");
        if (judul && judul.value.trim() === "") {
            tampilkanError(judul, "Field ini wajib diisi.");
            valid = false;
        } else if (judul) {
            hapusError(judul);
        }

        const pengarang = form.querySelector("[name='pengarang']");
        if (pengarang && pengarang.value.trim() === "") {
            tampilkanError(pengarang, "Field ini wajib diisi.");
            valid = false;
        } else if (pengarang) {
            hapusError(pengarang);
        }

        const isbn = form.querySelector("[name='isbn']");
        if (isbn && isbn.value.trim() === "") {
            tampilkanError(isbn, "Field ini wajib diisi.");
            valid = false;
        } else if (isbn) {
            hapusError(isbn);
        }

        const noAnggota = form.querySelector("[name='no_anggota']");
        if (noAnggota && noAnggota.value.trim() === "") {
            tampilkanError(noAnggota, "Field ini wajib diisi.");
            valid = false;
        } else if (noAnggota) {
            hapusError(noAnggota);
        }

        const tahun = form.querySelector("[name='tahun']");
        if (tahun) {
            const nilai = Number(tahun.value);
            if (tahun.value.trim() === "") {
                tampilkanError(tahun, "Field ini wajib diisi.");
                valid = false;
            } else if (!Number.isInteger(nilai) || nilai < 1900 || nilai > 2026) {
                tampilkanError(tahun, "Tahun harus berupa bilangan bulat di antara 1900-2026.");
                valid = false;
            } else {
                hapusError(tahun);
            }
        }

        const stok = form.querySelector("[name='stok']");
        if (stok) {
            const nilai = Number(stok.value);
            if (stok.value.trim() === "") {
                tampilkanError(stok, "Field ini wajib diisi.");
                valid = false;
            } else if (!Number.isInteger(nilai) || nilai < 0) {
                tampilkanError(stok, "Stok harus berupa bilangan bulat minimal 0.");
                valid = false;
            } else {
                hapusError(stok);
            }
        }

        if (!valid) {
            e.preventDefault();
            form.querySelector("[aria-invalid='true']").focus();
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
   initNavToggle();
   initHapusConfirm();
   initTableFilter();
   initValidasiForm();
});