$(document).ready(function(){
	var token=$("meta[name='_csrf']").attr("content");
	var header=$("meta[name='_csrf_header']").attr("content");
	
	$(document).ajaxSend(function(e,xhr,options){
		
		xhr.setRequestHeader(header,token);
	});
	
	//disable copy-paste starts
	var ctrlDown = false;
    var ctrlKey = 17, vKey = 86, cKey = 67;

    $(document).keydown(function(e)
    {
        if (e.keyCode == ctrlKey){
        	ctrlDown = true;
        }
    }).keyup(function(e)
    {
        if (e.keyCode == ctrlKey){
        	ctrlDown = false;
        }
    });

    $(".no-copy-paste").keydown(function(e)
    {
        if (ctrlDown && (e.keyCode == vKey || e.keyCode == cKey)) 
        	return false;
    });
    //disable copy-paste ends
	
	$(document).keyup(function(e){
		if(e.which==13){
			if($(".enter-control").is(":focus")||$(document.activeElement).hasClass("enter-control")){
				
				$(".btn-search").trigger("click");
			}
		}
	});
	
	$(".modal .modal-body .modal-enter-control").keyup(function(e){
		if(e.which==13){
			$(".modal .modal-footer .trigger-action-on-enter:not(.hide)").trigger("click");
		}
	});
	
	$(".typeahead li:last").on("change",function(){
		
		if($(this).hasClass("active")){
			$(this).removeClass("active");
			$(".auto-complete-typeahead li:first").addClass("active");
		}
	});
	
	var isFromToken=false;
	var scrollDownByItems=null;
	var indexChange=null;
	var downCounter=0;
	
	$(".icon-calendar").click(function(){
		$(this).next().click();
	});
	
	$(".info").tooltip();
	$(".delete-col").tooltip();
	$(".ScheduledDateinfo").tooltip();
	$("#remove_scheduled_date").tooltip();
	
	$(".table").on("DOMNodeInserted",function(event){
		$(".info").tooltip();
		$(".delete-col").tooltip();
		
		$(".dataTables_wrapper").on("DOMNodeInserted",function(){
			$(".dataTables_wrapper").find(".row").each(function(){
				$(this).removeClass("row");
				$(this).addClass("row-fluid");
			});
		});
	});
	
	$(".auto-complete-typeahead").keydown(function(e){
		
		if($(this).next(".typeahead").is(":visible")){
			
			var container=$(this).next(".typeahead");
			var element=container.find(".active");
			isFromToken=false;
			indexChange=1;
			scrollDownByItems=parseInt(container.height()/element.height(),10)-1;
			manualScroll(e,container,element);
		}
	});

	$(document).on("keyup",".token-input-list-facebook, .token-input-dropdown-facebook",function(e){
		
		var container=$(".token-input-dropdown-facebook");
		if(container.length>0){
			var element=$(".token-input-selected-dropdown-item-facebook");
			
			if(element.length>0){
				isFromToken=true;
				
				scrollDownByItems = parseInt((container.height()-$(".token-input-list-facebook").height())/element.height(),10)-1;
				
				manualScroll(e,container,element);
			}
		}
	});

	function manualScroll(e,container,element){
		if(e.keyCode==38){
			
			if(element.offset().top-container.offset().top<element.height()){
				
				if(isFromToken){
					container.scrollTop((element.index())*(element.height()+6));
				}else{
					container.scrollTop((element.index()-indexChange)*element.height());
				}
			}
		}
		
		if(e.keyCode==40){
			if(element.is(":last-child")){
				container.scrollTop(0);
			}else{
				downCounter++;
				
				if(element.offset().top-container.offset().top>(container.height()-element.height())){
					if(isFromToken){
						container.scrollTop((element.height()+6)*(element.index()-scrollDownByItems));
					}else{
						container.scrollTop((element.height())*(element.index()-scrollDownByItems));
					}
				}
			}
		}
	}
});

function blockUI(){
	$.blockUI({
		overlayCSS:{backgroundColor:"#000"}
	});
	
	$(".loading").removeClass("hide");
	$(".loading").show();
}

function unblockUI(){
	setTimeout($.unblockUI,1);
	$(".loading").addClass("hide");
	$(".loading").hide();
}

function showPopup(left, overlayDiv){	
	$("body, html").css("overflow-x","");
	$("body, html").css("overflow","hidden");
	
	currentOverlay = ".overlay-body";
	if(overlayDiv != undefined){
		currentOverlay = "#"+overlayDiv; 
	}
	
	
	$(currentOverlay+", .overlay").removeClass("hide");
	
	if(left==undefined){
		var leftVal=JSON.stringify(20)+"%";
	}else{
		var leftVal=JSON.stringify(left)+"%";
	}
	
	var width=JSON.stringify(100-left)+"%";
	if(!jQuery.browser.mobile){
		$(currentOverlay).animate({left:leftVal});
		$(currentOverlay).width(width);
		$(currentOverlay+" .file-name-header").width(width);
	}else{
		$(currentOverlay).animate({left:'0%'});
		$(currentOverlay).width('100%');
		$(currentOverlay+" .file-name-header").width('100%');
	}
	
	$(".overlay").fadeIn();
	$(".tab-close").fadeIn();
}

function hidePopup(){
	$(".overlay-body").animate({left:"100%"});
	$(".overlay").fadeOut();
	$(".tab-close").fadeOut();
	$(".container").fadeOut();
	$("body, html").css("overflow","");
	$("body, html").css("overflow-x","hidden !important");
}

function toggleList(curAuthTypeLabel,authTypeVal){
	
	curAuthTypeLabel.nextAll("li."+authTypeVal).slideToggle();
}

$("#close").click(function(){
	hidePopup();
});

$("#help, .fa-book").on('click' ,function(){
	$("#docContentDiv").removeClass("hide");
	$("#stepsDiv").addClass("hide");
	showPopup(40, $("#docContentDiv").parent().closest('div').attr('id'));
});

$(".tab-close, .overlay").click(function(){
	hidePopup();
});

$("#steps").on('click' ,function(){
	$("#stepsDiv").removeClass("hide");
	$("#docContentDiv").addClass("hide");
});

$("#stepBackButton").on('click' ,function(){
	$("#docContentDiv").removeClass("hide");
	$("#stepsDiv").addClass("hide");
});