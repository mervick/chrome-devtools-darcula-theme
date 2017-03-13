var xhr = new XMLHttpRequest(),
    applyStyleSheet = chrome.devtools.panels.applyStyleSheet;

xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        applyStyleSheet(this.responseText);
    }
};

xhr.open("GET", "/stable.css", true);
xhr.send();

// fix scrollbar stylization
setTimeout(function() {
    applyStyleSheet('body {display: none; opacity: 0;}');
    setTimeout(function() {
        applyStyleSheet('body {display: block; opacity: 1;}');
    }, 100);
}, 10);
