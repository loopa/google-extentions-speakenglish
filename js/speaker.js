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
			  {key:"en",title:"英語"},        // 英語-English
			  {key:"fr",title:"フランス語"},  // フランス語-French
			  {key:"de",title:"ドイツ語"},    // ドイツ語-German
			  {key:"es",title:"スペイン語"},  // スペイン語-Spanish
			  {key:"ru",title:"ロシア語"}     // ロシア語-Russian
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
