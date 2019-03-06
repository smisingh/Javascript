//UK-EDC-CHECK-DOC-SIGN OLD (Back End)
/*************************************
V 1.0 - Initial Version
*************************************/
/*************************************
Developer   - Md Shahbaz khan
Date	    - 05/06/2017
Change No   - MOD-001
Description - 1) Select Either Fringe benefit or Fringe uplift,
			  2) Default Target VP related data
**************************************

*/


//**************** Begin of MOD-001++  ****************************************
window.capgDisable = function(fieldId)
{
var box = document.getElementById(fieldId);
$(box).parent().find("div").remove();
$(box).parent().prepend("<div class=\"disabler\" style=\"width: 100%; height: 30px; position: absolute;\"></div>");
};
//**************** End of MOD-001 ++ ******************************************


/**************
* Hide Sections
***************/
//Technical section
ThisForm.HideSection("section646");

/***********************************
* COPY VALUE FROM 1 FIELD TO ANOTHER
************************************/
window.copyValue = function(copyField,pasteField){
	var fieldTd = document.getElementsByClassName("fieldTD");
	if(fieldTd.length > 0){
	//BackOffice side
		//COPY BKO FIELD
		//--------------
		var bkoCopyFieldValue = "";
		if(document.getElementById(copyField) === null){
		//if copy field not found
			console.log("field to copy "+copyField+" not found");
			//return false;
		}else{
		//if copy field exists
			//get field value
			if(document.getElementById(copyField).type == "select" || document.getElementById(copyField).type == "select-one"){
			//copy select field
				bkoCopyFieldValue = document.getElementById(copyField).options[document.getElementById(copyField).selectedIndex].text;
			}else{
			//copy text field
				bkoCopyFieldValue = document.getElementById(copyField).value;
			}
		}
		
		//PASTE BKO FIELD
		//---------------
		//Only paste value if copy field existes
		if(bkoCopyFieldValue != ""){
			var bkoPasteFieldValue = "";
			if(document.getElementById(pasteField) === null){
			//if paste field not found
				console.log("field to paste "+pasteField+" not found");
				//return false;
			}else{
			//if both fields exists we paste the values
				//Read Only fields
				if(pasteField.readOnly === true){
					//Readonly fields, disable it
					document.getElementById(pasteField).readOnly = false;
					//paste value
					document.getElementById(pasteField).value = bkoCopyFieldValue;
					//save
					ThisCase.BackgroundMode.Begin();
					ThisCase.BackgroundMode.Execute('enregistreronly()');
					//enable readOnly
					document.getElementById(pasteField).readOnly = true;
					ThisCase.BackgroundMode.Execute('enregistreronly()');
					ThisCase.BackgroundMode.Stop();
				}else{
				//Standard custom fields
					if(document.getElementById(pasteField).type == "select" || document.getElementById(pasteField).type == "select-one"){
						//select fields
					}else{
						//text fields
						document.getElementById(pasteField).value = bkoCopyFieldValue;
					}
				}
			}
		}
	}else{
	//FrontOffice side
		//get copy field type and valeur
		var froCopyFieldCustomType = "";
		var froCopyFieldValeur = "";
		var froCopyFieldId = "";
		if(copyField.search("_") != -1){
			if(copyField.split("$").length > 0){
				froCopyFieldCustomType = copyField.split("$")[0];
				froCopyFieldValeur = copyField.split("$")[1];
			}else if(copyField.split("_").length > 0){
				froCopyFieldCustomType = copyField;
				var froCopyFieldSplit = copyField.split("_");
				var froCopyFieldSplitLength = Number(froCopyFieldSplit.length);
				froCopyFieldValeur = froCopyFieldSplit[froCopyFieldSplitLength-1];
			}
		}else{
			if(copyField.search("MOTSCLES") != -1){
				froCopyFieldId = "MOTCLE";
			}
		}
		//get paste field type and valeur
		var froPasteFieldCustomType = "";
		var froPasteFieldValeur = "";
		var froPasteFieldId = "";
		if(pasteField.search("_") != -1){
			if(pasteField.split("$").length > 1){
				froPasteFieldCustomType = pasteField.split("$")[0];
				froPasteFieldValeur = pasteField.split("$")[1];
			}else if(pasteField.split("_").length > 1){
				froPasteFieldCustomType = pasteField;
				var froPasteFieldSplit = pasteField.split("_");
				var froPasteFieldSplitLength = Number(froPasteFieldSplit.length);
				froPasteFieldValeur = froPasteFieldSplit[froPasteFieldSplitLength-1];
			}
		}else{
			if(pasteField.search("MOTSCLES") != -1){
				froPasteFieldId = "MOTCLE";
			}
		}
		//variables
		var froCopyField = "";
		var froCopyFieldValue = "";
		var froPasteField = "";
		var froPasteFieldType = "";
		
		//COPY FRO FIELD
		//--------------
		//get form sections
		var sections = document.getElementsByClassName("bloc");
		if(sections.length > 0){
			//loop on every sections
			for(s=0; s<sections.length; s++){
				var froSelect = sections[s].getElementsByTagName("select");

				//LOOP ON SELECT
				//--------------
				if(froSelect.length > 0){
					for(fs=0; fs<froSelect.length; fs++){
						//search copy field
						if(froCopyFieldId == ""){
							//search type correspondance
							if(froSelect[fs].id.search(froCopyFieldCustomType) != -1){
								//search valeur correspondance
								var froSelectCopySplit = froSelect[fs].id.split("_");
								var froSelectCopyValeur = Number(froSelectCopySplit.length);
								var froSelectCopyLast = froSelectCopySplit[froSelectCopyValeur-1];
								if(froSelectCopyLast == froCopyFieldValeur){
									//if correspondance is found, we stock the copy field
									froCopyField = froSelect[fs];
									froCopyFieldValue = froSelect[fs].options[froSelect[fs].selectedIndex].text;
								}
							}
						}else{
							if(froSelect[fs].id.search(froCopyFieldId) != -1){
								//if correspondance is found, we stock the copy field
								froCopyField = froSelect[fs];
								froCopyFieldValue = froSelect[fs].options[froSelect[fs].selectedIndex].text;
							}
						}
						
						//search paste field
						if(froPasteFieldId == ""){
							//search type correspondance
							if(froSelect[fs].id.search(froPasteFieldCustomType) != -1){
								//search valeur correspondance
								var froSelectPasteSplit = froSelect[fs].id.split("_");
								var froSelectPasteValeur = Number(froSelectPasteSplit.length);
								var froSelectPasteLast = froSelectPasteSplit[froSelectPasteValeur-1];
								if(froSelectPasteLast == froPasteFieldValeur){
									//if correspondance is found, we stock the paste field
									froPasteField = froSelect[fs];
									froPasteFieldType = "select";
								}
							}
						}else{
							if(froSelect[fs].id.search(froPasteFieldId) != -1){
								//if correspondance is found, we stock the paste field
								froPasteField = froSelect[fs];
								froPasteFieldType = "select";
							}
						}
					}
				}
				//if one of the copy/paste field isn't found, we search on input
				if(froCopyField == "" || froPasteField == ""){
					var froInput = sections[s].getElementsByTagName("input");
					
					//LOOP ON INPUT
					//-------------
					if(froInput.length > 0){
						for(fi=0; fi<froInput.length; fi++){
							//search copy field
							if(froCopyFieldId == ""){
								//search type correspondance
								if(froInput[fi].id.search(froCopyFieldCustomType) != -1){
									//search valeur correspondance
									var froTextCopySplit = froInput[fi].id.split("_");
									var froTextCopyValeur = Number(froTextCopySplit.length);
									var froTextCopyLast = froTextCopySplit[froTextCopyValeur-1];
									if(froTextCopyLast == froCopyFieldValeur){
										//if correspondance is found, we stock the copy field
										froCopyField = froInput[fi];
										froCopyFieldValue = froInput[fi].value;
									}
								}
							}else{
								if(froInput[fi].id.search(froCopyFieldId) != -1){
									//if correspondance is found, we stock the copy field
									froCopyField = froInput[fi];
									froCopyFieldValue = froInput[fi].value;
								}
							}
							
							//search paste field
							if(froPasteFieldId == ""){
								//search type correspondance
								if(froInput[fi].id.search(froPasteFieldCustomType) != -1){
									//search valeur correspondance
									var froTextPasteSplit = froInput[fi].id.split("_");
									var froTextPasteValeur = Number(froTextPasteSplit.length);
									var froTextPasteLast = froTextPasteSplit[froTextPasteValeur-1];
									if(froTextPasteLast == froPasteFieldValeur){
										//if correspondance is found, we stock the paste field
										froPasteField = froInput[fi];
										froPasteFieldType = "text";
									}
								}
							}else{
								if(froInput[fi].id.search(froPasteFieldId) != -1){
									//if correspondance is found, we stock the paste field
									froPasteField = froInput[fi];
									froPasteFieldType = "text";
								}
							}
						}
					}
				}
				//if one of the copy/paste field isn't found, we search on readonly fields
				if(froCopyField == "" || froPasteField == ""){
					var froSpan = sections[s].getElementsByTagName("span");
					
					//LOOP ON SPAN
					//------------
					if(froSpan.length > 0){
						for(fsp=0; fsp<froSpan.length; fsp++){
							//take away mandatory fields indicators span
							if(froSpan[fsp].id.search("Validator") == -1){
								//search copy field
								if(froCopyFieldId == ""){
									//search type correspondance
									if(froSpan[fsp].id.search(froCopyFieldCustomType) != -1){
										//search valeur correspondance
										var froReadonlyCopySplit = froSpan[fsp].id.split("_");
										var froReadonlyCopyValeur = Number(froReadonlyCopySplit.length);
										var froReadonlyCopyLast = froReadonlyCopySplit[froReadonlyCopyValeur-1];
										if(froReadonlyCopyLast == froCopyFieldValeur){
											//if correspondance is found, we stock the copy field
											froCopyField = froSpan[fsp];
											froCopyFieldValue = froSpan[fsp].innerHTML;
										}
									}
								}else{
									if(froSpan[fsp].id.search(froCopyFieldId) != -1){
										//if correspondance is found, we stock the copy field
										froCopyField = froSpan[fsp];
										froCopyFieldValue = froSpan[fsp].innerHTML;
									}
								}
								
								//search paste field
								if(froPasteFieldId == ""){
									//search type correspondance
									if(froSpan[fsp].id.search(froPasteFieldCustomType) != -1){
										//search valeur correspondance
										var froReadonlyPasteSplit = froSpan[fsp].id.split("_");
										var froReadonlyPasteValeur = Number(froReadonlyPasteSplit.length);
										var froReadonlyPasteLast = froReadonlyPasteSplit[froReadonlyPasteValeur-1];
										if(froReadonlyPasteLast == froPasteFieldValeur){
											//if correspondance is found, we stock the paste field
											froPasteField = froSpan[fsp];
											froPasteFieldType = "readonly";
										}
									}
								}else{
									if(froSpan[fsp].id.search(froPasteFieldId) != -1){
										//if correspondance is found, we stock the paste field
										froPasteField = froSpan[fsp];
										froPasteFieldType = "readonly";
									}
								}
							}
						}
					}
				}
			}
		}
		
		//PASTE FRO FIELD
		//---------------
		//first check if both fields exist
		if(froCopyField == ""){
			//alert("field to copy "+copyField+" not found");
		}else if(froPasteField == ""){
			//alert("field to paste "+pasteField+" not found");
		}else{
		//If fields exist, we paste the value
			if(froPasteFieldType == "select"){
			//if paste field is a select
			}else if(froPasteFieldType == "text"){
			//if paste field is a text
				froPasteField.value = froCopyFieldValue;
			}else if(froPasteFieldType == "readonly"){
			//if paste field is in read only
				froPasteField.innerHTML = froCopyFieldValue;
			}else{
			//error, no matching type found for paste field
				alert("Unknown type for "+froPasteField);
			}
		}
	}
};

window.copyValues = function(){
	copyValue("UTILISATEURS$CHAMPU24","INTERVENTIONS_EN_COURS$VALEUR14");
	copyValue("UTILISATEURS$CHAMPU25","INTERVENTIONS_EN_COURS$VALEUR16");
	copyValue("UTILISATEURS$CHAMPU35","INTERVENTIONS_EN_COURS$VALEUR40");
	copyValue("UTILISATEURS$CHAMPU96","INTERVENTIONS_EN_COURS$VALEUR43");
	copyValue("UTILISATEURS$CHAMPU26","INTERVENTIONS_EN_COURS$VALEUR118");
	copyValue("UTILISATEURS$CHAMPU27","INTERVENTIONS_EN_COURS$VALEUR119");
	copyValue("UTILISATEURS$CHAMPU28","INTERVENTIONS_EN_COURS$VALEUR120");
	copyValue("UTILISATEURS$CHAMPU29","INTERVENTIONS_EN_COURS$VALEUR122");
	copyValue("UTILISATEURS$CHAMPU40","INTERVENTIONS_EN_COURS$VALEUR45");
	copyValue("UTILISATEURS$CHAMPU36","INTERVENTIONS_EN_COURS$VALEUR6");
	copyValue("UTILISATEURS$CHAMPU37","INTERVENTIONS_EN_COURS$VALEUR8");
	copyValue("UTILISATEURS$CHAMPU38","INTERVENTIONS_EN_COURS$VALEUR178");
	copyValue("UTILISATEURS$CHAMPU39","INTERVENTIONS_EN_COURS$VALEUR180");
	copyValue("UTILISATEURS$CHAMPU43","INTERVENTIONS_EN_COURS$VALEUR124");
};

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

//CostCenter - 11 13 15 17
FillCf_Production_Unit_Code = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR15.value = fieldValue;
};
FillCf_Production_Unit_Desc = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR17.value = fieldValue;
};
//Production Unit
FillCf_Capability = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR19.value = fieldValue;
};
FillCf_Org_Unit_Code = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR11.value = fieldValue;
};
FillCf_Org_Unit_Desc = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR13.value = fieldValue;
};

//organization detail
//Organization detail - Service Line
SC_Nm_ServiceLineCode = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR37.value = fieldValue;
};
SC_Nm_ServiceLineDesc = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR39.value = fieldValue;
};
//Organization detail - Industry
SC_Nm_IndustryCode = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR29.value = fieldValue;
};
SC_Nm_IndustryDesc = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR31.value = fieldValue;
};
//Organization detail - Community
FillCf_CommunityCode = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR33.value = fieldValue;
};
FillCf_CommunityDescription = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR35.value = fieldValue;
};
//Organization detail - Speciality
SC_Nm_SpecialtyCode = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR25.value = fieldValue;
};
SC_Nm_SpecialtyDesc = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR24.value = fieldValue;
};

//job name
FillCf_Job_code = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR44.value = fieldValue;
};
FillCf_Job_Desc = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR46.value = fieldValue;
};
FillCf_Job_Catg = function(fieldValue){
	//fill field
	formulaire.INTERVENTIONS_EN_COURS$VALEUR48.value = fieldValue;
	//disable other fields
	if(formulaire.INTERVENTIONS_EN_COURS$VALEUR48.value == "CSS" || formulaire.INTERVENTIONS_EN_COURS$VALEUR48.value == "DSP"){
		formulaire.INTERVENTIONS_EN_COURS$VALEUR52.value = "";
		formulaire.INTERVENTIONS_EN_COURS$VALEUR52.disabled = true;
		formulaire.INTERVENTIONS_EN_COURS$VALEUR54.value = "";
		formulaire.INTERVENTIONS_EN_COURS$VALEUR54.disabled = true;
	}else{
		formulaire.INTERVENTIONS_EN_COURS$VALEUR52.disabled = false;
		formulaire.INTERVENTIONS_EN_COURS$VALEUR54.disabled = false;
	}
};
FillCf_Job_Catg_Desc = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR50.value = fieldValue;
};

//Job Type
SC_Nm_StaffCode = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR52.value = fieldValue;
};
SC_Nm_StaffDesc = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR54.value = fieldValue;
};

//Subarea
SC_Nm_SubAreaCode = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR121.value = fieldValue;
};
SC_Nm_SubAreaDesc = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR123.value = fieldValue;
};

//Management Popup - HR delivery
FillCf_HR_First_Name = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR142.value = fieldValue;
};
FillCf_HR_LastName = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR142.value += " "+fieldValue;
	champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR142, false);
};
FillCf_HR_LocalID = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR144.value = fieldValue;
	champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR144, false);
};
FillCf_HR_PersonelNum = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR146.value = fieldValue;
	champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR146, false);
};
//Management Popup - Training
FillCf_Training_First_Name = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR148.value = fieldValue;
};
FillCf_Training_LastName = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR148.value += " "+fieldValue;
	champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR148, false);
};
FillCf_Training_LocalID = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR150.value = fieldValue;
	champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR150, false);
};
FillCf_Training_PersonelNum = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR152.value = fieldValue;
	champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR152, false);
};
//Management Popup - Reviewer
FillCf_Reviewer_First_Name = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR154.value = fieldValue;
};
FillCf_Reviewer_LastName = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR154.value += " "+fieldValue;
	champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR154, false);
};
FillCf_Reviewer_LocalID = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR156.value = fieldValue;
	champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR156, false);
};
FillCf_Reviewer_PersonelNum = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR158.value = fieldValue;
	champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR158, false);
};
//Management Popup - PayPlan
FillCf_PayPlan_First_Name = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR160.value = fieldValue;
};
FillCf_PayPlan_LastName = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR160.value += " "+fieldValue;
	champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR160, false);
};
FillCf_PayPlan_LocalID = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR162.value = fieldValue;
	champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR162, false);
};
FillCf_PayPlan_PersonelNum = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR164.value = fieldValue;
	champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR164, false);
};
//Management Popup - Supervisor
FillCf_Supervisor_First_Name = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR183.value = fieldValue;
};
FillCf_Supervisor_LastName = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR183.value += " "+fieldValue;
	champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR183, false);
};
FillCf_Supervisor_LocalID = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR185.value = fieldValue;
	champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR185, false);
};
FillCf_Supervisor_PersonelNum = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR187.value = fieldValue;
	champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR187, false);
};
//Management Popup - Mentor
FillCf_Mentor_First_Name = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR166.value = fieldValue;
};
FillCf_Mentor_LastName = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR166.value += " "+fieldValue;
	champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR166, false);
};
FillCf_Mentor_LocalID = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR168.value = fieldValue;
	champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR168, false);
};
FillCf_Mentor_PersonelNum = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR170.value = fieldValue;
	champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR170, false);
};
//Management Popup - Probation
FillCf_Probation_First_Name = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR172.value = fieldValue;
};
FillCf_Probation_LastName = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR172.value += " "+fieldValue;
	champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR172, false);
};
FillCf_Probation_LocalID = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR174.value = fieldValue;
	champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR174, false);
};
FillCf_Probation_PersonelNum = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR176.value = fieldValue;
	champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR176, false);
};
//Local Grade
FillCf_Local_Grade = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR41.value = fieldValue;
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
window.disableFields = function(){
	//Action Reason
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR1);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR2);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR3);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR4);
	
	//Cost Center
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR11);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR13);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR15);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR17);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR19);
	
	//Organization Detail - Service Line
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR39);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR37);
	//Organization Detail - Industry
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR31);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR29);
	//Organization Detail - Community
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR35);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR33);
	//Organization Detail - Speciality
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR27);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR25);
	
	//Job Name
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR50);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR46);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR44);
	
	//Job Type
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR54);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR52);
	
	
	//**************** Begin of MOD-001 ++ ***************************************

	//Pay
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR88);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR89);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR90);
	capgDisable("INTERVENTIONS_EN_COURS$VALEUR91"); //Disabling Date Field
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR193);
	
	//Working Hour
	capgDisable("INTERVENTIONS_EN_COURS$VALEUR179"); //Disabling Date Field
	capgDisable("INTERVENTIONS_EN_COURS$VALEUR181"); //Disabling Date Field
	
	//**************** End of MOD-001 ++ ***************************************

	//Subarea
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR123);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR121);
	
	//Management HR Delivery
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR146);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR144);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR142);
	//Management Training
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR152);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR150);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR148);
	//Management Reviewer
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR158);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR156);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR154);
	//management Payplan
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR164);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR162);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR160);
	//Management Supervisor
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR187);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR185);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR183);
	//Management Mentor
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR166);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR168);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR170);
	//Management Probation
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR172);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR174);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR176);
	
	//Local Grade
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR41);
};

/******************************
* FUNCTIONS TO CALCULATE FIELDS
*******************************/
window.calculateCurrentPay = function(){
	var msg = "fonction calculateCurrentPay : ";
	var flexFund = formulaire.INTERVENTIONS_EN_COURS$VALEUR86;
	var flexUplift = formulaire.UTILISATEURS$CHAMPU172;
	var currentAnnualSalary = formulaire.UTILISATEURS$CHAMPU168;
	if(flexFund){
		if(flexUplift){
			if(currentAnnualSalary){
				//current pay
				flexFund.value = (Number(currentAnnualSalary.value)+Number(flexUplift.value)).toFixed(2);
			}else{
				msg += "champ currentAnnualSalary non trouvé";
				console.log(msg);
			}
		}else{
			msg += "champ flexUplift non trouvé";
			console.log(msg);
		}
	}else{
		msg += "champ flexFund non trouvé";
		console.log(msg);
	}
};
window.calculateNewPay = function(){
	//new pay
	formulaire.INTERVENTIONS_EN_COURS$VALEUR87.value = Number(formulaire.INTERVENTIONS_EN_COURS$VALEUR76.value)+Number(formulaire.INTERVENTIONS_EN_COURS$VALEUR83.value);
};
window.calculateCompensation = function(){
	//Compensation
	formulaire.INTERVENTIONS_EN_COURS$VALEUR193.value = Number(formulaire.INTERVENTIONS_EN_COURS$VALEUR88.value)+Number(formulaire.INTERVENTIONS_EN_COURS$VALEUR89.value);
};

//************* MOD-001 ++ *******************************************************************

//disable Uplift when Benefit is filled
window.setUpliftVisiblity = function() {

var benefit = document.getElementById("INTERVENTIONS_EN_COURS$VALEUR81");
var uplift = document.getElementById("INTERVENTIONS_EN_COURS$VALEUR83");

if (benefit.value != "" )
{
uplift.disabled = true;
}
else
{
uplift.disabled = false;
}

};


//disable benefit when uplift is filled
window.setBenefitVisiblity = function() {

var benefit = document.getElementById("INTERVENTIONS_EN_COURS$VALEUR81");
var uplift = document.getElementById("INTERVENTIONS_EN_COURS$VALEUR83");

if (uplift.value != "" )
{
benefit.disabled = true;
}
else
{
benefit.disabled = false;
}

};

//***************** MOD-001 ++ *********************************************



/**********************************
* MANAGE JOB DESCRIPTION DEPENDANCY
***********************************/
/*
window.jobCodeToDesc = function(){
	//Définition des variables
	var msg = "fonction jobCodeToDesc : ";
	var jobCode = formulaire.INTERVENTIONS_EN_COURS$VALEUR52;
	var jobType = formulaire.INTERVENTIONS_EN_COURS$VALEUR54;
	if(jobCode){
		if(jobType){
			//Si les 2 champs concernés sont trouvés, on exécute la fonction
			if(jobCode.value == "ASO"){
				jobType.value = "Administrative Support";
			}else if(jobCode.value == "CAG"){
				jobType.value = "Communication & Advertising";
			}else if(jobCode.value == "DAN"){
				jobType.value = "Deal Analyst";
			}else if(jobCode.value == "FAN"){
				jobType.value = "Facilities & Accomodation";
			}else if(jobCode.value == "FIN"){
				jobType.value = "Finance";
			}else if(jobCode.value == "GMT"){
				jobType.value = "General Management";
			}else if(jobCode.value == "ITI"){
				jobType.value = "Support IT & Telco";
			}else if(jobCode.value == "KMT"){
				jobType.value = "Knowledge Management";
			}else if(jobCode.value == "MKG"){
				jobType.value = "Marketing";
			}else if(jobCode.value == "MSE"){
				jobType.value = "Management Services";
			}else if(jobCode.value == "PRM"){
				jobType.value = "PRM";
			}else if(jobCode.value == "PRO"){
				jobType.value = "Procurement";
			}
		}else{
			msg += "var jobType (formulaire.INTERVENTIONS_EN_COURS$VALEUR54) non trouvée > champ absent ou non chargé";
			console.log(msg);
		}
	}else{
		msg += "var jobCode (formulaire.INTERVENTIONS_EN_COURS$VALEUR52) non trouvée > champ absent ou non chargé";
		console.log(msg);
	}
};
*/
window.jobCodeToDesc = function(){
	//Définition des variables
	var msg = "fonction jobCodeToDesc : ";
	var jobCode = formulaire.INTERVENTIONS_EN_COURS$VALEUR52;
	var jobType = formulaire.INTERVENTIONS_EN_COURS$VALEUR54;
	if(jobCode){
		if(jobType){
			//Si les 2 champs concernés sont trouvés, on exécute la fonction
			if(jobCode.value == "176|ASO"){
				jobType.value = "188|Administrative Support";
			}else if(jobCode.value == "177|CAG"){
				jobType.value = "189|Communication & Advertising";
			}else if(jobCode.value == "178|DAN"){
				jobType.value = "190|Deal Analyst";
			}else if(jobCode.value == "179|FAN"){
				jobType.value = "191|Facilities & Accomodation";
			}else if(jobCode.value == "180|FIN"){
				jobType.value = "192|Finance";
			}else if(jobCode.value == "181|GMT"){
				jobType.value = "193|General Management";
			}else if(jobCode.value == "182|ITI"){
				jobType.value = "194|Support IT & Telco";
			}else if(jobCode.value == "183|KMT"){
				jobType.value = "195|Knowledge Management";
			}else if(jobCode.value == "184|MKG"){
				jobType.value = "196|Marketing";
			}else if(jobCode.value == "185|MSE"){
				jobType.value = "197|Management Services";
			}else if(jobCode.value == "186|PRM"){
				jobType.value = "198|PRM";
			}else if(jobCode.value == "187|PRO"){
				jobType.value = "199|Procurement";
			}
		}else{
			msg += "var jobType (formulaire.INTERVENTIONS_EN_COURS$VALEUR54) non trouvée > champ absent ou non chargé";
			console.log(msg);
		}
	}else{
		msg += "var jobCode (formulaire.INTERVENTIONS_EN_COURS$VALEUR52) non trouvée > champ absent ou non chargé";
		console.log(msg);
	}
};
/*
window.jobDescToCode = function(){
	//Définition des variables
	var msg = "fonction jobDescToCode : ";
	var jobCode = formulaire.INTERVENTIONS_EN_COURS$VALEUR52;
	var jobType = formulaire.INTERVENTIONS_EN_COURS$VALEUR54;
	if(jobCode){
		if(jobType){
			//Si les 2 champs concernés sont trouvés, on exécute la fonction
			if(jobType.value == "Administrative Support"){
				jobCode.value = "ASO";
			}else if(jobType.value == "Communication & Advertising"){
				jobCode.value = "CAG";
			}else if(jobType.value == "Deal Analyst"){
				jobCode.value = "DAN";
			}else if(jobType.value == "Facilities & Accomodation"){
				jobCode.value = "FAN";
			}else if(jobType.value == "Finance"){
				jobCode.value = "FIN";
			}else if(jobType.value == "General Management"){
				jobCode.value = "GMT";
			}else if(jobType.value == "Support IT & Telco"){
				jobCode.value = "ITI";
			}else if(jobType.value == "Knowledge Management"){
				jobCode.value = "KMT"
			}else if(jobType.value == "Marketing"){
				jobCode.value = "MKG";
			}else if(jobType.value == "Management Services"){
				jobCode.value = "MSE";
			}else if(jobType.value == "PRM"){
				jobCode.value = "PRM";
			}else if(jobType.value == "Procurement"){
				jobCode.value = "PRO";
			}
		}else{
			msg += "var jobType (formulaire.INTERVENTIONS_EN_COURS$VALEUR54) non trouvée > champ absent ou non chargé";
			console.log(msg);
		}
	}else{
		msg += "var jobCode (formulaire.INTERVENTIONS_EN_COURS$VALEUR52) non trouvée > champ absent ou non chargé";
		console.log(msg);
	}
};
*/
window.jobDescToCode = function(){
	//Définition des variables
	var msg = "fonction jobDescToCode : ";
	var jobCode = formulaire.INTERVENTIONS_EN_COURS$VALEUR52;
	var jobType = formulaire.INTERVENTIONS_EN_COURS$VALEUR54;
	if(jobCode){
		if(jobType){
			//Si les 2 champs concernés sont trouvés, on exécute la fonction
			if(jobType.value == "188|Administrative Support"){
				jobCode.value = "176|ASO";
			}else if(jobType.value == "189|Communication & Advertising"){
				jobCode.value = "177|CAG";
			}else if(jobType.value == "190|Deal Analyst"){
				jobCode.value = "178|DAN";
			}else if(jobType.value == "191|Facilities & Accomodation"){
				jobCode.value = "179|FAN";
			}else if(jobType.value == "192|Finance"){
				jobCode.value = "180|FIN";
			}else if(jobType.value == "193|General Management"){
				jobCode.value = "181|GMT";
			}else if(jobType.value == "194|Support IT & Telco"){
				jobCode.value = "182|ITI";
			}else if(jobType.value == "195|Knowledge Management"){
				jobCode.value = "183|KMT";
			}else if(jobType.value == "196|Marketing"){
				jobCode.value = "184|MKG";
			}else if(jobType.value == "197|Management Services"){
				jobCode.value = "185|MSE";
			}else if(jobType.value == "198|PRM"){
				jobCode.value = "186|PRM";
			}else if(jobType.value == "199|Procurement"){
				jobCode.value = "187|PRO";
			}
		}else{
			msg += "var jobType (formulaire.INTERVENTIONS_EN_COURS$VALEUR54) non trouvée > champ absent ou non chargé";
			console.log(msg);
		}
	}else{
		msg += "var jobCode (formulaire.INTERVENTIONS_EN_COURS$VALEUR52) non trouvée > champ absent ou non chargé";
		console.log(msg);
	}
};

/***************************************
* MANAGE EMPLOYEE DESCRIPTION DEPENDANCY
****************************************/
window.employeeCodeToDesc = function(){
	//Définition des variables
	var msg = "fonction employeeCodeToDesc : ";
	var employeeCode = formulaire.INTERVENTIONS_EN_COURS$VALEUR179;
	var employeeType = formulaire.INTERVENTIONS_EN_COURS$VALEUR181;
	if(employeeCode){
		if(employeeType){
			//Si les 2 champs concernés sont trouvés, on exécute la fonction
			if(employeeCode.value == "219|01"){
				employeeType.value = "223|Sal FT OT Inelig";
			}else if(employeeCode.value == "220|02"){
				employeeType.value = "224|Sal PT OT Inelig 1";
			}else if(employeeCode.value == "221|03"){
				employeeType.value = "225|Sal FT OT Eligible";
			}else if(employeeCode.value == "222|04"){
				employeeType.value = "226|Sal PT OT Elig 1";
			}
		}else{
			msg += "var employeeType (formulaire.INTERVENTIONS_EN_COURS$VALEUR181) non trouvée > champ absent ou non chargé";
			console.log(msg);
		}
	}else{
		msg += "var employeeCode (formulaire.INTERVENTIONS_EN_COURS$VALEUR179) non trouvée > champ absent ou non chargé";
		console.log(msg);
	}
};
window.employeeDescToCode = function(){
	//Définition des variables
	var msg = "fonction employeeDescToCode : ";
	var employeeCode = formulaire.INTERVENTIONS_EN_COURS$VALEUR179;
	var employeeType = formulaire.INTERVENTIONS_EN_COURS$VALEUR181;
	if(employeeCode){
		if(employeeType){
			//Si les 2 champs concernés sont trouvés, on exécute la fonction
			if(employeeType.value == "223|Sal FT OT Inelig"){
				employeeCode.value = "219|01";
			}else if(employeeType.value == "224|Sal PT OT Inelig 1"){
				employeeCode.value = "220|02";
			}else if(employeeType.value == "225|Sal FT OT Eligible"){
				employeeCode.value = "221|03";
			}else if(employeeType.value == "226|Sal PT OT Elig 1"){
				employeeCode.value = "222|04";
			}
		}else{
			msg += "var employeeType (formulaire.INTERVENTIONS_EN_COURS$VALEUR181) non trouvée > champ absent ou non chargé";
			console.log(msg);
		}
	}else{
		msg += "var employeeCode (formulaire.INTERVENTIONS_EN_COURS$VALEUR179) non trouvée > champ absent ou non chargé";
		console.log(msg);
	}
};

window.defaultProbation = function(){
	var probationCodeField = "UTILISATEURS$CHAMPU187";
	var probationCodeValue = "227|05";
	var probationDescField = "UTILISATEURS$CHAMPU188";
	var probationDescValue = "228|Extended";
	//Readonly fields, disable it
	document.getElementById(probationCodeField).readOnly = false;
	document.getElementById(probationDescField).readOnly = false;
	//paste value
	document.getElementById(probationCodeField).value = probationCodeValue;
	document.getElementById(probationDescField).value = probationDescValue;
	//enable readOnly
	document.getElementById(probationCodeField).readOnly = true;
	document.getElementById(probationDescField).readOnly = true;
	//save
	/*
	ThisCase.BackgroundMode.Begin();
	ThisCase.BackgroundMode.Execute('enregistreronly()');
	ThisCase.BackgroundMode.Stop();
	*/
};



//*****************Begin of MOD-001 ++ ******************************************
window.calculateTargetVPNewHoursPeriod = function()
{
	var NewTargetVP = document.getElementById("INTERVENTIONS_EN_COURS$VALEUR78");
	var NewTargetVPHoursPeriod = document.getElementById("INTERVENTIONS_EN_COURS$VALEUR89");
	
	var d = new Date();
	var currMonth = d.getMonth();
	var remainingMonths = 12 - currMonth;
	
	var TargetVPNewHoursPeriod = (NewTargetVP.value/12)*(remainingMonths);
	NewTargetVPHoursPeriod.value = parseFloat(TargetVPNewHoursPeriod).toFixed(2);
	
	
};

window.calculateTVPCurrtHoursPeriod = function()
{
	var CurrTargetVP = document.getElementById("UTILISATEURS$CHAMPU170");
	var CurrTargetVPHoursPeriod = document.getElementById("INTERVENTIONS_EN_COURS$VALEUR88");
	
	var d = new Date();
	var passedMonth = d.getMonth(); //Fetching months passed
	
	var TargetVPCurrHoursPeriod = (CurrTargetVP.value/12)*(passedMonth);
	//CurrTargetVPHoursPeriod.value = parseFloat(TargetVPCurrHoursPeriod).toFixed(2);
	formulaire.INTERVENTIONS_EN_COURS$VALEUR88.value = parseFloat(TargetVPCurrHoursPeriod).toFixed(2);
	
};

//Defaulting TVP Next Year Effective Date
window.defaultTVPNextYearEftvdate = function()
{
	var eftvDateField = document.getElementById("INTERVENTIONS_EN_COURS$VALEUR91");
	var d = new Date();
	nextYear = d.getFullYear() +1;
	eftvDateField.value = "01/01/"+nextYear;
	
};

//Calculating Target VP for Next Year
window.calculateTVPforNextYear = function()
{	//Pointer to Field TargetVPNextYEar
	var TVPNextYear = document.getElementById("INTERVENTIONS_EN_COURS$VALEUR90");
	
	//Fetch Values
	var CurrentTVP = document.getElementById("UTILISATEURS$CHAMPU170").value;
	var CurrentWorkingHours = document.getElementById("UTILISATEURS$CHAMPU184").value;
	var NewWorkingHours = document.getElementById("INTERVENTIONS_EN_COURS$VALEUR57").value;
	
	
	
	if (NewWorkingHours == "" || NewWorkingHours == "0")
	{
		NewWorkingHours = CurrentWorkingHours;
	}
	
	var tvpNxtYear = 0;
	
	if ( CurrentWorkingHours != "" && CurrentWorkingHours != "0" && CurrentTVP!=""  )
	{
		
		tvpNxtYear = (CurrentTVP/CurrentWorkingHours)*NewWorkingHours.toFixed(2);
	
	}
	
	TVPNextYear.value = (isNaN(tvpNxtYear)) ? 0 : tvpNxtYear;
	
	
};

//*****************End of MOD-001 ++ ******************************************


/********************************************
* Manage the display of jobType fields onload
*********************************************/
window.manageJobType = function(){
	var msg = "function manageJobType : ";
	var jobCategory = document.getElementById("INTERVENTIONS_EN_COURS$VALEUR48");
	var jobCode = document.getElementById("INTERVENTIONS_EN_COURS$VALEUR52");
	var jobDesc = document.getElementById("INTERVENTIONS_EN_COURS$VALEUR54");
	if(jobCategory){
		if(jobCode){
			if(jobDesc){
				//disable other fields
				if(jobCategory.value == "CSS" || jobCategory.value == "DSP"){
					jobCode.value = "";
					jobCode.disabled = true;
					jobDesc.value = "";
					jobDesc.disabled = true;
				}else{
					jobCode.disabled = false;
					jobDesc.disabled = false;
				}
			}else{
				msg += "field jobDesc not found";
				console.log(msg);
			}
		}else{
			msg += "field jobCode not found";
			console.log(msg);
		}
	}else{
		msg += "field jobCategory not found";
		console.log(msg);
	}
};

/************************************************
* MANAGE BUTTON 'SAP UPDATE AUTMATICALLY' DISPLAY
*************************************************/
window.buttonSap = function(){
	var msg = "fonction buttonSap : ";
	var field = formulaire.INTERVENTIONS_EN_COURS$VALEUR3;
	var button = document.getElementById("bouton_evenement1441");
	if(field && button){
		if(field.value == "18" || field.value == "53" || field.value == "56"){
			button.style.display = "";
		}else{
			button.style.display = "none";
		}
	}
};
window.hideButton = function(){
	var msg = "fonction hideButton : ";
	var field = formulaire.INTERVENTIONS_EN_COURS$ELEMENT;
	var button = document.getElementById("bouton_evenement1421");
	if(field && button){
		if(field.value == "Working hours" || field.value == "2115"){
			button.style.display = "";
		}else{
			button.style.display = "none";
		}
	}
};
window.generatedDocument = function(){
	var msg = "fonction generatedDocument : ";
	var field = formulaire.INTERVENTIONS_EN_COURS$VALEUR188;
	var button = document.getElementById("bouton_evenement1426");
	if(field && button){
		if(field.value == ""){
			button.style.display = "none";
		}else{
			button.style.display = "";
		}
	}
};

/*************************
* ACTIONS ON LOAD COMPLETE
**************************/
window.onloadForm = function(){
	//Disable fields
	disableFields();
	manageJobType();

	//COPY/PASTE CONTACT FIELDS IN CUSTOM FIELDS
	copyValues();
	//PROBATION DEFAULT VALUES
	defaultProbation();

	//CREATE POP-UPS LINKS
	//Action Code
	popupLink(formulaire.INTERVENTIONS_EN_COURS$VALEUR3,"/Custom_Referential/ActionsCode.aspx?Id_User=");
	//Cost Center
	popupLink(formulaire.INTERVENTIONS_EN_COURS$VALEUR16,"/Custom_Referential/CostCenter.aspx?Id_User=");
	//Service Line
	popupLink(formulaire.UTILISATEURS$CHAMPU167,"/Custom_Referential/ServiceLine.aspx");
	//Industry
	popupLink(formulaire.UTILISATEURS$CHAMPU163,"/Custom_Referential/Industry.aspx");
	//Community
	popupLink(formulaire.UTILISATEURS$CHAMPU165,"/Custom_Referential/Community.aspx");
	//Speciality
	popupLink(formulaire.UTILISATEURS$CHAMPU161,"/Custom_Referential/Specialty.aspx?Id_User=");
	//Job Name
	popupLink(formulaire.INTERVENTIONS_EN_COURS$VALEUR45,"/Custom_Referential/JobName.aspx?Id_User=");
	//Job Type - inutile ?
	//popupLink(formulaire.UTILISATEURS$CHAMPU181,"/Custom_Referential/JobType.aspx?Id_User=");
	//Work Location
	popupLink(formulaire.INTERVENTIONS_EN_COURS$VALEUR120,"/Custom_Referential/SubArea.aspx?Id_User=");
	//Local Grade
	popupLink(formulaire.INTERVENTIONS_EN_COURS$VALEUR41,"/Custom_Referential/LocalGrade.aspx?Id_User=");
	//Management HR
	popupLink(formulaire.UTILISATEURS$CHAMPU60,"/Custom_Referential/ManagerHR.aspx");
	//Management Training
	popupLink(formulaire.UTILISATEURS$CHAMPU70,"/Custom_Referential/ManagerTraining.aspx");
	//Management Supervisor
	popupLink(formulaire.UTILISATEURS$CHAMPU152,"/Custom_Referential/ManageSupervisor.aspx");
	//Management Reviewer
	popupLink(formulaire.UTILISATEURS$CHAMPU56,"/Custom_Referential/ManagerReviewer.aspx");
	//Management PayPlan
	popupLink(formulaire.UTILISATEURS$CHAMPU76,"/Custom_Referential/ManagerPayPlan.aspx");
	//Management Probation
	popupLink(formulaire.UTILISATEURS$CHAMPU74,"/Custom_Referential/ManageProbation.aspx");
	//Management Mentor
	popupLink(formulaire.UTILISATEURS$CHAMPU66,"/Custom_Referential/ManageMentor.aspx");
	
	//******************Begin of MOD-001 ++ *********************************
	//calculateTargetVPNewHoursPeriod(); //Fill readonly field on page load
	calculateTVPCurrtHoursPeriod(); //Fill readonly field on page load
	defaultTVPNextYearEftvdate(); //Setting TVP Next Year Effective Date as "01/01/Next Year"
	//******************End of MOD-001 ++ *********************************

	//CALCULATE FIELDS
	calculateCurrentPay();
	calculateNewPay();
	calculateCompensation();
	
	//Calculating Target VP for next year
	calculateTVPforNextYear(); //MOD-001++
	
	//hide button
	hideButton();
	buttonSap();
	generatedDocument();
};
ThisForm.Bind('loadcomplete', onloadForm);
