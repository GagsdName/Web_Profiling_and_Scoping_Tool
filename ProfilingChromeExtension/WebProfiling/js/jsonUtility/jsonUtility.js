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
finalJsonOutput['hostInfo'] = hostInfo;
finalJsonOutput['portInfo'] = portInfo;
finalJsonOutput['headerInfo'] = headerInfo;
finalJsonOutput['vulnerabilityInfo'] = vulnerabilityInfo;
finalJsonOutput['technologies-used'] = technologies;

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

    //var wapData = document.getElementsByName("wapJson").value;
    console.log("APP List"+JSON.stringify(appList));
    technologies['List'] = appList;

    console.log(JSON.stringify(finalJsonOutput));
    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(finalJsonOutput));
    var downloadLink = document.getElementById('jsonDownloadLink');

    downloadLink.href = 'data:' + data;
    downloadLink.download = fileName+".json";

    downloadLink.click();

}

