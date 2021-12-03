// https://www.youtube.com/watch?v=wqfptgArbQg&t=0s

const images = document.querySelector("#art-carousel");

const number_of_cards_by_index = images.children.length - 1,
  middle_card_by_index = Math.floor(number_of_cards_by_index / 2);

/* 90% screen width and 5 cards per */
const card_width = 90 / (images.children.length - 1);

function order_cards() {
  let counter_for_right = 1,
    counter_for_left = middle_card_by_index;

  for (let i = 0; i < images.children.length; i++) {
    images.children[i].style.transitionDuration = "1s";
    images.children[i].style.left = `${i * card_width}%`;

    if (i < middle_card_by_index) {
      images.children[i].style.left = `${50 - counter_for_left * card_width}%`;
      counter_for_left--;
    } else if (i > middle_card_by_index) {
      images.children[i].style.left = `${50 + counter_for_right * card_width}%`;
      counter_for_right++;
    } else {
      images.children[i].style.left = `50%`;
    }
  }
}
order_cards();

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
