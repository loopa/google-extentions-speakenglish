(function(){

    // henkan
    function translate(selectionText,callback) {
        var url = "http://translate.google.co.jp/" //?hl=ja&layout=2&eotf=1&sl=en&tl=ja&q=" + selectionText;
        var params = "hl=ja&layout=2&eotf=1&sl=en&tl=ja&q=" + selectionText;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var html = this.responseText.replace(/<script(?:[ \t\r\n][^>]*)?>[\S\s]*?<\/script[ \t\r\n]*>|<\/?(?:i?frame|html|script|object)(?:[ \t\r\n][^<>]*)?>/gi, ' ')
                var htmlDoc = document.implementation.createHTMLDocument ?
                document.implementation.createHTMLDocument('apfc') :
                document.implementation.createDocument(null, 'html', null)
                var range = document.createRange();
                range.selectNodeContents(document.documentElement);
                htmlDoc.documentElement.appendChild(range.createContextualFragment(html));
                var result_text = htmlDoc.getElementById('result_box').childNodes[0].innerHTML;
                callback(result_text);
            }
        }
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(params);
    };

    // speak english
    function speakEnglish(text,callback){
        var URL = "http://translate.google.com/translate_tts?tl=en&q=" + text;
        var audio = new Audio(URL);
        audio.addEventListener("ended",callback,true);

        try{
            audio.play();
        }catch(e){
            console.log(e);
            callback();
        }

    };

    function sendRequest(tab,selectionText,resultText) {
        chrome.tabs.sendRequest(tab.id, {
            "selectionText": selectionText,
            "resultText": resultText}
        );
    };

    // rigth clicked
    function onClick(tab,selectionText) {
        translate(selectionText,function(resultText){
            sendRequest(tab,selectionText,resultText);
        });
    };

    // create contextmenu
    function setContextMenus () {
        chrome.contextMenus.removeAll(function(){
            chrome.contextMenus.create({
                "title":"SpeakEnglish",
                "contexts":["selection"],
                "onclick":function(info,tab) {
                    chrome.tabs.getSelected(null, function(tab) {
                        onClick(tab,info.selectionText);
                    });                }
            });
        });
    };

    setContextMenus();

    chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
        speakEnglish(request.selectionText,function(){
            sendResponse(request);
        });
    });

    chrome.tabs.onActivated.addListener(function(activeInfo) {
        setContextMenus();
    });

    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        setContextMenus();
    });
})();
