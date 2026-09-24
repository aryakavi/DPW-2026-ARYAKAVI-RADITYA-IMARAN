|  | Algoritma dan Struktur Data |
|--|--|
| NIM |  254107020087|
| Nama |  Aryakavi Raditya Imaran |
| Kelas | TI - 2F |
| Repository | ([https://github.com/aryakavi/DPW-2026-ARYAKAVI-RADITYA-IMARAN]) |

--- 

# Wireframe & User Flow — KegiatanKita

Sub-CPMK: Merancang UI/UX aplikasi (proyek).

Versi tema dari rancangan SIMPUS-Mini. Halaman katalog (Beranda, Kegiatan, Peserta) sudah tersedia; dokumen ini merancang alur transaksi **Pendaftaran Kegiatan** dan **Pembatalan Pendaftaran** yang menjadi inti tema ini.

## Aktor
- **Tamu**: hanya bisa melihat katalog kegiatan (Beranda, Daftar Kegiatan) tanpa login.
- **Petugas**: mengelola data kegiatan/peserta dan melayani pendaftaran.

## User Flow — Pendaftaran Kegiatan

```
[Petugas] -> [Daftar Pendaftaran] -> [Pilih menu "Pendaftaran Baru"]
        -> [Pilih Peserta] -> [Pilih Kegiatan (kuota > 0)]
        -> [Simpan] -> [Kuota kegiatan berkurang 1] -> [Baris masuk ke daftar]
```

## User Flow — Pembatalan Pendaftaran

```
[Daftar Pendaftaran] -> [Cari baris (peserta/kegiatan)]
        -> [Klik "Hapus"] -> [Konfirmasi] -> [Baris hilang, kuota bertambah 1]
```

## Wireframe: Form Pendaftaran

```
+--------------------------------------+
|  Form Pendaftaran Kegiatan           |
|--------------------------------------|
|  Peserta  : [ dropdown peserta ]     |
|  Kegiatan : [ dropdown, kuota > 0 ]  |
|  Tanggal  : [ auto: hari ini ]       |
|                                      |
|        [  Simpan Pendaftaran  ]      |
+--------------------------------------+
```

## Wireframe: Daftar Pendaftaran

```
+-------------------------------------------------------------+
| KegiatanKita   Beranda | Kegiatan | Peserta | Pendaftaran     |
|-------------------------------------------------------------|
| Cari: [__________]  Kolom: [ Nama v ]                       |
| Muat Ulang        Menampilkan 4 dari 4 pendaftaran          |
|-------------------------------------------------------------|
| No. Peserta | Nama  | Kegiatan | Tgl Daftar | Status | Aksi  |
| P001        | Siti  | Seminar  | 2026-09-01 | Terdaftar     |
| P002        | Budi  | Seminar  | 2026-09-02 | Hadir         |
+-------------------------------------------------------------+
```

## Wireframe: Riwayat Pendaftaran per Peserta

```
+--------------------------------------+
|  Riwayat Pendaftaran — Siti Aminah   |
|--------------------------------------|
|  Kegiatan            | Tgl Daftar | Status     |
|  Seminar Teknologi    | 01/09      | Terdaftar  |
|  Workshop UI/UX       | 10/09      | Hadir      |
+--------------------------------------+
```

## Konsistensi dengan Desain yang Sudah Berjalan
- Warna aksen, tipografi navbar, dan gaya tabel/kartu tetap mengikuti `assets/css/style.css` tanpa perubahan.
- Tombol, counter, filter per kolom, dan event delegation untuk Hapus memakai `assets/js/app.js` yang sama.
- Edge case yang ditangani sekarang: kegiatan berkuota 0 dinonaktifkan pada dropdown; peserta yang sama tidak bisa mendaftar dua kali pada kegiatan yang sama.

## Catatan penyimpanan
Pendaftaran pada form masih mengubah DOM saja (belum menulis ke `data/pendaftaran.json`), konsisten dengan batasan front-end statis. Tabel `pendaftaran` di sini menjadi rancangan tabel transaksi saat back-end siap.
