var faqs = document.getElementsByClassName("faq-question-container");
for (var i = 0; i < faqs.length; i++) {
  faqs[i].addEventListener("click", function () {
    this.classList.toggle("active");
    this.children[1].classList.toggle("active"); // arrow
    var answer = this.nextElementSibling;
    if (answer.style.maxHeight) {
      answer.style.maxHeight = null;
      answer.style.padding = "0";
    } else {
      answer.style.maxHeight = answer.scrollHeight + "px";
      answer.style.padding = "0 0 10px 0";
    }
  });
}
