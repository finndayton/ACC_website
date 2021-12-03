AOS.init();
var hamburger = document.querySelector(".hamburger");
var sidebar = document.getElementById("sidebar");
var overlay = document.getElementById("overlay");
hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("is-active");
  sidebar.classList.toggle("is-active");
  overlay.classList.toggle("is-active");
});
overlay.addEventListener("click", function () {
  hamburger.classList.toggle("is-active");
  sidebar.classList.toggle("is-active");
  overlay.classList.toggle("is-active");
});

var items = document.getElementsByClassName("sidebar-item");
for (var i = 0; i < items.length; i++) {
  items[i].addEventListener("click", function () {
    hamburger.classList.toggle("is-active");
    sidebar.classList.toggle("is-active");
    overlay.classList.toggle("is-active");
  });
}
