function cookieInfo() {
    document.getElementById("getCookieInfo").addEventListener("click",getCookieInfo);
}

function getCookieInfo(){
    chrome.tabs.query({"status":"complete","windowId":chrome.windows.WINDOW_ID_CURRENT,"active":true}, function(tab){
            //console.log(JSON.stringify(tab));
			var x = document.getElementById("login").checked;
			console.log(x);
            chrome.cookies.getAll({"url":tab[0].url},function(cookie){
                console.log(cookie.length);
                allCookieInfo = "";
                for(i=0;i<cookie.length;i++){
                    console.log(JSON.stringify(cookie[i]));
                    allCookieInfo = allCookieInfo + JSON.stringify(cookie[i]);
                }
                localStorage.currentCookieInfo = allCookieInfo;
            });
    });

}
  
window.addEventListener("load",cookieInfo);
