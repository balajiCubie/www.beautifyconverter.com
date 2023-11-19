$(function(){var FileSelectHandler=function(e){FileDragHover(e);var files=e.target.files||e.dataTransfer.files;$("html, body").animate({scrollTop:($("h1").offset().top-10)},600);if(files.length){$('#droptarget').css('height','80px');$('#result').html('');for(var i=0,f;f=files[i];i++){ParseFile(files[i]);}}
return false;};var FileDragHover=function(e){e.stopPropagation();e.preventDefault();e.target.className=(e.type=='dragover'?'hover':'');}
var ParseFile=function(file){var reader=new FileReader();reader.readAsDataURL(file);(function(currentFile){reader.onload=function(e){PrintFile(currentFile.name,currentFile.size,e.target.result.length,e.target.result);};}(file));};var PrintFile=function(name,oldSize,newSize,datauri){$('#result').append('<table class="table">'+
'<tr><th style="width:150px">Image:</th><td><img class="img-responsive" src="'+datauri+'"></td></tr>'+
'<tr><th>Filename:</th><td>'+name+'</td></tr>'+
'<tr><th>Old size:</th><td>'+oldSize+' bytes</td></tr>'+
'<tr><th>New size:</th><td>'+newSize+' bytes</td></tr>'+
'<tr><th>Data URI:</th><td><textarea class="form-control resizable" onclick="this.select();" rows="4">'+datauri+'</textarea></td></tr>'+
'<tr><th>Image Tag:</th><td><textarea class="form-control resizable" onclick="this.select();" id="txtselect" rows="4"><img alt="'+name+'" src="'+datauri+'"/></textarea></td></tr>'+
'<tr><th>CSS Background:</th><td><textarea class="form-control resizable" onclick="this.select();" rows="4">background-image: url("'+datauri+'");</textarea></td></tr>'+
'</table>');$('table input').bind('click',function(){$(this).select();});};document.getElementById('file').addEventListener('change',FileSelectHandler,false);var droptarget=document.getElementById('droptarget');droptarget.addEventListener('dragover',FileDragHover,false);droptarget.addEventListener('dragleave',FileDragHover,false);droptarget.addEventListener('drop',FileSelectHandler,false);});