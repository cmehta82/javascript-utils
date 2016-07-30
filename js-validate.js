var errorClassExists = false;
var clearInvalidValue = true;
var addDatePickerToDateType = false;
var invalidClass = "errorEntry";

jQuery.fn.extend({
    blurOrChange : function(callBackFunction) {
	    $(this).blur(callBackFunction);
	    $(this).change(callBackFunction);
    },

    setValidationOption : function(options) {
	    if (options != null && options["invalidClass"] != null) {
		    invalidClass = options["invalidClass"];
	    }

	    if (options != null && options["clearInvalidValue"] != null) {
		    clearInvalidValue = options["clearInvalidValue"];
	    }

	    if (options != null && options["errorClassExists"] != null) {
		    errorClassExists = options["errorClassExists"];
	    }

	    if (options != null && options["addDatePickerToDateType"] != null) {
		    addDatePickerToDateType = options["addDatePickerToDateType"];
	    }
    },

    validate : function(options) {
	    $(this).setValidationOption(options);

	    try {
		    if (!errorClassExists) {
			    var style = document.createElement('style');
			    style.type = 'text/css';

			    var cssText = ".errorEntry { border: thin solid #ff3f3f !important; background-color: #facdca  !important;} "
			            + ".errorEntryTip { border: thin solid #ff3f3f !important; color: #ff3f3f !important;} "
			            + ".warningEntry { border: thin dashed orange !important; } "
			            + ".warningEntryTip { 	color: orange; 	border: thin solid #AA4444 !important;}";

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

	    $(selector).find(":input[type='text']").each(function() {
		    $(this).validateComponent();
	    });

	    $(selector).find("textarea").each(function() {
		    $(this).validateComponent();
	    });

	    $(selector).find(":input[type='radio']").each(function() {
		    $(this).validateComponent();
	    });

	    $(selector).find(":input[type='checkbox']").each(function() {
		    $(this).validateComponent();
	    });

	    $(selector).find("select").each(function() {
		    $(this).validateComponent();
	    });
    },

    validateComponent : function() {
	    var selector = this;

	    if ($(selector).is("input[type=text]")) {
		    var dataType = $(selector).attr("data-type");

		    if (isNotBlank(dataType)) {
			    if (dataType.toLowerCase() == "numeric") {
				    $(selector).keypress(function(event) {
					    return validateNumeric(event, $(this).val());
				    });
			    }

			    if (dataType.toLowerCase() == "alpha") {
				    $(selector).keypress(function(event) {
					    return validateAlpha(event, $(this).val());
				    });
			    }

			    if (dataType.toLowerCase() == "alphanumeric") {
				    $(selector).keypress(function(event) {
					    return validateAlphaNumeric(event, $(this).val());
				    });
			    }

			    if (dataType.toLowerCase() == "range") {
				    if (isNotBlank($(selector).attr("data-range"))) {
					    $(selector).autocomplete({
						    source : $(selector).attr("data-range").split(",")
					    }).click(function() {
						    if ($(this).attr('readonly') == null && $(this).attr('disabled') == null) {
							    $(this).autocomplete("search", $(this).val());
						    }
					    });
				    }
			    }

			    if (addDatePickerToDateType && dataType.toLowerCase() == "date") {
				    $(selector).datepicker({
					    changeYear : true
				    });
			    }
		    }

		    $(selector).blurOrChange(function(event) {
			    $(this).isValidComponent();
		    });
	    }

	    if ($(selector).is("textarea")) {
		    $(selector).blurOrChange(function(event) {
			    $(this).isValidComponent();
		    });
	    }

	    if ($(selector).is("input[type='radio']")) {
		    $(selector).click(function(event) {
			    $(this).isValidComponent();
		    });
	    }

	    if ($(selector).is("input[type='checkbox']")) {
		    $(selector).click(function(event) {
			    $(this).isValidComponent();
		    });
	    }

	    if ($(selector).is("select")) {
		    $(selector).blurOrChange(function(event) {
			    $(this).isValidComponent();
		    });
	    }
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

    isValidComponent : function() {
	    if ($(this).is("input[type=text]")) {
		    var dataType = $(this).attr("data-type");
		    if (isNotBlank(dataType)) {
			    var errorMsg = $(this).attr("data-type-error-message");

			    if (dataType.toLowerCase() == "numeric") {
				    if (isBlank(errorMsg)) {
					    errorMsg = "Only numeric characters are allowed.";
				    }

				    var blockDecimal = $(this).attr("data-type-numeric-block-decimal");

				    /* Number Validation */
				    if (isNotBlank($(this).val()) && !($(this).val().isNumericOnly({
					    allowDecimal : blockDecimal == null
				    }))) {
					    $(this).addValidationError(errorMsg);
					    return;
				    } else {
					    $(this).removeValidationError();
				    }

				    /* Max Value Validation */
				    if (isNotBlank($(this).val()) && isNotBlank($(this).attr("data-max-value")) && Number($(this).attr("data-max-value")) > 0) {
					    errorMsg = $(this).attr("data-max-value-error-message");
					    if (isBlank(errorMsg)) {
						    errorMsg = "Maximum allowed value is " + $(this).attr("data-max-value") + ".";
					    }
					    if (Number($(this).attr("data-max-value")) < Number($(this).val())) {
						    $(this).addValidationError(errorMsg);
						    return;
					    }
				    } else {
					    $(this).removeValidationError();
				    }

				    /* Min Value Validation */
				    if (isNotBlank($(this).val()) && isNotBlank($(this).attr("data-min-value")) && Number($(this).attr("data-min-value")) > 0) {
					    errorMsg = $(this).attr("data-min-value-error-message");
					    if (isBlank(errorMsg)) {
						    errorMsg = "Minimum allowed value is " + $(this).attr("data-min-value") + ".";
					    }
					    if (Number($(this).attr("data-min-value")) > Number($(this).val())) {
						    $(this).addValidationError(errorMsg);
						    return;
					    }
				    } else {
					    $(this).removeValidationError();
				    }
			    }

			    if (dataType.toLowerCase() == "alpha") {
				    if (isBlank(errorMsg)) {
					    errorMsg = "Only alphabets are allowed.";
				    }

				    var allowSpaceInInput = $(this).attr("data-type-alpha-allow-space");

				    /* Alphabets Validation */
				    if (isNotBlank($(this).val()) && !($(this).val().isAlphaOnly({
				        allowSingleQuotes : true,
				        allowSpace : (allowSpaceInInput != null)
				    }))) {
					    $(this).addValidationError(errorMsg);
					    return;
				    } else {
					    $(this).removeValidationError();
				    }
			    }
			    if (dataType.toLowerCase() == "alphanumeric") {
				    if (isBlank(errorMsg)) {
					    errorMsg = "Only alphabets and numbers are allowed.";
				    }

				    var allowSpaceInInput = $(this).attr("data-type-alpha-numeric-allow-space");

				    if (isNotBlank($(this).val()) && !($(this).val().isAlphaNumeric({
				        allowSingleQuotes : true,
				        allowSpace : (allowSpaceInInput != null)
				    }))) {
					    $(this).addValidationError(errorMsg);
					    return;
				    } else {
					    $(this).removeValidationError();
				    }
			    }

			    if (dataType.toLowerCase() == "email") {
				    if (isBlank(errorMsg)) {
					    errorMsg = "Email address is invalid.";
				    }
				    if (isNotBlank($(this).val()) && !validateEmail($(this).val())) {
					    $(this).addValidationError(errorMsg);
					    return;
				    } else {
					    $(this).removeValidationError();
				    }
			    }

			    if (dataType.toLowerCase() == "url") {
				    if (isBlank(errorMsg)) {
					    errorMsg = "Url address is invalid.";
				    }
				    if (isNotBlank($(this).val()) && !validateUrl($(this).val())) {
					    $(this).addValidationError(errorMsg);
					    return;
				    } else {
					    $(this).removeValidationError();
				    }
			    }

			    if (dataType.toLowerCase() == "pattern") {
				    if (isBlank(errorMsg)) {
					    errorMsg = "Input pattern is invalid.";
				    }
				    if (isNotBlank($(this).val()) && !validatePattern($(this).val(), $(this).attr('data-pattern'))) {
					    $(this).addValidationError(errorMsg);
					    return;
				    } else {
					    $(this).removeValidationError();
				    }
			    }
			    if (dataType.toLowerCase() == "range") {
				    if (isBlank(errorMsg)) {
					    errorMsg = "Item out of range.";
				    }

				    if (isNotBlank($(this).val()) && $(this).attr('readonly') == null && isNotBlank($(this).attr("data-range"))) {
					    var validItem = false, items = $(this).attr("data-range").split(",");
					    for ( var i = 0; i < items.length; i++) {
						    if ($(this).val().toLowerCase() == items[i].toLowerCase()) {
							    validItem = true;
							    break;
						    }
					    }
					    if (validItem == false) {
						    if ($(this).val().trim() != "") {
							    $(this).addValidationError(errorMsg);
							    return;
						    }
					    } else {
						    $(this).removeValidationError();
					    }
				    } else {
					    $(this).removeValidationError();
				    }
			    }

			    if (dataType.toLowerCase() == "date") {
				    var enteredDateString = $(this).val() + "";
				    if (!(enteredDateString.isDate())) {
					    $(this).addValidationError("Date is invalid.");
					    return;
				    }

				    /* Max Value Validation */
				    var dataMaxValue = $(this).attr("data-max-value");
				    if (isNotBlank(dataMaxValue)) {
					    if (isNaN(Date.parse(dataMaxValue)) && dataMaxValue.toLowerCase() != "today" && dataMaxValue.toLowerCase() != "now") {
						    return;
					    }

					    var maxTimestamp = Date.parse(dataMaxValue);
					    if (isNaN(maxTimestamp) && (dataMaxValue.toLowerCase() == "today" || dataMaxValue.toLowerCase() == "now")) {
						    maxTimestamp = (new Date()).getTime();
					    }
					    if (isNotBlank($(this).val())) {
						    errorMsg = $(this).attr("data-max-value-error-message");
						    if (isBlank(errorMsg)) {
							    errorMsg = "Maximum allowed date is " + $(this).attr("data-max-value") + ".";
						    }

						    if (maxTimestamp < Date.parse($(this).val())) {
							    $(this).addValidationError(errorMsg);
							    return;
						    } else {
							    $(this).removeValidationError();
						    }
					    } else {
						    $(this).removeValidationError();
					    }
				    }

				    /* Min Value Validation */
				    var dataMinValue = $(this).attr("data-min-value");
				    if (isNotBlank(dataMinValue)) {
					    if (isNaN(Date.parse(dataMinValue)) && dataMinValue.toLowerCase() != "today" && dataMinValue.toLowerCase() != "now") {
						    return;
					    }

					    var minTimestamp = Date.parse(dataMinValue);
					    if (isNaN(minTimestamp) && (dataMinValue.toLowerCase() == "today" || dataMinValue.toLowerCase() == "now")) {
						    minTimestamp = (new Date()).getTime();
					    }
					    if (isNotBlank($(this).val())) {
						    errorMsg = $(this).attr("data-min-value-error-message");
						    if (isBlank(errorMsg)) {
							    errorMsg = "Minimum allowed date is " + $(this).attr("data-min-value") + ".";
						    }

						    if (minTimestamp < Date.parse($(this).val())) {
							    $(this).addValidationError(errorMsg);
							    return;
						    } else {
							    $(this).removeValidationError();
						    }
					    } else {
						    $(this).removeValidationError();
					    }
				    }
			    }
		    }

		    /* Max Length Validation */
		    if (isNotBlank($(this).attr("data-max-length"))) {
			    if (isNotBlank($(this).val()) && Number($(this).attr("data-max-length")) > 0) {
				    errorMsg = $(this).attr("data-max-length-error-message");
				    if (isBlank(errorMsg)) {
					    errorMsg = "Maximum allowed characters are " + $(this).attr("data-max-length") + ".";
				    }

				    if (Number($(this).attr("data-max-length")) < $(this).val().length) {
					    $(this).addValidationError(errorMsg);
					    return;
				    }
			    } else {
				    $(this).removeValidationError();
			    }
		    }

		    /* Min Length Validation */
		    if (isNotBlank($(this).attr("data-min-length"))) {
			    if (isNotBlank($(this).val()) && Number($(this).attr("data-min-length")) > 0) {
				    errorMsg = $(this).attr("data-min-length-error-message");
				    if (isBlank(errorMsg)) {
					    errorMsg = "Minimum required characters are " + $(this).attr("data-min-length") + ".";
				    }

				    if (Number($(this).attr("data-min-length")) > $(this).val().length) {
					    $(this).addValidationError(errorMsg);
					    return;
				    }
			    } else {
				    $(this).removeValidationError();
			    }
		    }

		    /* Data Required Check */
		    if ($(this).attr("data-required") != null) {
			    var errorMsg = $(this).attr("data-required-error-message");
			    if (isBlank(errorMsg)) {
				    errorMsg = "This is a required field.";
			    }
			    if (isBlank($(this).val())) {
				    $(this).addValidationError(errorMsg);
				    return;
			    } else {
				    $(this).removeValidationError();
			    }
		    }

		    /* Business Validation Check */
		    if ($(this).attr("business-check") != null) {
			    var errorMsg = $(this).attr("business-check-error-message");
			    if (isBlank(errorMsg)) {
				    errorMsg = "Business validation check failed.";
			    }
			    var validateFunction = $(this).attr("business-check-function");
			    if (isNotBlank(validateFunction)) {
				    var validData = callValidateFunction(validateFunction);
				    if (!validData) {
					    $(this).addValidationError(errorMsg);
					    return;
				    } else {
					    $(this).removeValidationError();
				    }
			    }
		    }
	    } else if ($(this).is("textarea")) {
		    /* Data Required Check */
		    if ($(this).attr("data-required") != null) {
			    var errorMsg = $(this).attr("data-required-error-message");
			    if (isBlank(errorMsg)) {
				    errorMsg = "This is a required field.";
			    }
			    if (isBlank($(this).val())) {
				    $(this).addValidationError(errorMsg);
				    return;
			    } else {
				    $(this).removeValidationError();
			    }
		    }

		    /* Business Validation Check */
		    if ($(this).attr("business-check") != null) {
			    var errorMsg = $(this).attr("business-check-error-message");
			    if (isBlank(errorMsg)) {
				    errorMsg = "Business validation check failed.";
			    }
			    var validateFunction = $(this).attr("business-check-function");
			    if (isNotBlank(validateFunction)) {
				    var validData = callValidateFunction(validateFunction);
				    if (!validData) {
					    $(this).addValidationError(errorMsg);
					    return;
				    } else {
					    $(this).removeValidationError();
				    }
			    }
		    }
	    } else if ($(this).is("input[type=radio]")) {
		    /* Business Validation Check */
		    if ($(this).attr("business-check") != null) {
			    var errorMsg = $(this).attr("business-check-error-message");
			    if (isBlank(errorMsg)) {
				    errorMsg = "Business validation check failed.";
			    }
			    var validateFunction = $(this).attr("business-check-function");
			    if (isNotBlank(validateFunction)) {
				    var validData = callValidateFunction(validateFunction);
				    if (!validData) {
					    if ($(this).parent().is('label') && $(this).parent().hasClass('wrappedLabel')) {
						    $(this).parent().addValidationError(errorMsg);
					    } else {
						    $(this).addValidationError(errorMsg);
					    }
					    return;
				    } else {
					    if ($(this).parent().is('label') && $(this).parent().hasClass('wrappedLabel')) {
						    $(this).parent().removeValidationError();
					    } else {
						    $(this).removeValidationError();
					    }
				    }
			    }
		    }

		    if ($(this).attr("data-required") != null) {
			    var errorMsg = $(this).attr("data-required-error-message");
			    if (isBlank(errorMsg)) {
				    errorMsg = "This is a required field.";
			    }
			    var isValid = false;
			    var radioName = $(this).prop("name");
			    $("input[name=" + radioName + "]").each(function() {
				    isValid = $(this).is(":checked");
				    return !$(this).is(":checked");
			    });
			    if (!isValid) {
				    $("input[name=" + radioName + "]").each(function() {
					    if ($(this).parent().is('label') && $(this).parent().hasClass('wrappedLabel')) {
						    $(this).parent().addValidationError(errorMsg);
					    } else {
						    $(this).addValidationError(errorMsg);
					    }
					    return;
				    });
			    } else {
				    $("input[name=" + radioName + "]").each(function() {
					    if ($(this).parent().is('label') && $(this).parent().hasClass('wrappedLabel')) {
						    $(this).parent().removeValidationError();
					    } else {
						    $(this).removeValidationError();
					    }
				    });
			    }
		    }
	    } else if ($(this).is("input[type=checkbox]")) {
		    /* Business Validation Check */
		    if ($(this).attr("business-check") != null) {
			    var errorMsg = $(this).attr("business-check-error-message");
			    if (isBlank(errorMsg)) {
				    errorMsg = "Business validation check failed.";
			    }
			    var validateFunction = $(this).attr("business-check-function");
			    if (isNotBlank(validateFunction)) {
				    var validData = callValidateFunction(validateFunction);
				    if (!validData) {
					    if ($(this).parent().is('label') && $(this).parent().hasClass('wrappedLabel')) {
						    $(this).parent().addValidationError(errorMsg);
					    } else {
						    $(this).addValidationError(errorMsg);
					    }
					    return;
				    } else {
					    if ($(this).parent().is('label') && $(this).parent().hasClass('wrappedLabel')) {
						    $(this).parent().removeValidationError();
					    } else {
						    $(this).removeValidationError();
					    }
				    }
			    }
		    }
	    } else if ($(this).is("select")) {
		    /* Data Required Check */
		    if ($(this).attr("data-required") != null) {
			    var errorMsg = $(this).attr("data-required-error-message");
			    if (isBlank(errorMsg)) {
				    errorMsg = "This is a required field.";
			    }
			    var selectedTextOrValue = isBlank(getSelectedTextForSelectOption(this)) && isBlank(getSelectedValueForSelectOption(this));
			    if (selectedTextOrValue || $(this).prop("selectedIndex") < 1) {
				    $(this).addValidationError(errorMsg);
				    return;
			    } else {
				    $(this).removeValidationError();
			    }
		    }

		    /* Business Validation Check */
		    if ($(this).attr("business-check") != null) {
			    var errorMsg = $(this).attr("business-check-error-message");
			    if (isBlank(errorMsg)) {
				    errorMsg = "Business validation check failed.";
			    }
			    var validateFunction = $(this).attr("business-check-function");
			    if (isNotBlank(validateFunction)) {
				    var validData = callValidateFunction(validateFunction);
				    if (!validData) {
					    $(this).addValidationError(errorMsg);
					    return;
				    } else {
					    $(this).removeValidationError();
				    }
			    }
		    }
	    }
    },
    /**
	 * JQuery extension function to put the focus to a specific cursor position
	 * 
	 * @param position - position of cursor to be moved to inside an input/textarea
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
	    if (invalidClass != null) {
		    $(this).addClass(invalidClass);
	    }

	    if (clearInvalidValue == true) {
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
	    var errorWarningTipClass = 'errorEntryTip', errorWarningClass = 'errorEntry';
	    if (errorOrWarning == "warning") {
		    errorWarningTipClass = "warningEntryTip";
		    errorWarningClass = "warningEntry";
		    blockTabOut = false;
	    }
	    $(this).attr('title', "").tooltip({
	        content : errorMessage,
	        tooltipClass : errorWarningTipClass,
	        position : {
	            my : "left+5  center",
	            at : "right center"
	        }
	    }).addClass(errorWarningClass);

	    if (blockTabOut != "false") {
		    $(this).focusEnd();
	    }
	    $(this).attr("current-error", errorMessage);
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
	    $(this).removeAttr('oldTitle');
	    $(this).removeAttr("current-error");
    }
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

function validateNumeric(evt, value) {
	var event = evt || window.event;
	var eKeyCode = event.keyCode || event.which, eCharCode = event.charCode || eKeyCode;
	if (eKeyCode == 8 || eKeyCode == 99 || eKeyCode == 118 || eKeyCode == 120) {
		return true;
	}
	if (eCharCode == 46 && (eKeyCode == 0 || eKeyCode == 46) && value.indexOf(".") != -1) {
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
	if (eKeyCode == 8 || eKeyCode == 39) {
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
	if (eKeyCode == 8 || eKeyCode == 39) {
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

function validateEmail(email) {
	var tempArray = email.split("@");
	if (tempArray.length && tempArray.length != 2) {
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
	if (tempArr.length && tempArr.length != 2) {
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
 * @param message - Message to be alerted
 * @param okButtonLabel - OK Button label
 * @param okButtonFunction - OK Button function to be invoked after click
 * @param messageType - Info, Warning Or Error - not case sensitive
 * @param title - Title of the message dialogue box
 * @param modalview - Modal view will block background clicks
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
				dialogueHtml = "<div title='" + title + "'><img src='assets/images/icon_information.gif' width='11px;' height='11px;'/>&nbsp;" + message
				        + "</div>";
			}
			if (messageType.toLowerCase() == "warning") {
				dialogueHtml = "<div title='" + title + "'><img src='assets/images/icon_warning.gif' width='11px;' height='11px;' />&nbsp;" + message
				        + "</div>";
			}
			if (messageType.toLowerCase() == "error") {
				dialogueHtml = "<div title='" + title + "'><img src='assets/images/icon_error.gif' width='11px;' height='11px;' />&nbsp;" + message + "</div>";
			}
		}
		try {
			$(dialogueHtml).dialog({
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
 * @param message - Message to be alerted
 * @param yesButtonFunction - OK Button label
 * @param noButtonFunction - OK Button function to be invoked after click
 * @param yesButtonLabel - OK Button label
 * @param noButtonLabel - OK Button function to be invoked after click
 * @param title - Title of the message dialogue box
 * @param modalview - Modal view will block background clicks
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
			$("<div title='" + title + "'>" + message + "</div>").dialog({
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