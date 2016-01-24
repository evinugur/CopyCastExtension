var messages = [];
chrome.runtime.sendMessage({
		from : 'content',
		subject : 'showPageAction',
});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	// this is when you get a message from the backgrounsd
	if (request.from === "request_listener" && request.subject === "contentFound")
		messages.push(request.payload);
});
// listen for messages from the popup view 
chrome.runtime.onMessage.addListener(function(msg, sender, resp) {
	if (msg.from === 'popup' && msg.subject === 'DOMInfo') {
		resp(messages);
	}
});
