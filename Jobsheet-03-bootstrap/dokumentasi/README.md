|  | Algoritma dan Struktur Data |
|--|--|
| NIM |  254107020087|
| Nama |  Aryakavi Raditya Imaran |
| Kelas | TI - 2F |
| Repository | ([https://github.com/aryakavi/DPW-2026-ARYAKAVI-RADITYA-IMARAN]) |

---

#6. Rangkuman & Perbandingan dengan CSS Murni


## 6.2 Tabel Perbandingan Class Bootstrap vs CSS Murni

Ringkasan seluruh pemetaan yang sudah dibahas di bab-bab sebelumnya:

| Kebutuhan | CSS Murni (jobsheet-03 asli) | Bootstrap (jobsheet ini) |
|---|---|---|
| Membatasi & menengahkan lebar konten | `main { max-width: 1000px; margin: 0 auto; }` | `.container` |
| Kartu putih dengan bayangan | `section { border-radius: 8px; box-shadow: ...; }` | `.card` + `.shadow-sm` |
| Grid 3 kolom kartu statistik | `display: grid; grid-template-columns: repeat(3, 1fr);` | `.row` + `.col-md-4` |
| Navbar hamburger | Checkbox hack (`:checked` + `~`) | `.navbar-toggler` + `.collapse` (JS) |
| Tabel belang & hover | `nth-child(even)`, `:hover` | `.table-striped`, `.table-hover` |
| Tabel scroll horizontal | `.table-responsive { overflow-x: auto; }` (custom) | `.table-responsive` (bawaan, nama sama) |
| Tombol warna | `td button:first-of-type { background: ...; }` | `.btn-warning`, `.btn-danger` |
| Input & select form | `form input { width:100%; padding:...; border:...; }` | `.form-control`, `.form-select` |
| Breakpoint tablet/mobile | `@media (max-width: 768px)` / `(max-width: 480px)` custom | Infix bawaan: `sm`, `md`, `lg`, `xl`, `xxl` |
| Baris CSS custom dibutuhkan | ~245 baris | ~15 baris |

## 6.4 Ide Latihan Tambahan (Opsional)
1. Ganti warna brand ke tema bawaan Bootstrap — hapus semua style="background-color:#1d5b8a;" dan style="color:#1d5b8a;", ganti dengan class bawaan seperti .bg-primary/.text-primary, lalu bandingkan seberapa banyak baris style.css yang jadi tidak diperlukan lagi.
2. Tambah breakpoint ketiga di grid kartu statistik — sisipkan col-sm-6 di antara col-12 dan col-md-4 (bab 4 §4.3) supaya ada juga tampilan 2 kolom di breakpoint sm, meniru progresi 3 tingkat dari versi CSS murni.
3. Ganti breakpoint navbar dari .navbar-expand-lg menjadi .navbar-expand-md, amati di lebar layar berapa navbar mulai "terlipat" jadi hamburger — buktikan bahwa breakpoint Bootstrap bisa diganti hanya lewat nama class, tanpa CSS tambahan sama sekali.
4. Tambahkan komponen Bootstrap baru yang belum dipakai jobsheet ini, misalnya .badge untuk menandai status "Tersedia"/"Kosong" di kolom Stok pada buku/list.html, atau .alert untuk menampilkan pesan sukses setelah form disimpan.
5. Bandingkan ukuran file — buka DevTools tab Network, refresh index.html versi Bootstrap ini dan bandingkan total ukuran yang diunduh (termasuk CSS+JS Bootstrap dari CDN) dengan versi jobsheet-03 CSS murni yang hanya memuat satu file style.css kecil — diskusikan trade-off ukuran unduhan vs kecepatan pengembangan.

## Struktur Folder

```
jobsheet-03-bootstrap/
├── index.html              # Beranda
├── assets/
│   └── css/
│       └── style.css       # Override kecil di atas Bootstrap (~15 baris)
├── buku/
│   ├── list.html
│   └── tambah.html
├── anggota/
│   ├── list.html
│   └── tambah.html
└── Dokumentasi/             # Folder dokumentasi ini
```

Tidak ada file JavaScript custom yang perlu ditulis — komponen navbar
Bootstrap sudah membawa JavaScript-nya sendiri.
Silakan baca urut dari nomor 1, atau langsung loncat ke bagian yang ingin
dipahami.