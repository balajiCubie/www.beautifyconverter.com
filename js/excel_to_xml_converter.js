$(document).ready(function(e){function setTheme(){theme=$.trim($("#themes").val());font_size=$.trim($("#font_size").val());editorAce1.setTheme("ace/theme/"+theme);$("#code1").css({"font-size":(font_size+"px")});editorAce1.setOptions({enableBasicAutocompletion:true,enableSnippets:true,enableLiveAutocompletion:true});}
function show_msg(msg,type)
{if(type=="info")
{$("#msg").html('<span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>&nbsp;'+msg).removeClass("text-danger").addClass("text-info");$("#msg_modal").modal({backdrop:false});}else if(type=="error")
{$("#msg").html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;'+msg).removeClass("text-info").addClass("text-danger");$("#msg_modal").modal({backdrop:false});}}
ace.require("ace/ext/language_tools");var editorAce1=ace.edit("code1");editorAce1.focus();editorAce1.setOptions({enableBasicAutocompletion:true,enableSnippets:true,enableLiveAutocompletion:true});editorAce1.setTheme("ace/theme/monokai");editorAce1.getSession().setMode("ace/mode/xml");editorAce1.getSession().setUseWorker(false);$("#clear").click(function(e){e.preventDefault();editorAce1.setValue("");});$("#code1").resizable({handles:'s',resize:function(event,ui){editorAce1.resize();}});$(window).resize(function(e){$("#code1").css({"width":"100%"});});$("#browse").click(function(e){e.preventDefault();$("#file").click();});$("#download").click(function(e){e.preventDefault();data=$.trim(editorAce1.getValue());if(data=="")
{show_msg("The editor is empty!","error");return false;}
blob=new Blob([""+data+""],{type:"text/xhtml+xml;charset=utf-8"});saveAs(blob,"data.xml");});themelist=ace.require("ace/ext/themelist");theme="";$(themelist.themes).each(function(key,value){theme+='<option value="'+value.name+'">'+value.caption+'</option>';});$("#themes").append(theme);$("#themes").val("monokai");$("#font_size").val("14");$("#themes,#font_size").change(function(e){setTheme();editorAce1.focus();});function to_csv(workbook){var result=[];workbook.SheetNames.forEach(function(sheetName){var csv=XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);if(csv.length>0){result.push(csv);}});return result.join("\n");}
function handleFile(e){var files=e.target.files;var i,f;for(i=0,f=files[i];i!=files.length;++i){var reader=new FileReader();var name=f.name;reader.onload=function(e){try{var data=$.trim(e.target.result);var workbook=XLSX.read(data,{type:'binary'});data=to_csv(workbook);csv=data;var sep=",";var columns=$("#cols").is(":checked");var lignes=csv.split("\n");var start=0;var colNames=[];if(columns){start=1;colLbls=lignes[0].split(sep);for(var i=0;i<colLbls.length;i++){colNames.push(qname(colLbls[i]));}}
var xmlRes="<root>\n";for(var i=start;i<lignes.length;i++){var l=lignes[i];xmlRes+=" <row>\n";var content=l.split(sep);for(var j=0;j<content.length;j++){if(columns){xmlRes+="   <"+colNames[j]+">";}else
xmlRes+="   <col"+(j+1)+">";xmlRes+=escapeTxt(content[j]);if(columns){xmlRes+="</"+colNames[j]+">";}else
xmlRes+="</col"+(j+1)+">";xmlRes+="\n";}
xmlRes+=" </row>\n";}
xmlRes+="</root>";editorAce1.setValue(vkbeautify.xml(xmlRes,4));}catch(e){if(name.split(".").pop()=="csv")
{editorAce1.setValue(data);}else
{editorAce1.setValue("Please select an excel file.");}}};reader.readAsBinaryString(f);}}
$("#file").change(function(e){e.preventDefault();editorAce1.setValue("Please wait while loading your file.");handleFile(e);});$("#convert").click(function(e){e.preventDefault();if($.trim($("#file").val())=="")
{editorAce1.setValue("Please select an excel file first.");}else
{$("#file").change();}});});function unquote(val){return val.replace(/^\s*\"(.*)\"\s*$/,"$1");}
function escapeTxt(val){val=val.replace(/&/g,"&amp;");val=val.replace(/</g,"&lt;");val=val.replace(/>/g,"&gt;");return unquote(val);}
function qname(name){name=name.replace(/(\s)+/g,"");return unquote(name);}