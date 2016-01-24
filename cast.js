window['__onGCastApiAvailable'] = function(loaded, errorInfo) {
  if (loaded) {
    initializeCastApi();
  } else {
    console.log(errorInfo);
  }
};

function sessionListener(info) {console.log("SESSION LISTENER: ", info);}
function receiverListener(info) {
	if (info === chrome.cast.ReceiverAvailability.AVAILABLE) {
		var that = this;
		$('#play').click(function() {
			chrome.cast.requestSession(onRequestSessionSuccess.bind(that, url), console.log);
		});
	}
}

function onInitSuccess() {
	console.log("Init Success!");
}

function initializeCastApi() {
  var sessionRequest = new chrome.cast.SessionRequest(window.APP_ID);
  var apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener, receiverListener);
  chrome.cast.initialize(apiConfig, onInitSuccess, console.log);
}

function onRequestSessionSuccess(url, session) {
	var mediaInfo = new chrome.cast.media.MediaInfo(url, 'video/mp4');
	var req = new chrome.cast.media.LoadRequest(mediaInfo);
	console.log("Loading: ", url);
	session.loadMedia(req, console.log, console.log);
}
