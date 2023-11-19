$(document).ready(function(e) {
	ace.require("ace/ext/language_tools");
	var editorAce1 = ace.edit("code1");
	editorAce1.focus();
	editorAce1.setOptions({
		enableBasicAutocompletion: true,
		enableSnippets: true,
		enableLiveAutocompletion: true
	});
    editorAce1.setTheme("ace/theme/monokai");
    editorAce1.getSession().setMode("ace/mode/javascript");
	editorAce1.getSession().setUseWorker(false);
	
	$("input[name='checkboxes']").prop("checked", false);
	$("#browser,#jquery").prop("checked", true);
	
	var JSHINT_options = {};
	
	function set_options()
	{
		JSHINT_options = {
			undef: true,
			unused: true,
			browser: $("#browser").is(":checked"),
			devel: $("#browser").is(":checked"),
			browserify: $("#browserify").is(":checked"),
			couch: $("#couch").is(":checked"),
			dojo: $("#dojo").is(":checked"),
			jasmine: $("#jasmine").is(":checked"),
			jquery: $("#jquery").is(":checked"),
			mocha: $("#mocha").is(":checked"),
			module: $("#module").is(":checked"),
			mootools: $("#mootools").is(":checked"),
			node: $("#node").is(":checked"),
			nonstandard: $("#nonstandard").is(":checked"),
			phantom: $("#phantom").is(":checked"),
			prototypejs: $("#prototypejs").is(":checked"),
			qunit: $("#qunit").is(":checked"),
			rhino: $("#rhino").is(":checked"),
			shelljs: $("#shelljs").is(":checked"),
			typed: $("#typed").is(":checked"),
			worker: $("#worker").is(":checked"),
			wsh: $("#wsh").is(":checked"),
			yui: $("#yui").is(":checked")
		};
	}
	
	set_options();

$('#sample_code').click(function(e) {
    e.preventDefault();
	var str = 'var c=0;\r\n'+
				'var t;\r\n'+
				'var timer_is_on=0;\r\n'+
				'function timedCount(){\r\n'+
				'	document.write(c);\r\n'+
				'	document.write(" ");\r\n'+
				'	c=c+1;\r\n'+
				'	t=setTimeout("timedCount()",1000);\r\n'+
				'}\r\n'+
				'function doTimer(){\r\n'+
				'	if (!timer_is_on)\r\n'+
				'	{\r\n'+
				'		timer_is_on=1;\r\n'+
				'		timedCount();\r\n'+
				'	}\r\n'+
				'}\r\n'+
				'doTimer();\r\n'
		editorAce1.setValue(str);
	});
$('#copy_code').click(function(e) {
    e.preventDefault();
    var sel = editorAce1.selection.toJSON(); // save selection
    editorAce1.selectAll();
    editorAce1.focus();
    document.execCommand('copy');
    editorAce1.selection.fromJSON(sel); // restore selection
	});
	function validate()
	{
		code = editorAce1.getValue();
		JSHINT(code, JSHINT_options);
		errors = JSHINT.errors;
		count = errors.length;
		data = "";
		if (count == 0) {
			data = '<tr><td colspan="3">No syntax errors!</td></tr>';
		} else {
			for (i = 0; i < count; i++) {
				if (errors[i] != null) {
					data += "<tr>";
					data += "<td>" + errors[i].line + "</td>";
					data += "<td>" + errors[i].character + "</td>";
					data += "<td>" + errors[i].reason + "</td>";
					data += "</tr>";
				}
			}
		}
		if(count > 10)
		{
			$("div.data_well").css({"height":"479px", "overflow-y":"scroll"});
		}else
		{
			$("div.data_well").css({"height":"auto", "overflow-y":"auto"});
		}
		$("table.data tbody").html(data);
	}
	
	$("#set").click(function(e) {
        e.preventDefault();
		set_options();
		validate();
    });
	
	$("#options").click(function(e) {
        e.preventDefault();
		$("#options_modal").modal({backdrop : false});
    });
	
    $('#format_code').click(function(e) {
        e.preventDefault();
		data = $.trim(editorAce1.getValue());
		if(data != "")
		{
			js = js_beautify(data, {'indent_size': 1, 'indent_char': '\t'});
			editorAce1.setValue(js);
		}
		validate();
    });
    $('#clear').click(function(e) {
        e.preventDefault();
		editorAce1.setValue("");
		validate();
    });
    $("#validate_code").click(function(e) {
        e.preventDefault();
        validate();
    });
	
	var keep_validating = null;
	editorAce1.on("change", function(){
		if(keep_validating != null)
		{
			clearTimeout(keep_validating);
		}
        keep_validating = setTimeout(validate, 500);
	});
});