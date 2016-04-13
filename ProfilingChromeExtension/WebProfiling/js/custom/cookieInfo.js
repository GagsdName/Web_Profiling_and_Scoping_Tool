var cookieInfoJSON = {};

function cookieInfo() {
	var cookieElement = document.getElementById("getCookieInfo");
	if(cookieElement !== null){
		document.getElementById("getCookieInfo").addEventListener("click",getCookieInfo);	
	}else{
		var loginInfo = document.getElementById("login");
		loginInfo.addEventListener("click",clearLocalStorage);
	}
}

function clearLocalStorage(){
	localStorage.clear();
	console.log("Local Storage cleared");
	getCookieInfo();
}

function getCookieInfo(){
	var element = {};
	if(localStorage.getItem("cookieInfo") !== null){
		console.log("Local storage available");
		element.login = true;
		cookieInfoJSON['Cookies before login'] = JSON.parse(localStorage.getItem("cookieInfo"));
	}else{
		console.log("Local storage not available");
		element.login = false;
	}
    chrome.tabs.query({"status":"complete","windowId":chrome.windows.WINDOW_ID_CURRENT,"active":true}, function(tab){
            chrome.cookies.getAll({"url":tab[0].url},function(cookie){
				element.length = cookie.length;
				allCookieInfo = [];
				for(i=0;i<cookie.length;i++){
					allCookieInfo.push(cookie[i]);
				}
				element.cookies = allCookieInfo;
				console.log(element);
				localStorage.setItem("cookieInfo",JSON.stringify(element));
				console.log(localStorage.getItem("cookieInfo"));
				if(element.login == true){
					cookieInfoJSON['Cookies after login'] = element;
				}
            });
    });
}
  
window.addEventListener("load",cookieInfo);