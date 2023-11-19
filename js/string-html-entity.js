$("#clear").click(function(e) {
	e.preventDefault();
	$("#character").val("");
	$("#character").parents("div.form-group").removeClass("has-error");
	$("#result").hide();
	$("html, body").animate({
		scrollTop: ($("html").offset().top - 10)
	}, 600);
});
$("#charInfoButton").click(function(e) {
	e.preventDefault();
	var character = $("#character").val();
	if(!character) {
		$("#character").parents("div.form-group").addClass("has-error");
		return;
	} else {
		$("html, body").animate({
			scrollTop: ($("#character").offset().top - 10)
		}, 600);
		$("#character").parents("div.form-group").removeClass("has-error");
		$("#result").show();
		var ret = '';
		for(var i = 0; i < character.length; i++) {
			ret += "&#x" + character[i].charCodeAt(0).toString(16) + ";";
		}
		$("#htmlValue").text(ret);
	}
});