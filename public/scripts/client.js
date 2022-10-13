$(document).ready(function () {
  // Cross-site Scripting
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  // Fetching tweets function
  const createTweetElement = (tweet) => {
    // Write HTML markup to render our data from DB
    const $tweetArticle = $(`<article class="tweet-list-item">
      <header class="tweet-list-header">
      <span class="tweet-list-header-wrap">
      <span class="tweet-list-avatar-name"> 
      <img class="tweet-list-avatar" src="${
        tweet.user.avatars
      }" alt="Profile picture"/>
      <p class="tweet-list-username">${tweet.user.name}</p>
      </span>
      <p class="tweet-list-handle">${tweet.user.handle}</p>
      </span>
      <span class="tweet-list-text">${escape(tweet.content.text)}    
      </span>
      </header>
      <footer>
      <span>${timeago.format(tweet.created_at)}</span>
      <span class="tweet-list-footer-icons">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart-circle-plus"></i>
        </span>
        </footer>`);

    return $tweetArticle;
  };

  // Save the container for rendering our tweets
  const $tweetsContainer = $("#tweets-container");
  // Function for rendering an array of objects (tweets) on the page
  const renderTweets = function (tweets) {
    // loop through tweets
    for (const tweet of tweets) {
      // calls HTML markup building function for each tweet
      const $tweet = createTweetElement(tweet);
      // takes a return value and adds it to the top of tweets container
      $($tweetsContainer).prepend($tweet);
    }
  };
  
    // Stylish Error Pop up setup
    const $alertDiv = $("#alert-popup");
    $alertDiv.on("click", () => { //Making it hide on click
      $alertDiv.hide();
    })

  // Navbar tweet area toggle
  const $navbarToggleBtn = $("#navbar-toggle");
  $navbarToggleBtn.on("click", () => { // redo or rethink this functionality
    $tweetForm.toggle();
    if ($tweetForm.is(":visible")){
    $("#tweet-text").focus();//user can begin typing right after clicking the button
  }});

  // Tweet Form GET route handler by jQuery
  const $loadTweets = function () {
    $.ajax({
      url: "/tweets",
      method: "GET",
    })
      .then((tweets) => {
        // calling the looping and HTML handling function that will do
        // all the work needed on each tweet in the Data Base
        renderTweets(tweets);
      })
      .catch((err) => {
        console.log(`We have an Error ${err}`);
      });
  };
  $loadTweets();

  // Form POST route handler by jQuery
  const $tweetForm = $("#tweet-form");
  $tweetForm.on("submit", (e) => { //Capturing submitting phase event
    e.preventDefault();  // preventing browser from reloading
    
    // Capturing the text area for the tweets to do the validation
    // before the serializing is even made
    const $textValue = $("#tweet-text").val().trim();
    if ($textValue === "") {
      $alertDiv.text("Tweet can't be empty")
      .addClass("error-popup") // adding CSS markup for alert in our popup div
      .show() // showing us the popup alert if it was used and closed before
      return;
    } else if ($textValue.length > 140) {
      $alertDiv.text("Tweet exceeds maximum length of the characters")
      .addClass("error-popup") // adding CSS markup for alert in our popup div
      .show() // showing us the popup alert if it was used and closed before
      return;
    }

    // After validation is done we will parse/encode data into usable format
    const parsedData = $tweetForm.serialize();
    $.ajax({ // Create our own POST route handler based on jQuery
      url: "/tweets",
      method: "POST",
      data: parsedData, // sending our tweet/data object with the response 
    })
    // render/prepend the tweet to the top of the page without reloading
      .then((tweet) => { 
        $loadTweets(tweet); 
        // clean up the text area after the tweet has been posted
        $tweetForm[0].childNodes[3].value = ""; //traversing DOM for extra speed 8)
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  });
});
