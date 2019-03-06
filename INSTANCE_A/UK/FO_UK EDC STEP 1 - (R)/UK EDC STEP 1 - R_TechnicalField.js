/**************		UK EDC STEP 2 (R) FO Technical Fields	***********************
******************************************************************
Developer   - 
Date	    - 13/06/2017
Change No   - MOD-001
Description - 
******************************************************************

*******************************************************************/

/**************
* Hide Sections
***************/
//Technical section
//@@ThisForm.HideSection("section955");

/***********************************
* COPY VALUE FROM 1 FIELD TO ANOTHER
************************************/
window.copyValue = function(copyField,pasteField){
	var msg = "fonction copyValue : ";
	var fieldTd = document.getElementsByClassName("fieldTD");
	if(fieldTd.length > 0){
	//BackOffice side
		msg += "backoffice side";
		//COPY BKO FIELD
		//--------------
		var bkoCopyFieldValue = "";
		if(document.getElementById(copyField) === null){
		//if copy field not found
			console.log("field to copy "+copyField+" not found");
			//return false;
		}else{
		//if copy field exists
			//get field value
			if(document.getElementById(copyField).type == "select" || document.getElementById(copyField).type == "select-one"){
			//copy select field
				bkoCopyFieldValue = document.getElementById(copyField).options[document.getElementById(copyField).selectedIndex].text;
			}else{
			//copy text field
				bkoCopyFieldValue = document.getElementById(copyField).value;
			}
		}
		
		//PASTE BKO FIELD
		//---------------
		//Only paste value if copy field existes
		if(bkoCopyFieldValue != ""){
			var bkoPasteFieldValue = "";
			if(document.getElementById(pasteField) === null){
			//if paste field not found
				console.log("field to paste "+pasteField+" not found");
				//return false;
			}else{
			//if both fields exists we paste the values
				//Read Only fields
				if(pasteField.readOnly === true){
					//Readonly fields, disable it
					document.getElementById(pasteField).readOnly = false;
					//paste value
					document.getElementById(pasteField).value = bkoCopyFieldValue;
					//save
					ThisCase.BackgroundMode.Begin();
					ThisCase.BackgroundMode.Execute('enregistreronly()');
					//enable readOnly
					document.getElementById(pasteField).readOnly = true;
					ThisCase.BackgroundMode.Execute('enregistreronly()');
					ThisCase.BackgroundMode.Stop();
				}else{
				//Standard custom fields
					if(document.getElementById(pasteField).type == "select" || document.getElementById(pasteField).type == "select-one"){
						//select fields
					}else{
						//text fields
						document.getElementById(pasteField).value = bkoCopyFieldValue;
					}
				}
			}
		}
	}else{
	//FrontOffice side
		msg += "frontOffice side";
		//get copy field type and valeur
		var froCopyFieldCustomType = "";
		var froCopyFieldValeur = "";
		var froCopyFieldId = "";
		if(copyField.search("_") != -1){
			if(copyField.split("$").length > 0){
				if(copyField.split("_").length > 0){
					froCopyFieldCustomType = copyField;
					var froCopyFieldValeurSplit = copyField.split("_");
					var froCopyFieldValeurSplitLength = Number(froCopyFieldValeurSplit.length);
					froCopyFieldValeur = froCopyFieldValeurSplit[froCopyFieldValeurSplitLength-1];
				}else{
					froCopyFieldCustomType = copyField.split("$")[0];
					froCopyFieldValeur = copyField.split("$")[1];
				}
			}else if(copyField.split("_").length > 0){
				froCopyFieldCustomType = copyField;
				var froCopyFieldSplit = copyField.split("_");
				var froCopyFieldSplitLength = Number(froCopyFieldSplit.length);
				froCopyFieldValeur = froCopyFieldSplit[froCopyFieldSplitLength-1];
			}else{
				msg += " / copyfield values not found";
				console.log(msg);
			}
		}else{
			if(copyField.search("MOTSCLES") != -1){
				froCopyFieldId = "MOTCLE";
			}else{
				msg += "no copyField found";
				console.log(msg);
			}
		}
		//get paste field type and valeur
		var froPasteFieldCustomType = "";
		var froPasteFieldValeur = "";
		var froPasteFieldId = "";
		if(pasteField.search("_") != -1){
			if(pasteField.split("$").length > 1){
				if(copyField.split("_").length > 0){
					froPasteFieldCustomType = pasteField;
					var froPasteFieldValeurSplit = pasteField.split("_");
					var froPasteFieldValeurSplitLength = Number(froPasteFieldValeurSplit.length);
					froPasteFieldValeur = froPasteFieldValeurSplit[froPasteFieldValeurSplitLength-1];
				}else{
					froPasteFieldCustomType = pasteField.split("$")[0];
					froPasteFieldValeur = pasteField.split("$")[1];
				}
			}else if(pasteField.split("_").length > 1){
				froPasteFieldCustomType = pasteField;
				var froPasteFieldSplit = pasteField.split("_");
				var froPasteFieldSplitLength = Number(froPasteFieldSplit.length);
				froPasteFieldValeur = froPasteFieldSplit[froPasteFieldSplitLength-1];
			}else{
				msg += " / pastefield values not found";
				console.log(msg);
			}
		}else{
			if(pasteField.search("MOTSCLES") != -1){
				froPasteFieldId = "MOTCLE";
			}else{
				msg += "no pasteField found";
				console.log(msg);
			}
		}
		//variables
		var froCopyField = "";
		var froCopyFieldValue = "";
		var froPasteField = "";
		var froPasteFieldType = "";
		
		//COPY FRO FIELD
		//--------------
		//get form sections
		var sections = document.getElementsByClassName("bloc");
		if(sections.length > 0){
			//loop on every sections
			for(s=0; s<sections.length; s++){
				var froSelect = sections[s].getElementsByTagName("select");

				//LOOP ON SELECT
				//--------------
				if(froSelect.length > 0){
					for(fs=0; fs<froSelect.length; fs++){
						//search copy field
						if(froCopyFieldId == ""){
							//search type correspondance
							if(froSelect[fs].id.search(froCopyFieldCustomType) != -1){
								//search valeur correspondance
								var froSelectCopySplit = froSelect[fs].id.split("_");
								var froSelectCopyValeur = Number(froSelectCopySplit.length);
								var froSelectCopyLast = froSelectCopySplit[froSelectCopyValeur-1];
								if(froSelectCopyLast == froCopyFieldValeur){
									//if correspondance is found, we stock the copy field
									froCopyField = froSelect[fs];
									froCopyFieldValue = froSelect[fs].options[froSelect[fs].selectedIndex].text;
								}
							}
						}else{
							if(froSelect[fs].id.search(froCopyFieldId) != -1){
								//if correspondance is found, we stock the copy field
								froCopyField = froSelect[fs];
								froCopyFieldValue = froSelect[fs].options[froSelect[fs].selectedIndex].text;
							}
						}
						
						//search paste field
						if(froPasteFieldId == ""){
							//search type correspondance
							if(froSelect[fs].id.search(froPasteFieldCustomType) != -1){
								//search valeur correspondance
								var froSelectPasteSplit = froSelect[fs].id.split("_");
								var froSelectPasteValeur = Number(froSelectPasteSplit.length);
								var froSelectPasteLast = froSelectPasteSplit[froSelectPasteValeur-1];
								if(froSelectPasteLast == froPasteFieldValeur){
									//if correspondance is found, we stock the paste field
									froPasteField = froSelect[fs];
									froPasteFieldType = "select";
								}
							}
						}else{
							if(froSelect[fs].id.search(froPasteFieldId) != -1){
								//if correspondance is found, we stock the paste field
								froPasteField = froSelect[fs];
								froPasteFieldType = "select";
							}
						}
					}
				}
				//if one of the copy/paste field isn't found, we search on input
				if(froCopyField == "" || froPasteField == ""){
					var froInput = sections[s].getElementsByTagName("input");
					
					//LOOP ON INPUT
					//-------------
					if(froInput.length > 0){
						for(fi=0; fi<froInput.length; fi++){
							//search copy field
							if(froCopyFieldId == ""){
								//search type correspondance
								if(froInput[fi].id.search(froCopyFieldCustomType) != -1){
									//search valeur correspondance
									var froTextCopySplit = froInput[fi].id.split("_");
									var froTextCopyValeur = Number(froTextCopySplit.length);
									var froTextCopyLast = froTextCopySplit[froTextCopyValeur-1];
									if(froTextCopyLast == froCopyFieldValeur){
										//if correspondance is found, we stock the copy field
										froCopyField = froInput[fi];
										froCopyFieldValue = froInput[fi].value;
									}
								}
							}else{
								if(froInput[fi].id.search(froCopyFieldId) != -1){
									//if correspondance is found, we stock the copy field
									froCopyField = froInput[fi];
									froCopyFieldValue = froInput[fi].value;
								}
							}
							
							//search paste field
							if(froPasteFieldId == ""){
								//search type correspondance
								if(froInput[fi].id.search(froPasteFieldCustomType) != -1){
									//search valeur correspondance
									var froTextPasteSplit = froInput[fi].id.split("_");
									var froTextPasteValeur = Number(froTextPasteSplit.length);
									var froTextPasteLast = froTextPasteSplit[froTextPasteValeur-1];
									if(froTextPasteLast == froPasteFieldValeur){
										//if correspondance is found, we stock the paste field
										froPasteField = froInput[fi];
										froPasteFieldType = "text";
									}
								}
							}else{
								if(froInput[fi].id.search(froPasteFieldId) != -1){
									//if correspondance is found, we stock the paste field
									froPasteField = froInput[fi];
									froPasteFieldType = "text";
								}
							}
						}
					}
				}
				//if one of the copy/paste field isn't found, we search on readonly fields
				if(froCopyField == "" || froPasteField == ""){
					var froSpan = sections[s].getElementsByTagName("span");
					
					//LOOP ON SPAN
					//------------
					if(froSpan.length > 0){
						for(fsp=0; fsp<froSpan.length; fsp++){
							//take away mandatory fields indicators span
							if(froSpan[fsp].id.search("Validator") == -1){
								//search copy field
								if(froCopyFieldId == ""){
									//search type correspondance
									if(froSpan[fsp].id.search(froCopyFieldCustomType) != -1){
										//search valeur correspondance
										var froReadonlyCopySplit = froSpan[fsp].id.split("_");
										var froReadonlyCopyValeur = Number(froReadonlyCopySplit.length);
										var froReadonlyCopyLast = froReadonlyCopySplit[froReadonlyCopyValeur-1];
										if(froReadonlyCopyLast == froCopyFieldValeur){
											//if correspondance is found, we stock the copy field
											froCopyField = froSpan[fsp];
											froCopyFieldValue = froSpan[fsp].innerHTML;
										}
									}
								}else{
									if(froSpan[fsp].id.search(froCopyFieldId) != -1){
										//if correspondance is found, we stock the copy field
										froCopyField = froSpan[fsp];
										froCopyFieldValue = froSpan[fsp].innerHTML;
									}
								}
								
								//search paste field
								if(froPasteFieldId == ""){
									//search type correspondance
									if(froSpan[fsp].id.search(froPasteFieldCustomType) != -1){
										//search valeur correspondance
										var froReadonlyPasteSplit = froSpan[fsp].id.split("_");
										var froReadonlyPasteValeur = Number(froReadonlyPasteSplit.length);
										var froReadonlyPasteLast = froReadonlyPasteSplit[froReadonlyPasteValeur-1];
										if(froReadonlyPasteLast == froPasteFieldValeur){
											//if correspondance is found, we stock the paste field
											froPasteField = froSpan[fsp];
											froPasteFieldType = "readonly";
										}
									}
								}else{
									if(froSpan[fsp].id.search(froPasteFieldId) != -1){
										//if correspondance is found, we stock the paste field
										froPasteField = froSpan[fsp];
										froPasteFieldType = "readonly";
									}
								}
							}
						}
					}
				}
			}
		}
		
		//PASTE FRO FIELD
		//---------------
		//first check if both fields exist
		if(froCopyField == ""){
			//alert("field to copy "+copyField+" not found");
		}else if(froPasteField == ""){
			//alert("field to paste "+pasteField+" not found");
		}else{
		//If fields exist, we paste the value
			if(froPasteFieldType == "select"){
			//if paste field is a select
			}else if(froPasteFieldType == "text"){
			//if paste field is a text
				froPasteField.value = froCopyFieldValue;
			}else if(froPasteFieldType == "readonly"){
			//if paste field is in read only
				froPasteField.innerHTML = froCopyFieldValue;
			}else{
			//error, no matching type found for paste field
				alert("Unknown type for "+froPasteField);
			}
		}
	}
};

/****************************
* AUTOMATICALLY FILL SUBTOPIC
*****************************/
window.manageSubtopic = function(){
	var msg = "function manageSubtopic : ";
	var getSubtopic = localStorage.getItem('subtopic');
	var field = formulaire.INTERVENTIONS_EN_COURS$ELEMENT;
	if(field.value == "0"){
		if(getSubtopic){
			if(field){
				if(getSubtopic.search("job title") != -1){
					field.value = "2113";
				}else if(getSubtopic.search("contractual base") != -1){
					field.value = "2114";
				}else if(getSubtopic.search("working hours") != -1){
					field.value = "2115";
				}else if(getSubtopic.search("Cost Centre") != -1){
					field.value = "2116";
				}else if(getSubtopic.search("manager details") != -1){
					field.value = "2117";
				}else if(getSubtopic.search("Fixed Term") != -1){
					field.value = "2044";
				}else if(getSubtopic.search("probation") != -1){
					field.value = "2050";
				}else{
					msg += "no matching value found between field list and localStorage.getItem(subtopic)";
				}
				if(field.value != ""){
					champObligatoire(formulaire.INTERVENTIONS_EN_COURS$ELEMENT, false);
				}
			}else{
				msg += "field undefined";
				console.log(msg);
			}
		}else{
			msg += "localStorage.getItem(subtopic) undefined";
			console.log(msg);
		}
	}
};


/**************************************
* UPDATE MANDATORY FIELDS ALERT MESSAGE
***************************************/
//Check if neocase namespace already exist. If not it's create.
if(typeof Neocase == "undefined"){
	Type.registerNamespace('Neocase');
}
//function which allow to execute a function before another one
Neocase.attachBefore = function(obj, funcName, advice) {
	var old = obj[funcName];
	obj[funcName] = function() {
		var bReturn = advice.apply(this, arguments);
		if(bReturn) {
			return old.apply(this, arguments);
		}else{
			return false;
		}
	};
};

//custom function
Neocase.checkForm = function(){
	console.log("function Neocase.checkForm");
	//PLACE YOUR CODE HERE
	/**************************************
	* Update mandatory fields alert message
	***************************************/
	//Declare Variables
	var validator = document.getElementsByClassName('ValidatorCautionBox');
	var msg = "";
	var lang = document.getElementById("PageHtml").lang.split("-")[0];
	if(lang == "fr"){
		msg = "Merci de renseigner les champs obligatoires suivant :";
	}else{
		msg = "Please fill the following mandatory fields :";
	}
	//If mandatory fields are blanked, we add their name in the alert message
	if(validator.length > 0){
		for(v=0; v<validator.length; v++){
			var validatorVisibility = validator[v].style.visibility;
			if(validatorVisibility == "visible"){
				if(validator[v].id.search("question") != -1){
					msg += "\n- question";
				}else{
					var validatorField = validator[v].parentNode.previousSibling.previousSibling;
					if(validatorField){
						var validatorLabel = "";
						if(validatorField.getElementsByTagName("a").length > 0){
							validatorLabel = validatorField.getElementsByTagName("a")[0].innerHTML.split(":")[0];
						}else if(validatorField.getElementsByTagName("label").length > 0){
							validatorLabel = validatorField.getElementsByTagName("label")[0].innerHTML.split(":")[0];
						}else{
							validatorLabel = "undefined";
						}
						msg += "\n- "+validatorLabel;
					}
				}
			}
		}
		//update the alert message
		m_requiredFieldsUndefined = msg;
		console.log("var m_requiredFieldsUndefined updated : "+m_requiredFieldsUndefined);
	}
	
	//If all previous control are valid, the function return "true" to execute the Submit function
	return true;
};

//Execute the custom function before the submit function
Neocase.attachBefore(window, 'ValidatorAlertRequiredFieldsOnSubmit', function(){return Neocase.checkForm();});

//Replace the label
window.replaceField = function(field, replace){
	if(field){
		var currentLabel = field.getElementsByTagName('label');
		currentLabel[0].innerHTML = currentLabel[0].innerHTML.replace(' :', replace);
	}
};

/******************************************
* Insert the function in the technicalField - Ajout par Pierre 06/04/2017
******************************************/
window.tooltipReadonly = function(fieldName,tooltip){
  var msg = "function tooltipReadonly : ";
  var field = document.getElementById(fieldName);
  if(field){
              field.parentElement.parentElement.title = tooltip;
  }
  	else if(field)
	{field.title = tooltip;}
  else{
                msg += "field fieldName not found";
                console.log(msg);
  }
};


/*************************
* ACTIONS ON LOAD COMPLETE
**************************/
window.onloadForm = function(){
	//manage empty mandatory fields
	//emptyMandatoryField(1);
	
	//FILL SUBTOPIC
	manageSubtopic();
	//manageFields();
	
	//Check label with ":"
	replaceField(document.getElementById('divLblINTERVENTIONS_EN_COURS_VALEUR205'),"");
	replaceField(document.getElementById('divLblINTERVENTIONS_EN_COURS_VALEUR206'),"");

		// Ajout Pierre - ToolTip
tooltipReadonly("INTERVENTIONS_EN_COURS$VALEUR76","This is your revised Reference Salary");
tooltipReadonly("INTERVENTIONS_EN_COURS$VALEUR78","This is the pro-rated value of Target Variable Pay for this year");
tooltipReadonly("INTERVENTIONS_EN_COURS$VALEUR83","This is your revised Flex Uplift");
tooltipReadonly("INTERVENTIONS_EN_COURS$VALEUR87","This is your revised Flex Fund");
tooltipReadonly("INTERVENTIONS_EN_COURS$VALEUR88","This is your pro-rated Target Variable Compensation for the period worked this year at your current hours");
tooltipReadonly("INTERVENTIONS_EN_COURS$VALEUR89","This is your pro-rated Target Variable Compensation for the period worked this year at your new hours");
tooltipReadonly("INTERVENTIONS_EN_COURS$VALEUR193","This is your revised total Target Variable Compensation for this year");
tooltipReadonly("INTERVENTIONS_EN_COURS$VALEUR90","This is your full year revised Target Variable Compensation");
tooltipReadonly("INTERVENTIONS_EN_COURS$VALEUR91","This is the date your full year revised Target Variable Compensation becomes effective");

tooltipReadonly("INTERVENTIONS_EN_COURS$VALEUR98","This is your Total Holiday Entitlement in Hours for the Current Year");
tooltipReadonly("INTERVENTIONS_EN_COURS$VALEUR113","This is your new Bank Holiday Entitlement in Hours for future years");
tooltipReadonly("INTERVENTIONS_EN_COURS$VALEUR112","This is your new Contractual Holiday Entitlement in Hours for future years");
tooltipReadonly("INTERVENTIONS_EN_COURS$VALEUR103","This is your new Holiday Entitlement in Hours from date of change to Year End");
tooltipReadonly("INTERVENTIONS_EN_COURS$VALEUR117","This is your new Privilege Days Entitlement (if applicable) in Hours for future years");

};

//ThisForm.Bind('loadcomplete', onloadForm);
$( document ).ready(function() {
	onloadForm();
});
