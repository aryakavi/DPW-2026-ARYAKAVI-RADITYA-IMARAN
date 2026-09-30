|  | Algoritma dan Struktur Data |
|--|--|
| NIM |  254107020087|
| Nama |  Aryakavi Raditya Imaran |
| Kelas | TI - 2F |
| Repository | ([https://github.com/aryakavi/DPW-2026-ARYAKAVI-RADITYA-IMARAN]) |

---

# 1. Dokumentasi Jobsheet 10 — Autentikasi & Manajemen Sesi

Dokumentasi ini melanjutkan
[dokumentasi jobsheet-09](../../jobsheet-09/Dokumentasi/README.md) (CRUD Penuh). Jobsheet-10 mewujudkan sesuatu yang sudah dirancang **jauh sebelumnya**: ingat wireframe halaman Login dan pembagian aktor Tamu/Petugas yang sudah dibahas di [dokumentasi jobsheet-04](../../jobsheet-04/Dokumentasi/04-aktor-dan-otorisasi.md) — sekarang, 6 jobsheet kemudian, fitur itu **benar-benar dibangun**.

## 2. Tentang `docs/wireframe.md`

File ini **identik persis** dengan
[`docs/wireframe.md` di jobsheet-09](../../jobsheet-09/docs/wireframe.md).

## 3. Apa yang Baru di Jobsheet 10?

Sesuai [README.md](../README.md) jobsheet ini:

1. **`sql/02_users.sql`** — tabel `users` baru (nama, username, password, role).
2. **Registrasi** (`auth/register.php` + `proses_register.php`) — password disimpan **terenkripsi** lewat `password_hash()`, dengan pengecekan username duplikat.
3. **Login** (`auth/login.php` + `proses_login.php`) — memverifikasi password lewat `password_verify()`.
4. **Logout** (`auth/logout.php`) — mengakhiri sesi lewat `session_destroy()`.
5. **`includes/auth.php`** — "penjaga gerbang" yang mengalihkan pengunjung yang belum login ke halaman Login, dipasang di semua halaman yang **wajib** login.
6. **Navbar dinamis** — menu dan status login/logout kini berubah tergantung apakah pengunjung sudah login atau belum.

## 4. Mengingat Kembali: Aktor Tamu vs Petugas

Ingat dari [dokumentasi jobsheet-04 §4](../../jobsheet-04/Dokumentasi/04-aktor-dan-otorisasi.md), `wireframe.md` sejak awal membedakan 2 aktor:

> - **Tamu**: hanya bisa melihat katalog buku (Beranda, Daftar Buku)
>   tanpa login.
> - **Petugas**: login untuk mengakses seluruh fitur CRUD dan transaksi
>   peminjaman.

Jobsheet ini **mewujudkan pembagian itu secara teknis**:

| Halaman | Akses |
|---|---|
| `index.php` (Beranda) | **Publik** — Tamu boleh mengakses |
| `buku/list.php` (katalog buku) | **Publik** — Tamu boleh mengakses |
| `buku/tambah.php`, `buku/edit.php`, `buku/hapus.php` | **Terkunci** — wajib login |
| Seluruh halaman `anggota/*` | **Terkunci** — wajib login |

## 5. Ide Latihan Tambahan (Opsional)

1. **Terapkan kontrol akses berbasis `role`** — sesuai catatan di [README.md](../README.md) jobsheet ini yang menyebutnya sebagai tugas mandiri: buat aturan misalnya hanya `role === 'admin'` yang boleh mengakses `anggota/hapus.php`, sementara `'petugas'` biasa hanya boleh melihat dan menambah data. Petunjuk: kamu perlu  menambah pengecekan baru **setelah** `require auth.php`, memeriksa  `$_SESSION['role']`.
2. **Tambah "Ingat Saya" (Remember Me)** — cari tahu lewat dokumentasi PHP resmi bagaimana cookie dengan masa berlaku panjang bisa dipakai untuk menjaga sesi login tetap aktif meski browser ditutup (petunjuk: fungsi `setcookie()`), lalu diskusikan sendiri risiko keamanannya dibanding sekadar mengandalkan `$_SESSION` biasa.
3. **Batasi percobaan Login yang gagal** — tambahkan penghitung percobaan gagal per username (bisa disimpan sementara di `$_SESSION` untuk latihan), dan tampilkan peringatan setelah beberapa kali gagal berturut-turut — langkah awal mencegah serangan *brute-force* menebak password.
4. **Uji coba mematikan PostgreSQL** sesuai catatan di [README.md](../README.md) jobsheet ini — coba hentikan sementara layanan PostgreSQL di komputermu, lalu akses `/buku/tambah.php` tanpa login — buktikan sendiri kamu tetap diarahkan ke Login (bukan melihat error koneksi database), sesuai penjelasan di [bab 4 §4.6](04-guard-auth-php.md#46-kenapa-guard-ini-tetap-bekerja-meski-database-belum-tersambung).


## 6. Struktur Folder

```
jobsheet-08/
├── index.php                      # Kartu statistik dari SELECT COUNT(*)
├── includes/
│   ├── header.php, footer.php      # Tidak berubah dari jobsheet-07
│   └── koneksi.php                  # BARU — koneksi PDO ke PostgreSQL
├── sql/
│   └── 01_buku_anggota.sql          # BARU — skema tabel buku & anggota
├── buku/
│   ├── list.php                     # SELECT * FROM buku, bukan $_SESSION
│   ├── tambah.php                   # Tidak berubah dari jobsheet-07
│   └── proses_tambah.php            # INSERT via prepared statement
├── anggota/
│   ├── list.php
│   ├── tambah.php
│   └── proses_tambah.php            # INSERT via prepared statement
├── docs/wireframe.md                 # Identik dengan jobsheet-07
├── README.md
└── Dokumentasi/                      # Folder dokumentasi ini
```