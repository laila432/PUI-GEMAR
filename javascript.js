
document.addEventListener('DOMContentLoaded', function() {
  // Ambil semua elemen menu dan submenu
  const menuItems = document.querySelectorAll('.relative');

  // Loop melalui setiap elemen menu
  menuItems.forEach(menuItem => {
      const menuButton = menuItem.querySelector('button');
      const submenu = menuItem.querySelector('.submenu');
      let timeoutId;

      // Tambahkan event listener untuk menampilkan submenu saat tombol menu dihover
      menuButton.addEventListener('mouseenter', function() {
          // Sembunyikan semua submenu terlebih dahulu
          hideAllSubmenus();
          // Tampilkan submenu yang sesuai
          submenu.classList.remove('hidden');
      });

      // Tambahkan event listener untuk menyembunyikan submenu saat kursor meninggalkan area menu
      menuItem.addEventListener('mouseleave', function() {
          // Tetapkan penundaan sebelum menyembunyikan submenu
          timeoutId = setTimeout(function() {
              // Sembunyikan submenu setelah penundaan
              submenu.classList.add('hidden');
          }, 300); // Ubah angka ini untuk menyesuaikan dengan kebutuhan Anda
      });

      // Batalkan penundaan jika kursor kembali ke menu sebelum submenu disembunyikan
      submenu.addEventListener('mouseenter', function() {
          clearTimeout(timeoutId);
      });
  });

  // Fungsi untuk menyembunyikan semua submenu
  function hideAllSubmenus() {
      const allSubmenus = document.querySelectorAll('.submenu');
      allSubmenus.forEach(submenu => {
          submenu.classList.add('hidden');
      });
  }
});
document.addEventListener('DOMContentLoaded', function() {
  const searchButton = document.getElementById('searchButton');
  const searchBox = document.getElementById('searchBox');
  let searchTimeout;

  searchButton.addEventListener('mouseenter', function() {
      clearTimeout(searchTimeout);
      searchBox.classList.remove('hidden');
  });

  searchButton.addEventListener('mouseleave', function() {
      // Jeda sebelum menyembunyikan kotak penelusuran
      searchTimeout = setTimeout(function() {
          searchBox.classList.add('hidden');
      }, 500); // Ubah angka ini sesuai dengan kebutuhan Anda
  });

  searchBox.addEventListener('mouseenter', function() {
      clearTimeout(searchTimeout);
  });

  searchBox.addEventListener('mouseleave', function() {
      searchBox.classList.add('hidden');
  });
});

// Ambil semua elemen menu
const menuItems = document.querySelectorAll('.menu-item');

// Tambahkan event listener untuk setiap menu item
menuItems.forEach(item => {
    item.addEventListener('click', function() {
        // Hapus kelas 'selected' dari semua menu item
        menuItems.forEach(menuItem => {
            menuItem.classList.remove('selected');
        });

        // Tambahkan kelas 'selected' ke menu item yang dipilih
        this.classList.add('selected');
    });
});


// dokumentasi
document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    let currentSlide = 0;
  
    function showSlide(n) {
      slides.forEach((slide) => slide.classList.add("hidden"));
      dots.forEach((dot) => dot.classList.remove("bg-indigo-600"));
      slides[n].classList.remove("hidden");
      dots[n].classList.add("bg-indigo-600");
      currentSlide = n;
    }
  
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
      setActiveDot(currentSlide);
    }
  
    setInterval(nextSlide, 4000); // Ganti slide setiap 20 detik
  
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index);
        setActiveDot(index);
      });
    });
  
    function setActiveDot(index) {
      dots.forEach((dot) => dot.classList.remove("bg-indigo-600"));
      dots[index].classList.add("bg-indigo-600");
    }
  
    showSlide(0); // Tampilkan slide pertama saat halaman dimuat
  });
  
  
  
// Inisialisasi peta dengan koordinat tengah dan zoom level
var map = L.map('map').setView([-2.0538389230438985, 102.27511784386269], 13);

// Tambahkan peta OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Koordinat lokasi sumber daya (contoh)
var resourceLocations = [
    { name: "Sumber Daya 1", location: [-2.158824686124802, 102.22430608064482] }, // Contoh lokasi 1
    { name: "Sumber Daya 2", location: [-2.1430429670623576, 102.13160894504466] }  // Contoh lokasi 2
];

// Tambahkan marker untuk setiap lokasi sumber daya
resourceLocations.forEach(function(resource) {
    L.marker(resource.location).addTo(map)
        .bindPopup(`<b>${resource.name}</b><br>Lokasi Sumber Daya`);
});


// tailwind.config.js

module.exports = {
    theme: {
      extend: {
        fontFamily: {
          roboto: ['Roboto', 'sans-serif'],
        },
      },
    },
  };
  
    