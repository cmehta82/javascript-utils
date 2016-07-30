var autoCompleteMap = {};
var currentPageModeReadOnly = true;

$(function() {
	$.extend($.expr[':'], {
		'icontains' : function(elem, i, match, array) {
			return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
		}
	});

	/* $(function) - start - for autoComplete */
	jQuery.fn.extend({
		lookupAutoComplete : function(validationTernaryKey, warningError, callSearchAutoCompleteAfterCreation) {
			var sourcearraymap = autoCompleteMap[validationTernaryKey];
			if (isBlank(warningError)) {
				warningError = "error";
			}
			$(this).autocomplete({
			    source : sourcearraymap,
			    minLength : 0,
			    delay : 0,
			    open : function(event, ui) {
				    var selector = $(this);
				    if ((selector.attr("readonly") != null) || (selector.attr("disabled") != null)) {
					    selector.autocomplete("close");
					    return;
				    }
				    var restrictedOption = selector.attr("restricted-option");
				    $("a").each(function() {
					    var lselector = $(this);
					    if (isNotBlank(restrictedOption) && lselector.html() === restrictedOption) {
						    lselector.attr("disabled", "disabled");
						    lselector.parent().attr("disabled", "disabled");
					    } else {
						    lselector.removeAttr("disabled");
						    lselector.parent().removeAttr("disabled");
					    }
					    if (lselector.html().endsWith("*") == true) {
						    lselector.css("color", "#990000");
					    }
				    });
				    if (selector.attr("data-required") != null) {
					    $(".ui-autocomplete").css("background-image", "none").css("background-color", "#D6F3FF");
				    } else {
					    $(".ui-autocomplete").css("background-image", "").css("background-color", "");
				    }
			    },
			    response : function(event, ui) {
				    $("a").each(function() {
					    var selector = $(this);
					    if (selector.html().endsWith("*") == true) {
						    selector.css("color", "#990000");
					    }
				    });
			    },
			    select : function(event, ui) {
				    $(this).trigger("change").autocomplete("close");
			    }
			}).focus(function() {
				var selector = $(this);
				if ((selector.attr('readonly') == null) && (selector.attr('disabled') == null) && isBlank(selector.val())) {
					selector.autocomplete("search", selector.val());
				}
			}).blurOrChange(function() {
				var selector = $(this);
				var validationMessage = getMessageFromJson("generic-messages", "valid-selection-message", validationTernaryKey);
				if (isBlank(validationMessage)) {
					validationMessage = $(this).attr("validation-message");
				}
				if (($.trim(selector.val()) != '') && (selector.attr('readonly') == null)) {
					var validInputValue = false;
					if(isNotBlank(selector.attr("restricted-option")) && (selector.val() == selector.attr("restricted-option"))) {
						validInputValue = false;
					} else {
						for ( var i = 0; i < sourcearraymap.length; i++) {
							if (selector.val().toLowerCase() == sourcearraymap[i].value.toLowerCase()) {
								validInputValue = true;
								break;
							}
						}
					}

					if (validInputValue == false) {
						selector.addValidationError(validationMessage, warningError).attr("valid-selection-message", "true");
					} else {
						var currentError = selector.attr("current-error");
						if (currentError == validationMessage) {
							selector.removeValidationError();
						}
					}
				} else {
					var currentError = selector.attr("current-error");
					if (currentError == validationMessage) {
						selector.removeValidationError();
					}
				}
			}).addClass('ui-autocomplete-input').attr('auto-complete-created', 'true');

			if (callSearchAutoCompleteAfterCreation && (callSearchAutoCompleteAfterCreation == true)) {
				$(this).autocomplete("search", $(this).val());
			}
			return this;
		}
	});

	$('.countryInput').each(function(sourceData) {
		$(this).focus(function() {
			var selector = $(this);
			if (isBlank(selector.attr("auto-complete-created"))) {
				if (isNull(autoCompleteMap["country"])) {
					loadJson(this, 'service/referenceValues/countries.json', true, "country", "error", true);
				} else {
					callCountryAutoComplete(this);
				}
			}
		}).blurOrChange(function() {
			countryStateProvinceHandler(this);
		}).val("United States");
		$(this).addClass('ui-autocomplete-input');
	});

	$('.highRiskCountryInput').each(function(sourceData) {
		$(this).focus(function() {
			var selector = $(this);
			if (isBlank(selector.attr("auto-complete-created"))) {
				if (isNull(autoCompleteMap["high-risk-country"])) {
					loadJson(this, 'data/highRiskCountries.json', true, "high-risk-country", "error", true);
				} else {
					callCountryAutoComplete(this);
				}
			}
		}).val("United States");
		$(this).addClass('ui-autocomplete-input');
	});

	$('.stateInput').each(function(sourceData) {
		$(this).focus(function() {
			var selector = $(this);
			if (isBlank(selector.attr("auto-complete-created"))) {
				if (isNull(autoCompleteMap["state"])) {
					loadJson(this, 'service/referenceValues/states.json', true, "state", "error", true);
				} else {
					callStateAutoComplete(this);
				}
			}
		});
		$(this).addClass('ui-autocomplete-input');
	});

	$('.salutationACInput').each(function(sourceData) {
		$(this).focus(function() {
			var selector = $(this);
			if (isBlank(selector.attr("auto-complete-created"))) {
				if (isNull(autoCompleteMap["salutation"])) {
					loadJson(this, 'data/salutation.json', true, "salutation", "error", true);
				} else {
					callStateAutoComplete(this);
				}
			}
		});
		$(this).addClass('ui-autocomplete-input');
	});

	/* $(function) - end - for autoComplete */
	/* $(function) - start - for lookup search */
	$(".searchLookup").button({
		icons : {
			primary : "ui-icon-search"
		}
	}).click(function() {
		onClickOfLookupSearch(this);
	});
	/* $(function) - end - for lookup search */
	/* $(function) - start - for address verification */
	$(".usPostalAddress").each(function() {
		loadCountryJsonOnDemand();
		bindVerificationEvents(this);
	});

	$(".usPostalAddress").click(function() {
		resetValidations(this);
		isSkipVerification = isSkipAddressVerification(this);
		if (!isSkipVerification) {
			isVerified = isAddressVerified(this);
			if (!isVerified) {
				verfiyAddress(this);
			}
		}
	});
	/* $(function) - end - for address verification */
	/* $(function) - start - for tax id type */
	$(".taxIdTypeInput").each(function() {
		addTaxIdBehavior(this);
	});
	/* $(function) - end - for tax id type */

	$("input,textarea").keydown(function(evt) {
		var event = evt || window.event;
		var eKeyCode = event.keyCode || event.which;
		if ((eKeyCode == 38) || (eKeyCode == 40)) {
			event.returnValue = false;
			if (event.preventDefault) {
				event.preventDefault();
			}
			return false;
		}
	});
});

function loadJson(selector, jsonUrl, createAutoCompleteOnDone, validationTernaryKey, warningError, callSearchAutoCompleteAfterCreation, callbackFunction) {
	if (isNull(autoCompleteMap[validationTernaryKey])) {
		'use strict';
		$.ajax({
		    url : jsonUrl,
		    dataType : 'json',
		    beforeSend : function() {
			    $(selector).removeClass("ui-autocomplete-input").addClass("load-spinner");
		    }
		}).done(function(sourceData) {
			if (sourceData.referenceTypeList != null) {
				autoCompleteMap[validationTernaryKey] = sourceData.referenceTypeList;
			} else {
				autoCompleteMap[validationTernaryKey] = $.map(sourceData, function(value, key) {
					return {
					    value : value,
					    data : key
					};
				});
			}
			if (selector && (selector != null) && createAutoCompleteOnDone && (createAutoCompleteOnDone == true) && isNotBlank(validationTernaryKey)) {
				callAutoComplete(selector, jsonUrl, validationTernaryKey, warningError, callSearchAutoCompleteAfterCreation);
			}

			if (isNotNull(callbackFunction)) {
				if (typeof callbackFunction === "function") {
					try {
						callbackFunction(autoCompleteMap[validationTernaryKey]);
					} catch (error) {
						if ('console' in window) {
							console.log('Unable to set value for label - [' + labelId + ']');
						}
					}
				}
			}
			$(selector).removeClass("load-spinner").addClass("ui-autocomplete-input");
		}).fail(function() {
			$(selector).removeClass("load-spinner").addClass("ui-autocomplete-input");
		});
	}
}

function callAutoComplete(selector, jsonUrl, validationTernaryKey, warningError, callSearchAutoCompleteAfterCreation) {
	if ($(selector).attr('auto-complete-created') != 'true') {
		if (isNull(autoCompleteMap[validationTernaryKey])) {
			loadJson(selector, jsonUrl, true, validationTernaryKey);
			return;
		}
		$(selector).lookupAutoComplete(validationTernaryKey, warningError, callSearchAutoCompleteAfterCreation);
	}
}

function getAutoCompleteCode(autoCompleteName, validationTernaryKey) {
	if (isBlank(autoCompleteName)) {
		return "";
	}

	var sourcearraymap = autoCompleteMap[validationTernaryKey];
	if ((sourcearraymap != null) && (sourcearraymap.length > 0)) {
		for ( var i = 0; i < sourcearraymap.length; i++) {
			if (sourcearraymap[i].value.toLowerCase() == autoCompleteName.toLowerCase()) {
				return sourcearraymap[i].data.toUpperCase();
			}
		}
	}
	return "";
}

function getAutoCompleteName(autoCompleteCode, jsonUrl, validationTernaryKey) {
	if (isBlank(autoCompleteCode)) {
		return "";
	}

	loadJson(null, jsonUrl, false, validationTernaryKey);

	var sourcearraymap = autoCompleteMap[validationTernaryKey];
	if ((sourcearraymap != null) && (sourcearraymap.length > 0)) {
		for ( var i = 0; i < sourcearraymap.length; i++) {
			if (sourcearraymap[i].data.toLowerCase() == autoCompleteCode.toLowerCase()) {
				return sourcearraymap[i].value.toUpperCase();
			}
		}
	}
	return "";
}

function loadCountryJsonOnDemand(callbackFunction) {
	if (isNull(autoCompleteMap["country"])) {
		loadJson(null, 'service/referenceValues/countries.json', false, "country", null, null, callbackFunction);
	}
}

function getCountryCode(countryName) {
	return getAutoCompleteCode(countryName, "country");
}

function getCountryName(countryCode) {
	return getAutoCompleteName(countryCode, 'service/referenceValues/countries.json', "country");
}

function callCountryAutoComplete(selector) {
	callAutoComplete(selector, 'service/referenceValues/countries.json', "country", "error", true);
}

function loadHighRiskCountryJsonOnDemand(callbackFunction) {
	if (isNull(autoCompleteMap["high-risk-country"])) {
		loadJson(null, 'data/highRiskCountries.json', false, "high-risk-country", null, null, callbackFunction);
	}
}

function getHighRiskCountryCode(highRiskCountryName) {
	return getAutoCompleteCode(highRiskCountryName, "high-risk-country");
}

function getHighRiskCountryName(highRiskCountryCode) {
	return getAutoCompleteName(highRiskCountryCode, 'data/highRiskCountries.json', "high-risk-country");
}

function callHighRiskCountryAutoComplete(selector) {
	callAutoComplete(selector, 'data/highRiskCountries.json', "high-risk-country", "error", true);
}

function loadStateJsonOnDemand(callbackFunction) {
	if (isNull(autoCompleteMap["state"])) {
		loadJson(null, 'service/referenceValues/states.json', false, "state", null, null, callbackFunction);
	}
}

function getStateCode(stateName, forCountry) {
	if (isNotBlank(forCountry)) {
		return getAutoCompleteCode(stateName, "statesFor" + forCountry);
	}
	return getAutoCompleteCode(stateName, "state");
}

function getStateName(stateCode) {
	return getAutoCompleteName(stateCode, 'service/referenceValues/states.json', "state");
}

function callStateAutoComplete(selector) {
	var boundCountry = selector.attr("bound-country-id");
	if (boundCountry != null) {
		var boundCountryCode = getCountryCode($("#" + boundCountry).val());
		if (isBlank(boundCountryCode)) {
			boundCountryCode = "US";
		}
		if (selector.attr("auto-complete-created") == null) {
			callAutoComplete(selector, "service/referenceValues/states.json/" + boundCountryCode, "statesFor" + boundCountryCode, "error", false);
			selector.attr("loaded-data-for-country-code", boundCountryCode);
		}
	} else {
		callAutoComplete(selector, 'service/referenceValues/states.json', "state", "error", true);
	}
}
function loadDocEvidenceEntityJsonOnDemand() {
	if (isNull(autoCompleteMap["doc-evidence-entity"])) {
		loadJson(null, 'data/docEvidenceEntities.json', false, "doc-evidence-entity", null, null, callbackFunction);
	}
}

function getDocEvidenceEntityCode(docEvidenceEntityName) {
	return getAutoCompleteCode(docEvidenceEntityName, "doc-evidence-entity");
}

function callDocEvidenceEntityAutoComplete(selector) {
	callAutoComplete(selector, 'data/docEvidenceEntities.json', "doc-evidence-entity", "error", true);
}

function getDocEvidenceTrustCode(docEvidenceTrustName) {
	return getAutoCompleteCode(docEvidenceTrustName, "doc-evidence-trust");
}

function callDocEvidenceTrustAutoComplete(selector) {
	callAutoComplete(selector, 'data/docEvidenceEntities.json', "doc-evidence-trust", "error", true);
}
/* content of lookup search - start */

var searchNextPageStart = "001", searchTotalRowCount = 0;

var searchLookupDialogue = null;
/* $(function is moved up and merged in single $(function) */
var lookupSearchCallback;
function onClickOfLookupSearch(selector) {
	lookupSearchCallback = $(selector).attr("callbackfunction");
	var searchLookupHtml = "<div class='searchLookupDialog' title='Individual Or Non Individual Search'> <span class='validateTips'></span> <div style='width: 100%; margin: auto; vertical-align: middle;'> <label class='mandateInputLbl' style='display: inline;'>Contact : </label> <label class='wrappedLabel'> <input type='radio' style='display: inline;' id='lookupIndividualSearchRadio' name='lookupContactSearchRadio' checked='checked' /> Individual </label> <label class='wrappedLabel'> <input type='radio' style='display: inline;' id='lookupNonIndividualSearchRadio' name='lookupContactSearchRadio' /> Non Individual </label> <div id='lookupSearchErrorMessages' style='color: red; float: right; display: none;'></div> <div id='lookupSearchLoader' style='float: right; display: none;'><img src='assets/images/loading-small.gif' width='20px' height='20px' alt='Loading Data...' />Searching Data, Please wait...</div></div> <hr> <table style='width: 100%;'> <tr> <td> <label for='lookupFirstNameOrNameOneInput' id='lookupFirstNameOrNameOneLbl' class='mandateInputLbl'>First Name</label> </td> <td> <label for='lookupLastNameOrNameTwoInput' id='lookupLastNameOrNameTwoLbl' class='mandateInputLbl'>Last Name</label> </td> <td> <label for='lookupStateInput' id='lookupStateLbl'>State</label> </td> <td> <label for='lookupCityInput' id='lookupCityLbl'>City</label> </td> <td></td> <td> <label for='lookupEciTaxIdInput' id='lookupEciTaxIdLbl' class='mandateInputLbl'>ECI or SSN/TIN : #</label> </td> <td></td> </tr> <tr> <td> <input style='width: 80%;' type='text' name='lookupFirstNameOrNameOneInput' id='lookupFirstNameOrNameOneInput' class='text ui-widget-content ui-corner-all' data-required /> </td> <td> <input style='width: 80%;' type='text' name='lookupLastNameOrNameTwoInput' id='lookupLastNameOrNameTwoInput' class='text ui-widget-content ui-corner-all' data-required /> </td> <td> <input style='width: 80%;' type='text' name='lookupStateInput' id='lookupStateInput' class='text stateInput ui-widget-content ui-corner-all' /> </td> <td> <input style='width: 80%;' type='text' name='lookupCityInput' id='lookupCityInput' class='text ui-widget-content ui-corner-all' /> </td> <td> <h3>OR&nbsp;</h3> </td> <td> <input style='width: 80%;' type='text' name='lookupEciTaxIdInput' id='lookupEciTaxIdInput' class='text ui-widget-content ui-corner-all' data-required/> </td> <td valign='middle'> <div style='float: right; padding-right: 8%;'> <button id='searchLookupDialogSearchButton'>&nbsp;&nbsp;Search</button> </div> </td> </tr> <tr> <td colspan='5'>Providing state and city will help narrow the search of JPMC clients.</td> <td colspan='2'> <label class='wrappedLabel'> <input type='radio' data-required style='display: inline;' name='lookupEciOrTaxIdRadio' id='lookupEciOrTaxIdEciRadio'> ECI </label> <label class='wrappedLabel'> <input type='radio' data-required style='display: inline;' name='lookupEciOrTaxIdRadio' id='lookupEciOrTaxIdTaxIdRadio'> SSN/TIN </label> </td> </tr> </table> <div id='lookupSearchGridWrapper'></div> <div id='lookupSearchButtonSet' style='display: none; width: 100%;'><div style='float: right; padding-right: 5%;'><button id='lookupSearchSelectRecordButton' style=' padding-right: 10px;'>Select</button><button id='lookupSearchFetchNext10RecordButton'>Next </button></div></div></div>";
	searchLookupDialogue = $(searchLookupHtml).dialog({
	    minWidth : 400,
	    width : 650,
	    modal : true,
	    buttons : [ {
	        text : "Close",
	        click : function() {
		        $(this).dialog("close");
	        }
	    } ],
	    close : function(event, ui) {
		    $(this).remove();
		    $(".ui-dialog-buttonset").css("float", "");
	    }
	});

	if (typeof callStateAutoComplete === "function") {
		$("#lookupStateInput").focus(function() {
			callStateAutoComplete(this);
		});
	}

	searchLookupDialogue.find("input[type=text]").each(function() {
		$(this).keyup(function() {
			if (isNotBlank($(this).val())) {
				$(this).val($(this).val().toUpperCase());
			}
		});
	});

	searchLookupDialogue.find("#searchLookupDialogSearchButton").button({
		icons : {
			primary : "ui-icon-search"
		}
	}).click(function() {
		searchNextPageStart = "001";
		$("#lookupSearchFetchNext10RecordButton").button("enable");
		$("#lookupSearchErrorMessages").empty().hide("slow");
		executeLookupSearch();
	});

	$("#lookupSearchSelectRecordButton").button({
		icons : {
			primary : "ui-icon-circle-check"
		}
	}).click(function() {
		var selectedJsonString = $(".lookup_row_selected").attr("json-string");
		if (isBlank(selectedJsonString)) {
			alertMessage("There is no selected row. Please select a row", null, null, "error", "Select Record Error", true);
		} else {
			if (lookupSearchCallback && isNotBlank(lookupSearchCallback) && typeof window[lookupSearchCallback] === "function") {
				var fn = window[lookupSearchCallback];
				var args = [];
				args[0] = JSON.parse(selectedJsonString);
				fn.apply(window, args);
				$(searchLookupDialogue).dialog("close");
			} else {
				alertMessage(selectedJsonString, null, null, null, "Select JSON String", true);
			}
		}
	});

	$("#lookupSearchFetchNext10RecordButton").button({
		icons : {
			secondary : "ui-icon-circle-arrow-e"
		}
	}).click(function() {
		executeLookupSearch();
	});

	$("#lookupFirstNameOrNameOneInput").keypress(function() {
		resetTaxIdInput();
	}).blurOrChange(function() {
		if (isNotBlank($(this).val())) {
			$(this).removeValidationError();
		}
	});
	$("#lookupLastNameOrNameTwoInput").keypress(function() {
		resetTaxIdInput();
	}).blurOrChange(function() {
		if (isNotBlank($(this).val())) {
			$(this).removeValidationError();
		}
	});
	$("#lookupEciTaxIdInput").keypress(function() {
		resetNameOneAndNameTwo();
	}).blurOrChange(function() {
		if (isNotBlank($(this).val())) {
			$(this).removeValidationError();
		}
	});
	$("#lookupEciOrTaxIdEciRadio").click(function() {
		resetNameOneAndNameTwo();
		$("#lookupEciOrTaxIdEciRadio").isValidComponent();
		$("#lookupEciOrTaxIdTaxIdRadio").isValidComponent();
	});
	$("#lookupEciOrTaxIdTaxIdRadio").click(function() {
		resetNameOneAndNameTwo();
		$("#lookupEciOrTaxIdEciRadio").isValidComponent();
		$("#lookupEciOrTaxIdTaxIdRadio").isValidComponent();
	});

	$(".ui-dialog-buttonset").css("cssText", "float: right;");
}

function validateTaxIdInput() {
	$("#lookupEciTaxIdInput").isValidComponent();
	$("#lookupEciOrTaxIdEciRadio").isValidComponent();
	$("#lookupEciOrTaxIdTaxIdRadio").isValidComponent();
	$("#lookupFirstNameOrNameOneInput").removeValidationError();
	$("#lookupLastNameOrNameTwoInput").removeValidationError();
}

function validateNameOneAndNameTwo() {
	$("#lookupEciTaxIdInput").removeValidationError();
	$("#lookupEciOrTaxIdEciRadio").removeValidationError();
	$("#lookupEciOrTaxIdTaxIdRadio").removeValidationError();
	$("#lookupFirstNameOrNameOneInput").isValidComponent();
	$("#lookupLastNameOrNameTwoInput").isValidComponent();
}

function resetNameOneAndNameTwo() {
	$("#lookupFirstNameOrNameOneInput").val("").removeValidationError();
	$("#lookupLastNameOrNameTwoInput").val("").removeValidationError();
	$("#lookupStateInput").val("");
	$("#lookupCityInput").val("");
}

function resetTaxIdInput() {
	$("#lookupEciTaxIdInput").val("").removeValidationError();
	$("#lookupEciOrTaxIdEciRadio").removeAttr("checked").removeAttr("value");
	$("#lookupEciOrTaxIdTaxIdRadio").removeAttr("checked").removeAttr("value");
}

function getNotNullValue(str, seperator) {
	if (isBlank(str)) {
		return "";
	}
	return str;
}

function executeLookupSearch() {
	var baseUrl = "service/searchClient/";
	if ((isNotBlank($("#lookupEciTaxIdInput").val())) || ($("#lookupEciOrTaxIdEciRadio").is(":checked") || $("#lookupEciOrTaxIdTaxIdRadio").is(":checked"))) {
		validateTaxIdInput();
	} else {
		validateNameOneAndNameTwo();
	}
	if (searchLookupDialogue.find("." + invalidClass).length > 0) {
		alertMessage("Please provide required fields.", null, null, "error", "Search Dialogue Error", true);
		return;
	}
	if ($("#lookupEciOrTaxIdEciRadio").is(":checked")) {
		baseUrl += "eciCode/" + $("#lookupEciTaxIdInput").val();
	} else if ($("#lookupEciOrTaxIdTaxIdRadio").is(":checked")) {
		baseUrl += "taxId/" + $("#lookupEciTaxIdInput").val();
	} else {
		// /postCode/{postCodeParam}/pageStart/{pageStartParam}")
		baseUrl += "individualOrNonIndividual/";
		if ($("#lookupIndividualSearchRadio").is(":checked")) {
			baseUrl += "i/nameOne/";
		} else {
			baseUrl += "n/nameOne/";
		}
		baseUrl += isNotBlank($("#lookupFirstNameOrNameOneInput").val()) ? $("#lookupFirstNameOrNameOneInput").val() : "-";
		baseUrl += "/nameTwo/";
		baseUrl += isNotBlank($("#lookupLastNameOrNameTwoInput").val()) ? $("#lookupLastNameOrNameTwoInput").val() : "-";
		baseUrl += "/city/";
		baseUrl += isNotBlank($("#lookupCityInput").val()) ? $("#lookupCityInput").val() : "-";
		baseUrl += "/state/";

		var stateCode = "";
		if (typeof getStateCode === "function") {
			stateCode = getStateCode($("#lookupStateInput").val());
		}

		baseUrl += isNotBlank(stateCode) ? stateCode : "-";
		baseUrl += "/postCode/-/pageStart/" + searchNextPageStart;
	}

	$.ajax({
	    url : baseUrl,
	    dataType : 'json',
	    beforeSend : function() {
		    $("#lookupSearchLoader").show();
	    }
	}).done(function(sourceData) {
		$("#lookupSearchLoader").hide();
		lookupSuccessData(sourceData);
	}).error(function(jqXHR, textStatus, errorThrown) {
		$("#lookupSearchLoader").hide();
		alertMessage(errorThrown, null, null, "error", "Search Dialogue Error", true);
	});
}

function lookupSuccessData(sourceData) {
	searchNextPageStart = sourceData.nextPageStart;
	searchTotalRowCount = sourceData.totalNumberOfRecords;

	if ((sourceData.errorString != null) && sourceData.errorString.contains("NOT FOUND")) {
		$("#lookupSearchErrorMessages").html("No record found for the given search criteria, refine your search criteria and try again.").show("slow");
	} else if ((sourceData.errorString != null) && sourceData.errorString.contains("EXCEED")) {
		$("#lookupSearchErrorMessages").html("More than 100 records found for the given search criteria, please provide additional search criteria and try again.").show("slow");
	}
	searchLookupDialogue.dialog("option", "width", 1000);
	$("#lookupSearchGridWrapper").empty();
	var tableHtml = "<table id='lookupSearchGrid'>"
	        + "<thead><tr style='color: #005383;'><td>Name</td><td>Address</td><td>City</td><td>State</td><td>Postal Code</td><td>Country</td><td>ECI</td><td>SSN/TIN</td></tr></thead><tbody>";

	if ((sourceData != null) && (sourceData.clientList != null)) {
		if (sourceData.clientList.length != undefined) {
			for ( var i = 0; i < sourceData.clientList.length; i++) {
				var cl = sourceData.clientList[i];
				tableHtml += "<tr json-string='" + JSON.stringify(cl) + "'>" + "<td>" + getNotNullValue(cl.firstNameOrNameOne) + " " + getNotNullValue(cl.lastNameOrNameTwo) + "</td>" + "<td>"
				        + getNotNullValue(cl.addressLineOne, ", ") + getNotNullValue(cl.addressLineTwo, ", ") + getNotNullValue(cl.addressLineThree, ", ") + "</td>" + "<td>"
				        + getNotNullValue(cl.city) + "</td>" + "<td>" + getNotNullValue(cl.state) + "</td>" + "<td>" + getNotNullValue(cl.postCode) + "</td>" + "<td>" + getNotNullValue(cl.country)
				        + "</td>" + "<td>" + getNotNullValue(cl.eciCode) + "</td>" + "<td>" + getMaskedString(getNotNullValue(cl.taxId), 4) + "</td>" + "</tr>";
			}
		} else {
			var cl = sourceData.clientList;
			tableHtml += "<tr json-string='" + JSON.stringify(cl) + "'>" + "<td>" + getNotNullValue(cl.firstNameOrNameOne) + " " + getNotNullValue(cl.lastNameOrNameTwo) + "</td>" + "<td>"
			        + getNotNullValue(cl.addressLineOne, ", ") + getNotNullValue(cl.addressLineTwo, ", ") + getNotNullValue(cl.addressLineThree, ", ") + "</td>" + "<td>" + getNotNullValue(cl.city)
			        + "</td>" + "<td>" + getNotNullValue(cl.state) + "</td>" + "<td>" + getNotNullValue(cl.postCode) + "</td>" + "<td>" + getNotNullValue(cl.country) + "</td>" + "<td>"
			        + getNotNullValue(cl.eciCode) + "</td>" + "<td>" + getMaskedString(getNotNullValue(cl.taxId), 4) + "</td>" + "</tr>";
		}
	}

	tableHtml += "</tbody>" + "</table>";
	$("#lookupSearchGridWrapper").html(tableHtml);

	$("#lookupSearchGrid").dataTable({
	    "bJQueryUI" : true,
	    "bPaginate" : false
	});

	$("#lookupSearchButtonSet").show();

	if (searchNextPageStart == searchTotalRowCount) {
		$("#lookupSearchFetchNext10RecordButton").button("disable");
	}

	$("#lookupSearchGrid tbody tr").click(function(e) {
		if ($(this).hasClass('lookup_row_selected')) {
			$(this).removeClass('lookup_row_selected');
		} else {
			$('.lookup_row_selected').removeClass('lookup_row_selected');
			$(this).addClass('lookup_row_selected');
		}
	});

	$("#lookupSearchGrid tbody tr").dblclick(function(e) {
		$('.lookup_row_selected').removeClass('lookup_row_selected');
		$(this).addClass('lookup_row_selected');
		$("#lookupSearchSelectRecordButton").trigger("click");
	});
}

/* content of lookup search - end */
/* content of address verficaition - start */

var isVerified = false;
var isSkipVerification = false;
var aLineOneSelector = '';
var aLineTwoSelector = '';
var aCitySelector = '';
var aZipCodeSelector = '';
var aStateSelector = '';
var aCountrySelector = '';
var aSkipValidationsSelector = '';
var aDataFieldIdSelector = '';
var aImageDivIdSelector = '';

/* $(function is moved up and merged in single $(function) */
function bindVerificationEvents(selector) {
	configureSelectors(selector);
	$(aLineOneSelector + " ," + aLineTwoSelector + " ," + aCitySelector + " ," + aZipCodeSelector).on('change', function() {
		setAsUnVerified(selector);
	});

	$(aStateSelector).on("blur", function() {
		var verifiedState = $(selector).attr('verifiedState');
		if ((verifiedState != null) && (verifiedState != undefined)) {
			if (verifiedState != $(this).val()) {
				setAsUnVerified(selector);
			}
		}
	});

	$(aCountrySelector).on("blur", function() {
		if (currentPageModeReadOnly == false) {
			if (!isUSddress(selector)) {
				setAsUnVerified(selector);
				hideVerifyButton(selector);
			} else {
				if (!isSkipAddressVerification(selector)) {
					showVerifyButton(selector);
				}
			}
		}
	});

	$(aSkipValidationsSelector).on('click', function() {
		aSkipValidationsLocal = '#' + $(selector).attr('avSkipVerificationId');
		if ($(aSkipValidationsLocal).is(":checkbox")) {
			if ($(aSkipValidationsLocal).prop('checked') == true) {
				setAsUnVerified(selector);
				hideVerifyButton(selector);
			} else {
				if (isUSddress(selector)) {
					showVerifyButton(selector);
				}
			}
		}
	});

	$(aImageDivIdSelector).on('click', function() {
		aImageDivIdSelectorLocal = getImageDivSelector(selector);
		aErroDivIdSelectorLocal = getErrorDivSelector(selector);
		if ($(aErroDivIdSelectorLocal).hasClass('errorEntry')) {
			alertMessage($(aErroDivIdSelectorLocal).attr('current-error'));
		}
	});
}

function hideVerifyButton(selector) {
	resetValidations(selector);
	resetValidations(getErrorDivSelector(selector));
	$(selector).hide().removeClass('includeInProgress').removeClass('updateModeOnly');
	$(getImageDivSelector(selector)).hide();
	markNoImage(selector);
	setVerificationDataField(selector, "N");
}

function showVerifyButton(selector) {
	$(selector).show().addClass('includeInProgress').addClass('updateModeOnly');
	$(getImageDivSelector(selector)).show();
}

function verfiyAddress(selector) {
	resetValidations(selector);
	resetValidations(getErrorDivSelector(selector));
	loadStateJsonOnDemand();
	var isUsa = isUSddress(selector);
	if (isUsa) {
		configureSelectors(selector);
		var addressInputJson = getAddressInputJson();

		$.ajax({
		    type : "POST",
		    url : 'service/naf/validateAddress',
		    data : JSON.stringify(addressInputJson),
		    contentType : "application/json; charset=utf-8",
		    cache : false,
		    dataType : 'json',
		    beforeSend : function() {
			    $(selector).find("span").addClass("load-spinner");
		    }
		}).done(function(sourceData) {
			if (!isBlank(sourceData.addressInfo.errorStringFromRsi)) {
				var rsiErrAvStr = cosmetizeErrorMessage(sourceData.addressInfo.errorStringFromRsi);
				setErrorOrInfoMessage(rsiErrAvStr, true);
				// alertMessage(rsiErrAvStr, null, null, null, 'Address Verifcation Error', true);
				// $(selector).addValidationError(rsiErrAvStr);
				addValidationErrorOnImageDiv(selector, rsiErrAvStr);
			} else {
				hideCommonErrorInfoArea();
				populateUSPostalAddress(selector, sourceData);
				setAsVerified(selector);
				resetValidations(aLineOneSelector + " ," + aLineTwoSelector + " ," + aCitySelector + " ," + aZipCodeSelector + " ," + aStateSelector + " ," + aCountrySelector);
			}
			$(selector).find("span").removeClass("load-spinner");
		}).fail(function() {
			// alertMessage("Error : Address Verification Call Failed", null, null, null, 'Address Verifcation Error',
			// true);
			var cValidationMessage = getMessageFromJson("addressComponentMessages", "add-verifcation-call-failed");
			setErrorOrInfoMessage(cValidationMessage, true);
			$(selector).find("span").removeClass("load-spinner");
		});
	} else {
		// alertMessage("Only US Address can be verified i.e. Country should be United States", null, null, null,
		// 'Address Verifcation', true);
		var cValidationMessage = getMessageFromJson("addressComponentMessages", "only-usa-can-be-verified");
		setErrorOrInfoMessage(cValidationMessage, false);
	}
}

function addValidationErrorOnImageDiv(selector, rsiErrAvStr) {
	var aErrorDivSelectorLocal = getErrorDivSelector(selector);
	$(aErrorDivSelectorLocal).addValidationError(rsiErrAvStr);
	markUnVerifiedImage(selector);
}

function configureSelectors(selector) {
	resetSelectorsConfiguration();
	aLineOneSelector = '#' + $(selector).attr('addressLineOneId');
	aLineTwoSelector = '#' + $(selector).attr('addressLineTwoId');
	aCitySelector = '#' + $(selector).attr('addressCityId');
	aZipCodeSelector = '#' + $(selector).attr('addressZipCodeId');
	aStateSelector = '#' + $(selector).attr('addressStateCodeId');
	aCountrySelector = '#' + $(selector).attr('addressCountryDescId');
	aDataFieldIdSelector = '#' + $(selector).attr('avDataFieldId');
	aSkipValidationsSelector = '#' + $(selector).attr('avSkipVerificationId');
	aImageDivIdSelector = getImageDivSelector(selector);

	/*
	 * alert(aLineOneSelector + '\t' + aLineTwoSelector + '\t' + aCitySelector + '\t' + aZipCodeSelector + '\t' +
	 * aStateSelector + '\t' + aCountrySelector );
	 */
}

function getAddressInputJson() {
	var inputJson = {}, addressInfo = {};
	addressInfo.addressLineOne = $(aLineOneSelector).val();
	addressInfo.addressLineTwo = $(aLineTwoSelector).val();
	addressInfo.addressLineThree = "";
	addressInfo.cityName = $(aCitySelector).val();
	addressInfo.postalCode = $(aZipCodeSelector).val();
	addressInfo.stateCode = getStateCode($(aStateSelector).val());
	addressInfo.stateName = $(aStateSelector).val();
	addressInfo.countryCode = "US";
	addressInfo.countryName = $(aCountrySelector).val();
	addressInfo.changeSuggested = true;
	addressInfo.errorStringFromRsi = "";
	inputJson.addressInfo = addressInfo;
	// var jsonString = JSON.stringify(inputJson);
	// alert(jsonString);
	return inputJson;
}

function setVerificationDataField(selector, avVerifieddata) {
	var aDataFieldIdSelectorLocal = $(selector).attr('avDataFieldId');
	if ((aDataFieldIdSelectorLocal != null) && (aDataFieldIdSelectorLocal != undefined)) {
		$('#' + aDataFieldIdSelectorLocal).val(avVerifieddata);
	}
}

function setAsVerified(selector) {
	// var verifiedAttr = $(selector).attr('verified');
	$(selector).attr('verified', 'verified');
	$(selector).attr('verifiedState', $(aStateSelector).val());
	setVerificationDataField(selector, "Y");
	markVerifiedImage(selector);
}

function getImageDivSelector(selector) {
	var aImageDivSelector = '#' + $(selector).attr('id') + "ImageDiv";
	return aImageDivSelector;
}

function getErrorDivSelector(selector) {
	var aErrorDivSelector = '#' + $(selector).attr('id') + "ErrorDiv";
	return aErrorDivSelector;
}

function markVerifiedImage(selector) {
	var aImageDivSelectorLocal = getImageDivSelector(selector);
	$(aImageDivSelectorLocal).html("<img src='assets/images/icon_check_big.png' height='15px' width='15px'/>");
}

function markUnVerifiedImage(selector) {
	var aImageDivSelectorLocal = getImageDivSelector(selector);
	$(aImageDivSelectorLocal).html("<img src='assets/images/icon_cancel_big.png' height='15px' width='15px'/>");
}

function markNoImage(selector) {
	var aImageDivSelectorLocal = getImageDivSelector(selector);
	$(aImageDivSelectorLocal).empty();
}

function setAsUnVerified(selector) {
	// var verifiedAttr = $(selector).attr('verified');
	$(selector).removeAttr('verified');
	setVerificationDataField(selector, "N");
	// alert('Unverifing Address : ' + $(selector).attr('id'));

	if ($(selector).hasClass('errorEntry')) {
		markUnVerifiedImage(selector);
	} else {
		markNoImage(selector);
	}
}

function isAddressVerified(selector) {
	// Check if the Address was verified at last save and no modification done
	var aDataFieldIdSelectorLocal = $(selector).attr('avDataFieldId');
	if ((aDataFieldIdSelectorLocal != null) && (aDataFieldIdSelectorLocal != undefined)) {
		var isVerifiedAtLastSave = $('#' + aDataFieldIdSelectorLocal).val();
		// alert ("isVerifiedAtLastSave : " + aDataFieldIdSelectorLocal + " : " + isVerifiedAtLastSave)
		if (isVerifiedAtLastSave.startsWith("Y")) {
			return true;
		}
	}

	// Check inTransaction Modifications
	var verifiedAttr = $(selector).attr('verified');
	if ((verifiedAttr == null) && (verifiedAttr == undefined)) {
		return false;
	}
	return true;
}

function isUSddress(selector) {
	addressCountryDesc = $('#' + $(selector).attr('addressCountryDescId')).val();
	if (isBlank(addressCountryDesc)) {
		return false;
	} else if (getCountryCode(addressCountryDesc) == "US") {
		return true;
	}
	return false;
}

function isSkipAddressVerification(selector) {
	var aSkipVerificationId = $(selector).attr('avSkipVerificationId');
	if ((aSkipVerificationId != null) && (aSkipVerificationId != undefined)) {
		var aSkipVerificationIdSelector = '#' + aSkipVerificationId;
		if ($(aSkipVerificationIdSelector).is(":checkbox")) {
			if ($(aSkipVerificationIdSelector).prop('checked') == true) {
				// alert("Skip Verification : true ");
				return true;
			}
		}
	}
	// alert("Skip Verification : false ");
	return false;
}

function setUsaByDefault(selector) {
	aCountrySelector = '#' + $(selector).attr('addressCountryDescId');
	$(aCountrySelector).val("United States");
	$(aCountrySelector.replace("Input", "") + "Lbl").html("United States");
	showVerifyButton(selector);
	markNoImage(selector);
}

function resetToUsaByDefault(selector) {
	aCountrySelector = '#' + $(selector).attr('addressCountryDescId');
	$(aCountrySelector).val("United States");
	$(aCountrySelector.replace("Input", "") + "Lbl").html("United States");
	markNoImage(selector);
}

function populateUSPostalAddress(selector, sourceData) {
	var stateName = getStateName(sourceData.addressInfo.stateCode);
	populateInputControls(sourceData, stateName);
	populateViewOnlyLabels(sourceData, stateName);
}

function populateViewOnlyLabels(sourceData, stateName) {
	$(aLineOneSelector.replace("Input", "") + "Lbl").html(sourceData.addressInfo.addressLineOne);
	$(aLineTwoSelector.replace("Input", "") + "Lbl").html(sourceData.addressInfo.addressLineTwo);
	$(aCitySelector.replace("Input", "") + "Lbl").html(sourceData.addressInfo.cityName);
	$(aZipCodeSelector.replace("Input", "") + "Lbl").html(sourceData.addressInfo.postalCode);
	$(aStateSelector.replace("Input", "") + "Lbl").html(stateName);
}

function populateInputControls(sourceData, stateName) {
	$(aLineOneSelector).val(sourceData.addressInfo.addressLineOne);
	$(aLineTwoSelector).val(sourceData.addressInfo.addressLineTwo);
	$(aCitySelector).val(sourceData.addressInfo.cityName);
	$(aZipCodeSelector).val(sourceData.addressInfo.postalCode);
	$(aStateSelector).val(stateName);
}

function resetSelectorsConfiguration() {
	aLineOneSelector = '';
	aLineTwoSelector = '';
	aCitySelector = '';
	aZipCodeSelector = '';
	aStateSelector = '';
	aCountrySelector = '';
	aSkipValidationsSelector = '';
	aImageDivIdSelector = '';
}

function resetValidations(selector) {
	/*
	 * if ($(selector).hasClass("usPostalAddress")) { $(selector).attr('oldTitle', 'Hello'); }
	 */
	$(selector).removeValidationError();
}

function cosmetizeErrorMessage(sourceAvStr) {
	// alert(sourceAvStr);
	var returnAvStr = "";
	var iAvCnt = 0;
	var avStrArray = sourceAvStr.split("[");
	while (iAvCnt < avStrArray.length) {
		var avSubStrArray = avStrArray[iAvCnt].split(":");
		// Get the last Element from Sub Array
		var crntErrMsg = avSubStrArray[avSubStrArray.length - 1].replace("]", "").replaceAll(".", "").trim();
		if (isNotBlank(returnAvStr)) {
			returnAvStr = returnAvStr + ",\n" + crntErrMsg;
		} else {
			returnAvStr = crntErrMsg;
		}
		iAvCnt++;
	}
	return returnAvStr + '.';
}

function hideCommonErrorInfoArea() {
	closeMessageDiv("all");
}

/* content of address verficaition - end */
/* content of tax id type mask - start */
function addTaxIdBehavior(selector) {
	if (isBlank($(selector).attr("tax-id-type"))) {
		$(selector).attr("tax-id-type", "SSN");
	}
	disablePaste(selector);
	$(selector).focus(function() {
		var taxIdType = $(this).attr("tax-id-type");
		var oldTaxIdType = $(this).attr("old-tax-id-type");
		if (isBlank(oldTaxIdType)) {
			oldTaxIdType = taxIdType;
		}
		if ((isBlank(taxIdType)) || (taxIdType == "SSN") || (taxIdType == "ITIN")) {
			$(this).mask("999-99-9999");
		} else if (taxIdType == "TIN") {
			$(this).mask("99-99999999");
		}
		if (oldTaxIdType != taxIdType) {
			$(this).val("");
		}
		$(this).attr("old-tax-id-type", taxIdType);
	});
}
/* content of tax id type mask - end */

/* collapsible panel - start */
(function($) {
	$.fn.extend({
		collapsiblePanel : function() {
			// Call the ConfigureCollapsiblePanel function for the selected element
			return $(this).each(ConfigureCollapsiblePanel);
		}
	});
})(jQuery);

function ConfigureCollapsiblePanel() {
	$(this).addClass("ui-widget");

	// Check if there are any child elements, if not then wrap the inner text within a new div.
	if ($(this).children().length == 0) {
		$(this).wrapInner("<div></div>");
	}

	// Wrap the contents of the container within a new div.
	$(this).children().wrapAll("<div class='collapsibleContainerContent ui-widget-content'></div>");

	// Create a new div as the first item within the container. Put the title of the panel in here.
	$(
	        "<div class='collapsibleContainerTitle ui-widget-header'><div class='ui-accordion-header ui-accordion-icons'><span class='ui-accordion-header-icon ui-icon ui-icon-minus-custom'></span>"
	                + $(this).attr("header") + "</div></div>").prependTo($(this));

	// Assign a call to CollapsibleContainerTitleOnClick for the click event of the new title div.
	$(".collapsibleContainerTitle", this).click(CollapsibleContainerTitleOnClick);
}

function CollapsibleContainerTitleOnClick() {
	// The item clicked is the title div... get this parent (the overall container) and toggle the content within it.
	$(".collapsibleContainerContent", $(this).parent()).slideToggle();
	if ($(this).parent().find("span").hasClass("ui-icon-minus-custom")) {
		$(this).parent().find("span").removeClass("ui-icon-minus-custom");
		$(this).parent().find("span").addClass("ui-icon-plus-custom");
		if ($(this).parent().css('min-height') != null) {
			collapsePanelMinHeight = $(this).parent().css('min-height');
			$(this).parent().css('min-height', '2em');
		}
	} else {
		$(this).parent().find("span").removeClass("ui-icon-plus-custom");
		$(this).parent().find("span").addClass("ui-icon-minus-custom");
		if ($(this).parent().css('min-height') != null) {
			$(this).parent().css('min-height', collapsePanelMinHeight);
		}
	}
}

function countryStateProvinceBind(selector) {
	$(selector).blurOrChange(function() {
		countryStateProvinceHandler(this);
	});
}

/* collapsible panel - end */
function countryStateProvinceHandler(selector) {
	var countrySelector = $(selector);
	if (isNotBlank(countrySelector.val())) {
		if (countrySelector.val() == "United States") {
			var stateId = countrySelector.attr("state-input-selector");
			if (isNotBlank(stateId)) {
				var stateIdSelector = $("#" + stateId);
				var stateProvinceLabel = countrySelector.attr("state-province-label-selector");
				if (isNotBlank(stateProvinceLabel)) {
					if (stateIdSelector.attr("data-required") != null) {
						$("#" + stateProvinceLabel).html("<b class='mandateInputLbl'>State:</b>");
					} else {
						$("#" + stateProvinceLabel).html("<b>State:</b>");
					}
				}
				stateIdSelector.addClass("includeInProgress").addClass("includeInSubmit").addClass("updateModeOnly");
				if (currentPageModeReadOnly == false) {
					stateIdSelector.show();
				}
			}
			var provinceId = countrySelector.attr("province-input-selector");
			if (isNotBlank(provinceId)) {
				var provinceIdSelector = $("#" + provinceId);
				provinceIdSelector.hide().val("").trigger("change");
				provinceIdSelector.removeValidationError().removeClass("includeInProgress").removeClass("includeInSubmit").removeClass("updateModeOnly");
			}
		} else {
			var stateId = countrySelector.attr("state-input-selector");
			if (isNotBlank(stateId)) {
				var stateIdSelector = $("#" + stateId);
				stateIdSelector.hide().val("").trigger("change");
				stateIdSelector.removeValidationError().removeClass("includeInProgress").removeClass("includeInSubmit").removeClass("updateModeOnly");
			}
			var provinceId = countrySelector.attr("province-input-selector");
			if (isNotBlank(provinceId)) {
				var provinceIdSelector = $("#" + provinceId);
				var stateProvinceLabel = countrySelector.attr("state-province-label-selector");
				if (isNotBlank(stateProvinceLabel)) {
					if (provinceIdSelector.attr("data-required") != null) {
						$("#" + stateProvinceLabel).html("<b class='mandateInputLbl'>Province:</b>");
					} else {
						$("#" + stateProvinceLabel).html("<b>Province:</b>");
					}
				}
				provinceIdSelector.addClass("includeInProgress").addClass("includeInSubmit").addClass("updateModeOnly");
				if (currentPageModeReadOnly == false) {
					provinceIdSelector.show();
				}
			}
		}
	}
}

(function($) {
	$.widget("artistan.loading", $.ui.dialog, {
	    options : {
	        // your options
	        spinnerClassSuffix : 'spinner',
	        spinnerHtml : 'Loading Data, Please wait...',
	        maxHeight : false,
	        maxWidth : false,
	        // height : 60,
	        // width : 500,
	        height : 45,
	        width : 400,
	        modal : true
	    },

	    _create : function() {
		    $.ui.dialog.prototype._create.apply(this);
		    // constructor
		    $(this.uiDialog).children('*').hide();
		    var self = this, options = self.options;
		    self.uiDialogSpinner = $('.ui-dialog-content', self.uiDialog).html(options.spinnerHtml).addClass('ui-dialog-' + options.spinnerClassSuffix);
	    },
	    _setOption : function(key, value) {
		    var original = value;
		    $.ui.dialog.prototype._setOption.apply(this, arguments);
		    // process the setting of options
		    var self = this;

		    switch (key) {
			    case "innerHeight":
				    // remove old class and add the new one.
				    self.uiDialogSpinner.height(value);
				    break;
			    case "spinnerClassSuffix":
				    // remove old class and add the new one.
				    self.uiDialogSpinner.removeClass('ui-dialog-' + original).addClass('ui-dialog-' + value);
				    break;
			    case "spinnerHtml":
				    // convert whatever was passed in to a string, for html() to not throw up
				    self.uiDialogSpinner.html("" + (value || '&#160;'));
				    break;
		    }
	    },
	    _size : function() {
		    $.ui.dialog.prototype._size.apply(this, arguments);
	    },
	    // other methods
	    loadStart : function(newHtml) {
		    if (typeof (newHtml) != 'undefined') {
			    this._setOption('spinnerHtml', newHtml);
		    }
		    this.open();
	    },
	    loadStop : function() {
		    this._setOption('spinnerHtml', this.options.spinnerHtml);
		    this.close();
	    }
	});
})(jQuery);

function showAjaxPopup(message) {
	$('body').bind("mousemove", onMouseMove);
	if (isBlank(message)) {
		message = "Loading Data, Please Wait...";
	}
	$('<div id="loading_dialog"></div>').loading({
		spinnerHtml : message
	});
}

function onMouseMove(event) {
	$(".busyCursor").show().css("left", event.pageX + 5).css("top", event.pageY + 2);
}

function hideAjaxPopup() {
	$("#loading_dialog").loading("destroy");
	$('body').removeClass("busy");
	$('body').unbind("mousemove", onMouseMove);
	$(".busyCursor").hide();
}

(function($) {
	$.fn.extend({
	    morcomStyleButton : function() {
		    var selector = $(this);
		    if ((selector.length != undefined) && (selector.length > 0)) {
			    selector.each(function() {
				    $(this).createMorcomStyleButton().addMouseHandlersToMorcomStyleButton();
			    });
		    }
		    return this;
	    },
	    createMorcomStyleButton : function() {
		    var selector = $(this);
		    var displayCss = selector.css("display");
		    selector.addClass("ui-button-div");
		    if ((displayCss != null) && (displayCss != undefined)) {
			    selector.css("display", displayCss);
		    }
		    var innerHtml = "<div class='ui-button-div-left ui-button-div-left-div'></div>";
		    if (selector.hasClass("addNewRowButton")) {
			    innerHtml = "<div class='ui-button-div-left-add ui-button-div-left-add-div'></div>";
		    }
		    innerHtml += "<div class='ui-button-div-center ui-button-div-center-div'>&nbsp;" + selector.attr("data-label") + "&nbsp;</div>"
		            + "<div class='ui-button-div-right ui-button-div-right-div'></div>";
		    selector.html(innerHtml);
		    return this;
	    },
	    addMouseHandlersToMorcomStyleButton : function() {
		    var selector = $(this);
		    selector.mouseover(function() {
			    var selector = $(this);
			    selector.find(".ui-button-div-left").addClass("ui-button-div-left-div-hover");
			    selector.find(".ui-button-div-left-add").addClass("ui-button-div-left-add-div-hover");
			    selector.find(".ui-button-div-center").addClass("ui-button-div-center-div-hover");
			    selector.find(".ui-button-div-right").addClass("ui-button-div-right-div-hover");
		    }).mouseleave(function() {
			    var selector = $(this);
			    selector.find(".ui-button-div-left").removeClass("ui-button-div-left-div-hover");
			    selector.find(".ui-button-div-left-add").removeClass("ui-button-div-left-add-div-hover");
			    selector.find(".ui-button-div-center").removeClass("ui-button-div-center-div-hover");
			    selector.find(".ui-button-div-right").removeClass("ui-button-div-right-div-hover");
		    }).mousedown(function() {
			    var selector = $(this);
			    selector.find(".ui-button-div-left").addClass("ui-button-div-left-div-active");
			    selector.find(".ui-button-div-left-add").addClass("ui-button-div-left-add-div-active");
			    selector.find(".ui-button-div-center").addClass("ui-button-div-center-div-active");
			    selector.find(".ui-button-div-right").addClass("ui-button-div-right-div-active");
		    }).mouseup(function() {
			    var selector = $(this);
			    selector.find(".ui-button-div-left").removeClass("ui-button-div-left-div-active");
			    selector.find(".ui-button-div-left-add").removeClass("ui-button-div-left-add-div-active");
			    selector.find(".ui-button-div-center").removeClass("ui-button-div-center-div-active");
			    selector.find(".ui-button-div-right").removeClass("ui-button-div-right-div-active");
		    });
		    return this;
	    }
	});
})(jQuery);

function loadReferenceValueToSelectFromJson(jsonUrl, selector, isStatic, callbackFunction) {
	if (autoCompleteMap[jsonUrl] == null) {
		$.ajax({
		    url : jsonUrl,
		    dataType : 'json'
		}).done(function(jsonData) {
			autoCompleteMap[jsonUrl] = jsonData;
			applyJsonToSelector(jsonData, selector, isStatic, callbackFunction);
		}).fail(function(a, b, c) {
			alertMessage("Error while loading reference data from Link " + jsonUrl + "<br> Error String : " + c);
		});
	} else {
		var jsonData = autoCompleteMap[jsonUrl];
		applyJsonToSelector(jsonData, selector, isStatic, callbackFunction);
	}
}

function applyJsonToSelector(jsonData, selector, isStatic, callbackFunction) {
	if (isStatic == true) {
		if ($(selector).attr("lookup-loaded") == null) {
			var optionHtml = "";
			if (jsonData.referenceTypeList != null) {
				for ( var i = 0; i < jsonData.referenceTypeList.length; i++) {
					var key = jsonData.referenceTypeList[i].data;
					var data = jsonData.referenceTypeList[i].value;
					if (key == "-1") {
						optionHtml += '<option value="' + key + '" selected="selected">' + data + '</option>';
					} else {
						optionHtml += '<option value="' + key + '">' + data + '</option>';
					}

				}
			} else {
				$.each(jsonData, function(key, data) {
					if (key == "-1") {
						optionHtml += '<option value="' + key + '" selected="selected">' + data + '</option>';
					} else {
						optionHtml += '<option value="' + key + '">' + data + '</option>';
					}
				});
			}
			$(selector).attr("lookup-loaded", "true").append(optionHtml);
			if (isNotNull(callbackFunction)) {
				if (typeof callbackFunction === "function") {
					try {
						callbackFunction();
					} catch (error) {
						if ('console' in window) {
							console.log('Callback function is not invoked : ' + callbackFunction);
						}
					}
				}
			}
		}
	} else {
		var optionHtml = "";
		if (jsonData.referenceTypeList != null) {
			for ( var i = 0; i < jsonData.referenceTypeList.length; i++) {
				var key = jsonData.referenceTypeList[i].data;
				var data = jsonData.referenceTypeList[i].value;
				if (key == "-1") {
					optionHtml += '<option value="' + key + '" selected="selected">' + data + '</option>';
				} else {
					optionHtml += '<option value="' + key + '">' + data + '</option>';
				}

			}
		} else {
			$.each(jsonData, function(key, data) {
				if (key == "-1") {
					optionHtml += '<option value="' + key + '" selected="selected">' + data + '</option>';
				} else {
					optionHtml += '<option value="' + key + '">' + data + '</option>';
				}
			});
		}

		$(selector).each(function() {
			if ($(this).attr("lookup-loaded") == null) {
				$(this).attr("lookup-loaded", "true").append(optionHtml);
			}
		});
		if (isNotNull(callbackFunction)) {
			if (typeof callbackFunction === "function") {
				try {
					callbackFunction();
				} catch (error) {
					if ('console' in window) {
						console.log('Callback function is not invoked : ' + callbackFunction);
					}
				}
			}
		}
	}
}