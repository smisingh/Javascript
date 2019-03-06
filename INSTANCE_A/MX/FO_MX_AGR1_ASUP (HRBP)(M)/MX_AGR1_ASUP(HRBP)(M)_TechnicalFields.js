/* --- MX_AGR1_ASUP(HRBP)(M) Technical Fields --- */
/*--------------------------------------------------------------------------
Developer   - Riya Dutta
Date	    - 07/03/2018 (MM/DD/YYYY)
Change No   - MOD-001
Description - Hide Technical Section
------------------------------------------------------------------------
Developer   - Smita Singh
Date	    - 08/1/2018 (MM/DD/YYYY)
Change No   - MOD-002
Description - Disable/Enable the submit button depending on the response field
----------------------------------------------------------------------------*/ 


//hide technical section
neocase.form.section("section80c1f66dcd4f0449a757").hide();


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
