// https://www.youtube.com/watch?v=wqfptgArbQg&t=0s

const images = document.querySelector("#art-carousel");

const number_of_cards_by_index = images.children.length - 1,
  middle_card_by_index = Math.floor(number_of_cards_by_index / 2);

var num_cards_on_screen = 2;
if (window.innerWidth > 600) num_cards_on_screen = 3;
if (window.innerWidth > 900) num_cards_on_screen = 4;
if (window.innerWidth > 1200) num_cards_on_screen = 5;

const card_width = (window.innerWidth - 60) / num_cards_on_screen;

/* Clone cards and compute sizes. */
(function () {
  const num_cards = images.children.length;
  for (let i = 0; i < num_cards; i++) {
    images.children[i].style.width = `${card_width}px`;

    var clone = images.children[i].cloneNode(true);
    images.appendChild(clone);
  }
  const frames = document.getElementsByClassName("gallery-frame");
  for (let i = 0; i < frames.length; i++) {
    frames[i].style.width = `${card_width - 40}px`;
  }
  const paintings = document.getElementsByClassName("gallery-painting");
  for (let i = 0; i < paintings.length; i++) {
    paintings[i].style.width = `${paintings[i].offsetHeight}px`;
    console.log(`paintings[i].offsetHeight: ${paintings[i].offsetHeight}`);
  }
})();

// window.onresize = orderCards;

/* Order cards. */
(function () {
  console.log(`num_cards_on_screen: ${num_cards_on_screen}`);
  console.log(`card_width: ${card_width}`);
  for (let i = 0; i < images.children.length; i++) {
    images.children[i].style.transitionDuration = "1s";

    if (i < (images.children.length + num_cards_on_screen) / 2) {
      images.children[i].style.left = `${30 + i * card_width}px`;
    } else {
      images.children[i].style.left = `${
        30 - (images.children.length - i) * card_width
      }px`;
    }

    images.children[i].style.transitionDuration = "0.5s";
    console.log(`card ${i}: ${images.children[i].style.left}`);
  }
})();

let last_positions = [];
let first_index = Math.floor(
  (images.children.length + num_cards_on_screen + 1) / 2
);
let last_index =
  (first_index - 1 + images.children.length) % images.children.length;
let scroll_in_progress = false;

/* ************************* BUTTON NAVIGATION ************************* */

document.querySelector("#right").addEventListener("click", () => {
  if (scroll_in_progress) return;
  scroll_in_progress = true;

  for (let i = 0; i < images.children.length; i++) {
    console.log(
      `before card ${i}: ${parseFloat(images.children[i].style.left)}`
    );
    let new_left = parseFloat(images.children[i].style.left) - card_width;
    images.children[i].style.left = `${new_left}px`;
    console.log(`after card ${i}: ${images.children[i].style.left}`);
  }

  console.log(`first_index: ${first_index}`);
  console.log(
    `last_index: ${
      (first_index - 1 + images.children.length) % images.children.length
    }`
  );

  /* Wrap first element to back. */
  let new_left =
    parseFloat(images.children[last_index].style.left) + card_width;

  images.children[first_index].classList.add("notransition"); // Disable transitions
  images.children[first_index].style.left = `${new_left}px`;
  images.children[first_index].offsetHeight; // Trigger a reflow, flushing the CSS changes
  images.children[first_index].classList.remove("notransition"); // Re-enable transitions

  first_index = (first_index + 1) % images.children.length;
  last_index = (last_index + 1) % images.children.length;

  setTimeout(() => {
    scroll_in_progress = false;
  });
});

document.querySelector("#left").addEventListener("click", () => {
  if (scroll_in_progress) return;
  scroll_in_progress = true;

  for (let i = 0; i < images.children.length; i++) {
    console.log(
      `before card ${i}: ${parseFloat(images.children[i].style.left)}`
    );
    let new_left = parseFloat(images.children[i].style.left) + card_width;
    images.children[i].style.left = `${new_left}px`;
    console.log(`after card ${i}: ${images.children[i].style.left}`);
  }

  console.log(`first_index: ${first_index}`);
  console.log(`last_index: ${last_index}`);

  /* Wrap last element to front. */
  let new_left =
    parseFloat(images.children[first_index].style.left) - card_width;

  images.children[last_index].classList.add("notransition"); // Disable transitions
  images.children[last_index].style.left = `${new_left}px`;
  images.children[last_index].offsetHeight; // Trigger a reflow, flushing the CSS changes
  images.children[last_index].classList.remove("notransition"); // Re-enable transitions

  first_index =
    (first_index - 1 + images.children.length) % images.children.length;
  last_index =
    (last_index - 1 + images.children.length) % images.children.length;

  setTimeout(() => {
    scroll_in_progress = false;
  });
});

/* ********************************************************************* */
