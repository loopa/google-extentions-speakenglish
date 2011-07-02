// フランス語、ドイツ語、スペイン語、ロシア語
var keyItems ={};

function handleSpeaker(info,tab){
    var id = info.menuItemId;
    var key = keyItems[id].key;
    var text = info.selectionText;    
    var URL = "http://translate.google.com/translate_tts?tl=" + key + "&q=" + text;
    
    console.log(URL);
    var audio = new Audio(URL);
    audio.play();		
}

var lags = [
			  {key:"en",title:"English"}, // 英語
			  {key:"fr",title:"French"},  // フランス語
			  {key:"de",title:"German"},  // ドイツ語
			  {key:"es",title:"Spanish"}, // スペイン語
			  {key:"ru",title:"Russian"}  // ロシア語
			  ];
			
var obj,id;

for(var item in lags){
  obj = new Object();
  obj.title = lags[item].title;
  obj.contexts = ["selection"];
  obj.onclick = handleSpeaker;
  id = chrome.contextMenus.create(obj);
  
  obj.key = lags[item].key;
  keyItems[id] = obj;
}
