var banners = ["../img/destaque-home.png", "../img/destaque-home-2.png"];
var bannerAtual = 0;

function trocaBanner() {
  bannerAtual = (bannerAtual + 1) % 2;
  document.querySelector(".banner-destaque img").src = banners[bannerAtual];
} 

var timer = setInterval(trocaBanner, 4000);
var controle = document.querySelector(".pause");

controle.onclick = function () {
  if (controle.className == "pause") {
    clearInterval(timer);
    controle.className = "play";
  } else {
    timer = setInterval(trocaBanner, 4000);
    controle.className = "pause";
  }
  return false;
};
