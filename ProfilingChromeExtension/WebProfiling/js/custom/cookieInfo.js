var cookieInfoJSON = {};
var cookies = [];
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
	getCookieInfo();
}

function getCookieInfo(){
	var element = {};
	if(localStorage.getItem("cookieInfo") !== null){
		element.login = true;
		cookies.push(localStorage.getItem("cookieInfo"));
		cookieInfoJSON['Cookies before login'] = JSON.parse(localStorage.getItem("cookieInfo"));
		
	}else{
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
				
				localStorage.setItem("cookieInfo",JSON.stringify(element));
				if(element.login == true){
					cookies.push(JSON.stringify(element));
					cookieInfoJSON['Cookies after login'] = element;
					jsonOutput($(".cookie-json"), cookieInfoJSON);
					
				}
				 	$("#cookieInfo").addClass('hide');
					$("#cookieInfo").html(cookies[0] + "</br></br>" + cookies[1]);
					$("#cookieInfo").removeClass('hide');
            });
           
    });
    
}
  
window.addEventListener("load",cookieInfo);