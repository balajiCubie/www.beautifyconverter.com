  $("#postgres-password-submit").click(function(e) {
    e.preventDefault();
    var text = $('#postgres-password-text').val();
		if(text == "")
		{
			$("#postgres-password-text").focus().parents("div.form-group").addClass("has-error");
			return false;
		}else
		{
			$("#postgres-password-text").parents("div.form-group").removeClass("has-error");
			$("#res").parents("div.form-group").removeClass("hide");
		}
	var username = $('#postgres-username').val();
    var result = 'md5' + CryptoJS.MD5(text.toString() + username.toString());
    $("#res").val(result);
	$("html, body").animate({
		scrollTop: ($("h1").offset().top - 10)
	}, 600);
});
$("#clear").click(function(e) {
    	e.preventDefault();
		$("#postgres-password-text,#postgres-username,#res").val("");
		$("#postgres-password-text").parents("div.form-group").removeClass("has-error");
			$("#res").parents("div.form-group").addClass("hide");
	$("html, body").animate({
		scrollTop: ($("html").offset().top - 10)
	}, 600);
    });