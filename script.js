const projeVerileri = [
  {
    isim: "Araç Kiralama Web Sitesi",
    kategori: "web",
    gorsel: "images/proje1.svg",
    aciklama: "HTML, CSS ve JavaScript kullanılarak geliştirilen araç kiralama arayüzü tasarımı."
  },
  {
    isim: "Mobil Görev Takip Uygulaması",
    kategori: "mobil",
    gorsel: "images/proje2.svg",
    aciklama: "Günlük görev planlama ve listeleme mantığına sahip kullanıcı dostu mobil arayüz projesi."
  },
  {
    isim: "E-Ticaret Arayüz Tasarımı",
    kategori: "web",
    gorsel: "images/proje3.svg",
    aciklama: "Ürün kartları, kategori alanları ve modern görünüm içeren örnek alışveriş sitesi tasarımı."
  },
  {
    isim: "Öğrenci Not Takip Uygulaması",
    kategori: "mobil",
    gorsel: "images/proje4.svg",
    aciklama: "Sınav notlarını kayıt altında tutmayı sağlayan, basit ve kullanışlı mobil proje çalışması."
  },
  {
    isim: "Kişisel Blog Sayfası",
    kategori: "web",
    gorsel: "images/proje5.svg",
    aciklama: "Kişisel yazıları ve içerikleri modern kart yapısıyla sergileyen blog temalı web sitesi."
  }
];

const projeListesiAlani = document.getElementById("projeListesi");
const filtreDugmeleri = document.querySelectorAll(".filtre-dugmesi");
const temaButonu = document.getElementById("temaButonu");
const daktiloYazisiAlani = document.getElementById("daktiloYazisi");
const ozelImlec = document.querySelector(".ozel-imlec");
const yetenekCubuklari = document.querySelectorAll(".bar-ic");

function projeKartlariniBas(projeler) {
  projeListesiAlani.innerHTML = "";

  projeler.forEach(function (proje) {
    projeListesiAlani.innerHTML += `
      <article class="proje-karti">
        <img src="${proje.gorsel}" alt="${proje.isim} görseli">
        <div class="proje-icerik">
          <span class="proje-kategori">${proje.kategori.toUpperCase()}</span>
          <h3>${proje.isim}</h3>
          <p>${proje.aciklama}</p>
        </div>
      </article>
    `;
  });
}

projeKartlariniBas(projeVerileri);

filtreDugmeleri.forEach(function (dugme) {
  dugme.addEventListener("click", function () {
    const secilenKategori = this.dataset.kategori;

    filtreDugmeleri.forEach(function (buton) {
      buton.classList.remove("aktif");
    });

    this.classList.add("aktif");

    if (secilenKategori === "hepsi") {
      projeKartlariniBas(projeVerileri);
    } else {
      const filtrelenmisProjeler = projeVerileri.filter(function (proje) {
        return proje.kategori === secilenKategori;
      });
      projeKartlariniBas(filtrelenmisProjeler);
    }
  });
});

temaButonu.addEventListener("click", function () {
  document.body.classList.toggle("koyu-mod");

  if (document.body.classList.contains("koyu-mod")) {
    temaButonu.textContent = "☀️ Tema Değiştir";
  } else {
    temaButonu.textContent = "🌙 Tema Değiştir";
  }
});

const tanitimMetni = "Portfolyoma Hoş Geldiniz";
let harfSirasi = 0;

function daktiloEfektiBaslat() {
  if (harfSirasi < tanitimMetni.length) {
    daktiloYazisiAlani.textContent += tanitimMetni.charAt(harfSirasi);
    harfSirasi += 1;
    setTimeout(daktiloEfektiBaslat, 90);
  }
}

daktiloEfektiBaslat();

function imlecKonumunuGuncelle(olay) {
  if (!ozelImlec) return;
  ozelImlec.style.left = olay.clientX + "px";
  ozelImlec.style.top = olay.clientY + "px";
}

document.addEventListener("mousemove", imlecKonumunuGuncelle);

document.querySelectorAll("a, button, .proje-karti").forEach(function (oge) {
  oge.addEventListener("mouseenter", function () {
    if (ozelImlec) {
      ozelImlec.classList.add("buyuk");
    }
  });

  oge.addEventListener("mouseleave", function () {
    if (ozelImlec) {
      ozelImlec.classList.remove("buyuk");
    }
  });
});

function yetenekleriCanlandir() {
  yetenekCubuklari.forEach(function (cubuk) {
    const hedefGenislik = cubuk.dataset.genislik;
    cubuk.style.width = hedefGenislik + "%";
  });
}

const yetenekGozlemcisi = new IntersectionObserver(
  function (girdiler) {
    girdiler.forEach(function (girdi) {
      if (girdi.isIntersecting) {
        yetenekleriCanlandir();
        yetenekGozlemcisi.disconnect();
      }
    });
  },
  { threshold: 0.3 }
);

const egitimBolumu = document.getElementById("egitim");
if (egitimBolumu) {
  yetenekGozlemcisi.observe(egitimBolumu);
}
