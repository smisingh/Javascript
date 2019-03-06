// JavaScript Document
//FS_GR_BO - Technical field BACKOFFICE
/*************************************
V 1.0 - Initial Version
*************************************/
/*************************************
Developer   - SURAJIT DALAL
Date        - 03/10/2017
Change No   - MOD-01
Description - Initial Create
**************************************************************************
Developer   - Md Shahbaz Khan	
Date	    - 10/30/2017
Change No   - MOD-002
Description - Implementing new Js Framework code
***************************************************************************
Developer   - Smita Singh
Date	    - 01/18/2019
Change No   - MOD-003
Description - Implementing new Js Framework code
***************************************************************************
Developer   - Smita Singh
Date	    - 01/22/2019
Change No   - MOD-004
Description - For topic mass upload,hide all section except mass upload
**************************************/
/**************
 * Hide Sections
 ***************/
//Technical section
neocase.form.section('section418').hide();

/************************************************
 * FUNCTIONS CALLED BY POPUP TO FILL CUSTOM FIELDS
 *************************************************/
FillCf = function(fieldValue, fieldName) {
	var msg = 'function FillCf : ';
	//remove 0 before field number
	if (fieldName.search('VALEUR0') != -1) {
		fieldName = fieldName.replace('VALEUR0', 'VALEUR');
	}
	console.log(fieldName);
	var field = document.getElementById(fieldName);

	if (field) {
		console.log('field id found');
		//fill field
		field.value = fieldValue;
		//alert("fieldName: " + fieldName + "   fieldValue: " + fieldValue);
		champObligatoire(field, false);
		//Exception for field Global Grade
		if (fieldName == 'INTERVENTIONS_EN_COURS$VALEUR239') {
			manageGlobalGrade();
			//Exception for field 'Job Category Code'
		} else if (fieldName == 'INTERVENTIONS_EN_COURS$VALEUR48') {
			//disable other fields
			if (fieldValue == 'CSS' || fieldValue == 'DSP') {
				formulaire.INTERVENTIONS_EN_COURS$VALEUR52.value = '';
				formulaire.INTERVENTIONS_EN_COURS$VALEUR52.disabled = true;
				formulaire.INTERVENTIONS_EN_COURS$VALEUR54.value = '';
				formulaire.INTERVENTIONS_EN_COURS$VALEUR54.disabled = true;
			} else {
				formulaire.INTERVENTIONS_EN_COURS$VALEUR52.disabled = false;
				formulaire.INTERVENTIONS_EN_COURS$VALEUR54.disabled = false;
			}
			//Exception for fields 'Total No. of days / Month'
		} else if (fieldName == 'INTERVENTIONS_EN_COURS$VALEUR265') {
			if (formulaire.INTERVENTIONS_EN_COURS$VALEUR262.value == 'W') {
				//empty field
				field.value = '';
				champObligatoire(field, false);
			}
			//Exception for fields 'Total No. of days / Week'
		} else if (fieldName == 'INTERVENTIONS_EN_COURS$VALEUR266') {
			if (formulaire.INTERVENTIONS_EN_COURS$VALEUR262.value == 'M') {
				//empty field
				field.value = '';
				champObligatoire(field, false);
			}
			//Exception for fields 'Personal Area Desc'
		} else if (fieldName == 'INTERVENTIONS_EN_COURS$VALEUR285') {
			if (formulaire.INTERVENTIONS_EN_COURS$ELEMENT) {
				if (formulaire.INTERVENTIONS_EN_COURS$ELEMENT.value != '2194') {
					//empty field
					//field.value = '';
					champObligatoire(field, false);
				}
			} else {
				msg += 'field subtopic not found or readonly';
				console.log(msg);
			}
		}
	} else {
		msg += 'field ' + fieldName + ' not found';
		console.log(msg);
	}
};

FillCf_Employee_Group_code = function(fieldValue) {
	// formulaire.INTERVENTIONS_EN_COURS$VALEUR363.value = fieldValue;
	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR363').setValue(fieldValue);
};
FillCf_Employee_Group_desc = function(fieldValue) {
	// formulaire.INTERVENTIONS_EN_COURS$VALEUR315.value = fieldValue;
	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR315').setValue(fieldValue);
};
FillCf_Employee_Sub_Group_code = function(fieldValue) {
	// formulaire.INTERVENTIONS_EN_COURS$VALEUR364.value = fieldValue;
	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR364').setValue(fieldValue);
};
FillCf_Employee_Sub_Group_desc = function(fieldValue) {
	// formulaire.INTERVENTIONS_EN_COURS$VALEUR365.value = fieldValue;
	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR365').setValue(fieldValue);
};
/******************************************
 * CREATE HYPERLINK ON LABEL TO OPEN A POPUP
 *******************************************/
window.popupLink = function(field, url) {
	var msg = 'function popupLink : ';
	if (field) {
		//get field label
		var fieldId = field.id;
		var fieldLabel;
		if (fieldId.search('INTERVENTIONS') != -1) {
			fieldLabel = fieldId.replace('INTERVENTIONS', 'lblINTERVENTIONS');
		} else if (fieldId.search('UTILISATEURS') != -1) {
			fieldLabel = fieldId.replace('UTILISATEURS', 'lblUTILISATEURS');
		} else {
			msg += 'type de champ non prit en compte ' + fieldId;
			console.log(msg);
		}
		if (fieldLabel.search('_display') != -1) {
			fieldLabel = fieldLabel.replace('_display', '');
		}
		//add case number in the URL if needed
		if (url.search('Id_Demande') != -1) {
			url = url.replace('Id_Demande=', 'Id_Demande=' + numeroIntervention);
		}
		//add contact ID in the URL if needed
		if (url.search('Id_User') != -1) {
			url = url.replace('Id_User=', 'Id_User=' + CodeUtilisateurBis);
		}
		//Create hyperlink on label
		var onclick = "window.open('" + url + "','_blank')";
		var createPopup = document.createElement('a');
		createPopup.setAttribute('onclick', onclick);
		var popupText = document.getElementById(fieldLabel).innerHTML;
		var t = document.createTextNode(popupText);
		createPopup.appendChild(t);
		if (document.getElementById(fieldLabel).innerHTML.search('</a>') == -1) {
			document.getElementById(fieldLabel).innerHTML = '';
			document.getElementById(fieldLabel).appendChild(createPopup);
		}
	} else {
		msg += 'champ non trouvé';
		console.log(msg);
	}
};
window.UnLinkpopup = function(fieldid) {
	var lblfieldid = 'lbl' + fieldid;
	if (lblfieldid === 'lblINTERVENTIONS_EN_COURS$VALEUR119') {
		document.getElementById(lblfieldid).innerHTML = 'Personnel Area description';
	}
	if (lblfieldid === 'lblINTERVENTIONS_EN_COURS$VALEUR122') {
		document.getElementById(lblfieldid).innerHTML = 'Personnel sub area description';
	}
};


/**************************************************
Fields containing hyperlinks
*********************************************/

window.popupLinkFunction = function() {
	if (neocase.form.field('ELEMENTS').getText() === 'Company change (Light countries)') {
	popupLink(document.getElementById("INTERVENTIONS_EN_COURS$VALEUR285"), "/Custom_Referential/PersonalArea.aspx?Id_User=");
	}
	//Contract Details - Contract Type
	popupLink(document.getElementById('INTERVENTIONS_EN_COURS$VALEUR291'), '/Custom_Referential/ContratType.aspx?Id_User=');
	//Contract Details - Employee Notice
	popupLink(document.getElementById('INTERVENTIONS_EN_COURS$VALEUR293'), '/Custom_Referential/NoticePeriod.aspx?Id_User=');
	//Employee Group SubGroup
	popupLink(document.getElementById('INTERVENTIONS_EN_COURS$VALEUR315'),'/Custom_Referential/EmployeeGroup.aspx?Id_User=');
	//Grades
	popupLink(document.getElementById('INTERVENTIONS_EN_COURS$VALEUR41'), '/Custom_Referential/Grade.aspx?Id_User=');
	//Company Change
	//popupLink(document.getElementById('INTERVENTIONS_EN_COURS$VALEUR17'),'/Custom_Referential/PU.aspx?Id_Demande=&Id_User=');
	popupLink(document.getElementById('INTERVENTIONS_EN_COURS$VALEUR17'),"/Custom_Referential/PU.aspx?Id_User=&Id_Demande=");

};
/********************************
 * DISABLE and ENABLE FIELDS
 ********************************/
window.disableField = function(field) {
	var msg = 'function disableField : ';
	if (field) {
		field.onkeydown = function() {
			return false;
		};
	} else {
		msg += 'field undefined or readonly';
		console.log(msg);
	}
};
window.enableField = function(field) {
	var msg = 'function disableField : ';
	if (field) {
		field.onkeydown = function() {
			return true;
		};
	} else {
		msg += 'field undefined or readonly';
		console.log(msg);
	}
};


window.disableFields = function() {
	//Grade
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR41);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR239);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR240);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR234);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR236);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR237);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR241);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR242);
	
	//Work Location
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR284);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR285);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR123);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR121);
	
	//Cost Center
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR15);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR17);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR231);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR232);
	
	//Contract Detail - Contract type
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR290);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR291);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR310);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR311);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR292);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR293);

	//EE Group-Subgroup
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR363);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR315);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR364);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR365);
};


/********************************* start Mod-004 ************************************************/
 window.hideAllSection = function() {
	neocase.form.section('section267').hide(); //Effective date
	//neocase.form.section('section604').hide(); //Job
	neocase.form.section('section965').hide(); //Pay
	neocase.form.section('section533').hide(); //Work Location
	neocase.form.section('section365').hide(); //Fixed Term Contract
	//neocase.form.section('section102').hide(); //Probation Update
	//neocase.form.section('section970').hide(); //Management Team
	neocase.form.section('section786').hide(); //Contract
	neocase.form.section('section258').hide(); //EE Group-Subgroup
	neocase.form.section('section379').hide(); //Grade
	neocase.form.section('section2505e1d2b7faabcdab0f').hide(); //Cost center
	//neocase.form.section('section71c805d9d30258ead277').hide(); //Confirmed Leaving dates
	//neocase.form.section('section60ceec25b46ed23641b9').hide(); //Resignation info
	neocase.form.section('section98f0dbc4bb8566749a27').hide(); //Mass Upload
	neocase.form.section('section3e5b76a8413b1f928001').hide(); //Working Hours
};


window.showSectionSubtopicCompanyChange = function() {
	neocase.form.section('section267').show(); //Effective date
	neocase.form.section('section533').show(); //Base Location
	neocase.form.section('section2505e1d2b7faabcdab0f').show(); // Cost Centre
};

window.showSectionSubtopicContractChange = function() {
	neocase.form.section('section267').show(); //Effective date
	neocase.form.section('section786').show(); // Contract Details
	neocase.form.section('section3e5b76a8413b1f928001').show(); // Working hours
	neocase.form.section('section258').show(); // Employee Group Subgroup - Back Office Only !
};

window.showSectionSubtopicCostCenterChange = function() {
	neocase.form.section('section267').show(); //Effective date
	neocase.form.section('section2505e1d2b7faabcdab0f').show(); // Cost Centre
};

window.showSectionSubtopicFixedTermContractExtension = function() {
	neocase.form.section('section267').show(); //Effective date
	neocase.form.section('section365').show(); // Fixed Term Contract
};

window.showSectionSubtopicGradeJobChange = function() {
	neocase.form.section('section267').show(); //Effective date
	//neocase.form.section('section604').show(); //Job
	neocase.form.section('section379').show(); //Grade
};

window.showSectionSubtopicPayChange = function() {
	neocase.form.section('section267').show(); //Effective date
	neocase.form.section('section965').show(); // Pay
};

window.showSectionSubtopicPromotionDemotion = function() {
	neocase.form.section('section267').show(); //Effective date
	neocase.form.section('section379').show(); // Grades
	neocase.form.section('section965').show(); // Pay
};

window.showSectionSubtopicWorkLocationTransfer = function() {
	neocase.form.section('section267').show(); //Effective date
	neocase.form.section('section533').show(); // Base Location
};

window.showSectionSubtopicManagement = function() {
	neocase.form.section('section267').show(); //Effective date
	//neocase.form.section('section970').show(); //Management Team
};

window.showSectionSubtopicOtherRequest = function() {
	neocase.form.section('section267').show(); //Effective date
};

window.showSectionSubtopicEndFixedTermContract = function() {
	neocase.form.section('section365').show(); //Fixed Term Contract
	//neocase.form.section('section71c805d9d30258ead277').show(); //Confirmed Leaving dates
	//neocase.form.section('section60ceec25b46ed23641b9').show(); //Resignation info
};
window.showSectionSubtopicRetirement = function() {
	//neocase.form.section('section71c805d9d30258ead277').show(); //Confirmed Leaving dates
};

window.showSectionSubtopicVoluntaryLeave = function() {
	//neocase.form.section('section71c805d9d30258ead277').show(); //Confirmed Leaving dates
	//neocase.form.section('section60ceec25b46ed23641b9').show(); //Resignation info
};

window.showSectionSubtopicProbationUpdate = function() {
	//neocase.form.section('section102').show(); //Provation Update
};

window.showSectionSubtopicInvoluntery = function() {
	//neocase.form.section('section71c805d9d30258ead277').show(); //Confirmed Leaving Date
};

window.showSectionMassUpload = function() {
	neocase.form.section('section98f0dbc4bb8566749a27').show(); //Mass upload
};

window.showSectionEffectiveDate = function() {
	neocase.form.section('section267').show(); //Effective date
};

window.manageSections = function() {
	hideAllSection();

	var topic = neocase.form.field('MOTSCLES').getValue();
	var selectedSubtopicValue = neocase.form.field('ELEMENTS').getValue();

	if (topic == '2237') {
			//EDC topic
		if (selectedSubtopicValue == '2238') {
			// Company change
			showSectionSubtopicCompanyChange();
		}
		if (selectedSubtopicValue == '2147') {
			// Contract change
			showSectionSubtopicContractChange();
		}
		/*if (selectedSubtopicValue == '2146') {
			// Cost center change
			showSectionSubtopicCostCenterChange();
		}*/
		if (selectedSubtopicValue == '2167') {
			// Fixed term contract extension
			showSectionSubtopicFixedTermContractExtension();
		}
		if (selectedSubtopicValue == '2251') {
			// Grade / Job change
			showSectionSubtopicGradeJobChange();
		}
		if (selectedSubtopicValue == '2144') {
			// Pay change
			showSectionSubtopicPayChange();
		}
		if (selectedSubtopicValue == '2196') {
			// Promotion/demotion
			showSectionSubtopicPromotionDemotion();
		}
		// if (selectedSubtopicValue == '2250') {
			// // Work location transfer
			// showSectionSubtopicWorkLocationTransfer();
		// }
		// if (selectedSubtopicValue == '2169') {
			// // Only Management Section
			// showSectionSubtopicManagement();
		// }
	}
	if (topic == '2209') {
		//Mass upload topic
		showSectionMassUpload();
	}

	if (topic == '2113') {
		//Hire/Rehire topic
		showSectionEffectiveDate();
	}
};



/*************************
 * ACTIONS ON LOAD COMPLETE
 **************************/
window.onloadForm = function() {
		
	//DISABLE FIELDS
	disableFields();
	
	//Call popup function
	popupLinkFunction();
	
	//Manage all sections
	manageSections();
	
};

neocase.form.event.bind('loadcomplete', onloadForm);
