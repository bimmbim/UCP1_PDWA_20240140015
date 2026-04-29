function renderTabel() {
  var tbody = document.getElementById("tabel-body");
  if (!tbody) return;

  var anggota = JSON.parse(localStorage.getItem("anggotaTechCommunity")) || [];

  var newMember = sessionStorage.getItem("newMember");
  if (newMember) {
    var m = JSON.parse(newMember);
    sessionStorage.removeItem("newMember");
    var notif = document.getElementById("notif");
    if (notif) {
      notif.innerHTML =
        "✅ Anggota baru <strong>" + m.nama + "</strong> berhasil ditambahkan!";
      notif.style.display = "block";
    }
  }

  if (anggota.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="4" style="text-align:center; color:#444; padding:26px;">Belum ada anggota terdaftar.</td></tr>';
    return;
  }

  tbody.innerHTML = "";
  for (var i = 0; i < anggota.length; i++) {
    tbody.innerHTML +=
      "<tr>" +
      '<td style="color:#555;">' +
      (i + 1) +
      "</td>" +
      '<td style="color:#fff;">' +
      anggota[i].nama +
      "</td>" +
      '<td style="color:#777;">' +
      anggota[i].email +
      "</td>" +
      "<td>" +
      anggota[i].minat +
      "</td>" +
      "</tr>";
  }
}

function submitForm() {
  var nama = document.getElementById("nama").value.trim();
  var email = document.getElementById("email").value.trim();
  var minat = document.getElementById("minat").value;

  if (nama === "") {
    alert("Nama tidak boleh kosong!");
    return;
  }
  if (email === "" || !email.includes("@")) {
    alert("Email tidak valid!");
    return;
  }
  if (minat === "") {
    alert("Pilih bidang minat dulu!");
    return;
  }

  var data = { nama: nama, email: email, minat: minat };

  var anggota = JSON.parse(localStorage.getItem("anggotaTechCommunity")) || [];
  anggota.push(data);
  localStorage.setItem("anggotaTechCommunity", JSON.stringify(anggota));

  sessionStorage.setItem("newMember", JSON.stringify(data));

  alert("Pendaftaran berhasil! Selamat datang, " + nama + "!");

  document.getElementById("nama").value = "";
  document.getElementById("email").value = "";
  document.getElementById("minat").value = "";
}

var gambarList = [
  {
    url: "img1.png",
  },
  {
    url: "img2.jpg",
  },
];

var currentIdx = 0;

function gantiGambar(idx, btn) {
  currentIdx = idx;
  var img = document.getElementById("gambar-utama");
  if (!img) return;
  img.style.opacity = "0";
  setTimeout(function () {
    img.src = gambarList[idx].url;
    img.style.opacity = "1";
  }, 200);
  document.querySelectorAll(".btn-img").forEach(function (b) {
    b.classList.remove("active");
  });
  btn.classList.add("active");
}

function putarAudio() {
  var audio = document.getElementById("audio-ku");
  if (!audio) return;
  audio.play();
  document.getElementById("status-audio").textContent =
    "Status: sedang diputar...";
}

function jedaAudio() {
  var audio = document.getElementById("audio-ku");
  if (!audio) return;
  audio.pause();
  document.getElementById("status-audio").textContent = "Status: dijeda";
}

function stopAudio() {
  var audio = document.getElementById("audio-ku");
  if (!audio) return;
  audio.pause();
  audio.currentTime = 0;
  document.getElementById("status-audio").textContent = "Status: dihentikan";
}

window.onload = function () {
  renderTabel();

  var audio = document.getElementById("audio-ku");
  if (audio) {
    audio.addEventListener("ended", function () {
      document.getElementById("status-audio").textContent = "Status: selesai";
    });
  }
};
