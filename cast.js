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
		$('.castbtn').click(function() {
			debugger;
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