function renderDOM(model) {
	document.write(model.length);
}


window.addEventListener('DOMContentLoaded', function() {
	debugger;
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {
			from : 'popup',
			subject : 'DOMInfo'
		}, renderDOM);	
	});
});