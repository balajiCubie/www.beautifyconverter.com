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
		if (input == "") {
			$("#input").focus().parents("div.form-group").addClass("has-error");
			return false;
		} else {
			$("#input").parents("div.form-group").removeClass("has-error");
			$("#output").parents("div.form-group").removeClass("hide");
			scroll_to_el();
		}
	});

	function scroll_to_el() {
		$("html, body").animate({
			scrollTop: ($("h1").offset().top - 10)
		}, 600);
	}

	function scroll_to_top() {
		$("html, body").animate({
			scrollTop: ($("html").offset().top - 10)
		}, 600);
	}

	function allNumbersConvter(inputId, fromBaseid, toBaseid, convertDirection) {
		var str = $("#" + inputId).val();
		var from = $("#" + fromBaseid).val();
		var to = $("#" + toBaseid).val();

		$("#select_from_title").text($("#select_from option:selected").text());
		$("#select_to_title").text($("#select_to option:selected").text());
		//convertDirection by default is Left(From) To (Right)To
		convertDirection = typeof convertDirection !== 'undefined' ? convertDirection : "lefttoright";
		if (convertDirection == "lefttoright") {
			var result = convertFromBaseToBase(str, from, to);
			console.log(result);
			$("#output_to").val(result);
		} else {
			var result = convertFromBaseToBase(str, from, to);
			$("#input_from").val(result);
		}
	}

	//number to word
	var th = ['', 'thousand', 'million', 'billion', 'trillion'];
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
		var a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
		var b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

		if ((num = num.toString()).length > 9) return 'overflow';
		n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
		if (!n) return;
		var str = '';
		str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
		str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
		str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
		str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
		str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
		return str;
	}

	function convertNumberToWords() {

		var str = $("#input").val();

		var countryCode = $("#nwcountry").val();

		if (countryCode == "mr_IN") { //indian
			var num = str.split('.');
			if (num.length > 2) {
				$("#output").val("Invalid Number");
			} else if (num.length == 1) {
				$("#output").val(NumberToWordsIndia(str).toUpperCase());
			} else {
				$("#output").val(NumberToWordsIndia(num[0]).toUpperCase() + " POINT " + NumberToWordsIndia(num[1]).toUpperCase());
			}
		} else { //usa
			$("#output").val(NumberToWordsUSA(str).toUpperCase());
		}
	}