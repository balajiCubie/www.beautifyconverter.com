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
    editorAce1.setTheme("ace/theme/monokai");
    editorAce1.getSession().setMode("ace/mode/json");
	
	$("#clear").click(function(e) {
    	e.preventDefault();
		editorAce1.setValue("");
    });
	
	$("#code1").resizable({
		handles: 's',
    	resize: function(event, ui) {
    		editorAce1.resize();
    	}
	});
	
	$(window).resize(function(e) {
        $("#code1").css({"width" : "100%"});
    });
	
	$("#browse").click(function(e) {
        e.preventDefault();
		$("#file").click();
    });
	
	$("#download").click(function(e) {
        e.preventDefault();
		data = $.trim(editorAce1.getValue());
		if(data == "")
		{
			show_msg("The editor is empty!", "error");
			return false;
		}
		blob = new Blob(["" + data + ""], {
			type : "text/plain;charset=utf-8"
		});
		saveAs(blob, "data.txt");
    });
	
	$("#beautify_json").click(function(e) {
        e.preventDefault();
		data = $.trim(editorAce1.getValue());
		if(data != "")
		{
			try{
				editorAce1.setValue(vkbeautify.json(data, 4));
			}catch(e){}
		}
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
	
	function to_json(workbook) {
		var result = {};
		workbook.SheetNames.forEach(function(sheetName) {
			var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
			if(roa.length > 0){
				result[sheetName] = roa;
			}
		});
		return result;
	}
	
	function handleFile(e) {
		var files = e.target.files;
		var i, f;
		for (i = 0, f = files[i]; i != files.length; ++i) {
			var reader = new FileReader();
			var name = f.name;
			reader.onload = function(e) {
				try {
					var data = $.trim(e.target.result);
	
					var workbook = XLSX.read(data, {
						type: 'binary'
					});
					editorAce1.getSession().setUseWorker(true);
					editorAce1.setValue(vkbeautify.json(to_json(workbook), 4));
				} catch (e) {
					if(name.split(".").pop() == "csv")
					{
						editorAce1.setValue(vkbeautify.json(CSV2JSON(data), 4));
					}else
					{
						editorAce1.getSession().setUseWorker(false);
						editorAce1.setValue("Please select an excel file.");
					}
				}
			};
			reader.readAsBinaryString(f);
		}
	}
	
	$("#file").change(function(e) {
        e.preventDefault();
		editorAce1.setValue("Please wait while loading your file.");
		handleFile(e);
    });
	
	$("#convert").click(function(e) {
        e.preventDefault();
		if($.trim($("#file").val()) == "")
		{
			editorAce1.getSession().setUseWorker(false);
			editorAce1.setValue("Please select an excel file first.");
		}else
		{
			$("#file").change();
		}
    });
});