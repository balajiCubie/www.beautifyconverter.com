  $("#mysql-password-submit").click(function(e) {
    e.preventDefault();
    var text = $('#mysql-password-text').val();
		if(text == "")
		{
			$("#mysql-password-text").focus().parents("div.form-group").addClass("has-error");
			return false;
		}else
		{
			$("#mysql-password-text").parents("div.form-group").removeClass("has-error");
			$("#res").parents("div.form-group").removeClass("hide");
		}
	var x1 = CryptoJS.SHA1(text);
    var x2 = CryptoJS.SHA1(x1);
    var pass = '*' + x2;
    var result = pass.toUpperCase();
    $("#res").val(result);
	$("html, body").animate({
		scrollTop: ($("h1").offset().top - 10)
	}, 600);
});
$("#clear").click(function(e) {
    	e.preventDefault();
		$("#mysql-password-text,#res").val("");
		$("#mysql-password-text").parents("div.form-group").removeClass("has-error");
			$("#res").parents("div.form-group").addClass("hide");
	$("html, body").animate({
		scrollTop: ($("html").offset().top - 10)
	}, 600);
    });