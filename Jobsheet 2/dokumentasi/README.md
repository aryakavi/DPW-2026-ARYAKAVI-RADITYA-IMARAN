|  | Algoritma dan Struktur Data |
|--|--|
| NIM |  254107020087|
| Nama |  Aryakavi Raditya Imaran |
| Kelas | TI - 2F |
| Repository | ([https://github.com/aryakavi/DPW-2026-ARYAKAVI-RADITYA-IMARAN]) |

---

# 1. Apa yang Baru di Jobsheet 2?

Sesuai [README.md](../README.md) jobsheet ini, **struktur HTML tidak
berubah sama sekali** dari jobsheet-01 — hanya ditambahkan satu file baru,
`assets/css/style.css`, dan satu baris `<link rel="stylesheet">` di tiap
halaman HTML. Jadi seluruh dokumentasi jobsheet 2 ini fokus pada **CSS**:
apa itu CSS, bagaimana cara kerjanya, dan penjelasan baris-per-baris file
`style.css`.

Disini saya juuga mempelajari beberapa hal, terutama pada modeling web HTML menggunakan CSS. Beberapa hal yang saya pelajari antara lain : 
*   **CSS Selector
*   **CSS Box Model
*   **Flexbox
*   **CSS Grid Layout
*   **Styling Element UI

# 2. Struktur Folder 📂

```
jobsheet-02/
├── index.html
├── assets/
│   └── css/
│       └── style.css      # File baru di jobsheet ini
├── buku/
│   ├── list.html
│   └── tambah.html
├── anggota/
│   ├── list.html
│   └── tambah.html
├── README.md
└── dokumentasi/           # Folder dokumentasi ini
```

# 3. Ide Latihan Tambahan (Opsional)
1. **Ubah skema warna** — ganti nilai `#1d5b8a` (warna biru tema) di
   seluruh file `style.css` dengan warna lain, misalnya hijau tua, lalu
   amati bagaimana warna itu konsisten muncul di header, judul section,
   tombol submit, dan header tabel — karena semuanya memakai nilai hex
   yang sama.

    **Jawaban**
    Saya mengubah skema tema warna menjadi warna hijau, sehingga yang sebelumnya terlihat seperti
    ![foto1](img/Simpus1.png)
    Menjadi
    ![foto2](img/Simpus2.png)

2. **Tambah kolom keempat** di grid kartu statistik — tambahkan satu
   `<article>` baru di HTML (misalnya "Buku Terlambat"), lalu ubah
   `repeat(3, 1fr)` menjadi `repeat(4, 1fr)` di CSS.

   **Jawaban**
    Setelah mengubah grid, lalu menambahkan tombol dummy, hasilnya menjadi seperti :
    ![foto3](img/Simpus3.png)]

3. **Buat tombol ketiga di tabel** — tambahkan tombol "Detail" di antara
   Edit dan Hapus pada `buku/list.html`, lalu amati apakah warnanya
   sesuai harapan (ingat catatan di [bab 7 §7.6](07-css-tabel.md#76-tombol-aksi-edit--hapus) tentang
   `:first-of-type`/`:last-of-type` yang berbasis posisi, bukan makna).
   Coba perbaiki dengan memberi `class` khusus jika warnanya tidak
   sesuai.

4. **Uji responsivitas sederhana** — perkecil lebar jendela browser
   secara bertahap sampai sangat sempit (seperti lebar HP), amati kapan
   `flex-wrap: wrap` pada navbar mulai memindahkan menu ke baris baru.

