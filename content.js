var model = {
	messages: [],
	useMobile: false
} 
chrome.runtime.sendMessage({
		from : 'content',
		subject : 'showPageAction'
}, function(resp) {
	model.useMobile = resp;
});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	// this is when you get a message from the backgrounsd
	if (request.from === "request_listener" && request.subject === "contentFound") {
		model.messages.push(request.payload.request);
		model.useMobile = request.payload.useMobile;
	}
});
// listen for messages from the popup view 
chrome.runtime.onMessage.addListener(function(msg, sender, resp) {
	if (msg.from === 'popup') {
		if (msg.subject === 'DOMInfo') {
			resp(model);
		} else if (msg.subject === 'Mobile') {
			chrome.runtime.sendMessage({
				from: 'content',
				subject: 'mobileChange',
				useMobile : msg.useMobile
			});
		}
	}
});
