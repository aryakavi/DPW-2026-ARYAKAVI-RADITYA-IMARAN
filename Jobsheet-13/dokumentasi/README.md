|  | Algoritma dan Struktur Data |
|--|--|
| NIM |  254107020087|
| Nama |  Aryakavi Raditya Imaran |
| Kelas | TI - 2F |
| Repository | ([https://github.com/aryakavi/DPW-2026-ARYAKAVI-RADITYA-IMARAN]) |

---

# Dokumentasi Jobsheet 13 — Deployment & Dokumentasi

Dokumentasi ini melanjutkan
[dokumentasi jobsheet-12](../../jobsheet-12/Dokumentasi/README.md)
(Integrasi Modul Peminjaman). Jobsheet-13 adalah **jobsheet penutup**
seluruh rangkaian SIMPUS-Mini — sesuai judulnya, "Deployment &
Dokumentasi": bukan menambah fitur baru, melainkan **menyiapkan**
aplikasi yang sudah selesai dibangun (Jobsheet 1-12) supaya siap
**dijalankan di tempat lain** (server produksi/hosting) dan **dipahami
orang lain** (dokumentasi proyek).

## Kabar Baik: Hampir Semua Kode Aplikasi Tidak Berubah

Diperiksa langsung: **satu-satunya** perbedaan kode dari jobsheet-12
ada di 3 file — `includes/koneksi.php`, file baru `includes/config.php`,
dan `includes/footer.php` (hanya label tahun). Seluruh logika CRUD
Buku/Anggota, autentikasi, CSRF, dan modul Peminjaman **identik
persis** dengan jobsheet-12 — sudah dibahas tuntas di
[dokumentasi jobsheet-07](../../jobsheet-07/Dokumentasi/README.md)
sampai
[dokumentasi jobsheet-12](../../jobsheet-12/Dokumentasi/README.md).

## Apa yang Baru di Jobsheet 13?

Sesuai [README.md](../README.md) jobsheet ini:

1. **`includes/config.php`** — file baru yang memisahkan **kredensial**
   database dari kode sumber, membaca dari *environment variable*
   dengan nilai cadangan (fallback) untuk pengembangan lokal.
2. **`includes/koneksi.php`** diubah untuk membaca konfigurasi dari
   `config.php`, bukan lagi menuliskan kredensial langsung di kodenya.
3. **`docs/manual-pengguna.md`** — panduan penggunaan aplikasi untuk
   pengguna akhir (bukan dokumentasi kode untuk developer).
4. **`README.md`** (di root proyek) menjadi **snapshot akhir** proyek:
   ERD final, matriks fitur per role, instruksi instalasi lengkap.

## Ide Latihan Tambahan (Opsional)

1. **Tambah `.env.example`** — buat file baru bernama `.env.example`
   berisi daftar nama environment variable yang dibutuhkan (`DB_HOST`,
   `DB_PORT`, dst.) **tanpa** nilai sungguhan, sebagai contoh/template
   untuk siapa pun yang men-deploy aplikasi ini — pola yang sangat
   umum dipakai di proyek sungguhan (cari tahu sendiri lewat referensi
   umum tentang file `.env` di proyek web).
2. **Lengkapi validasi bisnis yang masih tertunda** — ingat dari
   [dokumentasi jobsheet-12 §6.4](../../jobsheet-12/Dokumentasi/06-rangkuman-latihan.md#64-ide-latihan-tambahan-opsional),
   aturan "anggota terlambat >14 hari tidak boleh meminjam" masih
   belum diterapkan — coba selesaikan sebagai latihan akhir yang
   menggabungkan hampir semua konsep yang sudah kamu pelajari (query
   SQL, transaction, validasi, flash message).
3. **Sisipkan screenshot sungguhan** ke `manual-pengguna.md` — jalankan
   aplikasi di lab dengan PostgreSQL aktif, ambil tangkapan layar
   nyata di setiap langkah bertanda `[Screenshot]`, lengkapi dokumen
   itu sesuai catatannya sendiri.
4. **Tulis "lessons learned"-mu sendiri** — coba tulis 1 halaman
   ringkasan (terpisah dari dokumentasi ini) tentang konsep pemrograman
   web apa yang menurutmu paling menantang dari seluruh 13 jobsheet
   ini, dan kenapa — latihan reflektif yang bagus sebelum presentasi
   UAS.


## Struktur Folder

```
jobsheet-12/
├── index.php                       # Kartu "Sedang Dipinjam" kini dari database
├── includes/
│   ├── header.php                    # + 3 menu Peminjaman
│   └── ...                            # Tidak berubah lainnya
├── peminjaman/
│   ├── tambah.php, proses_tambah.php  # BARU — transaction + FOR UPDATE
│   ├── kembali.php, proses_kembali.php # BARU — transaction serupa
│   └── riwayat.php                     # BARU — JOIN 2 tabel
├── sql/
│   ├── 01_buku_anggota.sql
│   ├── 02_users.sql
│   └── 03_peminjaman.sql               # BARU — tabel peminjaman + foreign key
├── buku/, anggota/, auth/               # Tidak berubah dari jobsheet-11
├── docs/
│   ├── wireframe.md                     # Identik dengan jobsheet-11
│   └── security-checklist.md            # Identik dengan jobsheet-11
├── README.md
└── Dokumentasi/                          # Folder dokumentasi ini
```

**Catatan penting** dari [README.md](../README.md) jobsheet ini:
validasi bisnis tambahan (anggota dengan peminjaman terlambat >14 hari
tidak boleh meminjam buku baru) **belum diterapkan** — dijadikan tugas
mandiri (lihat [bab 6](06-rangkuman-latihan.md)).
