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
        let firstInvalid = null;

        form.querySelectorAll("input, select").forEach(function (input) {
            hapusError(input);
            let pesan = "";

            if (input.required && input.value.trim() === "") {
                pesan = "Field ini wajib diisi.";
            } else if (input.name === "tahun") {
                const nilai = Number(input.value);
                if (!Number.isInteger(nilai) || nilai < 1900 || nilai > 2026) {
                    pesan = "Tahun harus berupa bilangan bulat di antara 1900-2026.";
                }
            } else if (input.name === "stok") {
                const nilai = Number(input.value);
                if (input.value.trim() === "" || !Number.isInteger(nilai) || nilai < 0) {
                    pesan = "Stok harus berupa bilangan bulat minimal 0.";
                }
            }

            if (pesan) {
                tampilkanError(input, pesan);
                valid = false;
                if (!firstInvalid) firstInvalid = input;
            }
        });

        if (!valid) {
            e.preventDefault();
            firstInvalid.focus();
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
   initNavToggle();
   initHapusConfirm();
   initTableFilter();
   initValidasiForm();
});