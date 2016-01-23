var React = require('react');
var ReactDOM = require('react-dom');

window.addEventListener('DOMContentLoaded', function() {
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