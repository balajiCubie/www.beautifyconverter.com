$("#clear").click(function(e){e.preventDefault();$("#data").val("");$('#fyear').val(1930);$('#eyear').val(2050);$("html, body").animate({scrollTop:($("html").offset().top-10)},600);});function onTagChange(){if($("#random-date-format").val()=="custom"){$("#cs").removeAttr('disabled');}
else{$("#cs").attr('disabled','disabled');}}
$(document).ready(function(e){$("#encode").click(function(e){e.preventDefault();var howMany=parseInt($('#random-date-how-many').val(),10);var format=$('#random-date-format').val();var fyear=parseInt($('#fyear').val());var eyear=parseInt($('#eyear').val());var str='';for(var i=0;i<howMany;i++){var from=new Date(fyear,0,1).getTime();var to=new Date(eyear,0,1).getTime();var date=new Date(from+Math.random()*(to-from));var months_long=['January','February','March','April','May','June','July','August','September','October','November','December'];var months_short=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];var yyyy=date.getFullYear();var yy=date.getFullYear().toString().substr(2,2);var month_long=months_long[date.getMonth()];var month_short=months_short[date.getMonth()];var mmonth=date.getMonth()+1;if(mmonth<10){mmonth="0"+mmonth.toString();}
var d=date.getDate();var dd=date.getDate();if(dd<10){dd="0"+dd.toString();}
var h=date.getHours();var hh=date.getHours();if(hh<10){hh="0"+hh.toString();}
var m=date.getMinutes();var mminute=date.getMinutes();if(mminute<10){mminute="0"+mminute.toString();}
var s=date.getSeconds();var ss=date.getSeconds();if(ss<10){ss="0"+ss.toString();}
if(format=="yyyy-mm-dd-hh-mm-ss"){str+=[yyyy,mmonth,dd].join('-')+' '+[hh,mminute,ss].join(':');}
else if(format=="yyyy-dd-mm-hh-mm-ss"){str+=[yyyy,dd,mmonth].join('-')+' '+[hh,mminute,ss].join(':');}
else if(format=="mm-dd-yyyy-hh-mm-ss"){str+=[mmonth,dd,yyyy].join('-')+' '+[hh,mminute,ss].join(':');}
else if(format=="iso8601"){var isoStr=date.toISOString();isoStr=isoStr.replace(/\.\d+Z/,'Z');str+=isoStr;}
else if(format=="year-month-date-hh-mm-ss"){str+=[yyyy,month_long,dd].join(' ')+' '+[hh,mminute,ss].join(':');}
else if(format=="year-date-month-hh-mm-ss"){str+=[yyyy,month_long,dd].join(' ')+' '+[hh,mminute,ss].join(':');}
else if(format=="month-date-year-hh-mm-ss"){str+=[month_long,dd,yyyy].join(' ')+' '+[hh,mminute,ss].join(':');}
else if(format=="custom"){var customFormat=$('#random-date-custom-format input').val();var customStr=customFormat;customStr=customStr.replace("YYYY",yyyy);customStr=customStr.replace("YY",yy);customStr=customStr.replace("MM",mmonth);customStr=customStr.replace("month",month_long);customStr=customStr.replace("mon",month_short);customStr=customStr.replace("DD",dd);customStr=customStr.replace("d",d);customStr=customStr.replace("hh",hh);customStr=customStr.replace("h",h);customStr=customStr.replace("mm",mminute);customStr=customStr.replace("m",m);customStr=customStr.replace("ss",ss);customStr=customStr.replace("s",s);str+=customStr;}
str+="\n";}
if(i!=howMany-1)str+="\n";$("html, body").animate({scrollTop:($("h1").offset().top-10)},600);$("#data").val(str);});});