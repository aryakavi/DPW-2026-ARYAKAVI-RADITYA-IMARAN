|  | Algoritma dan Struktur Data |
|--|--|
| NIM |  254107020087|
| Nama |  Aryakavi Raditya Imaran |
| Kelas | TI - 2F |
| Repository | ([https://github.com/aryakavi/DPW-2026-ARYAKAVI-RADITYA-IMARAN]) |

---

# Dokumentasi Jobsheet 1: SIMPUS-Mini & Dasar Pemrograman Web 📚

## 1. Deskripsi Jobsheet 1 (SIMPUS-Mini)
Jobsheet 1 bertujuan untuk membuat kerangka awal aplikasi **SIMPUS-Mini**, sistem perpustakaan mini yang mengelola data buku dan anggota. inti utama dari sistem ini antara lain :
*   **Pembuatan antarmuka statis**: Aplikasi belum bisa menyimpan data sungguhan; semua data dalam tabel adalah data *dummy* (contoh) yang ditulis manual langsung di HTML.
*   **Struktur halaman**: Membangun halaman web menggunakan HTML5 *semantic tags* agar struktur lebih terorganisir dan memiliki makna (tidak sekadar `<div>` polos di semua tempat).
*   **Penggunaan Form & Penamaan Atribut**: Pemberian nama atribut `id` dan `name` pada form yang secara khusus dipersiapkan untuk tahap pemrosesan data (backend) dan *styling* (CSS) di jobsheet selanjutnya.

Berdasarkan isi dari project, sistem terbagi ke dalam beberapa file:
*   `index.html` sebagai halaman utama.
*   Folder `buku/` yang berisi `list.html` (menampilkan daftar statis buku) dan `tambah.html` (form untuk menambahkan data buku).
*   Folder `anggota/` berisi `list.html` (menampilkan daftar anggota statis) dan `tambah.html` (form untuk data anggota).

---

# Jawaban Latihan Reflektif 6.5 - SIMPUS-Mini


## 1. Kenapa field "Alamat" dan "No. HP" tidak diberi `required`, sedangkan "Nama" dan "No. Anggota" diberi?
**Jawaban:**
Atribut `required` di HTML berfungsi untuk memastikan bahwa column input wajib diisi oleh user sebelum form diizinkan untuk dikirim.
*   **"Nama" dan "No. Anggota"** diberi atribut `required` karena keduanya adalah data inti (identitas utama atau penting). Sebuah sistem perpustakaan tidak mungkin  mencatat peminjaman jika nama atau nomor identitas anggotanya kosong.
*   Sebaliknya, **"Alamat" dan "No. HP"** tidak diberi atribut `required` karena berupa data opsional. Jika anggota belum memiliki atau tidak ingin membagikan kontak/alamatnya, mereka tetap bisa daftar.

## 2. Apa yang akan terjadi (di browser) kalau kamu klik tombol "Simpan" tanpa mengisi field "Nama"?
**Jawaban:**
Jika field "Nama" dibiarkan kosong lalu tombol "Simpan" diklik, browser akan langsung memberhentikan proses submit form. Sebagai gantinya, browser akan memunculkan pesan peringatan bawaan HTML5 (misalnya: *"Please fill out this field"* atau *"Harap isi bidang ini"*) yang menunjuk langsung ke kotak input "Nama". Form baru bisa dilanjut prosesnya setelah field diisi.

## 3. Form ini juga belum punya `action` pada tag `<form>`-nya — apa dampaknya saat tombol "Simpan" ditekan?
**Jawaban:**
Atribut `action` berfungsi untuk menjelaskan ke file atau URL mana data form tersebut akan dikirim untuk diproses (biasanya ke file backend seperti PHP atau server Node.js). 

Karena tag hanya ditulis `<form>`, browser akan menggunakan sifat bawaanya, yaitu mengirim data ke **halaman itu sendiri**. Sehingga saat tombol "Simpan" diklik:
1. Halaman web akan melakukan *refresh*  dengan cepat.
2. Data tidak tersimpan di dalam sistem karena belum ada logika backend atau database yang dihubungkan.
3. Karena HTML form menggunakan metode `GET` secara default (jika atribut `method` tidak diatur ke `POST`), form yang baru saja diketik akan berpindah ke URL di atas browser 