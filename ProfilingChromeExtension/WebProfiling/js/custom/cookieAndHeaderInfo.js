/*
Author: Pranav Pande
File Description: This file contains code for storing header and cookie information
*/

var cookieInfoJSON = {}; //For storing cookie info in JSON format
var headers = []; //For showing header info on the Passive tab
var loginInfo; 

function getWithLoginInfo(){
	//element.login = true;
	loginInfo = true;
	getCookieInfo();
	getHeaders();
}

function getWithoutLoginInfo(data){
	//element.login = false;
	loginInfo = false;
	cookieInfoJSON = data["cookie-info"];
	if(cookieInfoJSON["before_login"] == undefined){
		getCookieInfo();
		getHeaders();
	}else{
		printCookies(cookieInfoJSON);
		printHeaders(data["headerInfo"]);
	}
	
}

function getCookieInfo(){
	var element = {};
    if(loginInfo == true){
    	cookieInfoJSON = finalJsonOutput["cookie-info"];
	}
	
    chrome.tabs.query({"status":"complete","windowId":chrome.windows.WINDOW_ID_CURRENT,"active":true}, function(tab){
            chrome.cookies.getAll({"url":tab[0].url},function(cookie){
            	console.log("sgsdf");
				//get all cookies related to current tab
				allCookieInfo = [];
				for(i=0;i<cookie.length;i++){
					allCookieInfo.push(cookie[i]);
				}
				element.cookies = allCookieInfo;
				if(loginInfo == true){
					cookieInfoJSON["after_login"] = element;
				}else{
					cookieInfoJSON["before_login"] = element;
					cookieInfoJSON["after_login"] = {};
					
				}
				updateCookies(cookieInfoJSON);
				localdb.updateSetting();
				printCookies(cookieInfoJSON);
//				$("#cookieInfo").addClass('hide');
//				$("#cookieInfo").html("Cookies Before Login:</br>" + JSON.stringify(cookieInfoJSON["Cookies before login"]) +"</br></br>" + "Cookies After Login:</br>" + JSON.stringify(cookieInfoJSON["Cookies after login"]));
//				$("#cookieInfo").removeClass('hide');
//				jsonOutput($(".cookie-json"), cookieInfoJSON);
            });  
    });
    
}

function printCookies(cookieInfoJSON){
	$("#cookieInfo").addClass('hide');
	$("#cookieInfo").html("Cookies Before Login:</br>" + JSON.stringify(cookieInfoJSON["before_login"]) +"</br></br>" + "Cookies After Login:</br>" + JSON.stringify(cookieInfoJSON["after_login"]));
	$("#cookieInfo").removeClass('hide');
	jsonOutput($(".cookie-json"), cookieInfoJSON);
}
function getHeaders() {
	//var element = {};
	//element.login = false;
	if(loginInfo == true){
		//if user is logged in retrieve header information before login
		
		headerInfo = finalJsonOutput['headerInfo'];
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
	if(loginInfo == true){
		headerInfo['after_login'] = parsedResHeader;
	}else{
		headerInfo['before_login']= parsedResHeader;
		headerInfo['after_login'] = {};		
		//if user is not looged in then store the currently fetched header information into local storage
		//localStorage.setItem("headerInfo",respheaders);
	}
	updateHeaders(headerInfo);
	localdb.updateSetting();
	printHeaders(headerInfo);
}

function printHeaders(headerInfo){
	$("#headers").html("Headers Before Login:</br>" + convertHeaderJsonToString(headerInfo['before_login']) +"</br></br>" + "Headers After Login:</br>" + convertHeaderJsonToString(headerInfo['after_login']) );
	$("#headers").removeClass('hide');
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
 
function convertHeaderJsonToString(headerInfo){
	headers = "";
	$.each( headerInfo, function( key, value ) {
		headers += key + ": " + value + "\n";
	});
	return headers;
}
