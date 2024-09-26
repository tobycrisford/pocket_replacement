chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "saveBookmark") {
    chrome.storage.sync.get(['mainBookmarks'], function(result) {
      let mainBookmarks = result.mainBookmarks || [];
      mainBookmarks.push({
        url: request.url,
        title: request.title,
        date: new Date().toISOString()
      });
      chrome.storage.sync.set({mainBookmarks: mainBookmarks}, function() {
        sendResponse({message: "Bookmark saved successfully!"});
      });
    });
    return true;  // Indicates we wish to send a response asynchronously
  }
});
