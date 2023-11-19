$(document).ready(function(e) {
	function setTheme() {
		theme = $.trim($("#themes").val());
		font_size = $.trim($("#font_size").val());
		
		editorAce1.setTheme("ace/theme/" + theme);
		$("#code1").css({"font-size" : (font_size + "px")});
		editorAce1.setOptions({
			enableBasicAutocompletion : true,
			enableSnippets : true,
			enableLiveAutocompletion : true
		});
		
		editorAce2.setTheme("ace/theme/" + theme);
		$("#code2").css({"font-size" : (font_size + "px")});
		editorAce2.setOptions({
			enableBasicAutocompletion : true,
			enableSnippets : true,
			enableLiveAutocompletion : true
		});
	}
	
	function show_msg(msg, type)
	{
		if(type == "info")
		{
			$("#msg").html('<span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>&nbsp;' + msg).removeClass("text-danger")
			.addClass("text-info");
			$("#msg_modal").modal({backdrop : false});
		}else if(type == "error")
		{
			$("#msg").html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;' + msg).removeClass("text-info")
			.addClass("text-danger");
			$("#msg_modal").modal({backdrop : false});
		}
	}
	
	ace.require("ace/ext/language_tools");
	var editorAce1 = ace.edit("code1");
	editorAce1.focus();
	editorAce1.setOptions({
		enableBasicAutocompletion: true,
		enableSnippets: true,
		enableLiveAutocompletion: true
	});
    editorAce1.setTheme("ace/theme/monokai");
    editorAce1.getSession().setMode("ace/mode/sql");
	
	var editorAce2 = ace.edit("code2");
	editorAce2.setOptions({
		enableBasicAutocompletion: true,
		enableSnippets: true,
		enableLiveAutocompletion: true
	});
    editorAce2.setTheme("ace/theme/monokai");
    editorAce2.getSession().setMode("ace/mode/xml");
	editorAce2.getSession().setUseWorker(false);
	
	$("#clear").click(function(e) {
    	e.preventDefault();
		editorAce1.setValue("");
		editorAce2.setValue("");
    });
	
	$("#clear_code1,#clear_code2").click(function(e) {
        e.preventDefault();
		if($(this).is("#clear_code1"))
		{
			editorAce1.setValue("");
		}else
		{
			editorAce2.setValue("");
		}
    });
	
	$("#copy_data1").click(function(e) {
	    var sel = editorAce1.selection.toJSON(); // save selection
	    editorAce1.selectAll();
	    editorAce1.focus();
	    document.execCommand('copy');
	    editorAce1.selection.fromJSON(sel); // restore selection
    });
	
	$("#copy_data2").click(function(e) {
	    var sel = editorAce2.selection.toJSON(); // save selection
	    editorAce2.selectAll();
	    editorAce2.focus();
	    document.execCommand('copy');
	    editorAce2.selection.fromJSON(sel); // restore selection
    });
	
	$("#load_url").click(function(e) {
        e.preventDefault();
		$("#url_modal").modal({backdrop : false});
    });
	
	$("#load").click(function(e) {
        e.preventDefault();
		url = $.trim($("#url").val());
		if(url != "")
		{
			editorAce1.getSession().setUseWorker(false);
			editorAce1.setValue("Please wait while loading file from url.");
			$.ajax({
				type	: "POST",
				url		: "get_data.php",
				dataType: "text",
				data	: {"url" : url},
				success : function(data)
				{
					if(data == "file_not_found")
					{
						editorAce1.setValue("Unable to load file from url!");
					}else
					{
						editorAce1.getSession().setUseWorker(true);
						editorAce1.setValue(data);
					}
				},
				error 	: function()
				{
					editorAce1.setValue("Unable to load file from url!");
				}
			});
		}
    });
	
	$("#browse").click(function(e) {
        e.preventDefault();
		$("#file").click();
    });
	
	function read_file(e)
	{
		f = e.target.files[0];
		if(f)
		{
			r = new FileReader();
			r.onload = function(e)
			{
				var contents = e.target.result;
				var file_name = f.name;
				editorAce1.getSession().setUseWorker(true);
				editorAce1.setValue(contents);
			}
			r.readAsText(f);
		}
		else
		{
			editorAce1.getSession().setUseWorker(false);
			editorAce1.setValue("Unable to load file!");
		}
	}
	
	$("#file").change(function(e) {
        e.preventDefault();
		read_file(e);
    });
	
	$("#download").click(function(e) {
        e.preventDefault();
		data = $.trim(editorAce2.getValue());
		if(data == "")
		{
			show_msg("The result is empty!", "error");
			return false;
		}
		blob = new Blob(["" + data + ""], {
			type : "text/xhtml+xml;charset=utf-8"
		});
		saveAs(blob, "data.xml");
    });
	
	$("#max_code1").click(function(e) {
        e.preventDefault();
		if(!$(this).is(".maximized"))
		{
			$(this).addClass("maximized");
			$("div.buttons_div,div.div_code2").hide();
			$("#code1").css({"width" : "100%"});
			$("div.div_code1").removeClass("col-md-5").addClass("col-md-12");
			$(this).find("span").removeClass("glyphicon-fullscreen").addClass("glyphicon-resize-small");
			$("#zclip-ZeroClipboardMovie_1").css({"left" : ($("#copy_data1").position().left - 5) + "px", "top" : $("#copy_data1").position().top + "px"});
			$(this).attr("title", "minimize");
			editorAce1.resize();
			editorAce2.resize();
		}else
		{
			$(this).removeClass("maximized");
			$("div.div_code1").removeClass("col-md-12").addClass("col-md-5");
			$("#code1").css({"width" : "100%"});
			$("div.buttons_div,div.div_code1,div.div_code2").show();
			$(this).find("span").removeClass("glyphicon-resize-small").addClass("glyphicon-fullscreen");
			$("#zclip-ZeroClipboardMovie_1").css({"left" : ($("#copy_data1").position().left - 5) + "px", "top" : $("#copy_data1").position().top + "px"});
			$(this).attr("title", "maximize");
			editorAce1.resize();
			editorAce2.resize();
		}
    });
	
	$("#max_code2").click(function(e) {
        e.preventDefault();
		if(!$(this).is(".maximized"))
		{
			$(this).addClass("maximized");
			$("div.buttons_div,div.div_code1").hide();
			$("#code2").css({"width" : "100%"});
			$("div.div_code2").removeClass("col-md-5").addClass("col-md-12");
			$(this).find("span").removeClass("glyphicon-fullscreen").addClass("glyphicon-resize-small");
			$("#zclip-ZeroClipboardMovie_2").css({"left" : ($("#copy_data2").position().left - 5) + "px", "top" : $("#copy_data2").position().top + "px"});
			$(this).attr("title", "minimize");
			editorAce1.resize();
			editorAce2.resize();
		}else
		{
			$(this).removeClass("maximized");
			$("div.div_code2").removeClass("col-md-12").addClass("col-md-5");
			$("#code2").css({"width" : "100%"});
			$("div.buttons_div,div.div_code1,div.div_code2").show();
			$(this).find("span").removeClass("glyphicon-resize-small").addClass("glyphicon-fullscreen");
			$("#zclip-ZeroClipboardMovie_2").css({"left" : ($("#copy_data2").position().left - 5) + "px", "top" : $("#copy_data2").position().top + "px"});
			$(this).attr("title", "maximize");
			editorAce1.resize();
			editorAce2.resize();
		}
    });
	
	$("#code1").resizable({
		handles: 's',
		alsoResize: "#code2",
    	resize: function(event, ui) {
    		editorAce1.resize();
			editorAce2.resize();
    	}
	});
	
	$("#code2").resizable({
		handles: 's',
		alsoResize: "#code1",
    	resize: function(event, ui) {
    		editorAce1.resize();
			editorAce2.resize();
    	}
	});
	
	$("#wrapmode").click(function(e) {
        e.preventDefault();
        if(!$(this).is(".wrapon"))
		{
			$(this).addClass("wrapon");
			editorAce1.getSession().setUseWrapMode(true); 
			editorAce2.getSession().setUseWrapMode(true); 
			$("#wrapmode").text("Cancel Wrap");
		}else
		{
			$(this).removeClass("wrapon");
			editorAce1.getSession().setUseWrapMode(false); 
			editorAce2.getSession().setUseWrapMode(false); 
			$("#wrapmode").text("Smart Wrap");
		}
    });
	
	$(window).resize(function(e) {
        $("#code1,#code2").css({"width" : "100%"});
    });
	
	$("#sample").click(function(e) {
        e.preventDefault();
		data = "sql1";
		editorAce1.getSession().setUseWorker(false);
		editorAce1.setValue("Please wait ...");
		$.ajax({
			type	: "POST",
			url		: "get-sample.php",
			data	: {"data" : data},
			success : function(data)
			{
				editorAce1.getSession().setUseWorker(true);
				editorAce1.setValue(data);
				$("#convert").click();
			},
			error 	: function()
			{
				editorAce1.getSession().setUseWorker(true);
				editorAce1.setValue("Connection lost. Try again!");
			}
		});
    });
	
	$("#convert").click(function(e) {
        e.preventDefault();
		data = $.trim(editorAce1.getValue());
		if(data != "")
		{
			try {
				if (data.toLowerCase().search("create") == -1)
				{
					editorAce2.setValue("You are missing CREATE statement.");
					return false;
				} else if (data.toLowerCase().search("select") == -1)
				{
					editorAce2.setValue("You are missing SELECT statement.");
					return false;
				}
				
				db = new SQL.Database();
				res = db.exec(data);
				jsonData = "[";
				
				$.each(res, function(i, value) {
					$.each(value.values, function(j, value1) {
						jsonArr = "{";
						$.each(value1, function(k, data) {
							jsonArr += '"' + value.columns[k] + '"  :' + '"' + data
									+ '"';
							if (value1.length != (k + 1))
							{
								jsonArr += ",";
							}
						});
						
						jsonArr += "}";
						
						if (value.values.length != (j + 1)) {
							jsonArr += ",";
						}
						
						jsonData += jsonArr;
					});
					
					if (res.length != (i + 1))
					{
						jsonData += ",";
					}
				});
				
				jsonData += "]";
				//xml = json2xml.convert(JSON.parse(jsonData));
				//xml = '<?xml version="1.0" encoding="UTF-8" ?>\n<root>' + xml + "</root>";
				//editorAce2.setValue(vkbeautify.xml(xml, 4));
				
			//var n = CSV2JSON(input);
			output = json2xml(JSON.parse(jsonData));
			editorAce2.setValue(output); 
			} catch (e) {
				editorAce2.setValue(e.message);
			}
		}
    });
	
	$("#beautify_xml").click(function(e) {
        e.preventDefault();
		data = $.trim(editorAce2.getValue());
		if(data != "")
		{
			editorAce2.setValue(vkbeautify.xml(data, 4));
		}
    });
	
	themelist = ace.require("ace/ext/themelist");
	theme = "";
	$(themelist.themes).each(function(key, value) {
		theme += '<option value="' + value.name + '">' + value.caption + '</option>';
    });
	$("#themes").append(theme);
	
	$("#themes").val("monokai");
	$("#font_size").val("14");
	
	$("#themes,#font_size").change(function(e) {
        setTheme();
		editorAce1.focus();
    });
});

//function TSVToXML() {
//	input = editor.getValue(), input = tsv2csv(input);
//	var n = CSV2JSON(input);
//	output = json2xml(JSON.parse(n));
//	alert(output);
//}
function CSVToArray(n, t) {
	var f, u;
	t = t || ",";
	for (var e = new RegExp("(\\" + t + '|\\r?\\n|\\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\\' + t + "\\r\\n]*))", "gi"), r = [
		[]
	], i = null; i = e.exec(n);) f = i[1], f.length && f != t && r.push([]), u = i[2] ? i[2].replace(new RegExp('""', "g"), '"') : i[3], r[r.length - 1].push(u);
	return r
}

function CSV2JSON(n) {
	for (var r = CSVToArray(n), u = [], i, o, e, f, t = 1; t < r.length; t++)
		for (u[t - 1] = {}, i = 0; i < r[0].length && i < r[t].length; i++) o = r[0][i], u[t - 1][o] = r[t][i];
	return e = JSON.stringify(u), f = e.replace(/},/g, "},\r\n"), f
}

function json2xml(n) {
	var r, t, i;
	try {
		if (input = n, input !== null) {
			r = new XML.ObjTree, t = r.writeXML(input), t = decodeSpecialCharacter(t);
			try {
				i = $.parseXML(t)
			} catch (u) {
				i = !1
			}
			i == !1 && (t = t.substr(0, 39) + "<root>" + t.substr(39) + "</root>"), t = t.replace(/(<(\d)+>)/g, "<row>").replace(/(<[/](\d)+>)/g, "</row>"), output = vkbeautify.xml(t)
		}
	} catch (u) {
		output = u.toString()
	}
	return output
}

function tsv2csv(n) {
	return n.trim().length == 0 ? "" : n.split("\t").join(",")
}

function removeQuotes(n) {
	return n = n.replace(/(['"])/g, "\\$1"), isNaN(n) || (n = parseFloat(n)), n
}

function addQuotes(n) {
	return isNaN(n) ? '"' + n + '"' : n
}

(function() {
	function t(n) {
		var t = "    ",
			i;
		if (isNaN(parseInt(n))) t = n;
		else switch (n) {
			case 1:
				t = " ";
				break;
			case 2:
				t = "  ";
				break;
			case 3:
				t = "   ";
				break;
			case 4:
				t = "    ";
				break;
			case 5:
				t = "     ";
				break;
			case 6:
				t = "      ";
				break;
			case 7:
				t = "       ";
				break;
			case 8:
				t = "        ";
				break;
			case 9:
				t = "         ";
				break;
			case 10:
				t = "          ";
				break;
			case 11:
				t = "           ";
				break;
			case 12:
				t = "            "
		}
		for (i = ["\n"], ix = 0; ix < 100; ix++) i.push(i[ix] + t);
		return i
	}

	function n() {
		this.step = "    ", this.shift = t(this.step)
	}

	function r(n, t) {
		return t - (n.replace(/\(/g, "").length - n.replace(/\)/g, "").length)
	}

	function i(n, t) {
		return n.replace(/\s{1,}/g, " ").replace(/ AND /ig, "~::~" + t + t + "AND ").replace(/ BETWEEN /ig, "~::~" + t + "BETWEEN ").replace(/ CASE /ig, "~::~" + t + "CASE ").replace(/ ELSE /ig, "~::~" + t + "ELSE ").replace(/ END /ig, "~::~" + t + "END ").replace(/ FROM /ig, "~::~FROM ").replace(/ GROUP\s{1,}BY/ig, "~::~GROUP BY ").replace(/ HAVING /ig, "~::~HAVING ").replace(/ IN /ig, " IN ").replace(/ JOIN /ig, "~::~JOIN ").replace(/ CROSS~::~{1,}JOIN /ig, "~::~CROSS JOIN ").replace(/ INNER~::~{1,}JOIN /ig, "~::~INNER JOIN ").replace(/ LEFT~::~{1,}JOIN /ig, "~::~LEFT JOIN ").replace(/ RIGHT~::~{1,}JOIN /ig, "~::~RIGHT JOIN ").replace(/ ON /ig, "~::~" + t + "ON ").replace(/ OR /ig, "~::~" + t + t + "OR ").replace(/ ORDER\s{1,}BY/ig, "~::~ORDER BY ").replace(/ OVER /ig, "~::~" + t + "OVER ").replace(/\(\s{0,}SELECT /ig, "~::~(SELECT ").replace(/\)\s{0,}SELECT /ig, ")~::~SELECT ").replace(/ THEN /ig, " THEN~::~" + t + "").replace(/ UNION /ig, "~::~UNION~::~").replace(/ USING /ig, "~::~USING ").replace(/ WHEN /ig, "~::~" + t + "WHEN ").replace(/ WHERE /ig, "~::~WHERE ").replace(/ WITH /ig, "~::~WITH ").replace(/ ALL /ig, " ALL ").replace(/ AS /ig, " AS ").replace(/ ASC /ig, " ASC ").replace(/ DESC /ig, " DESC ").replace(/ DISTINCT /ig, " DISTINCT ").replace(/ EXISTS /ig, " EXISTS ").replace(/ NOT /ig, " NOT ").replace(/ NULL /ig, " NULL ").replace(/ LIKE /ig, " LIKE ").replace(/\s{0,}SELECT /ig, "SELECT ").replace(/\s{0,}UPDATE /ig, "UPDATE ").replace(/ SET /ig, " SET ").replace(/~::~{1,}/g, "~::~").split("~::~")
	}
	n.prototype.xml = function(n, i) {
		for (var u = n.replace(/>\s{0,}</g, "><").replace(/</g, "~::~<").replace(/\s*xmlns\:/g, "~::~xmlns:").replace(/\s*xmlns\=/g, "~::~xmlns=").split("~::~"), h = u.length, o = !1, e = 0, f = "", r = 0, s = i ? t(i) : this.shift, r = 0; r < h; r++) u[r].search(/<!/) > -1 ? (f += s[e] + u[r], o = !0, (u[r].search(/-->/) > -1 || u[r].search(/\]>/) > -1 || u[r].search(/!DOCTYPE/) > -1) && (o = !1)) : u[r].search(/-->/) > -1 || u[r].search(/\]>/) > -1 ? (f += u[r], o = !1) : /^<\w/.exec(u[r - 1]) && /^<\/\w/.exec(u[r]) && /^<[\w:\-\.\,]+/.exec(u[r - 1]) == /^<\/[\w:\-\.\,]+/.exec(u[r])[0].replace("/", "") ? (f += u[r], o || e--) : u[r].search(/<\w/) > -1 && u[r].search(/<\//) == -1 && u[r].search(/\/>/) == -1 ? f = f += o ? u[r] : s[e++] + u[r] : u[r].search(/<\w/) > -1 && u[r].search(/<\//) > -1 ? f = f += o ? u[r] : s[e] + u[r] : u[r].search(/<\//) > -1 ? f = f += o ? u[r] : s[--e] + u[r] : u[r].search(/\/>/) > -1 ? f = f += o ? u[r] : s[e] + u[r] : f += u[r].search(/<\?/) > -1 ? s[e] + u[r] : u[r].search(/xmlns\:/) > -1 || u[r].search(/xmlns\=/) > -1 ? s[e] + u[r] : u[r];
		return f[0] == "\n" ? f.slice(1) : f
	}, n.prototype.json = function(n, t) {
		var t = t ? t : this.step;
		return typeof JSON == "undefined" ? n : typeof n == "string" ? JSON.stringify(JSON.parse(n), null, t) : typeof n == "object" ? JSON.stringify(n, null, t) : n
	}, n.prototype.css = function(n, i) {
		for (var u = n.replace(/\s{1,}/g, " ").replace(/\{/g, "{~::~").replace(/\}/g, "~::~}~::~").replace(/\;/g, ";~::~").replace(/\/\*/g, "~::~/*").replace(/\*\//g, "*/~::~").replace(/~::~\s{0,}~::~/g, "~::~").split("~::~"), s = u.length, o = 0, f = "", r = 0, e = i ? t(i) : this.shift, r = 0; r < s; r++) f += /\{/.exec(u[r]) ? e[o++] + u[r] : /\}/.exec(u[r]) ? e[--o] + u[r] : /\*\\/.exec(u[r]) ? e[o] + u[r] : e[o] + u[r];
		return f.replace(/^\n{1,}/, "")
	}, n.prototype.sql = function(n, u) {
		for (var l = n.replace(/\s{1,}/g, " ").replace(/\'/ig, "~::~'").split("~::~"), a = l.length, e = [], o = 0, h = this.step, p = !0, w = !1, c = 0, s = "", f = 0, v = u ? t(u) : this.shift, y, f = 0; f < a; f++) e = f % 2 ? e.concat(l[f]) : e.concat(i(l[f], h));
		for (a = e.length, f = 0; f < a; f++) c = r(e[f], c), /\s{0,}\s{0,}SELECT\s{0,}/.exec(e[f]) && (e[f] = e[f].replace(/\,/g, ",\n" + h + h + "")), /\s{0,}\s{0,}SET\s{0,}/.exec(e[f]) && (e[f] = e[f].replace(/\,/g, ",\n" + h + h + "")), /\s{0,}\(\s{0,}SELECT\s{0,}/.exec(e[f]) ? (o++, s += v[o] + e[f]) : /\'/.exec(e[f]) ? (c < 1 && o && o--, s += e[f]) : (s += v[o] + e[f], c < 1 && o && o--), y = 0;
		return s = s.replace(/^\n{1,}/, "").replace(/\n{1,}/g, "\n")
	}, n.prototype.xmlmin = function(n, t) {
		var i = t ? n : n.replace(/\<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)\>/g, "").replace(/[ \r\n\t]{1,}xmlns/g, " xmlns");
		return i.replace(/>\s{0,}</g, "><")
	}, n.prototype.jsonmin = function(n) {
		return typeof JSON == "undefined" ? n : JSON.stringify(JSON.parse(n), null, 0)
	}, n.prototype.cssmin = function(n, t) {
		var i = t ? n : n.replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\//g, "");
		return i.replace(/\s{1,}/g, " ").replace(/\{\s{1,}/g, "{").replace(/\}\s{1,}/g, "}").replace(/\;\s{1,}/g, ";").replace(/\/\*\s{1,}/g, "/*").replace(/\*\/\s{1,}/g, "*/")
	}, n.prototype.sqlmin = function(n) {
		return n.replace(/\s{1,}/g, " ").replace(/\s{1,}\(/, "(").replace(/\s{1,}\)/, ")")
	}, window.vkbeautify = new n
})(), typeof XML == "undefined" && (XML = function() {}), XML.ObjTree = function() {
	return this
}, XML.ObjTree.VERSION = "0.24", XML.ObjTree.prototype.xmlDecl = '<?xml version="1.0" encoding="UTF-8" ?>\n', XML.ObjTree.prototype.attr_prefix = "-", XML.ObjTree.prototype.overrideMimeType = "text/xml", XML.ObjTree.prototype.parseXML = function(n) {
	var i, t, r;
	if (window.DOMParser) {
		if (t = new DOMParser, r = t.parseFromString(n, "application/xml"), !r) return;
		i = r.documentElement
	} else window.ActiveXObject && (t = new ActiveXObject("Microsoft.XMLDOM"), t.async = !1, t.loadXML(n), i = t.documentElement); if (i) return this.parseDOM(i)
}, XML.ObjTree.prototype.parseHTTP = function(n, t, i) {
	var r = {},
		e, u, f;
	for (e in t) r[e] = t[e];
	if (r.method || (r.method = typeof r.postBody == "undefined" && typeof r.postbody == "undefined" && typeof r.parameters == "undefined" ? "get" : "post"), i) {
		r.asynchronous = !0;
		var o = this,
			h = i,
			s = r.onComplete;
		r.onComplete = function(n) {
			var t;
			n && n.responseXML && n.responseXML.documentElement ? t = o.parseDOM(n.responseXML.documentElement) : n && n.responseText && (t = o.parseXML(n.responseText)), h(t, n), s && s(n)
		}
	} else r.asynchronous = !1;
	return (typeof HTTP != "undefined" && HTTP.Request ? (r.uri = n, f = new HTTP.Request(r), f && (u = f.transport)) : typeof Ajax != "undefined" && Ajax.Request && (f = new Ajax.Request(n, r), f && (u = f.transport)), i) ? u : u && u.responseXML && u.responseXML.documentElement ? this.parseDOM(u.responseXML.documentElement) : u && u.responseText ? this.parseXML(u.responseText) : void 0
}, XML.ObjTree.prototype.parseDOM = function(n) {
	var i, t, r;
	if (n) {
		if (this.__force_array = {}, this.force_array)
			for (i = 0; i < this.force_array.length; i++) this.__force_array[this.force_array[i]] = 1;
		return t = this.parseElement(n), this.__force_array[n.nodeName] && (t = [t]), n.nodeType != 11 && (r = {}, r[n.nodeName] = t, t = r), t
	}
}, XML.ObjTree.prototype.parseElement = function(n) {
	var s, r, u, e, o, t, i, f;
	if (n.nodeType != 7) {
		if (n.nodeType == 3 || n.nodeType == 4) return (s = n.nodeValue.match(/[^\x00-\x20]/), s == null) ? void 0 : n.nodeValue;
		if (u = {}, n.attributes && n.attributes.length)
			for (r = {}, t = 0; t < n.attributes.length; t++)(i = n.attributes[t].nodeName, typeof i == "string") && (f = n.attributes[t].nodeValue, f) && (i = this.attr_prefix + i, typeof u[i] == "undefined" && (u[i] = 0), u[i] ++, this.addNode(r, i, u[i], f));
		if (n.childNodes && n.childNodes.length) {
			for (e = !0, r && (e = !1), t = 0; t < n.childNodes.length && e; t++)(o = n.childNodes[t].nodeType, o != 3 && o != 4) && (e = !1);
			if (e)
				for (r || (r = ""), t = 0; t < n.childNodes.length; t++) r += n.childNodes[t].nodeValue;
			else
				for (r || (r = {}), t = 0; t < n.childNodes.length; t++)(i = n.childNodes[t].nodeName, typeof i == "string") && (f = this.parseElement(n.childNodes[t]), f) && (typeof u[i] == "undefined" && (u[i] = 0), u[i] ++, this.addNode(r, i, u[i], f))
		}
		return r
	}
}, XML.ObjTree.prototype.addNode = function(n, t, i, r) {
	this.__force_array[t] ? (i == 1 && (n[t] = []), n[t][n[t].length] = r) : i == 1 ? n[t] = r : i == 2 ? n[t] = [n[t], r] : n[t][n[t].length] = r
}, XML.ObjTree.prototype.writeXML = function(n) {
	var t = this.hash_to_xml(null, n);
	return this.xmlDecl + t
}, XML.ObjTree.prototype.hash_to_xml = function(n, t) {
	var r = [],
		o = [],
		u, i, e, f;
	for (u in t) t.hasOwnProperty(u) && (i = t[u], u.charAt(0) != this.attr_prefix ? r[r.length] = typeof i == "undefined" || i == null ? "<" + u + " />" : typeof i == "object" && i.constructor == Array ? this.array_to_xml(u, i) : typeof i == "object" ? this.hash_to_xml(u, i) : this.scalar_to_xml(u, i) : o[o.length] = " " + u.substring(1) + '="' + this.xml_escape(i) + '"');
	return e = o.join(""), f = r.join(""), typeof n == "undefined" || n == null || (f = r.length > 0 ? f.match(/\n/) ? "<" + n + e + ">\n" + f + "</" + n + ">\n" : "<" + n + e + ">" + f + "</" + n + ">\n" : "<" + n + e + " />\n"), f
}, XML.ObjTree.prototype.array_to_xml = function(n, t) {
	for (var r = [], i, u = 0; u < t.length; u++) i = t[u], r[r.length] = typeof i == "undefined" || i == null ? "<" + n + " />" : typeof i == "object" && i.constructor == Array ? this.array_to_xml(n, i) : typeof i == "object" ? this.hash_to_xml(n, i) : this.scalar_to_xml(n, i);
	return r.join("")
}, XML.ObjTree.prototype.scalar_to_xml = function(n, t) {
	return n == "#text" ? this.xml_escape(t) : "<" + n + ">" + this.xml_escape(t) + "</" + n + ">\n"
}, XML.ObjTree.prototype.xml_escape = function(n) {
	return String(n).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
};
function decodeSpecialCharacter(n) {
	return n.replace(/\&amp;/g, "&").replace(/\&gt;/g, ">").replace(/\&lt;/g, "<").replace(/\&quot;/g, '"')
}