$(document).ready(function(e) {
	$("#clear").click(function(e) {
    	e.preventDefault();
		$("#data").val("");
		$("#data").parents("div.col-md-12").removeClass("has-error");
		$("#radios-0").prop({"checked" : true});
		$("html, body").animate({
			scrollTop: ($("html").offset().top - 10)
		}, 600);
    });
var options = {input: false}
var zone = new FileDrop('data', options)

zone.event('send', function (files) {
  files.each(function (file) {
    file.readData(
      function (str) { zone.el.value = str },
      function (e) { alert('Terrible error!') },
      'text'
    )
  })
})
	$("#go").click(function(e) {
        e.preventDefault();
		data = $.trim($("#data").val());
		action = $.trim($("#radios option:selected").val());
		if(data == "")
		{
			$("#data").focus().parents("div.col-md-12").addClass("has-error");
			return false;
		}else
		{
			$("#data").parents("div.col-md-12").removeClass("has-error");
		}
		out = "";
		$("html, body").animate({
			scrollTop: ($("h1").offset().top - 10)
		}, 600);
		switch(action)
		{
			case "camelize":
				out = S(data).camelize().s;
				$("#data").val(out);
				break;
			case "capitalize":
				arr = data.split(".");
				$.each(arr, function(key, val) {
					if($.trim(val) != "")
					{
						out += S($.trim(val)).capitalize().s + ". ";
					}
				});
				$("#data").val($.trim(out));
				break;
			case "collapseWhitespace":
				out = S(data).collapseWhitespace().s;
				$("#data").val(out);
				break;
			case "dasherize":
				out = S(data).dasherize().s;
				$("#data").val(out);
				break;
			case "isAlpha":
				out = S(data).dasherize().s;
				if(out){
					$("#msg").html("The string contains only letters");
					$("#msg_modal").modal({backdrop : false});
				}
				break;
			case "stripPunctuation":
				out = S(data).stripPunctuation().s;
				$("#data").val(out);
				break;
			case "stripTags":
				out = S(data).stripTags().s;
				$("#data").val(out);
				break;
			case "trim":
				out = S(data).trim().s;
				$("#data").val(out);
				break;
			case "decodeHTMLEntities":
				out = S(data).decodeHTMLEntities().s;
				$("#data").val(out);
				break;
			case "escapeHTML":
				out = S(data).escapeHTML().s;
				$("#data").val(out);
				break;
			case "humanize":
				out = S(data).humanize().s;
				$("#data").val(out);
				break;
			case "latinise":
				out = S(data).latinise().s;
				$("#data").val(out);
				break;
			case "length":
				data = $.trim(data);
				$("#msg").html("The length of the string is: <b>" + data.length + "</b>");
				$("#msg_modal").modal();
				break;
			case "lines":
				data = S(data).lines().length;
				$("#msg").html("The number of newlines is: <b>" + data + "</b>");
				$("#msg_modal").modal({backdrop : false});
				break;
			case "slugify":
				out = S(data).slugify().s;
				$("#data").val(out);
				break;
			case "titleCase":
				out = S(data).titleCase().s;
				$("#data").val(out);
				break;
			case "underscore":
				out = S(data).underscore().s;
				$("#data").val(out);
				break;
			case "unescapeHTML":
				out = S(data).unescapeHTML().s;
				$("#data").val(out);
				break;
			case "mlowercase":
				$("#data").val(data.toLowerCase());
				break;
			case "muppercase":
				$("#data").val(data.toUpperCase());
				break;
			case "reverse":
				$("#data").val(data.split("").reverse().join(""));
				break;
			case "csentence":
				arr = data.split(".");
				i = 0;
				$.each(arr, function(key, val) {
					if($.trim(val) != "")
					{
						i++;
					}
				});
				$("#msg").html("The total number of sentences in the string is: <b>" + i + "</b>");
				$("#msg_modal").modal({backdrop : false});
				break;
			case "cword":
				data = Math.ceil(data.split(/\b/g).length / 2);
				$("#msg").html("The total number of words in the string is: <b>" + data + "</b>");
				$("#msg_modal").modal({backdrop : false});
				break;
		}
	});
});