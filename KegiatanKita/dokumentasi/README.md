|  | Algoritma dan Struktur Data |
|--|--|
| NIM |  254107020087|
| Nama |  Aryakavi Raditya Imaran |
| Kelas | TI - 2F |
| Repository | ([https://github.com/aryakavi/DPW-2026-ARYAKAVI-RADITYA-IMARAN]) |

---

# Dokumentasi Jobsheet 6 — Fetch API & JSON (tema KegiatanKita)

Dokumentasi ini melanjutkan [dokumentasi jobsheet-05](../../jobsheet-05/Dokumentasi/README.md) (JavaScript DOM & Event). Kalau kamu belum paham dasar JavaScript — memilih elemen DOM, event listener, `classList`, dsb. — baca dulu dokumentasi jobsheet-05 sebelum lanjut ke sini, karena jobsheet ini banyak membangun di atas konsep tersebut.

> Catatan: dokumen lama menyebut aplikasi contoh **SIMPUS-Mini**. Pada versi tema ini, domain datanya diganti menjadi **KegiatanKita** (katalog kegiatan & pendaftaran peserta), sementara konsep teknisnya tetap sama.

## 1. Tentang `docs/wireframe.md`

File ini berisi rancangan UI/UX untuk tema KegiatanKita — khususnya alur transaksi **Pendaftaran Kegiatan** dan **Pembatalan Pendaftaran**. Baca [dokumentasi jobsheet-04](../../jobsheet-04/Dokumentasi/README.md) kalau perlu menyegarkan ingatan soal wireframe & user flow.

## 2. Apa yang Baru di Jobsheet 6?

Sesuai [README.md](../README.md) jobsheet ini, ini titik penting dalam perjalanan aplikasi: untuk **pertama kalinya**, data tabel (Daftar Kegiatan & Daftar Peserta) **tidak lagi ditulis manual** di HTML — diambil secara dinamis dari file JSON memakai JavaScript. Empat perubahan besarnya:

1. **File JSON sumber data** (`data/kegiatan.json`, `data/peserta.json`, `data/pendaftaran.json`) — menggantikan sementara API/server sungguhan yang belum ada.
2. **Rendering tabel dipindah ke JavaScript** — `<tbody>` di HTML sekarang **kosong**, diisi dinamis oleh `assets/js/kegiatan.js` / `assets/js/peserta.js` / `assets/js/pendaftaran.js` lewat `fetch` + `async/await`.
3. **Loading indicator** — teks "Memuat data..." muncul sesaat selagi data sedang diambil.
4. **Penanganan error** dengan `try/catch` — kalau pengambilan data gagal, tabel menampilkan pesan error alih-alih halaman kosong/rusak.

Ditambah satu perubahan pendukung: `initHapusConfirm` di `app.js` diubah ke pola **event delegation**, karena tombol Hapus sekarang berada di baris yang baru dibuat setelah halaman selesai dimuat (dibahas di