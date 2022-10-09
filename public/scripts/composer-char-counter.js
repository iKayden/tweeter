$(document).ready(function () {
  $("#tweet-text").on("input", function (e) {

    // we use available context of "this" to be the targeted text area
    const charLength = $(this).val().length;
    let charLimit = 140 - charLength;

    // we traverse the DOM from "this"/textarea node to the "counter" node
    const charCounter = $(this).siblings().children(".counter");

    // To change html representation of the numbers left on the page
    charCounter.html(charLimit);

    // if user goes above the limit we will add class to make negative numbers color:Red
    // using the css class "counter-negative" (in new-tweet.css)
    charCounter.toggleClass("counter-negative", charLimit < 0);
  });
});
