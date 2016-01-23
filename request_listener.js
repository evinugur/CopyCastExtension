var media = {};
var videoFilter = {
	urls : ["<all_urls>"],
	types: ["other", "object"]
};

function clobberTab(id) { delete media["" + sender.tabId];}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request === "init")
		clobberTab(sender.tabId);

});
chrome.webRequest.onBeforeRequest.addListener(addRequestToSession, videoFilter);
chrome.webRequest.onCompleted.addListener(addRequestToSession, videoFilter);
function addRequestToSession(request) {
	if (!containsASubstring(request.url, VALID_CONTENT))
		return;
	if (media[""])
	// we can send it back to the page
	chrome.tabs.sendMessage(request.tabId, request, function(resp) {
		// ...
	});
}

var VALID_CONTENT = [".mp4", ".flv", ".webm", ".m3u8"];

function containsASubstring(string, array) {
	for (var el in array) {
		if (string.indexOf(array[el]) !== -1) 
			return true;
	}
	return false;
}
