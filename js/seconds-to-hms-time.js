  $("#seconds-to-hms-submit").click(function(e) {
    e.preventDefault();
    var text = $('#seconds-to-hms-text').val();
    if(text == "")
		{
			$("#seconds-to-hms-text").focus().parents("div.form-group").addClass("has-error");
			return false;
		}else
		{
			$("#seconds-to-hms-text").parents("div.form-group").removeClass("has-error");
	$("html, body").animate({
		scrollTop: ($("h1").offset().top - 10)
	}, 600);
		}
	text = text.replace(/\r\n/g, '\n');
            var lines = text.split('\n');
            var ret = '';
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];
                if (/(\d+)/.test(line)) {
                    var seconds = line;

                    var hours = Math.floor(seconds / 3600);
                    var minutes = Math.floor((seconds - (hours * 3600)) / 60);
                    var seconds = seconds % 60;

                    ret += hours + ':' + minutes + ':' + seconds;
                }
                else {
                    ret += line;
                }
                ret += '\n';
            }
    $("#res").val(ret);
});
$("#clear").click(function(e) {
    	e.preventDefault();
		$("#seconds-to-hms-text,#res").val("");
		$("#seconds-to-hms-text").parents("div.form-group").removeClass("has-error");
	$("html, body").animate({
		scrollTop: ($("html").offset().top - 10)
	}, 600);
    });