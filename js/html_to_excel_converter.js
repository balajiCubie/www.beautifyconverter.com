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
    editorAce1.getSession().setMode("ace/mode/html");
	
	var editorAce2 = ace.edit("code2");
	editorAce2.setOptions({
		enableBasicAutocompletion: true,
		enableSnippets: true,
		enableLiveAutocompletion: true
	});
    editorAce2.setTheme("ace/theme/monokai");
    editorAce2.getSession().setMode("ace/mode/html");
	
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
			type : "text/plain;charset=utf-8"
		});
		saveAs(blob, "data.csv");
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
		data = "html";
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
				$("#htmltoexcel").click();
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
			try{
				html = $.parseHTML("<div>" + data + "</div>");
				cols = [];
				content = "";
				if($(html).find('table').length == 0)
				{
					editorAce2.getSession().setUseWorker(false);
					editorAce2.setValue("No table found in the html!");
					return false;
				}
				editorAce2.getSession().setUseWorker(true);
				$(html).find('table').each(function(index, element) {
                    $(this).find("th").each(function(index, element) {
                        cols.push($(this).text().toLowerCase());
                    });
                });
				
				$(html).find('table').each(function(index, element) {
                    $(this).find("tr").each(function(index, element) {
                        result = [];
						$(this).find('td').each(function(index) {
							result.push($(this).text());
						});
						content += result.join() + "\n";
                    });
                });
				
				editorAce2.setValue(cols.join() + content);
			}catch(e)
			{
				editorAce2.setValue("Error converting to CSV!");
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
	$("#htmltoexcel").click(function(e) {
        e.preventDefault();
		input = editor.getValue(), html2excel(input)
    });
	function html2excel(n) {
		try {
			n != null && n.trim().length != 0 && ($("#temp").html(n.trim()), $("#temp table").removeAttr("id").attr("id", "htmTable"), tableToExcel("htmTable", "HtmlData"))
		} catch (t) {
			return t
		}
	}
			//function HTMLToEXCEL() {
			//	input = editor.getValue(), html2excel(input)
			//}
	var tableToExcel = function() {
			var r = "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,",
				n = n = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
				i = function(n) {
					return window.btoa(unescape(encodeURIComponent(n)))
				},
				t = function(n, t) {
					return n.replace(/{(\w+)}/g, function(n, i) {
						return t[i]
					})
				};
			return function(u, f) {
				u.nodeType || (u = document.getElementById(u)), console.log(u);
				var e = {
					worksheet: f || "Worksheet",
					table: u.innerHTML
				};
				window.location.href = r + i(t(n, e))
			}
		}(),
		input, output;
	(function(n) {
		"use strict";
		var e = {
				COMMA: ",",
				RETURN: "\r",
				NEWLINE: "\n",
				SEMICOLON: ";",
				TAB: "\t"
			},
			tt = {
				CURRENCY: "CURRENCY",
				DATETIME: "DATETIME",
				FORMULA: "FORMULA",
				LOGICAL: "LOGICAL",
				NUMBER: "NUMBER",
				TEXT: "TEXT"
			},
			p = {
				CELL_NOT_FOUND: "CELL_NOT_FOUND",
				COLUMN_NOT_FOUND: "COLUMN_NOT_FOUND",
				ROW_NOT_FOUND: "ROW_NOT_FOUND",
				ERROR_READING_FILE: "ERROR_READING_FILE",
				ERROR_WRITING_FILE: "ERROR_WRITING_FILE",
				FILE_NOT_FOUND: "FILE_NOT_FOUND",
				FILETYPE_NOT_SUPPORTED: "FILETYPE_NOT_SUPPORTED",
				INVALID_DOCUMENT_FORMAT: "INVALID_DOCUMENT_FORMAT",
				INVALID_DOCUMENT_NAMESPACE: "INVALID_DOCUMENT_NAMESPACE",
				MALFORMED_JSON: "MALFORMED_JSON",
				UNIMPLEMENTED_METHOD: "UNIMPLEMENTED_METHOD",
				UNKNOWN_ERROR: "UNKNOWN_ERROR",
				UNSUPPORTED_BROWSER: "UNSUPPORTED_BROWSER"
			},
			o = {
				CSV: "csv",
				HTML: "html",
				JSON: "json",
				TSV: "tsv",
				XLS: "xls",
				XLSX: "xlsx",
				XML: "xml"
			},
			v = {
				CSV: "text/csv",
				HTML: "text/html",
				JSON: "application/json",
				TSV: "text/tab-separated-values",
				XLS: "application/vnd.ms-excel",
				XLSX: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
				XML: "text/xml",
				XML2003: "application/xml"
			},
			g = {
				FILENAME: /.*\./g,
				LINEBREAK: /\r\n/g
			},
			d = {
				getFiletype: function(n) {
					return n.replace(g.FILENAME, "")
				},
				isEqual: function(n, t, i) {
					return i ? n.toLowerCase() == t.toLowerCase() : n == t
				},
				isSupportedBrowser: function() {
					return !![].forEach && !!n.FileReader
				},
				overrideProperties: function(n, t) {
					for (var i in n) n.hasOwnProperty(i) && (n[i] = t.hasOwnProperty(i) ? t[i] : n[i]);
					return n
				}
			},
			y = function(n, t) {
				var i = {
					value: n || "",
					dataType: t || tt.TEXT
				};
				typeof n == "object" && (i = d.overrideProperties(i, n)), this.value = i.value, this.dataType = i.dataType, this.toString = function() {
					return n.toString()
				}
			},
			a = function() {},
			i, l, u, c, s, h, nt, w, r, f, k, b;
		a.prototype = [], a.prototype.getCell = function(n, t) {
			return this[t - 1][n - 1]
		}, a.prototype.getColumn = function(n) {
			var t = [];
			return this.forEach(function(i) {
				t.push(i[n - 1])
			}), t
		}, a.prototype.getRow = function(n) {
			return this[n - 1]
		}, i = function() {
			this.records = new a
		}, i.prototype.getCell = function(n, t) {
			return this.records.getCell(n, t)
		}, i.prototype.getColumn = function(n) {
			return this.records.getColumn(n)
		}, i.prototype.getRow = function(n) {
			return this.records.getRow(n)
		}, i.prototype.insertRecord = function(n) {
			return this.records.push(n), this
		}, i.prototype.removeRecord = function(n) {
			return this.records.splice(n - 1, 1), this
		}, i.prototype.setRecords = function(n) {
			return this.records = n, this
		}, l = function() {}, l.prototype = {
			_filetype: "",
			_sheet: [],
			getSheet: function(n) {
				var n = n || 1;
				return this._sheet[n - 1].records
			},
			loadFile: function(n, t) {
				var i = this,
					r = new FileReader;
				return r.onload = function() {
					i.loadString(this.result, 0), t.apply(i)
				}, r.readAsText(n), i
			},
			loadString: function() {
				throw p.UNIMPLEMENTED_METHOD;
			}
		}, u = function() {}, u.prototype = new l, u.prototype._delimiter = e.COMMA, u.prototype._filetype = o.CSV, u.prototype.loadString = function(n, t) {
			var r = this,
				t = t || 0;
			return r._sheet[t] = new i, n.replace(g.LINEBREAK, e.NEWLINE).split(e.NEWLINE).forEach(function(n) {
				var u = [];
				n.split(r._delimiter).forEach(function(n) {
					u.push(new y(n))
				}), r._sheet[t].insertRecord(u)
			}), r
		}, u.prototype.setDelimiter = function(n) {
			return this._delimiter = n, this
		}, c = function() {}, c.prototype = new l, c.prototype._filetype = o.HTML, c.prototype.loadString = function(n, t) {
			var r = this,
				t = t || 0,
				e = new DOMParser,
				f = e.parseFromString(n, v.HTML),
				u = f.getElementsByTagName("table");
			return [].forEach.call(u, function(n) {
				r._sheet[t] = new i;
				var f = n.getElementsByTagName("tr");
				[].forEach.call(f, function(n) {
					var f = n.getElementsByTagName("td"),
						u = [];
					[].forEach.call(f, function(n) {
						u.push(new y(n.innerHTML))
					}), r._sheet[t].insertRecord(u)
				}), t++
			}), r
		}, s = function() {}, s.prototype = new u, s.prototype._delimiter = e.TAB, s.prototype._filetype = o.TSV, h = function() {}, h.prototype = new l, h.prototype._filetype = o.XML, h.prototype.loadString = function(n, t) {
			var r = this,
				t = t || 0,
				e = new DOMParser,
				f = e.parseFromString(n, v.XML),
				u = f.getElementsByTagName("Worksheet");
			return [].forEach.call(u, function(n) {
				r._sheet[t] = new i;
				var f = n.getElementsByTagName("Row");
				[].forEach.call(f, function(n) {
					var f = n.getElementsByTagName("Data"),
						u = [];
					[].forEach.call(f, function(n) {
						u.push(new y(n.innerHTML))
					}), r._sheet[t].insertRecord(u)
				}), t++
			}), r
		}, nt = {
			CSV: u,
			HTML: c,
			TSV: s,
			XML: h
		}, w = function() {}, w.prototype = {
			_filetype: "",
			_mimetype: "",
			_sheet: [],
			getSheet: function(n) {
				var n = n || 1;
				return this._sheet[n - 1].records
			},
			getString: function() {
				throw p.UNIMPLEMENTED_METHOD;
			},
			insertSheet: function(n) {
				if (!n.records) {
					var t = new i;
					t.setRecords(n), this._sheet.push(t)
				} else this._sheet.push(n);
				return this
			},
			removeSheet: function(n) {
				return this._sheet.splice(n - 1, 1), this
			},
			saveFile: function() {
				return n.open("data:" + this._mimetype + ";base64," + n.btoa(this.getString())), this
			}
		}, r = function() {}, r.prototype = new w, r.prototype._delimiter = e.COMMA, r.prototype._filetype = o.CSV, r.prototype._mimetype = v.CSV, r.prototype.getString = function() {
			var t = this,
				n = "";
			return this.getSheet(1).forEach(function(i) {
				i.forEach(function(i) {
					n += i + t._delimiter
				}), n += "\r\n"
			}), n
		}, r.prototype.setDelimiter = function(n) {
			return this._delimiter = n, this
		}, f = function() {}, f.prototype = new r, f.prototype._delimiter = e.TAB, f.prototype._filetype = o.TSV, f.prototype._mimetype = v.TSV, k = {
			CSV: r,
			TSV: f
		}, b = {
			Cell: y,
			DataType: tt,
			Exception: p,
			isSupportedBrowser: d.isSupportedBrowser(),
			Parser: nt,
			Sheet: i,
			Writer: k
		}, n.SimpleExcel = b
	})(this);
	var editor = ace.edit("code1");