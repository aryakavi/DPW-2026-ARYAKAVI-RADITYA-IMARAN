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
                // Penambahan else-if baru untuk Latihan 1  
            } else if (input.name === "isbn" && input.value !== "" && !/^[0-9-]+$/.test(input.value)) {
                pesan = "ISBN hanya boleh berisi angka 0–9 dan tanda hubung (-).";
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