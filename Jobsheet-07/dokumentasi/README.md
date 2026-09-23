|  | Algoritma dan Struktur Data |
|--|--|
| NIM |  254107020087|
| Nama |  Aryakavi Raditya Imaran |
| Kelas | TI - 2F |
| Repository | ([https://github.com/aryakavi/DPW-2026-ARYAKAVI-RADITYA-IMARAN]) |

---

# 1. Dokumentasi Jobsheet 7 — PHP Dasar & Form Handling

Dokumentasi ini melanjutkan
[dokumentasi jobsheet-06](../../jobsheet-06/Dokumentasi/README.md)
(Fetch API & JSON). Jobsheet-07 adalah **titik paling besar** dalam
perjalanan SIMPUS-Mini sejauh ini: aplikasi berpindah dari yang
sepenuhnya berjalan di **browser** (HTML/CSS/JS statis) menjadi
aplikasi yang punya **server sungguhan** di baliknya, memakai **PHP**.

## 2.  Tentang `docs/wireframe.md`

File ini **identik persis** dengan
[`docs/wireframe.md` di jobsheet-06](../../jobsheet-06/docs/wireframe.md) —
tidak ada rancangan UI/UX baru di jobsheet ini. Baca
[dokumentasi jobsheet-04](../../jobsheet-04/Dokumentasi/README.md) kalau
perlu menyegarkan ingatan soal wireframe & user flow.

## 3. Kenapa Ini Perubahan Besar?

Semua jobsheet sebelumnya (01-06) bisa dijalankan hanya dengan
**membuka file di browser** — bahkan jobsheet-06 yang butuh server lokal
pun sebenarnya server itu hanya untuk melayani file statis (HTML, CSS,
JS, JSON) apa adanya, tanpa mengolah apa pun. Di jobsheet-07, untuk
**pertama kalinya**, ada kode yang benar-benar **dijalankan di server**
sebelum halaman dikirim ke browser: PHP memproses data, mengambil
keputusan (misalnya "apakah form ini valid?"), dan **menghasilkan**
HTML yang berbeda-beda tergantung situasinya (misalnya menampilkan
pesan error atau tidak) — bukan sekadar mengirim file HTML yang sudah
jadi apa adanya seperti jobsheet-jobsheet sebelumnya.

## 4. Apa yang Baru di Jobsheet 7?

Sesuai [README.md](../README.md) jobsheet ini:

1. Semua halaman `.html` diubah jadi **`.php`**.
2. Dua file baru, `includes/header.php` dan `includes/footer.php`,
   menghindari duplikasi navbar/footer lewat `include`.
3. Path CSS/JS/menu di `includes/header.php`/`footer.php` dihitung
   **relatif otomatis** lewat variabel `$base` (lihat
   [bab 2 §2.3](02-includes-header-footer.md#23-path-relatif-otomatis-di-includesheaderphp)),
   supaya tetap benar dipakai bersama oleh halaman di kedalaman folder
   yang berbeda-beda.
4. Form Tambah Buku/Anggota kini benar-benar **mengirim data** ke
   `proses_tambah.php` (bukan lagi form kosong tanpa `action` seperti
   sejak jobsheet-01).
5. `proses_tambah.php` memvalidasi data di **server**, menyimpannya ke
   `$_SESSION`, lalu redirect ke halaman daftar.
6. `list.php` merender tabel dari `$_SESSION`, menggantikan pendekatan
   `fetch`/JSON di jobsheet-06.
7. **Flash message** — pesan sukses/gagal yang muncul sekali setelah
   redirect.
8. `assets/js/buku.js`, `assets/js/anggota.js`, dan folder `data/` dari
   jobsheet-06 **dihapus** — tidak dibutuhkan lagi karena rendering
   sudah pindah ke server.


## 5. Ide Latihan Tambahan (Opsional)
1. Tambah validasi ISBN di buku/proses_tambah.php — misalnya memastikan ISBN yang diisi (kalau tidak kosong) hanya berisi angka dan tanda hubung, memakai fungsi PHP preg_match().
2. Tambah flash message di anggota/proses_tambah.php untuk kasus yang belum ditangani — bandingkan dengan versi buku/proses_tambah.php yang sudah divalidasi lebih lengkap (rentang tahun, stok non-negatif) — field apa lagi di form anggota yang mungkin perlu aturan validasi tambahan?
3. Buat halaman debug_session.php sementara (untuk latihan, hapus setelah selesai) yang menampilkan isi $_SESSION mentah lewat <pre><?php print_r($_SESSION); ?></pre> — cara yang berguna untuk "mengintip" langsung apa yang sebenarnya tersimpan di server saat belajar.
4. Tambah tombol "Reset Data" yang memanggil session_destroy() untuk mengosongkan seluruh $_SESSION secara manual, tanpa perlu menutup browser — cari tahu sendiri lewat dokumentasi PHP resmi bagaimana fungsi ini bekerja.

## 6. Struktur Folder

```
jobsheet-07/
├── index.php                   # Beranda, kini file PHP
├── includes/
│   ├── header.php               # BARU — bagian atas HTML + navbar, dipakai ulang
│   └── footer.php               # BARU — bagian bawah HTML + footer, dipakai ulang
├── assets/
│   ├── css/style.css            # Ditambah gaya .flash
│   └── js/app.js                 # Tidak berubah dari jobsheet-06
├── buku/
│   ├── list.php                  # Render dari $_SESSION, bukan lagi fetch/JSON
│   ├── tambah.php                # Form kini punya method="post" & action
│   └── proses_tambah.php         # BARU — validasi server + simpan ke $_SESSION
├── anggota/
│   ├── list.php
│   ├── tambah.php
│   └── proses_tambah.php         # BARU
├── docs/wireframe.md              # Identik dengan jobsheet-06
├── README.md
└── Dokumentasi/                   # Folder dokumentasi ini
```