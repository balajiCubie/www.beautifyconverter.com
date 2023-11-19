$(document).ready(function(e){ace.require("ace/ext/language_tools");var editorAce1=ace.edit("code1");editorAce1.focus();editorAce1.setOptions({enableBasicAutocompletion:true,enableSnippets:true,enableLiveAutocompletion:true});editorAce1.setTheme("ace/theme/monokai");editorAce1.getSession().setMode("ace/mode/javascript");editorAce1.getSession().setUseWorker(false);var page_height=$(window).height();$('#result').height(page_height-143);$("#wrapmode").click(function(e){e.preventDefault();if(!$(this).is(".wrapon"))
{$(this).addClass("wrapon");editorAce1.getSession().setUseWrapMode(true);$("#wrapmode").text("Cancel Wrap");}else
{$(this).removeClass("wrapon");editorAce1.getSession().setUseWrapMode(false);$("#wrapmode").text("Smart Wrap");}});$('#sample_code').click(function(e){e.preventDefault();var str='var c=0;\r\n'+
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
editorAce1.setValue(str);value=editorAce1.getValue();view("<script>"+value+"</script>");});$('#copy_code').click(function(e){e.preventDefault();var sel=editorAce1.selection.toJSON();editorAce1.selectAll();editorAce1.focus();document.execCommand('copy');editorAce1.selection.fromJSON(sel);});$('#validate_code').click(function(e){e.preventDefault();value=editorAce1.getValue();try{view("<script>"+value+"</script>");}catch(error){view("Invalid JavaScript");}});var view=function(s){var A=window.result.document.open();A.write($.trim(s));A.close();A=null;}
$('#format_code').click(function(e){e.preventDefault();data=$.trim(editorAce1.getValue());if(data!="")
{js=js_beautify(data,{'indent_size':1,'indent_char':'\t'});editorAce1.setValue(js);}});$('#clear').click(function(e){e.preventDefault();editorAce1.setValue("");$("#alert-message").addClass("hide")});});