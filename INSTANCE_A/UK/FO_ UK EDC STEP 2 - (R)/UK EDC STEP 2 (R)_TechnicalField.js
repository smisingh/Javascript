/**************		UK EDC STEP 3 (R) FO Technical Fields	*************
******************************************************************
Developer   - 
Date	    - 14/06/2017
Change No   - MOD-001
Description - 
******************************************************************

*******************************************************************/

/**************
* Hide Sections
***************/
//Technical section
//ThisForm.HideSection("section955");

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

window.checkSectionDisplay = function (sectionID) {
    document.getElementById(sectionID).style.display = "block";
};


window.displaySectionSpecific = function () {
    var interElement = formulaire.INTERVENTIONS_EN_COURS$ELEMENT;
    switch (typeof interElement !== undefined && interElement !== null) {
        case interElement.innerHTML === 'Cost Centre (PU)':
            checkSectionDisplay("section666");
            checkSectionDisplay("section136");
            checkSectionDisplay("section921");
            checkSectionDisplay("section579");
            checkSectionDisplay("section867");
            break;
        case interElement.innerHTML === 'Job':
            checkSectionDisplay("section579");
            break;
        case interElement.innerHTML === 'Working hours':
            checkSectionDisplay("section813");
            break;
        case interElement.innerHTML === 'Work Location':
            checkSectionDisplay("section832");
            break;
        case interElement.innerHTML === 'Fixed Term Contract Extension':
            checkSectionDisplay("section292");
            break;
        case interElement.innerHTML === 'Probation period extension':
            checkSectionDisplay("section842");
            break;
        case interElement.innerHTML === 'Management Team':
            checkSectionDisplay("section867");
        }
};

window.checkSectionHide = function (sectionID) {

    var hideAnswersSection = document.getElementsByClassName('answers');
    if (typeof hideAnswersSection !== undefined && hideAnswersSection !== null) {
        if (typeof document.getElementById(sectionID) !== undefined && document.getElementById(sectionID) !== null) {
            document.getElementById(sectionID).style.display = "none";
        }
    }

    displaySectionSpecific();
};

checkSectionHide("section666");
checkSectionHide("section217");
checkSectionHide("section136");
checkSectionHide("section921");
checkSectionHide("section579");
checkSectionHide("section813");
checkSectionHide("section832");
checkSectionHide("section292");
checkSectionHide("section842");
checkSectionHide("section867");
checkSectionHide("section754");
checkSectionHide("section955");

/*************************
* ACTIONS ON LOAD COMPLETE
**************************/
window.onloadForm = function(){
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
