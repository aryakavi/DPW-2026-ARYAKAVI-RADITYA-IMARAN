|  | Algoritma dan Struktur Data |
|--|--|
| NIM |  254107020087|
| Nama |  Aryakavi Raditya Imaran |
| Kelas | TI - 2F |
| Repository | ([https://github.com/aryakavi/DPW-2026-ARYAKAVI-RADITYA-IMARAN]) |

---

# Jobsheet 11 — Keamanan Web Dasar

Sub-CPMK: Menerapkan prinsip keamanan web dasar.

## Perubahan dari Jobsheet 10
- Tambah `includes/helpers.php` (`e()` untuk `htmlspecialchars`) dan `includes/csrf.php` (`csrf_token()`, `csrf_field()`, `csrf_verify()`), keduanya di-`require_once` dari `includes/header.php`.
- **XSS**: seluruh output data dari database/`$_GET` (judul, pengarang, nama, alamat, no_hp, nilai pencarian, nama petugas di navbar) dibungkus `e()`.
- **CSRF**: token tersembunyi ditambahkan ke semua form POST (Tambah/Edit/Hapus Buku & Anggota, Login, Register); setiap `proses_*.php` dan `hapus.php` memanggil `csrf_verify()` sebelum menyentuh database.
- **Session fixation**: `session_regenerate_id(true)` dipanggil di `auth/proses_login.php` setelah login berhasil.
- **SQL Injection**: diaudit ulang (tidak ada perubahan kode — sejak Jobsheet 8 semua query sudah prepared statement).
- Tambah `docs/security-checklist.md` — dokumen audit lengkap dengan bukti before/after per kerentanan.

## Cara menjalankan
**Opsi 1 — PHP built-in server**:
```bash
php -S localhost:8000
```

**Opsi 2 — Laragon (Apache)**: lewat virtual host langsung ke folder `jobsheet-11/` (mis. `http://jobsheet11.test/`), atau bersarang di bawah domain proyek (mis. `http://dp2026.test/kode-praktikum/jobsheet-11/`) — path CSS/JS/link/redirect login sudah relatif otomatis (lihat `includes/header.php` & `includes/auth.php`), jadi keduanya jalan.

## Cara menguji
- **CSRF**: login, lalu coba kirim `curl -X POST http://localhost:8000/buku/proses_tambah.php -d "judul=x"` tanpa `csrf_token` → harus mendapat HTTP 403.
- **XSS**: tambah buku dengan judul `<script>alert(1)</script>` → di Daftar Buku harus tampil sebagai teks, bukan pop-up.
- **Guard order**: akses `proses_tambah.php` lewat POST tanpa login sama sekali → tetap redirect ke Login (guard `auth.php` jalan lebih dulu daripada `csrf_verify()`), sudah diverifikasi otomatis.

## Deploy ke Render + Supabase
1. Buat project Supabase, lalu jalankan skema berurutan dari SQL Editor Supabase (atau `psql`):
   ```bash
   sql/01_buku_anggota.sql
   sql/02_users.sql
   sql/03_peminjaman.sql
   ```
   Jalankan **berurutan** karena `03_peminjaman.sql` mereferensikan `buku` & `anggota`.
2. Ambil kredensial **Connection Pooler → Session mode** dari Supabase (Project Settings → Database):
   - Host: `aws-0-<region>.pooler.supabase.com`
   - Port: `5432`
   - User: `postgres.<project-ref>`
   - Database: `postgres`
   - Password: password database project
   Pakai pooler (bukan koneksi langsung `db.<ref>.supabase.co`) karena koneksi langsung IPv6-only dan Render tidak mendukung IPv6 keluar. Session mode wajib karena aplikasi memakai transaction + `SELECT ... FOR UPDATE`.
3. Push folder ini ke repo GitHub, buat **Blueprint** di Render dari `render.yaml`.
4. Isi env var yang `sync: false` di dashboard Render:
   - `DB_HOST`, `DB_USER` (`postgres.<project-ref>`), `DB_PASS`
   - `DB_PORT=5432`, `DB_NAME=postgres`, `DB_SSLMODE=require` sudah terisi dari `render.yaml`.
5. Deploy → buka URL `*.onrender.com` → Register → Login → uji Peminjaman/Pengembalian/Riwayat.

## Catatan
- Lihat `docs/security-checklist.md` untuk rincian audit dan pemetaan tiap kerentanan ke perbaikannya.