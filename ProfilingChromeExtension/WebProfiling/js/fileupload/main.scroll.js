/*
 * jQuery File Upload Plugin JS Example 6.7
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*jslint nomen: true, unparam: true, regexp: true */
/*global $, window, document */

$(function () {
    'use strict';
    
    // Initialize the jQuery File Upload widget:
    $('#fileupload').fileupload();

    // Enable iframe cross-domain access via redirect option:
    $('#fileupload').fileupload(
        'option',
        'redirect',
        window.location.href.replace(
            /\/[^\/]*$/,
            '/cors/result.html?%s'
        )
    );

    // Load existing files:
    /*$('#fileupload').each(function () {
        var that = this;
        $.getJSON(this.action, function (result) {
            if (result && result.length) {
                $(that).fileupload('option', 'done')
                    .call(that, null, {result: result});
            }
        });
    });*/
    
    $('#fileupload').fileupload('option', {
        url: this.action,
        maxChunkSize: 4000000 , //4MB CHUNK
        maxFileSize: 50000000,  // 50 MB max file size
        //maxNumberOfFiles: 1,
        sequentialUploads: true,
        acceptFileTypes: /(\.|\/)(csv|CSV)$/i,
        process: [
            {
                action: 'load',
                fileTypes: /^text\/(txt|TXT)$/,
                //maxFileSize: 100000000 // 100MB
            },
            {
                action: 'resize',
                maxWidth: 1440,
                maxHeight: 900
            },
            {
                action: 'save'
            }
        ]
    });
    
    $('#fileupload')
    .bind('fileuploadcompleted', function (e, data) {
    	$('#file').removeAttr("disabled","disabled");
    	$('#closeButton').removeAttr("disabled","disabled");
    	$("#downloadLink").attr("onClick","");
    	dtTable.fnStandingRedraw();    	
   	});
    
    $('#fileupload')
    .bind('fileuploadfailed', function (e, data) {
    	$('#file').removeAttr("disabled","disabled");
    	$('#closeButton').removeAttr("disabled","disabled");
    	$("#downloadLink").attr("onClick","");
    });
    
    $('#fileupload')
    .bind('fileuploadsent', function (e, data) {
    	$('#file').attr("disabled","disabled");
    	$('#closeButton').attr("disabled","disabled");
    	$("#downloadLink").attr("onClick","return false");
    });
});
