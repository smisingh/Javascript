/**************		UK EDC STEP 3 (M) FO Technical Fields	*************
******************************************************************/


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


// window.checkSectionDisplay = function (sectionID) {
//     document.getElementById(sectionID).style.display = "block";
// };


// window.displaySectionSpecific = function () {
//     var interElement = document.getElementById('ctl04_ctl07_ctl00_ctl00_INTERVENTIONS_EN_COURS_ELEMENT');
    // switch (typeof interElement !== undefined && interElement !== null) {
    //     case interElement.innerHTML === 'Cost Centre (PU)':
    //         checkSectionDisplay("section666");
    //         checkSectionDisplay("section136");
    //         checkSectionDisplay("section921");
    //         checkSectionDisplay("section579");
    //         checkSectionDisplay("section867");
    //         break;
    //     case interElement.innerHTML === 'Job':
    //         checkSectionDisplay("section579");
    //         break;
    //     case interElement.innerHTML === 'Working hours':
    //         checkSectionDisplay("section813");
    //         break;
    //     case interElement.innerHTML === 'Work Location':
    //         checkSectionDisplay("section832");
    //         break;
    //     case interElement.innerHTML === 'Fixed Term Contract Extension':
    //         checkSectionDisplay("section292");
    //         break;
    //     case interElement.innerHTML === 'Probation period extension':
    //         checkSectionDisplay("section842");
    //         break;
    //     case interElement.innerHTML === 'Management Team':
    //         checkSectionDisplay("section867");
    //     }
// };

// window.checkSectionHide = function (sectionID) {

//     var hideAnswersSection = document.getElementsByClassName('answers');
//     if (typeof hideAnswersSection !== undefined && hideAnswersSection !== null) {
//         if (typeof document.getElementById(sectionID) !== undefined && document.getElementById(sectionID) !== null) {
//             document.getElementById(sectionID).style.display = "none";
//         }
//     }

//     displaySectionSpecific();
// };

// checkSectionHide("section666");
// checkSectionHide("section217");
// checkSectionHide("section136");
// checkSectionHide("section921");
// checkSectionHide("section579");
// checkSectionHide("section813");
// checkSectionHide("section832");
// checkSectionHide("section292");
// checkSectionHide("section842");
// checkSectionHide("section867");
// checkSectionHide("section754");
// checkSectionHide("section955");
// checkSectionHide("section993");
// checkSectionHide("section28");
// checkSectionHide("section83");

