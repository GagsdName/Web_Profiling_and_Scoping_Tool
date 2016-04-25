//Author: Pranav Pande
//This function calls popup to get user input on whether user is logged or not in the application
function loginCookie(){
	$('#loginModal').modal('show');
}

window.addEventListener("load",loginCookie);