function renderDOM(model) {
  var tbody = $("#tableBody");
  $("#mainTable")[model.messages.length ? "removeClass" : "addClass"]("hidden");
  
  model.messages.reverse().forEach(function(x, i) {
    var tr = $("<tr>");
    var num = $("<td>");
    num.text(i + 1);
    tr.append(num);
    var videoUrl = anchor(x.url);
    videoUrl.append(btn('Preview'));
    videoUrl.attr("title", x.url);
    var urlNode = $("<td>");
    urlNode.append(videoUrl);
    tr.append(urlNode);
    var btnNode = $("<td>");
    var btnCast = btn('Cast');
    var castUrl = anchor('chrome-extension://' + chrome.runtime.id + '/player.html?url=' + x.url);
    castUrl.append(btnCast);
    btnNode.append(castUrl);
    tr.append(btnNode);    
    tbody.append(tr);
  });
  $("#mobileBox")[0].checked = model.useMobile;
}

function btn(text) {
  var btn = $("<btn>");
  btn.addClass("btn btn-default");
  btn.text(text);
  return btn;
}

function anchor(href) {
  var a = $("<a>");
  a.attr("href", href);
  a.attr("target", "_blank");
  return a;
}

window.addEventListener('DOMContentLoaded', function () {
  $("#mobileBtn").click(function(){
    var useMobile = $("#mobileBox")[0].checked;
    chrome.tabs.query({
      active: true, currentWindow: true
    }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        from: 'popup',
        subject: 'Mobile',
        useMobile: useMobile
      });
    });
  });
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