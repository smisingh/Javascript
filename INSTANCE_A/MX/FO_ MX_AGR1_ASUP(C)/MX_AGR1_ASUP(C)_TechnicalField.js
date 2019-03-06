/* --- MX_AGR1_ASUP(C) Technical Fields --- */
/*--------------------------------------------------------------------------
Developer   - Riya Dutta
Date	    - 07/03/2018 (MM/DD/YYYY)
Change No   - MOD-001
Description - Hide Technical Section
-----------------------------------------------------------
Developer   - Smita Singh
Date	    - 08/08/2018 (MM/DD/YYYY)
Change No   - MOD-002
Description - Rectify the alert box message
-------------------------------------*/

//hide technical section
neocase.form.section("sectionabe5bf3cb5e64a3035c1").hide();

/**************************************
* Update mandatory fields alert message
***************************************/
window.checkForm = function(){
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
						msg += "\n- Request comment"; //MOD-002
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

/**************************
* Launch Javascript on init
***************************/
window.launchOnInit = function(){
	updateAndDisableField(neocase.form.field("INTERVENTIONS_EN_COURS$MOTCLE"),getParamFromUrl('topic'));
};
neocase.form.event.bind("init",launchOnInit);

/****************************
* Launch Javascript on submit
*****************************/
window.launchOnSubmit = function(){
	//add control before submit
	checkForm();
};
neocase.form.event.bind("submit",launchOnSubmit);
