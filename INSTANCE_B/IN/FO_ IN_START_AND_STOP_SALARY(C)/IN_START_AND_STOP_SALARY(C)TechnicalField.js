// JavaScript Document
/************** IN_START_AND_STOP_SALARY(C) **********
Version - Initial
Author - Smita Singh
Creation Date - 25/07/2017
Description - France plan B 
******************************************************************
Version - MOD-001
Author - MD SHAHBAZ KHAN
Creation Date - 14/11/2017
Description - Implementing Javascript for requirement described
			  in behavior column of W4 Design
******************************************************************
Version - MOD-002
Author - Riya Dutta
Creation Date - 12/26/2018 (MM/DD/YYYY)
Description - 1)Change checkForm function for pop-up alert missing field issue			  
******************************************************************
Version - MOD-003
Author - Riya Dutta	
Creation Date - 01/04/2019 (MM/DD/YYYY)
Description - Upgrading to New JS Framework (//need update)
**********************************************************************/

var consDisciplinaryAction = "S5";
var consOthers = "S6";

//Hide Technical section
neocase.form.section("section744").hide();

/***********************MOD-003 -- ****************************
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
*****************************MOD-003 -- **************************/

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
//Neocase.attachBefore(window, 'ValidatorAlertRequiredFieldsOnSubmit', function(){return Neocase.checkForm();});
/********************************** MOD-003 Changes Ends ****************************************************************/

window.fieldDisable = function(fieldname)
{					
		var disabler = '<div class="customDisabled" style="position:absolute;top:0;z-index:1000;width: 100%;height: 100%;"></div>';
		var fieldToDisable = neocase.form.field(fieldname).elementHTML;
		$(fieldToDisable).parent().parent().append(disabler);
};

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
window.manageSubtopic = function() {
    var msg = "function manageSubtopic : ";
    var field = neocase.form.field("INTERVENTIONS_EN_COURS$ELEMENT").elementHTML;

    var subtopic = getParamFromUrl('subtopic');
    if (subtopic) {
        if (field) {
            field.value = subtopic;
        } else {
            msg += "field undefined";
            console.log(msg);
        }
    } else {
		
        msg += subtopic + " undefined";
        console.log(msg);
    }
	
	disableField(neocase.form.field("INTERVENTIONS_EN_COURS$ELEMENT"));

};

window.hideBlock = function(sectionTitleField, blockField)
{
	neocase.form.section(sectionTitleField).hide();
	$("."+blockField).eq(0).hide();
	neocase.form.field("question").setValue("  ");
	var blockComment = neocase.form.field("question").elementHTML;
	$(blockComment).trigger("change");
	
};

window.showBlock = function(sectionTitleField, blockField)
{	
	neocase.form.section(sectionTitleField).show();	
	$("."+blockField).eq(0).show();
	neocase.form.field("question").setValue("");
	var blockComment = neocase.form.field("question").elementHTML;
	$(blockComment).trigger("change");
};

window.manageSection_EmployeeDetails = function(){

//Hide Stop Payment Section when [Current Stop Payment Reason] is disability or others
//Hide Start Payment Section when [Current Stop Payment Reason] is blank

var currentSPR = neocase.form.field("UTILISATEURS_CHAMPU318").getValue();
//var currentSPR = neocase.form.field("UTILISATEURS_CHAMPU16").getValue();
var currSbtopic = getParamFromUrl("subtopic");

//First Hide Stop Payment Section
neocase.form.section("section0adf1b63b11dd89f2b5d").hide();	
//First Hide Start Payment Section
neocase.form.section("section398c74bad756be896fb3").hide();
//Hide Error Message Section
neocase.form.section("sectioncf4506e084b34c34bcbb").hide();
//Hide comment Block
hideBlock("sectionfc92b8ae094cd7751825","mix-caseForm-bloc-question");
//Remove previous section display error message
$("#secErrorMessage").remove();
//Enable Submit button if it was previously disabled
$(".submitSimpleRequestButton").eq(0).removeAttr('disabled');

switch(currSbtopic) {
    case '2366': //Stop Payment
        if( currentSPR == "" ){		
			//Show Stop Payment Section
			neocase.form.section("section0adf1b63b11dd89f2b5d").show();	
			//Auto Populate Stop Payment date with 1st day of next month
			neocase.form.field("INTERVENTIONS_EN_COURS$VALEUR367").setValue(getNextMontthFirstDate());
			//Triggering Change event manually so that attached validations work
			$(neocase.form.field("INTERVENTIONS_EN_COURS$VALEUR367").elementHTML).trigger("change");
			//Disable Stop payment date field
			fieldDisable("INTERVENTIONS_EN_COURS$VALEUR367");
			var spr = neocase.form.field("INTERVENTIONS_EN_COURS$VALEUR366").getValue();
			if(spr === consOthers)
			{
			showBlock("sectionfc92b8ae094cd7751825","mix-caseForm-bloc-question");
			}

		}
		else
		{
				neocase.form.section("sectioncf4506e084b34c34bcbb").show();
				$("#sectioncf4506e084b34c34bcbb").append("<br/><span id='secErrorMessage' style='font-size:20px; color:red;' >We cannot process your request, Payment is already stopped earlier.</span>");
				$(".submitSimpleRequestButton").eq(0).attr("disabled", "disabled");
		}
        break;
    case '2369': //Start Payment
       if( currentSPR != "" ){
			if ( currentSPR === consDisciplinaryAction || currentSPR === consOthers)
			{
				//Show Start Payment Section
				neocase.form.section("section398c74bad756be896fb3").show();
				//Start Payment date should be indetical to Stop payment date
				neocase.form.field("UTILISATEURS$CHAMPU320").copyValueTo("INTERVENTIONS_EN_COURS$VALEUR368");				
				neocase.form.field("INTERVENTIONS_EN_COURS$VALEUR369").noMandatory();
				//Disable Start payment date field
				fieldDisable("INTERVENTIONS_EN_COURS$VALEUR368");
				
				if(currentSPR === consDisciplinaryAction)
				{
					neocase.form.field("INTERVENTIONS_EN_COURS$VALEUR370").setValue("P6");
				}
				else
				{
					neocase.form.field("INTERVENTIONS_EN_COURS$VALEUR370").setValue("P7");
				}
				
			}
			else
			{
				neocase.form.section("sectioncf4506e084b34c34bcbb").show();
				$("#sectioncf4506e084b34c34bcbb").append("<br/><span id='secErrorMessage' style='font-size:20px; color:red;' >Payment was not stopped via Neocase, so you cannot re-start it here either.</span>");
				$(".submitSimpleRequestButton").eq(0).attr("disabled", "disabled");
			}
		}
		else
		{
			neocase.form.section("sectioncf4506e084b34c34bcbb").show();
			$("#sectioncf4506e084b34c34bcbb").append("<br/><span id='secErrorMessage' style='font-size:20px; color:red;' >Payment is not stopped so cannot be restarted</span>");
			$(".submitSimpleRequestButton").eq(0).attr("disabled", "disabled");
		}
		
        break;
    default:
		neocase.form.section("sectioncf4506e084b34c34bcbb").show();
		$("#sectioncf4506e084b34c34bcbb").append("<br/><span id='secErrorMessage' style='font-size:20px; color:red;' >No valid subtopic is selected</span>");
		$(".submitSimpleRequestButton").eq(0).attr("disabled", "disabled");
}




};

window.manageFields = function()
{
	neocase.form.field("UTILISATEURS$CHAMPU318").hide();
	neocase.form.field("INTERVENTIONS_EN_COURS$VALEUR370").hide();
	neocase.form.field("INTERVENTIONS_EN_COURS$VALEUR366").hide();
};

window.getNextMontthFirstDate = function()
{
	var today = new Date();
	var mm = today.getMonth()+1; //January is 0!
	var nextMonth = mm+1;
	var yyyy = today.getFullYear();
	
	if(nextMonth>12)
	{
		nextMonth = nextMonth - 12; //Year has only 12 month
		yyyy = yyyy+1;
	}

	var firstDayNextMonth = nextMonth+'/1/'+yyyy;
	
	return firstDayNextMonth;
};

//Stop Payment Reason desc to code
window.stopPaymentReasonDescToCode = function(){
	//Définition des variables
	var msg = "fonction stopPaymentReasonDescToCode : ";
	var stopPaymentReasonCode = formulaire.INTERVENTIONS_EN_COURS$VALEUR366;
	var stopPaymentReasonDesc = formulaire.INTERVENTIONS_EN_COURS$VALEUR369;
	if(stopPaymentReasonCode){
		if(stopPaymentReasonDesc){
			
			
		
			var stopPaymentReasonDescValue = stopPaymentReasonDesc.options[stopPaymentReasonDesc.selectedIndex].getAttribute('code');
			
			switch(stopPaymentReasonDescValue) {
			case "539": //Modalité 1 (35 h)
				$(stopPaymentReasonCode).find('option[code*=537]').prop('selected',true); //M1.1
				break;
			case "540": //Modalité 1 (39 h)
				$(stopPaymentReasonCode).find('option[code*=538]').prop('selected',true); //M1.2
				break;
			default:
				stopPaymentReasonCode.value="";
				break;
			}	
				
		
		}else{
			msg += "var stopPaymentReasonDesc (formulaire.INTERVENTIONS_EN_COURS$VALEUR366) non trouvée > champ absent ou non chargé";
			console.log(msg);
		}
	}else{
		msg += "var stopPaymentReasonCode (formulaire.INTERVENTIONS_EN_COURS$VALEUR367) non trouvée > champ absent ou non chargé";
		console.log(msg);
	}
};
//********** End of MOD-001++ ****************************


/*************************
* ACTIONS ON LOAD COMPLETE
**************************/
window.onloadForm = function(){	
	//Manage Visiblity of Concerned Employee Section
	manageSection_EmployeeDetails();	
	//manage fields
	manageFields();	
	//Populate subtopic in dropdown from URL
	manageSubtopic();	
};

neocase.form.event.bind('init', onloadForm);

/****** MOD-003 ++ Changes Starts ******/
/****************************
* Launch Javascript on submit
*****************************/
window.launchOnSubmit = function(){

	console.log("submit event");

	//add control before submit
	checkForm();
};
neocase.form.event.bind("submit",launchOnSubmit);
/****** MOD-003 ++ Changes Ends ******/
