/**************		UK EDC STEP 3 (M) FO Technical Fields	*************
******************************************************************/
/*********************************
 * BCH - 18/09/2017
 * add Approved & Not Approved Rejection function
 * ******************************/
/*********************************
 * BCH - 08/11/2017
 * add Mandatory false if PU-Cost Center function
 * ******************************/
affichageChamp(formulaire.INTERVENTIONS_EN_COURS$VALEUR197, false);
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
	//*************************************Begin MOD-002 *************************************
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
				//if(validator[v].id.search("question") != -1){
					//msg += "\n- question";
				if(validator[v].id.search("question") != -1){
					if(lang == "fr"){
					msg += "\n- Votre demande";
					}else{
					msg += "\n- Request";
					}	
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
	//*************************************End MOD-002 *************************************
		//update the alert message
		m_requiredFieldsUndefined = msg;
	}
	
	//If all previous control are valid, the function return "true" to execute the Submit function
	return true;
};

//Execute the custom function before the submit function
Neocase.attachBefore(window, 'ValidatorAlertRequiredFieldsOnSubmit', function(){return Neocase.checkForm();});


/**************************************
* Approved & Not Approved Rejection
***************************************/
window.notApproved = function(FIELD){
    if(FIELD.selectedIndex !== 0){
        return true;
    }
    else{
        affichageChamp(FIELD, true);
        champObligatoire(FIELD, true);
        return false;
    }
};
window.approved = function(FIELD){
    if(FIELD.selectedIndex === 0){
        champObligatoire(FIELD, false);
        return true;
    }
    else{
        FIELD.selectedIndex = 0;
        champObligatoire(FIELD, false);
        return true;
    }
};
/**************************************
* Mandatory false if PU-Cost Center
***************************************/
window.puNotMandatory = function(){
	var subcatChamp = document.querySelector("#divFieldINTERVENTIONS_EN_COURS_ELEMENT span");
    if(subcatChamp.innerHTML === "Cost Centre (PU)"){
        champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR46, false);
    }
};
ThisForm.Bind('loadcomplete', puNotMandatory);
