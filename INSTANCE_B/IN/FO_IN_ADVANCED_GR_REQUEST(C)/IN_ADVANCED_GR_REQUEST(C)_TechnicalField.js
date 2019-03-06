// JavaScript Document
/**************IN_ADVANCED_GR_REQUEST(C) **********
Version - MOD-001
Author - Smita Singh
Creation Date - 25/07/2017
Description - France plan B 
**********************************************************************
Version - MOD-002
Author - Md Shahbaz Khan	
Creation Date - 21/09/2017
Description - Hiding Concerned Employee Details Section for all pages
              other than manager pages.
**********************************************************************
Version - MOD-003
Author - Smita Singh	
Creation Date - 25/09/2017
Description - alert with right field name			  
**********************************************************************
Version - MOD-004
Author - Riya Dutta	
Creation Date - 12/11/2018 (MM/DD/YYYY)
Description - pop-up missing fields erro twice issue 		  
**********************************************************************
Version - MOD-005
Author - Riya Dutta	
Creation Date - 01/02/2019 (MM/DD/YYYY)
Description - Upgrading to New JS Framework (//need update)
**********************************************************************/

//Hide Technical section
neocase.form.section("section744").hide();

/***********************MOD-005 -- ****************************
//Check if neocase namespace already exist. If not it's create.
//need update MOD-005
if(typeof Neocase == "undefined"){
	Type.registerNamespace('Neocase');
}
//function which allow to execute a function before another one
//need update MOD-005
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
*****************************MOD-005 -- **************************/

/**************************************
* UPDATE MANDATORY FIELDS ALERT MESSAGE
***************************************/
//custom function
/************************* MOD-005 Changes Starts *****************************/
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
//Neocase.attachBefore(window, 'ValidatorAlertRequiredFieldsOnSubmit', function(){return Neocase.checkForm();});  //MOD-005 --
/********************************** MOD-005 Changes Ends ***********************************************************************/

window.getParamFromUrl = function(param){

var vars = {};
  window.location.href.replace( location.hash, '' ).replace( 
    /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
    function( m, key, value ) { // callback
      vars[key] = value !== undefined ? value : '';
    }
  );

  if ( param ) {
    return vars[param] ? vars[param] : null;  
  }
  return vars;

};


/****************************
* AUTOMATICALLY FILL SUBTOPIC
*****************************/
window.manageSubtopic = function(){
var msg = "function manageSubtopic : ";
	//need update MOD-005
	var getSubtopic = localStorage.getItem('subtopic');
	var field = formulaire.INTERVENTIONS_EN_COURS$ELEMENT;
	
	//if(field.value != "0"){
	var subtopic = getParamFromUrl('subtopic');
		if(subtopic){
			if(field){
				if (field.value === '0') {
					//When subtopic is present in URL - hiding subtopic dropdown field
					neocase.form.field('INTERVENTIONS_EN_COURS$ELEMENT').hide();
					field.value = subtopic;
					var fieldEvent = document.createEvent("HTMLEvents");
					fieldEvent.initEvent("change", false, true);
					field.dispatchEvent(fieldEvent);
				}

			}else{
				msg += "field undefined";
				console.log(msg);
			}
		}else{
			//When subtopic absent in URL - hiding single subtopic field
			neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR204').hide();
			msg += subtopic + " undefined";
			console.log(msg);
		}
};

//Manage fields
window.manageFields = function(){
neocase.form.field('INTERVENTIONS_EN_COURS$TYPE').hide();
neocase.form.field('INTERVENTIONS_EN_COURS$DELAI').hide();
};

//Function Added as a part of MOD-002
//Manage Visiblity of Concerned Employee Section
window.manageSection_EmployeeDetails = function(){

//Hide When employee tries to create a request for itself.
//Show when employee tries to create a request on behalf of someone.

var pageId = getParamFromUrl('PageId');

if(pageId != '1456'){

//Hide Technical section
neocase.form.section("section2f563c377cabff64c477").hide();

}


};



/*************************
* ACTIONS ON LOAD COMPLETE
**************************/
window.onloadForm = function(){
	
	//Manage subtopic
	manageSubtopic();
	manageFields();
	
	//Manage Visiblity of Concerned Employee Section
	manageSection_EmployeeDetails(); // MOD-002++ 
	
	//COPY/PASTE TOPIC&SUBTOPIC VALUE
	
	var topic = neocase.form.field('INTERVENTIONS_EN_COURS$MOTCLE').getText();
	var subtopic = neocase.form.field('INTERVENTIONS_EN_COURS$ELEMENT').getText();
	
	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR203').setValue(topic);
	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR204').setValue(subtopic);
	
	//neocase.form.field('INTERVENTIONS_EN_COURS$MOTCLE').copyValueTo('INTERVENTIONS_EN_COURS$VALEUR203');
	//neocase.form.field('INTERVENTIONS_EN_COURS$ELEMENT').copyValueTo('INTERVENTIONS_EN_COURS$VALEUR204');
	
	
};
neocase.form.event.bind('loadcomplete', onloadForm);

/****** MOD-005 ++ Changes Starts ******/
/****************************
* Launch Javascript on submit
*****************************/
window.launchOnSubmit = function(){

	console.log("submit event");

	//add control before submit
	checkForm();
};
neocase.form.event.bind("submit",launchOnSubmit);
/****** MOD-005 ++ Changes Ends ******/
