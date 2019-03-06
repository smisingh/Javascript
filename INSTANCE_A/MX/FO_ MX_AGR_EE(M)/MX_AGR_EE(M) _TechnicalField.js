/* ------- MX_AGR_EE( M) --------- */

/*--------------------------------------------------------------------------
Developer   - Riya Dutta
Date	    - 06/26/2018 (MM/DD/YYYY)
Change No   - MOD-001
Description - Hide Technical Section
-------------------------------------------------------------------------
Developer   - Smita Singh
Date	    - 07/27/2018 (MM/DD/YYYY)
Change No   - MOD-002
Description - Disable the submit button depending on the reposnse field
----------------------------------------------------------------------------*/

//hide technical section
neocase.form.section("section3d71661094e8adfa3d93").hide();

window.checkForm = function(){
	/***************************************
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
					if(lang == "fr"){
						msg += "\n- Demande initiale";
					}else{
						msg += "\n- Initial request";
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
		//update the alert message
		m_requiredFieldsUndefined = msg;
	}
	//If all previous control are valid, the function return "true" to execute the Submit function
	return true;
};
/*********************************************
Disable any field by putting field on it
*********************************************/
 
window.capgDisable = function(fieldGotByID) {
	$(fieldGotByID).parent().prepend("<div id=\"prependedid" + fieldGotByID.id + "\" style=\"width: 100%; height: 80px; position: absolute;\"></div>");
}; 

/*********************************************
Enable any field by removing field over it
*********************************************/
  
 window.capgEnable = function(fieldGotByID)
{
	var el = document.getElementById("prependedid" + fieldGotByID.id);
	if(el){
		el.parentNode.removeChild(el);
	}
};

/*------------------------------------------ MOD-002 ------------------------------*/
/************************************************
To check if the response is field is empty or not
*************************************************/
	window.checkValueOfField = function(fieldId){
		if (!$.trim($("#" + fieldId ).val())) {
				return false;
		}else{
				return true;
		}
	};

/*********************************
 Get the text area id
 *********************************/
 window.findTextAreabyID = function(nameElement) {
	var tempData = true;
	
	var possibleElements = $('[id*="' + nameElement + '"]');
		for (var i = 0; i< possibleElements.length; ++i) {
			if (possibleElements[i].localName === "textarea") {
				tempData = checkValueOfField(possibleElements[i].id);
			}
		}
		
	return tempData;
}; 



/**************************
* Launch Javascript on init
***************************/
window.launchOnInit = function(){
	
	disableField(neocase.form.field("INTERVENTIONS_EN_COURS$MOTCLE"));
	disableField(neocase.form.field("question"));
};
neocase.form.event.bind("init",launchOnInit);

/****************************
* Launch Javascript on submit
*****************************/
window.launchOnSubmit = function(){
	var againTempData = true;
	
	againTempData = findTextAreabyID("response");
	if(againTempData)
		{
		checkForm();
		}
	else
		{
		alert("Response field is manadatory");
		return false;
		}

};
neocase.form.event.bind("submit",launchOnSubmit);
