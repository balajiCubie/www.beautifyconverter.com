function onTagChange(){
	if($("#htmlTag").val() == "custom"){
		$("#pTag").removeClass("hide");
		$("#bTag").removeClass("hide");
		$("#beautify_css").click();
	}
	else{
		$("#pTag").addClass("hide");
		$("#bTag").addClass("hide");
		$("#beautify_css").click();
	}
}
	$(document).ready(function(e) {
	function setTheme() {
		theme = $.trim($("#themes").val());
		font_size = $.trim($("#font_size").val());

		editorAce1.setTheme("ace/theme/" + theme);
		$("#code1").css({"font-size" : (font_size + "px")});
		editorAce1.setOptions({
			enableBasicAutocompletion : true,
			enableSnippets : true,
			enableLiveAutocompletion : true
		});

		editorAce2.setTheme("ace/theme/" + theme);
		$("#code2").css({"font-size" : (font_size + "px")});
		editorAce2.setOptions({
			enableBasicAutocompletion : true,
			enableSnippets : true,
			enableLiveAutocompletion : true
		});
	}

	function show_msg(msg, type)
	{
		if(type == "info")
		{
			$("#msg").html('<span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>&nbsp;' + msg).removeClass("text-danger")
			.addClass("text-info");
			$("#msg_modal").modal({backdrop : false});
		}else if(type == "error")
		{
			$("#msg").html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;' + msg).removeClass("text-info")
			.addClass("text-danger");
			$("#msg_modal").modal({backdrop : false});
		}
	}

	ace.require("ace/ext/language_tools");
	var editorAce1 = ace.edit("code1");
	editorAce1.focus();
	editorAce1.setOptions({
		enableBasicAutocompletion: true,
		enableSnippets: true,
		enableLiveAutocompletion: true
	});
	editorAce1.getSession().setUseWrapMode(true);
    editorAce1.setTheme("ace/theme/monokai");
    editorAce1.getSession().setMode("ace/mode/text");

	var editorAce2 = ace.edit("code2");
	editorAce2.setOptions({
		enableBasicAutocompletion: true,
		enableSnippets: true,
		enableLiveAutocompletion: true
	});
    editorAce2.setTheme("ace/theme/monokai");
    editorAce2.getSession().setMode("ace/mode/html");

	$("#clear").click(function(e) {
    	e.preventDefault();
		editorAce1.setValue("");
		editorAce2.setValue("");
    });

	$("#clear_code1,#clear_code2").click(function(e) {
        e.preventDefault();
		if($(this).is("#clear_code1"))
		{
			editorAce1.setValue("");
		}else
		{
			editorAce2.setValue("");
		}
    });

	$("#copy_data1").click(function(e) {
	    var sel = editorAce1.selection.toJSON(); // save selection
	    editorAce1.selectAll();
	    editorAce1.focus();
	    document.execCommand('copy');
	    editorAce1.selection.fromJSON(sel); // restore selection
    });
	
	$("#copy_data2").click(function(e) {
	    var sel = editorAce2.selection.toJSON(); // save selection
	    editorAce2.selectAll();
	    editorAce2.focus();
	    document.execCommand('copy');
	    editorAce2.selection.fromJSON(sel); // restore selection
    });

	$("#download").click(function(e) {
        e.preventDefault();
		data = $.trim(editorAce2.getValue());
		if(data == "")
		{
			show_msg("The result is empty!", "error");
			return false;
		}
		blob = new Blob(["" + data + ""], {
			type : "text/plain;charset=utf-8"
		});
		saveAs(blob, "data.html");
    });

	$("#max_code1").click(function(e) {
        e.preventDefault();
		if(!$(this).is(".maximized"))
		{
			$(this).addClass("maximized");
			$("div.buttons_div,div.div_code2").hide();
			$("#code1").css({"width" : "100%"});
			$("div.div_code1").removeClass("col-md-5").addClass("col-md-12");
			$(this).find("span").removeClass("glyphicon-fullscreen").addClass("glyphicon-resize-small");
			$("#zclip-ZeroClipboardMovie_1").css({"left" : ($("#copy_data1").position().left - 5) + "px", "top" : $("#copy_data1").position().top + "px"});
			$(this).attr("title", "minimize");
			editorAce1.resize();
			editorAce2.resize();
		}else
		{
			$(this).removeClass("maximized");
			$("div.div_code1").removeClass("col-md-12").addClass("col-md-5");
			$("#code1").css({"width" : "100%"});
			$("div.buttons_div,div.div_code1,div.div_code2").show();
			$(this).find("span").removeClass("glyphicon-resize-small").addClass("glyphicon-fullscreen");
			$("#zclip-ZeroClipboardMovie_1").css({"left" : ($("#copy_data1").position().left - 5) + "px", "top" : $("#copy_data1").position().top + "px"});
			$(this).attr("title", "maximize");
			editorAce1.resize();
			editorAce2.resize();
		}
    });

	$("#max_code2").click(function(e) {
        e.preventDefault();
		if(!$(this).is(".maximized"))
		{
			$(this).addClass("maximized");
			$("div.buttons_div,div.div_code1").hide();
			$("#code2").css({"width" : "100%"});
			$("div.div_code2").removeClass("col-md-5").addClass("col-md-12");
			$(this).find("span").removeClass("glyphicon-fullscreen").addClass("glyphicon-resize-small");
			$("#zclip-ZeroClipboardMovie_2").css({"left" : ($("#copy_data2").position().left - 5) + "px", "top" : $("#copy_data2").position().top + "px"});
			$(this).attr("title", "minimize");
			editorAce1.resize();
			editorAce2.resize();
		}else
		{
			$(this).removeClass("maximized");
			$("div.div_code2").removeClass("col-md-12").addClass("col-md-5");
			$("#code2").css({"width" : "100%"});
			$("div.buttons_div,div.div_code1,div.div_code2").show();
			$(this).find("span").removeClass("glyphicon-resize-small").addClass("glyphicon-fullscreen");
			$("#zclip-ZeroClipboardMovie_2").css({"left" : ($("#copy_data2").position().left - 5) + "px", "top" : $("#copy_data2").position().top + "px"});
			$(this).attr("title", "maximize");
			editorAce1.resize();
			editorAce2.resize();
		}
    });

	$("#code1").resizable({
		handles: 's',
		alsoResize: "#code2",
    	resize: function(event, ui) {
    		editorAce1.resize();
			editorAce2.resize();
    	}
	});

	$("#code2").resizable({
		handles: 's',
		alsoResize: "#code1",
    	resize: function(event, ui) {
    		editorAce1.resize();
			editorAce2.resize();
    	}
	});

	$("#wrapmode").click(function(e) {
        e.preventDefault();
        if(!$(this).is(".wrapon"))
		{
			$(this).addClass("wrapon");
			editorAce1.getSession().setUseWrapMode(false);
			editorAce2.getSession().setUseWrapMode(false);
			$("#wrapmode").text("Cancel Wrap");
		}else
		{
			$(this).removeClass("wrapon");
			editorAce1.getSession().setUseWrapMode(true);
			editorAce2.getSession().setUseWrapMode(true);
			$("#wrapmode").text("Smart Wrap");
		}
    });

	$(window).resize(function(e) {
        $("#code1,#code2").css({"width" : "100%"});
    });

	$("#sample").click(function(e) {
        e.preventDefault();
		data = "txt";
		editorAce1.getSession().setUseWorker(false);
		editorAce1.setValue("Please wait ...");
		$.ajax({
			type	: "POST",
			url		: "get-sample.php",
			data	: {"data" : data},
			success : function(data)
			{
				editorAce1.getSession().setUseWorker(true);
				editorAce1.setValue(data);
				$("#convert").click();
			},
			error 	: function()
			{
				editorAce1.getSession().setUseWorker(true);
				editorAce1.setValue("Connection lost. Try again!");
			}
		});
    });

	$("#load_url").click(function(e) {
        e.preventDefault();
		$("#url_modal").modal({backdrop : false});
    });

	$("#load").click(function(e) {
        e.preventDefault();
		url = $.trim($("#url").val());
		if(url != "")
		{
			editorAce1.getSession().setUseWorker(false);
			editorAce1.setValue("Please wait while loading file from url.");
			$.ajax({
				type	: "POST",
				url		: "get_data.php",
				dataType: "text",
				data	: {"url" : url},
				success : function(data)
				{
					if(data == "file_not_found")
					{
						editorAce1.setValue("Unable to load file from url!");
					}else
					{
						editorAce1.getSession().setUseWorker(true);
						editorAce1.setValue(data);
					}
				},
				error 	: function()
				{
					editorAce1.setValue("Unable to load file from url!");
				}
			});
		}
    });

	$("#browse").click(function(e) {
        e.preventDefault();
		$("#file").click();
    });

	function read_file(e)
	{
		f = e.target.files[0];
		if(f)
		{
			r = new FileReader();
			r.onload = function(e)
			{
				var contents = e.target.result;
				var file_name = f.name;
				editorAce1.getSession().setUseWorker(true);
				editorAce1.setValue(contents);
			}
			r.readAsText(f);
		}
		else
		{
			editorAce1.getSession().setUseWorker(false);
			editorAce1.setValue("Unable to load file!");
		}
	}

	$("#file").change(function(e) {
        e.preventDefault();
		read_file(e);
    });
	$("#convert").click(function(e) {
        e.preventDefault();
		data = $.trim(editorAce1.getValue());
		if(data != "")
		{
			var tabtitle = $( "#tabtitle" ).val();
			var fontsize = $( "#fontsize" ).val();
			var ht = $( "#htab" ).is( ":checked" );
			var htable = " ";
			var fontcolor= $("#fontcolor").val();
			if(ht){htable = 'p';}else{htable = 'l';}
			data = $.trim(editorAce1.getValue());
		    var doc = new jsPDF(htable, 'pt');
		    doc.setFontSize(20);
		    doc.text(tabtitle, 40, 60);
		    doc.setFontSize(fontsize);
		    color_array = hex2rgb(fontcolor);
		    doc.setTextColor(color_array.red, color_array.green, color_array.blue);
		    var text = doc.splitTextToSize(data + '.', doc.internal.pageSize.width - 80, {});
		    doc.text(text, 40, 80);
			document.getElementById("output").src = doc.output('datauristring');
		}
    });


	$("#preview").click(function(e) {
        e.preventDefault();
		if($.trim(editorAce2.getValue()) == "")
		{
			$("#convert").click();
		}
			var tabtitle = $( "#tabtitle" ).val();
			var fontsize = $( "#fontsize" ).val();
			var ht = $( "#htab" ).is( ":checked" );
			var htable = " ";
			if(ht){htable = 'p';}else{htable = 'l';}
			data = $.trim(editorAce1.getValue());
		    var doc = new jsPDF(htable, 'pt');
		    doc.setFontSize(18);
		    doc.text(tabtitle, 40, 60);
		    doc.setFontSize(fontsize);
		    doc.setTextColor(color_array.red, color_array.green, color_array.blue);
		    var text = doc.splitTextToSize(data + '.', doc.internal.pageSize.width - 80, {});
		    doc.text(text, 40, 80);
	    var f = guid();
	    doc.save(f+"pdf.pdf");
    });

	themelist = ace.require("ace/ext/themelist");
	theme = "";
	$(themelist.themes).each(function(key, value) {
		theme += '<option value="' + value.name + '">' + value.caption + '</option>';
    });
	$("#themes").append(theme);

	$("#themes").val("monokai");
	$("#font_size").val("14");

	$("#themes,#font_size").change(function(e) {
        setTheme();
		editorAce1.focus();
    });
});
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  //return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  return s4() + s4() + '-' + s4();
};
function onTagChange(){
		$("#convert").click();
};

function hex2rgb( hex_string ) {
	if( /^#/.test(hex_string)) {
		hex_string = hex_string.substr(1);
	}
	if(hex_string.length === 3 ) {
		hex_string = hex_string.replace(/\w/, function(match) {
	        return String(match) + String(match);
	    });
	}

	return {
		red      : parseInt(hex_string.substr(0, 2), 16),
		green    : parseInt(hex_string.substr(2, 2), 16),
		blue     : parseInt(hex_string.substr(4, 2), 16)
	};
};
