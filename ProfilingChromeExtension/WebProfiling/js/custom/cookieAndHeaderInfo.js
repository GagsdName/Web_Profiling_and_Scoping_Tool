var cookieInfoJSON = {};
var cookies = [];
var headers = [];
var element = {};
function cookieAndHeaderInfo() {
	document.getElementById("loginTrue").addEventListener("click",getWithLoginInfo);	
	document.getElementById("loginFalse").addEventListener("click",getWithoutLoginInfo);
	document.getElementById("loginNotPossible").addEventListener("click",getWithoutLoginInfo);
}

function getWithLoginInfo(){
	element.login = true;
	getCookieInfo();
	getHeaders();
}

function getWithoutLoginInfo(){
	element.login = false;
	localStorage.clear();
	getCookieInfo();
	getHeaders();
}

function getCookieInfo(){
	
    if(element.login == true){
		cookies.push(localStorage.getItem("cookieInfo"));
		cookieInfoJSON["Cookies before login"] = JSON.parse(localStorage.getItem("cookieInfo"));
	}
    chrome.tabs.query({"status":"complete","windowId":chrome.windows.WINDOW_ID_CURRENT,"active":true}, function(tab){
            chrome.cookies.getAll({"url":tab[0].url},function(cookie){
				element.length = cookie.length;
				allCookieInfo = [];
				for(i=0;i<cookie.length;i++){
					allCookieInfo.push(cookie[i]);
				}
				element.cookies = allCookieInfo;
				if(element.login == true){
					cookies.push(JSON.stringify(element));
					cookieInfoJSON["Cookies after login"] = element;
					$("#cookieInfo").addClass('hide');
					$("#cookieInfo").html(cookies[0] + "</br></br>" + cookies[1]);
					$("#cookieInfo").removeClass('hide');
				}else{
					localStorage.setItem("cookieInfo",JSON.stringify(element));
					cookies.push(JSON.stringify(element));
					cookieInfoJSON["Cookies before login"] = element;
					$("#cookieInfo").addClass('hide');
					$("#cookieInfo").html(cookies);
					$("#cookieInfo").removeClass('hide');
				}
				jsonOutput($(".cookie-json"), cookieInfoJSON);
            });
           
    });
    
}


function getHeaders() {

	if(element.login == true){
		headers.push(localStorage.getItem("headerInfo"));
		headerInfo['header before login'] = JSON.parse(localStorage.getItem("headerInfo"));
	}
	var hostUrl = $("#host").val()
	var sData = {
		location : windowsLocation
	};

	$("#headers").addClass('hide');
	var req = new XMLHttpRequest();
	req.open('GET', windowsLocation, false);
	req.send(null);

	var respheaders = req.getAllResponseHeaders().toLowerCase();
	var parsedResHeader = parseResponseHeaders(respheaders);
	if(element.login == true){
		headerInfo['header after login'] = parsedResHeader;
		headers.push(JSON.stringify(parsedResHeader));
		$("#headers").html(headers[0] + "</br></br>" + headers[1]);
		$("#headers").removeClass('hide');
	}else{
		headerInfo['header before login'] = parsedResHeader;
		localStorage.setItem("headerInfo",JSON.stringify(parsedResHeader));
		headers.push(JSON.stringify(parsedResHeader));
		$("#headers").html(headers);
		$("#headers").removeClass('hide');
	}
	jsonOutput($(".header-json"), headerInfo); 
}



function parseResponseHeaders(headerStr) {
	var headers = {};
	if (!headerStr) {
		return headers;
	}
	var headerPairs = headerStr.split('\u000d\u000a');
	for (var i = 0; i < headerPairs.length; i++) {
		var headerPair = headerPairs[i];
		// Can't use split() here because it does the wrong thing
		// if the header value has the string ": " in it.
		var index = headerPair.indexOf('\u003a\u0020');
		if (index > 0) {
			var key = headerPair.substring(0, index);
			var val = headerPair.substring(index + 2);

			headers[key] = val;
		}
	}
	return headers;
}
  
window.addEventListener("load",cookieAndHeaderInfo);