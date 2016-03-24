<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<script src="js/jquery.js"></script>

<script>
function testOpenPorts()	{

	var hostUrl = $("#host").val()
	var gameData = {
			host : hostUrl
		};

	$.ajax({
		type : "GET",
		url : "http://localhost:8080/WPST_Web_App/rest/profiling_service/get_available_ports",
		data : gameData,
		timeout : 100000,
		success : function(data) {
			
			console.log("SUCCESS");	
			var test = data.openPorts;
			console.log("Open Ports : "+test);
						
		},
		error : function(e) {
			console.log("ERROR: ", e);
			
		},
		done : function(e) {
			console.log("DONE");
		}
	});
	
	

}

function getHeaders(){
		var req = new XMLHttpRequest();
		req.open('GET', document.location, false);
		req.send(null);
		var respheaders = req.getAllResponseHeaders().toLowerCase();
		//var reqheaders = req.getAllRequestHeaders().toLowerCase();
		console.log(respheaders);
		//console.log(reqheaders);	
}

</script>

</head>
<body>


Host : <input type = "text" id = "host" />
<button value="Get Open Ports" onclick="testOpenPorts()">Get Open Ports</button><br>
<button value="Get Headers" onclick="getHeaders()">Get Headers</button>
</body>
</html>