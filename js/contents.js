$(function () {



    function showPopup (request) {
        var selectionText = request.selectionText;
        var resultText = request.resultText;
        var array = ["font-size:40px",
                     "width:640px",
                     "height:50px",
                     "padding:20px 5px 5px 5px",
                     "white-space:nowrap",
                     "overflow:hidden",
                     "text-overflow:ellipsis",
                     "-webkit-text-overflow:ellipsis"];

        var style ="";
        for (var i = array.length - 1; i >= 0; i--) {
            style += array[i] + ";"
        };

        var body = "<p style = '" + style + "'>" + selectionText + "</p><p>" + resultText + "</p>";
        $().w2popup('open',{
            width : 650,
            height : 200,
            modal : true,
            style:"text-align:center;padding:5px 5px 5px 5px;",
            title:"Speak English!",
            body:body,w
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
