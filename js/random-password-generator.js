$("#clear").click(function(e){e.preventDefault();$("#data,#out").val("");$("#password").parents("div.form-group").addClass("hide");$("html, body").animate({scrollTop:($("html").offset().top-10)},600);});var passwordText=document.createTextNode("");var statisticsText=document.createTextNode("");document.getElementById("password").appendChild(passwordText);document.getElementById("statistics").appendChild(statisticsText);function generate(){var charset="";if(document.getElementById("numbers").checked)charset+="0123456789";if(document.getElementById("lowercase").checked)charset+="abcdefghijklmnopqrstuvwxyz";if(document.getElementById("uppercase").checked)charset+="ABCDEFGHIJKLMNOPQRSTUVWXYZ";if(document.getElementById("symbols").checked)charset+="!\"#$%"+String.fromCharCode(38)+"'()*+,-./:;"+String.fromCharCode(60)+"=>?@[\\]^_`{|}~";if(document.getElementById("space").checked)charset+=" ";if(document.getElementById("custom").checked)charset+=document.getElementById("customchars").value;charset=removeDuplicates(charset);charset=charset.replace(/ /,"\u00A0");$("#password").parents("div.form-group").removeClass("hide");$("html, body").animate({scrollTop:($("h1").offset().top-10)},600);var password="";var statistics="";if(charset==""){alert("Error: Character set is empty");}else{var length;if(document.getElementById("by-length").checked)
length=parseInt(document.getElementById("length").value,10);else if(document.getElementById("by-entropy").checked)
length=Math.ceil(parseFloat(document.getElementById("entropy").value)*Math.log(2)/Math.log(charset.length));else
throw "Assertion error";if(!(length>=0)||length>10000){password+="Invalid password length";}
else{for(var i=0;!(i>=length);i++)
password+=charset.charAt(randomInt(charset.length));var entropy=Math.log(charset.length)*length/Math.log(2);var entropystr;if(!(entropy>=70))
entropystr=entropy.toFixed(2);else if(!(entropy>=200))
entropystr=entropy.toFixed(1);else
entropystr=entropy.toFixed(0);statistics="Length = "+length+" chars, Charset size = "+charset.length+" symbols, Entropy = "+entropystr+" bits";}}
passwordText.data=password;statisticsText.data=statistics;}
function removeDuplicates(s){var result="";for(var i=0;!(i>=s.length);i++){var c=s.charAt(i);if(result.indexOf(c)==-1)
result+=c;}
return result;}
function randomInt(n){var x=randomIntMathRandom(n);x=(x+randomIntBrowserCrypto(n))%n;return x;}
function randomIntMathRandom(n){var x=Math.floor(Math.random()*n);if(!(x>=0)||x>=n)
throw "Arithmetic exception";return x;}
function randomIntBrowserCrypto(n){if(typeof Uint32Array!="function"||!("crypto"in window)||!("getRandomValues"in window.crypto))
return 0;else{var x=new Uint32Array(1);do window.crypto.getRandomValues(x);while(x[0]-x[0]%n>4294967296-n);return x[0]%n;}}