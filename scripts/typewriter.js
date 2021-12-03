// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_typewriter
var speed = 50;

function type_writer(elementId, color, reverse = false) {
  let old_html = document.getElementById(elementId).innerHTML;
  if (!reverse && old_html.length < color.length) {
    document.getElementById(elementId).innerHTML += color.charAt(
      old_html.length
    );
    setTimeout(() => type_writer(elementId, color), speed);
  } else if (reverse && old_html.length > 0) {
    document.getElementById(elementId).innerHTML = old_html.slice(0, -1);
    setTimeout(() => type_writer(elementId, color, (reverse = true)), speed);
  }
}

const rgba2hex = (rgba) =>
  `#${rgba
    .match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/)
    .slice(1)
    .map((n, i) =>
      (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n))
        .toString(16)
        .padStart(2, "0")
        .replace("NaN", "")
    )
    .join("")}`;

const elements = document.querySelector("#art-carousel");

/* Add onclick functions. */
(function () {
  for (let i = 0; i < elements.children.length; i++) {
    let elementId = elements.children[i].children[1].getAttribute("id");
    let color = rgba2hex(
      elements.children[i].children[0].children[1].style.backgroundColor
    ).toUpperCase();

    let container = elements.children[i].children[0];
    container.addEventListener("click", () => {
      if (container.classList.contains("active")) {
        container.classList.remove("active");
        type_writer(elementId, color, (reverse = true));
      } else {
        container.classList.add("active");
        type_writer(elementId, color);
      }
    });
  }
})();