function cookieInfo() {
    document.getElementById("getCookieInfo").addEventListener("click",getCookieInfo);
}

function getCookieInfo(){
    chrome.tabs.query({"status":"complete","windowId":chrome.windows.WINDOW_ID_CURRENT,"active":true}, function(tab){
			var x = document.getElementById("login").checked;
			var cookieInfoData = '{"Login": '+ x + ',';
            chrome.cookies.getAll({"url":tab[0].url},function(cookie){
				cookieInfoData = cookieInfoData + '"Cookie Length": '+ cookie.length + ',';
				allCookieInfo = "";
				if(cookie.length > 0){
					allCookieInfo = JSON.stringify(cookie[0]);
					for(i=1;i<cookie.length;i++){
						allCookieInfo = allCookieInfo + ',' + JSON.stringify(cookie[i]);
					}
				}
				cookieInfoData = cookieInfoData + '"Cookies": [' + allCookieInfo + ']}';
				var cookieObj = JSON.parse(cookieInfoData);
                localStorage.currentCookieInfo = cookieObj;
				console.log(cookieObj);
            });
    });
}
  
window.addEventListener("load",cookieInfo);
