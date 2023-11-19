function b64EncodeUnicode(str){return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,function(match,p1)
{return String.fromCharCode('0x'+p1);}));}
var options={input:false}
var zone=new FileDrop('data',options)
zone.event('send',function(files){files.each(function(file){file.readData(function(str){zone.el.value=str},function(e){alert('Terrible error!')},'text')})})
$("#clear").click(function(e){e.preventDefault();$("#data,#out").val("");$("#out").parents("div.out_div").addClass("hide");$("html, body").animate({scrollTop:($("html").offset().top-10)},600);});$(document).ready(function(e){$("#out").focus(function(e){$(this).select();});$("#encode,#decode").click(function(e){e.preventDefault();data=$.trim($("#data").val());format=$.trim($(this).attr("id"));if(data=="")
{$("#data").focus().parents("div.form-group").addClass("has-error");return false;}
$("html, body").animate({scrollTop:($("#encode").offset().top-10)},600);$("#data").parents("div.form-group").removeClass("has-error");$("#out").parents("div.out_div").removeClass("hide");out="";if(format=="encode")
{out=b64EncodeUnicode(data);}else
{try{out=atob(data);}catch(e)
{out="The string you have given is not encoded correctly!";}}
$("#out").val(out);$("div.out_div").show();});});