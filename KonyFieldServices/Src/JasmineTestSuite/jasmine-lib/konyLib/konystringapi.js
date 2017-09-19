$KI.string = {

    find : function () {
		if (arguments.length < 2) {
			throw new Error("string.find needs atleast two arguments");
		}
	
		for (var i = 0; i < 2; i++) {
			if (typeof(arguments[i]) === "number") {
				arguments[i] = arguments[i].toString();
			} else if (typeof(arguments[i]) !== "string") {
				throw new Error("Invalid argument(s) to string.find");
			}
		}
	
		var beginIndex = 0;
		if (arguments.length > 2) {
			beginIndex = arguments[2] - 0;
			if (!isNaN(beginIndex)) {
				if (beginIndex < 0) {
					beginIndex += arguments[0].length;
	
					if (beginIndex < 0) beginIndex = 0;
				}
			} else {
				beginIndex = 0;
			}
		}
	
		var result = arguments[0].indexOf(arguments[1], beginIndex - 1);
		if (-1 === result) {
			return null;
		} else {
			result = result+IndexJL;
			//return result, result + arguments[1].length - 1;
			return result;
		}
	},
	
	len: function (s) {
		if (0 === arguments.length) {
			throw new Error("string.len needs atleast one argument");
		}
		
		if (typeof(s) === "number") {
			s = s.toString();
		} else if (typeof(s) !== "string") {
			throw new Error("Invalid argument to string.len");
		}

		return arguments[0].length;
    },

    compare: function (s1, s2) {
		if (arguments.length < 2) {
			throw new Error("string.compare needs atleast two arguemnts");
		}
			
		if (typeof(s1) == "string" && typeof(s2) == "string") {
			if (s1 < s2) {
				return -1;
			} else if (s1 == s2) {
				return 0;
			} else {
				return 1;
			}
		} else {
			throw new Error("Invalid argument(s) to string.compare");
		}
    },

    charat: function (s1, index) {
		if (arguments.length < 2) {
			throw new Error("string.charat needs atleast two arguments");
		}
	
		if (typeof(s1) === "number") {
			s1 = s1.toString();
		} else if (typeof(s1) !== "string") {
			throw new Error("Invalid argument to string.charat");
		}
	
		index -= 0;
		if (isNaN(index)) {
			throw new Error("Invalid argument to string.charat");
		}
	
		index-=IndexJL;
		if (index < 0 || index >= s1.length) {
			return null;
		}
	
		return s1.charAt(index);
    },

    flipCase: function(args, flag) {
	    if (0 === args.length) {
	            throw new Error(flag ? "string.upper" : "string.lower" + " needs atleast one argument");
	    }
	
	    if (typeof(args[0]) !== "string") {
	            throw new Error("Invalid argment to " + flag ? "string.upper" : "string.lower");
	    }
	
	    if (flag) {
	            return args[0].toUpperCase();
	    } else {
	            return args[0].toLowerCase();
	    }
    },
	
	lower: function () {
		return $KI.string.flipCase(arguments, false);
	},

	upper: function () {
		return $KI.string.flipCase(arguments, true);
	},

	rep: function (s,n) {
		if (arguments.length < 2) {
			throw new Error("Insufficient arguments to string.rep");
		}
	
		if (typeof(s) === "number") {
			s = s.toString();
		} else if (typeof(s) !== "string") {
			throw new Error("Invalid argument to string.rep");
		}
	
		n -= 0;
		if (isNaN(n)) {
			throw new Error("Invalid argument to string.rep");
		}
	
		var resultStr = "";
		for (var i = 0; i < n; i++) {
			resultStr += s;
		}
	
		return resultStr;
	},
	
	reverse: function (s) {
		if (0 === arguments.length) {
			throw new Error("string.reverse needs atleast one argument");
		}
	
		if (typeof(s) === "number") {
			s = s.toString();
		} else if (typeof(s) !== "string") {
			throw new Error("Invalid argument to string.reverse");
		}
	
		var resultStr = "";
		for (var i = s.length - 1; i >= 0; i--) {
			resultStr += s.charAt(i);
		}
	
		return resultStr;
	},
	
	trim: function (s) {
		if (0 === arguments.length) {
			throw new Error("string.trim needs atleast one argument");
		}
	
		if (typeof(s) !== "string") {
			throw new Error("Invalid argument to string.trim");
		}
	
		return s.replace(/^\s*/, "").replace(/\s*$/, "");
	},
	
	equalsignorecase: function (s1, s2) {
		if (arguments.length < 2) {
			throw new Error("string.equalsignorecase needs atleast two arguments");
		}
	
		if (typeof(s1) !== "string" || typeof(s2) !== "string") {
			throw new Error("Invalid argument(s) to string.equalsignorecase");
		}
	
	    return (s1.toLowerCase() === s2.toLowerCase());
	},
	
	equals: function (s1, s2) {
		if (arguments.length < 2) {
			throw new Error("string.equals needs atleast two arguments");
		}
	
		if (typeof(s1) !== "string" || typeof(s2) !== "string") {
			throw new Error("Invalid argument(s) to string.equals");
		}
	
		return (s1 === s2);
	},
	
	matchEnds: function (args, end) {
		if (args.length < 2) {
			throw new Error(end ? "string.endswith" : "string.startswith" +
									" needs atleast two arguments");
		}
	
		if (typeof(args[0]) !== "string" || typeof(args[1]) !== "string") {
			throw new Error("Invalid argument(s) to " + end ? "string.endswith" : "string.startswith");
		}
	
		if (!(args.length > 2 && (args[2] === false || args[2] === null))) {
			args[0] = args[0].toLowerCase();
			args[1] = args[1].toLowerCase();
		}
	
	
	    if (end) {
	        return (args[0].lastIndexOf(args[1]) === args[0].length - args[1].length);
	    }
	    else {
	        return (args[0].indexOf(args[1]) === 0);
	    }
	},
	
	startswith: function () {
		return $KI.string.matchEnds(arguments, false);
	},
	
	endswith: function () {
		return $KI.string.matchEnds(arguments, true);
	},
	
	split: function (s, sep) {
		if (0 === arguments.length) {
			throw new Error("string.split needs atleast one argument");
		}
	
		if (typeof(s) !== "string") {
			throw new Error("Invalid argument to string.split");
		}
	
		var delim;
		if (arguments.length > 1) {
			if (typeof(sep) !== "string") {
				throw new Error("The optional delimitor for string.split must be a string");
			}
	
			delim = sep;
		} else {
			delim = ",";
		}
		
		var splitstr = new Array();
		
		if(delim == "") {
			splitstr[1] = s;
		} else {
			splitstr = s.split(delim);
			splitstr.unshift(null); //To match lua Array indexing.
		}
		return splitstr;
	},
	
	sub: function () {
		function getIndex(i, len) {
			if (typeof(i) === "string") {
				i -= 0;
			} else if (typeof(i) !== "number") {
				throw new Error("Invalid argument to string.sub");
			}
	
			if (i < 0) {
				i = i + len + IndexJL;
			} else if (i > len) {
				i = len;
			}
	
			i -= IndexJL; // 3 in LUA will be 2 in JS.
			if(i < 0){
				return -1;
			} else {
				return i;
			}
		}
	
		/*function adjustIndex(i) {
			if (i > 0) {
				return i - 1;
			} else {
				return 0;
			}
		} */
	
		if (arguments.length < 2) {
			throw new Error("string.sub needs atleast two arguments");
		}
		
		var args = [];
		for(var i=0; i < arguments.length; i++) {
			args[i] = arguments[i];		
		}
	
		if (typeof(args[0]) === "number") {
			args[0] = args[0].toString();
		} else if (typeof(args[0]) !== "string") {
			throw new Error("Invalid argument to string.sub");
		}
	
		var startIndex = getIndex(args[1], args[0].length);
		var endIndex = args[0].length;
		if (args.length > 2) {
			endIndex = getIndex(args[2], args[0].length);
		}
	
		if (endIndex < startIndex || (-1 === startIndex || -1 === endIndex)) {
			return "";
		} else {
			//startIndex = adjustIndex(startIndex); endIndex = adjustIndex(endIndex);
			return args[0].slice(startIndex, endIndex + 1);
		}
	},
	
	replace: function (s, f, rep) {
		if (arguments.length < 3) {
			throw new Error("string.replace needs atleast three arguments");
		}
	
		if (typeof(s) !== "string" || typeof(f) !== "string" ||
			typeof(rep) !== "string") {
			throw new Error("Invalid argument(s) to string.replace");
		}
	
		//return [s.replace(f, rep)];
	
		// Replace all occurrences
	    //var exp1 = new RegExp(f, "g");
		var exp1 = new RegExp($KI.string.escapeRegExp(f), "g");
	    return (s != "" && f == "") ? s : s.replace(exp1, rep);
	},
	/*
	format: function (args) {
		if (0 === args.length) {
			throw new Error("string.format needs atleast one argument");
		}
	
		if (typeof(args[0]) === "number") {
			return args[0].toString();
		} else if (typeof(args[0]) === "string") {
			var toks = args[0].split(/(%[f,s,b])/);
	
			var flag = false;
			var result = "";
			for (var i = 0, j = 1; i < toks.length; i++) {
				if ("%f" === toks[i] || "%s" === toks[i] || "%b" === toks[i]) {
					if (j === args.length) {
						throw new Error("Insufficient number of arguments to string.format");
					}
	
					if ("%f" === toks[i]) {
						var num = args[j] - 0;
	
						if (isNaN(num)) {
							throw new Error("Invalid argument to string.format");
						}
	
						result += num;
					} else if ("%s" === toks[i]) {
						result += args[j].toString();
					} else if ("%b" === toks[i]) {
						if (args[j] === false || args[j] === null) {
							result += "false";
						} else {
							result += "true";
						}
					}
	
					j++;
				} else {
					result += toks[i];
				}
			}
	
			return result;
		} else {
			throw new Error("Invalid first argument to string.format");
		}
	}, */
	
	isasciialpha: function (s) {
	
		if (arguments.length === 0) {
			throw new Error("string.isasciialpha needs atleast 1 argument");
		}
	
		if (typeof(s) !== "string") {
			throw new Error("Invalid argument(s) to string.isasciialpha");
		}
	
		var regexp = new RegExp("[^a-zA-Z]","g");
	    return (s == "") ? false : !(regexp.test(s));	
	},
	
	isasciialphanumeric: function (str) {
	
		if (arguments.length === 0) {
			throw new Error("string.isasciialphanumeric needs atleast 1 argument");
		}
		var p1 = /[^a-z0-9]/i;	// Elimimate non alpha numeric chars
		var p2 = /([a-z]+[0-9])|([0-9]+[a-z])/i;
		var r1 = str.match(p1);
		var r2 = str.match(p2);	
		return (!r1 && r2 && str) ? true : false;	
	},
	
	isnumeric: function (s) {
		if (arguments.length === 0) {
			throw new Error("string.isnumeric needs atleast 1 argument");
		}
	
		/*if (typeof(args[0]) !== "string") {
			throw new Error("Invalid argument(s) to string.isnumeric");
		}*/
	
	    return (s == "" || (typeof(s) == "string" && s.replace(/\s/g,'').length == 0)) ? false : !(isNaN(s));
	},
	
	containschars: function (s, a) {
		if (arguments.length === 0) {
			throw new Error("string.containschars needs 2 arguments");
		}
	
		if (typeof(s) !== "string") {
			throw new Error("Invalid argument(s) to string.containschars");
		}
	
		if (a instanceof Array === false) {
			throw new Error("Invalid argument to table.containschars");
		}
	
		var charset = [];
		var charstr = "";
		var chararray = a;
		var len = chararray.length;
		var result = false;
	
		for(var i=0; i<len; i++) {
			charset[i] = chararray[i];
			if(s == "" || charset[i] == "") return true;
		}
	
		charstr = this.escapeRegExp(charset.join(""));
		charstr = "[" + charstr + "]";
	
		var regexp = new RegExp(charstr,"g");

		result = regexp.test(s);
	
		return result;
	},
	
	containsonlygivenchars: function (s, a) {
		if (arguments.length === 0) {
			throw new Error("string.containsonlygivenchars needs atleast 1 argument");
		}
	
		if (typeof(s) !== "string") {
			throw new Error("Invalid argument(s) to string.containsonlygivenchars");
		}
	
		var charset = [];
		var charstr = "";
		var chararray = a;
		var len = chararray.length;
		var result = false;
	
		for(var i=0; i<len; i++) {
			charset[i] = chararray[i];
		}
	
		charstr = charset.join("");
		charstr = "[^" + charstr + "]";
	
		var regexp = new RegExp(charstr,"g");
		result = regexp.test(s);
	
		if(result === false) {
			return true;
		} else {
			return false;
		}	
	},
	
	containsnogivenchars: function (s, a) {
		if (arguments.length === 0) {
			throw new Error("string.containsnogivenchars needs 2 arguments");
		}
	
		if (typeof(s) !== "string") {
			throw new Error("Invalid argument(s) to string.containsnogivenchars");
		}
	
		if (a instanceof Array === false) {
			throw new Error("Invalid argument to table.containsnogivenchars");
		}
	
		var charset = [];
		var charstr = "";
		var chararray = a;
		var len = chararray.length;
		var result = false;
	
		for(var i=0; i<len; i++) {
			charset[i] = chararray[i];
			if(charset[i] == "") return false;
		}
	
		charstr = charset.join("");
		charstr = "[" + charstr + "]";
	
		var regexp = new RegExp(charstr,"g");
		result = regexp.test(s);
	
		if(result === false) {
			return true;
		} else {
			return false;
		}	
	},
	
	isvalidemail: function (s) {
		if (arguments.length === 0)
			throw new Error("string.isvalidemail needs atleast 1 argument");
	
		var value = s;
		if (typeof(value) !== "string")
			return false;
	
		var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	    return emailPattern.test(value);
	},
	
	escapeRegExp: function (text)
	{
	    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
	}
}