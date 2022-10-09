$(document).ready(function () {
  $("#tweet-text").on("input", function(e) {
    // we use available "this" to target text area
    const charLength = $(this).val().length;
    let charLimit = 140 - charLength;
    // we traverse the DOM from "this"/textarea node to the "counter" node
    const charCounter = $(this).siblings().children(".counter");
    // To change html representation of the numbers left on the page
    charCounter.html(charLimit);
    // if user goes above the limit we will add class to make negative numbers Red
    charCounter.toggleClass("counter-negative", charLimit < 0);
  });
});