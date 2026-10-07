|  | Algoritma dan Struktur Data |
|--|--|
| NIM |  254107020087|
| Nama |  Aryakavi Raditya Imaran |
| Kelas | TI - 2F |
| Repository | ([https://github.com/aryakavi/DPW-2026-ARYAKAVI-RADITYA-IMARAN]) |

---

# Dokumentasi Jobsheet 11 — Keamanan Web Dasar

Dokumentasi ini melanjutkan
[dokumentasi jobsheet-10](../../jobsheet-10/Dokumentasi/README.md)
(Autentikasi & Manajemen Sesi). Jobsheet-11 menutup **janji** yang
sudah disebutkan berkali-kali di dokumentasi sebelumnya — ingat catatan
di [dokumentasi jobsheet-09](../../jobsheet-09/Dokumentasi/05-pagination-dan-pencarian-server.md#58-form-pencarian-methodget):
*"celah ini akan dibahas dan diperbaiki di Jobsheet 11"* — sekarang
saatnya.

## Tentang `docs/wireframe.md`

File ini **identik persis** dengan
[`docs/wireframe.md` di jobsheet-10](../../jobsheet-10/docs/wireframe.md).

## Apa yang Baru di Jobsheet 11?

Sesuai [README.md](../README.md) jobsheet ini, ada **audit keamanan
menyeluruh** terhadap kode Jobsheet 7-10, mencakup 5 kerentanan
(lihat detail lengkapnya di
[`docs/security-checklist.md`](../docs/security-checklist.md)):

1. **SQL Injection** — diaudit ulang, sudah aman sejak jobsheet-08
   (tidak ada perubahan kode).
2. **XSS (Cross-Site Scripting)** — seluruh output data dari
   database/`$_GET` sekarang dibungkus fungsi `e()` baru.
3. **CSRF (Cross-Site Request Forgery)** — token tersembunyi
   ditambahkan ke semua form `POST`, diverifikasi sebelum menyentuh
   database.
4. **Validasi & Sanitasi Input** — diaudit ulang, ditambah type casting
   eksplisit di beberapa tempat.
5. **Session Fixation** — `session_regenerate_id(true)` dipanggil
   setelah login berhasil.

Dua file baru menjadi pusat perubahan ini: **`includes/helpers.php`**
(fungsi `e()`) dan **`includes/csrf.php`** (`csrf_token()`,
`csrf_field()`, `csrf_verify()`).

## 6.4 Ide Latihan Tambahan (Opsional)

1. **Tambah proteksi CSRF ke form pencarian** — form `method="get"` di
   `buku/list.php`
   ([dokumentasi jobsheet-09 §5.8](../../jobsheet-09/Dokumentasi/05-pagination-dan-pencarian-server.md#58-form-pencarian-methodget))
   **sengaja tidak** diberi token CSRF — diskusikan sendiri kenapa: apa
   bedanya risiko form `GET` (yang hanya membaca data) dengan form
   `POST` (yang mengubah data) dalam konteks serangan CSRF?
2. **Tambah baris baru ke `security-checklist.md`** — audit satu
   bagian aplikasi yang belum eksplisit disebutkan (misalnya:
   "Apakah pesan error PHP mentah pernah bocor ke pengguna, membocorkan
   detail struktur database/server?"), lengkap dengan kolom Sebelum/
   Sesudah seperti baris-baris lainnya.
3. **Terapkan `e()` di halaman yang belum diperiksa** — telusuri
   sendiri apakah ada tempat lain di aplikasi (di luar yang disebutkan
   di [README.md](../README.md)) yang mencetak data dari database/
   `$_GET`/`$_POST` tanpa dibungkus `e()`.
4. **Pelajari `Content-Security-Policy` (CSP)** — cari tahu lewat
   dokumentasi web resmi bagaimana header HTTP ini bisa menjadi
   **lapisan pertahanan tambahan** terhadap XSS, bahkan seandainya ada
   satu tempat yang lolos dari `e()` tanpa sengaja.


## Struktur Folder

```
jobsheet-11/
├── includes/
│   ├── helpers.php               # BARU — fungsi e() untuk XSS
│   ├── csrf.php                   # BARU — token CSRF
│   ├── auth.php                   # Tidak berubah dari jobsheet-10
│   └── header.php                 # require_once helpers.php & csrf.php
├── auth/
│   ├── proses_login.php            # + session_regenerate_id(true), csrf_verify()
│   └── ...                          # + csrf_field() di form
├── buku/, anggota/
│   ├── list.php, edit.php            # Output dibungkus e()
│   ├── tambah.php, edit.php           # + csrf_field() di form
│   └── proses_*.php, hapus.php        # + csrf_verify()
├── docs/
│   ├── wireframe.md                   # Identik dengan jobsheet-10
│   └── security-checklist.md          # BARU — audit lengkap
├── README.md
└── Dokumentasi/                        # Folder dokumentasi ini
```

**Catatan penting** dari [README.md](../README.md) jobsheet ini: bagian
"Cara menguji" berisi 3 langkah verifikasi konkret (uji CSRF lewat
`curl`, uji XSS dengan menyimpan `<script>alert(1)</script>`, dan uji
urutan guard) — semuanya dibahas ulang di bab-bab berikutnya dan
dirangkum di [bab 6](06-rangkuman-latihan.md).