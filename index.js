'use strict';
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchWord, callback){
  const query = {
    part: 'snippet',
    key: 'AIzaSyC9NYtV2Dup8S78zqCQ3x1dPjazLRcVIAo',
    q: `${searchWord}`
  };
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}
function renderResult(result) {
  return `
    <div>
    <img src='${result.snippet.thumbnails.medium.url}'/>
    // console.log('${result.snippet.thumbnails.medium.url}')
    </div>
  `;
}
function displayYoutubeSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
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
  });
}
$(watchSubmit);
