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
/* Content of js-validate - start */
var errorClassExists = false;
var clearInvalidValue = false;
var addDatePickerToDateType = false;
var invalidClass = "errorEntry";
var validationMessages = [];

$(function() {
	$.ajax({
	    url : 'data/validationMessages.json',
	    dataType : 'json'
	}).done(function(sourceData) {
		validationMessages = sourceData;
	});
});

$(function() {
	jQuery.fn.extend({
	    blurOrChange : function(callBackFunction) {
		    return $(this).blur(callBackFunction).change(callBackFunction);
	    },

	    setValidationOption : function(options) {
		    if ((options != null) && (options["invalidClass"] != null)) {
			    invalidClass = options["invalidClass"];
		    }

		    if ((options != null) && (options["clearInvalidValue"] != null)) {
			    clearInvalidValue = options["clearInvalidValue"];
		    }

		    if ((options != null) && (options["errorClassExists"] != null)) {
			    errorClassExists = options["errorClassExists"];
		    }

		    if ((options != null) && (options["addDatePickerToDateType"] != null)) {
			    addDatePickerToDateType = options["addDatePickerToDateType"];
		    }
	    },

	    validate : function(options) {
		    $(this).setValidationOption(options);

		    try {
			    if (!errorClassExists) {
				    var style = document.createElement('style');
				    style.type = 'text/css';

				    var cssText = ".errorEntry { border: thin solid #ff3f3f !important; background-color: #fff8f8 !important;} "
				            + ".errorEntryTip { border: thin solid #ff3f3f !important; color: #ff3f3f !important; } "
				            + ".warningEntry { border: thin dashed #C0B9B5 !important; background-color: #FFFF99 !important; backg} "
				            + ".warningEntryTip { border: thin solid #C0B9B5 !important; background: none repeat scroll 0 0 #FFFF99 !important; background-color: #FFFF99 !important; }";

				    if (style.styleSheet) { // IE
					    style.styleSheet.cssText = cssText;
				    } else {
					    style.appendChild(document.createTextNode(cssText));
				    }
				    document.getElementsByTagName('head')[0].appendChild(style);
				    errorClassExists = true;
			    }
		    } catch (error) {

		    }

		    var selector = this;

		    $(selector).find("::text").each(function() {
			    $(this).validateComponent();
		    });

		    $(selector).find("textarea").each(function() {
			    $(this).validateComponent();
		    });

		    $(selector).find("::radio").each(function() {
			    $(this).validateComponent();
		    });

		    $(selector).find("::checkbox").each(function() {
			    $(this).validateComponent();
		    });

		    $(selector).find("select").each(function() {
			    $(this).validateComponent();
		    });
	    },

	    validateComponent : function() {
		    var selector = this;

		    if (selector.attr("validate-component-event-binded") == null) {
			    if ($(selector).is(":text")) {
				    var dataType = $(selector).attr("data-type");

				    if (isNotBlank(dataType)) {
					    if (dataType.toLowerCase() == "numeric") {
						    disablePaste(selector);
						    $(selector).keypress(function(event) {
							    return validateNumeric(event, $(this).val());
						    });
					    }

					    if (dataType.toLowerCase() == "alpha") {
						    disablePaste(selector);
						    $(selector).keypress(function(event) {
							    return validateAlpha(event);
						    });
					    }

					    if (dataType.toLowerCase() == "alphanumeric") {
						    disablePaste(selector);
						    $(selector).keypress(function(event) {
							    return validateAlphaNumeric(event);
						    });
					    }

					    if (dataType.toLowerCase() == "phone") {
						    disablePaste(selector);
						    $(selector).keypress(function(event) {
							    return validatePhone(event, $(this).val());
						    });
					    }

					    if (dataType.toLowerCase() == "range") {
						    if (isNotBlank($(selector).attr("data-range"))) {
							    $(selector).autocomplete({
								    source : $(selector).attr("data-range").split(",")
							    }).click(function() {
								    if (($(this).attr('readonly') == null) && ($(this).attr('disabled') == null)) {
									    $(this).autocomplete("search", $(this).val());
								    }
							    });
						    }
					    }

					    if (dataType.toLowerCase() == "date") {
						    disablePaste(selector);
						    if (addDatePickerToDateType) {
							    $(selector).datepicker({
							        changeYear : true,
							        yearRange : "1900:2100"
							    });
						    }
					    }
				    }

				    $(selector).blurOrChange(function(event) {
					    $(this).isValidComponent(event);
				    });
			    }

			    if ($(selector).is("textarea")) {
				    $(selector).blurOrChange(function(event) {
					    $(this).isValidComponent(event);
				    });
			    }

			    if ($(selector).is(":radio")) {
				    $(selector).click(function(event) {
					    $(this).isValidComponent(event);
				    });
			    }

			    if ($(selector).is(":checkbox")) {
				    $(selector).click(function(event) {
					    $(this).isValidComponent(event);
				    });
			    }

			    if ($(selector).is("select")) {
				    $(selector).blurOrChange(function(event) {
					    $(this).isValidComponent(event);
				    });
			    }

			    selector.attr("validate-component-event-binded", "true");
		    }

		    return $(selector);
	    },

	    isValid : function(filterCriteria) {
		    var selector = this;

		    if (filterCriteria != null) {
			    $(selector).find(filterCriteria).each(function() {
				    $(this).isValidComponent();
			    });

			    var isValidSection = true;
			    $(selector).find(filterCriteria).each(function() {
				    if ($(this).hasClass(invalidClass)) {
					    isValidSection = false;
					    return false;
				    } else if ($(this).parent().is('label') && $(this).parent().hasClass('wrappedLabel') && $(this).parent().hasClass(invalidClass)) {
					    isValidSection = false;
					    return false;
				    }
			    });
			    return isValidSection;
		    } else {
			    $(selector).find("input").each(function() {
				    $(this).isValidComponent();
			    });

			    $(selector).find("textarea").each(function() {
				    $(this).isValidComponent();
			    });

			    $(selector).find("select").each(function() {
				    $(this).isValidComponent();
			    });

			    if ($("." + invalidClass).length > 0) {
				    return false;
			    }
		    }

		    return true;
	    },

	    isValidComponent : function(event) {
		    var selector = $(this);
		    if (isNotBlank(selector.attr("current-error")) && (isNotBlank(selector.attr("valid-selection-message")))) {
			    return selector;
		    }
		    if ((event != null) && (event.type != null) && (event.type == "change")) {
			    clearInvalidValue = false;
		    } else {
			    clearInvalidValue = false;
		    }
		    if (selector.is(":text")) {
			    var dataType = selector.attr("data-type");
			    var errorMsg = "";
			    if (isNotBlank(dataType)) {
				    errorMsg = generateErrorMessage(this, "data-type-error-message", dataType.toLowerCase());
				    /* Data Type Error Check - Start */
				    if (dataType.toLowerCase() == "numeric") {
					    var blockDecimal = selector.attr("data-type-numeric-block-decimal");

					    /* Number Validation */
					    if (isNotBlank(selector.val()) && !(selector.val().isNumericOnly({
						    allowDecimal : blockDecimal == null
					    }))) {
						    selector.addValidationError(errorMsg);
						    return selector;
					    } else {
						    selector.removeValidationError();
					    }
				    }

				    if (dataType.toLowerCase() == "alpha") {
					    var allowSpaceInInput = selector.attr("data-type-alpha-allow-space");

					    /* Alphabets Validation */
					    if (isNotBlank(selector.val()) && !(selector.val().isAlphaOnly({
					        allowSingleQuotes : true,
					        allowSpace : (allowSpaceInInput != null)
					    }))) {
						    selector.addValidationError(errorMsg);
						    return selector;
					    } else {
						    selector.removeValidationError();
					    }
				    }

				    if (dataType.toLowerCase() == "alphanumeric") {
					    var allowSpaceInInput = selector.attr("data-type-alpha-numeric-allow-space");

					    if (isNotBlank(selector.val()) && !(selector.val().isAlphaNumeric({
					        allowSingleQuotes : true,
					        allowSpace : (allowSpaceInInput != null)
					    }))) {
						    selector.addValidationError(errorMsg);
						    return selector;
					    } else {
						    selector.removeValidationError();
					    }
				    }

				    if (dataType.toLowerCase() == "email") {
					    if (isNotBlank(selector.val()) && !validateEmail(selector.val())) {
						    selector.addValidationError(errorMsg);
						    return selector;
					    } else {
						    selector.removeValidationError();
					    }
				    }
				    if (dataType.toLowerCase() == "url") {
					    if (isNotBlank(selector.val()) && !validateUrl(selector.val())) {
						    selector.addValidationError(errorMsg);
						    return selector;
					    } else {
						    selector.removeValidationError();
					    }
				    }

				    if (dataType.toLowerCase() == "pattern") {
					    if (isNotBlank(selector.val()) && !validatePattern(selector.val(), selector.attr('data-pattern'))) {
						    selector.addValidationError(errorMsg);
						    return selector;
					    } else {
						    selector.removeValidationError();
					    }
				    }
				    if (dataType.toLowerCase() == "phone") {
					    var phnNumber = isNotBlank(selector.val()) ? selector.val().replace("+", "") : "";
					    if (isNotBlank(selector.val()) && !/^\d{1,3}\-?\d{1,3}\-?\d{1,4}\-?\d{1,5}?$/.test(phnNumber)) {
						    selector.addValidationError(errorMsg);
						    return selector;
					    } else {
						    selector.removeValidationError();
					    }
					    if (isNotBlank(selector.val()) && ((phnNumber.replaceAll("+", "").replaceAll("-", "")).length < 10)) {
						    selector.addValidationError(errorMsg);
						    return selector;
					    } else {
						    selector.removeValidationError();
					    }
				    }
				    if (dataType.toLowerCase() == "range") {
					    if (isNotBlank(selector.val()) && (selector.attr('readonly') == null) && isNotBlank(selector.attr("data-range"))) {
						    var validItem = false, items = selector.attr("data-range").split(",");
						    for ( var i = 0; i < items.length; i++) {
							    if (selector.val().toLowerCase() == items[i].toLowerCase()) {
								    validItem = true;
								    break;
							    }
						    }
						    if (validItem == false) {
							    if (selector.val().trim() != "") {
								    selector.addValidationError(errorMsg);
								    return selector;
							    }
						    } else {
							    selector.removeValidationError();
						    }
					    } else {
						    selector.removeValidationError();
					    }
				    }

				    if (dataType.toLowerCase() == "date") {
					    var enteredDateString = selector.val() + "";
					    if (!(enteredDateString.isDate())) {
						    selector.addValidationError(errorMsg);
						    return selector;
					    }
				    }
				    /* Data Type Error Check - End */

				    /* Data Max Value Check - Start */
				    var dataMaxValue = selector.attr("data-max-value");
				    if (isNotBlank(dataMaxValue)) {
					    errorMsg = generateErrorMessage(this, "data-max-value-error-message", dataType.toLowerCase(), "#max-value-placeholder#", selector.attr("data-max-value"));

					    if (dataType.toLowerCase() == "numeric") {
						    /* Max Value Validation */
						    if (isNotBlank(selector.val()) && !isNaN(selector.attr("data-max-value"))) {
							    if (Number(selector.attr("data-max-value")) < Number(selector.val())) {
								    selector.addValidationError(errorMsg);
								    return selector;
							    }
						    } else {
							    selector.removeValidationError();
						    }
					    }

					    if (dataType.toLowerCase() == "date") {
						    /* Max Value Validation */
						    if (isNaN(Date.parse(dataMaxValue)) && (dataMaxValue.toLowerCase() != "today") && (dataMaxValue.toLowerCase() != "now")) {
							    return selector;
						    }

						    var maxTimestamp = Date.parse(dataMaxValue);
						    if (isNaN(maxTimestamp) && ((dataMaxValue.toLowerCase() == "today") || (dataMaxValue.toLowerCase() == "now"))) {
							    maxTimestamp = getCurrentTime();
						    }
						    if (isNotBlank(selector.val())) {
							    if (maxTimestamp < Date.parse(selector.val())) {
								    selector.addValidationError(errorMsg);
								    return selector;
							    } else {
								    selector.removeValidationError();
							    }
						    } else {
							    selector.removeValidationError();
						    }
					    }
				    }
				    /* Data Max Value Check - End */

				    /* Data Min Value Check - Start */
				    var dataMinValue = selector.attr("data-min-value");
				    if (isNotBlank(dataMinValue)) {
					    errorMsg = generateErrorMessage(this, "data-min-value-error-message", dataType.toLowerCase(), "#min-value-placeholder#", selector.attr("data-min-value"));

					    if (dataType.toLowerCase() == "numeric") {
						    /* Min Value Validation */
						    if (isNotBlank(selector.val()) && !isNaN(selector.attr("data-min-value"))) {
							    if (Number(selector.attr("data-min-value")) > Number(selector.val())) {
								    selector.addValidationError(errorMsg);
								    return selector;
							    }
						    } else {
							    selector.removeValidationError();
						    }
					    }

					    if (dataType.toLowerCase() == "date") {
						    /* Min Value Validation */
						    if (isNaN(Date.parse(dataMinValue)) && (dataMinValue.toLowerCase() != "today") && (dataMinValue.toLowerCase() != "now")) {
							    return selector;
						    }

						    var minTimestamp = Date.parse(dataMinValue);
						    if (isNaN(minTimestamp) && ((dataMinValue.toLowerCase() == "today") || (dataMinValue.toLowerCase() == "now"))) {
							    minTimestamp = getCurrentTime();
						    }
						    if (isNotBlank(selector.val())) {
							    if (minTimestamp > Date.parse(selector.val())) {
								    selector.addValidationError(errorMsg);
								    return selector;
							    } else {
								    selector.removeValidationError();
							    }
						    } else {
							    selector.removeValidationError();
						    }
					    }
				    }
				    /* Data Min Value Check - End */
			    }

			    /* Max Length Validation */
			    if (isNotBlank(selector.attr("data-max-length"))) {
				    errorMsg = generateErrorMessage(this, "data-max-length-error-message", "", "#max-length-placeholder#", selector.attr("data-max-length"));
				    if (isNotBlank(selector.val()) && (Number(selector.attr("data-max-length")) > 0)) {
					    if (Number(selector.attr("data-max-length")) < selector.val().length) {
						    selector.addValidationError(errorMsg);
						    return selector;
					    } else {
						    selector.removeValidationError();
					    }
				    } else {
					    selector.removeValidationError();
				    }
			    }

			    /* Min Length Validation */
			    if (isNotBlank(selector.attr("data-min-length"))) {
				    errorMsg = generateErrorMessage(this, "data-min-length-error-message", "", "#min-length-placeholder#", selector.attr("data-min-length"));
				    if (isNotBlank(selector.val()) && (Number(selector.attr("data-min-length")) > 0)) {
					    if (Number(selector.attr("data-min-length")) > selector.val().length) {
						    selector.addValidationError(errorMsg);
						    return selector;
					    }
				    } else {
					    selector.removeValidationError();
				    }
			    }

			    /* Data Required Check */
			    if (selector.attr("data-required") != null) {
				    errorMsg = generateErrorMessage(this, "data-required-error-message");
				    var thisValue = selector.val();
				    if (selector.hasClass("taxIdTypeInput") && (thisValue != null)) {
					    thisValue = thisValue.replaceAll("_", "").replaceAll("-", "");
				    }
				    if (isBlank(thisValue)) {
					    selector.addValidationError(errorMsg);
					    return selector;
				    } else {
					    selector.removeValidationError();
				    }
			    }

			    /* Business Validation Check */
			    if (selector.attr("business-check") != null) {
				    errorMsg = generateErrorMessage(this, "business-check-error-message");
				    var validateFunction = selector.attr("business-check-function");
				    if (isNotBlank(validateFunction)) {
					    var validData = callValidateFunction(validateFunction);
					    if (!validData) {
						    selector.addValidationError(errorMsg);
						    return selector;
					    } else {
						    selector.removeValidationError();
					    }
				    }
			    }
		    } else if (selector.is("textarea")) {
			    /* Data Required Check */
			    if (selector.attr("data-required") != null) {
				    errorMsg = generateErrorMessage(this, "data-required-error-message");
				    if (isBlank(selector.val())) {
					    selector.addValidationError(errorMsg);
					    return selector;
				    } else {
					    selector.removeValidationError();
				    }
			    }

			    /* Max Length Validation */
			    if (isNotBlank(selector.attr("data-max-length"))) {
				    errorMsg = generateErrorMessage(this, "data-max-length-error-message", "", "#max-length-placeholder#", selector.attr("data-max-length"));
				    if (isNotBlank(selector.val()) && (Number(selector.attr("data-max-length")) > 0)) {
					    if (Number(selector.attr("data-max-length")) < selector.val().length) {
						    selector.addValidationError(errorMsg);
						    return selector;
					    } else {
						    selector.removeValidationError();
					    }
				    } else {
					    selector.removeValidationError();
				    }
			    }

			    /* Min Length Validation */
			    if (isNotBlank(selector.attr("data-min-length"))) {
				    errorMsg = generateErrorMessage(this, "data-min-length-error-message", "", "#min-length-placeholder#", selector.attr("data-min-length"));
				    if (isNotBlank(selector.val()) && (Number(selector.attr("data-min-length")) > 0)) {
					    if (Number(selector.attr("data-min-length")) > selector.val().length) {
						    selector.addValidationError(errorMsg);
						    return selector;
					    }
				    } else {
					    selector.removeValidationError();
				    }
			    }

			    /* Business Validation Check */
			    if (selector.attr("business-check") != null) {
				    errorMsg = generateErrorMessage(this, "business-check-error-message");
				    var validateFunction = selector.attr("business-check-function");
				    if (isNotBlank(validateFunction)) {
					    var validData = callValidateFunction(validateFunction);
					    if (!validData) {
						    selector.addValidationError(errorMsg);
						    return selector;
					    } else {
						    selector.removeValidationError();
					    }
				    }
			    }
		    } else if (selector.is(":radio")) {
			    /* Business Validation Check */

			    if (selector.attr("business-check") != null) {
				    errorMsg = generateErrorMessage(this, "business-check-error-message");
				    var validateFunction = selector.attr("business-check-function");
				    if (isNotBlank(validateFunction)) {
					    var validData = callValidateFunction(validateFunction);
					    if (!validData) {
						    if (selector.parent().is('label') && selector.parent().hasClass('wrappedLabel')) {
							    selector.parent().addValidationError(errorMsg);
						    } else {
							    selector.addValidationError(errorMsg);
						    }
						    return selector;
					    } else {
						    if (selector.parent().is('label') && selector.parent().hasClass('wrappedLabel')) {
							    selector.parent().removeValidationError();
						    } else {
							    selector.removeValidationError();
						    }
					    }
				    }
			    }

			    if (selector.attr("data-required") != null) {
				    errorMsg = generateErrorMessage(this, "data-required-error-message");
				    var isValid = false;
				    var radioName = selector.prop("name");
				    $("input[name=" + radioName + "]").each(function() {
					    isValid = $(this).is(":checked");
					    return !isValid;
				    });
				    if (!isValid) {
					    $("input[name=" + radioName + "]").each(function() {
						    var localSelector = $(this);
						    if (localSelector.parent().is('label') && localSelector.parent().hasClass('wrappedLabel')) {
							    localSelector.parent().addValidationError(errorMsg);
						    } else {
							    localSelector.addValidationError(errorMsg);
						    }
						    return selector;
					    });
				    } else {
					    $("input[name=" + radioName + "]").each(function() {
						    var localSelector = $(this);
						    if (localSelector.parent().is('label') && localSelector.parent().hasClass('wrappedLabel')) {
							    localSelector.parent().removeValidationError();
						    } else {
							    localSelector.removeValidationError();
						    }
					    });
				    }
			    }
		    } else if (selector.is(":checkbox")) {
			    /* Business Validation Check */
			    if (selector.attr("business-check") != null) {
				    errorMsg = generateErrorMessage(this, "business-check-error-message");
				    var validateFunction = selector.attr("business-check-function");
				    if (isNotBlank(validateFunction)) {
					    var validData = callValidateFunction(validateFunction);
					    if (!validData) {
						    if (selector.parent().is('label') && selector.parent().hasClass('wrappedLabel')) {
							    selector.parent().addValidationError(errorMsg);
						    } else {
							    selector.addValidationError(errorMsg);
						    }
						    return selector;
					    } else {
						    if (selector.parent().is('label') && selector.parent().hasClass('wrappedLabel')) {
							    selector.parent().removeValidationError();
						    } else {
							    selector.removeValidationError();
						    }
					    }
				    }
			    }
		    } else if (selector.is("select")) {
			    /* Data Required Check */
			    if (selector.attr("data-required") != null) {
				    errorMsg = generateErrorMessage(this, "data-required-error-message");
				    var selectedTextOrValue = isBlank(getSelectedTextForSelectOption(this)) && isBlank(getSelectedValueForSelectOption(this));
				    if (selectedTextOrValue || (selector.prop("selectedIndex") < 1)) {
					    selector.addValidationError(errorMsg);
					    return selector;
				    } else {
					    selector.removeValidationError();
				    }
			    }

			    /* Business Validation Check */
			    if (selector.attr("business-check") != null) {
				    errorMsg = generateErrorMessage(this, "business-check-error-message");
				    var validateFunction = selector.attr("business-check-function");
				    if (isNotBlank(validateFunction)) {
					    var validData = callValidateFunction(validateFunction);
					    if (!validData) {
						    selector.addValidationError(errorMsg);
						    return selector;
					    } else {
						    selector.removeValidationError();
					    }
				    }
			    }
		    }

		    return selector;
	    },
	    /**
	     * JQuery extension function to put the focus to a specific cursor position
	     * 
	     * @param position -
	     *            position of cursor to be moved to inside an input/textarea
	     */
	    setCursorPosition : function(pos) {
		    try {
			    if ($(this).get(0).setSelectionRange) {
				    $(this).get(0).setSelectionRange(pos, pos);
			    } else if ($(this).get(0).createTextRange) {
				    var range = $(this).get(0).createTextRange();
				    range.collapse(true);
				    range.moveEnd('character', pos);
				    range.moveStart('character', pos);
				    range.select();
			    }
		    } catch (error) {
			    return $(this).focus();
		    }
	    },

	    /**
	     * JQuery extension function to put the focus to the end of an input/textarea
	     */
	    focusEnd : function() {
		    this.setCursorPosition(this.val().length);
		    return this;
	    },

	    setSelection : function(selectionStart, selectionEnd) {
		    if (this.length == 0) {
			    return this;
		    }
		    input = this[0];

		    if (input.createTextRange) {
			    var range = input.createTextRange();
			    range.collapse(true);
			    range.moveEnd('character', selectionEnd);
			    range.moveStart('character', selectionStart);
			    range.select();
		    } else if (input.setSelectionRange) {
			    input.focus();
			    input.setSelectionRange(selectionStart, selectionEnd);
		    }

		    return this;
	    },

	    addValidationError : function(errorMessage, errorOrWarning) {
		    if ((clearInvalidValue == true) && (errorOrWarning != "warning")) {
			    $(this).val("");
		    }

		    var blockTabOut = $(this).attr("data-block-tabout");
		    if (isBlank(blockTabOut)) {
			    blockTabOut = "false";
		    }

		    if (isBlank(errorMessage)) {
			    validateErrorMessage = "Invalid input value.";
		    }

		    $(this).attr('oldTitle', $(this).attr('title'));
		    var errorWarningTipClass = 'errorEntryTip', errorWarningClass = 'errorEntry', errorWarningArrow = "errorArrow";
		    if (errorOrWarning == "warning") {
			    errorWarningTipClass = "warningEntryTip";
			    errorWarningClass = "warningEntry";
			    errorWarningArrow = "warningArrow";
			    blockTabOut = "false";
		    }
		    $(this).attr('title', "").tooltip({
		        content : errorMessage,
		        tooltipClass : errorWarningTipClass,
		        position : {
		            my : "center bottom-5",
		            at : "center top",
		            using : function(position, feedback) {
			            $(this).css(position);
			            $("<div>").addClass(errorWarningArrow).addClass(feedback.vertical).addClass(feedback.horizontal).appendTo(this);
		            }
		        }
		    }).addClass(errorWarningClass).focus(function() {
			    try {
				    $(this).tooltip("close");
			    } catch (error) {

			    }
		    });
		    try {
			    $(this).tooltip("close");
		    } catch (error) {

		    }

		    if (blockTabOut != "false") {
			    $(this).focusEnd();
		    }
		    $(this).attr("current-error", errorMessage);
		    return this;
	    },

	    removeValidationError : function() {
		    if (invalidClass != null) {
			    $(this).removeClass(invalidClass);
		    }
		    var oldTitle = $(this).attr('oldTitle');
		    $(this).attr('title', oldTitle).removeClass('errorEntry').removeClass('warningEntry');
		    try {
			    $(this).tooltip('destroy');
		    } catch (e) {
			    // IGNORE IF TOOLTIP DOESN'T EXISTS
		    }
		    $(this).removeAttr('oldTitle').removeAttr("current-error").removeAttr("valid-selection-message");
		    return this;
	    }
	});
});

function callValidateFunction(functionNameAttribute) {
	if (isBlank(functionNameAttribute)) {
		return true;
	}
	var functionName = functionNameAttribute.split("(")[0];
	var arguments = functionNameAttribute.split("(")[1].replaceAll(")", "").replaceAll("'", "").replaceAll('"', "").split(",");
	return executeFunction(functionName, arguments);
}

function executeFunction(functionName, arguments) {
	var fn = window[functionName];

	if (typeof fn !== "function") {
		return true;
	}

	return fn.apply(window, arguments);
}

function disablePaste(selector) {
	$(selector).bind("paste", function(e) {
		e.preventDefault();
	});
}
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

/**
 * JQuery ui extension function to show an alert dialogue box with message and title .
 * 
 * @param message -
 *            Message to be alerted
 * @param okButtonLabel -
 *            OK Button label
 * @param okButtonFunction -
 *            OK Button function to be invoked after click
 * @param messageType -
 *            Info, Warning Or Error - not case sensitive
 * @param title -
 *            Title of the message dialogue box
 * @param modalview -
 *            Modal view will block background clicks
 * 
 */
if (typeof alertMessage !== "function") {
	function alertMessage(message, okButtonLabel, okButtonFunction, messageType, title, modalview) {
		if (isBlank(okButtonLabel)) {
			okButtonLabel = "OK";
		}

		if (isNull(modalview)) {
			modalview = true;
		}
		if (isBlank(title)) {
			title = "Message";
		}

		var dialogueHtml = "<div title='" + title + "'>" + message + "</div>";

		if (messageType != null && messageType != undefined) {
			if (messageType.toLowerCase() == "info") {
				dialogueHtml = "<div title='" + title + "'><img src='assets/images/icon_information.gif' width='11px;' height='11px;'/>&nbsp;" + message + "</div>";
			}
			if (messageType.toLowerCase() == "warning") {
				dialogueHtml = "<div title='" + title + "'><img src='assets/images/icon_warning.gif' width='11px;' height='11px;' />&nbsp;" + message + "</div>";
			}
			if (messageType.toLowerCase() == "error") {
				dialogueHtml = "<div title='" + title + "'><img src='assets/images/icon_error.gif' width='11px;' height='11px;' />&nbsp;" + message + "</div>";
			}
		}
		try {
			return $(dialogueHtml).dialog({
			    modal : modalview,
			    buttons : [ {
			        text : okButtonLabel,
			        click : function() {
				        if (isNotNull(okButtonFunction)) {
					        try {
						        okButtonFunction();
					        } catch (error) {
						        alert(message);
					        }
				        }
				        $(this).dialog("close");
			        }
			    } ]
			});
		} catch (error) {
			alert(message);
		}
	}
}

/**
 * JQuery ui extension function to show a confirmation dialogue box with message and title.
 * 
 * @param message -
 *            Message to be alerted
 * @param yesButtonFunction -
 *            OK Button label
 * @param noButtonFunction -
 *            OK Button function to be invoked after click
 * @param yesButtonLabel -
 *            OK Button label
 * @param noButtonLabel -
 *            OK Button function to be invoked after click
 * @param title -
 *            Title of the message dialogue box
 * @param modalview -
 *            Modal view will block background clicks
 */
if (typeof confirmationMessage !== "function") {
	function confirmationMessage(message, yesButtonFunction, noButtonFunction, yesButtonLabel, noButtonLabel, title, modalview) {
		if (isNull(yesButtonFunction)) {
			alertMessage(message, null, null, null, title, modalview);
			return;
		}

		if (isBlank(yesButtonLabel)) {
			yesButtonLabel = "YES";
		}

		if (isBlank(noButtonLabel)) {
			noButtonLabel = "NO";
		}

		if (isNull(modalview)) {
			modalview = true;
		}
		if (isBlank(title)) {
			title = "Confirmation";
		}
		try {
			return $("<div title='" + title + "'>" + message + "</div>").dialog({
			    modal : modalview,
			    buttons : [ {
			        text : yesButtonLabel,
			        click : function() {
				        yesButtonFunction();
				        $(this).dialog("close");
			        }
			    }, {
			        text : noButtonLabel,
			        click : function() {
				        if (isNotNull(noButtonFunction)) {
					        noButtonFunction();
				        }
				        $(this).dialog("close");
			        }
			    } ]
			});
		} catch (error) {
			var confirmed = confirm(message);
			if (confirmed) {
				yesButtonFunction();
			} else {
				noButtonFunction();
			}
		}
	}
}

function getMessageFromJson(primaryKey, secondaryKey, ternaryKey) {
	var message = "";
	if (isBlank(primaryKey) || isBlank(secondaryKey)) {
		return message;
	}
	if ((validationMessages != undefined) && (validationMessages != null)) {
		if (validationMessages[primaryKey] && validationMessages[primaryKey][secondaryKey]) {
			if (isNotBlank(ternaryKey) && isNotBlank(validationMessages[primaryKey][secondaryKey][ternaryKey])) {
				message = validationMessages[primaryKey][secondaryKey][ternaryKey];
			} else if (isNotBlank(validationMessages[primaryKey][secondaryKey])) {
				message = validationMessages[primaryKey][secondaryKey];
			}
		}
	}
	return message;
}

function generateErrorMessage(selector, secondaryKey, ternaryKey, placeholderKey, placeholderValue) {
	var selectorId = $(selector).attr("id");
	var validationMessage = "";
	if (isNotBlank(selectorId)) {
		validationMessage = getMessageFromJson(selectorId, secondaryKey, ternaryKey);
	}
	if (isBlank(validationMessage)) {
		var selectorKey = $(selector).attr("data-message-key");
		if (isNotBlank(selectorKey)) {
			validationMessage = getMessageFromJson(selectorKey, secondaryKey, ternaryKey);
		}
	}
	if (isBlank(validationMessage)) {
		validationMessage = $(selector).attr(secondaryKey);
	}
	if (isBlank(validationMessage)) {
		validationMessage = getMessageFromJson("default-messages", secondaryKey, ternaryKey);
	}
	if (isBlank(validationMessage)) {
		validationMessage = "Invalid entry, and there is no message difined for " + secondaryKey + ", " + ternaryKey;
	}

	if (isNotBlank(validationMessage) && isNotBlank(placeholderKey) && isNotBlank(placeholderValue)) {
		validationMessage.replace(placeholderKey, placeholderValue);
	}
	return validationMessage;
}
/* Content of js-validate - end */
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

function getSelectedValueForSelectOption(selectId) {
	var selectedValue = $(selectId).val();
	return selectedValue != null ? selectedValue : "Not Defined";
}

function getSelectedTextForSelectOption(selectId) {
	var selectedText = $(selectId).find(":selected").text();
	return selectedText != null ? selectedText : "Not Defined";
}

function getAllTextForSelectOption(selectId) {
	var selectedText = "";
	$(selectId + " option").each(function() {
		selectedText += $(this).text() + '<br>';
	});
	return selectedText != null ? selectedText : "Not Defined";
}

function disableOptionOneOfSelectOption(selectId) {
	$(selectId).find(selectId + "OptionOne").attr('disabled', 'disabled');
}

function getMaskedString(unmaskedString, numberOfUnmaskedChar) {
	if ((unmaskedString != null) && ($.trim(unmaskedString) != "")) {
		var totalChar = unmaskedString.length;
		var maskedString = "";
		if ((numberOfUnmaskedChar == null) || (numberOfUnmaskedChar == undefined) || (numberOfUnmaskedChar == -1)) {
			numberOfUnmaskedChar = 0;
		} else if (numberOfUnmaskedChar > totalChar) {
			numberOfUnmaskedChar = totalChar;
		}
		for ( var i = 0; i < totalChar - numberOfUnmaskedChar; i++) {
			maskedString = maskedString + "*";
		}
		return maskedString + unmaskedString.slice(totalChar - numberOfUnmaskedChar, totalChar);
	}
	return "";
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

function onMouseOverBorderColorChange(elementId) {
	$(elementId).css('border-color', '#111122');
}

function onMouseOutBorderColorChange(elementId) {
	$(elementId).css('border-color', '#999999');
}

function sleep(milliseconds) {
	var start = new Date().getTime();
	for ( var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds) {
			break;
		}
	}
}

function applySlimScroll(selector, autoHide) {
	try {
		if ($(selector).parent().hasClass("slimScrollDiv")) {
			$(selector).slimScroll("destroy");
		}
	} catch (error) {
		// IGNORE IF ALREADY EXISTS.
	}

	if ((autoHide == undefined) || (autoHide == null)) {
		autoHide = false;
	}

	$(selector).slimScroll({
		height : $(window).height()
	});
}

function getHtmlWithCheckedSign(title) {
	return "<div style='display: inline; color: black;font-family: Verdana; font-weight: bolder;'> " + "	<img src='assets/images/checkbox-readonly-checked.png' height='12px' width='12px' >"
	        + "</div>&nbsp;" + "<label>" + title + "</label>";

}

function pairInputAndLabel(section) {
	if ((section == undefined) || (section == null)) {
		section = '.bodyContainer';
	}

	$(section).find(':checkbox,:radio').each(function() {
		var selector = $(this);
		if (selector.attr("pairing-added") != "true") {
			if (selector.is('[type=checkbox]')) {
				if ((selector.attr('pairedwithlabel') != null) && (selector.attr('pairedwithlabel') != '')) {
					selector.on('click', function() {
						if (isNotBlank($(this).attr('id'))) {
							var labelId = $(this).attr('id').replace('Input', '') + 'Lbl';
							try {
								if ($(this).attr('pairedwithlabel') == 'nocheck') {
									if ($(this).is(":checked")) {
										$('#' + labelId).html(getHtmlWithCheckedSign($(this).attr('title')));
									} else {
										$('#' + labelId).html('&nbsp;' + $(this).attr('title'));
									}
								}
							} catch (err) {
								if ('console' in window) {
									console.log('Unable to set value for label - [' + labelId + ']');
								}
							}
						}
					});
				}
			} else if (selector.is('[type=radio]')) {
				if ((selector.attr('pairedwithlabel') != null) && (selector.attr('pairedwithlabel') != '')) {
					selector.on('click', function() {
						var labelId = $(this).attr('name') + 'Lbl';
						try {
							if ($(this).attr('pairedwithlabel') == 'nocheck') {
								$('#' + labelId).html($(this).val());
							}
						} catch (err) {
							if ('console' in window) {
								console.log('Unable to set value for label - [' + labelId + ']');
							}
						}
					});
				}
			}
			selector.attr("pairing-added", "true");
		}
	});

	$(section).find('select').each(function() {
		var selector = $(this);
		if (selector.attr("pairing-added") != "true") {
			if ((selector.attr('pairedwithlabel') != null) && (selector.attr('pairedwithlabel') != '')) {
				selector.on('change', function() {
					if (isNotBlank($(this).attr('id'))) {
						var selectId = $(this).attr('id');
						var labelId = selectId.replace('Select', '') + 'Lbl';
						try {
							if ($(this).attr('pairedwithlabel') == 'nocheck') {
								$('#' + labelId).html(getSelectedTextForSelectOption('#' + selectId));
								disableOptionOneOfSelectOption("#" + selectId);
							} else if ($(this).attr('pairedwithlabel') == 'selectAll') {
								$('#' + labelId).html(getAllTextForSelectOption('#' + selectId));
								disableOptionOneOfSelectOption("#" + selectId);
							} else if ($(this).attr('pairedwithlabel') == 'selectValue') {
								$('#' + labelId).html(getSelectedValueForSelectOption('#' + selectId));
								disableOptionOneOfSelectOption("#" + selectId);
							}
						} catch (err) {
							if ('console' in window) {
								console.log('Unable to set value for label - [' + labelId + ']');
							}
						}
					}
				});
			}
			selector.attr("pairing-added", "true");
		}
	});
}

function add(objectGraph, jsonString, value) {
	if (jsonString.length == 1) {
		// if the array is now one element long, we're done
		objectGraph[jsonString[0]] = value;
	} else {
		// else we've still got more than a single element of depth
		if (objectGraph[jsonString[0]] == null) {
			// create the node if it doesn't yet exist
			objectGraph[jsonString[0]] = {};
		}
		// recurse, chopping off the first array element
		add(objectGraph[jsonString[0]], jsonString.slice(1), value);
	}
}

function generateJSONObjectGraph() {
	var objectGraph = {};

	$(".includeInSubmit").each(function() {
		var jsonString = $(this).attr('json-string');
		if ((jsonString != null) && (jsonString.indexOf(".") != -1)) {
			if ($(this).is("select")) {
				if ($(this).attr("json-options") == 'allselectval') {
					if ($(this).find('option').length > 0) {
						add(objectGraph, jsonString.split('.'), getAllSelectValues("#" + $(this).attr("id")));
					}
				} else if ($(this).prop("selectedIndex") != 0) {
					add(objectGraph, jsonString.split('.'), getSelectedTextForSelectOption("#" + $(this).attr("id")));
				}
			} else if ($(this).is(":text") || $(this).is("input[type='hidden']") || $(this).is("textarea")) {
				if (($(this).val() != null) && ($(this).val() != "")) {
					add(objectGraph, jsonString.split('.'), $(this).val());
				}
			} else if ($(this).is(":radio") && $(this).is(":checked")) {
				if (($(this).attr("value") != null) && ($(this).attr("value") != "")) {
					add(objectGraph, jsonString.split('.'), $(this).attr("value"));
				}
			} else if ($(this).is(":checkbox")) {
				if ($(this).is(":checked")) {
					var valueAttr = $(this).attr("value");
					if ((valueAttr != null) && (valueAttr != '')) {
						add(objectGraph, jsonString.split('.'), $(this).attr("value"));
					} else {
						add(objectGraph, jsonString.split('.'), "Y");
					}
				} else {
					add(objectGraph, jsonString.split('.'), "N");
				}
			}
		}
	});

	return objectGraph;
}

function generateJSON(objectGraph) {
	if ((objectGraph == null) || (objectGraph == {})) {
		objectGraph = generateJSONObjectGraph();
	}

	if ("console" in window) {
		console.log(JSON.stringify(objectGraph));
	}
	return JSON.stringify(objectGraph);
}

function parseAndApplyJSONString(parentJsonString) {
	var parsedJSON = JSON.parse(parentJsonString);
	applyJSONString(parsedJSON);
}

function applyJSONString(parsedJSON) {
	$("select").each(function() {
		applyJSONToSelector(parsedJSON, $(this));
	});
	$("input").each(function() {
		applyJSONToSelector(parsedJSON, $(this));
	});
	$("textarea").each(function() {
		applyJSONToSelector(parsedJSON, $(this));
	});
}

function applyJSONToSelector(parsedJSON, selector) {
	var jsonString = selector.attr('json-string');
	if ((jsonString != null) && (jsonString.indexOf(".") != -1)) {
		var jsonSubString = jsonString.split('.');
		var elementValue = parsedJSON[jsonSubString[0]];
		if ((elementValue != undefined) && (elementValue != null)) {
			for ( var i = 1; i < jsonSubString.length; i++) {
				if ((elementValue != undefined) && (elementValue != null)) {
					elementValue = elementValue[jsonSubString[i]];
				}
			}
		}
		if ((elementValue != undefined) && (elementValue != null) && (elementValue != "") && (elementValue != 'null')) {
			if (selector.is("select")) {
				setValueInPairedWithLabel(selector, elementValue, true);
			} else if (selector.is(":text") || selector.is("input[type='hidden']")) {
				selector.val(elementValue).trigger('change');
			} else if (selector.is("textarea")) {
				selector.val(elementValue);
				// No Need to fire trigger for text area.
			} else if (selector.is(":radio")) {
				if ((selector.attr("value") == null) || (selector.attr("value") == elementValue)) {
					selector.attr("checked", "checked");
					selector.trigger('click');
				}
			} else if (selector.is(":checkbox")) {
				if (elementValue == 'N') {
					if (selector.is(':checked')) {
						selector.trigger('click');
					}
				} else if (elementValue == 'Y') {
					if (!(selector.is(':checked'))) {
						selector.trigger('click');
					}
				} else if (selector.attr("value") == elementValue) {
					selector.trigger('click');
				}
			} else if (selector.is("label")) {
				selector.html(elementValue);
			}
		}
	}
}

function setValueInPairedWithLabel(selector, elementValue, pairedwithlabel) {
	if ($(selector).is('select')) {
		$(selector).find("option").filter(function() {
			return this.text == elementValue;
		}).attr('selected', true).trigger('change');

		if (pairedwithlabel == true) {
			$("#" + $(selector).attr("id").replace("Select", "") + "Lbl").html(elementValue);
		}
	} else if (!($(selector).is("[type=radio]") || $(selector).is("[type=checkbox]"))) {
		$(selector).val(elementValue).trigger('change').val(elementValue);
		if (pairedwithlabel == true) {
			$("#" + $(selector).attr("id").replace("Input", "") + "Lbl").html(elementValue);
		}
	}
}

function getRandomGeneratedKey() {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var n = Math.floor(Math.random() * 10) + 1;
	for ( var i = 0; i < n; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

function encryptValue(val) {
	try {
		return sjcl.encrypt(key, val);
	} catch (error) {
		return val;
	}
}

function decryptValue(encrptdval) {
	try {
		return sjcl.decrypt(key, encrptdval);
	} catch (error) {
		return val;
	}
}

/* Content of common.js - end */

