'use strict';
const GITHUB_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const api_key = 'AIzaSyC9NYtV2Dup8S78zqCQ3x1dPjazLRcVIAo'
const STORE = []

function getDataFromApi(searchTerm, callback) {
  const query = {
    part: 'snippet',
    key: api_key,
    q: `${searchTerm}`
  }
  $.getJSON(GITHUB_SEARCH_URL, query, callback);
}

function renderResult(item) {
  return `
      <a data-videoid="${item.id.videoId}" class="playvideo" href="#"><img src=${item.snippet.thumbnails.medium.url}></a>
      <a class="viewchannel" href="https://www.youtube.com/channel/${item.snippet.channelId}">View Channel</a>
  `;
}

// {item.id.videoId}

function displayYoutubeSearchData(data) {
  data.items.map((item, index) => STORE.push(item));
  const results = STORE.map(item => renderResult(item));
  $('.js-search-results').html(results);
}



function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYoutubeSearchData);
    $('.js-search-results').removeClass("hidden");
  });
}

function clickThumbnail(){
  $('.js-search-results').on("click", ".playvideo", event => {
    const videoId = $(event.currentTarget).data('videoid')
    $(".js-lightbox-display").html(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`)
  })
}

function handleEvents() {
  watchSubmit();
  clickThumbnail();
}

$(handleEvents);

{/* <iframe width="560" height="315" src="https://www.youtube.com/embed/YQHsXMglC9A" frameborder="0" allowfullscreen></iframe> */}