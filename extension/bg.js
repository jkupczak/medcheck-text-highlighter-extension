/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
//
//
//   Refresh extension on badge click
//
//
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

// Refreshes the current tab.
// Implemented specifically to compliment the .reload function below.
// When I click the Korra icon the extension reloads. After its done reloading this code runs and refreshes my active tab.
// This was added to make development of the extension quicker.
// Instead of opening the Extensions settings tab I can reload the extension without ever leaving the page I'm looking at.
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.reload(tabs[0].id);
});

// Handle clicks on the icon.
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.runtime.reload();
});


/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
//
//
//    Badge Update
//
//
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

  // Update extension icon counter
  // https://developer.chrome.com/extensions/browserAction
  function updateBadgeText(value) {

    // If the array is empty, we want to set the badge to '' to remove it.
    value = value.toString();

    var color = "";
    if ( value === "0" || value === "" ) {
      color = [83, 96, 108, 100];
    } else {
      color = [197, 29, 144, 100];
    }
    chrome.browserAction.setBadgeText({text: value}); // We have 10+ protected articles
    chrome.browserAction.setBadgeBackgroundColor({color: color}); // Black badge
  }


/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
//
//
//   Listening for Messages from Content Scripts
//
//
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////


chrome.runtime.onMessage.addListener(function(message, sender) {
    if (message.sendBack) {

        var payload = {"sender": sender, "message": message};
        chrome.tabs.sendMessage(sender.tab.id, payload);
    }

    // Update badge text
    if (message.updatebadge) {
      updateBadgeText(message.data);
    }
});
