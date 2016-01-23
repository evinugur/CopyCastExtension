window.COPYCAT = {};
chrome.runtime.sendMessage("init"); 
COPYCAT.messages = [];
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	COPYCAT.messages.push(request);
});