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

// Menambahkan tombol ukuran heading

document.getElementById('headingSize').addEventListener('change', function() {
  var selection = window.getSelection();
  if (selection.rangeCount > 0) {
    var range = selection.getRangeAt(0);
    var container = range.commonAncestorContainer;

    // Check if the selection is within an editable area
    while (container && container.nodeType === Node.ELEMENT_NODE && !container.isContentEditable) {
      container = container.parentNode;
    }

    if (container && container.isContentEditable) {
      var headingTag = this.value;
      if (headingTag !== '') {
        var heading = document.createElement(headingTag);
        heading.textContent = 'Judul ' + headingTag.toUpperCase(); // Contoh teks untuk heading
        heading.style.fontWeight = 'bold'; // Membuat teks cetak tebal
        switch (headingTag) {
          case 'h1':
            heading.style.fontSize = '2em';
            break;
          case 'h2':
            heading.style.fontSize = '1.5em';
            break;
          case 'h3':
            heading.style.fontSize = '1.2em';
            break;
          case 'h4':
            heading.style.fontSize = '1em';
            break;
        }
        range.deleteContents(); // Remove the current selection content
        range.insertNode(heading);
      } else {
        // Jika dipilih "None", hilangkan efek heading
        document.execCommand('formatBlock', false, 'div');
      }
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const contentEditable = document.getElementById('contentEditable');
  const listBtn = document.getElementById('listBtn');
  let listActive = false;

  listBtn.addEventListener('click', function() {
    listActive = !listActive;
    toggleList();
    updateButtonStyle();
  });

  contentEditable.addEventListener('keydown', function(event) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const selectedNode = selection.focusNode;

    // Jika tombol Enter ditekan saat list aktif
    if (event.key === 'Enter' && listActive) {
      event.preventDefault();
      const listElement = document.createElement('ul');
      const listItem = document.createElement('li');
      listItem.textContent = '\u2022 '; // Tanda dot unicode
      listElement.appendChild(listItem);
      range.insertNode(listElement);
      placeCaretAtEnd(listItem);
    } else if (event.key === 'Enter' && selectedNode && selectedNode.nodeName === 'LI') {
      // Jika tombol Enter ditekan di dalam elemen <li>, membuat elemen <li> baru setelahnya
      event.preventDefault();
      const newListItem = document.createElement('li');
      range.setStartAfter(selectedNode);
      range.insertNode(newListItem);
      placeCaretAtEnd(newListItem);
    }
  });

  function toggleList() {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const selectedNode = selection.focusNode;

    // Jika list aktif, tambahkan elemen list dengan dot
    if (listActive) {
      const listElement = document.createElement('ul');
      const listItem = document.createElement('li');
      listItem.textContent = '\u2022 '; // Tanda dot unicode
      listElement.appendChild(listItem);

      // Masukkan elemen list ke dalam range saat ini
      range.deleteContents();
      range.insertNode(listElement);
      placeCaretAtEnd(listItem);
    } else {
      // Jika list tidak aktif, hapus elemen list yang ada jika fokus pada elemen list
      if (selectedNode && selectedNode.nodeName === 'LI') {
        const parentNode = selectedNode.parentNode;
        parentNode.removeChild(selectedNode);
        placeCaretAtEnd(parentNode); // Pindahkan kursor ke akhir parent node
      }
    }
  }

  function updateButtonStyle() {
    if (listActive) {
      listBtn.classList.add('bg-gray-700', 'text-white');
    } else {
      listBtn.classList.remove('bg-gray-700', 'text-white');
    }
  }

  function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != 'undefined' &&
        typeof document.createRange != 'undefined') {
      var range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (typeof document.body.createTextRange != 'undefined') {
      var textRange = document.body.createTextRange();
      textRange.moveToElementText(el);
      textRange.collapse(false);
      textRange.select();
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const addProductButton = document.getElementById("addProductButton");
  const productsContainer = document.getElementById("productsContainer");
  const productFormTemplate = document.querySelector(
    ".product-form-template .product-item"
  );

  addProductButton.addEventListener("click", function () {
    const newProductForm = productFormTemplate.cloneNode(true);
    newProductForm.classList.remove("hidden");
    productsContainer.appendChild(newProductForm);

    // Add event listener for remove button
    newProductForm
      .querySelector(".remove-product")
      .addEventListener("click", function () {
        newProductForm.remove();
      });
  });
});


