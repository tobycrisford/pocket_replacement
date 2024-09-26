document.getElementById('saveButton').addEventListener('click', function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.runtime.sendMessage({
      action: "saveBookmark",
      url: tabs[0].url,
      title: tabs[0].title
    }, function(response) {
      document.getElementById('message').textContent = response.message;
    });
  });
});

document.getElementById('viewBookmarksButton').addEventListener('click', function() {
  chrome.tabs.create({url: 'bookmarks.html'});
});

