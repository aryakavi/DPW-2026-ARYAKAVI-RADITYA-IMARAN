|  | Algoritma dan Struktur Data |
|--|--|
| NIM |  254107020087|
| Nama |  Aryakavi Raditya Imaran |
| Kelas | TI - 2F |
| Repository | ([https://github.com/aryakavi/DPW-2026-ARYAKAVI-RADITYA-IMARAN]) |

---

# Dokumentasi Jobsheet 8 — Koneksi PostgreSQL

Dokumentasi ini melanjutkan
[dokumentasi jobsheet-07](../../jobsheet-07/Dokumentasi/README.md)
(PHP Dasar & Form Handling). Jobsheet-08 menutup satu "lubang" penting
yang sudah disinggung berkali-kali di dokumentasi sebelumnya: data yang
**benar-benar tersimpan**, tidak hilang begitu sesi browser berakhir.

## Tentang `docs/wireframe.md`

File ini **identik persis** dengan
[`docs/wireframe.md` di jobsheet-07](../../jobsheet-07/docs/wireframe.md) —
tidak ada rancangan UI/UX baru di jobsheet ini.

## Kenapa Ini Penting?

Ingat catatan yang sudah berulang kali muncul sejak
[dokumentasi jobsheet-07 §3.5](../../jobsheet-07/Dokumentasi/03-session-dan-alur-data.md#35-kenapa-data-ini-sementara):
data di `$_SESSION` **hilang** begitu sesi browser berakhir. Jobsheet-08
mengganti sumber data dari `$_SESSION` menjadi **database PostgreSQL**
sungguhan — data yang kamu tambahkan sekarang akan **tetap ada**
meskipun kamu menutup browser, mematikan komputer, atau kembali lagi
besok.

## Apa yang Baru di Jobsheet 8?

Sesuai [README.md](../README.md) jobsheet ini:

1. **`sql/01_buku_anggota.sql`** — skema database: perintah SQL untuk
   membuat tabel `buku` dan `anggota`.
2. **`includes/koneksi.php`** — kode PHP yang menghubungkan aplikasi ke
   database PostgreSQL, memakai **PDO**.
3. **`proses_tambah.php`** (buku & anggota) — `$_SESSION['buku'][] = ...`
   dari jobsheet-07 diganti `INSERT ... RETURNING id` lewat **prepared
   statement**.
4. **`list.php`** (buku & anggota) — sumber data diganti dari
   `$_SESSION` menjadi `SELECT * FROM ... ORDER BY id DESC`.
5. **`index.php`** — kartu statistik Total Buku/Anggota sekarang
   `SELECT COUNT(*)` dari database sungguhan, bukan lagi dummy/session.

## 5. Ide Latihan Tambahan (Opsional)

1. **Tangani error `UNIQUE` dengan rapi** — bungkus `$stmt->execute(...)` di `anggota/proses_tambah.php` dengan `try`/`catch (PDOException $e)`, lalu set `$_SESSION['flash']` berisi pesan seperti "No. Anggota sudah dipakai, gunakan nomor lain." alih-alih membiarkan error mentah ditampilkan ke pengguna.
2. **Tambah kolom baru** — misalnya `tanggal_ditambahkan TIMESTAMP DEFAULT NOW()` di tabel `buku` (cari tahu sendiri arti `NOW()` dan `TIMESTAMP` lewat dokumentasi PostgreSQL), lalu tampilkan kolom itu di `buku/list.php`.
3. **Buat query pencarian di server** — tambahkan `WHERE judul ILIKE :keyword` (`ILIKE` = pencocokan teks tanpa memandang huruf besar/kecil di PostgreSQL) ke query `SELECT` di `buku/list.php`, dihubungkan dengan kolom pencarian yang sudah ada di HTML — bandingkan dengan filter tabel **sisi klien** yang sudah kamu bangun di [dokumentasi jobsheet-05 §6](../../jobsheet-05/Dokumentasi/06-js-filter-tabel.md).
4. **Migrasi data lama** — coba tulis skrip PHP kecil terpisah yang membaca `data/buku.json` dari jobsheet-06 ([dokumentasi jobsheet-06 §3](../../jobsheet-06/Dokumentasi/03-data-json.md)) lalu memasukkan seluruh isinya ke tabel `buku` lewat `INSERT` — latihan bagus untuk memahami bagaimana data lama bisa "dipindahkan" ke database baru.


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