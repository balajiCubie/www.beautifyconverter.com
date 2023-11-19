$("#clear").click(function(e){e.preventDefault();$("#data").val("");$("html, body").animate({scrollTop:($("html").offset().top-10)},600);});function randomise(items,length,allowdups){if(!Array.isArray(items)){items=items.split("");}
items.shuffle();if(allowdups){var r=new Array();for(var i=0;i<length;i++){r[i]=items[Math.floor(Math.random()*items.length)];}
return r;}else{if(length>0&&length<items.length){items.length=length;}
return items;}}
Array.prototype.shuffle=function(){var i=this.length,j,temp;if(i==0)return;while(--i){j=Math.floor(Math.random()*(i+1));temp=this[i];this[i]=this[j];this[j]=temp;}};$(document).ready(function(e){$("#encode").click(function(e){e.preventDefault();var qty=parseInt($('#random-ip-how-many').val(),10);var r=randomise("0123456789abcdef",32*qty,true);var ip_block=[];for(var i=0;i<r.length;i++){var block_index=Math.floor(i/4);if(!Array.isArray(ip_block[block_index])){ip_block.push([]);}
if(!ip_block[block_index].length==0||r[i]!=="0"){ip_block[block_index].push(r[i]);}}
var ip=[];for(var i=0;i<ip_block.length;i++){var ip_index=Math.floor(i/8);if(!Array.isArray(ip[ip_index])){ip.push([]);}
ip[ip_index].push(ip_block[i].join(""));}
var str="";for(var i=0;i<ip.length;i++){str+=ip[i].join(":")+"\n";}
$("html, body").animate({scrollTop:($("h1").offset().top-10)},600);$("#data").val(str);});});