|  | Algoritma dan Struktur Data |
|--|--|
| NIM |  254107020087|
| Nama |  Aryakavi Raditya Imaran |
| Kelas | TI - 2F |
| Repository | ([https://github.com/aryakavi/DPW-2026-ARYAKAVI-RADITYA-IMARAN]) |

---

# 1. Dokumentasi Jobsheet 9 — CRUD Penuh

Dokumentasi ini melanjutkan
[dokumentasi jobsheet-08](../../jobsheet-08/Dokumentasi/README.md)
(Koneksi PostgreSQL). Jobsheet-09 **melengkapi** apa yang sudah dibangun
sejak jobsheet-08 — kalau jobsheet-08 baru mencakup **Create** (tambah
data) dan **Read** (tampilkan data), jobsheet ini menambahkan dua huruf
terakhir dari **CRUD**: **Update** (ubah) dan **Delete** (hapus).

## 2. Tentang `docs/wireframe.md`

File ini **identik persis** dengan
[`docs/wireframe.md` di jobsheet-08](../../jobsheet-08/docs/wireframe.md) —
tidak ada rancangan UI/UX baru di jobsheet ini.

## 3. Apa yang Baru di Jobsheet 9?

Sesuai [README.md](../README.md) jobsheet ini:

1. **`edit.php` + `proses_edit.php`** (buku & anggota) — melengkapi
   **Update**: form yang **sudah terisi** data lama, lalu menyimpan
   perubahannya.
2. **`hapus.php`** (buku & anggota) — melengkapi **Delete**, sengaja
   **hanya menerima `POST`** (bukan `GET`) supaya tidak terpicu tidak
   sengaja lewat tautan biasa atau crawler mesin pencari.
3. Tombol Hapus di `list.php` sekarang berupa **`<form>` sungguhan**
   (bukan `<button>` polos seperti jobsheet-05/06) — `app.js` diubah
   menangani konfirmasi di event `submit`, bukan `click`.
4. **Pagination** (`LIMIT`/`OFFSET`, 5 baris per halaman) dan
   **pencarian sisi server** (`WHERE ... ILIKE ...`) — menggantikan
   pencarian client-side murni dari jobsheet-05/06 untuk kebutuhan
   mencari **lintas semua halaman**, bukan cuma baris yang sedang
   tampil.


## 4. Ide Latihan Tambahan (Opsional)

1. **Tambah konfirmasi ekstra sebelum Update** — bandingkan dengan Delete yang sudah punya `confirm()`; apakah Update juga butuh konfirmasi serupa? Pertimbangkan kapan konfirmasi tambahan benar-benar diperlukan (ingat: Update tidak destruktif seperti Delete, data lama masih "terlihat" sebelum diubah).
2. **Ubah jumlah baris per halaman** — ganti `$perPage = 5;` menjadi `10` di `buku/list.php`, amati bagaimana jumlah total halaman berubah mengikuti.
3. **Tambah pencarian di kolom lain** — misalnya perluas query di [bab 5 §5.6](05-pagination-dan-pencarian-server.md#56-pencarian-sisi-server-ilike) supaya juga mencocokkan kolom `pengarang`, bukan cuma `judul` (petunjuk: gunakan `OR` di klausa `WHERE`).
4. **Terapkan pola Update/Delete ke fitur lain** — kalau kamu menambah entitas baru di proyek pribadimu nanti, coba terapkan pola CRUD yang sama persis: `list.php` (Read + pagination), `tambah.php` (Create), `edit.php` (Update), `hapus.php` (Delete) — pola 4 file ini akan terus berulang untuk hampir semua data yang perlu dikelola.


## 5. Struktur Folder

```
jobsheet-09/
├── index.php
├── includes/                       # Tidak berubah dari jobsheet-08
├── buku/
│   ├── list.php                     # + pagination, pencarian server, tombol Hapus jadi form
│   ├── tambah.php, proses_tambah.php # Tidak berubah dari jobsheet-08
│   ├── edit.php                      # BARU — form edit terisi data lama
│   ├── proses_edit.php               # BARU — UPDATE ke database
│   └── hapus.php                     # BARU — DELETE, hanya menerima POST
├── anggota/                          # Struktur sama persis dengan buku/
│   ├── list.php, tambah.php, proses_tambah.php
│   ├── edit.php, proses_edit.php, hapus.php
├── assets/
│   ├── css/style.css                 # + gaya btn-edit, pagination, search form
│   └── js/app.js                      # initHapusConfirm: click → submit
├── docs/wireframe.md                  # Identik dengan jobsheet-08
├── README.md
└── Dokumentasi/                       # Folder dokumentasi ini
```