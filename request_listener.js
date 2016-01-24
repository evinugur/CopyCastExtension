var VALID_CONTENT = [".mp4", ".flv", ".webm", ".m3u8"];
var videoFilter = {
	urls : ["<all_urls>"],
	types: ["other", "object", "sub_frame"]
};

var mobile = false;

chrome.webRequest.onBeforeSendHeaders.addListener(function(details){
	var headers = details.requestHeaders;
	if (mobile) {
		for (var i = 0; i < headers.length; i++) {
			if (headers[i].name === "User-Agent")
				headers[i].value = "Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_0 like Mac OS X; en-us) AppleWebKit/532.9 (KHTML, like Gecko) Version/4.0.5 Mobile/8A293 Safari/6531.22.7";
		}
	}
	return {
		requestHeaders : headers
	};
}, {urls : ["<all_urls>"]}, ["requestHeaders", "blocking"]);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.from === 'content') {
		if (request.subject === 'showPageAction') {
		// init logic from content script
		} else if (request.subject === 'mobileChange') {
			mobile = request.useMobile;
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				chrome.tabs.executeScript(tabs[0].id, {code: 'window.location.reload(true);'});
			});
		}
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

