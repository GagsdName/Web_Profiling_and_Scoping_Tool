
var spiderData;
function foo()
{ 
// make the list with the ID 'newList' collapsible
CollapsibleLists.applyTo(document.getElementById('newList'));

var helpButton = document.getElementById('help');
	helpButton.onclick=function(){
		
	tour_onload();
	};
	
	var exportButton = document.getElementById('exportSpider');
	exportButton.onclick=function(){
		
	download_json ("Spider");
	};
	
	

}



function tour_onload(){
	
	var tour1 = new Tour({
  steps: [
  {
    element: "#startingOn",
    title: "Starting On URL",
    content: "The URL being crawled at the moment.",
	prev: -1,
	next: 1
  },
  
   {
    element: "#restrictTo",
    title: "Restrict To Regex",
    content: "URL Regex to which this crawling session is limited to. ",
	prev: 0,
	next: 2
  },
  
   {
    element: "#queue",
    title: "Queue",
    content: "Number of URLs in Queue.",
	prev: 1,
	next: 3
  },
  
   {
    element: "#status",
    title: "Status",
    content: "Status of current URL being crawled.",
	prev: 2,
	next: -1
  }
]});

// Initialize the tour
tour1.init(true);

// Start the tour
	tour1.start(true);
	

}

function messageDispatch(request, sender, sendResponse) {
    var element = null;
    //what are we using
    switch(request.method){
        case "getElementById":
            element =document.getElementById(request.id);
            break;
        case "getElementsByTag":
            element =document.getElementById(request.id);
            break;
    }
    //what are we doing
    switch(request.action){
        case "getInnerHTML":
            sendResponse(element.innerHTML);
            break;
        case "getValue":
            sendResponse(element.value);
            break;
        case "setInnerHTML":
            element.innerHTML=request.value;
            break;
        case "setValue":
            element.value=request.value;
            break;
        case "insertResultBodyTR":
            insertResultBodyTR(request.value);
		
            break;
		 case "setSpiderData":
                spiderData = request.value;
		
            break;
    }
}
function clickStop() {
    if( document.getElementById("stopSpider").value == "Stop" ){
        document.getElementById("stopSpider").value="Stopped";
    }
    chrome.runtime.sendMessage({
        stop: document.getElementById("stopSpider").value
    });
}

function clickPause() {
    
	
	if( document.getElementById("pauseSpider").value == "Pause" ){
        document.getElementById("pauseSpider").value="Resume";
    }
    else{
        document.getElementById("pauseSpider").value="Pause";
    }


    chrome.runtime.sendMessage({
        pause: document.getElementById("pauseSpider").value
    });
}


function pageLoaded() {
    document.getElementById("stopSpider").addEventListener("click",clickStop);
    document.getElementById("pauseSpider").addEventListener("click",clickPause);
    chrome.runtime.onMessage.addListener(messageDispatch);
}

function insertResultBodyTR(innerHTML){
    var tbody = document.getElementById('resultbody');
	tbody.innerHTML = "";
    var br = document.createElement('section');
    br.innerHTML += innerHTML
    tbody.appendChild(br);
	foo();
}


function download_json(fileName) {
	
	spiderData = spiderData + ']}]}';
    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(JSON.parse(spiderData), null, '\t')) 	;
    var downloadLink = document.getElementById('jsonDownloadLink');

    downloadLink.href = 'data:' + data;
    downloadLink.download = fileName+".json";

    downloadLink.click();

}

window.addEventListener("load",pageLoaded);

