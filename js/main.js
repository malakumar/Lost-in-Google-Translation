var languages = [
'en',
'af',
'sq',
'ar',
'az',
'eu',
'bn', 
'be',
'bg',
'ca',
'zh-CN',
'zh-TW',
'hr',
'cs',
'da',
'nl',
'eo',
'et',
'tl',
'fi',
'gl',
'ka',
'de',
'el',
'gu',
'ht',
'iw',
'hi',
'hu',
'is',
'id',
'ga',
'it',
'ja',
'kn',
'ko',
'la',
'lv',
'lt',
'mk',
'ms',
'mt',
'no',
'fa',
'pl',
'pt',
'ro',
'ru',
'sr',
'sk',
'sl',
'es',
'sw',
'sv',
'ta',
'te',
'th',
'tr',
'uk',
'ur',
'vi',
'cy',
'yi'
];

var startLanguage;
var currentText;
var currentLang;
var returnEnglish;
var translationShow;
var langSelect;
var translations = [];


//chrome webspeech recognition
var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.onresult = function(event) { 
	var interim_transcript = '';
	if (typeof(event.results) == 'undefined'){
		recognition.onend = null;
		recognition.stop();
		upgrade();
		return;
	   }
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    final_transcript = capitalize(final_transcript);
    final_span.innerHTML = linebreak(final_transcript);
    interim_span.innerHTML = linebreak(interim_transcript);
    if (final_transcript || interim_transcript) {
      showButtons('inline-block');
    }
  };


function upgrade() {
  start_button.style.visibility = 'hidden';
  showInfo('info_upgrade');
}

function startButton(event) {
	if (recognizing) {
		recognition.stop();
		return;
	}

final_transcript = '';
recognition.lang = select_dialect.value;
recognition.start();
ignore_onend = false;
final_span.innerHTML = '';
interim_span.innerHTML = '';
start_img.src = 'img/mic.gif';
  showInfo('info_allow');
  showButtons('none');
  start_timestamp = event.timeStamp;
}

function showInfo(s) {
  if (s) {
    for (var child = info.firstChild; child; child = child.nextSibling) {
      if (child.style) {
        child.style.display = child.id == s ? 'inline' : 'none';
      }
    }
    info.style.visibility = 'visible';
  } else {
    info.style.visibility = 'hidden';
  }
}

//URL construction below
var translate = function(sourceIndex, targetIndex, query){
	var myUrlDomain = 'https://www.googleapis.com/language/translate/v2?key=AIzaSyAdgFEb1qQy3bw-xPX1bmBQJ4l2ElFws38';
	var myUrlSource = '&source=' + languages[sourceIndex];
	var myUrlTarget = '&target=' + languages[targetIndex];
	var myUrlQuery = '&q=' + query;

	var myUrl = myUrlDomain + myUrlSource + myUrlTarget + myUrlQuery;

	myUrl && myUrl.preventDefault();

	$('#translation').empty();
	translations = [];
	currentText = $('#formValue').val();
	currentLang = 0;
	startLanguage = 'en';
	//run the ajax call and load translation on success
	$.ajax({
		url : myUrl,
		dataType : "jsonp",
		success : function(response) {
			var translation = response.data.translations[0].translatedText;
			addToDocument(translation);

			return;
			

			//Math.random()
			//Math.floor()
			//javascript arrays
			//if/else statements
			//show name of language

			// make sure the targetindex is different from someotherindex
			// decide when you've translated enough (i.e. a counter?)
			// and decide how to choose the first language to translate to
			// look below



			// something to happen here. Either:
			// 1. translate it again, 
			var translate = (targetIndex, someOtherIndex, translation);
			// 2. Stop translating
			return;
		}


	});

};

var addToDocument = function (text) {
	document.getElementById("translation").innerHTML += 
		"<br>" + text;
}

//init
var init = function(){
	
	$('#submit').click(function(e){
		var text = $('#formValue').val();
		e.preventDefault();
		// here is where you pick the first language to translate to, you have to define firstLanguage
		translate(0, firstLanguage, text);
	});
	
};

//document load listener
$( document ).ready(function() {

    init();
    
});