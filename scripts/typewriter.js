// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_typewriter
var speed = 50;

function type_writer(elementId, color, container) {
  let old_html = document.getElementById(elementId).innerHTML;
  let reverse = container.classList.contains("closing");
  if (!reverse && old_html.length < color.length) {
    document.getElementById(elementId).innerHTML += color.charAt(
      old_html.length
    );
    setTimeout(() => type_writer(elementId, color, container), speed);
  } else if (reverse && old_html.length > 0) {
    document.getElementById(elementId).innerHTML = old_html.slice(0, -1);
    setTimeout(() => type_writer(elementId, color, container), speed);
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
    .join("")
    .toUpperCase()}`;

/* Add onclick functions. */
(function () {
  /* Gallery. */
  const gallery_elements = document.querySelector("#art-carousel");
  for (let i = 0; i < gallery_elements.children.length; i++) {
    let elementId = gallery_elements.children[i].children[1].getAttribute("id");
    let color = rgba2hex(
      gallery_elements.children[i].children[0].children[1].style.backgroundColor
    );

    let container = gallery_elements.children[i].children[0];
    container.addEventListener("click", () => {
      if (container.classList.contains("opening")) {
        container.classList.remove("opening");
        container.classList.add("closing");
        type_writer(elementId, color, container);
      } else {
        container.classList.remove("closing");
        container.classList.add("opening");
        type_writer(elementId, color, container);
      }
    });
  }

  // TODO: insert <p> elements in Javascript and have a counter for id#

  /* Collections. */
  const collections_elements = document.getElementsByClassName(
    "collection-color-container"
  );
  for (let i = 0; i < collections_elements.length; i++) {
    let elementId = collections_elements[i].children[1].getAttribute("id");
    let color = rgba2hex(
      collections_elements[i].children[0].style.backgroundColor
    );

    let container = collections_elements[i].children[0];
    container.addEventListener("click", () => {
      if (container.classList.contains("opening")) {
        container.classList.remove("opening");
        container.classList.add("closing");
        type_writer(elementId, color, container);
      } else {
        container.classList.remove("closing");
        container.classList.add("opening");
        type_writer(elementId, color, container);
      }
    });
  }
})();
