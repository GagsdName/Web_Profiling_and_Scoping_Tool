var windowsLocation = "";
// Amruta - start
var userInputMap = new Object();
var quesAnsJson;

var activeProgress = {};
activeProgress['portscan'] = false;
activeProgress['hostinfo'] = false;
activeProgress['crawlerscan'] = false;

var activeScanStat = false;


$(document).ready(
		function() {			
			
			localdb.selectAll();
			initializeUserInputMap();
			
			 $("input:text").change(function (){
				 userInputMap[$(this).closest("div").find(".question").text().replace(/\t/g, '').replace(/\n/g, ' ')] = $(this).val();
				 localdb.updateSetting();
				 
			 });
			 
			$("input:radio").click(
					function() {
						
						if ($(this).hasClass("open-fs")) {
							if ($(this).hasClass("open-first")) {
								$(this).closest('.form-group').next()
										.removeClass('hide')
								$(this).closest('.form-group').next().next()
										.addClass('hide')
							} else if ($(this).hasClass("open-second")) {
								$(this).closest('.form-group').next().next()
										.removeClass('hide')
								$(this).closest('.form-group').next().addClass(
										'hide')
							}
						} else {
							if ($(this).hasClass("authType")) {
								$(".auth-type-questions").addClass('hide');
								if ($(this).attr("id") == "basic") {
									$(this).closest('.form-group').next()
											.removeClass('hide');
								} else if ($(this).attr("id") == "ntlm") {
									$(this).closest('.form-group').next()
											.removeClass('hide');
									$(this).closest('.form-group').next()
											.next().removeClass('hide');
								} else

								if ($(this).attr("id") == "sso") {
									$(this).closest('.form-group').next()
											.next().next().removeClass('hide');
								}
							} else {
								if ($(this).hasClass("open-yn")) {
									if ($(this).hasClass("open")) {
										$(this).closest('.form-group').next(
												'.specific-questions')
												.removeClass('hide');

									} else {
										$(this).closest('.form-group').next(
												'.specific-questions')
												.addClass('hide');
									}
								}
							}

						}
						
						userInputMap[$(this).closest("div").find(".question").text().replace(/\t/g, '').replace(/\n/g, ' ')] = $(this).val();
						localdb.updateSetting();

					});
			// Amruta - stop
			// Amruta - start
			$("#submit").click(
					function() {

						$('.form-json').removeClass('hide');
						jsonOutput($('.form-json'),userInputMap);
					});
			// Amruta - stop

			$.support.cors = true;
			$("#getOpenPorts").click(function() {
				testOpenPorts()
			});
			$("#getHostInfo").click(function() {
				getHostInfo()
			});

			$(".getHeaders").click(function() {
				getHeaders()
			});
			
			$("#getJsonData").click(function(){
				if($.trim($("#txtName").val()) == ""){
					$(".message-global").text("  *Please enter application name.");
					$(".message-global").removeClass("hide");
					setTimeout(hideGlobalMessage,3000);
					return false;
				}
				download_json($.trim($("#txtName").val()).replace(/ /g, '_'));

			});
			$("#startActiveScan").click(function(){

				if(!activeScanStat)	{
					activeScanStat = true;
					$("#startActiveScan").prop('value', 'Pause');
					activeProcess()
					$("#btnAddProfile").prop('value', 'Star Active Scan');
				}else {
					$("#startActiveScan").prop('value', 'Start');
			//activeProcess()
			//$("#btnAddProfile").prop('value', '');
				}
			});

			chrome.tabs.query({
				'active' : true,
				'windowId' : chrome.windows.WINDOW_ID_CURRENT
			}, function(tabs) {
				console.log(tabs[0].url);
				windowsLocation = tabs[0].url;
				$("#windowsLocation").html(tabs[0].url);

			});

			// json - add data

			queryForResults();
		});
		
function activeProcess()	{

	if(!activeProgress['hostinfo'])	{

		getHostInfo();
		activeProgress['hostinfo'] = true;

	}
	if(!activeProgress['portscan'])	{

		testOpenPorts();
		activeProgress['portscan'] = true;
	}
	/*if(!activeProgress['crawlerscan'])	{

	}*/

}


function testOpenPorts() {

	var hostUrl = $("#host").val()
	var gameData = {
		host : hostUrl
	};
	$("#openPorts").addClass('hide');

	$
			.ajax({
				type : "GET",
				url : "http://localhost:8080/WPST_Web_App/rest/profiling_service/get_available_ports",
				data : gameData,
				timeout : 100000,
				success : function(data) {

					console.log("SUCCESS");
					var test = data.openPorts;
					portInfo["open_ports"] = test;
					$("#openPorts").html("Open Ports : " + test);
					$("#openPorts").removeClass('hide');
				},
				error : function(e) {
					console.log("ERROR: ", e);

				},
				done : function(e) {
					console.log("DONE");
				}
			});

}

function getHostInfo() {

	var hostUrl = $("#host").val()
	var sData = {
		location : windowsLocation
	};
	$(".message-host").addClass("hide");
	$("#hostInfo").addClass('hide');

	$
			.ajax({
				type : "GET",
				url : "http://localhost:8080/WPST_Web_App/rest/profiling_service/getHost",
				data : sData,
				timeout : 100000,
				success : function(data) {

					console.log("SUCCESS");
					dnsMap = {};
					var result = "Host Info<br /> Domain : " + data.domain
							+ "<br /> IP Address : " + data.ip;				
					
					dnsMap["domain"]= data.domain;
					dnsMap["ip"]= data.ip;
					$.getJSON("http://ipinfo.io/" + data.ip,
							function(response) {
								var lats = response.loc.split(',')[0];
								var lngs = response.loc.split(',')[1];
								dnsMap["country"]= response.country;
								dnsMap["region"]= response.region;
								dnsMap["city"]= response.city;
								hostInfo = dnsMap;
								result += "<br/> Country : " + response.country
										+ "<br/> Region : " + response.region
										+ "<br/> City : " + response.city;
								$("#hostInfo").html(result);
								/*
								 * map = new GMaps({ el: '#map', lat: lats,
								 * //latitude lng: lngs //longitude });
								 */
								
								jsonOutput($(".host-json"), dnsMap);
								map = new GMaps({
									div : '#map',
									zoom : 15,
									lat : lats,
									lng : lngs
								});
								map.addMarker({
									lat : lats,
									lng : lngs
								});

							}, "jsonp");
					$("#map").removeClass('hide');
					$("#hostInfo").html(result);
					$("#hostInfo").removeClass('hide');
				},
				error : function(e) {
					$(".message-host").html("Error fetching DNS information. Error Status : " + e.status);
					$(".message-host").addClass("error");
					$(".message-host").removeClass("hide");
					console.log("ERROR: ", e);

				},
				done : function(e) {
					console.log("DONE");
				}
			});

}

function getHeaders() {

	var hostUrl = $("#host").val()
	var sData = {
		location : windowsLocation
	};

	$("#headers").addClass('hide');
	var req = new XMLHttpRequest();
	req.open('GET', windowsLocation, false);
	req.send(null);

	var respheaders = req.getAllResponseHeaders().toLowerCase();
	headerInfo['info'] = parseResponseHeaders(respheaders);
	$("#headers").html(respheaders);
	$("#headers").removeClass('hide');
	jsonOutput($(".header-json"), headerInfo['info']); 
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


function queryForResults() {
	chrome.tabs.query({
		active : true,
		currentWindow : true
	}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {
			getDetected : 1
		}, function(response) {
			if(response != undefined){
				show(response);
				//console.log(response);
			}
		});
	});
}

function show(retireJsResult) {
	$("#results").html("");
	console.log("results" + retireJsResult);
	
	if (null != results) {
		console.log("**************"+JSON.stringify(results));
		retirejsop = results;
		vulnerabilityInfo = results;
	}
	
	retireJsResult.forEach(function(rs) {
		console.log("rs" + rs);
		rs.results.forEach(function(r) {
			console.log("r" + r);
			r.url = rs.url;
			r.vulnerable = r.vulnerabilities && r.vulnerabilities.length > 0;
		});
	});
	var res = retireJsResult.reduce(function(x, y) {
		if(y.results.length > 1){
			y.results = y.results[0];
		}
		return x.concat(y.results);
	}, []);
	res
			.sort(function(x, y) {
				if (x.vulnerable != y.vulnerable) {
					return x.vulnerable ? -1 : 1
				}
				return (x.component + x.version).localeCompare(y.component
						+ y.version);
			});
	res.forEach(function(r) {
		var tr = document.createElement("tr");
		document.getElementById("results").appendChild(tr);
		td(tr).innerText = r.component;
		td(tr).innerText = r.version;
		var vulns = td(tr);
		vulns.innerHTML = "Found in " + r.url;
		if (r.vulnerabilities && r.vulnerabilities.length > 0) {
			tr.className = "vulnerable";
			vulns.innerHTML += "<br>Vulnerability info: ";
			var table = document.createElement("table");
			vulns.appendChild(table);
			r.vulnerabilities.forEach(function(v) {
				var tr = document.createElement("tr");
				table.appendChild(tr);
				td(tr).innerText = v.severity || "  ";
				console.log(v);
				td(tr).innerText = v.identifiers.summary;
				// ? v.identifiers.mapOwnProperty(function(val) { return val
				// }).flatten().join(" ") : " ";
				var info = td(tr);
				v.info.forEach(function(u, i) {
					var a = document.createElement("a");
					a.innerText = i + 1;
					a.href = u;
					a.title = u;
					a.target = "_blank";
					info.appendChild(a);
				});
			})
		}
	});
	jsonOutput($(".vulnerability-json"), res);
}

function td(tr) {
	var cell = document.createElement("td");
	tr.appendChild(cell);
	return cell;
}

/*
 * Object.prototype.forEachOwnProperty = function(f) { mapOwnProperty(f); };
 * Object.prototype.mapOwnProperty = function(f) { var results = []; for(var i
 * in this) { if (this.hasOwnProperty(i)) results.push(f(this[i], i)); } return
 * results; }; Array.prototype.flatten = function(){ var result = [];
 * this.forEach(function(x) { result = result.concat(x); }); return result; };
 */

function sendMessage(message, data, callback) {
	chrome.extension.sendRequest({
		to : 'background',
		message : message,
		data : data
	}, function(response) {
		callback && callback(response)
	});
}

function initializeUserInputMap(){
	
	$('.form-group').find('.question')
	.each(
			function() {

				if ($(this).next('input').is(
						'input:text')) {
					userInputMap[$(this).text().replace(/\t/g, '').replace(/\n/g, ' ')] = $(this)
							.next('input').val();

				} else if ($(this).next('input')
						.is('input:radio')) {
					currQues = $(this).text().replace(/\t/g, '').replace(/\n/g, ' ');
					$(this).nextAll('input').each(function(){
					    if ($(this).is(':checked'))  {
					    	userInputMap[currQues] = $(this).val();
					    }
					});
				};

			});
}

function hideGlobalMessage(){
	$(".message-global").addClass("hide");
}