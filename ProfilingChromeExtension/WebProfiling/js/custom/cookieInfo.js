var cookieInfoJSON = {};
var cookies = [];
/*function cookieInfo() {
	//var cookieElement = document.getElementById("getCookieInfo");
	if(cookieElement !== null){
		document.getElementById("getCookieInfo").addEventListener("click",getCookieInfo);	
	}else{
		var loginInfo = document.getElementById("login");
		loginInfo.addEventListener("click",clearLocalStorage);
	}
}

function clearLocalStorage(){
	localStorage.clear();
	getCookieInfo();
}*/

function getCookieInfo(){
	var element = {};
    if(localStorage.getItem('cookieInfo') !== null){
		console.log("Session storage defined");
		element.login = true;
	}else{
		console.log("Session storage undefined");
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
				if(element.login == true){
					console.log("Login true");
					cookies.push(JSON.stringify(element));
					cookieInfoJSON['Cookies after login'] = element;
					jsonOutput($(".cookie-json"), cookieInfoJSON);
					$("#cookieInfo").addClass('hide');
					$("#cookieInfo").html(cookies[0] + "</br></br>" + cookies[1]);
					$("#cookieInfo").removeClass('hide');
				}else{
					console.log("Login false");
					localStorage.setItem('cookieInfo',JSON.stringify(element));
					cookies.push(localStorage.getItem("cookieInfo"));
					cookieInfoJSON['Cookies before login'] = JSON.parse(localStorage.getItem('cookieInfo'));
					jsonOutput($(".cookie-json"), cookieInfoJSON);
					$("#cookieInfo").addClass('hide');
					$("#cookieInfo").html(cookies[0]);
					$("#cookieInfo").removeClass('hide');
				}
            });
           
    });
    
}
  
window.addEventListener("load",getCookieInfo);