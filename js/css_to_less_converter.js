	(function($){var textarea,staticOffset;var iLastMousePos=0;var iMin=32;var grip;$.fn.TextAreaResizer=function(){return this.each(function(){textarea=$(this).addClass('processed'),staticOffset=null;$(this).wrap('<div class="resizable-textarea"><span></span></div>').parent().append($('<div class="grippie"></div>').bind("mousedown",{el:this},startDrag));var grippie=$('div.grippie',$(this).parent())[0];grippie.style.marginRight=(grippie.offsetWidth-$(this)[0].offsetWidth)+'px'})};function startDrag(e){textarea=$(e.data.el);textarea.blur();iLastMousePos=mousePosition(e).y;staticOffset=textarea.height()-iLastMousePos;textarea.css('opacity',0.25);$(document).mousemove(performDrag).mouseup(endDrag);return false}function performDrag(e){var iThisMousePos=mousePosition(e).y;var iMousePos=staticOffset+iThisMousePos;if(iLastMousePos>=(iThisMousePos)){iMousePos-=5}iLastMousePos=iThisMousePos;iMousePos=Math.max(iMin,iMousePos);textarea.height(iMousePos+'px');if(iMousePos<iMin){endDrag(e)}return false}function endDrag(e){$(document).unbind('mousemove',performDrag).unbind('mouseup',endDrag);textarea.css('opacity',1);textarea.focus();textarea=null;staticOffset=null;iLastMousePos=0}function mousePosition(e){return{x:e.clientX+document.documentElement.scrollLeft,y:e.clientY+document.documentElement.scrollTop}}})(jQuery);$(function(){$('textarea.resizable:not(.processed)').TextAreaResizer();$('div.resizable:not(.processed)').TextAreaResizer();});
var options = {input: false}
var zone = new FileDrop('code', options)
zone.event('send', function (files) {
  files.each(function (file) {
    file.readData(
      function (str) { zone.el.value = str },
      function (e) { alert('Terrible error!') },
      'text'
    )
  })
})
	function Less_Css(t) {
		var c=$("#code").val();
			if(c.length<=0||c==="Please enter code"){
				$("#code").focus().val("Please enter code").parents("div.form-group").addClass("has-error");
				return false}
					else{$("#code").parents("div.form-group").removeClass("has-error")}
					$("#clear").click(function(e) { e.preventDefault();	$("#code").val("");$("#packer").val("");
	$("html, body").animate({
		scrollTop: ($("html").offset().top - 10)
	}, 600);$("#packer").parents("div.form-group").addClass("hide");})
					$('#output_text').text('');
					var content = $("#code").val();
					if (t == 'less2css') {
					}
					else {
						var fish = new Fishsticss();
						var settings = {
							'comments': true,
							'variables': true,
							'convert': $('input[name=css_to]:checked').val()
						};
						var out = fish.scrub(content, settings)
						$("#packer").val(out);
	$("html, body").animate({
		scrollTop: ($("#demo").offset().top - 10)
	}, 600);
		$("#packer").parents("div.form-group").removeClass("hide");
						$('#output_text').text("Well Done! Less Size: "+content.length+"B, Css Code Size: "+out.length+"B");
					}
				}
				function a_css() {
					var css = "#header {\n\
  color:black;\n\
  border:1px solid #dd44dd;\n\
}\
#header .navigation { font-size:12px; }\n\
#header .navigation a { border-bottom:1px solid green; }\n\
#header .logo { width:300px; }\n\
#header .logo:hover { text-decoration:none; }\n\
";
					$("#code").val(css);
					Less_Css('css2less');
				}
/* Dependencies first */

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (searchElement , fromIndex) {
    var i,
        pivot = (fromIndex) ? fromIndex : 0,
        length;

    if (!this) {
      throw new TypeError();
    }

    length = this.length;

    if (length === 0 || pivot >= length) {
      return -1;
    }

    if (pivot < 0) {
      pivot = length - Math.abs(pivot);
    }

    for (i = pivot; i < length; i++) {
      if (this[i] === searchElement) {
        return i;
      }
    }
    return -1;
  };
}

var arrayUnique = function(array) {
	return array.filter(function (a, b, c) {
		return c.indexOf(a) === b;
	});
};

/* Now the class */

var Fishsticss = function() {
	
	/* Regex */

	this.patterns = {
		selector: /([_a-zA-Z0-9-:,#:.\[\]="\s]?[_a-zA-Z0-9-*:>+,#:.\(\)\[\]=|~^$"\s]*)\s*\{\s*([\S\s]*?)\s*\}/gm,
		rule: /(-?[_a-zA-Z]+[_a-zA-Z0-9-]*)\s*:\s*([_a-zA-Z0-9-%#'",.\(\)\s]+);*/gm,
		comment: /\/\*[\S\s]*\*\//gm
	};

	/* Scrub-a-dub-dub */

	this.scrub = function(css, settings) {
	
		/* [css] is a string of CSS code */
		/* [settings] is an object consisting a few options: 
			'comments': boolean,
			'variables': boolean,
			'convert': choice of 'less', 'sass', 'scss', or 'false' */
		
		var scrape = function(piece, set) {
			var found = false;
			if (settings.convert !== false) {
				for (var i = 0; i < set.length; i++) {
					var fits = [];
					if (piece.selector.length >= set[i].selector.length) { /* For body, #nav {} body #div, #nav #div {} instances */
						for (var p = 0; p < piece.selector.length; p++) {
							for (var s = 0; s < set[i].selector.length; s++) {
								if (piece.selector[p] !== set[i].selector[s] && piece.selector[p].indexOf(set[i].selector[s]) === 0) {
									var first = piece.selector[p].substr(set[i].selector[s].length).charAt(0).toUpperCase();
									if (!first.match(/^[A-Z]/)) {
										fits.push([p,s]);
									}
								}
							}
						}
					}
					if (fits.length === piece.selector.length) {
						found = true;
						for (var f = 0; f < piece.selector.length; f++) {
							piece.selector[f] = piece.selector[f].substr(set[i].selector[fits[f][1]].length);
							if (piece.selector[f].charAt(0) === ' ') {
								piece.selector[f] = piece.selector[f].trim();
							}else{
								piece.selector[f] = '&' + piece.selector[f].trim();
							}
						}
						piece.selector = arrayUnique(piece.selector);
						scrape(piece, set[i].descendants);
					}
				}
			}
			if (!found) {
				set.push(piece);
			}
		};
	
		/* Styles */
		var styles = [],
			variables = [],
			m;
		
		while (m = this.patterns.selector.exec(css)) {
			var style = {
					selector: m[1].replace(/\n+/gm, ' ').replace(/\s*,+\s*/gm, ',').replace(/,+$/gm, '').trim().split(','),
					rules: [],
					descendants: [],
					index: m.index
				},
				n;
			while(n = this.patterns.rule.exec(m[2])) {
				if (settings.variables === true) {
					var v;
					if (v = /#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.exec(n[2])) {
						if (variables.indexOf(v[1]) === -1) {
							variables.push(v[1]);
						}
					}
				}
				style.rules.push({
					property: n[1],
					value: n[2]
				});
			}
			scrape(style, styles);
		}
	
		/* Comments */
		var comments = [],
			c;
		if (settings.comments === true) {
			while (c = this.patterns.comment.exec(css)) {
				comments.push({
					content: c[0],
					index: c.index
				});
			}
		}
		/* Write pretty styles */
		var less = '',
			level = 0,
			semi = settings.convert === 'sass' ? '' : ';',
			brace = settings.convert === 'sass' ? ['',''] : ['{','}'];
		
		var tabs = function(l) {
			var tabs = '';
			for (var i = 0; i < l; i++) {
				tabs += '\t';
			}
			return tabs;
		};
		
		var rinse = function(styles, l) {
			for (var s in styles) {
				if (comments.length) {
					if (comments[0].index < styles[s].index) {
						if (less.length > 0 && less.charAt(less.length-1) !== '\n') {
							less += '\n';
						}
						less += tabs(l) + comments[0].content + '\n';
						if (l === 0) {
							less += '\n';
						}
						comments.splice(0,1);
					}
				}
				less += tabs(l) + styles[s].selector.join(', ') + ' ' + brace[0] + '\n';
				var rules = styles[s].rules;
				for (var r in rules) {
					for (var v in variables) {
						if (rules[r].value.indexOf(variables[v]) > -1) {
							rules[r].value = rules[r].value.replace('#' + variables[v], '@var' + (parseInt(v)+1));
						}
					}
					less += tabs(l) + '\t' + rules[r].property + ': ' + rules[r].value + semi + '\n';
				}
				if (styles[s].descendants.length > -1) {
					rinse(styles[s].descendants, l+1);
				}
				less += tabs(l) + brace[1] + '\n';
			}
		};
	
		if (styles.length) {
			if (settings.convert !== false && settings.variables === true && variables.length > 0) {
				var prefix = settings.convert === 'less' ? '@' : '$';
				for (var k in variables) {
					var cname = 'var',
						hexcode = variables[k];
				
					if (hexcode.length === 3) {
						hexcode = hexcode.charAt(0)+hexcode.charAt(0)+hexcode.charAt(1)+hexcode.charAt(1)+hexcode.charAt(2)+hexcode.charAt(2);
					}
				
					/* var colour = {
						'red': hexcode.substr(0,2),
						'green': hexcode.substr(2,4),
						'blue': hexcode.substr(4,6)
					}; */
					
					less += prefix + cname + (parseInt(k)+1) + ': #' + hexcode + semi + '\n';
				}
				less += '\n';
			}
			rinse(styles, level);
		}
	
		return less;
	
	};
	
};
