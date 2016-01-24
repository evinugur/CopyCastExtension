var VALID_CONTENT = [".mp4", ".flv", ".webm", ".m3u8"];
var videoFilter = {
	urls : ["<all_urls>"],
	types: ["other", "object", "sub_frame"]
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.from === 'content' && request.subject === 'showPageAction') {
		// init logic from content script
	}
});

chrome.webRequest.onBeforeRequest.addListener(addRequestToSession, videoFilter);
chrome.webRequest.onCompleted.addListener(addRequestToSession, videoFilter);
function addRequestToSession(request) {
	if (!containsASubstring(request.url, VALID_CONTENT))
		return;
	// we can send it back to the page
	var message = {
		from: 'request_listener',
		subject: "contentFound",
		payload: request
	};
	chrome.tabs.sendMessage(request.tabId, message, function(resp) {
		// ...
	});
}

function containsASubstring(string, array) {
	for (var el in array) {
		if (string.indexOf(array[el]) !== -1) 
			return true;
	}
	return false;
}
