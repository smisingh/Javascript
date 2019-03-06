/************************************************************************
MA RETURN LOA BO
*************************
Initial version - 1.0
***************************************************************************************************
Modified version - 1.1
Developer Name: Smita Singh
Date: 25/05/2017
Description: To modify the code to manage subtopic with Assignmnet status code and description
**************************************************************************************************

*************************************
Developer   - Leconte Romain
Date	    - 29/06/2017
Change No   - MOD-002
Description - Changed value to code for jobCode function
**************************************/

/**************
* Hide Sections
***************/
//Technical section
ThisForm.HideSection("section893");


/******************************************
* CREATE HYPERLINK ON LABEL TO OPEN A POPUP
*******************************************/
window.popupLink = function(field, url){
	var msg = "function popupLink : ";
	if(field){
		//get field label
		var fieldId = field.id;
		var fieldLabel;
		if(fieldId.search("INTERVENTIONS") != -1){
			fieldLabel = fieldId.replace("INTERVENTIONS","lblINTERVENTIONS");
		}else if(fieldId.search("UTILISATEURS") != -1){
			fieldLabel = fieldId.replace("UTILISATEURS","lblUTILISATEURS");
		}else{
			msg += "type de champ non prit en compte "+fieldId;
			console.log(msg);
		}
		if(fieldLabel.search("_display") != -1){
			fieldLabel = fieldLabel.replace("_display","");
		}
		//add case number in the URL if needed
		if(url.search("Id_Demande") != -1){
			url = url.replace("Id_Demande=","Id_Demande="+numeroIntervention);
		}
		//add contact ID in the URL if needed
		if(url.search("Id_User") != -1){
			url = url.replace("Id_User=","Id_User="+CodeUtilisateurBis);
		}
		//Create hyperlink on label
		var onclick = "window.open('"+url+"','_blank')";
		var createPopup = document.createElement("a");
		createPopup.setAttribute("onclick",onclick);
		var popupText = document.getElementById(fieldLabel).innerHTML;
		var t = document.createTextNode(popupText);
		createPopup.appendChild(t);
		if(document.getElementById(fieldLabel).innerHTML.search("</a>") == -1){
			document.getElementById(fieldLabel).innerHTML = "";
			document.getElementById(fieldLabel).appendChild(createPopup);
		}
	}else{
		msg += "champ non trouvé";
		console.log(msg);
	}
};

/************************************************
* FUNCTIONS CALLED BY POPUP TO FILL CUSTOM FIELDS
*************************************************/
FillCf = function(fieldValue,fieldName){
	var msg = "function FillCf : ";
	//remove 0 before field number
	if(fieldName.search("VALEUR0") != -1){
		fieldName = fieldName.replace("VALEUR0","VALEUR");
	}
	console.log(fieldName);
	var field = document.getElementById(fieldName);
	if(field){
		console.log("field id found");
		//fill field
		field.value = fieldValue;
		champObligatoire(field, false);
		//Exception for field Global Grade
		if(fieldName == "INTERVENTIONS_EN_COURS$VALEUR239"){
			manageGlobalGrade();
		//Exception for field 'Job Category Code'
		}else if(fieldName == "INTERVENTIONS_EN_COURS$VALEUR48"){
			//disable other fields
			if(fieldValue == "CSS" || fieldValue == "DSP"){
				formulaire.INTERVENTIONS_EN_COURS$VALEUR52.value = "";
				formulaire.INTERVENTIONS_EN_COURS$VALEUR52.disabled = true;
				formulaire.INTERVENTIONS_EN_COURS$VALEUR54.value = "";
				formulaire.INTERVENTIONS_EN_COURS$VALEUR54.disabled = true;
			}else{
				formulaire.INTERVENTIONS_EN_COURS$VALEUR52.disabled = false;
				formulaire.INTERVENTIONS_EN_COURS$VALEUR54.disabled = false;
			}
		//Exception for fields 'Total No. of days / Month'
		}else if(fieldName == "INTERVENTIONS_EN_COURS$VALEUR265"){
			if(formulaire.INTERVENTIONS_EN_COURS$VALEUR262.value == "weekly"){
				//empty field
				field.value = "";
				champObligatoire(field, false);
			}
		//Exception for fields 'Total No. of days / Week'
		}else if(fieldName == "INTERVENTIONS_EN_COURS$VALEUR266"){
			if(formulaire.INTERVENTIONS_EN_COURS$VALEUR262.value == "monthly"){
				//empty field
				field.value = "";
				champObligatoire(field, false);
			}
		//Exception for fields 'Personal Area Desc'
		}else if(fieldName == "INTERVENTIONS_EN_COURS$VALEUR285"){
			if(formulaire.INTERVENTIONS_EN_COURS$ELEMENT){
				if(formulaire.INTERVENTIONS_EN_COURS$ELEMENT.value != "2194"){
					//empty field
					field.value = "";
					champObligatoire(field, false);
				}
			}else{
				msg += "field subtopic not found or readonly";
				console.log(msg);
			}
		}
	}else{
		msg += "field "+fieldName+" not found";
		console.log(msg);
	}
};
//Action reason
FillCf_type_code = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR1.value = fieldValue;
};
FillCf_type_name = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR2.value = fieldValue;
};
FillCf_reason_code = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR3.value = fieldValue;
};
FillCf_reason_name = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR4.value = fieldValue;
};

/***************
* DISABLE FIELDS
****************/
window.disableField = function(field){
	var msg = "function disableField : ";
	if(field){
		field.onkeydown = function(){return false;};
	}else{
		msg += "field undefined or readonly";
		console.log(msg);
	}
};

	
/***************
* DISABLE FIELDS
****************/
window.disableFields = function(){
	//Action Reason
	formulaire.INTERVENTIONS_EN_COURS$VALEUR1.onkeydown = function(){return false;};
	formulaire.INTERVENTIONS_EN_COURS$VALEUR2.onkeydown = function(){return false;};
	formulaire.INTERVENTIONS_EN_COURS$VALEUR3.onkeydown = function(){return false;};
	formulaire.INTERVENTIONS_EN_COURS$VALEUR4.onkeydown = function(){return false;};

};

/************************
* Manage Payroll Status
**************************

window.payrollStatus = function(){
	var msg = "function payrollStatus: ";
	var subTopic = formulaire.INTERVENTIONS_EN_COURS$ELEMENT;
	var payroll = formulaire.INTERVENTIONS_EN_COURS$VALEUR338;

	if(subTopic){
		if(payroll){
			if(subTopic.value == "2208" || subTopic.value == "2202" || subTopic.value == "2121" || 
			subTopic.value == "2220" || subTopic.value == "2256" || subTopic.value == "2255"){
				payroll.value = "290|LOA Unpaid";
				payroll.readonly=true;
			} 
			else if(subTopic.value == "2127" || subTopic.value == "2210" ||	subTopic.value == "2211" || subTopic.value == "2212" ||
			subTopic.value == "2213" || subTopic.value == "2114" || subTopic.value == "2215" || 
			subTopic.value == "2216" || subTopic.value == "2217" || subTopic.value == "2118" ||
			subTopic.value == "2219" || subTopic.value == "2220" || subTopic.value == "2225"){
			payroll.value= "288|LOA Unpaid";
			payroll.readonly=true;
				} 
		}else{
		msg += "payroll not found";
		console.log(msg);
		}
		
	}else{
	msg += "subtopic not found";
		console.log(msg);
	}
};


****************************************
* Manage Assignment status code and Desc
*******************************************/
window.assignmentCodeAndDesc = function(){
	var msg = "function Assignment code and Desc change: ";
	var subTopic = formulaire.INTERVENTIONS_EN_COURS$ELEMENT;
	var assignCode = formulaire.INTERVENTIONS_EN_COURS$VALEUR339;
	var assignDesc = formulaire.INTERVENTIONS_EN_COURS$VALEUR340;

	if(subTopic){
		if(assignCode){
			if(assignDesc){
			/****************************** Begin Modifed version 1.1 ****************************************/
						if(subTopic.value == "2221"){ //Return from LOA
						//assignCode.value = "389|27";
						$(assignCode).find('option[code*=301]').prop('selected',true); //to set code 00
						//assignDesc.value = "495|Longterm Sickness";
						$(assignDesc).find('option[code*=454]').prop('selected',true); //to set code to not applicable
			
			/****************************** end Modifed version 1.1 ****************************************/			
						
			}else{
			msg += "assignment Desc not found";
			console.log(msg);
			}
		}else{
		msg += "assignment status code not found";
		console.log(msg);
		}
	}else{
	msg += "subtopic not found";
	console.log(msg);
	}
	}
};

/* ACTIONS ON LOAD COMPLETE
**************************/
window.onloadForm = function(){
	//CREATE POP-UPS LINKS
	//Action Code
	popupLink(formulaire.INTERVENTIONS_EN_COURS$VALEUR3,"/Custom_Referential/ActionsCode.aspx?Id_User=");
	
	//Disable fields
	disableFields();
	
	//Manage payroll Status value
	//payrollStatus();
	
	//Manage Assignment Status Code and Description
	assignmentCodeAndDesc();
	
};
ThisForm.Bind('loadcomplete', onloadForm);
