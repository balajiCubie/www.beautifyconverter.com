var options = {input: false}
var zone = new FileDrop('input', options)
zone.event('send', function (files) {
  files.each(function (file) {
    file.readData(
      function (str) { zone.el.value = str },
      function (e) { alert('Terrible error!') },
      'text'
    )
  })
})

$("#clear").click(function(e) {
	e.preventDefault();
		$("#input,#output").val("");
		$("#input,#output").parents("div.form-group").removeClass("has-error");
		$("#output").parents("div.form-group").addClass("hide");
		$("html, body").animate({
			scrollTop: ($("html").offset().top - 10)
		}, 600);
});
$("#escape,#unescape").click(function(e) {
    	e.preventDefault();
		input = $.trim($("#input").val());
		if(input == "")
		{
			$("#input").focus().parents("div.form-group").addClass("has-error");
			return false;
		}else
		{
			$("#input").parents("div.form-group").removeClass("has-error");
			$("#output").parents("div.form-group").removeClass("hide");
			$("html, body").animate({
				scrollTop: ($("#escape").offset().top - 10)
			}, 600);
		}
});

  function escapeHtml() {
		input = $.trim($("#input").val());
		str = String(input).replace(/[&<>"']/g, function (s) {
		return escapeHtmlArray[s];
		});
		$("#output").val(str);
  }
var escapeHtmlArray = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&apos;',
  };
  function unEscapeHtml() {
		input = $.trim($("#input").val());
	  str = String(input)
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
		$("#output").val(str);
  }
  
  function escapeSQL(){
		input = $.trim($("#input").val());
	  str = String(input).replace(/'/g,'"');
		$("#output").val(str);
  }
  
  function unEscapeSQL(){
		input = $.trim($("#input").val());
	  str = String(input).replace(/"/g,"'");
		$("#output").val(str);
  }
  
  function escapeCSV(input){
	var	input = $.trim($("#input").val());
	  var csv = String(input).replace(/"/g,'""');
	  
	  if(csv.charAt(0) != '"'){
		  csv = '"' + csv;
	  }
	  if(csv.charAt(csv.length-1) != '"'){
		  csv = csv + '"';
	  }
		$("#output").val(csv);
  }
  
  function unEscapeCSV(input){
	var	input = $.trim($("#input").val());
	  
	  if(input.charAt(0) == '"'){
		  input = input.substring(1, input.length-1);
	  }
	  if(input.charAt(input.length-1) == '"'){
		  input = input.substring(0, input.length-2);
	  }
	  
	  str = String(input).replace(/""/g,'"');
		$("#output").val(str);
  }
  
  function escapeJava(input)
	{
	var	input = $.trim($("#input").val());
		var escape="";
		
		var i=0;
		for(i=0;i<input.length;i++)
		{
			escape=escape+javaEscapeCode(input.charAt(i),false);
		}
		$("#output").val(escape);
	}
  
  function unEscapeJava(){
	var	input = $.trim($("#input").val());
	  str =  input.replace(/\\r/g,'\r')
	  .replace(/\\n/g,'\n')
	  .replace(/\\'/g,"\'")
	  .replace(/\\\"/g,'"')
	  .replace(/\\\\/g,'\\')
	  .replace(/\\t/g,'\t')
	  .replace(/\\b/g,'\b')
	  .replace(/\\f/g,'\f');
		$("#output").val(str);
  }
  
  function unEscapeJavaScript(){
	var	input = $.trim($("#input").val());
	  str = input.replace(/\\r/g,'\r')
			   .replace(/\\n/g,'\n')
			   .replace(/\\'/g,"\'")
			   .replace(/\\\"/g,'"')
			   .replace(/\\&/g,'\&')
			   .replace(/\\\\/g,'\\')
			   .replace(/\\t/g,'\t')
			   .replace(/\\b/g,'\b')
			   .replace(/\\f/g,'\f')
			   .replace(/\\x2F/g,'/')
			   .replace(/\\x3C/g,'<')
			   .replace(/\\x3E/g,'>');
		$("#output").val(str);
  }
	 
function javaEscapeCode(original, skipNewLine)
{
	if(skipNewLine && original=='\n') return; 
 	var thecharchar=original.charAt(0);
	switch(thecharchar) {
			case '\n': return "\\n"; break; //newline
			case '\r': return "\\r"; break; //Carriage return
			case '\'': return "\\'"; break;
			case '"': return "\\\""; break;
			case '\\': return "\\\\"; break;
			case '\t': return "\\t"; break;
			case '\b': return "\\b"; break;
			case '\f': return "\\f"; break;
			default:
				return original;
				break;
		}
}
 

function escapeJavascript(input)
{
	var	input = $.trim($("#input").val());
	var escape="";
	
	var i=0;
	for(i=0;i<input.length;i++)
	{
		escape=escape+javascriptEscapeCode(input.charAt(i),false);
	}
	
	//return escape;
		$("#output").val(escape);	
}

function javascriptEscapeCode(original)
{
	  	var thecharchar=original.charAt(0);
	switch(thecharchar) {
			case '\r': return "\\r"; break;
			case '\n': return "\\n"; break; //newline
			case '\v': return "\\v"; break; 
			case '\'': return "\\'"; break;
			case '"': return "\\\""; break;
			case '\&': return "\\&"; break;
			case '\\': return "\\\\"; break;
			case '\t': return "\\t"; break;
			case '\b': return "\\b"; break;
			case '\f': return "\\f"; break;
			default:
				return original;
				break;
		}
}