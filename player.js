$(document).ready(function(){
	window.url = location.search.substring("?url=".length);	
	var videoElement = $("#vidEl");
	videoElement.attr('src', url);
	videoElement[0].load();
	$("#urlInputBtn").click(function() {
		var url = $("#urlInputBox").val();
		var arg = "?url=";
		var argIndex = location.href.indexOf(arg) + arg.length;
		location.href = location.href.substring(0, argIndex) + url;
	});
});
