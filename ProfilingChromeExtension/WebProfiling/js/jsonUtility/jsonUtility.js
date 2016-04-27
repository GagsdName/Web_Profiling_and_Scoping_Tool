/**
 * Created by Abhijit on 3/24/2016.
 */
var finalJsonOutput = {};
var hostInfo = {};
var portInfo = {};
var hostInfo = {};
var headerInfo = {};
var technologies = {};
var vulnerabilityInfo = {};
var cookieInfo = {};
var userIp = {};
finalJsonOutput['hostInfo'] = hostInfo;
finalJsonOutput['portInfo'] = portInfo;
finalJsonOutput['headerInfo'] = headerInfo;
finalJsonOutput['vulnerabilityInfo'] = vulnerabilityInfo;
finalJsonOutput['technologies-used'] = technologies;
finalJsonOutput['cookie-info'] = cookieInfo;
finalJsonOutput['user-input'] = userIp;
//var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));

function reset() {

    finalJsonOutput = {};
    hostInfo = {};
    portInfo = {};
    headerInfo = {};
    vulnerabilityInfo = {};

    finalJsonOutput['hostInfo'] = hostInfo;
    finalJsonOutput['portInfo'] = portInfo;
    finalJsonOutput['headerInfo'] = headerInfo;
    finalJsonOutput['vulnerabilityInfo'] = vulnerabilityInfo;
    finalJsonOutput['technologies-used'] = technologies;
    finalJsonOutput['cookie-info']={};
	

}

function download_json(fileName) {

	json = convertHTMLtoJson($(".wap-json"), "Wap");//appList;
	if(!json) return false;
	finalJsonOutput['technologies-used'] = json;
    
    json = convertHTMLtoJson($(".cookie-json"), "Cookie");
	if(!json) return false;
	finalJsonOutput['cookie-info'] = json;
	
	json = convertHTMLtoJson($(".vulnerability-json"), "Vulnerability");
	if(!json) return false;
	finalJsonOutput['vulnerabilityInfo'] = json;
	
	json = convertHTMLtoJson($(".user-input-json"), "User Input");//userInputMap;
	if(!json) return false;
	finalJsonOutput['user-input'] = json;
	
	json = convertHTMLtoJson($(".header-json"), "Header");
	if(!json) return false;
	finalJsonOutput['headerInfo'] = json;
	
    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(finalJsonOutput, null, 2));
    var downloadLink = document.getElementById('jsonDownloadLink');

    downloadLink.href = 'data:' + data;
    downloadLink.download = fileName+".json";

    downloadLink.click();

}

function convertHTMLtoJson(curEle, tab){
	json = "";
	curEle.find('div').each(function(){
		json += $(this).text();
	});
	try
    {
            json = $.parseJSON(json);
    }
    catch(err)
    {
    	if($.trim(json) != ""){
	    	$(".message-global").text("  *Enter valid json data in " + tab + " tab.");
			$(".message-global").removeClass("hide");
			setTimeout(hideGlobalMessage,3000);
			return false;
    	}else{
    		return [];
    	}
    	
    }
	return json; 
}

