$("#clear").click(function(e){e.preventDefault();$("#key,#text,#result_ed").val("");$("#key,#text,#result_ed").parents("div.form-group").removeClass("has-error");$("#result_ed").parents("div.form-group").addClass("hide");$("html, body").animate({scrollTop:($("html").offset().top-10)},600);});$("#calculate_hmac").click(function(e){e.preventDefault();data=$.trim($("#text").val());format=$.trim($("#result_ed").val());if(data=="")
{$("#text").focus().parents("div.form-group").addClass("has-error");return false;}else
{$("#text").parents("div.form-group").removeClass("has-error");$("#result_ed").parents("div.form-group").removeClass("hide");$("html, body").animate({scrollTop:($("h1").offset().top-10)},600);}
if(format=="")
{$("#result_ed").focus().parents("div.form-group").addClass("has-error");return false;}else
{$("#result_ed").parents("div.form-group").removeClass("has-error");}});function generateHMAC(){var text=$("#text").val();$("#result_ed").val('');if(validateInput("text")){var alg=$("#alg").val();var output="";switch(alg){case 'md5':output=CryptoJS.MD5(text);break;case 'ripemd160':output=CryptoJS.RIPEMD160(text);break;case 'sha1':output=CryptoJS.SHA1(text);break;case 'sha224':output=CryptoJS.SHA224(text);break;case 'sha256':output=CryptoJS.SHA256(text);break;case 'sha3':output=CryptoJS.SHA3(text);break;case 'sha384':output=CryptoJS.SHA384(text);break;case 'sha512':output=CryptoJS.SHA512(text);break;default:break;}
$("#result_ed").val(output);}
else{openErrorDialog("Please Enter Plain Text");}}
function validateInput(fieldName){var flag=true;if($("#"+fieldName).val().trim().length==0){flag=false;}
return flag;}