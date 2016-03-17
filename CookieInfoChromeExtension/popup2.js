function cookieinfo(){
    chrome.cookies.getAll({},function (cookie){
        console.log(cookie.length);
        allCookieInfo = "";
        for(i=0;i<cookie.length;i++){
            console.log(JSON.stringify(cookie[i]));

            allCookieInfo = allCookieInfo + JSON.stringify(cookie[i]);
        }
        localStorage.allCookieInfo = allCookieInfo;
    });
}
window.onload=cookieinfo;