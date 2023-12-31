(function () {
  function css_beautify(source_text, options) {
    options = options || {};
    source_text = source_text || "";
    source_text = source_text.replace(/\r\n|[\r\u2028\u2029]/g, "\n");
    var indentSize = options.indent_size || 4;
    var indentCharacter = options.indent_char || " ";
    var selectorSeparatorNewline =
      options.selector_separator_newline === undefined
        ? true
        : options.selector_separator_newline;
    var end_with_newline =
      options.end_with_newline === undefined ? false : options.end_with_newline;
    var newline_between_rules =
      options.newline_between_rules === undefined
        ? true
        : options.newline_between_rules;
    var eol = options.eol ? options.eol : "\n";
    if (typeof indentSize === "string") {
      indentSize = parseInt(indentSize, 10);
    }
    if (options.indent_with_tabs) {
      indentCharacter = "\t";
      indentSize = 1;
    }
    eol = eol.replace(/\\r/, "\r").replace(/\\n/, "\n");
    var whiteRe = /^\s+$/;
    var wordRe = /[\w$\-_]/;
    var pos = -1,
      ch;
    var parenLevel = 0;
    function next() {
      ch = source_text.charAt(++pos);
      return ch || "";
    }
    function peek(skipWhitespace) {
      var result = "";
      var prev_pos = pos;
      if (skipWhitespace) {
        eatWhitespace();
      }
      result = source_text.charAt(pos + 1) || "";
      pos = prev_pos - 1;
      next();
      return result;
    }
    function eatString(endChars) {
      var start = pos;
      while (next()) {
        if (ch === "\\") {
          next();
        } else if (endChars.indexOf(ch) !== -1) {
          break;
        } else if (ch === "\n") {
          break;
        }
      }
      return source_text.substring(start, pos + 1);
    }
    function peekString(endChar) {
      var prev_pos = pos;
      var str = eatString(endChar);
      pos = prev_pos - 1;
      next();
      return str;
    }
    function eatWhitespace() {
      var result = "";
      while (whiteRe.test(peek())) {
        next();
        result += ch;
      }
      return result;
    }
    function skipWhitespace() {
      var result = "";
      if (ch && whiteRe.test(ch)) {
        result = ch;
      }
      while (whiteRe.test(next())) {
        result += ch;
      }
      return result;
    }
    function eatComment(singleLine) {
      var start = pos;
      singleLine = peek() === "/";
      next();
      while (next()) {
        if (!singleLine && ch === "*" && peek() === "/") {
          next();
          break;
        } else if (singleLine && ch === "\n") {
          return source_text.substring(start, pos);
        }
      }
      return source_text.substring(start, pos) + ch;
    }
    function lookBack(str) {
      return source_text.substring(pos - str.length, pos).toLowerCase() === str;
    }
    function foundNestedPseudoClass() {
      var openParen = 0;
      for (var i = pos + 1; i < source_text.length; i++) {
        var ch = source_text.charAt(i);
        if (ch === "{") {
          return true;
        } else if (ch === "(") {
          openParen += 1;
        } else if (ch === ")") {
          if (openParen == 0) {
            return false;
          }
          openParen -= 1;
        } else if (ch === ";" || ch === "}") {
          return false;
        }
      }
      return false;
    }
    var basebaseIndentString = source_text.match(/^[\t ]*/)[0];
    var singleIndent = new Array(indentSize + 1).join(indentCharacter);
    var indentLevel = 0;
    var nestedLevel = 0;
    function indent() {
      indentLevel++;
      basebaseIndentString += singleIndent;
    }
    function outdent() {
      indentLevel--;
      basebaseIndentString = basebaseIndentString.slice(0, -indentSize);
    }
    var print = {};
    print["{"] = function (ch) {
      print.singleSpace();
      output.push(ch);
      print.newLine();
    };
    print["}"] = function (ch) {
      print.newLine();
      output.push(ch);
      print.newLine();
    };
    print._lastCharWhitespace = function () {
      return whiteRe.test(output[output.length - 1]);
    };
    print.newLine = function (keepWhitespace) {
      if (output.length) {
        if (!keepWhitespace && output[output.length - 1] !== "\n") {
          print.trim();
        }
        output.push("\n");
        if (basebaseIndentString) {
          output.push(basebaseIndentString);
        }
      }
    };
    print.singleSpace = function () {
      if (output.length && !print._lastCharWhitespace()) {
        output.push(" ");
      }
    };
    print.preserveSingleSpace = function () {
      if (isAfterSpace) {
        print.singleSpace();
      }
    };
    print.trim = function () {
      while (print._lastCharWhitespace()) {
        output.pop();
      }
    };
    var output = [];
    var insideRule = false;
    var insidePropertyValue = false;
    var enteringConditionalGroup = false;
    var top_ch = "";
    var last_top_ch = "";
    while (true) {
      var whitespace = skipWhitespace();
      var isAfterSpace = whitespace !== "";
      var isAfterNewline = whitespace.indexOf("\n") !== -1;
      last_top_ch = top_ch;
      top_ch = ch;
      if (!ch) {
        break;
      } else if (ch === "/" && peek() === "*") {
        var header = indentLevel === 0;
        if (isAfterNewline || header) {
          print.newLine();
        }
        output.push(eatComment());
        print.newLine();
        if (header) {
          print.newLine(true);
        }
      } else if (ch === "/" && peek() === "/") {
        if (!isAfterNewline && last_top_ch !== "{") {
          print.trim();
        }
        print.singleSpace();
        output.push(eatComment());
        print.newLine();
      } else if (ch === "@") {
        print.preserveSingleSpace();
        output.push(ch);
        var variableOrRule = peekString(": ,;{}()[]/='\"");
        if (variableOrRule.match(/[ :]$/)) {
          next();
          variableOrRule = eatString(": ").replace(/\s$/, "");
          output.push(variableOrRule);
          print.singleSpace();
        }
        variableOrRule = variableOrRule.replace(/\s$/, "");
        if (variableOrRule in css_beautify.NESTED_AT_RULE) {
          nestedLevel += 1;
          if (variableOrRule in css_beautify.CONDITIONAL_GROUP_RULE) {
            enteringConditionalGroup = true;
          }
        }
      } else if (ch === "#" && peek() === "{") {
        print.preserveSingleSpace();
        output.push(eatString("}"));
      } else if (ch === "{") {
        if (peek(true) === "}") {
          eatWhitespace();
          next();
          print.singleSpace();
          output.push("{}");
          print.newLine();
          if (newline_between_rules && indentLevel === 0) {
            print.newLine(true);
          }
        } else {
          indent();
          print["{"](ch);
          if (enteringConditionalGroup) {
            enteringConditionalGroup = false;
            insideRule = indentLevel > nestedLevel;
          } else {
            insideRule = indentLevel >= nestedLevel;
          }
        }
      } else if (ch === "}") {
        outdent();
        print["}"](ch);
        insideRule = false;
        insidePropertyValue = false;
        if (nestedLevel) {
          nestedLevel--;
        }
        if (newline_between_rules && indentLevel === 0) {
          print.newLine(true);
        }
      } else if (ch === ":") {
        eatWhitespace();
        if (
          (insideRule || enteringConditionalGroup) &&
          !(lookBack("&") || foundNestedPseudoClass())
        ) {
          insidePropertyValue = true;
          output.push(":");
          print.singleSpace();
        } else {
          if (peek() === ":") {
            next();
            output.push("::");
          } else {
            output.push(":");
          }
        }
      } else if (ch === '"' || ch === "'") {
        print.preserveSingleSpace();
        output.push(eatString(ch));
      } else if (ch === ";") {
        insidePropertyValue = false;
        output.push(ch);
        print.newLine();
      } else if (ch === "(") {
        if (lookBack("url")) {
          output.push(ch);
          eatWhitespace();
          if (next()) {
            if (ch !== ")" && ch !== '"' && ch !== "'") {
              output.push(eatString(")"));
            } else {
              pos--;
            }
          }
        } else {
          parenLevel++;
          print.preserveSingleSpace();
          output.push(ch);
          eatWhitespace();
        }
      } else if (ch === ")") {
        output.push(ch);
        parenLevel--;
      } else if (ch === ",") {
        output.push(ch);
        eatWhitespace();
        if (
          selectorSeparatorNewline &&
          !insidePropertyValue &&
          parenLevel < 1
        ) {
          print.newLine();
        } else {
          print.singleSpace();
        }
      } else if (ch === "]") {
        output.push(ch);
      } else if (ch === "[") {
        print.preserveSingleSpace();
        output.push(ch);
      } else if (ch === "=") {
        eatWhitespace();
        ch = "=";
        output.push(ch);
      } else {
        print.preserveSingleSpace();
        output.push(ch);
      }
    }
    var sweetCode = "";
    if (basebaseIndentString) {
      sweetCode += basebaseIndentString;
    }
    sweetCode += output.join("").replace(/[\r\n\t ]+$/, "");
    if (end_with_newline) {
      sweetCode += "\n";
    }
    if (eol != "\n") {
      sweetCode = sweetCode.replace(/[\n]/g, eol);
    }
    return sweetCode;
  }
  css_beautify.NESTED_AT_RULE = {
    "@page": true,
    "@font-face": true,
    "@keyframes": true,
    "@media": true,
    "@supports": true,
    "@document": true,
  };
  css_beautify.CONDITIONAL_GROUP_RULE = {
    "@media": true,
    "@supports": true,
    "@document": true,
  };
  if (typeof define === "function" && define.amd) {
    define([], function () {
      return { css_beautify: css_beautify };
    });
  } else if (typeof exports !== "undefined") {
    exports.css_beautify = css_beautify;
  } else if (typeof window !== "undefined") {
    window.css_beautify = css_beautify;
  } else if (typeof global !== "undefined") {
    global.css_beautify = css_beautify;
  }
})();
