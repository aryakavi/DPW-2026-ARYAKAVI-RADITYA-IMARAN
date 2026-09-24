|  | Algoritma dan Struktur Data |
|--|--|
| NIM |  254107020087|
| Nama |  Aryakavi Raditya Imaran |
| Kelas | TI - 2F |
| Repository | ([https://github.com/aryakavi/DPW-2026-ARYAKAVI-RADITYA-IMARAN]) |

---

# KegiatanKita — Katalog & Pendaftaran Kegiatan Kampus

Versi tema dari Jobsheet 6 (Fetch API & JSON). Basis kode, struktur folder, dan pola `fetch` + `async/await` tetap sama seperti versi SIMPUS-Mini; yang berubah adalah domain datanya: dari perpustakaan menjadi katalog kegiatan dan pendaftaran peserta.

Sub-CPMK: Menerapkan komunikasi asinkron (AJAX/fetch, JSON).

## Pemetaan data

| SIMPUS-Mini | KegiatanKita | Keterangan |
|---|---|---|
| `buku` | `kegiatan` | `stok` menjadi `kuota` (sisa slot peserta) |
| `anggota` | `peserta` | `no_anggota` menjadi `no_peserta`, `alamat` menjadi `asal` |
| — | `pendaftaran` | Transaksi baru: peserta mendaftar ke sebuah kegiatan |

## Struktur halaman

- `index.html` — beranda + ringkasan (total kegiatan, peserta, pendaftaran, kegiatan penuh).
- `kegiatan/list.html`, `kegiatan/tambah.html` — katalog kegiatan (kuota).
- `peserta/list.html`, `peserta/tambah.html` — data peserta.
- `pendaftaran/list.html` — daftar pendaftaran (menggabungkan peserta + kegiatan).
- `pendaftaran/daftar.html` — form pendaftaran; hanya kegiatan berkuota > 0 yang bisa dipilih.

## Sumber data

- `data/kegiatan.json` (10 objek)
- `data/peserta.json` (4 objek)
- `data/pendaftaran.json` (4 objek)

Tabel dirender dinamis oleh `assets/js/kegiatan.js`, `peserta.js`, `pendaftaran.js`, dan `pendaftaran-form.js` menggunakan `fetch` + `async/await`, dengan loading indicator, `try/catch`, dan event delegation untuk tombol Hapus pada baris dinamis.

## Batasan

Data masih berupa file JSON statis sebagai pengganti sementara API. Fetch membaca data; Hapus, Tambah, dan Pendaftaran hanya mengubah DOM dan tidak tersimpan permanen. Penyimpanan sungguhan baru tersedia pada tahap back-end (Jobsheet 7-8).

## Cara menjalankan

**Penting:** `fetch()` ke file lokal akan diblokir kebijakan CORS jika dibuka langsung dengan `file://`. Jalankan lewat server lokal:

```bash
node server.cjs
```

lalu buka `http://127.0.0.1:8000/index.html`. Bisa juga memakai PHP (`php -S localhost:8000`) atau ekstensi "Live Server" di VSCode.

## Catatan

- Uji error handling dengan mengganti sementara nama file di `fetch(...)` menjadi nama yang salah.
- Kegiatan dengan kuota 0 tidak dapat dipilih pada form pendaftaran.
- Peserta yang sama tidak dapat mendaftar dua kali pada kegiatan yang sama.
