

/* --- MX_SGR_FO(C)Technical Fields --- */
/*--------------------------------------------------------------------------
Developer   - Smita Singh
Date	    - 06/25/2018 (MM/DD/YYYY)
Change No   - MOD-001
Description - Hide Technical Section
			- Alert on mandatory field
			- Popup and fill up on legal entity
----------------------------------------------------------------------------
Developer   - Smita Singh
Date	    - 07/02/2018 (MM/DD/YYYY)
Change No   - MOD-002
Description - Disable legal entity field
--------------------------------------------
Developer   - Smita Singh
Date	    - 08/08/2018 (MM/DD/YYYY)
Change No   - MOD-003
Description - Rectify message on alert box 
---------------------------------------------------------*/ 
 
//hide technical section
neocase.form.section("sectionbfe60022f9a8c8b57e7f").hide();

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
						msg += "\n- Request comment"; //MOD-003
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

/************************************************
* FUNCTIONS CALLED BY POPUP TO FILL CUSTOM FIELDS
*************************************************/
FillCf = function(fieldValue,fieldName){
    var msg = "function FillCf : ";

    //properly target field
    if(fieldName.search("VALEUR0") != -1){
        fieldName = fieldName.replace("VALEUR0","VALEUR");
    }
	fieldName = getASPid(fieldName);
    var field = neocase.form.field(fieldName);

    if(field){
		/*if(fieldValue == "Stagiaire" )
			{
				neocase.form.field('INTERVENTIONS_EN_COURS_VALEUR305').setValue("Stagiaire"); //Annual working time (new)"
				capgDisable(formulaire.INTERVENTIONS_EN_COURS_VALEUR305);

			} */
		field.setValue(fieldValue);
		
    }else{
        msg += "field "+fieldName+" not found";
        console.log(msg);
    }
};

//------------------------ Capgemini Developed Enable and Disable Code --------------------- //MOD-002
window.capgDisable = function(fieldGotByID) {
	$(fieldGotByID).parent().prepend("<div id=\"prependedid" + fieldGotByID.id + "\" style=\"width: 100%; height: 37px; position: absolute;cursor: no-drop;\"></div>");
};


/**************************
* Launch Javascript on init
***************************/
window.launchOnInit = function(){
	//update 'level 1' value
	updateAndDisableField(neocase.form.field("INTERVENTIONS_EN_COURS$MOTCLE"),getParamFromUrl('topic'));
	popupLink(formulaire.INTERVENTIONS_EN_COURS_VALEUR283,"/Custom_Referential/PersonalArea.aspx");
	capgDisable(formulaire.INTERVENTIONS_EN_COURS_VALEUR283); //MOD-002


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
