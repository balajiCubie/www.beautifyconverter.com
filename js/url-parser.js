$("#clear").click(function(e){e.preventDefault();$("#url").val("");$("#url").parents("div.form-group").removeClass("has-error");$("#result").hide();scroll_to_top();});function scroll_to_el()
{$("html, body").animate({scrollTop:($("#url").offset().top-10)},600);}
function scroll_to_top()
{$("html, body").animate({scrollTop:($("html").offset().top-10)},600);}
$("#parseButton").click(function(e){e.preventDefault();if($.trim($("#url").val())=="")
{$("#url").focus().parents("div.form-group").addClass("has-error");return false;}else{scroll_to_el();$("#result").show();var s=$("#url").val();var uri=new URI(s).duplicateQueryParameters(true);var parser=new Array();$("#scheme").text(uri.scheme());$("#protocol").text(uri.protocol());$("#hostname").text(uri.hostname());parser["Scheme"]=uri.scheme();parser["Protocol"]=uri.protocol();parser["Hostname"]=uri.hostname();if(uri.directory()){parser["Directory"]=uri.directory();}
if(uri.resource()){parser["Resource"]=uri.resource();}
if(uri.host()){parser["Host"]=uri.host();}
if(uri.userinfo()){parser["Userinfo"]=uri.userinfo();}
if(uri.authority()){parser["Authority"]=uri.authority();}
if(uri.username()){parser["Username"]=uri.username();}
if(uri.password()){parser["Password"]=uri.password();}
if(uri.port()){parser["Port"]=uri.port();}
if(uri.subdomain()){parser["Subdomain"]=uri.subdomain();}
if(uri.domain()){parser["Domain"]=uri.domain();}
if(uri.tld()){parser["Tld"]=uri.tld();}
if(uri.path()){parser["Path"]=uri.path();}
if(uri.filename()){parser["Filename"]=uri.filename();}
if(uri.suffix()){parser["Filesuffix"]=uri.suffix();}
if(uri.query()){parser["Query"]=uri.query();}
if(uri.hash()){parser["Hash"]=uri.hash();}
$("#urlData").html("");$("#urlData").append("<table class=\"table table-bordered table-condensed table-hover text-left\">");$("#urlData table").append("<tr><th colspan=\"2\">Url Details</th></tr>");for(var index in parser){$("#urlData table").append("<tr><td style=\"background-color: #f1f1f1;width: 100px;\">"+index+"</td><td>"+parser[index]+"</td></tr>");}
$("#urlData table").append("<tr><th colspan=\"2\">Query String</th></tr>");$.each(uri.query(true),function(i,n){if($.isArray(n)){for(var j=0;j<n.length;j++){$("#urlData table").append("<tr><td>"+i+'\'['+j+']'+"</td><td>"+n[j]+"</td></tr>");}}else{$("#urlData table").append("<tr><td style=\"background-color: #f1f1f1;width: 100px;\">"+i+"</td><td>"+n+"</td></tr>");}});$("#queryString").html(content);if(content!=""){$("#queryStringWrapper").show();}else{$("#queryStringWrapper").hide();}
$("#result").show();}});