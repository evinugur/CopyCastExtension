$(document).ready(function(){
	window.url = location.search.substring("?url=".length);	
	var videoElement = $("#vidEl");
	videoElement.attr('src', url);
	videoElement[0].load();
});
