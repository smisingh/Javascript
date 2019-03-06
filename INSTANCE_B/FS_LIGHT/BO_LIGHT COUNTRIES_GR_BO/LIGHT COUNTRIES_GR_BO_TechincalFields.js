// JavaScript Document
//FS_EDC - Technical field BACKOFFICE
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
**************************************/
/**************
 * Hide Sections
 ***************/
//Technical section
neocase.form.section('section418').hide();

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
					field.value = '';
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

//Action reason
FillCf_type_code = function(fieldValue) {
	//formulaire.INTERVENTIONS_EN_COURS$VALEUR1.value = fieldValue; // MOD-002--
	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR1').setValue(fieldValue); // MOD-002++
};
FillCf_type_name = function(fieldValue) {
	// formulaire.INTERVENTIONS_EN_COURS$VALEUR2.value = fieldValue;
	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR2').setValue(fieldValue); // MOD-002++
};
FillCf_reason_code = function(fieldValue) {
	// formulaire.INTERVENTIONS_EN_COURS$VALEUR3.value = fieldValue;
	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR3').setValue(fieldValue); // MOD-002++
};
FillCf_reason_name = function(fieldValue) {
	// formulaire.INTERVENTIONS_EN_COURS$VALEUR4.value = fieldValue;
	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR4').setValue(fieldValue); // MOD-002++
};

//job name
FillCf_Job_code = function(fieldValue) {
	// formulaire.INTERVENTIONS_EN_COURS$VALEUR44.value = fieldValue;
	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR44').setValue(fieldValue); // MOD-002++
};
FillCf_Job_Desc = function(fieldValue) {
	// formulaire.INTERVENTIONS_EN_COURS$VALEUR46.value = fieldValue;
	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR46').setValue(fieldValue); // MOD-002++
};
FillCf_Job_Catg = function(fieldValue) {
	//fill field
	// formulaire.INTERVENTIONS_EN_COURS$VALEUR48.value = fieldValue;
	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR48').setValue(fieldValue); // MOD-002++
	//disable other fields
	if (neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR48').getValue() == 'CSS' || neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR48').getValue() == 'DSP') {
		neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR52').setValue('');
		neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR1').setValue(fieldValue); // MOD-002++
		neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR52').elementHTML.disabled = true;
		neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR54').setValue('');
		neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR1').setValue(fieldValue); // MOD-002++
		neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR54').elementHTML.disabled = true;
	} else {
		neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR52').elementHTML.disabled = false;
		neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR54').elementHTML.disabled = false;
	}
};
FillCf_Job_Catg_Desc = function(fieldValue) {
	// formulaire.INTERVENTIONS_EN_COURS$VALEUR50.value = fieldValue;
	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR50').setValue(fieldValue); // MOD-002++
};

//Organization detail - Community
FillCf_CommunityCode = function(fieldValue) {
	// formulaire.INTERVENTIONS_EN_COURS$VALEUR33.value = fieldValue;
	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR33').setValue(fieldValue);
};
FillCf_CommunityDescription = function(fieldValue) {
	// formulaire.INTERVENTIONS_EN_COURS$VALEUR35.value = fieldValue;
	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR35').setValue(fieldValue);
};

//Subarea
SC_Nm_SubAreaCode = function(fieldValue) {
	// formulaire.INTERVENTIONS_EN_COURS$VALEUR121.value = fieldValue;
	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR121').setValue(fieldValue); // MOD-002++
};
SC_Nm_SubAreaDesc = function(fieldValue) {
	// formulaire.INTERVENTIONS_EN_COURS$VALEUR123.value = fieldValue;
	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR123').setValue(fieldValue); // MOD-002++
};
FillCf_Reviewer_PersonelNum = function(fieldValue) {
	// formulaire.INTERVENTIONS_EN_COURS$VALEUR158.value = fieldValue;
	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR158').setValue(fieldValue);
	champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR158, false);
};
//Contract
FillCf_MA_Nature_code = function(fieldValue) {
	// formulaire.INTERVENTIONS_EN_COURS$VALEUR310.value = fieldValue;
neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR310').setValue(fieldValue); // MOD-002++
};

FillCf_MA_Nature_Desc = function(fieldValue) {
	// formulaire.INTERVENTIONS_EN_COURS$VALEUR311.value = fieldValue;
	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR311').setValue(fieldValue); // MOD-002++
};

//Management Popup - Reviewer
FillCf_Reviewer_First_Name = function(fieldValue) {
	// formulaire.INTERVENTIONS_EN_COURS$VALEUR154.value = fieldValue;
	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR154').setValue(fieldValue); // MOD-002++
};

FillCf_Reviewer_LastName = function(fieldValue) {
	// formulaire.INTERVENTIONS_EN_COURS$VALEUR154.value += ' ' + fieldValue;
	var currValue = neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR154').getValue();
	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR154').setValue(currValue + ' ' + fieldValue);
	champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR154, false);
};
/*
FillCf_Reviewer_LastName = function(fieldValue) {	
  var currValue = neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR154').getValue(); // MOD-002++
neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR1').setValue(currValue + " " + fieldValue); // MOD-002++
  neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR154').noMandatory();
};
*/

//Management Popup - Supervisor
FillCf_Supervisor_First_Name = function(fieldValue) {
	//formulaire.INTERVENTIONS_EN_COURS$VALEUR183.value = fieldValue;// MOD-002--
	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR183').setValue(fieldValue); // MOD-002++
};
FillCf_Supervisor_LastName = function(fieldValue) {
	//formulaire.INTERVENTIONS_EN_COURS$VALEUR183.value += " " + fieldValue;// MOD-002--
	var currValue = neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR183').getValue(); // MOD-002++
	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR183').setValue(currValue + ' ' + fieldValue); // MOD-002++
	//champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR183, false);// MOD-002--
	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR183').noMandatory(); // MOD-002++
};

/*
FillCf_LocalName_LocalID = function(fieldValue){
    formulaire.INTERVENTIONS_EN_COURS$VALEUR168.value = fieldValue;
    champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR168, false);
};
*/

//Management Popup - Mentor
FillCf_Mentor_First_Name = function(fieldValue) {
	//formulaire.INTERVENTIONS_EN_COURS$VALEUR166.value = fieldValue; // MOD-002--
	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR166').setValue(fieldValue); // MOD-002++
};
FillCf_Mentor_LastName = function(fieldValue) {
	//formulaire.INTERVENTIONS_EN_COURS$VALEUR166.value += " " + fieldValue; // MOD-002--
	var currValue = neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR166').getValue(); // MOD-002++
	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR166').setValue(currValue + ' ' + fieldValue); // MOD-002++
	//champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR166, false); // MOD-002--
	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR166').noMandatory(); // MOD-002++
};

FillCf_Mentor_PersonelNum = function(fieldValue) {
	// formulaire.INTERVENTIONS_EN_COURS$VALEUR170.value = fieldValue;
	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR170').setValue(fieldValue);
	champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR170, false);
};

FillCf_Supervisor_PersonelNum = function(fieldValue) {
	// formulaire.INTERVENTIONS_EN_COURS$VALEUR187.value = fieldValue;
	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR187').setValue(fieldValue);
	champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR187, false);
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

//organization detail
//Organization detail - Service Line
SC_Nm_ServiceLineCode = function(fieldValue) {
	// formulaire.INTERVENTIONS_EN_COURS$VALEUR37.value = fieldValue;
	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR37').setValue(fieldValue);
};
SC_Nm_ServiceLineDesc = function(fieldValue) {
	// formulaire.INTERVENTIONS_EN_COURS$VALEUR39.value = fieldValue;
	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR39').setValue(fieldValue);
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

window.popupLinkFunction = function() {
	//Action Code
	popupLink(formulaire.INTERVENTIONS_EN_COURS$VALEUR4, '/Custom_Referential/ActionsCode.aspx?Id_User='); // MOD-002--
	//Grades
	popupLink(document.getElementById('INTERVENTIONS_EN_COURS$VALEUR40'), '/Custom_Referential/Grade.aspx?Id_User='); // MOD-002--

	//Job Name
	popupLink(document.getElementById('INTERVENTIONS_EN_COURS$VALEUR45'), '/Custom_Referential/JobName.aspx?Id_User='); // MOD-002--
	if (neocase.form.field('ELEMENTS').getText() === 'Company change (Light countries)') {
		UnLinkpopup('INTERVENTIONS_EN_COURS$VALEUR122');
		popupLink(document.getElementById("INTERVENTIONS_EN_COURS$VALEUR119"), "/Custom_Referential/PersonalArea.aspx?Id_User=");
		// neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR119').setLink('/Custom_Referential/PersonalArea.aspx?Id_User=', '_blank', 'style-button');
	}
	if (neocase.form.field('ELEMENTS').getText() === 'Work location transfer (Light countries)') {
		UnLinkpopup('INTERVENTIONS_EN_COURS$VALEUR119');
		popupLink(document.getElementById('INTERVENTIONS_EN_COURS$VALEUR122'),'/Custom_Referential/SubArea.aspx?Id_User=');
	}
	//popupLink(document.getElementById("UTILISATEURS$CHAMPU165"),"/Custom_Referential/Community.aspx");

	//Service Line
	popupLink(formulaire.UTILISATEURS$CHAMPU167, '/Custom_Referential/ServiceLine.aspx');

	//Management - Reviewer
	popupLink(document.getElementById('UTILISATEURS$CHAMPU56'), '/Custom_Referential/ManagerReviewer.aspx');

	//Management - Supervisor
	popupLink(document.getElementById('UTILISATEURS$CHAMPU152'), '/Custom_Referential/ManageSupervisor.aspx');

	//Management - Local approver
	popupLink(document.getElementById('UTILISATEURSBIS$CHAMPU68'), '/Custom_Referential/ManagerLocalName.aspx');

	//Management - Default approver
	popupLink(document.getElementById('UTILISATEURSBIS$CHAMPU234'), '/Custom_Referential/ManagerDefaultName.aspx');

	//Management - Mentor
	popupLink(document.getElementById('UTILISATEURS$CHAMPU66'), '/Custom_Referential/ManageMentor.aspx');

	//Contract Details - Contract Type
	popupLink(document.getElementById('UTILISATEURS$CHAMPU273'), '/Custom_Referential/ContratType.aspx?Id_User=');

	//Contract Details - Employee Notice
	popupLink(document.getElementById('UTILISATEURS$CHAMPU275'), '/Custom_Referential/NoticePeriod.aspx?Id_User=');

	//Contract Details - Qualification
	popupLink(document.getElementById('UTILISATEURS$CHAMPU281'), '/Custom_Referential/Qualification.aspx');

	//Employee Group SubGroup
	popupLink(document.getElementById('INTERVENTIONS_EN_COURS$VALEUR8'),'/Custom_Referential/EmployeeGroup.aspx?Id_User=');

	//Company Change
	popupLink(document.getElementById('INTERVENTIONS_EN_COURS$VALEUR16'),'/Custom_Referential/PU.aspx?Id_Demande=&Id_User=');
};

/**********************************
* MANAGE JOB DESCRIPTION DEPENDANCY
***********************************/
window.jobCodeToDesc = function() {
		//Définition des variables
		var msg = 'fonction jobCodeToDesc : ';
		var jobCode = formulaire.INTERVENTIONS_EN_COURS$VALEUR52;
		var jobType = formulaire.INTERVENTIONS_EN_COURS$VALEUR54;

		if (jobCode) {
			if (jobType) {
				var jobCodeC = $('option:selected', jobCode).attr('code');

				switch (jobCodeC) {
					case '176': //ASO
						$(jobType).find('option[code*=188]').prop('selected', true); //Administrative Support
						break;
					case '177': //CAG
						$(jobType).find('option[code*=189]').prop('selected', true); //Communication & Advertising
						break;
					case '178': //DAN
						$(jobType).find('option[code*=190]').prop('selected', true); //Deal Analyst
						break;
					case '179': //FAN
						$(jobType).find('option[code*=191]').prop('selected', true); //Facilities & Accomodation
						break;
					case '180': //FIN
						$(jobType).find('option[code*=192]').prop('selected', true); //Finance
						break;
					case '181': //GMT
						$(jobType).find('option[code*=193]').prop('selected', true); //General Management
						break;
					case '182': //ITI
						$(jobType).find('option[code*=194]').prop('selected', true); //Support IT & Telco
						break;
					case '183': //KMT
						$(jobType).find('option[code*=195]').prop('selected', true); //Knowledge Management
						break;
					case '184': //MKG
						$(jobType).find('option[code*=196]').prop('selected', true); //Marketing
						break;
					case '185': //MSE
						$(jobType).find('option[code*=197]').prop('selected', true); //Management Services
						break;
					case '186': //PRM
						$(jobType).find('option[code*=198]').prop('selected', true); //PRM
						break;
					case '187': //PRO
						$(jobType).find('option[code*=199]').prop('selected', true); //Procurement
						break;
					default:
						jobType.value = '';
						break;
				}
			} else {
				jobType.value = '';
				msg +=
					'var jobType (formulaire.INTERVENTIONS_EN_COURS$VALEUR54) non trouvée > champ absent ou non chargé';
				console.log(msg);
			}
		} else {
			jobType.value = '';
			msg += 'var jobCode (formulaire.INTERVENTIONS_EN_COURS$VALEUR52) non trouvée > champ absent ou non chargé';
			console.log(msg);
		}
};

window.jobDescToCode = function() {
	console.log('asd');
	//Définition des variables
	var msg = 'fonction jobDescToCode : ';
	var jobCode = formulaire.INTERVENTIONS_EN_COURS$VALEUR52;
	var jobType = formulaire.INTERVENTIONS_EN_COURS$VALEUR54;

	if (jobCode) {
		if (jobType) {
			var jobTypeC = $('option:selected', jobType).attr('code');

			switch (jobTypeC) {
				case '188': //Administrative Support
					$(jobCode).find('option[code*=176]').prop('selected', true); //ASO
					break;
				case '189': //Communication & Advertising
					$(jobCode).find('option[code*=177]').prop('selected', true); //CAG
					break;
				case '190': //Deal Analyst
					$(jobCode).find('option[code*=178]').prop('selected', true); //DAN
					break;
				case '191': //Facilities & Accomodation
					$(jobCode).find('option[code*=179]').prop('selected', true); //FAN
					break;
				case '192': //Finance
					$(jobCode).find('option[code*=180]').prop('selected', true); //FIN
					break;
				case '193': //General Management
					$(jobCode).find('option[code*=181]').prop('selected', true); //GMT
					break;
				case '194': //Support IT & Telco
					$(jobCode).find('option[code*=182]').prop('selected', true); //ITI
					break;
				case '195': //Knowledge Management
					$(jobCode).find('option[code*=183]').prop('selected', true); //KMT
					break;
				case '196': //Marketing
					$(jobCode).find('option[code*=184]').prop('selected', true); //MKG
					break;
				case '197': //Management Services
					$(jobCode).find('option[code*=185]').prop('selected', true); //MSE
					break;
				case '198': //PRM
					$(jobCode).find('option[code*=186]').prop('selected', true); //PRM
					break;
				case '199': //Procurement
					$(jobCode).find('option[code*=187]').prop('selected', true); //PRO
					break;
				default:
					jobCode.value = '';
					break;
			}
		} else {
			msg += 'var jobType (formulaire.INTERVENTIONS_EN_COURS$VALEUR54) non trouvée > champ absent ou non chargé';
			console.log(msg);
		}
	} else {
		msg += 'var jobCode (formulaire.INTERVENTIONS_EN_COURS$VALEUR52) non trouvée > champ absent ou non chargé';
		console.log(msg);
	}
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

	//Job
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR44);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR46);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR48);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR50);

	//Work Location
	//  disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR284);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR285);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR123);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR121);

	//Contract Detail - Contract type
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR290);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR291);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR310);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR311);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR292);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR293);

	//Mangement team
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR154);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR183);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR286);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR288);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR166);

	//Cost Center
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR15);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR17);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR231);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR232);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR233);

	//EE Group-Subgroup
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR363);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR315);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR364);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR365);

	//Management Team
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR154);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR158);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR183);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR187);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR166);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR170);
};

window.hideshowFields = function() {
	if (neocase.form.field('ELEMENTS').getText() === 'Work location transfer (Light countries)') {
		neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR284').hide();
		neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR285').hide();
	}

	if (neocase.form.field('ELEMENTS').getText() === 'Company change (Light countries)') {
		neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR284').show();
		neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR285').show();
	}
};

var selectedSubtopicValue = -11;

window.resetAllFieldsForm = function() {
	var CurselectedSubtopicValue = neocase.form.field('ELEMENTS').getValue();
	// var CurselectedSubtopicValue = selectedSubtopic.options[selectedSubtopic.selectedIndex].value;

	if (selectedSubtopicValue !== CurselectedSubtopicValue) {
		jQuery('#tabpage154').find(':input').each(function() {
			if (this.tabindex !== '-1') {
				var fld = jQuery(this);
				//console.log(fld[0].id);
				var currID = fld[0].id;

				switch (currID) {
					case 'INTERVENTIONS_EN_COURS$VALEUR5':
					case 'INTERVENTIONS_EN_COURS$VALEUR44':
					case 'INTERVENTIONS_EN_COURS$VALEUR46':
					case 'INTERVENTIONS_EN_COURS$VALEUR48':
					case 'INTERVENTIONS_EN_COURS$VALEUR50':
					case 'INTERVENTIONS_EN_COURS$VALEUR52':
					case 'INTERVENTIONS_EN_COURS$VALEUR54':
					case 'INTERVENTIONS_EN_COURS$VALEUR33':
					case 'INTERVENTIONS_EN_COURS$VALEUR35':
					case 'INTERVENTIONS_EN_COURS$VALEUR76':
					case 'INTERVENTIONS_EN_COURS$VALEUR78':
					case 'INTERVENTIONS_EN_COURS$VALEUR284':
					case 'INTERVENTIONS_EN_COURS$VALEUR285':
					case 'INTERVENTIONS_EN_COURS$VALEUR121':
					case 'INTERVENTIONS_EN_COURS$VALEUR123':
					case 'INTERVENTIONS_EN_COURS$VALEUR126':
					case 'INTERVENTIONS_EN_COURS$VALEUR132':
					case 'INTERVENTIONS_EN_COURS$VALEUR214':
					case 'INTERVENTIONS_EN_COURS$VALEUR134':
					case 'INTERVENTIONS_EN_COURS$VALEUR215':
					case 'INTERVENTIONS_EN_COURS$VALEUR154':
					case 'INTERVENTIONS_EN_COURS$VALEUR158':
					case 'INTERVENTIONS_EN_COURS$VALEUR183':
					case 'INTERVENTIONS_EN_COURS$VALEUR187':
					case 'INTERVENTIONS_EN_COURS$VALEUR166':
					case 'INTERVENTIONS_EN_COURS$VALEUR170':
					case 'INTERVENTIONS_EN_COURS$VALEUR290':
					case 'INTERVENTIONS_EN_COURS$VALEUR291':
					case 'INTERVENTIONS_EN_COURS$VALEUR310':
					case 'INTERVENTIONS_EN_COURS$VALEUR311':
					case 'INTERVENTIONS_EN_COURS$VALEUR292':
					case 'INTERVENTIONS_EN_COURS$VALEUR293':
					case 'INTERVENTIONS_EN_COURS$VALEUR363':
					case 'INTERVENTIONS_EN_COURS$VALEUR315':
					case 'INTERVENTIONS_EN_COURS$VALEUR364':
					case 'INTERVENTIONS_EN_COURS$VALEUR365':
					case 'INTERVENTIONS_EN_COURS$VALEUR41':
					case 'INTERVENTIONS_EN_COURS$VALEUR234':
					case 'INTERVENTIONS_EN_COURS$VALEUR235':
					case 'INTERVENTIONS_EN_COURS$VALEUR236':
					case 'INTERVENTIONS_EN_COURS$VALEUR237':
					case 'INTERVENTIONS_EN_COURS$VALEUR240':
					case 'INTERVENTIONS_EN_COURS$VALEUR239':
					case 'INTERVENTIONS_EN_COURS$VALEUR241':
					case 'INTERVENTIONS_EN_COURS$VALEUR242':
					case 'INTERVENTIONS_EN_COURS$VALEUR15':
					case 'INTERVENTIONS_EN_COURS$VALEUR17':
					case 'INTERVENTIONS_EN_COURS$VALEUR231':
					case 'INTERVENTIONS_EN_COURS$VALEUR232':
					case 'INTERVENTIONS_EN_COURS$VALEUR220':
					case 'INTERVENTIONS_EN_COURS$VALEUR221':
					case 'INTERVENTIONS_EN_COURS$VALEUR222':
					case 'INTERVENTIONS_EN_COURS$VALEUR223':
					case 'INTERVENTIONS_EN_COURS$VALEUR225':
					case 'INTERVENTIONS_EN_COURS$VALEUR226':
					case 'INTERVENTIONS_EN_COURS$VALEUR227':
						jQuery(this).val('');
						break;
				}
			}
		});
	} else {
		selectedSubtopicValue = CurselectedSubtopicValue;
	}
};

window.copyFunctions = function() {
	//copy Job title desc value
	neocase.form.field('UTILISATEURS$CHAMPU40').copyValueTo('INTERVENTIONS_EN_COURS$VALEUR45');

	//copy Global grade Code value
	neocase.form.field('UTILISATEURS$CHAMPU26').copyValueTo('INTERVENTIONS_EN_COURS$VALEUR118');

	//copy personal area desc value
	neocase.form.field('UTILISATEURS$CHAMPU27').copyValueTo('INTERVENTIONS_EN_COURS$VALEUR119');

	//copy personal sub area code value
	neocase.form.field('UTILISATEURS$CHAMPU28').copyValueTo('INTERVENTIONS_EN_COURS$VALEUR120');

	//copy personal sub area desc value
	neocase.form.field('UTILISATEURS$CHAMPU29').copyValueTo('INTERVENTIONS_EN_COURS$VALEUR122');

	//copy FTC extension value
	neocase.form.field('UTILISATEURS$CHAMPU43').copyValueTo('INTERVENTIONS_EN_COURS$VALEUR124');

	//copy EE group code value
	neocase.form.field('UTILISATEURS$CHAMPU36').copyValueTo('INTERVENTIONS_EN_COURS$VALEUR6');

	//copy EE group desc value
	neocase.form.field('UTILISATEURS$CHAMPU37').copyValueTo('INTERVENTIONS_EN_COURS$VALEUR8');

	//copy EE subgroup code value
	neocase.form.field('UTILISATEURS$CHAMPU38').copyValueTo('INTERVENTIONS_EN_COURS$VALEUR178');

	//copy EE subgroup desc value
	neocase.form.field('UTILISATEURS$CHAMPU39').copyValueTo('INTERVENTIONS_EN_COURS$VALEUR180');

	//copy Global grade Code value
	neocase.form.field('UTILISATEURS$CHAMPU34').copyValueTo('INTERVENTIONS_EN_COURS$VALEUR238');

	//copy Local grade value
	neocase.form.field('UTILISATEURS$CHAMPU35').copyValueTo('INTERVENTIONS_EN_COURS$VALEUR40');

	//copy production unit code value
	neocase.form.field('UTILISATEURS$CHAMPU24').copyValueTo('INTERVENTIONS_EN_COURS$VALEUR14');

	//copy production unit description value
	neocase.form.field('UTILISATEURS$CHAMPU25').copyValueTo('INTERVENTIONS_EN_COURS$VALEUR16');
};

 window.hideAllSection = function() {
	neocase.form.section('section267').hide(); //Effective date
	neocase.form.section('section604').hide(); //Job
	neocase.form.section('section965').hide(); //Pay
	neocase.form.section('section533').hide(); //Work Location
	neocase.form.section('section365').hide(); //Fixed Term Contract
	neocase.form.section('section102').hide(); //Probation Update
	neocase.form.section('section970').hide(); //Management Team
	neocase.form.section('section786').hide(); //Contract
	neocase.form.section('section258').hide(); //EE Group-Subgroup
	neocase.form.section('section379').hide(); //Grade
	neocase.form.section('section2505e1d2b7faabcdab0f').hide(); //Cost center
	neocase.form.section('section71c805d9d30258ead277').hide(); //Confirmed Leaving dates
	neocase.form.section('section60ceec25b46ed23641b9').hide(); //Resignation info
	neocase.form.section('section98f0dbc4bb8566749a27').hide(); //Mass Upload
	neocase.form.section('section3e5b76a8413b1f928001').hide(); //Working Hours
};

window.showSectionSubtopicCompanyChange = function() {
	neocase.form.section('section267').show(); //Effective date
	neocase.form.section('section533').show(); // Base Location
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
	neocase.form.section('section604').show(); //Job
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
	neocase.form.section('section970').show(); //Management Team
};

window.showSectionSubtopicOtherRequest = function() {
	neocase.form.section('section267').show(); //Effective date
};

window.showSectionSubtopicEndFixedTermContract = function() {
	neocase.form.section('section365').show(); //Fixed Term Contract
	neocase.form.section('section71c805d9d30258ead277').show(); //Confirmed Leaving dates
	neocase.form.section('section60ceec25b46ed23641b9').show(); //Resignation info
};
window.showSectionSubtopicRetirement = function() {
	neocase.form.section('section71c805d9d30258ead277').show(); //Confirmed Leaving dates
};

window.showSectionSubtopicVoluntaryLeave = function() {
	neocase.form.section('section71c805d9d30258ead277').show(); //Confirmed Leaving dates
	neocase.form.section('section60ceec25b46ed23641b9').show(); //Resignation info
};

window.showSectionSubtopicProbationUpdate = function() {
	neocase.form.section('section102').show(); //Provation Update
};

window.showSectionSubtopicInvoluntery = function() {
	neocase.form.section('section71c805d9d30258ead277').show(); //Confirmed Leaving Date
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
		if (selectedSubtopicValue == '2146') {
			// Cost center change
			showSectionSubtopicCostCenterChange();
		}
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
		if (selectedSubtopicValue == '2250') {
			// Work location transfer
			showSectionSubtopicWorkLocationTransfer();
		}
		if (selectedSubtopicValue == '2169') {
			// Only Management Section
			showSectionSubtopicManagement();
		}
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

	//Show Hide Fields
	hideshowFields();

	//To copy the fields from employee to request catalouge
	copyFunctions();

	//Job
	console.log('as');

	var jobtypecode = neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR52').elementHTML;
	var jobtypedesc = neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR54').elementHTML;
	var subtopic = neocase.form.field('ELEMENTS').elementHTML;

	jobtypecode.addEventListener('change',function() {
			jobCodeToDesc();
		},false);
	jobtypedesc.addEventListener('change',function() {
			jobDescToCode();
		},false);
	subtopic.addEventListener('change',function() {
			resetAllFieldsForm();
		},false);

	var temp = "updateProperty('ELEMENTS');onChangeListValue('ELEMENTS');resetAllFieldsForm();";
	subtopic.setAttribute('onchange', temp);

	popupLinkFunction();
	 manageSections();
};

neocase.form.event.bind('loadcomplete', onloadForm);
