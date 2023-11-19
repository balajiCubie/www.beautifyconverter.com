function onTagChange(){$("#convert").click();}
$(document).ready(function(e){function setTheme(){theme=$.trim($("#themes").val());font_size=$.trim($("#font_size").val());editorAce1.setTheme("ace/theme/"+theme);$("#code1").css({"font-size":(font_size+"px")});editorAce1.setOptions({enableBasicAutocompletion:true,enableSnippets:true,enableLiveAutocompletion:true});}
function show_msg(msg,type)
{if(type=="info")
{$("#msg").html('<span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>&nbsp;'+msg).removeClass("text-danger").addClass("text-info");$("#msg_modal").modal({backdrop:false});}else if(type=="error")
{$("#msg").html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;'+msg).removeClass("text-info").addClass("text-danger");$("#msg_modal").modal({backdrop:false});}}
ace.require("ace/ext/language_tools");var editorAce1=ace.edit("code1");editorAce1.focus();editorAce1.setOptions({enableBasicAutocompletion:true,enableSnippets:true,enableLiveAutocompletion:true});editorAce1.setTheme("ace/theme/monokai");editorAce1.getSession().setMode("ace/mode/html");editorAce1.getSession().setUseWorker(false);$("#clear").click(function(e){e.preventDefault();editorAce1.setValue("");});$("#code1").resizable({handles:'s',resize:function(event,ui){editorAce1.resize();}});$(window).resize(function(e){$("#code1").css({"width":"100%"});});$("#browse").click(function(e){e.preventDefault();$("#file").click();});$("#download").click(function(e){e.preventDefault();data=$.trim(editorAce1.getValue());if(data=="")
{show_msg("The editor is empty!","error");return false;}
blob=new Blob([""+data+""],{type:"text/html;charset=utf-8"});saveAs(blob,"data.html");});var opts={};opts.indent_size=4;opts.indent_char=" ";opts.eol="\n";opts.indent_level=0;opts.indent_with_tabs=false;opts.preserve_newlines=true;opts.max_preserve_newlines=5;opts.jslint_happy=false;opts.space_after_anon_function=false;opts.brace_style="collapse";opts.keep_array_indentation=false;opts.keep_function_indentation=false;opts.space_before_conditional=true;opts.break_chained_methods=false;opts.eval_code=false;opts.unescape_strings=false;opts.wrap_line_length=0;opts.wrap_attributes="auto";opts.wrap_attributes_indent_size=4;opts.end_with_newline=false;$("#beautify_html").click(function(e){e.preventDefault();data=$.trim(editorAce1.getValue());if(data!="")
{editorAce1.setValue(html_beautify(data,opts));}});$("#preview").click(function(e){e.preventDefault();data=$.trim(editorAce1.getValue());try{found=$(data).filter("table").is("table");if(found)
{data=$(data).filter("table");var pdfthemee="";if($("#pdftheme").val()=="grid"){pdfthemee="grid";}
else if($("#pdftheme").val()=="striped"){pdfthemee="striped";}
else if($("#pdftheme").val()=="plain"){pdfthemee="plain";}
var linebreaks=$("#lineb").is(":checked");var lin=" ";if(linebreaks){lin='linebreak';}else{lin='ellipsize';}
var ht=$("#htab").is(":checked");var htable=" ";if(ht){htable='p';}else{htable='l';}
var tabtitle=$("#tabtitle").val();var doc=new jsPDF(htable,'pt');doc.text(tabtitle,40,40);var res=doc.autoTableHtmlToJson(document.getElementById("data_out_tb"));doc.autoTable(res.columns,res.data,{startY:50,theme:pdfthemee,styles:{overflow:lin},});var f=guid();doc.save(f+"pdf.pdf");}else
{editorAce1.setValue("Table not found!");$("div.data_tb").hide();}}catch(e)
{editorAce1.setValue("Table not found!");$("div.data_tb").hide();}});themelist=ace.require("ace/ext/themelist");theme="";$(themelist.themes).each(function(key,value){theme+='<option value="'+value.name+'">'+value.caption+'</option>';});$("#themes").append(theme);$("#themes").val("monokai");$("#font_size").val("14");$("#themes,#font_size").change(function(e){setTheme();editorAce1.focus();});function to_csv(workbook){var result=[];workbook.SheetNames.forEach(function(sheetName){var csv=XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);if(csv.length>0){result.push(csv);}});return result.join("\n");}
function handleFile(e){var files=e.target.files;var i,f;for(i=0,f=files[i];i!=files.length;++i){var reader=new FileReader();var name=f.name;reader.onload=function(e){try{var data=$.trim(e.target.result);var workbook=XLSX.read(data,{type:'binary'});data=to_csv(workbook);lines=data.split(/\r\n|\n\r|\n|\r/g);output="";for(i=0;i<lines.length;i++)
{output+="<tr>";col=lines[i].split(",");for(j=0;j<col.length;j++)
{output+="<td>"+col[j]+"</td>";}
output+="</tr>";}
output="<table>"+output+"</table>";editorAce1.setValue(html_beautify(output,opts));data=$(output).filter("table");$("div.data_tb").html(data);$("div.data_tb table").attr("id","data_out_tb");var pdfthemee="";if($("#pdftheme").val()=="grid"){pdfthemee="grid";}
else if($("#pdftheme").val()=="striped"){pdfthemee="striped";}
else if($("#pdftheme").val()=="plain"){pdfthemee="plain";}
var linebreaks=$("#lineb").is(":checked");var lin=" ";if(linebreaks){lin='linebreak';}else{lin='ellipsize';}
var ht=$("#htab").is(":checked");var htable=" ";if(ht){htable='p';}else{htable='l';}
var tabtitle=$("#tabtitle").val();var doc=new jsPDF(htable,'pt');doc.text(tabtitle,40,40);var res=doc.autoTableHtmlToJson(document.getElementById("data_out_tb"));doc.autoTable(res.columns,res.data,{startY:50,theme:pdfthemee,styles:{overflow:lin},});document.getElementById("output").src=doc.output('datauristring');$("#output").parents("div.form-group").addClass("show");$("html, body").animate({scrollTop:($("#convert").offset().top-50)},600);}catch(e){if(name.split(".").pop()=="csv")
{lines=data.split(/\r\n|\n\r|\n|\r/g);output="";for(i=0;i<lines.length;i++)
{output+="<tr>";col=lines[i].split(",");for(j=0;j<col.length;j++)
{output+="<td>"+col[j]+"</td>";}
output+="</tr>";}
output="<table>"+output+"</table>";editorAce1.setValue(html_beautify(output,opts));data=$(output).filter("table");$("div.data_tb").html(data);$("div.data_tb table").attr("id","data_out_tb");var pdfthemee="";if($("#pdftheme").val()=="grid"){pdfthemee="grid";}
else if($("#pdftheme").val()=="striped"){pdfthemee="striped";}
else if($("#pdftheme").val()=="plain"){pdfthemee="plain";}
var linebreaks=$("#lineb").is(":checked");var lin=" ";if(linebreaks){lin='linebreak';}else{lin='ellipsize';}
var ht=$("#htab").is(":checked");var htable=" ";if(ht){htable='p';}else{htable='l';}
var tabtitle=$("#tabtitle").val();var doc=new jsPDF(htable,'pt');doc.text(tabtitle,40,40);var res=doc.autoTableHtmlToJson(document.getElementById("data_out_tb"));doc.autoTable(res.columns,res.data,{startY:50,theme:pdfthemee,styles:{overflow:lin},});document.getElementById("output").src=doc.output('datauristring');$("#output").parents("div.form-group").addClass("show");$("html, body").animate({scrollTop:($("#convert").offset().top-50)},600);}else
{editorAce1.setValue("Please select an excel file.");}}};reader.readAsBinaryString(f);}}
$("#file").change(function(e){e.preventDefault();editorAce1.setValue("Please wait while loading your file.");handleFile(e);});$("#convert").click(function(e){e.preventDefault();if($.trim($("#file").val())=="")
{editorAce1.setValue("Please select an excel file first.");}else
{$("#file").change();}});});function guid(){function s4(){return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);}
return s4()+s4()+'-'+s4();};