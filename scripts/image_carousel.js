// https://www.youtube.com/watch?v=wqfptgArbQg&t=0s

const images = document.querySelector("#art-carousel");

const number_of_cards_by_index = images.children.length - 1,
  middle_card_by_index = Math.floor(number_of_cards_by_index / 2);

var num_cards_on_screen = 2;
if (window.innerWidth > 600) num_cards_on_screen = 3;
if (window.innerWidth > 900) num_cards_on_screen = 4;
if (window.innerWidth > 1200) num_cards_on_screen = 5;

const card_width = (window.innerWidth - 60) / num_cards_on_screen;
console.log(`window.innerWidth: ${window.innerWidth}`);

/* Clone cards. */
(function () {
  const num_cards = images.children.length;
  for (let i = 0; i < num_cards; i++) {
    images.children[i].style.width = `${card_width}px`;
    images.children[i].style.border = `1px solid black`;

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
    console.log(`paintings[i].offsetHeight: ${paintings[i].offsetHeight}`)
  }
})();

// window.onresize = orderCards;

/* Order cards. */
(function () {
  console.log(`num_cards_on_screen: ${num_cards_on_screen}`);
  console.log(`card_width: ${card_width}`);
  for (let i = 0; i < images.children.length; i++) {
    images.children[i].style.transitionDuration = "1s";

    if (i < images.children.length / 2 + num_cards_on_screen / 2) {
      images.children[i].style.left = `${30 + i * card_width}px`;
    } else {
      images.children[i].style.left = `${
        30 - (images.children.length - i) * card_width
      }px`;
    }

    console.log(`card ${i}: ${images.children[i].style.left}`);
  }
})();

let last_positions = [];
let scroll_in_progress = false;

function handle_boundaries() {
  if (last_positions[number_of_cards_by_index] >= 100) {
    const beginning_of_deck = last_positions[0];
    images.children[number_of_cards_by_index].style.left = `${
      beginning_of_deck - card_width
    }%`;
    last_positions[number_of_cards_by_index] = beginning_of_deck - card_width;

    images.insertBefore(
      images.children[number_of_cards_by_index],
      images.children[0]
    );
    last_positions.splice(0, 0, last_positions.pop());
  }
  if (last_positions[0] <= -10) {
    const end_of_deck = last_positions[number_of_cards_by_index];
    images.children[0].style.left = `${end_of_deck + card_width}%`;
    last_positions[0] = end_of_deck + card_width;

    images.append(images.children[0]);
    last_positions.splice(number_of_cards_by_index, 0, last_positions.shift());
  }
}

/* ************************* BUTTON NAVIGATION ************************* */

for (let i = 0; i < images.children.length; i++) {
  last_positions.push(parseFloat(images.children[i].style.left));
}

document.querySelector("#right").addEventListener("click", () => {
  if (scroll_in_progress) return;
  scroll_in_progress = true;

  for (let i = 0; i < images.children.length; i++) {
    updated_position = last_positions[i] + card_width;
    images.children[i].style.transitionDuration = "0.5s";
    images.children[i].style.left = `${updated_position}%`;
    last_positions[i] = updated_position;
  }

  handle_boundaries();

  for (let i = 0; i < images.children.length; i++) {}

  setTimeout(() => {
    scroll_in_progress = false;
  });
});

document.querySelector("#left").addEventListener("click", () => {
  if (scroll_in_progress) return;
  scroll_in_progress = true;

  for (let i = 0; i < images.children.length; i++) {
    updated_position = last_positions[i] - card_width;
    images.children[i].style.transitionDuration = "0.5s";
    images.children[i].style.left = `${updated_position}%`;
    last_positions[i] = updated_position;
  }

  handle_boundaries();

  for (let i = 0; i < images.children.length; i++) {}

  setTimeout(() => {
    scroll_in_progress = false;
  });
});

/* ********************************************************************* */
