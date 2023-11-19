function is_number(val)
{
	regex = new RegExp(/^\d+$/);
	if(!regex.test(val))
	{
		return false;
	}else
	{
		return true;
	}
}
$("#clear").click(function(e) {
	e.preventDefault();
	$("#out").val("");
	$("html, body").animate({
		scrollTop: ($("html").offset().top - 10)
	}, 600);
});

$("#copy").click(function(e) {
	e.preventDefault();
	$('#out').select();
	document.execCommand('copy');
});


function check_number(selector)
{
	number = parseInt($.trim($(selector).val()));
	if(!is_number(number))
	{
		valid = false;
		$(selector).focus().parents("div.form-group").addClass("has-error");
		$("div.info").html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;Please enter a number starting from 1.');
		return false;
	}else
	{
		$(selector).parents("div.form-group").removeClass("has-error");
		$("div.info").html("");
	}
	if(number < 1)
	{
		valid = false;
		$(selector).focus().parents("div.form-group").addClass("has-error");
		$("div.info").html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;Please enter a number starting from 1.');
		return false;
	}else
	{
		$(selector).parents("div.form-group").removeClass("has-error");
		$("div.info").html("");
	}
}

function is_form_ok()
{
	valid = true;
	
	type = $.trim($("#items_type").val());
	
	switch(type)
	{
		case "words":
			check_number("#items");
			break;
		case "sentences":
			check_number("#items");
			if(valid)
			{
				check_number("#min_words");
			}
			if(valid)
			{
				number = parseInt($.trim($("#max_words").val()));
				if(!is_number(number))
				{
					valid = false;
					$("#max_words").focus().parents("div.form-group").addClass("has-error");
					$("div.info").html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;Please enter a number greater than or equal to Minimum words per sentence.');
					return false;
				}else
				{
					$("#max_words").parents("div.form-group").removeClass("has-error");
					$("div.info").html("");
				}
				if(number < parseInt($.trim($("#min_words").val())))
				{
					valid = false;
					$("#max_words").focus().parents("div.form-group").addClass("has-error");
					$("div.info").html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;Please enter a number greater than or equal to Minimum words per sentence.');
					return false;
				}else
				{
					$("#max_words").parents("div.form-group").removeClass("has-error");
					$("div.info").html("");
				}
			}
			break;
		case "paragraphs":
			check_number("#items");
			if(valid)
			{
				check_number("#min_words");
			}
			if(valid)
			{
				number = parseInt($.trim($("#max_words").val()));
				if(!is_number(number))
				{
					valid = false;
					$("#max_words").focus().parents("div.form-group").addClass("has-error");
					$("div.info").html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;Please enter a number greater than or equal to Minimum words per sentence.');
					return false;
				}else
				{
					$("#max_words").parents("div.form-group").removeClass("has-error");
					$("div.info").html("");
				}
				if(number < parseInt($.trim($("#min_words").val())))
				{
					valid = false;
					$("#max_words").focus().parents("div.form-group").addClass("has-error");
					$("div.info").html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;Please enter a number greater than or equal to Minimum words per sentence.');
					return false;
				}else
				{
					$("#max_words").parents("div.form-group").removeClass("has-error");
					$("div.info").html("");
				}
			}
			if(valid)
			{
				check_number("#min_sentences");
			}
			if(valid)
			{
				number = parseInt($.trim($("#max_sentences").val()));
				if(!is_number(number))
				{
					valid = false;
					$("#max_sentences").focus().parents("div.form-group").addClass("has-error");
					$("div.info").html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;Please enter a number greater than or equal to Minimum sentences per paragraph.');
					return false;
				}else
				{
					$("#max_sentences").parents("div.form-group").removeClass("has-error");
					$("div.info").html("");
				}
				if(number < parseInt($.trim($("#min_sentences").val())))
				{
					valid = false;
					$("#max_sentences").focus().parents("div.form-group").addClass("has-error");
					$("div.info").html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;Please enter a number greater than or equal to Minimum sentences per paragraph.');
					return false;
				}else
				{
					$("#max_sentences").parents("div.form-group").removeClass("has-error");
					$("div.info").html("");
				}
			}
			break;
	}
	
	return valid;
}

$(document).ready(function(e) {
	$("#out").focus(function(e) {
        e.preventDefault();
		$(this).select();
    });

	$("#generate").click(function(e) {
        e.preventDefault();
		if(is_form_ok())
		{
			type = $.trim($("#items_type").val());
			markup = $.trim($("#markup").val());
			items = parseInt($.trim($("#items").val()));
			$("html, body").animate({
				scrollTop: ($("h1").offset().top - 10)
			}, 600);
			switch(type)
			{
				case "words":
					out = loremIpsum({
						count: items,
						units: 'words'
					});
					if(markup == "html")
					{
						out = "<p>" + out + "</p>";
					}
					$("#out").val($.trim(out));
					break;
				case "sentences":
					min_words = parseInt($.trim($("#min_words").val()));
					max_words = parseInt($.trim($("#max_words").val()));
					out = "";
					for(i = 0; i < items; i++)
					{
						sentence = loremIpsum({
							count: 1,
							units: 'sentences',
							sentenceLowerBound: min_words,
							sentenceUpperBound: max_words
						});
						if(markup == "html")
						{
							sentence = "<p>" + sentence + "</p>";
						}
						sentence += "\n\n";
						out += sentence;
					}
					$("#out").val($.trim(out));
					break;
				case "paragraphs":
					min_words = parseInt($.trim($("#min_words").val()));
					max_words = parseInt($.trim($("#max_words").val()));
					min_sentences = parseInt($.trim($("#min_sentences").val()));
					max_sentences = parseInt($.trim($("#max_sentences").val()));
					out = "";
					for(i = 0; i < items; i++)
					{
						paragraph = loremIpsum({
							count: 1,
							units: 'paragraphs',
							sentenceLowerBound: min_words,
							sentenceUpperBound: max_words,
							paragraphLowerBound: min_sentences,
							paragraphUpperBound: max_sentences
						});
						if(markup == "html")
						{
							paragraph = "<p>" + paragraph + "</p>";
						}
						paragraph += "\n\n";
						out += paragraph;
					}
					$("#out").val($.trim(out));
					break;
			}
		}
    });
	$("#items_type").val("paragraphs").change();
    $("#items_type").change(function(e) {
        e.preventDefault();
		val = $.trim($(this).val());
		$("#min_words,#max_words,#min_sentences,#max_sentences").parents("div.form-group").hide();
		switch(val)
		{
			case "words":
				
				break;
			case "sentences":
				$("#min_words,#max_words").parents("div.form-group").show();
				break;
			case "paragraphs":
				$("#min_words,#max_words,#min_sentences,#max_sentences").parents("div.form-group").show();
				break;
		}
    });
});