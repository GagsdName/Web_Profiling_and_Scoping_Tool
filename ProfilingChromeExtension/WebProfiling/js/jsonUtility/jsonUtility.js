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
	

}

function download_json(fileName) {

    technologies['Technology-list'] = appList;
	finalJsonOutput['cookie-info'] = cookieInfoJSON;
	finalJsonOutput['user-input'] = userInputMap;

    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(finalJsonOutput, null, 2));
    var downloadLink = document.getElementById('jsonDownloadLink');

    downloadLink.href = 'data:' + data;
    downloadLink.download = fileName+".json";

    downloadLink.click();

}

