let mainBookmarks = [];
let favoriteBookmarks = [];

function loadBookmarks() {
  chrome.storage.sync.get(['mainBookmarks', 'favoriteBookmarks'], function(result) {
    mainBookmarks = result.mainBookmarks || [];
    favoriteBookmarks = result.favoriteBookmarks || [];
    displayBookmarks();
  });
}

function saveBookmarks() {
  chrome.storage.sync.set({
    mainBookmarks: mainBookmarks,
    favoriteBookmarks: favoriteBookmarks
  }, function() {
    console.log('Bookmarks saved and synced');
  });
}

function deleteBookmark(list, index) {
  list.splice(index, 1);
  saveBookmarks();
  displayBookmarks();
}

function favoriteBookmark(index) {
  const bookmark = mainBookmarks.splice(index, 1)[0];
  favoriteBookmarks.push(bookmark);
  saveBookmarks();
  displayBookmarks();
}

function displayBookmarks() {
  displayBookmarkList('mainBookmarkList', mainBookmarks, true);
  displayBookmarkList('favoriteBookmarkList', favoriteBookmarks, false);
}

function displayBookmarkList(elementId, bookmarks, showFavoriteButton) {
  let bookmarkList = document.getElementById(elementId);
  bookmarkList.innerHTML = '';
  bookmarks.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach((bookmark, index) => {
    let bookmarkDiv = document.createElement('div');
    bookmarkDiv.className = 'bookmark';
    bookmarkDiv.innerHTML = `
      <a href="${bookmark.url}" target="_blank">${bookmark.title}</a>
      <span>(${new Date(bookmark.date).toLocaleString()})</span>
      <button class="actionBtn deleteBtn" data-list="${elementId}" data-index="${index}">Delete</button>
      ${showFavoriteButton ? `<button class="actionBtn favoriteBtn" data-index="${index}">Favorite</button>` : ''}
    `;
    bookmarkList.appendChild(bookmarkDiv);
  });
}

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('deleteBtn')) {
    const list = e.target.getAttribute('data-list') === 'mainBookmarkList' ? mainBookmarks : favoriteBookmarks;
    deleteBookmark(list, parseInt(e.target.getAttribute('data-index')));
  } else if (e.target.classList.contains('favoriteBtn')) {
    favoriteBookmark(parseInt(e.target.getAttribute('data-index')));
  }
});

loadBookmarks();

