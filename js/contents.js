$(function () {

    function showPopup (request) {
        var selectionText = request.selectionText;
        var resultText = request.resultText;
        var body = "<p style = 'font-size:40px'>" + selectionText + "</p><p>" + resultText + "</p>";
        $().w2popup('open',{
            width : 650,
            height : 200,
            modal : true,
            style:"text-align:center;padding:5px 5px 5px 5p;x",
            title:"Speak English!",
            body:body,
            onOpen:function(){
                chrome.extension.sendRequest({selectionText:selectionText},function(response){
                    $().w2popup('close');
                });
            }
        });
    };

    chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
        showPopup(request);
    });
});
