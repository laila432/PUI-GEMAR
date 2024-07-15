
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
  
  //komen
  document.addEventListener("DOMContentLoaded", function () {
    const commentButtons = document.querySelectorAll(".commentBtn");
    const commentModal = document.getElementById("commentModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const addCommentBtn = document.getElementById("addCommentBtn");
    const commentSection = document.getElementById("commentSection");
    let currentArticleId = null;
  
    const comments = {
      1: [],
      2: [],
      3: []
    };
  
    commentButtons.forEach(button => {
      button.addEventListener("click", function () {
        currentArticleId = this.getAttribute("data-article-id");
        displayComments(currentArticleId);
        commentModal.classList.remove("hidden");
  
        // Scroll modal ke atas sampai komentar pertama terlihat
        commentModal.scrollTop = 0;
      });
    });
  
    closeModalBtn.addEventListener("click", function () {
      commentModal.classList.add("hidden");
    });
  
    addCommentBtn.addEventListener("click", function () {
      const nama = document.getElementById("nama").value;
      const newComment = document.getElementById("newComment").value;
  
      if (nama && newComment) {
        comments[currentArticleId].push({
          id: generateId(),
          nama: nama,
          comment: newComment,
          replies: []
        });
        displayComments(currentArticleId);
        document.getElementById("nama").value = "";
        document.getElementById("newComment").value = "";
      }
    });
  
    function displayComments(articleId) {
        commentSection.innerHTML = "";
        comments[articleId].forEach(comment => {
          const commentHTML = createCommentHTML(comment);
          commentSection.innerHTML += commentHTML;
        });
      
        // Update jumlah komentar di tombol komentar
        const commentCountSpan = document.querySelector(
          `.commentCount[data-article-id="${articleId}"]`
        );
        if (commentCountSpan) {
          const totalComments = countTotalComments(comments[articleId]);
          commentCountSpan.textContent = totalComments;
        }
      
        addReplyEventListeners();
      
        // Scroll modal ke atas sampai komentar pertama terlihat
        document.getElementById('commentModal').scrollTop = 0
      }
    function createCommentHTML(comment) {
      return `
        <div class="p-2 border-b border-gray-300" data-comment-id="${comment.id}">
          <strong>${comment.nama}:</strong>
          <p>${comment.comment}</p>
          <button class="replyBtn text-blue-400 hover:underline" data-comment-id="${comment.id}">Balas</button>
          <div class="replies ml-4 mt-2">
            ${renderReplies(comment.replies)}
          </div>
          <div class="replyForm hidden mt-2">
            <label class="block text-sm font-medium text-gray-700">Nama:</label>
            <input type="nama" class="replyNama w-full p-2 border border-gray-300 rounded mb-2">
            <label class="block text-sm font-medium text-gray-700">Balasan:</label>
            <textarea class="replyText w-full p-2 border border-gray-300 rounded mb-2"></textarea>
            <button class="submitReplyBtn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400">Tambah Balasan</button>
          </div>
        </div>
      `;
    }
  
    function renderReplies(replies) {
      return replies.map(reply => createCommentHTML(reply)).join("");
    }
  
    function addReplyEventListeners() {
      const replyButtons = document.querySelectorAll(".replyBtn");
      replyButtons.forEach(button => {
        button.addEventListener("click", function () {
          const parentCommentId = this.getAttribute("data-comment-id");
          const parentComment = document.querySelector(`[data-comment-id="${parentCommentId}"]`);
          const replyForm = parentComment.querySelector(".replyForm");
          replyForm.classList.toggle("hidden");
  
          const submitReplyBtn = replyForm.querySelector(".submitReplyBtn");
          submitReplyBtn.addEventListener("click", function () {
            const replyNama = replyForm.querySelector(".replyNama").value;
            const replyText = replyForm.querySelector(".replyText").value;
  
            if (replyNama && replyText) {
              addReply(parentCommentId, replyNama, replyText);
              displayComments(currentArticleId);
            }
          });
        });
      });
    }
  
    function addReply(parentCommentId, nama, replyText) {
      const articleComments = comments[currentArticleId];
      const comment = findCommentById(articleComments, parentCommentId);
      if (comment) {
        comment.replies.push({
          id: generateId(),
          nama: nama,
          comment: replyText,
          replies: []
        });
      }
    }
  
    function findCommentById(comments, id) {
      for (let comment of comments) {
        if (comment.id === id) {
          return comment;
        }
        const reply = findCommentById(comment.replies, id);
        if (reply) {
          return reply;
        }
      }
      return null;
    }
  
    function generateId() {
      return Math.random().toString(36).substr(2, 9);
    }
  
    function countTotalComments(comments) {
      let total = comments.length;
      comments.forEach(comment => {
        total += countTotalComments(comment.replies);
      });
      return total;
    }
    
  });
  //komen detailartikel
  document.addEventListener("DOMContentLoaded", function () {
    const addCommentBtn = document.getElementById("addCommentBtn");
    const commentSection = document.getElementById("commentSection");
    let comments = [];
  
    addCommentBtn.addEventListener("click", function (event) {
      event.preventDefault();
  
      const namaInput = document.getElementById("nama").value.trim();
      const commentInput = document.getElementById("newComment").value.trim();
  
      if (namaInput === "" || commentInput === "") {
        alert("Nama dan komentar harus diisi.");
        return;
      }
  
      const newComment = {
        id: generateId(),
        nama: namaInput,
        comment: commentInput,
        replies: []
      };
  
      comments.push(newComment);
      displayComments();
      document.getElementById("nama").value = "";
      document.getElementById("newComment").value = "";
    });
  
    function displayComments() {
      commentSection.innerHTML = "";
      comments.forEach(comment => {
        const commentHTML = createCommentHTML(comment);
        commentSection.appendChild(commentHTML);
      });
    }
  
    function createCommentHTML(comment) {
      const commentElement = document.createElement("div");
      commentElement.classList.add("bg-gray-200", "rounded-lg", "p-3", "mb-2");
  
      const namaParagraph = document.createElement("p");
      namaParagraph.classList.add("text-sm", "font-medium", "text-gray-700");
      namaParagraph.textContent = comment.nama;
      commentElement.appendChild(namaParagraph);
  
      const commentParagraph = document.createElement("p");
      commentParagraph.classList.add("text-sm", "text-gray-800");
      commentParagraph.textContent = comment.comment;
      commentElement.appendChild(commentParagraph);
  
      const replyBtn = document.createElement("button");
      replyBtn.classList.add("replyBtn", "text-sm", "text-indigo-600", "hover:underline");
      replyBtn.textContent = "Balas";
      commentElement.appendChild(replyBtn);
  
      const replyForm = document.createElement("div");
      replyForm.classList.add("replyForm", "hidden", "mt-2");
  
      const nameLabel = document.createElement("label");
      nameLabel.classList.add("block", "text-sm", "font-medium", "text-gray-700");
      nameLabel.textContent = "Nama:";
      replyForm.appendChild(nameLabel);
  
      const replyNameInput = document.createElement("input");
      replyNameInput.classList.add("replyNama", "w-full", "p-2", "border", "border-gray-300", "rounded", "mb-2");
      replyNameInput.setAttribute("type", "text");
      replyForm.appendChild(replyNameInput);
  
      const commentLabel = document.createElement("label");
      commentLabel.classList.add("block", "text-sm", "font-medium", "text-gray-700");
      commentLabel.textContent = "Balasan:";
      replyForm.appendChild(commentLabel);
  
      const replyTextInput = document.createElement("textarea");
      replyTextInput.classList.add("replyText", "w-full", "p-2", "border", "border-gray-300", "rounded", "mb-2");
      replyForm.appendChild(replyTextInput);
  
      const submitReplyBtn = document.createElement("button");
      submitReplyBtn.classList.add("bg-indigo-800", "text-white", "px-4", "py-2", "rounded", "hover:bg-indigo-500", "reply-submit-btn");
      submitReplyBtn.textContent = "Kirim Balasan";
      replyForm.appendChild(submitReplyBtn);
  
      commentElement.appendChild(replyForm);
  
      const repliesContainer = document.createElement("div");
      repliesContainer.classList.add("replies-container");
      comment.replies.forEach(reply => {
        const replyHTML = createCommentHTML(reply);
        repliesContainer.appendChild(replyHTML);
      });
      commentElement.appendChild(repliesContainer);
  
      replyBtn.addEventListener("click", function () {
        replyForm.classList.toggle("hidden");
      });
  
      submitReplyBtn.addEventListener("click", function () {
        const replyName = replyNameInput.value.trim();
        const replyText = replyTextInput.value.trim();
  
        
  
        const newReply = {
          nama: replyName,
          comment: replyText,
          replies: []
        };
  
        comment.replies.push(newReply);
        displayComments();
        replyNameInput.value = "";
        replyTextInput.value = "";
      });
  
      return commentElement;
    }
  
    function generateId() {
      return Math.random().toString(36).substr(2, 9);
    }
  });
  
