$(document).ready(function () {
  // Fake data taken from initial-tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac",
      },
      "content": {
        "text":
          "If I have seen further it is by standing on the shoulders of giants",
      },
      "created_at": 1461116232227,
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd",
      },
      "content": {
        "text": "Je pense , donc je suis",
      },
      "created_at": 1461113959088,
    },
  ];

  const createTweetElement = (tweet) => {
    // Write HTML markup to render our data from DB
    const $tweetArticle = $(`<article class="tweet-list-item">
      <header class="tweet-list-header">
        <span class="tweet-list-header-wrap">
          <span class="tweet-list-avatar-name"> 
            <img class="tweet-list-avatar" src="${tweet.user.avatars}" alt="Profile picture"/>
            <p class="tweet-list-username">${tweet.user.name}</p>
          </span>
          <p class="tweet-list-handle">${tweet.user.handle}</p>
        </span>
        <span class="tweet-list-text">${tweet.content.text}    
        </span>
      </header>
      <footer>
        <span>${tweet.created_at} days ago</span>
        <span class="tweet-list-footer-icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart-circle-plus"></i>
        </span>
      </footer>`);

    return $tweetArticle;
  };
  // Save the container for rendering our tweets
  const $tweetsContainer = $("#tweets-container")

  const renderTweets = function (tweets) {
    // loop through tweets
    for(const tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $($tweetsContainer).prepend($tweet);
    }
  };

  const $tweetForm = $("#tweet-form");
  $tweetForm.on('submit', (e) => {
    // prevent browser from reloading
    e.preventDefault();
    // Parse/encode data into usable format
    const parsedData = $tweetForm.serialize();
    // Create our own post route handler based on jQuery
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: parsedData
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log("Error:",err);
    })
  })

  renderTweets(data);
});
