var windowsLocation = "";
// Amruta - start
var map = new Object();
var quesAnsJson;

$(document).ready(
		function() {

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

					});
			// Amruta - stop
			// Amruta - start
			$("#submit").click(
					function() {
						$('.form-group').find('label')
								.each(
										function() {

											if ($(this).next('input').is(
													'input:text')) {
												map[$(this).text()] = $(this)
														.next('input').val();

											} else if ($(this).next('input')
													.is('input:radio')) {
												map[$(this).text()] = $(this)
														.next('input:checked')
														.val();

											}
											;

										})

										$('.form-json').removeClass('hide');
										jsonOutput($('.form-json'),map);
					});
			// Amruta - stop

			$.support.cors = true;
			$("#getOpenPorts").click(function() {
				testOpenPorts()
			});
			$("#getHostInfo").click(function() {
				getHostInfo()
			});

			$("#getHeaders").click(function() {
				getHeaders()
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

function testOpenPorts() {

	var hostUrl = $("#host").val()
	var gameData = {
		host : hostUrl;
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
	$("#hostInfo").addClass('hide');

	$
			.ajax({
				type : "GET",
				url : "http://localhost:8080/WPST_Web_App/rest/profiling_service/getHost",
				data : sData,
				timeout : 100000,
				success : function(data) {

					console.log("SUCCESS");

					var result = "Host Info<br /> Domain : " + data.domain
							+ "<br /> IP Address : " + data.ip;
					$.getJSON("http://ipinfo.io/" + data.ip,
							function(response) {
								var lats = response.loc.split(',')[0];
								var lngs = response.loc.split(',')[1];
								result += "<br/> Country : " + response.country
										+ "<br/> Region : " + response.region
										+ "<br/> City : " + response.city;
								$("#hostInfo").html(result);
								/*
								 * map = new GMaps({ el: '#map', lat: lats,
								 * //latitude lng: lngs //longitude });
								 */
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
	$("#headers").html(respheaders);
	$("#headers").removeClass('hide');

}

function queryForResults() {
	chrome.tabs.query({
		active : true,
		currentWindow : true
	}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {
			getDetected : 1
		}, function(response) {
			show(response);
			console.log(response);
		});
	});
}

function show(retireJsResult) {
	$("#results").html("");
	console.log("results" + retireJsResult);
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