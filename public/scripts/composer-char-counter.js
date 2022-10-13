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
  // Stretch task: Adding second button to go to the top of the screen
  const $goUpBtn = $("#go-up-btn");
  $(window).scroll(function () {
    if ($(this).scrollTop()) { //if it's at the top button will disappear
      $goUpBtn.fadeIn();
    } else { // if it's not at the top it will appear at the right bottom of the screen
      $goUpBtn.fadeOut();
    }
  });
  $goUpBtn.click(function () { //On click it will smoothly go to the top
    $("html, body").animate({ scrollTop: 0 }, 1000);
  });
});
