$("#cl").click(function(e) {
    	e.preventDefault();
		$("#validxml1").val("");
		$("#validxml1").parents("span.y").removeClass("has-error");
        $('#new').hide();
	$("html, body").animate({
		scrollTop: ($("html").offset().top - 10)
	}, 600);
    });

$("#val").click(function(e) {
    	e.preventDefault();
		input = $.trim($("#validxml1").val());
		new_txt = $.trim($("#new_txt").val());
	$("html, body").animate({
		scrollTop: ($("h1").offset().top - 10)
	}, 600);
		if(input == "")
		{
			$("#validxml1").focus().parents("div.form-group").addClass("has-error");
			return false;
		}else
		{
			$("#input").parents("div.form-group").removeClass("has-error");
		}
});
var xt="",h3OK=1
function checkErrorXML(x)
{
xt=""
h3OK=1
checkXML(x)
}

function checkXML(n)
{
var l,i,nam
nam=n.nodeName
if (nam=="h3")
	{
	if (h3OK==0)
		{
		return;
		}
	h3OK=0
	}
if (nam=="#text")
	{
	xt=xt + n.nodeValue + "\n"
	}
l=n.childNodes.length
for (i=0;i<l;i++)
	{
	checkXML(n.childNodes[i])
	}
}

function validateXML(txt)
{
// code for IE
if (window.ActiveXObject)
  {
  var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
  xmlDoc.async=false;
  xmlDoc.loadXML(document.all(txt).value);
  if(xmlDoc.parseError.errorCode!=0)
    {
    txt="Error Code: " + xmlDoc.parseError.errorCode + "\n";
    txt=txt+"Error Reason: " + xmlDoc.parseError.reason;
    txt=txt+"Error Line: " + xmlDoc.parseError.line;
    alert(txt);
    }
  else
    {
    alert("No errors found");
    }
  }
// code for Mozilla, Firefox, Opera, etc.
else if (document.implementation.createDocument)
  {
  try
  {
  var text=document.getElementById(txt).value;
  var parser=new DOMParser();
  var xmlDoc=parser.parseFromString(text,"application/xml");
  }
  catch(err)
  {
  alert(err.message)
  }

if (xmlDoc.getElementsByTagName("parsererror").length>0)
   {
   checkErrorXML(xmlDoc.getElementsByTagName("parsererror")[0]);
	document.getElementById("new").style.display = "block";
	document.getElementById("new").innerHTML = '<div class="alert alert-danger">'+xt+'</div>';
   }
 else
   {
	document.getElementById("new").style.display = "block";
	document.getElementById("new").innerHTML = "<div class=\"alert alert-info\">Hooray, Right code.</div>";
   }
 }
else
 {
 alert('Your browser cannot handle XML validation');
 }
}