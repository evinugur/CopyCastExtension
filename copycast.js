window['__onGCastApiAvailable'] = function(loaded, errorInfo) {
  if (loaded) {
    initializeCastApi();
  } else {
    console.log(errorInfo);
  }
};

function renderDOM(model) {
  var tbody = $("#tableBody");
  model.forEach(function(x, i) {
    var tr = $("<tr>");
    var num = $("<td>");
    num.text(i + 1);
    tr.append(num);
    var videoUrl = $("<a>");
    videoUrl.attr("target", "_blank");
    videoUrl.attr("href", x.url);
    videoUrl.append(btn('Preview'));
    var urlNode = $("<td>");
    urlNode.append(videoUrl);
    tr.append(urlNode);
    var btnNode = $("<td>");
    btnNode.append(btn('Cast'));
    tr.append(btnNode);    
    tbody.append(tr);
  });
}

function btn(text) {
  var btn = $("<btn>");
  btn.addClass("btn btn-default");
  btn.text(text);
  return btn;
}

window.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      from: 'popup',
      subject: 'DOMInfo'
    }, renderDOM); 
  });
});