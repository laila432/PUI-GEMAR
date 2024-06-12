// Toggle sidebar
document
.getElementById("menu-button")
.addEventListener("click", function () {
  var sidebar = document.getElementById("sidebar");
  var mainContent = document.getElementById("main-content");

  sidebar.classList.toggle("-translate-x-full");

  // Tambahkan atau hilangkan margin pada main content sesuai dengan keadaan sidebar
  if (sidebar.classList.contains("-translate-x-full")) {
    mainContent.classList.remove("ml-64");
  } else {
    mainContent.classList.add("ml-64");
  }
});

// Toggle submenu profil
document.getElementById("profilSubMenuToggle").onclick = function () {
var submenu = document.getElementById("profilSubMenu");
var otherSubmenus = document.querySelectorAll(
  "[id$='SubMenu']:not(#profilSubMenu)"
);

// Sembunyikan submenu lainnya
otherSubmenus.forEach(function (item) {
  item.classList.add("hidden");
});

submenu.classList.toggle("hidden");
};

// Toggle submenu sumberdaya
document.getElementById("sumberdayaSubMenuToggle").onclick = function () {
var submenu = document.getElementById("sumberdayaSubMenu");
var otherSubmenus = document.querySelectorAll(
  "[id$='SubMenu']:not(#sumberdayaSubMenu)"
);

// Sembunyikan submenu lainnya
otherSubmenus.forEach(function (item) {
  item.classList.add("hidden");
});

submenu.classList.toggle("hidden");
};

// Toggle submenu kontak
document.getElementById("kontakSubMenuToggle").onclick = function () {
var submenu = document.getElementById("kontakSubMenu");
var otherSubmenus = document.querySelectorAll(
  "[id$='SubMenu']:not(#kontakSubMenu)"
);

// Sembunyikan submenu lainnya
otherSubmenus.forEach(function (item) {
  item.classList.add("hidden");
});

submenu.classList.toggle("hidden");
};

// Toggle profile menu
document.getElementById("profile-menu-button").onclick = function (
event
) {
var menu = document.getElementById("profile-menu");
var otherSubmenus = document.querySelectorAll(
  "[id$='SubMenu']:not(#profile-menu)"
);

// Sembunyikan submenu lainnya
otherSubmenus.forEach(function (item) {
  item.classList.add("hidden");
});

menu.classList.toggle("hidden");
event.stopPropagation(); // Mencegah event berbubungan dengan event klik window
};

// Tutup menu profil jika di-klik di luar area menu
window.onclick = function (event) {
var menu = document.getElementById("profile-menu");
if (
  !event.target.closest("#profile-menu") &&
  !event.target.closest("#profile-menu-button")
) {
  if (!menu.classList.contains("hidden")) {
    menu.classList.add("hidden");
  }
}
};

document.addEventListener('DOMContentLoaded', function() {
  const boldBtn = document.getElementById('boldBtn');
  const italicBtn = document.getElementById('italicBtn');
  const imageBtn = document.getElementById('imageBtn');
  const headingBtn = document.getElementById('headingBtn');

  // Mengaktifkan dan menonaktifkan fungsi bold
  boldBtn.addEventListener('click', function() {
    document.execCommand('bold');
    updateToolbarButton(boldBtn, 'bold'); // Perbarui status tombol bold
  });

  // Mengaktifkan dan menonaktifkan fungsi italic
  italicBtn.addEventListener('click', function() {
    document.execCommand('italic');
    updateToolbarButton(italicBtn, 'italic'); // Perbarui status tombol italic
  });

  // Memilih gambar dari komputer
  imageBtn.addEventListener('click', function() {
    document.getElementById('fileInput').click();
  });

   });

// Fungsi untuk menandai tombol toolbar yang aktif berdasarkan status formatting saat ini
function updateToolbarButton(button, command) {
  var isActive = document.queryCommandState(command);
  if (isActive) {
    button.classList.add('bg-blue-500', 'text-white'); // Aktifkan tombol
  } else {
    button.classList.remove('bg-blue-500', 'text-white'); // Nonaktifkan tombol
  }
}

// Fungsi untuk memilih gambar dari komputer dan memasukkannya ke konten sejarah
function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const imageData = e.target.result;
    const img = `<img src="${imageData}" alt="Uploaded Image" class="mx-auto my-4 max-w-full">`;
    document.execCommand('insertHTML', false, img);
  };
  reader.readAsDataURL(file);
}



