/* Content of js-utils - start */
/*----------------------------------------------------------------------------------*/
/*------------------------String Util Functions : Start-----------------------------*/
/*----------------------------------------------------------------------------------*/

/**
 * String.between(prefix, suffix, ignoreCase) returns substring between 2 string.
 * 
 * e.g.
 * 
 * "This is a string.".between("This", "string") will return " is a "
 * 
 * "This is a string.".between("is", "string") will also return " is a ", as it will search for the first occurrence of
 * prefix and suffix.
 * 
 * "This is a string.".between("this", "string", true) will return " is a "
 * 
 */
if (typeof String.prototype.between !== "function") {
	String.prototype.between = function(prefix, suffix, ignoreCase) {
		var strng = String(this);
		if (isBlank(strng)) {
			return "";
		}
		if (isBlank(prefix) && isBlank(suffix)) {
			return strng;
		}

		var prefixIndex = strng.indexOf(prefix);
		if (ignoreCase) {
			prefixIndex = strng.toLowerCase().indexOf(prefix.toLowerCase());
		}
		if (prefixIndex < 0) {
			return "";
		}
		strng = strng.substring(prefixIndex + prefix.length);
		var suffixIndex = strng.indexOf(suffix);
		if (ignoreCase) {
			suffixIndex = strng.toLowerCase().indexOf(suffix.toLowerCase());
		}
		if (suffixIndex < 0) {
			return "";
		}
		strng = strng.substring(0, suffixIndex);
		return strng;
	};
}

/**
 * String.capitalize(all) - Capitalizes the first character of a string, or can be used to capitalize first letter of
 * each word.
 * 
 * e.g.
 * 
 * "this is a string.".capitalize() will return "This is a string."
 * 
 * "this is a string.".capitalize(true) will return "This Is A String."
 * 
 */
if (typeof String.prototype.capitalize !== "function") {
	String.prototype.capitalize = function(all) {
		if (all) {
			return this.replace(/(?:^|\s)\S/g, function(char) {
				return char.toUpperCase();
			});
		}
		return this.charAt(0).toUpperCase() + this.slice(1);
	};
}

/**
 * String.chopLeft(prefix, ignoreCase) - removes prefix from start of string.
 * 
 * e.g.
 * 
 * "This is a string".chopLeft("This ") will return "is a string"
 * 
 * "This is a string".chopLeft("this ") will return "This is a string"
 * 
 * "This is a string".chopLeft("this ", true) will return "is a string"
 * 
 */
if (typeof String.prototype.chopLeft !== "function") {
	String.prototype.chopLeft = function(prefix, ignoreCase) {
		var strng = String(this);
		if (isBlank(this) || isBlank(prefix)) {
			return strng;
		}
		var prefixIndex = strng.indexOf(prefix);
		if (ignoreCase) {
			prefixIndex = strng.toLowerCase().indexOf(prefix.toLowerCase());
		}
		if (prefixIndex == 0) {
			return strng.slice(prefix.length);
		}
		return strng;
	};
}

/**
 * String.chopRight(suffix, ignoreCase) - removes suffix from start of string.
 * 
 * e.g.
 * 
 * "This is a string".chopRight("string") will return "This is a "
 * 
 * "This is a string".chopRight("String") will return "This is a string"
 * 
 * "This is a string".chopRight("String", true) will return "This is a "
 * 
 */
if (typeof String.prototype.chopRight !== "function") {
	String.prototype.chopRight = function(suffix, ignoreCase) {
		var strng = String(this);
		if (isBlank(this) || isBlank(suffix)) {
			return strng;
		}
		var suffixIndex = strng.indexOf(suffix);
		if (ignoreCase) {
			suffixIndex = strng.toLowerCase().indexOf(suffix.toLowerCase());
		}
		if (suffixIndex == strng.length - suffix.length) {
			return strng.slice(0, suffix.length);
		}
		return strng;
	};
}

/**
 * String.collapseWhitespace() - Replaces all multiple adjacent whitespace characters to a single space.
 * 
 * e.g.
 * 
 * "This \t is \n\n\t a \t\t\n\n string".collapseWhitespace() will return "This is a string"
 * 
 */
if (typeof String.prototype.collapseWhitespace !== "function") {
	String.prototype.collapseWhitespace = function() {
		return this.replace(/\s+/g, ' ');
	};
}

/**
 * String.contains(searchString, ignoreCase) Adds contain function based to string, will check if a string contains a
 * specific substring, will return true if it does.
 * 
 * e.g.
 * 
 * "This is a string".contains("string") will return true.
 * 
 * "This is a string".contains("String") will return false.
 * 
 * "This is a string".contains("String", true) will return true.
 * 
 */
if (typeof String.prototype.contains !== "function") {
	String.prototype.contains = function(searchString, ignoreCase) {
		if (isEmpty(this)) {
			return false;
		}
		if (typeof searchString === "string") {
			if (ignoreCase) {
				if (isEmpty(searchString) || this.toLowerCase().indexOf(searchString.toLowerCase()) !== -1) {
					return true;
				}
			} else {
				if (isEmpty(searchString) || this.indexOf(searchString) !== -1) {
					return true;
				}
			}
		}
		return this;
	};
}

/**
 * String.notContains(searchString, ignoreCase) Adds not contains function based to string, will check if a string does
 * not contains a specific substring, will return false if it does.
 * 
 * e.g.
 * 
 * "This is a string".notContains("string") will return false.
 * 
 * "This is a string".notContains("String") will return true.
 * 
 * "This is a string".notContains("String", true) will return false.
 * 
 */
if (typeof String.prototype.notContains !== "function") {
	String.prototype.notContains = function(searchString, ignoreCase) {
		return !((this + "").contains(searchString, ignoreCase));
	};
}

/**
 * Strnig.counts(searchString, ignoreCase) substring occurrence in string
 * 
 * e.g.
 * 
 * "Is this is a string.".count("is") will return 2
 * 
 * "Is this is a string.".count("is", true) will return 3
 * 
 */
if (typeof String.prototype.count !== "function") {
	String.prototype.count = function(searchString, ignoreCase) {
		var m = this.match(new RegExp(searchString.replace(/(?=[.\\+*?[^\]$(){}\|])/g, "\\"), "g"));
		if (ignoreCase) {
			m = this.toLowerCase().match(new RegExp(searchString.toLowerCase().replace(/(?=[.\\+*?[^\]$(){}\|])/g, "\\"), "g"));
		}
		return m ? m.length : 0;
	};
}
/**
 * String.camelize() returns string with camel case, i.e. Converts a string separated by dashes into a camelCase
 * equivalent.
 * 
 * e.g.
 * 
 * "this-is-a-string".camelize() will return "thisIsAString"
 * 
 */
if (typeof String.prototype.camelize !== "function") {
	String.prototype.camelize = function() {
		return this.replace(/-+(.)?/g, function(pattern, char) {
			return char ? char.toUpperCase() : '';
		});
	};
}

/**
 * String.uncamelize() returns string with camel case, i.e. Converts a string separated by dashes into a camelCase
 * equivalent.
 */
if (typeof String.prototype.uncamelize !== "function") {
	String.prototype.uncamelize = function() {
		return this.replace(/[A-Z]/g, function($0) {
			return '-' + $0.toLowerCase();
		});
	};
}

/**
 * String.decode() returns a decoded string which must be encoded earlier.
 * 
 * See also - String.encode()
 * 
 * e.g.
 * 
 * "Is%20this%20a%20String%3F%20Yes%21".decode() will return "Is this a String? Yes!"
 * 
 */
if (typeof String.prototype.decode !== "function") {
	String.prototype.decode = function() {
		if (isBlank(this)) {
			return this;
		}
		return unescape(this);
	};
}

/**
 * String.encode() returns a encoded string.
 * 
 * See also - String.decode()
 * 
 * e.g.
 * 
 * "Is this a String? Yes!".encode() will return "Is%20this%20a%20String%3F%20Yes%21"
 * 
 */
if (typeof String.prototype.encode !== "function") {
	String.prototype.encode = function() {
		if (isBlank(this)) {
			return this;
		}
		return escape(this);
	};
}
/**
 * String.formatCurrency() returns a currency formatted string.
 * 
 * e.g.
 * 
 * "10000".formatCurrency() will return "$10,000.00"
 * 
 * "10000".formatCurrency('£') will return "£10,000.00"
 * 
 * "10000".formatCurrency('£', 3) will return "£10,000.000"
 * 
 * "10000".formatCurrency('Rs', 0, '.', ',' , '/-') will return "Rs10,000/-"
 * 
 */
if (typeof String.prototype.formatCurrency !== "function") {
	String.prototype.formatCurrency = function(prefix, decimalPlaces, decimalSeparator, thousandSeparator, suffix) {
		return currencyFormatter(this, prefix, decimalPlaces, decimalSeparator, thousandSeparator, suffix);
	};
}

/**
 * String.isAlphaOnly(options) checks if a string is alphabets or not, return true if the string contains only
 * alphabets.
 * 
 * e.g.
 * 
 * "this".isAlphaOnly() will return "true"
 * 
 * "this is a string".isAlphaOnly() will return "false"
 * 
 * "this is a string".isAlphaOnly({allowSpace : true}) will return "true"
 * 
 */
if (typeof String.prototype.isAlphaOnly !== "function") {
	String.prototype.isAlphaOnly = function(options) {
		var strng = String(this);
		if (options != null) {
			if ((options["allowSpace"] != null) && (options["allowSpace"] == true)) {
				strng = strng.replace(/ /g, "");
			}
			if ((options["allowHiphens"] != null) && (options["allowHiphens"] == true)) {
				strng = strng.replace(/\-/g, "");
			}
			if ((options["allowUnderscores"] != null) && (options["allowUnderscores"] == true)) {
				strng = strng.replace(/\_/g, "");
			}
			if ((options["allowSingleQuotes"] != null) && (options["allowSingleQuotes"] == true)) {
				strng = strng.replace("\'", "");
			}
			if ((options["allowDoubleQuotes"] != null) && (options["allowDoubleQuotes"] == true)) {
				strng = strng.replace("\"", "");
			}
		}
		return (/^[a-z]+$/i).test(strng);
	};
}

/**
 * String.isNumericOnly(options) checks if a string is numbers or not, return true if the string contains only numbers
 * only.
 * 
 * e.g.
 * 
 * "123456".isNumericOnly() will return "true"
 * 
 * "123456.789".isNumericOnly() will return "false"
 * 
 * "123456.789".isNumericOnly({allodDecimal : true}) will return "true"
 * 
 */
if (typeof String.prototype.isNumericOnly !== "function") {
	String.prototype.isNumericOnly = function(options) {
		var strng = String(this);
		if (options != null) {
			if ((options["allowDecimal"] != null) && (options["allowDecimal"] == true)) {
				strng = strng.replace(/\./g, "");
			}
		}
		return (/^[0-9]+$/i).test(strng);
	};
}
/**
 * String.isNumericOnly(options) checks if a string is alphabets and/or numbers or not, return true if the string
 * contains only alphabets and numbers only.
 * 
 * e.g.
 * 
 * "BC123456".isAlphaNumeric() will return "true"
 * 
 * "aBC123456.789".isAlphaNumeric() will return "false"
 * 
 * "ASD123456.789".isAlphaNumeric({allodDecimal : true}) will return "true"
 * 
 */
if (typeof String.prototype.isAlphaNumeric !== "function") {
	String.prototype.isAlphaNumeric = function(options) {
		var strng = String(this);
		if (options != null) {
			if ((options["allowDecimal"] != null) && (options["allowDecimal"] == true)) {
				strng = strng.replace(/\./g, "");
			}
			if ((options["allowSpace"] != null) && (options["allowSpace"] == true)) {
				strng = strng.replace(/ /g, "");
			}
			if ((options["allowHiphens"] != null) && (options["allowHiphens"] == true)) {
				strng = strng.replace(/\-/g, "");
			}
			if ((options["allowUnderscores"] != null) && (options["allowUnderscores"] == true)) {
				strng = strng.replace(/\_/g, "");
			}
			if ((options["allowSingleQuotes"] != null) && (options["allowSingleQuotes"] == true)) {
				strng = strng.replace("\'", "");
			}
			if ((options["allowDoubleQuotes"] != null) && (options["allowDoubleQuotes"] == true)) {
				strng = strng.replace("\"", "");
			}
		}
		return (/^[a-z0-9]+$/i).test(strng);
	};
}

/**
 * String.isDate() checks if a string is a valid date or not, return true if the string contains a valid date.
 * 
 * e.g.
 * 
 * "123456789".isDate() will return "false"
 * 
 * "ASD123456.789".isDate({allodDecimal : true}) will return "true"
 * 
 */
if (typeof String.prototype.isDate !== "function") {
	String.prototype.isDate = function() {
		var strng = String(this);

		if (isNotBlank(strng) && (isNaN(Date.parse(strng)) || (new Date(Date.parse(strng)).getFullYear() > 9999))) {
			return false;
		}
		if (isNotBlank(strng)) {
			var matches = /^(\d{2})[-\/](\d{2})[-\/](\d{4})$/.exec(strng);
			if (matches == null) {
				return false;
			}
			var d = matches[2];
			if (d > 31) {
				return false;
			}
			var m = matches[1] - 1;
			if (m > 12) {
				return false;
			}
			var y = matches[3];
			if ((y < 1900) || (y > 2100)) {
				return false;
			}
			var composedDate = new Date(y, m, d);
			return (composedDate.getDate() == d) && (composedDate.getMonth() == m) && (composedDate.getFullYear() == y);
		}
		return true;
	};
}

/**
 * String.left(number) returns left most substring of n characters of given string
 * 
 * e.g.
 * 
 * "This is a string".left(5) will return "This "
 * 
 * "This is a string".left(4) will return "This"
 * 
 */
if (typeof String.prototype.left !== "function") {
	String.prototype.left = function(n) {
		if (isNaN(n)) {
			return "";
		}
		return (n > this.length) ? this : ((n <= 0) ? "" : this.substring(0, n));
	};
}

/**
 * String.right(number) returns right most substring of n characters of given string
 * 
 * e.g.
 * 
 * "This is a string".right(7) will return "String"
 * 
 * "This is a string".right(6) will return "String"
 * 
 */
if (typeof String.prototype.right !== "function") {
	String.prototype.right = function(n) {
		if (isNaN(n)) {
			return "";
		}
		return (n > this.length) ? this : ((n <= 0) ? "" : this.substring(this.length - n));
	};
}
/**
 * String.replaceAll(searchString, replaceValue, ignoreCase) returns a string with replacement of all occurrence of
 * searchString with new value
 * 
 * e.g.
 * 
 * "This is a string".replaceAll('is', "IS") will return "ThIS IS a string"
 * 
 * "This is a string".replaceAll('IS', "iS", true) will return "ThiS iS a string"
 * 
 */
if (typeof String.prototype.replaceAll !== "function") {
	String.prototype.replaceAll = function(searchString, replaceValue, ignoreCase) {
		var strng = this + "";
		var i = -1;
		if (typeof searchString === "string") {
			if (ignoreCase) {
				while ((i = strng.toLowerCase().indexOf(searchString, i >= 0 ? i + replaceValue.length : 0)) !== -1) {
					strng = strng.substring(0, i) + replaceValue + strng.substring(i + searchString.length);
				}
			} else {
				return this.split(searchString).join(replaceValue);
			}
		}
		return strng;
	};
}

/**
 * String.removeWhiteSpace() : Remove all the whitespaces from a string
 * 
 * e.g.
 * 
 * "This is a string.".removeWhiteSpace() will return "Thisisastring."
 * 
 */
if (typeof String.prototype.removeWhiteSpace !== "function") {
	String.prototype.removeWhiteSpace = function() {
		return this.replace(/\s/g, "");
	};
}

/**
 * String.remove(searchString) : Remove first occurrence of a searchString from a string
 * 
 * e.g.
 * 
 * "This is a string.".remove('is') will return "Th is a String."
 * 
 */
if (typeof String.prototype.remove !== "function") {
	String.prototype.remove = function(searchString) {
		return this.replace(searchString, "");
	};
}

/**
 * String.removeAll(searchString) : Remove all occurrences of a searchString from a string
 * 
 * e.g.
 * 
 * "This is a string.".removeAll('is') will return "Th a String."
 * 
 */
if (typeof String.prototype.removeAll !== "function") {
	String.prototype.removeAll = function(searchString, ignoreCase) {
		return this.replaceAll(searchString, "", ignoreCase);
	};
}

/**
 * String.swapcase() of string into it's inverted case string.
 * 
 * e.g.
 * 
 * "THis IS a stRIng.".swapcase() will return "thIS is A STriNG."
 * 
 */
if (typeof String.prototype.swapcase !== "function") {
	String.prototype.swapcase = function() {
		return this.replace(/([a-z]+)|([A-Z]+)/g, function(pattern, char) {
			return (char) ? pattern.toUpperCase() : pattern.toLowerCase();
		});
	};
}

/**
 * String.trim() will trim the given string by removing whitespaces from both side.
 * 
 * e.g. " This is a String. ".trim() will return "This is a String."
 * 
 */
if (typeof String.prototype.trim !== "function") {
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, "");
	};
}

/**
 * String.startsWith(searchString, ignoreCase) will check if the given string starts with the search string or not. Will
 * return true if it does.
 * 
 * e.g.
 * 
 * "This is a String.".startsWith("This") will return true.
 * 
 * "This is a String.".startsWith("this") will return false.
 * 
 * "This is a String.".startsWith("this", true) will return true.
 * 
 */
if (typeof String.prototype.startsWith !== "function") {
	String.prototype.startsWith = function(searchString, ignoreCase) {
		if (isEmpty(this)) {
			return false;
		}
		if (isEmpty(searchString)) {
			return true;
		}
		if (ignoreCase) {
			return this.toLowerCase().slice(0, searchString.length) == searchString.toLowerCase();
		}
		return this.slice(0, searchString.length) == searchString;
	};
}

/**
 * String.notStartsWith(searchString, ignoreCase) will check if the given string starts with the search string or not.
 * Will return false if it does.
 * 
 * e.g.
 * 
 * "This is a String.".notStartsWith("This") will return false.
 * 
 * "This is a String.".notStartsWith("this") will return true.
 * 
 * "This is a String.".notStartsWith("this", true) will return false.
 * 
 */
if (typeof String.prototype.notStartsWith !== "function") {
	String.prototype.notStartsWith = function(searchString, ignoreCase) {
		return !this.startsWith(searchString, ignoreCase);
	};
}

/**
 * String.endsWith(searchString, ignoreCase) will check if the given string ends with the search string or not. Will
 * return true if it does.
 * 
 * e.g.
 * 
 * "This is a String.".endsWith("String") will return true.
 * 
 * "This is a String.".endsWith("string") will return false.
 * 
 * "This is a String.".endsWith("string", true) will return true.
 * 
 */
if (typeof String.prototype.endsWith !== "function") {
	String.prototype.endsWith = function(searchString, ignoreCase) {
		if (isEmpty(this)) {
			return false;
		}
		if (isEmpty(searchString)) {
			return true;
		}
		if (ignoreCase) {
			return this.toLowerCase().slice(-searchString.length) == searchString.toLowerCase();
		}
		return this.slice(-searchString.length) == searchString;
	};
}

/**
 * String.notEndsWith(searchString, ignoreCase) will check if the given string ends with the search string or not. Will
 * return false if it does.
 * 
 * e.g.
 * 
 * "This is a String.".notEndsWith("String") will return false.
 * 
 * "This is a String.".notEndsWith("string") will return true.
 * 
 * "This is a String.".notEndsWith("string", true) will return false.
 * 
 */
if (typeof String.prototype.notEndsWith !== "function") {
	String.prototype.notEndsWith = function(searchString, ignoreCase) {
		return !this.endsWith(searchString, ignoreCase);
	};
}

if (typeof String.prototype.toTitleCase !== "function") {
	String.prototype.toTitleCase = function() {
		return this.replace(/\w\S*/g, function(txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	};
}

/*----------------------------------------------------------------------------------*/
/*------------------------String Util Functions : End-------------------------------*/
/*----------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------*/
/*------------------------Number Util Functions : Start-----------------------------*/
/*----------------------------------------------------------------------------------*/

/**
 * Number.between(first, second) Check if a number is between two numbers.
 * 
 * e.g.
 * 
 * (10000).between(1000, 20000) will return true
 * 
 * (10000).between(1000, 2000) will return false
 * 
 */
if (typeof Number.prototype.between !== "function") {
	Number.prototype.between = function(first, second) {
		return (first < second ? (this >= first) && (this <= second) : (this >= second) && (this <= first));
	};
}

/**
 * Number.convertTo(fromNumberSystem, toNumberSystem) return and equivalent number system number with help of redix.
 * 
 * e.g.
 * 
 * (1000).convertTo(2, 8) will return 10 - Binary 1000 will convert to octal 10
 * 
 */
if (typeof Number.prototype.convertTo !== "function") {
	Number.prototype.convertTo = function(fromNumberSystem, toNumberSystem) {
		if (isNull(fromNumberSystem) || isNaN(fromNumberSystem)) {
			fromNumberSystem = 10;
		}
		if (isNull(toNumberSystem) || isNaN(toNumberSystem)) {
			toNumberSystem = 10;
		}
		return parseInt(this, fromNumberSystem).toString(toNumberSystem);
	};
}

/**
 * Number.formatCurrency() returns a currency formatted string.
 * 
 * e.g.
 * 
 * (10000).formatCurrency() will return "$10,000.00"
 * 
 * (10000).formatCurrency('£') will return "£10,000.00"
 * 
 * (10000).formatCurrency('£', 3) will return "£10,000.000"
 * 
 * (10000).formatCurrency('Rs', 0, '.', ',' , '/-') will return "Rs10,000/-"
 * 
 */
if (typeof Number.prototype.formatCurrency !== "function") {
	Number.prototype.formatCurrency = function(prefix, decimalPlaces, decimalSeparator, thousandSeparator, suffix) {
		return currencyFormatter(this, prefix, decimalPlaces, decimalSeparator, thousandSeparator, suffix);
	};
}

/**
 * Number.abs() returns absolute value of number.
 * 
 * e.g.
 * 
 * (-1000).abs() will return 1000
 * 
 * (100).abs() will return 100
 * 
 */
if (typeof Number.prototype.abs !== "function") {
	Number.prototype.abs = function() {
		return Math.abs(this);
	};
}

/**
 * Number.trunc() returns truncated value of number, default number of digits is 2.
 * 
 * e.g.
 * 
 * (415.23914).trunc() will return 415.23
 * 
 * (415.23914).trunc(10) will return 415.2391400000
 * 
 * 
 */
if (typeof Number.prototype.trunc !== "function") {
	Number.prototype.trunc = function(digits) {
		if (isNull(digits) || isNaN(digits)) {
			digits = 2;
		}
		var lowestNumberForDigits = Math.pow(10, digits);
		var digitEquivalentNumber = this * lowestNumberForDigits;
		var celiedOrFlooredNumber = Math[digitEquivalentNumber < 0 ? 'ceil' : 'floor'](digitEquivalentNumber);
		return (celiedOrFlooredNumber / lowestNumberForDigits).toFixed(digits);
	};
}

/**
 * Number.round() returns roundated value of number, default number of digits is 0.
 * 
 * e.g.
 * 
 * (415.23914).round() will return 415
 * 
 * (415.23914).round(2) will return 415.24
 * 
 * 
 */
if (typeof Number.prototype.round !== "function") {
	Number.prototype.round = function(digits) {
		if (isNull(digits) || isNaN(digits)) {
			digits = 0;
		}
		var lowestNumberForDigits = Math.pow(10, digits);
		var digitEquivalentNumber = this * lowestNumberForDigits;
		var celiedOrFlooredNumber = Math.round(digitEquivalentNumber);
		return (celiedOrFlooredNumber / lowestNumberForDigits).toFixed(digits);
	};
}

/**
 * Number.ceil() returns nearest upper round value of number, default number of digits is 0.
 * 
 * e.g.
 * 
 * (415.23914).ceil() will return 416
 * 
 * (415.23914).ceil(2) will return 415.24
 * 
 * (415.23914).ceil(1) will return 415.3
 * 
 * 
 */
if (typeof Number.prototype.ceil !== "function") {
	Number.prototype.ceil = function(digits) {
		if (isNull(digits) || isNaN(digits)) {
			digits = 0;
		}
		var lowestNumberForDigits = Math.pow(10, digits);
		var digitEquivalentNumber = this * lowestNumberForDigits;
		var celiedOrFlooredNumber = Math.ceil(digitEquivalentNumber);
		return (celiedOrFlooredNumber / lowestNumberForDigits).toFixed(digits);
	};
}

/**
 * Number.floor() returns nearest lower round value of number, default number of digits is 0.
 * 
 * e.g.
 * 
 * (415.23914).floor() will return 415
 * 
 * (415.23914).floor(2) will return 415.23
 * 
 * (415.23914).floor(1) will return 415.2
 * 
 * 
 */
if (typeof Number.prototype.floor !== "function") {
	Number.prototype.floor = function(digits) {
		if (isNull(digits) || isNaN(digits)) {
			digits = 0;
		}
		var lowestNumberForDigits = Math.pow(10, digits);
		var digitEquivalentNumber = this * lowestNumberForDigits;
		var celiedOrFlooredNumber = Math.floor(digitEquivalentNumber);
		return (celiedOrFlooredNumber / lowestNumberForDigits).toFixed(digits);
	};
}

/**
 * Number.sqrt() returns square root of a function, default decimal digits is 0.
 * 
 * e.g.
 * 
 * (9).sqrt() will return 3
 * 
 * (9).sqrt(2) will return 3.00
 * 
 * 
 */
if (typeof Number.prototype.sqrt !== "function") {
	Number.prototype.sqrt = function(digits) {
		if (isNull(digits) || isNaN(digits)) {
			digits = 0;
		}
		var sqrtNumber = Math.sqrt(this);
		return (sqrtNumber).toFixed(digits);
	};
}

/**
 * Number.pow() Returns the value of x to the power of y, where x is this, default power is 2.
 * 
 * e.g.
 * 
 * (3).pow() will return 9
 * 
 * (3).pow(3) will return 27
 * 
 */
if (typeof Number.prototype.pow !== "function") {
	Number.prototype.pow = function(exponent) {
		if (isNull(exponent) || isNaN(exponent)) {
			exponent = 2;
		}
		return Math.pow(this, exponent);
	};
}

/*----------------------------------------------------------------------------------*/
/*------------------------Number Util Functions : End-------------------------------*/
/*----------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------*/
/*------------------------Date Util Functions : Start-------------------------------*/
/*----------------------------------------------------------------------------------*/

function getMilliSecondsInOneMinute() {
	return 60000; // 1000 * 60
}

function getMilliSecondsInOneHour() {
	return 3600000; // 1000 * 60 * 60
}

function getMilliSecondsInOneDay() {
	return 86400000; // 1000 * 60 * 60 * 24
}

function getMilliSecondsInOneWeek() {
	return 604800000; // 1000 * 60 * 60 * 24 * 7
}

/**
 * Date.between(first, second) Check if a date is between two dates.
 * 
 * e.g.
 * 
 * (new Date("01/01/2012")).between(new Date("01/01/2011"), new Date("01/01/2013")) will return true
 * 
 */
if (typeof Date.prototype.between !== "function") {
	Date.prototype.between = function(first, second) {
		return (first < second ? (this >= first) && (this <= second) : (this >= second) && (this <= first));
	};
}

/**
 * Date.addMinutes(numberOfMinutes) will add number of minutes to the given date time.
 */
Date.prototype.addMinutes = function(numberOfMinutes) {
	var timeInMilliseconds = this.getTime();
	timeInMilliseconds += numberOfMinutes * getMilliSecondsInOneMinute();
	this.setTime(timeInMilliseconds);
	return this;
};

/**
 * Date.addHours(numberOfHours) will add number of hours to the given date time.
 */
Date.prototype.addHours = function(numberOfHours) {
	var timeInMilliseconds = this.getTime();
	timeInMilliseconds += numberOfHours * getMilliSecondsInOneHour();
	this.setTime(timeInMilliseconds);
	return this;
};

/**
 * Date.addDays(numberOfDays) will add number of days to the given date time.
 */
Date.prototype.addDays = function(numberOfDays) {
	var timeInMilliseconds = this.getTime();
	timeInMilliseconds += numberOfDays * getMilliSecondsInOneDay();
	this.setTime(timeInMilliseconds);
	return this;
};

/**
 * Date.addWeeks(numberOfWeeks) will add number of weeks to the given date time.
 */
Date.prototype.addWeeks = function(numberOfWeeks) {
	var timeInMilliseconds = this.getTime();
	timeInMilliseconds += numberOfWeeks * getMilliSecondsInOneWeek();
	this.setTime(timeInMilliseconds);
	return this;
};

/**
 * Date.subtractMinutes(numberOfMinutes) will subtract number of minutes to the given date time.
 */
Date.prototype.subtractMinutes = function(numberOfMinutes) {
	var timeInMilliseconds = this.getTime();
	timeInMilliseconds -= numberOfMinutes * getMilliSecondsInOneMinute();
	this.setTime(timeInMilliseconds);
	return this;
};

/**
 * Date.subtractHours(numberOfHours) will subtract number of hours to the given date time.
 */
Date.prototype.subtractHours = function(numberOfHours) {
	var timeInMilliseconds = this.getTime();
	timeInMilliseconds -= numberOfHours * getMilliSecondsInOneHour();
	this.setTime(timeInMilliseconds);
	return this;
};

/**
 * Date.subtractDays(numberOfDays) will subtract number of days to the given date time.
 */
Date.prototype.subtractDays = function(numberOfDays) {
	var timeInMilliseconds = this.getTime();
	timeInMilliseconds -= numberOfDays * getMilliSecondsInOneDay();
	this.setTime(timeInMilliseconds);
	return this;
};

/**
 * Date.subtractWeeks(numberOfWeeks) will subtract number of weeks to the given date time.
 */
Date.prototype.subtractWeeks = function(numberOfWeeks) {
	var timeInMilliseconds = this.getTime();
	timeInMilliseconds -= numberOfWeeks * getMilliSecondsInOneWeek();
	this.setTime(timeInMilliseconds);
	return this;
};

var fetchNext = false, fetchPrev = false;

/**
 * Date.next() will mark the date to fetch future informations like next().monday() will return future monday.
 */
if (typeof Date.prototype.next !== "function") {
	Date.prototype.next = function() {
		fetchNext = true;
		fetchPrev = false;
		return this;
	};
}

/**
 * Date.prev() will mark the date to fetch past informations like prev().monday() will return past monday.
 */
if (typeof Date.prototype.prev !== "function") {
	Date.prototype.prev = function() {
		fetchNext = false;
		fetchPrev = true;
		return this;
	};
}

/**
 * Date.day() will return nearest consequtive date, for next() it will return Day + 1 for prev() it will return Day - 1
 */
if (typeof Date.prototype.day !== "function") {
	Date.prototype.day = function() {
		if (fetchNext == true) {
			this.addDays(1);
			fetchNext = false;
		}
		if (fetchPrev == true) {
			this.subtractDays(1);
			fetchPrev = false;
		}
		return this;
	};
}

/**
 * Date.monday() will return nearest monday, using with next() it will return next monday, with prev() it will return
 * previous monday
 */
if (typeof Date.prototype.monday !== "function") {
	Date.prototype.monday = function() {
		var dow = parseInt(this.getDay());
		var eow = 7 - dow;

		if ((fetchNext == false) && (fetchPrev == false)) {
			if ([ 2, 3, 4 ].contains(dow)) {
				fetchPrev = true;
			} else if ([ 0, 5, 6 ].contains(dow)) {
				fetchNext = true;
			}
		}
		if (fetchNext == true) {
			if (dow > 1) {
				this.addDays(eow + 1);
			} else {
				this.addDays(eow - 6);
			}
			fetchNext = false;
		}
		if (fetchPrev == true) {
			if (dow > 1) {
				this.subtractDays(dow - 1);
			} else {
				this.subtractDays(dow + 6);
			}
			fetchPrev = false;
		}
		return this;
	};
}

/**
 * Date.tuesday() will return nearest tuesday, using with next() it will return next tuesday, with prev() it will return
 * previous tuesday
 */
if (typeof Date.prototype.tuesday !== "function") {
	Date.prototype.tuesday = function() {
		var dow = parseInt(this.getDay());
		var eow = 7 - dow;

		if ((fetchNext == false) && (fetchPrev == false)) {
			if ([ 3, 4, 5 ].contains(dow)) {
				fetchPrev = true;
			} else if ([ 0, 1, 6 ].contains(dow)) {
				fetchNext = true;
			}
		}
		if (fetchNext == true) {
			if (dow > 2) {
				this.addDays(eow + 2);
			} else {
				this.addDays(eow - 5);
			}
			fetchNext = false;
		}
		if (fetchPrev == true) {
			if (dow > 2) {
				this.subtractDays(dow - 2);
			} else {
				this.subtractDays(dow + 5);
			}
			fetchPrev = false;
		}
		return this;
	};
}

/**
 * Date.wednesday() will return nearest wednesday, using with next() it will return next wednesday, with prev() it will
 * return previous wednesday
 */
if (typeof Date.prototype.wednesday !== "function") {
	Date.prototype.wednesday = function() {
		var dow = parseInt(this.getDay());
		var eow = 7 - dow;

		if ((fetchNext == false) && (fetchPrev == false)) {
			if ([ 4, 5, 6 ].contains(dow)) {
				fetchPrev = true;
			} else if ([ 0, 1, 2 ].contains(dow)) {
				fetchNext = true;
			}
		}
		if (fetchNext == true) {
			if (dow > 3) {
				this.addDays(eow + 3);
			} else {
				this.addDays(eow - 4);
			}
			fetchNext = false;
		}
		if (fetchPrev == true) {
			if (dow > 3) {
				this.subtractDays(dow - 3);
			} else {
				this.subtractDays(dow + 4);
			}
			fetchPrev = false;
		}
		return this;
	};
}

/**
 * Date.thursday() will return nearest thursday, using with next() it will return next thursday, with prev() it will
 * return previous thursday
 */
if (typeof Date.prototype.thursday !== "function") {
	Date.prototype.thursday = function() {
		var dow = parseInt(this.getDay());
		var eow = 7 - dow;

		if ((fetchNext == false) && (fetchPrev == false)) {
			if ([ 5, 6, 0 ].contains(dow)) {
				fetchPrev = true;
			} else if ([ 1, 2, 3 ].contains(dow)) {
				fetchNext = true;
			}
		}
		if (fetchNext == true) {
			if (dow > 4) {
				this.addDays(eow + 4);
			} else {
				this.addDays(eow - 3);
			}
			fetchNext = false;
		}
		if (fetchPrev == true) {
			if (dow > 4) {
				this.subtractDays(dow - 4);
			} else {
				this.subtractDays(dow + 3);
			}
			fetchPrev = false;
		}
		return this;
	};
}

/**
 * Date.thursday() will return nearest thursday, using with next() it will return next thursday, with prev() it will
 * return previous thursday
 */
if (typeof Date.prototype.thursday !== "function") {
	Date.prototype.thursday = function() {
		var dow = parseInt(this.getDay());
		var eow = 7 - dow;

		if ((fetchNext == false) && (fetchPrev == false)) {
			if ([ 5, 6, 0 ].contains(dow)) {
				fetchPrev = true;
			} else if ([ 1, 2, 3 ].contains(dow)) {
				fetchNext = true;
			}
		}
		if (fetchNext == true) {
			if (dow > 4) {
				this.addDays(eow + 4);
			} else {
				this.addDays(eow - 3);
			}
			fetchNext = false;
		}
		if (fetchPrev == true) {
			if (dow > 4) {
				this.subtractDays(dow - 4);
			} else {
				this.subtractDays(dow + 3);
			}
			fetchPrev = false;
		}
		return this;
	};
}

/**
 * Date.friday() will return nearest friday, using with next() it will return next friday, with prev() it will return
 * previous friday
 */
if (typeof Date.prototype.friday !== "function") {
	Date.prototype.friday = function() {
		var dow = parseInt(this.getDay());
		var eow = 7 - dow;

		if ((fetchNext == false) && (fetchPrev == false)) {
			if ([ 6, 0, 1 ].contains(dow)) {
				fetchPrev = true;
			} else if ([ 2, 3, 4 ].contains(dow)) {
				fetchNext = true;
			}
		}
		if (fetchNext == true) {
			if (dow > 5) {
				this.addDays(eow + 5);
			} else {
				this.addDays(eow - 2);
			}
			fetchNext = false;
		}
		if (fetchPrev == true) {
			if (dow > 5) {
				this.subtractDays(dow - 5);
			} else {
				this.subtractDays(dow + 2);
			}
			fetchPrev = false;
		}
		return this;
	};
}

/**
 * Date.saturday() will return nearest saturday, using with next() it will return next saturday, with prev() it will
 * return previous saturday
 */
if (typeof Date.prototype.saturday !== "function") {
	Date.prototype.saturday = function() {
		var dow = parseInt(this.getDay());
		var eow = 7 - dow;

		if ((fetchNext == false) && (fetchPrev == false)) {
			if ([ 0, 1, 2 ].contains(dow)) {
				fetchPrev = true;
			} else if ([ 3, 4, 5 ].contains(dow)) {
				fetchNext = true;
			}
		}
		if (fetchNext == true) {
			if (dow > 6) {
				this.addDays(eow + 6);
			} else {
				this.addDays(eow - 1);
			}
			fetchNext = false;
		}
		if (fetchPrev == true) {
			if (dow > 6) {
				this.subtractDays(dow - 6);
			} else {
				this.subtractDays(dow + 1);
			}
			fetchPrev = false;
		}
		return this;
	};
}

/**
 * Date.sunday() will return nearest sunday, using with next() it will return next sunday, with prev() it will return
 * previous sunday
 */
if (typeof Date.prototype.sunday !== "function") {
	Date.prototype.sunday = function() {
		var dow = parseInt(this.getDay());
		var eow = 7 - dow;

		if ((fetchNext == false) && (fetchPrev == false)) {
			if ([ 1, 2, 3 ].contains(dow)) {
				fetchPrev = true;
			} else if ([ 4, 5, 6 ].contains(dow)) {
				fetchNext = true;
			}
		}
		if (fetchNext == true) {
			this.addDays(eow);
			fetchNext = false;
		}
		if (fetchPrev == true) {
			this.subtractDays(dow);
			fetchPrev = false;
		}
		return this;
	};
}

/**
 * Date.compare() can be used to compare two dates, Compares this instance to a Date object and returns
 * 
 * -1 current is less than other date.
 * 
 * 0 current is equal to other date.
 * 
 * 1 current is greater to other date.
 * 
 */
if (typeof Date.prototype.compareTo !== "function") {
	Date.prototype.compareTo = function(otherDate) {
		if (otherDate == null) {
			return 1;
		}
		var currentTimeInMilliseconds = this.getMilliseconds();
		var otherTimeInMilliseconds = otherDate.getMilliseconds();
		if (currentTimeInMilliseconds < otherTimeInMilliseconds) {
			return -1;
		}
		if (currentTimeInMilliseconds > otherTimeInMilliseconds) {
			return 1;
		}
		return 0;
	};
}

/**
 * Date.isWeekDay() will check and return true if the given date is a week day.
 * 
 */
if (typeof Date.prototype.isWeekDay !== "function") {
	Date.prototype.isWeekDay = function() {
		var dow = parseInt(this.getDay());
		if ([ 1, 2, 3, 4, 5 ].contains(dow)) {
			return true;
		}
		return false;
	};
}

/**
 * Date.isWeekEnd() will check and return true if the given date is a week end.
 */
if (typeof Date.prototype.isWeekEnd !== "function") {
	Date.prototype.isWeekEnd = function() {
		return !this.isWeekDay();
	};
}
if (typeof Date.prototype.dateDifferenceInDays !== "function") {
	Date.prototype.dateDifferenceInDays = function(otherDate) {
		var t1 = this.getTime();
		var t2 = otherDate.getTime();
		return parseInt((t2 - t1) / (24 * 3600 * 1000));
	};
}

if (typeof Date.prototype.dateDifferenceInWeeks !== "function") {
	Date.prototype.dateDifferenceInWeeks = function(otherDate) {
		var t1 = this.getTime();
		var t2 = otherDate.getTime();
		return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
	};
}

if (typeof Date.prototype.dateDifferenceInMonths !== "function") {
	Date.prototype.dateDifferenceInMonths = function(otherDate) {
		var d1Y = this.getFullYear();
		var d2Y = otherDate.getFullYear();
		var d1M = this.getMonth();
		var d2M = otherDate.getMonth();
		return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
	};
}

if (typeof Date.prototype.dateDifferenceInYears !== "function") {
	Date.prototype.dateDifferenceInYears = function(otherDate) {
		var t1 = this.getTime();
		var t2 = otherDate.getTime();
		return parseInt((t2 - t1) / (24 * 3600 * 1000 * 365.25));
	};
}

if (typeof Date.prototype.getDateInMMDDYYYY !== "function") {
	Date.prototype.getDateInMMDDYYYY = function() {
		var year = this.getFullYear();
		var month = (1 + this.getMonth()).toString();
		month = month.length > 1 ? month : "0" + month;
		var day = this.getDate().toString();
		day = day.length > 1 ? day : "0" + day;
		return month + "/" + day + "/" + year;
	};
}

/*----------------------------------------------------------------------------------*/
/*------------------------Date Util Functions : End---------------------------------*/
/*----------------------------------------------------------------------------------*/

/**
 * currencyFormatter() function will convert any string having numbers only or numbers to it's $ format with thousand as
 * comma (,)
 * 
 * @param decimalPlaces -
 *            number of decimal points, default 2
 * @param decimalSeparator -
 *            decimal point separator, default '.'
 * @param thousandSeparator -
 *            thousand separator default ','
 * @returns - returns string in formatted currency 1000 will be returned as $1,000, returns $0.00 for non numeric inputs
 *          or errors
 */
function currencyFormatter(value, prefix, decimalPlaces, decimalSeparator, thousandSeparator, suffix) {
	try {
		var n = Number(value);
		prefix = prefix == undefined ? "$" : prefix;
		suffix = suffix == undefined ? "" : suffix;
		decimalPlaces = isNaN(decimalPlaces = Math.abs(decimalPlaces)) ? 2 : decimalPlaces;
		decimalSeparator = decimalSeparator == undefined ? "." : decimalSeparator;
		thousandSeparator = thousandSeparator == undefined ? "," : thousandSeparator;
		var s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(decimalPlaces)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
		return prefix + s + (j ? i.substr(0, j) + thousandSeparator : "") + i.substr(j).replace(/(\decimalSeparator{3})(?=\decimalSeparator)/g, "$1" + thousandSeparator)
		        + (decimalPlaces ? decimalSeparator + Math.abs(n - i).toFixed(decimalPlaces).slice(2) : "") + suffix;
	} catch (error) {
		alertMessage("Error coverting value(" + value + ") to currency : " + error, "OK", null, "error");
	}
}

/**
 * Check if an object is null.
 * 
 * @param obj -
 *            Objcet to be checked
 */
function isNull(obj) {
	if ((obj == null) || (obj == undefined)) {
		return true;
	}
	return false;
}

/**
 * Check if an object is null.
 * 
 * @param obj -
 *            Objcet to be checked
 */
function isNotNull(obj) {
	return !isNull(obj);
}

if (typeof Array.prototype.contains !== "function") {
	Array.prototype.contains = function(obj) {
		return this.indexOf(obj) != -1;
	};
}
/*----------------------------------------------------------------------------------*/
/*------------------------Object Util Functions : End-------------------------------*/
/*----------------------------------------------------------------------------------*/
/* Content of js-utils - end */

function validateNumeric(evt, value) {
	var event = evt || window.event;
	var eKeyCode = event.keyCode || event.which, eCharCode = event.charCode || eKeyCode;
	if (eKeyCode == 8) {
		return true;
	}
	if ((eCharCode == 46) && ((eKeyCode == 0) || (eKeyCode == 46)) && (value.indexOf(".") != -1)) {
		event.returnValue = false;
		if (event.preventDefault) {
			event.preventDefault();
		}
		return false;
	}
	eKeyCode = String.fromCharCode(eKeyCode);
	var regex = /[0-9]|\./;
	if (!regex.test(eKeyCode)) {
		event.returnValue = false;
		if (event.preventDefault) {
			event.preventDefault();
		}
	}
}

function validateAlpha(evt) {
	var event = evt || window.event;
	var eKeyCode = event.keyCode || event.which;
	var allowSpaceInInput = $(event.target).attr("data-type-alpha-allow-space");
	if (allowSpaceInInput != null) {
		if (eKeyCode == 32) {
			return true;
		}
	}
	if ((eKeyCode == 8) || (eKeyCode == 39)) {
		return true;
	}
	eKeyCode = String.fromCharCode(eKeyCode);
	var regex = /^[a-z]+$/i;
	if (!regex.test(eKeyCode)) {
		event.returnValue = false;
		if (event.preventDefault) {
			event.preventDefault();
		}
	}
}

function validateAlphaNumeric(evt) {
	var event = evt || window.event;
	var eKeyCode = event.keyCode || event.which;
	var allowSpaceInInput = $(event.target).attr("data-type-alpha-numeric-allow-space");
	if (allowSpaceInInput != null) {
		if (eKeyCode == 32) {
			return true;
		}
	}
	if ((eKeyCode == 8) || (eKeyCode == 39)) {
		return true;
	}
	eKeyCode = String.fromCharCode(eKeyCode);
	var regex = /^[a-z0-9]+$/i;
	if (!regex.test(eKeyCode)) {
		event.returnValue = false;
		if (event.preventDefault) {
			event.preventDefault();
		}
	}
}

function validatePhone(evt, value) {
	var event = evt || window.event;
	var eKeyCode = event.keyCode || event.which;
	if ((eKeyCode == 8) || (eKeyCode == 32)) {
		return true;
	}

	if (isBlank(value) && (eKeyCode == 43)) {
		return true;
	}

	if (isBlank(value) && (eKeyCode == 45)) {
		event.returnValue = false;
		if (event.preventDefault) {
			event.preventDefault();
		}
	}

	if (isNotBlank(value) && (eKeyCode == 45) && (value.endsWith("-") || value.endsWith("+"))) {
		event.returnValue = false;
		if (event.preventDefault) {
			event.preventDefault();
		}
	}

	eKeyCode = String.fromCharCode(eKeyCode);
	var regex = /[0-9\-]/;
	if (!regex.test(eKeyCode)) {
		event.returnValue = false;
		if (event.preventDefault) {
			event.preventDefault();
		}
	}
}

function validateEmail(email) {
	var tempArray = email.split("@");
	if (tempArray.length && (tempArray.length != 2)) {
		return false;
	}
	if (!("" + tempArray[0]).isAlphaNumeric({
	    allowDecimal : true,
	    allowHiphens : true,
	    allowUnderscores : true
	})) {
		return false;
	}
	if (tempArray[1].indexOf(".") <= 0) {
		return false;
	}
	var tempArr = tempArray[1].split(".");
	if (tempArr.length && (tempArr.length != 2)) {
		return false;
	}
	return true;
}

function validateUrl(url) {
	if (!(("" + url).startsWith("http") || ("" + url).startsWith("ftp") || ("" + url).startsWith("sftp"))) {
		url = "http://" + url;
	}
	var urlRegex = /^(http?|https?|ftp?|sftp?):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
	return urlRegex.test(url);
}

function validatePattern(value, pattern) {
	var patternRegex = new RegExp(pattern);
	return patternRegex.test(value);
}

/* Content of common.js - start */
function validateNumber(evt, value) {
	var event = evt || window.event;
	var eKeyCode = event.keyCode || event.which, eCharCode = event.charCode || eKeyCode;
	if ((eKeyCode == 8) || (eKeyCode == 37) || (eKeyCode == 39)) {
		return true;
	}
	if ((eCharCode == 46) && ((eKeyCode == 0) || (eKeyCode == 46)) && (value.indexOf(".") != -1)) {
		event.returnValue = false;
		if (event.preventDefault) {
			event.preventDefault();
		}
		return false;
	}
	eKeyCode = String.fromCharCode(eKeyCode);
	var regex = /[0-9]|\./;
	if (!regex.test(eKeyCode)) {
		event.returnValue = false;
		if (event.preventDefault) {
			event.preventDefault();
		}
	}
}


function alphaNumeric(e) {
	var key;
	var keychar;

	if (window.event) {
		key = window.event.keyCode;
	} else if (e) {
		key = e.which;
	} else {
		return true;
	}
	keychar = String.fromCharCode(key);
	keychar = keychar.toLowerCase();

	if ((key == null) || (key == 0) || (key == 8) || (key == 9) || (key == 13) || (key == 27)) {
		return true;
	} else if ((("abcdefghijklmnopqrstuvwxyz0123456789").indexOf(keychar) > -1)) {
		return true;
	} else {
		return false;
	}
}

function sleep(milliseconds) {
	var start = new Date().getTime();
	for ( var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds) {
			break;
		}
	}
}
