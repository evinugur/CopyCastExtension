var media = {};

chrome.webRequest.onBeforeRequest.addListener(function(details) {
	if (!containsASubstring(details.url, VALID_CONTENT))
		return;
	console.log("adding ", details);
	addRequestToSession(details);
}, {
	urls: ["<all_urls>"],
	types: ["other", "object"]
});

chrome.tabs.onRemoved.addListener(clobberTab);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request === "init") {
		clobberTab(sender.tab.id);
	}
});

function clobberTab(tabId) { delete media[tabId]; }

function addRequestToSession(request) {
	if (!media[request.tabId])
		media[request.tabId] = [];
	var urls = media[request.tabId].map(function(x) {return x.url;});
	if (containsASubstring(request.url, urls))
		return;
	media[request.tabId].push(request);
}

var VALID_CONTENT = [".mp4", ".flv", ".webm", ".m3u8"];



function containsASubstring(string, array) {
	for (var el in array) {
		if (string.indexOf(array[el]) !== -1) 
			return true;
	}
	return false;
}
