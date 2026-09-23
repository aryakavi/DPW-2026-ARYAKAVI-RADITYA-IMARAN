|  | Algoritma dan Struktur Data |
|--|--|
| NIM |  254107020087|
| Nama |  Aryakavi Raditya Imaran |
| Kelas | TI - 2F |
| Repository | ([https://github.com/aryakavi/DPW-2026-ARYAKAVI-RADITYA-IMARAN]) |

---

#6. Rangkuman & Latihan Lanjutan

6.4 Ide Latihan Tambahan (Opsional)
1. Tambah breakpoint baru — misalnya @media (min-width: 1400px) untuk layar monitor sangat lebar, ubah main { max-width: 1000px; } (dari dokumentasi jobsheet-02) menjadi lebih lebar khusus di breakpoint ini.
   
Menambahkan line baru di dalam CSS berupa menambahkan max width dari 1000px menjadi 1250px.
```CSS
/* Monitor Sangat Lebar */
@media (min-width: 1400px) {
    main {
        max-width: 1250px; /* Nilai ini bisa disesuaikan dengan kebutuhan desain */
    }
}
```

2. Ubah breakpoint tablet dari 768px menjadi 900px, lalu amati di lebar layar berapa susunan kartu berubah — buktikan bahwa breakpoint memang bisa disesuaikan bebas sesuai kebutuhan desain.
Setelah saya mengubah breakpoint dari 768 ke 900px, perubahannya terlihat dari
![foto1](../img/Simpus1.png)

menjadi
![foto1](../img/Simpus2.png) 

3. Terapkan pola table-responsive ke elemen lain yang berpotensi melebar di layar sempit, misalnya kalau suatu saat kamu menambahkan blok kode <pre> yang panjang di salah satu halaman.

Elemen yang memanjang seperti <pre> bisa merusal layout di layar HP, maka bisa menerapkan responsive table. Maka saya menambahkan kode
```CSS
.code-responsive, 
pre {
    overflow-x: auto;
    max-width: 100%;
    white-space: pre;
}
```

4. Ubah posisi ikon hamburger — misalnya pindahkan .nav-toggle-label ke urutan terakhir di <header> (setelah <nav>) lalu amati apakah sibling combinator .nav-toggle:checked ~ nav di bab 3 §3.5 masih bekerja — ingat catatan bahwa combinator ~ mensyaratkan target berada setelah elemen sumbernya di HTML.

Jika saya bereksperimen dan merubah posisi kode untuk nav-toggle-label dan ditaruh setelah <nav> maka burger menu akan hilang. Jika saya merubah posisi input saja tanpa merubah label, maka hamburger akan tetap ada namun tidak dapat digunakan.
Sebelum :
![foto3](../img/Simplus3.png)

Sesudah :
![foto4](../img/Simplus4.png)

5. Bandingkan dengan pendekatan mobile-first — coba tulis ulang style.css dari nol memakai @media (min-width: ...) alih-alih max-width, dan rasakan sendiri bedanya alur berpikirnya.

Saat ini desain menggunakan prioritas Desktop-first, dengan layar default di layar besar dahulu lalu menggunakan @media (max-width:..) untuk layar yang lebi kecil. Perbedaanya :
- Alur Desktop First : Membuat grid berjejer 4 kolom dan menjadikannya default, dan jika layarnya dibawah 768px berubah menjadi 2 kolom, jika mengecil dibawah 480px berubah menjadi 1 kolom.
- Alur Mobile First : Membuat desain HP dengan 1 kolom secara default, jika layarnya diatas 480px berubah menjadi 2 kolom, dan jika layar diatas 900px berubah menjadi 4 kolom

Apabila mobile first maka kode berubah menjadi :
```CSS
/* 1. Style dasar buat Mobile - Tidak perlu di dalam blok @media */
main section:nth-of-type(2) {
    display: grid;
    grid-template-columns: 1fr; /* Default 1 kolom */
    gap: 1rem;
}

/* 2. Tablet */
@media (min-width: 480px) {
    main section:nth-of-type(2) {
        grid-template-columns: repeat(2, 1fr); /* 2 kolom di tablet */
    }
}

/* 3. Desktop */
@media (min-width: 900px) {
    main section:nth-of-type(2) {
        grid-template-columns: repeat(4, 1fr); /* 4 kolom di layar besar */
    }
}
```