	var options = {input: false}
var zone = new FileDrop('input', options)
zone.event('send', function (files) {
  files.each(function (file) {
    file.readData(
      function (str) { zone.el.value = str },
      function (e) { alert('Terrible error!') },
      'text'
    )
  })
})
function scroll_to_el()
{
	$("html, body").animate({
		scrollTop: ($("#temp").offset().top - 10)
	}, 600);
}
function scroll_to_top()
{
	$("html, body").animate({
		scrollTop: ($("html").offset().top - 10)
	}, 600);
}
$("#clear").click(function(e) {
	e.preventDefault();
		$("#input,#output").val("");
		$("#input,#output").parents("div.form-group").removeClass("has-error");
		$("#output").parents("div.form-group").addClass("hide");
		scroll_to_top();
});
$("#temp").click(function(e) {
    	e.preventDefault();
		input = $.trim($("#input").val());
		new_txt = $.trim($("#new_txt").val());
		if(input == "")
		{
			$("#input").focus().parents("div.form-group").addClass("has-error");
			return false;
		}else
		{
			$("#input").parents("div.form-group").removeClass("has-error");
			$("#output").parents("div.form-group").removeClass("hide");
			scroll_to_el();
		}
});

	var viewname = $("#viewName").val();
	$("#" + viewname).addClass("currentselected");
	
	if($("#" + viewname).hasClass( "stringview-string" )){
		$(".stringview-number").hide();
	}
	else{
		$(".stringview-string").hide();
	}

	$("#numberConverterDiv").addClass("hide");
	if (viewname == 'all-number-converter') {
		$("#numberConverterDiv").removeClass("hide");
		$("#stringFunctionDiv").hide();
	} else if (viewname == 'number-to-word-converter') {

		$(".btn.btn-large.span3").hide();

	}
	$( "#radio" ).buttonset();
	
	$("input:radio[name=delimitedRadio]").click(function(){
	      var value = $(this).attr("value");
	      $("#delimitedTempBtn").val(value);
	});

function setToEditor(response) {
	
	if(!$("#numberConverterDiv").hasClass("hide")){
		$("#input_from").val(response.trim());
		$("#select_from").trigger("change");
	}
	else{
		$("#input").val("");
		$("#input").val(response.trim());
		$("#temp").click();
	}
}
//one function for all converter
function convertFromBaseToBase(str, fromBase, toBase){
	
    var num = parseInt(str, fromBase);
    if(str.trim()!=""){
    	var result=num.toString(toBase);
  
    	if(result.toString()=="NaN"){
    		result="Invalid Input";
    	}
    return result;
	}
    else
    {
    return;	
    }
}
//Reverse String Function

function reverse()
{
	var str     = $("#input").val();
	var rev_str = str.split('').reverse().join('');
	$("#output").val(rev_str.trim());
}

//url encode decode function

function urlEncode()
{
	var str     = $("#input").val();
	
	$("#output").val(encodeURIComponent(str));
}
function urlDecode()
{
	var str     = $("#input").val();
	$("#output").val(decodeURIComponent(str));
}


//html encode decode function

function htmlEncode()
{
	var str     = $("#input").val();
	var data=$('<div/>').text(str).html();
	$("#output").val(data);
}

function htmlDecode()
{
	var str     = $("#input").val();
	var data=$('<div/>').html(str).text();
	$("#output").val(data);
}

//string to hexa convert 

function strTohex()
{
	var str     = $("#input").val();
	 var hex = '';
    for(var i=0;i<str.length;i++) {
        hex += ''+str.charCodeAt(i).toString(16);
    }
	$("#output").val(hex);
}
function hexTostr()
{
	var hex  = $("#input").val();
	 var str = '';
    for (var i = 0; i < hex.length; i += 2){
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
		}
	$("#output").val(str);
}

//string to binary 

function strTobinary() {

	var data=$("#input").val();
	//array holds the initial set of un-padded binary results
	var binArray = [];

	//the string to hold the padded results
	var datEncode = "";

	//encode each character in data to it's binary equiv and push it into an array
	var i;
	for (i=0; i < data.length; i++) {
	binArray.push(data[i].charCodeAt(0).toString(2));

	}

	//loop through binArray to pad each binary entry.
	var j;
	for (j=0; j < binArray.length; j++) {
	//pad the binary result with zeros to the left to ensure proper 8 bit binary
	var pad = padding_left(binArray[j], '0', 8);

	//append each result into a string
	datEncode += pad + ' ';
	}

	$("#output").val(datEncode);

	}

	//function to check if each set is encoded to 8 bits, padd the left with zeros if not.

function padding_left(s, c, n) {
	if (!s || !c || s.length >= n) {
		return s;
	}

	var max = (n - s.length) / c.length;
	for ( var i = 0; i < max; i++) {
		s = c + s;
	}

	return s;
}

//convert binary to string
function binaryTostr() {
	var s = $("#input").val();
	s = s.replace(/\s/g, "");
	var data = "";
	if (s.length % 8 != 0) {
		data = "???:";
	} else {
		while (s.length > 0) {
			var first8 = s.substring(0, 8);

			s = s.substring(8);

			var chr = parseInt(first8, 2);

			data += String.fromCharCode(chr);
		}
	}
	$("#output").val(data);
}

//decimal to binary,hexadecimal,octal

function decimalTobinary()
{
	var str  = $("#input").val();
	var binaryString =convertFromBaseToBase(str,10,2);
	$("#output").val(binaryString);
}

function decimalTohexadeciaml()
{
	var str  = $("#input").val();
	var hexString =convertFromBaseToBase(str,10,16);
	$("#output").val(hexString);
}

function decimalTooctal()
{
	var str  = $("#input").val();
	var octalString =convertFromBaseToBase(str,10,8);
	$("#output").val(octalString);
}

//binary to decimal,hexadecimal,octal

function binaryTodecimal()
{
	var str  = $("#input").val();
	var decimalString =convertFromBaseToBase(str,2,10);
	$("#output").val(decimalString);
}

function binaryTohexadeciaml()
{
	var str  = $("#input").val();
	var hexString =convertFromBaseToBase(str,2,16);
	$("#output").val(hexString);
}

function binaryTooctal()
{
	var str  = $("#input").val();
	var octalString =convertFromBaseToBase(str,2,8);
	$("#output").val(octalString);
}

//hexadecimal to decimal,binary,octal

function hexadeciamlTodecimal()
{
	var str  = $("#input").val();
	var decimalString =convertFromBaseToBase(str,16,10);
	$("#output").val(decimalString);
}

function hexadeciamlTobinary()
{
	var str  = $("#input").val();
	var binaryString =convertFromBaseToBase(str,16,2);
	$("#output").val(binaryString);
}

function hexadeciamlTooctal()
{
	var str  = $("#input").val();
	var octalString =convertFromBaseToBase(str,16,8);
	$("#output").val(octalString);
}

//octal to decimal,binary,hexadeciaml

function octalTodecimal()
{
	var str  = $("#input").val();
	var decimalString =convertFromBaseToBase(str,8,10);
	$("#output").val(decimalString);
}

function octalTobinary()
{
	var str  = $("#input").val();
	var binaryString =convertFromBaseToBase(str,8,2);
	$("#output").val(binaryString);
}

function octalTohexadeciaml()
{
	
	var str  = $("#input").val();
	var hexString =convertFromBaseToBase(str,8,16);
	$("#output").val(hexString);
}


//Reverse String Function

function buildString()
{
	var str     = $("#input").val();
	var s = str.split('\n');
	
	var len = s.length - 1;
	
 
	var builtStr = "";
	
	for(var i = 0 ; i < s.length; i++){
	
		if(i == len ){
		builtStr += " '  " + s[i] + "  ' ; ";
		}
		else{
		builtStr += " '   " + s[i] + "  '  + \n";
		}
	}
	$("#output").val(builtStr);
}

function allNumbersConvter(inputId,fromBaseid,toBaseid,convertDirection)
{
	var str=$("#"+inputId).val();
	var from=$("#"+fromBaseid).val();
	var to=$("#"+toBaseid).val();
	
	$("#select_from_title").text($( "#select_from option:selected" ).text());
	$("#select_to_title").text($( "#select_to option:selected" ).text());
	//convertDirection by default is Left(From) To (Right)To
	convertDirection = typeof convertDirection !== 'undefined' ? convertDirection : "lefttoright";
	if(convertDirection=="lefttoright"){		
		var result=convertFromBaseToBase(str,from,to);
		console.log(result);
		$("#output_to").val(result);
	}
	else
	{
		var result=convertFromBaseToBase(str,from,to);
		$("#input_from").val(result);
	}
}

//number to word
var th = ['','thousand','million','billion','trillion'];
//uncomment this line for English Number System
//var th = ['','thousand','million','milliard','billion'];

var dg = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
var tn = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
var tw = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

function NumberToWordsUSA(s) {
	s = s.replace(/[\, ]/g, '');
	if (s != parseFloat(s)) return 'not a number';
	var x = s.indexOf('.');
	if (x == -1) x = s.length;
	if (x > 15) return 'too big';
	var n = s.split('');
	var str = '';
	var sk = 0;
	for (var i = 0; i < x; i++) {
		if ((x - i) % 3 == 2) {
			if (n[i] == '1') {
				str += tn[Number(n[i + 1])] + ' ';
				i++;
				sk = 1;
			} else if (n[i] != 0) {
				str += tw[n[i] - 2] + ' ';
				sk = 1;
			}
		} else if (n[i] != 0) {
			str += dg[n[i]] + ' ';
			if ((x - i) % 3 == 0) str += 'hundred ';
			sk = 1;
		}
		if ((x - i) % 3 == 1) {
			if (sk) str += th[(x - i - 1) / 3] + ' ';
			sk = 0;
		}
	}
	if (x != s.length) {
		var y = s.length;
		str += 'point ';
		for (var i = x + 1; i < y; i++) str += dg[n[i]] + ' ';
	}
	return str.replace(/\s+/g, ' ');
}

function NumberToWordsIndia(num) {
	var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
	var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

	 if ((num = num.toString()).length > 9) return 'overflow';
	    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
	    if (!n) return; var str = '';
	    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
	    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
	    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
	    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
	    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
	    return str;
}

function convertNumberToWords(){
	
	var str = $("#input").val();
	
	var countryCode = $("#nwcountry").val();
	
	if(countryCode == "mr_IN"){//indian
		var num = str.split('.');
		if(num.length > 2){
			$("#output").val("Invalid Number");
		}
		else if(num.length == 1){
			$("#output").val(NumberToWordsIndia(str).toUpperCase());
		}
		else{
			$("#output").val(NumberToWordsIndia(num[0]).toUpperCase() + " POINT " + NumberToWordsIndia(num[1]).toUpperCase());
		}
	}
	else{//usa
		$("#output").val(NumberToWordsUSA(str).toUpperCase());
	}
}

//string encoding-decoding
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(input){var output="";var chr1,chr2,chr3,enc1,enc2,enc3,enc4;var i=0;input=Base64._utf8_encode(input);while(i<input.length){chr1=input.charCodeAt(i++);chr2=input.charCodeAt(i++);chr3=input.charCodeAt(i++);enc1=chr1>>2;enc2=((chr1&3)<<4)|(chr2>>4);enc3=((chr2&15)<<2)|(chr3>>6);enc4=chr3&63;if(isNaN(chr2)){enc3=enc4=64;}else if(isNaN(chr3)){enc4=64;}
output=output+this._keyStr.charAt(enc1)+this._keyStr.charAt(enc2)+this._keyStr.charAt(enc3)+this._keyStr.charAt(enc4);}
return output;},decode:function(input){var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(i<input.length){enc1=this._keyStr.indexOf(input.charAt(i++));enc2=this._keyStr.indexOf(input.charAt(i++));enc3=this._keyStr.indexOf(input.charAt(i++));enc4=this._keyStr.indexOf(input.charAt(i++));chr1=(enc1<<2)|(enc2>>4);chr2=((enc2&15)<<4)|(enc3>>2);chr3=((enc3&3)<<6)|enc4;output=output+String.fromCharCode(chr1);if(enc3!=64){output=output+String.fromCharCode(chr2);}
if(enc4!=64){output=output+String.fromCharCode(chr3);}}
output=Base64._utf8_decode(output);return output;},_utf8_encode:function(string){string=string.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c);}
else if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);utftext+=String.fromCharCode((c&63)|128);}
else{utftext+=String.fromCharCode((c>>12)|224);utftext+=String.fromCharCode(((c>>6)&63)|128);utftext+=String.fromCharCode((c&63)|128);}}
return utftext;},_utf8_decode:function(utftext){var string="";var i=0;var c=c1=c2=0;while(i<utftext.length){c=utftext.charCodeAt(i);if(c<128){string+=String.fromCharCode(c);i++;}
else if((c>191)&&(c<224)){c2=utftext.charCodeAt(i+1);string+=String.fromCharCode(((c&31)<<6)|(c2&63));i+=2;}
else{c2=utftext.charCodeAt(i+1);c3=utftext.charCodeAt(i+2);string+=String.fromCharCode(((c&15)<<12)|((c2&63)<<6)|(c3&63));i+=3;}}
return string;}}


function encodeBase64(){
	$("#output").val(Base64.encode($("#input").val()));
}

function decodeBase64(){
	$("#output").val(Base64.decode($("#input").val()));
}

//text utils
function convertCase(caseType){
	var input = $("#input").val();
	if(input.trim().length != 0){
		if(caseType == "title"){
			$("#output").val(input.toProperCase());
		}
		else if(caseType == "upper"){
			$("#output").val(input.toUpperCase());
		}
		else if(caseType == "lower"){
			$("#output").val(input.toLowerCase());
		}
		else if(caseType == "sentence"){
			$("#output").val(sentenceCase(input));
		}
	}
}

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

function sentenceCase(strval){

	 var newstrs = strval.split(".");
	    var finalstr="";
	    //alert(strval);
	    for(var i=0;i<newstrs.length;i++)
	        finalstr=finalstr+"."+ newstrs[i].substr(0,2).toUpperCase()+newstrs[i].substr(2);
	    return finalstr.substr(1);
	}

// delimited text extract
function delimitedTextExtract(){
	
	var input = $("#input").val();
	if(input.trim().length != 0){
		
		var lines = input.trim().split("\n");
		var columnNo = $("#columnNo").val();
		var delimited = $("#delimited").val();
		var delimitedType = $("input[name=delimitedRadio]:checked").val();
		var output = "";
		
		if(parseInt(columnNo) != 0 && columnNo.trim().length > 0){
			$.each(lines,function(i,value){
				var lineArr = value.trim().split(delimited);
				if(value.indexOf(delimited) == -1){
					openErrorDialog("The specified text does not contain the delimiter");
					return false;
				}
				
				if(columnNo > lineArr.length){
					openErrorDialog("Please specify valid column");
					return false;
				}
				
				if(delimitedType == "Extract"){
					output += lineArr[columnNo - 1];
					output += "\n";
				}
				else{
					lineArr.splice(columnNo - 1,1);
					output += lineArr.join(' ');
					output += "\n";
				}
				
			});
		}
		else{
			openErrorDialog("Column number must be a positive number starting from 1");
			return false;
		}
		$("#output").val(output);
	}
}

//remove accents
var defaultDiacriticsRemovalap = 
	[
          {'base':'A', 'letters':'\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F'},
          {'base':'AA','letters':'\uA732'},
          {'base':'AE','letters':'\u00C6\u01FC\u01E2'},
          {'base':'AO','letters':'\uA734'},
          {'base':'AU','letters':'\uA736'},
          {'base':'AV','letters':'\uA738\uA73A'},
          {'base':'AY','letters':'\uA73C'},
          {'base':'B', 'letters':'\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181'},
          {'base':'C', 'letters':'\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E'},
          {'base':'D', 'letters':'\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779'},
          {'base':'DZ','letters':'\u01F1\u01C4'},
          {'base':'Dz','letters':'\u01F2\u01C5'},
          {'base':'E', 'letters':'\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E'},
          {'base':'F', 'letters':'\u0046\u24BB\uFF26\u1E1E\u0191\uA77B'},
          {'base':'G', 'letters':'\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E'},
          {'base':'H', 'letters':'\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D'},
          {'base':'I', 'letters':'\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197'},
          {'base':'J', 'letters':'\u004A\u24BF\uFF2A\u0134\u0248'},
          {'base':'K', 'letters':'\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2'},
          {'base':'L', 'letters':'\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780'},
          {'base':'LJ','letters':'\u01C7'},
          {'base':'Lj','letters':'\u01C8'},
          {'base':'M', 'letters':'\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C'},
          {'base':'N', 'letters':'\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4'},
          {'base':'NJ','letters':'\u01CA'},
          {'base':'Nj','letters':'\u01CB'},
          {'base':'O', 'letters':'\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C'},
          {'base':'OI','letters':'\u01A2'},
          {'base':'OO','letters':'\uA74E'},
          {'base':'OU','letters':'\u0222'},
          {'base':'OE','letters':'\u008C\u0152'},
          {'base':'oe','letters':'\u009C\u0153'},
          {'base':'P', 'letters':'\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754'},
          {'base':'Q', 'letters':'\u0051\u24C6\uFF31\uA756\uA758\u024A'},
          {'base':'R', 'letters':'\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782'},
          {'base':'S', 'letters':'\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784'},
          {'base':'T', 'letters':'\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786'},
          {'base':'TZ','letters':'\uA728'},
          {'base':'U', 'letters':'\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244'},
          {'base':'V', 'letters':'\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245'},
          {'base':'VY','letters':'\uA760'},
          {'base':'W', 'letters':'\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72'},
          {'base':'X', 'letters':'\u0058\u24CD\uFF38\u1E8A\u1E8C'},
          {'base':'Y', 'letters':'\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE'},
          {'base':'Z', 'letters':'\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762'},
          {'base':'a', 'letters':'\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250'},
          {'base':'aa','letters':'\uA733'},
          {'base':'ae','letters':'\u00E6\u01FD\u01E3'},
          {'base':'ao','letters':'\uA735'},
          {'base':'au','letters':'\uA737'},
          {'base':'av','letters':'\uA739\uA73B'},
          {'base':'ay','letters':'\uA73D'},
          {'base':'b', 'letters':'\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253'},
          {'base':'c', 'letters':'\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184'},
          {'base':'d', 'letters':'\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A'},
          {'base':'dz','letters':'\u01F3\u01C6'},
          {'base':'e', 'letters':'\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD'},
          {'base':'f', 'letters':'\u0066\u24D5\uFF46\u1E1F\u0192\uA77C'},
          {'base':'g', 'letters':'\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F'},
          {'base':'h', 'letters':'\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265'},
          {'base':'hv','letters':'\u0195'},
          {'base':'i', 'letters':'\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131'},
          {'base':'j', 'letters':'\u006A\u24D9\uFF4A\u0135\u01F0\u0249'},
          {'base':'k', 'letters':'\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3'},
          {'base':'l', 'letters':'\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747'},
          {'base':'lj','letters':'\u01C9'},
          {'base':'m', 'letters':'\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F'},
          {'base':'n', 'letters':'\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5'},
          {'base':'nj','letters':'\u01CC'},
          {'base':'o', 'letters':'\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275'},
          {'base':'oi','letters':'\u01A3'},
          {'base':'ou','letters':'\u0223'},
          {'base':'oo','letters':'\uA74F'},
          {'base':'p','letters':'\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755'},
          {'base':'q','letters':'\u0071\u24E0\uFF51\u024B\uA757\uA759'},
          {'base':'r','letters':'\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783'},
          {'base':'s','letters':'\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B'},
          {'base':'t','letters':'\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787'},
          {'base':'tz','letters':'\uA729'},
          {'base':'u','letters': '\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289'},
          {'base':'v','letters':'\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C'},
          {'base':'vy','letters':'\uA761'},
          {'base':'w','letters':'\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73'},
          {'base':'x','letters':'\u0078\u24E7\uFF58\u1E8B\u1E8D'},
          {'base':'y','letters':'\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF'},
          {'base':'z','letters':'\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763'}
      ];

  var diacriticsMap = {};
  for (var i=0; i < defaultDiacriticsRemovalap.length; i++){
      var letters = defaultDiacriticsRemovalap[i].letters;
      for (var j=0; j < letters.length ; j++){
          diacriticsMap[letters[j]] = defaultDiacriticsRemovalap[i].base;
      }
  }

  function removeAccents () {
	  var input = $("#input").val();
		if(input.trim().length == 0){
			return false;
		}
      var output = input.replace(/[^\u0000-\u007E]/g, function(a){ 
         return diacriticsMap[a] || a; 
      });
      
      $("#output").val(output);
  } 
  
 //remove duplicate line
function removeDuplicateLine(){
	var input = $("#input").val();
	if(input.trim().length != 0){
		var lines = input.split("\n");
		var uniquelines = [];
		$.each(lines, function(i, line){
		    if($.inArray(line, uniquelines) === -1) uniquelines.push(line);
		});
		
		$("#output").val(uniquelines.join("\n"));
	}
}

//remove empty line
function removeEmptyLine(){
	var input = $("#input").val();
	if(input.trim().length != 0){
		var lines = input.split("\n");
		var uniquelines = [];
		$.each(lines, function(i, line){
		    if(line.trim().length != 0){
		    	uniquelines.push(line);
		    }
		});
		$("#output").val(uniquelines.join("\n"));
	}
}

//remove extra space
function removeExtraSpace(){
	var input = $("#input").val();
	if(input.trim().length != 0){
		$("#output").val(input.replace(/\s+/g,' ').trim());
	}
}

//remove line breaker
function removeLineBreaker(){
	var input = $("#input").val();
	if(input.trim().length != 0){
		$("#output").val(input.split("\n").join(''));
	}
}

//remove line contain
function removeLineContain(){
	var input = $("#input").val();
	var contain = $("#contain").val();
	if(input.trim().length != 0){
		var lines = input.split("\n");
		var uniquelines = [];
		$.each(lines, function(i, line){
		    if(line.trim().length != 0){
		    	var actaulLen = line.trim().length;
		    	var extraxtLen = 0;
		    	if($("#isCaseSensitive").is(":checked")){
		    		var regex = new RegExp( '(' + contain + ')', 'gi' );
		    		extraxtLen = line.trim().replace(regex,'').length;
		    	}
		    	else{
		    		extraxtLen = line.trim().replace(contain,'').length;
		    	}
		    	if(actaulLen == extraxtLen){
		    		uniquelines.push(line);
		    	}
		    }
		});
		$("#output").val(uniquelines.join("\n"));
	}
}

//sort by line
function sortLine(){
	var input = $("#input").val();
	var sortType = $("input[name=sortLineRadio]:checked").val();
	var random = false;
	if(sortType == "Random"){
		random = Math.floor((Math.random() * 2) + 1);
	}
	
	if(input.trim().length != 0){
		var temp = new Array();
		 temp = input.split('\n');
		temp.sort();
		if(sortType == "Alphabetically" || random == 1){
			$("#output").val(temp.join("\n"));
		}
		else if(sortType == "Reverse" || random == 2){
				$("#output").val(temp.reverse().join("\n"));
		}
		
	}
}

//text-minifier
function minifyText(){
	var input = $("#input").val();
	$("#output").val("");
	if(input.trim().length != 0){
		if($("#chbSpace").is(":checked")){
			input = input.replace(/\s/g,'');
		}
		if($("#chbTab").is(":checked")){
			input = input.replace(/\t+/g,'');
		}
		if($("#chbLine").is(":checked")){
			input = input.split('\n').join('');
		}
		$("#output").val(input);
	}
}

//text-rot13
String.prototype.rot13 = function(){
    return this.replace(/[a-zA-Z]/g, function(c){
        return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
    });
};

function textTorot13(){
	var input = $("#input").val();
	$("#output").val("");
	if(input.trim().length != 0){
		$("#output").val(input.rot13());
	}
}
function rotTotext(){
	var input = $("#input").val();
	$("#output").val("");
	if(input.trim().length != 0){
		$("#output").val(input.rot13());
	}
}

function calculateStringLength(){
	var input = $("#input").val();
	$("#output").html("Your string is <b>"+input.length+"</b> characters long.");
}

function generatePassword(){
	 var length = $("#pgLength").val();
     var string = "abcdefghijklmnopqrstuvwxyz";
     var strUpper="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
     var numeric = '0123456789';
     var punctuation = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';
     var password = "";
     while( password.length<length ) {
         entity1 = Math.ceil(string.length * Math.random()*Math.random());
         entity2 = Math.ceil(numeric.length * Math.random()*Math.random());
         entity3 = Math.ceil(punctuation.length * Math.random()*Math.random());
         entity4 = Math.ceil(strUpper.length * Math.random()*Math.random());
         if($("#chkl").is(":checked") && password.length<length){
        	 password += string.charAt( entity1 );
         }
         if($("#chku").is(":checked") && password.length<length){
        	 password += strUpper.charAt( entity4 );
         }
         if($("#chkn").is(":checked") && password.length<length ){
        	 password += numeric.charAt( entity2 );
         }
         if($("#chksc").is(":checked") && password.length<length){
        	 password += punctuation.charAt( entity3 );
         }
     }
  
 $("#output").html("Your Generated Password is  <b>"+password+"</b>");
}

var wordList=["abandon","abandoned","abattoir","abducted","abduction","abilities","ability","abnormal","abnormality","abnormally","abomination","above","aboveground","abrasive","absence","absent","absently","absentness","absolution","absorb","absorbable","absorbing","abstinence","abstinent","abstract","abstractly","absurd","absurdities","absurdity","absurdly","abuse","abusive","academic","academy","accepting","accessories","accident","accidental","accommodation","accomplice","accord","accountable","accuracy","accursed","ache","acid","acidic","acoustic","acrobat","acrobatic","action","actor","actress","actuality","acute","adaptive","addict","addiction","addictive","address","adequate","adherence","adhesive","adjustable","admiral","admission","adopter","adoption","adorable","adornment","adrenaline","adsorbable","adult","advancement","advantage","adventure","advertisement","advisor","advocate","aerial","aerobatic","aerodynamic","affair","affliction","affordable","aficionado","afraid","after","afterlife","aftermath","afternoon","aftershock","aftertaste","afterwards","afterworld","again","against","age","aged","ageless","agency","agenda","agent","aggression","aggressive","agility","agitator","agonizing","agony","agreeable","aim","aimless","air","airport","airship","airspace","airtight","alarm","alarming","alcohol","alcoholic","alibi","alien","alienate","align","alignment","allergenic","alley","alliance","allied","alligator","allotment","allow","allowable","almighty","almond","almost","alphabet","alphabetic","alphabetical","already","also","altercation","alternate","aluminium","always","amateur","amazement","amazing","amazingly","amber","ambidextrous","ambient","ambiguous","ambition","ambitious","ambivalent","ambulance","ambulatory","ambush","american","americana","ammonia","ammunition","amnesia","amnesiac","amoeba","amoebic","among","amongst","amoral","amphibian","amplitude","amputate","amputation","amulet","amuse","amusement","amusing","analysis","analyst","analytical","analyze","anatomy","ancestor","anchovies","androgynous","angel","anger","angriest","angry","anguish","animal","animalistic","animatronic","ankh","ankle","annihilate","annoying","annual","anonymous","answer","anteater","antelope","antelopes","anticlimactic","antidemocratic","antique","antiviral","anxiety","anxious","any","anybody","anyone","anyplace","anything","anytime","anyways","anywhere","apartment","ape","apocalypse","apocalyptic","apology","appalling","apparatus","apparent","apparently","apparition","appeal","appear","appearance","appetite","applause","apple","application","applied","appointment","approaching","approximation","apricot","aquamarine","aquarium","aquatic","arbitrary","arcane","arch","archer","architect","archive","area","ark","arm","armchair","armor","arms","army","aroma","arrival","arrogant","arrow","arrows","arson","arsonist","art","artificial","artist","ash","ashes","assassin","assassination","assault","assembly","associate","association","astounding","astronaut","atmosphere","atomic","atonement","atrocities","atrocity","attachment","attack","attacker","attacking","attempt","attic","attitude","attribute","auction","audacity","audience","audio","augmentation","authentic","authority","automatic","automatons","autonomous","autopilot","autopsy","auxiliary","available","avenging","average","aversion","aviator","avocado","avoid","awakening","award","awesome","awesomeness","awful","awkward","axe","axiom","axis","babble","babbling","baboon","baby","babysitter","bachelor","back","backbone","background","backward","backyard","bacon","bacteria","bad","badge","badger","badlands","badmouth","baffling","bag","bags","bait","bake","balance","balcony","bald","ball","ballerina","ballet","ballistic","ballistics","balloon","ballroom","baloney","bamboo","banana","bananas","bandsaw","bang","bank","bankroll","banquet","baptism","bar","barbarian","barbaric","barbell","barber","barbershop","barbwire","bare","bareknuckle","barge","bark","barn","barnacle","barnburner","barnyard","baron","barren","barricade","bars","barter","base","baseline","basement","bases","bash","basic","basin","basket","baster","bastion","bat","batch","battalion","battery","battle","battleground","bauble","bawling","bayonet","bazooka","beach","beacon","bead","beads","beak","beam","bean","bear","beard","bearskin","beast","beastly","beat","beaten","beautiful","beauty","beaver","became","because","become","becoming","bed","bedtime","beefcake","beehive","beekeeper","beeswax","beggar","begging","begin","beginner","beginning","behavior","behead","behind","behold","beholder","being","believable","believe","believer","believing","bell","belly","bellyache","bellybutton","bellyful","belong","belongings","below","belt","bench","bend","beneath","benefit","benevolent","bent","berserk","berserker","best","bestial","bet","betray","betrayal","better","between","bewitching","beyond","bible","biblical","big","biggest","bighead","bigmouth","bigwig","bike","bikini","billion","billionaire","bin","binding","binge","binocular","biological","biology","bionic","biplane","bird","birthday","birthmark","birthplace","bit","bite","biter","bitter","bitterness","bittersweet","bizarre","blabbermouth","black","blackheart","blacklist","blackmail","blackness","blackout","blackwater","bladder","blade","blame","bland","blank","blankly","blankness","blast","blasted","blaster","blasting","blaze","bleak","bleakly","bleakness","bleed","bleeder","bleeding","bleep","blemish","blend","blended","blender","bless","blessing","blimp","blind","blindfold","blinding","blindly","blindness","blink","blinking","blinks","blip","bliss","blissfully","blister","blizzard","bloat","blob","block","blockade","blocker","blockhead","bloke","blonde","blood","bloodlust","bloodsport","bloodstain","bloodstream","bloodsucker","bloodthirsty","bloody","bloom","blooper","blossom","blouse","blow","blowgun","blowtorch","blubber","bludgeon","blue","blueberry","blueprint","bluff","bluish","blunder","blunt","bluntness","blur","blurb","blurry","blurt","blush","blushing","bluster","boa","boar","boarder","boardinghouse","boardroom","boast","bodies","body","bogeyman","bold","boldly","bomb","bombastic","bomber","bone","bonus","boom","bootlegger","booze","border","born","bottle","bottom","bottomless","boulevard","bounce","bouncy","boundary","boutique","bovine","bowyer","box","brain","braincase","brainwash","brainwasher","branch","brand","brass","brave","brawler","breakable","breakaway","breakwater","breath","breathless","bribery","brick","bridge","brigade","bright","brightly","brilliant","brimstone","bring","bringer","broken","bronze","brood","brother","brown","brush","brutal","brutally","brute","brutish","bubble","bucket","buffer","buffet","bug","bughouse","building","bulging","bull","bulldog","bulldozer","bullet","bulletin","bullwhip","bully","bumble","bump","bumper","bunny","burden","burglary","burial","buried","burn","burning","burnt","business","butcher","buzz","bye","cable","cadaver","cage","calculation","calendar","calibration","call","calling","camel","candle","candy","candymaker","cannibal","cannibalism","cannon","canvas","canyon","capsule","captain","captive","captivity","capture","captured","caramel","caravan","carbon","carcass","carcinogenic","cardinal","caregiver","careless","caress","cargo","caribou","carnal","carnies","carnival","carnivore","carnivorous","carriage","carrion","carrot","cartel","carver","case","cashbox","casino","casket","cast","castle","cat","catch","category","caterpillar","cathedral","cattle","cave","cavity","ceaseless","celebration","celebrity","cell","cellblock","cellular","cement","centaur","center","central","century","ceramic","ceremonial","ceremony","chain","chair","chalk","challenge","chamber","chameleon","champion","channel","chant","chaos","chaotic","chapter","chapterhouse","charade","chargeable","charisma","charismatic","charm","charming","chart","checkpoint","cheerful","chef","chemical","cherry","chewable","chicken","chief","chieftain","child","childish","children","chill","chilly","chisel","choke","choker","choking","cholera","chop","chops","chromatic","chromosome","chronological","chunk","chunky","church","cinder","cinnamon","circle","circling","circuit","circuitry","circus","citizen","city","civilization","clairvoyant","clam","classic","claw","clay","clean","cleanup","clear","clever","climax","clinic","clock","closeup","closing","clot","cloth","cloud","clover","club","clubfoot","clubhouse","cluster","coal","coast","coastal","coat","cobra","coconut","cocoon","coddle","code","coercion","coffin","cognitive","coil","coincidence","coincidental","cola","cold","collapsing","collar","collarbone","collectable","collection","collide","collider","collision","colonel","colony","color","colors","colt","column","coma","comatose","combat","combatant","combustible","comet","comfortable","command","commando","commercial","committee","common","communication","communion","compact","companion","company","compartment","compassionate","compelling","complete","complicated","composite","compound","compulsion","compulsive","computation","computer","comrade","concave","concept","conceptual","concert","conclusion","concrete","concussion","condemn","condemned","condition","condo","confidence","confident","confidential","conflict","confrontational","confuse","confused","confusion","connectedness","connection","connectivity","conqueror","conquest","conscious","conservative","console","conspiracy","constant","consultant","consumer","consumption","contagious","container","contaminant","contamination","contempt","content","contest","contestant","continental","continuous","contortionist","contractual","contradiction","contrast","control","controller","controversial","conversation","conversion","convertible","convext","convict","convulsion","copper","cords","corduroy","corporation","corpse","correlation","corrosion","corrosive","corruption","cortex","cosmetic","cosmic","cosmically","cosmonaut","costume","costumed","cotemporary","cottage","cotton","couch","cougar","cough","council","country","countryside","couple","courage","courageous","coward","cows","coyotes","crab","crabs","crack","crackdown","crackpot","cradle","crafty","cranberry","crash","crasher","crater","crawl","crawler","crawling","crayon","crazy","creation","creative","creator","creature","credenza","creep","creeper","creepy","crew","cricket","crime","criminal","crimson","crisis","crisp","crispy","critical","crocodile","crook","crooked","crop","crossfire","crowd","crown","crucifier","crucifix","crucifixion","crude","cruel","cruelty","cruise","crumply","crunch","crush","crusher","crushing","crust","crutch","cry","crypt","cryptic","crystal","cube","cuddle","cuddly","cultish","cultural","cunning","curator","curfew","curiosities","curious","curse","cursed","curve","curved","cut","cuteness","cyanide","cybernetic","cyclical","cyclops","cynic","cynical","daddy","daisies","daisy","damage","damn","damnation","dancer","dancing","danger","dangerous","daredevil","daring","dark","dart","data","daughter","day","daydream","daydreamer","daylight","days","daytime","dazzling","dead","deadbeat","deadly","death","deathly","deathtrap","debate","debauchery","debug","decade","decadence","decadent","decapitation","decay","deceit","decent","deception","decipherer","decode","decoder","decomposition","decontamination","deduction","deep","deepwater","deer","defect","defection","defector","definitive","deformer","deformity","degenerate","degeneration","degrader","degrading","delete","deletion","delicacy","delicate","delicatessen","delicious","delight","deliverance","democracy","democratic","demolishment","demolition","demon","demonstration","dense","dent","department","dependent","deplorable","depression","derelict","describes","description","design","desire","desolate","despair","desperate","despisable","destiny","destroy","destruction","destructive","detachable","details","detainee","determined","detonator","detox","devastation","develop","devices","devil","devoid","devour","devout","dexterity","diabolatry","diabolic","diagonal","dial","diametric","diamond","diary","dictator","different","difficult","digital","dignitary","dilemma","dimension","dimensional","diminished","dinner","dinosaur","diplomacy","diplomat","diplomatic","direct","direction","director","dirt","dirty","disaster","disbeliever","disc","discharge","disciple","discipline","disclosure","disconnect","discontent","discord","discovery","discussion","disease","disfigured","disfigurement","disgusting","dishonest","disintegration","disk","dislikable","dismember","dismemberment","dismissal","disobey","disorientation","dispatch","disputed","disrupt","disrupter","dissolve","distancing","distant","distilery","distinct","distort","distortion","distribution","district","disturbance","ditch","diva","diversion","divine","divinity","division","divorce","dizzy","doberman","doctor","document","dog","dogs","dogtooth","doll","dolphin","dolphins","dome","domesticated","dominant","domination","domino","donation","donkey","donut","doom","doomsday","door","dope","dormant","dosage","dot","double","doubtless","dove","down","downcast","downfall","downhill","downriver","downtown","downward","dozen","dozens","drag","drain","drama","dramatic","dread","dream","dreamer","dreamland","dreamless","drench","dress","drift","drifter","drifting","drill","drimys","drink","drip","drive","driver","drone","drop","droplet","dropping","droppings","drops","drown","drowned","drowsy","drug","drugstore","drum","drumbeat","drunk","drunken","dry","dual","duck","duel","duke","dumb","dump","duplicate","dusk","dust","dynamic","dynamite","dynasty","eagle","ear","early","earthborn","earthmen","easier","east","eastern","easy","eat","eating","ebony","echo","edge","edit","eel","eerie","effective","egg","ego","egocentric","eigenvector","eight","elaborate","elastic","elbow","electric","electrode","electron","elegant","element","elephant","elephants","elevation","elevator","eliminate","elimination","elite","elongation","elsewhere","embrace","emerge","emergency","emotion","emotional","empathic","emperor","empire","empirical","empowerment","empty","encounter","encrypt","encryption","end","endless","endorsement","enemies","enemy","energy","enforcer","engine","enjoy","enlarge","enlighten","enormous","enrage","enter","enterprise","entertain","entity","entrance","entropy","envelope","enzyme","ephemeral","episode","equal","equation","equipment","equivalent","eraser","erotic","erotica","error","eruption","escalator","escape","escapist","esoteric","essence","essential","establishment","estate","estimate","eternal","eternity","ether","ethical","eunuch","evacuate","evacuation","evaluate","evectional","even","event","eventual","everlasting","every","everyday","everyone","evidence","evil","evoke","evolution","exact","examiner","excellent","exception","excess","excessive","exchange","excitement","exclusive","excuse","execute","executioner","executive","exhibit","exhibition","exile","existent","existing","exit","exorcism","expansion","experiment","expert","explicit","explosion","export","expose","exposition","expression","expressive","exquisite","extensive","external","extortion","extra","extract","extravagant","extreme","extremist","eye","eyes","eyetooth","fabric","fabrication","facade","face","faction","factory","factual","fade","fail","faint","fairytale","faith","faithless","fake","falcon","fall","falling","fallout","falls","false","family","famous","fanatic","fanatical","fancy","fang","fantastic","farm","fashion","fashionable","fast","fat","fatal","fatality","fate","fathead","father","favor","favorable","fear","fearless","fearsome","feast","feather","featherweight","feature","federal","federation","feed","feel","feeling","feelings","feet","fellow","felon","felony","felt","femur","fence","ferment","fermentation","ferocious","fertile","fertility","festival","fetish","feudal","fever","fiasco","fibreglass","fictional","field","fiend","fiendish","fierce","fiery","fight","fighter","fighting","figurehead","filament","film","filter","filth","filthy","fin","final","finale","financial","finch","find","finger","fingertip","finish","finishing","finite","fire","firearm","firecracker","firm","first","firstborn","fish","fist","fistfight","five","fix","fizz","flag","flags","flake","flamboyant","flamethrower","flaming","flammable","flap","flash","flat","flatness","flatten","flavor","flavoring","flaw","flawless","flesh","flicker","flight","flimsy","flinch","flip","flirt","flirtation","flood","flophouse","floppy","floral","flower","flowers","fluctuation","fluent","fluid","flunk","flush","flutter","flux","fly","flytrap","foam","focus","fog","foggy","fold","folding","folk","fool","foot","footwork","forbidden","force","forearm","foreign","forest","forger","forgery","forgiven","forgotten","fork","forlornness","form","formal","formula","formulation","fornicator","fort","fortress","fortunate","fortune","fortuneteller","forty","fossil","foul","foundation","founder","fountain","four","fraction","fracture","fragile","fragment","frame","frantic","fraud","fraudulent","freak","freakish","freaky","freckled","free","freedom","freewill","freeze","freezing","french","frequency","frequent","fresh","fried","friend","friendless","fright","frightening","frigid","fringe","frisky","frog","frogs","front","frontier","frost","frozen","frustration","frying","fuel","fugitive","fully","fumbling","functional","fundamental","funeral","funnel","furious","furry","fuse","future","futureless","futuristic","fuzz","fuzzy","gadget","galactic","gallery","galloping","gamble","gambler","game","gang","gangland","gaping","garage","garden","gargantuan","gargoyle","gasmask","gate","gateway","gaunt","gauntlet","gazelle","gear","gems","general","generation","genetic","genuine","geometric","geometrical","geometry","germ","gestural","getaway","ghetto","ghost","ghostly","ghoul","ghoulish","giant","gibberish","gift","gifted","gigantic","gimmick","ginger","giver","giving","glacial","glacier","gladness","glamor","glamorous","gland","glandular","glass","glider","glimmer","glitter","glittery","global","gloomy","glory","glossy","gloves","glow","glumly","glutton","gluttonous","goat","gobbling","god","godless","godsent","goggles","going","gold","goldbricker","goldfish","gone","good","goodbye","goofball","goon","gorgeous","gorilla","gossip","governor","grab","grabbing","graceful","grade","gradient","graffiti","grain","grainy","grand","grandiose","granite","granularity","grape","graphic","grappler","grasp","grasshopper","grateful","grave","gravel","graveyard","gravitational","gravy","gray","grease","greasy","great","greatest","greed","greedy","green","grenade","grey","grid","grieving","grill","grim","grin","grind","grinder","grinding","grinning","grip","gripping","grit","gritty","grizzly","groan","groaner","groaning","groove","groovy","gross","grotesque","ground","grounds","groundwave","group","growl","grunting","guaranteed","guard","guerilla","guest","guide","guidebook","guideline","guild","guillotine","guilt","guilty","gulf","gum","gun","gunk","gunplay","gunrunner","guns","gurgle","gurgling","guru","gushing","gutless","guts","gutsy","gutter","guzzling","gymnast","gymnastic","habit","habitual","hack","hacksaw","hairless","hairy","half","halfway","halloween","hallucination","halting","hammerhead","hamster","hand","handlebars","handler","hands","handsaw","hangar","hangman","hangover","happiness","happy","harbor","hard","harlot","harm","harmless","harmonic","harmony","harness","harplike","harpoon","harsh","harvest","hash","hat","hatch","hatchet","hate","haunt","haunting","hawk","haywire","hazard","hazy","head","headache","headlock","headphones","headquarters","headstrong","heal","healer","healing","healthy","hear","hearing","hearse","heart","heartbeat","heartbroken","heartless","hearts","heartsick","heat","heater","heating","heatstroke","heaven","heavenly","heaviest","heaving","heavy","heavyhearted","heavyset","heavyweight","hectic","heelbone","heist","helicopter","hell","hellfire","helmet","help","helpless","hemlock","herald","herb","herd","heretic","heretical","heritage","hermit","hero","heroes","heroic","hesitation","hex","hibernation","hickory","hidden","hide","hideaway","hideous","hideout","high","highway","hill","hills","hinge","hipbone","hippo","hirsute","hiss","historic","history","hit","hitchhiker","hive","hoax","hoaxer","hobby","hogtied","hogwash","hoist","hold","holding","holdup","holes","holiday","holiest","hollow","hollowness","holy","home","homeland","homeless","homemade","homesick","hometown","homewards","homicidal","homicide","honest","honesty","honey","honeybee","honeydew","honeymoon","honeypot","honor","honorary","hood","hoodwink","hoof","hoofs","hook","hooligan","hoop","hoopla","hooves","hop","hope","hopeless","hopper","hopscotch","horizon","horizontal","hormonal","horn","horoscope","horrible","horrific","horror","horrors","horse","horseback","horseplay","horsepower","horseradish","horses","hose","hospital","host","hostage","hostility","hot","hotel","hothead","hotly","hotter","hottest","hound","hour","house","houseguest","hover","how","however","howling","huffy","hug","huge","human","humanlike","humanly","humble","humid","humility","humming","hump","hunchback","hundred","hunger","hungry","hunk","hunt","hunter","hunting","hurdle","hush","hustle","hyaena","hybrid","hymn","hype","hypnotic","ideal","identical","identity","ignorant","iguana","illegal","imaginary","immunity","implant","imposter","imprint","improper","impure","indecent","industrial","industry","infinite","initial","injury","injustice","ink","inner","innocent","insane","insanity","insect","insecure","insurance","internal","intimate","intoxicant","intruder","invader","invention","inverse","invisible","invitation","iron","islamism","island","ivory","ivy","jackknife","jade","jagged","jar","jerid","jerk","jewel","jigsaw","joypop","joyride","joystick","judgment","juice","jump","junior","junk","junkyard","justice","juvenile","kangaroo","key","kick","kidnapper","kill","killjoy","kind","king","kingdom","kissing","kitten","knot","knowing","knuckle","knuckles","lady","ladybug","land","lands","landscape","lantern","large","largest","laser","lasso","last","lavender","leaf","leather","left","legend","legendary","legion","lemon","lethal","level","levitating","liberal","liberating","liberation","lick","licker","life","light","lightning","lights","lime","limitless","limousine","linear","link","lion","liqueur","liquid","liquor","little","live","liver","lizard","lock","lockbox","locus","locust","logic","logical","lollipop","loneliness","lonely","loner","lonesome","long","loop","loophole","lord","loser","lottery","love","lovesick","low","loyal","lubricant","luck","lucky","lullaby","luminous","lump","lurker","lust","lustre","luxurious","luxury","machine","mad","magic","magnet","magnetic","magnificent","major","marble","marginal","marsh","martingale","martini","martyr","mary","mask","massacre","massive","master","maximum","meat","mechanical","medicine","medusa","megacity","melody","melt","memory","menace","mental","messenger","messiah","metal","metallic","mightiest","mighty","military","milky","mind","mindless","minimal","minipill","mirror","miserable","misshapen","missing","mission","mistaken","mix","mixer","moan","moaning","mob","mobster","model","modern","mohawk","moist","molecular","molten","moment","momentary","monarchy","money","mongrel","monkey","monochrome","mood","moon","moonbeam","morbid","more","morsel","mortal","moth","mother","mountain","mouth","murder","murderer","murderous","murky","muscle","muscleman","muscular","mushroom","mustache","mutagen","mutant","mutation","mutilation","muzzle","mysterious","mystery","mystical","mythical","naive","naked","narcotic","nasty","national","natural","near","nebula","neck","necrotic","nectar","needle","negative","neon","nerve","nervous","neurotic","new","nice","night","nightfall","nightmare","nineteen","nitro","noble","noir","noise","noisemaker","nomad","nomadic","norm","normal","north","northern","nuclear","nude","number","numbskull","numeric","nurse","obey","object","observer","obsession","ocean","octopus","odd","offender","officer","official","old","omnivore","one","open","operatic","opposition","optimum","optional","orange","orangutang","orb","orchard","ordeal","original","ornamental","orphan","orphanage","orthodox","overt","owl","ox","pagan","pageant","pain","painkiller","painless","pale","pandemic","panic","paper","parachute","parade","paradise","paradox","parallel","paralysed","paralysis","parasite","parasitic","parcel","parrot","passenger","passion","paste","pastoral","patient","patrol","pattern","pavement","peach","pearl","peepshow","pelvic","penguin","peppermint","perception","percussive","perfect","perfection","perfume","perilous","periodic","perplexing","personal","pervert","perverted","pesky","pessimist","pest","phantom","pharaoh","phase","phenomena","phenomenal","philosophy","phonetic","phonograph","photograph","pick","picnic","pictorial","piece","pieces","pig","pigeon","pigsticker","pilgrim","pill","pillbox","pilot","pimp","pin","pinch","pineapple","pink","pinwheel","pipe","pipes","pistol","pitch","pity","plaid","planet","planetary","plant","plantation","plasma","plastic","play","playground","plaything","playtime","pleasant","plush","pneumatic","pocket","poet","poetic","poetry","poison","poisoner","poisonous","polar","polite","pony","poor","popular","pork","port","portal","portrait","position","positive","possess","possession","potential","pound","pounding","powder","power","powerful","powerless","practical","pragmatic","prank","prayer","predator","predatory","predict","prediction","prefab","present","preserve","president","pressure","presumed","pretend","primate","prime","primitive","prior","private","privilege","privileged","probe","process","production","profile","profound","program","project","projection","promise","promised","prong","proof","propaganda","propellant","propeller","proper","property","prophesy","prophet","prophetic","prophets","proposal","protect","protection","protest","proud","proven","provider","psycho","public","pull","pulse","punch","puppet","pure","purple","purpose","push","puzzle","pyramids","python","quantum","queen","quick","rabbit","racket","racoon","rage","raid","rain","rainfall","ranch","ransom","rapid","rare","raspberry","rassling","raster","rastle","rastled","rastling","rat","rattle","raven","raw","ray","really","rear","reason","rebel","recent","reckless","recluse","record","red","refugee","regional","regret","relearn","release","repeat","reptile","republic","rerun","research","retreat","revenge","reversal","reverse","revolt","rib","rich","riddle","right","rights","ring","riot","ripe","risky","rival","roast","robber","robbery","robot","robotic","rodent","room","root","rose","rot","rotten","rough","round","royal","royalty","rubber","ruby","rude","rum","rust","sabotage","sacred","sad","sadistic","sadness","saint","salt","salty","sand","sanitary","sauce","savage","sawdust","scanner","scar","scenic","scheme","schemer","scream","screamer","search","section","sector","seducer","seed","selfish","sentinel","serenity","series","serpent","serum","servant","settler","setup","seven","several","severe","sewage","sex","sexiest","sexless","sexual","shack","shackle","shadow","shag","shake","shaman","shameful","shark","sharp","shine","shipment","shock","shocking","short","shotgun","show","shrimp","sick","sideshow","sideways","signal","silence","silver","simple","sink","siren","sissy","six","skin","skull","sky","skyline","slap","slave","sleep","slippery","small","smallpox","smart","smile","smoke","smooth","smuggler","smut","snail","snake","social","soft","solid","solitary","some","someone","song","sonic","soon","sorrow","soul","sound","soup","source","south","southern","sparkle","sparkler","sparrow","speed","spell","sphere","spider","spike","spirit","spirits","sponge","sprite","sprites","square","stage","stallion","star","starfish","state","station","stealthy","steel","sticky","stiff","stone","strange","strong","stun","suave","subsonic","subway","suckle","sudden","sugar","sun","sunrise","super","surgeon","surgical","surreal","swamp","swarm","sweat","sweet","swindler","switch","swollen","symbol","symbolic","system","tactic","tactical","talk","tank","taste","teargas","teen","teeth","ten","tense","tenth","terminus","terrific","terror","thick","thief","thin","thing","things","think","threat","thumb","thunder","tiger","tight","time","timeless","timid","tin","tiny","tongue","tooth","top","torch","tornado","torpedo","total","toy","tragic","trap","trauma","treason","treasure","tree","treed","tremor","trial","triangle","true","trust","truth","twelve","twin","twisted","two","tyrant","ugly","ultimate","under","undersea","union","unit","unliving","unsure","uprising","uptown","urban","useless","vacant","vampire","vast","vibrator","victory","village","villain","vinyl","violence","violent","viper","virgin","virtual","vision","visitor","vixen","voice","void","volcanic","volcano","volume","vulture","wake","wall","war","warm","warmth","warning","warp","warrior","wartime","wasp","watch","water","waveform","wax","weak","wealthy","weapon","wearable","weasel","web","weed","weird","weirdo","wept","werewolf","west","western","westwork","wet","whale","whales","whip","whisper","wife","wig","wild","wilderness","willow","winter","wire","wisdom","wise","wish","witch","witness","wizard","wolf","wolves","wonder","world","worm","wreck","wreckage","wrong","young","zebra","zero","zipper","zombie","zoo"];

function generateRandowmWords(){
	var wLen = $("#wordLength").val();
	var getRandomWord = function () {
	    return wordList[Math.floor(Math.random() * wordList.length)];
	    };
	    
	var count = 1;
	var wordArr = "<table class='display'><tr>";
	while(count <= wLen){
		wordArr = wordArr + "<td><button class='span12'>" +getRandomWord().toUpperCase() + "</button></td>";
		if(count / 3 == 0){
			wordArr = wordArr + "</tr><tr>";
		}
		count++;
	}
	wordArr = wordArr + "</tr><table>";
	
	 $("#output").html(wordArr);
}