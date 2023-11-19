$("#clear").click(function(e){e.preventDefault();$("#data").val("");$("html, body").animate({scrollTop:($("html").offset().top-10)},600);});function randomise(items,length,allowdups){if(!Array.isArray(items)){items=items.split("");}
items.shuffle();if(allowdups){var r=new Array();for(var i=0;i<length;i++){r[i]=items[Math.floor(Math.random()*items.length)];}
return r;}else{if(length>0&&length<items.length){items.length=length;}
return items;}}
Array.prototype.shuffle=function(){var i=this.length,j,temp;if(i==0)return;while(--i){j=Math.floor(Math.random()*(i+1));temp=this[i];this[i]=this[j];this[j]=temp;}};$(document).ready(function(e){$("#encode").click(function(e){e.preventDefault();var qty=parseInt($('#random-ip-how-many').val(),10);var str="";for(var i=0;i<qty;i++){var t="";var hex=randomise("0123456789ABCDEF",12,1);for(j=0;j<12;j+=2){if(j>0){t+=":";}
t+=hex[j]+hex[j+1];}
str+=t+"\n";}
$("html, body").animate({scrollTop:($("h1").offset().top-10)},600);$("#data").val(str);});});