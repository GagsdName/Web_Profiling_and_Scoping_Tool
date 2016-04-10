var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  }
function jsonOutput(jsonTag, obj) 
{
	str = JSON.stringify(obj, undefined, 2);
	str = syntaxHighlight(str);
	
	jsonTag.html(str);
	$(".add").mousedown(function(){
		var spaces = $(this).text();
		spaces = spaces.substr(0,spaces.indexOf('"'));
		$(this).nextAll('.add:first').before('<div class="newly-added">'+spaces+'<input class="key form-control" type="text" placeholder="Enter">:<input type="text" class="value form-control" placeholder="Enter"><input type="button" class="btn btn-primary add-new" value="Add"/>,</div');
		
		$(".add-new").click(function(){
			$(this).closest('div').find('.key').replaceWith('"'+$(this).closest('div').find('.key').val()+'"');
			$(this).closest('div').find('.value').replaceWith(' "'+$(this).closest('div').find('.value').val()+'"');
			$(this).val("Remove");
			$(this).removeClass("add-new");
			$(this).addClass("remove");
			$(".remove").click(function(){
				$(this).closest('div').remove();
			});
		});
		
	});
}


function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	var i=0;
	var html = "";
	var lines = json.split("\n");
	$.each(lines, function(){
		html += '<div class="add">' + this + '</div>';
	});
	return html;
    /*return json.replace(/("(\\u[a-zA-Z0-9[]]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
		i++;
        return '<span id ="'+ i +'" class="add ' + cls + '">' + match + '</span>';
    });*/
	
}

