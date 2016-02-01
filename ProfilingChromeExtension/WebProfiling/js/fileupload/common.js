var token;

function setSelectedItem(menuId,menuURL){
	var form = document.getElementById("viewFileForm");
	//alert('Token on Sidebar Request: '+ token);
	$('#token').val(token);
	//CSRF security solution
	//menuURL = menuURL;
	form.action = menuURL;
	form.submit();
}
