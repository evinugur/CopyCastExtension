var media = {};

chrome.webRequest.onCompleted.addListener(function(details) {
	if (!containsASubstring(details.url, VALID_CONTENT))
		return;
	addRequestToSession(details);
}, {urls: ["<all_urls>"]});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request === "init") {
		clobberTab(sender.tab.id);
	}
});

function clobberTab(tabId) { delete media[tabId]; }

function addRequestToSession(request) {
	if (!media[request.tabId])
		media[request.tabId] = [];
	media[request.tabId].push(request);
}

var VALID_CONTENT = [".mp4"];



function containsASubstring(string, array) {
	for (var el in array) {
		if (string.indexOf(array[el]) !== -1) 
			return true;
	}
	return false;
}
