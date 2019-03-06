/* --------- MX_AGR_EE(ASUP)(M)_TechField ---------- */

/*--------------------------------------------------------------------------
Developer   - Riya Dutta
Date	    - 06/26/2018 (MM/DD/YYYY)
Change No   - MOD-001
Description - Hide Technical Section
------------------------------------------------------------------------
Developer   - Smita Singh
Date	    - 07/31/2018 (MM/DD/YYYY)
Change No   - MOD-002
Description - Disable/Enable the submit button depending on the response field
----------------------------------------------------------------------------*/

//hide technical section
neocase.form.section("section936dfc53ec049216234b").hide();


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
		//checkForm();
		}
	else
		{
		alert("Response field is mandatory");
		return false;
		}

};
neocase.form.event.bind("submit",launchOnSubmit);
