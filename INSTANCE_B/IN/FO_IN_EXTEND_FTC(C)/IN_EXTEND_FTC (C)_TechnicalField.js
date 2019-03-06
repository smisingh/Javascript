// JavaScript Document
/************** IN_EXTEND_FTC(C) **********
Version - Initial
Author - Somrita
Creation Date - 20/11/2017
Description - Creation of form
******************************************************************
			  Version - MOD-001
Author - SMITA SINGH
Creation Date - 12/08/2017
Description - 1)TO MAKE THE EFFECTIVE DATE AS CURRENT FTC END DATE
			  2)ALERT BOX FOR MANDATORY FIELDS	
******************************************************************
			  Version - MOD-002
Author - SMITA SINGH
Creation Date - 04/01/2018
Description - 1)Check the Current end date if empty or not
			  
******************************************************************
			  Version - MOD-003
Author - Riya Dutta
Creation Date - 12/10/2018 (MM/DD/YYYY)
Description - 1)Change checkForm function for pop-up alert missing field issue
			  
**********************************************************************************
			  Version - MOD-004
Author - Riya Dutta	
Creation Date - 01/02/2019 (MM/DD/YYYY)
Description - Upgrading to New JS Framework (//need update)
**********************************************************************/

//Hide Technical section
neocase.form.section("section744").hide();

/***********************MOD-004 -- ******************************
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
*****************************MOD-004 -- **************************/

/**************************************
* UPDATE MANDATORY FIELDS ALERT MESSAGE
***************************************/
//custom function
/***************************************** MOD-004 Changes Starts *********************************************/
window.checkForm = function(){
	console.log("function window.checkForm");
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
	//if(validator.length > 0){
	//		for(v=0; v<validator.length; v++){
	//		var validatorVisibility = validator[v].style.visibility;
	//		if(validatorVisibility == "visible"){
	//		if(validator[v].id.search("question") != -1){
	//				//var labelName = document.getElementsByClassName("bloc-header")[1].innerHTML;
	//				//msg += "\n- "+labelName;
	//				//msg += "\n- question";
	//				msg += "\n- Comments"; //MOD-003
	//			}else{
	//				var validatorField = validator[v].parentNode.previousSibling.previousSibling;
	//				if(validatorField){
	//					var validatorLabel = "";
	//				if(validatorField.getElementsByTagName("a").length > 0){
	//						validatorLabel = validatorField.getElementsByTagName("a")[0].innerHTML.split(":")[0];
	//					}else if(validatorField.getElementsByTagName("label").length > 0){
	//						validatorLabel = validatorField.getElementsByTagName("label")[0].innerHTML.split(":")[0];
	//					}else{
	//						validatorLabel = "undefined";
	//					}
	//					msg += "\n- "+validatorLabel;
	//				}
	//			}
	//		}
	//	}
		//update the alert message
		m_requiredFieldsUndefined = msg;
		console.log("var m_requiredFieldsUndefined updated : "+m_requiredFieldsUndefined);
	//}
	
	//If all previous control are valid, the function return "true" to execute the Submit function
	return true;
};

//Execute the custom function before the submit function
//Neocase.attachBefore(window, 'ValidatorAlertRequiredFieldsOnSubmit', function(){return Neocase.checkForm();}); // MOD-004 --
/********************************** MOD-004 Changes Ends ***********************************************************************/

//***MOD-004 *** Need to check for Neocase Function with algo
window.fieldDisable = function(fieldname)
{					
		var disabler = '<div class="customDisabled" style="position:absolute;top:0;z-index:1000;width: 100%;height: 100%;"></div>';
		var fieldToDisable = neocase.form.field(fieldname).elementHTML;
		$(fieldToDisable).parent().parent().append(disabler);
};

/*window.getNextMontthFirstDate = function()
{
	var today = new Date();
	var mm = today.getMonth()+1; //January is 0!
	//var nextMonth = mm+1;
	var yyyy = today.getFullYear();
	var dd = today.getDate() + 1;
	if(nextMonth>12)
	{
		nextMonth = nextMonth - 12; //Year has only 12 month
		yyyy = yyyy+1;
	}
	
	var firstDayNextMonth = mm+'/'+dd+'/'+yyyy;
	
	return firstDayNextMonth;
};
*/
window.setEffectiveDate = function()
{
	var newDate = neocase.form.field("UTILISATEURS$CHAMPU186").getValue();
	var splitDate= newDate.split('/');

	var dd = parseInt(splitDate[0]);
	var mm = splitDate[1];
	var yyyy = splitDate[2];
	
	newDate = mm+'/'+dd+'/'+yyyy;	
	
	var tomorrow = new Date(newDate);
	tomorrow.setDate(tomorrow.getDate() + 1);
	
	var effectiveNewDate = tomorrow.toString('dd/MM/yyyy');
	
	return effectiveNewDate;
};
/*************************
* ACTIONS ON LOAD COMPLETE
**************************/
window.onloadForm = function(){

if(neocase.form.field("UTILISATEURS$CHAMPU186").getValue() == "") //MOD-002
	{
	alert("The current end date is empty and therefore extension is not possible");
	}
else{
	neocase.form.field("INTERVENTIONS_EN_COURS$VALEUR5").setValue(setEffectiveDate());
	//***MOD-004 *** Need to check for Neocase Function with algo
	fieldDisable("INTERVENTIONS_EN_COURS$VALEUR5");
	//disableField(neocase.form.field("INTERVENTIONS_EN_COURS$VALEUR5"));
	}
	
};
neocase.form.event.bind('loadcomplete', onloadForm);

/****** MOD-004 ++ Changes Starts ******/
/****************************
* Launch Javascript on submit
*****************************/
window.launchOnSubmit = function(){

	console.log("submit event");

	//add control before submit
	checkForm();
};
neocase.form.event.bind("submit",launchOnSubmit);
/****** MOD-004 ++ Changes Ends ******/
