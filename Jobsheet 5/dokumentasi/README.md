|  | Algoritma dan Struktur Data |
|--|--|
| NIM |  254107020087|
| Nama |  Aryakavi Raditya Imaran |
| Kelas | TI - 2F |
| Repository | ([https://github.com/aryakavi/DPW-2026-ARYAKAVI-RADITYA-IMARAN]) |

---

# Dokumentasi Jobsheet 5 — JavaScript DOM & Event

Dokumentasi ini melanjutkan
[dokumentasi jobsheet-03](../../jobsheet-03/Dokumentasi/README.md) (HTML/CSS
responsif) dan [jobsheet-04](../../jobsheet-04/Dokumentasi/README.md)
(rancangan UI/UX). Jobsheet-05 adalah titik penting: ini **pertama
kalinya** aplikasi SIMPUS-Mini punya **JavaScript** — kode yang membuat
halaman benar-benar bisa "bereaksi" terhadap tindakan pengguna, bukan
sekadar tampilan statis.

## 1. Tentang `docs/wireframe.md`

File ini **identik persis** dengan
[`docs/wireframe.md` di jobsheet-04](../../jobsheet-04/docs/wireframe.md) —
tidak ada perubahan rancangan UI/UX baru di jobsheet ini. Kalau kamu
belum membaca rancangan itu, baca dulu
[dokumentasi jobsheet-04](../../jobsheet-04/Dokumentasi/README.md)
sebelum lanjut ke sini.

## 2. Apa yang Baru di Jobsheet 5?

Sesuai [README.md](../README.md) jobsheet ini, ada 4 penambahan besar,
semuanya lewat file baru `assets/js/app.js`:

1. **Menu hamburger diganti dari CSS ke JavaScript** — sebelumnya
   memakai "checkbox hack" murni CSS (lihat
   [dokumentasi jobsheet-03](../../jobsheet-03/Dokumentasi/03-css-hamburger-checkbox-hack.md)),
   sekarang memakai tombol asli + `classList.toggle()`.
2. **Validasi form sisi klien (client-side)** — form Tambah Buku dan
   Tambah Anggota sekarang menolak data yang tidak valid **sebelum**
   ter-submit, dengan pesan error yang muncul langsung di halaman.
3. **Filter/pencarian tabel real-time** — mengetik di kolom cari
   langsung menyaring baris tabel tanpa reload halaman.
4. **Tombol Hapus yang benar-benar berfungsi** (di sisi tampilan) —
   menampilkan konfirmasi lalu menghapus barisnya dari layar.

## 3. Konsep Inti yang Perlu Diingat

1. **JavaScript menambah lapisan perilaku**, terpisah dari struktur
   (HTML) dan tampilan (CSS) — dihubungkan lewat `<script src="...">`
   yang diletakkan di akhir `<body>` ([bab 1](01-konsep-dasar-javascript-dom.md)).
2. **DOM adalah "pohon" objek** yang bisa dibaca dan diubah lewat
   `getElementById`/`querySelector`/`querySelectorAll`, memakai selector
   CSS yang sama dengan yang sudah kamu kuasai sejak jobsheet-02
   ([bab 1 §1.5](01-konsep-dasar-javascript-dom.md#15-memilih-elemen-dari-dom)).
3. **Event listener adalah pola inti interaktivitas**: pilih elemen →
   `.addEventListener(event, fungsi)` → tulis reaksinya. Tiga event
   utama di jobsheet ini: `click`, `keyup`, `submit`
   ([bab 1 §1.6](01-konsep-dasar-javascript-dom.md#16-apa-itu-event-dan-event-listener)).
4. **`classList.toggle()`/`.contains()`** adalah cara modern mengatur
   status tampilan lewat class CSS, menggantikan trik CSS murni seperti
   checkbox hack ketika JavaScript sudah tersedia
   ([bab 4 §4.6](04-js-hamburger-menu.md#46-bandingkan-dengan-checkbox-hack-jobsheet-03)).
5. **Guard clause** (`if (!elemen) return;`) penting supaya satu file
   JavaScript yang sama aman dipakai di banyak halaman berbeda, tanpa
   error di halaman yang tidak punya elemen tertentu
   ([bab 1 §1.7](01-konsep-dasar-javascript-dom.md#17-struktur-umum-kode-di-appjs)).
6. **Validasi client-side bisa dilewati** dan bukan pengganti validasi
   server-side — ini lapisan kenyamanan pengguna, bukan lapisan keamanan
   ([bab 7 §7.8](07-js-validasi-form.md#78-kenapa-validasi-html-required-min-max-masih-perlu-diduplikasi-di-js)).

## 4. Ide Latihan Tambahan (Opsional)
1. **Tambah validasi field baru** — misalnya field ISBN di form Tambah Buku (yang saat ini tidak wajib diisi, ingat dari 

    Untuk tambah validasi field baru saya mengubah bagian ISBN dimana menjadi opsional. Perubahan terjadi di tambah.html di folder buku.
```HTML
<label for="isbn">ISBN (opsional)</label><br>
                    <input type="text" id="isbn" name="isbn" pattern="[0-9\-]+" placeholder="Contoh: 978-602-123-456-7">
                    <small>Jika diisi, gunakan hanya angka 0–9 dan tanda hubung (-).</small>
```
Selain itu menambahkan else-if baru di app.js untuk validasi ISBN tersebut
```js
else if (input.name === "isbn" && input.value !== "" && !/^[0-9-]+$/.test(input.value)) {
                pesan = "ISBN hanya boleh berisi angka 0–9 dan tanda hubung (-).";
```

2. **Tambah animasi sederhana** pada `initNavToggle` — misalnya tambahkan class CSS `transition` pada `header nav` di `style.css`supaya menu terbuka/tertutup dengan efek geser halus, alih-alih langsung muncul/hilang seketika.

    Perubahan sudah saya lakukan didalam app.js dan Style.css
    Perubahan untuk file app.js :
```js
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
```

Perubahan untuk file Style.css
```css
/* Menambahkan ovverride display none/block dengan grid yang bisa dianimasikan*/
@media (max-width: 480px) {
    header nav.transition {
        display: grid;
        grid-template-rows: 0fr;
        margin-top: 0;
        opacity: 0;
        transform: translateY(-0.5rem);
        visibility: hidden;
        transition: grid-template-rows 250ms ease, margin-top 250ms ease,
            opacity 250ms ease, transform 250ms ease, visibility 0s linear 250ms;
    }

    header nav.transition > ul {
        min-height: 0;
        overflow: hidden;
    }

    header nav.transition.nav-open {
        grid-template-rows: 1fr;
        margin-top: 1rem;
        opacity: 1;
        transform: translateY(0);
        visibility: visible;
        transition-delay: 0s;
    }
}
```


3. **Perluas `initTableFilter`** supaya pencarian bisa dibatasi ke satu kolom saja (misalnya hanya kolom "Judul"), bukan mencari di seluruh teks baris — petunjuk: gunakan `row.querySelector("td")` seperti pola yang sudah dipakai di [bab 5 §5.4], alih-alih `row.textContent`.

    Terdapat cukup banyak perubahan di latihan 3 ini, yaitu perubahan list.html di anggota, list.html di buku, Style.css, dan app.js
    Perubahan app.js
```js
function initTableFilter() {
    const input = document.getElementById("search-input");
    const table = document.querySelector(".table-responsive table");
    const column = document.getElementById("search-column");
    if (!input || !table || !column) return;

    function filterRows() {
        const keyword = input.value.toLowerCase();
        const rows = table.querySelectorAll("tbody tr");
        rows.forEach(function (row) {
            const cells = Array.from(row.querySelectorAll("td"));
            const teksKolom = column.value === "all"
                ? cells.slice(0, -1).map(function (cell) { return cell.textContent; }).join(" ")
                : cells[Number(column.value)]?.textContent || "";
            const teks = teksKolom.toLowerCase();
            row.style.display = teks.includes(keyword) ? "" : "none";
        });
    }

    input.addEventListener("keyup", filterRows);
    input.addEventListener("input", filterRows);
    // Latihan 3 untuk kolom langsung menerapkan kata kunci
    column.addEventListener("change", filterRows);
}
```

perubahan Style.css menambah dropdown menu pencarian
```css
.search-box label[for="search-column"] {
    margin-top: 0.75rem;
}

.search-box select {
    width: 100%;
    max-width: 320px;
    padding: 0.5rem 0.75rem;
    border: 1px solid #cdd4da;
    border-radius: 4px;
    background-color: #fff;
}
```

Perubahan list.html di folder buku
```html
<div class="search-box">
                <label for="search-input">Cari Buku</label>
                <input type="text" id="search-input" placeholder="Ketik kata kunci sesuai kolom pilihan...">
                <!-- Latihan 3 Pencarian yang dibatasi menurut dropdown kolom data -->
                <label for="search-column">Kolom pencarian</label>
                <select id="search-column">
                    <option value="all">Semua Kolom Data</option>
                    <option value="0" selected>Judul</option>
                    <option value="1">Pengarang</option>
                    <option value="2">Tahun</option>
                    <option value="3">Stok</option>
                </select>
            </div>
```

Perubahan list.html di folder anggota
```html
<div class="search-box">
                    <label for="search-input">Cari Anggota</label>
                    <input type="text" id="search-input" placeholder="Ketik kata kunci sesuai kolom pilihan...">
                    <!-- Latihan 3 Pencarian yang dibatasi dropdown kolom data. -->
                    <label for="search-column">Kolom pencarian</label>
                    <select id="search-column">
                        <option value="all">Semua Kolom Data</option>
                        <option value="0">No. Anggota</option>
                        <option value="1" selected>Nama</option>
                        <option value="2">Alamat</option>
                        <option value="3">No. HP</option>
                    </select>
                </div>
```

4. **Tambah counter jumlah baris tersisa** setelah difilter atau dihapus — tampilkan misalnya "Menampilkan 3 dari 5 buku" di atas tabel, diperbarui setiap kali `initTableFilter` atau `initHapusConfirm` berjalan.

    Banyak file yang dirubah untuk menambah counter jumlah baris tersisa, yaitu kedia file list.html didalam folder buku dan anggota, app.js, serta Style.css
    Penambahan app.js
```js
// LAtihan 4 menyimpan jumlah awal
function initTableCounter() {
    const counter = document.getElementById("table-counter");
    const table = document.querySelector(".table-responsive table");
    if (!counter || !table) return;

    counter.dataset.totalAwal = String(table.querySelectorAll("tbody tr").length);
    updateTableCounter();
}

// Latihan 4 Hanya baris yang terlihat dihitung
function updateTableCounter() {
    const counter = document.getElementById("table-counter");
    const table = document.querySelector(".table-responsive table");
    if (!counter || !table) return;

    const rows = Array.from(table.querySelectorAll("tbody tr"));
    const terlihat = rows.filter(function (row) {
        return getComputedStyle(row).display !== "none";
    }).length;
    const pesan = "Menampilkan " + terlihat + " dari " + counter.dataset.totalAwal + " " + counter.dataset.label;
    if (counter.textContent !== pesan) counter.textContent = pesan;
}
```

Penambahan Stle.css
```css
/* TAMBAH LATIHAN-04: ringkasan hasil filter dan hapus di atas tabel. */
.table-counter {
    margin-bottom: 0.75rem;
    color: #55677a;
    font-size: 0.9rem;
}
```

Penambahan list.html 
```html
<!-- Untuk folder buku -->
<p id="table-counter" class="table-counter" role="status" aria-live="polite" data-label="buku">Menampilkan 5 dari 5 buku</p>

<!-- Untuk folder anggota -->
<p id="table-counter" class="table-counter" role="status" aria-live="polite" data-label="anggota">Menampilkan 2 dari 2 anggota</p>
```

5. **Refactor validasi** — coba ubah `initValidasiForm` supaya nama field yang wajib divalidasi diambil dari sebuah array/daftar, alih-alih menulis blok `if` terpisah untuk tiap field satu-satu (petunjuk: pikirkan pola perulangan `forEach` yang sudah dipakai di [bab 5](05-js-konfirmasi-hapus.md) dan [bab 6](06-js-filter-tabel.md)).
