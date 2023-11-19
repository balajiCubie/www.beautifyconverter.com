$(document).ready(function(e){ace.require("ace/ext/language_tools");var editorAce1=ace.edit("code1");editorAce1.focus();editorAce1.setOptions({enableBasicAutocompletion:true,enableSnippets:true,enableLiveAutocompletion:true});editorAce1.setTheme("ace/theme/monokai");editorAce1.getSession().setMode("ace/mode/javascript");editorAce1.getSession().setUseWorker(false);var page_height=$(window).height();$('#result').height(page_height-143);$("#wrapmode").click(function(e){e.preventDefault();if(!$(this).is(".wrapon"))
{$(this).addClass("wrapon");editorAce1.getSession().setUseWrapMode(true);$("#wrapmode").text("Cancel Wrap");}else
{$(this).removeClass("wrapon");editorAce1.getSession().setUseWrapMode(false);$("#wrapmode").text("Smart Wrap");}});$('#sample_code').click(function(e){e.preventDefault();var str='<html>\r\n'+
' <header><link rel="stylesheet" type="text/css" href="https://https://cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/cerulean/bootstrap.min.css" media="all" /></header>'+
'<body style="background-color:#f0f0f0;">\r\n'+
'<div class="text-center">\r\n'+
'    <h1>White House</h1>\r\n'+
'    <h4 class="text-danger">Make American Great Again</h4>\r\n'+
'<a class="twitter-timeline" data-width="90%" href="https://twitter.com/Whitehouse"></a>\r\n'+
'    <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>\r\n'+
'</div>\r\n'+
'</body>\r\n'+
'  </html>  ';editorAce1.setValue(str);view();});editorAce1.on("change",function(c){view();});$('#copy_code').click(function(e){e.preventDefault();var sel=editorAce1.selection.toJSON();editorAce1.selectAll();editorAce1.focus();document.execCommand('copy');editorAce1.selection.fromJSON(sel);});$('#validate_code').click(function(e){e.preventDefault();view();});var view=function(){var A=window.result.document.open();A.write($.trim(editorAce1.getValue()));A.close();A=null;}
var opts={};$('#format_code').click(function(e){e.preventDefault();data=$.trim(editorAce1.getValue());if(data!="")
{editorAce1.setValue(html_beautify(data,opts));}});$('#clear').click(function(e){e.preventDefault();editorAce1.setValue("");$("#alert-message").addClass("hide")});});