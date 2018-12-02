/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
//
//
//    Protect Article Tracker - Badge Update
//
//
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

  // Update extension icon counter
  // https://developer.chrome.com/extensions/browserAction
  function updateBadgeText(value) {

    // This function is delivered an array of all protected blog articles.
    // Get the length of the array.
    ids = value.length.toString();

    // If the array is empty, we want to set the badge to '' to remove it.
    if ( ids === "0" ) {
      ids = '';
    }
    chrome.browserAction.setBadgeText({text: ids}); // We have 10+ protected articles
    chrome.browserAction.setBadgeBackgroundColor({color: [0,0,0,100]}); // Black badge
  }

  // Get protectedarticles value from chrome.storage when background page loads
  // Send the value over to updateBadgeText().
  chrome.storage.local.get('protectedarticles', function (result) {
    updateBadgeText(result.protectedarticles);
  });

  // Monitor chrome.storage for changes to "protectedarticles"
  // Send the value over to updateBadgeText().
  chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (var key in changes) {
      var storageChange = changes[key];

      console.log(key, namespace, storageChange);

      if ( key === "protectedarticles" ) {
        updateBadgeText(storageChange.newValue);
      }

      console.log('Storage key "%s" in namespace "%s" changed. ' +
                  'Old value was "%s", new value is "%s".',
                  key,
                  namespace,
                  storageChange.oldValue,
                  storageChange.newValue);
    }
  });
