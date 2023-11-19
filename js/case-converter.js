var options = {
	input: false
}
var zone = new FileDrop('code', options)
zone.event('send', function(files) {
	files.each(function(file) {
		file.readData(
			function(str) {
				zone.el.value = str
			},
			function(e) {
				alert('Terrible error!')
			},
			'text'
		)
	})
})
function CaseConverter(type) {
        input = $("#code").val();
		if (input.length <= 0 || input === "Please enter code") {
			$("#code").focus().val("Please enter code").parents("div.form-group").addClass("has-error");
			return false
		} else {
			$("#code").parents("div.form-group").removeClass("has-error")
		}
	$("html, body").animate({
		scrollTop: ($("#code").offset().top - 10)
	}, 600);
        if (input.trim().length != 0) {
            if (type == "T") {
                output = input.toProperCase();
            }
            else if (type == "U") {
                output = input.toUpperCase();
            }
            else if (type == "L") {
                output = input.toLowerCase();
            }
            else if (type == "S") {
                output = SentenceCase(input);
            }
            $("#packer").val(output);
        }
	$("#res").show();
}
$("#clear").click(function(e) {
	e.preventDefault();
	$("html, body").animate({
		scrollTop: ($("html").offset().top - 10)
	}, 600);
	$("#code").val("");
	$("#packer").val("");
	$("#code").parents("div.form-group").removeClass("has-error");
	$("#res").hide();
})
String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
};
function SentenceCase(text) {
    text = text.split(".");
    var sentence = "";
    for (var i = 0; i < text.length; i++)
        sentence = sentence + "." + text[i].substr(0, 2).toUpperCase() + text[i].substr(2);
    return sentence.substr(1);
}
