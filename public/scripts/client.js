$(document).ready(function () {
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
      <span class="tweet-list-text">${tweet.content.text}    
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
  $tweetForm.on("submit", (e) => {
    // prevent browser from reloading
    e.preventDefault();
    // Capturing the text area for the tweets to do the validation 
    // before the serializing is even made
    const $textValue = $("#tweet-text").val().trim();
    if ($textValue === "") {
      alert("Tweet can't be empty!");
      return;
    } else if ($textValue.length > 140) {
      alert("Tweet exceeds maximum length of the characters.");
      return;
    }
    
    // After validation is done we will parse/encode data into usable format
    const parsedData = $tweetForm.serialize();
    // Create our own POST route handler based on jQuery
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: parsedData,
    })
      .then((tweet) => {
        // render/prepend the tweet to the top of the page without reloading
        $loadTweets(tweet);
        // clean up the text are after the tweet has been posted
        $tweetForm[0].childNodes[3].value = ""
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  });
});
