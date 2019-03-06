/**************   UK EDC STEP 3 (C) FO Deadline Fields  *************
******************************************************************
Modified version - MOD-002
Developer Name: Smita Singh
Date: 06/06/2017
Description: To modify the existing code with the new requirement
******************************************************************
******************************************************************
Developer   - Md Shahbaz khan
Date      - 06/06/2017
Change No   - MOD-001
Description - 1) Default Target VP related data
******************************************************************
******************************************************************
Developer   - oriana méril
Date      - 25/07/2017
Change No   - MOD-003
Description - 1) Replace .value by .innerHTLM
******************************************************************

*******************************************************************/

/**************
* Hide Sections
***************/
//Technical section
ThisForm.HideSection("section955");

/***********************************
* COPY VALUE FROM 1 FIELD TO ANOTHER
************************************/
window.copyValue = function(copyField,pasteField){
  var msg = "fonction copyValue : ";
  var fieldTd = document.getElementsByClassName("fieldTD");
  if(fieldTd.length > 0){
  //BackOffice side
    msg += "backoffice side";
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
    msg += "frontOffice side";
    //get copy field type and valeur
    var froCopyFieldCustomType = "";
    var froCopyFieldValeur = "";
    var froCopyFieldId = "";
    if(copyField.search("_") != -1){
      if(copyField.split("$").length > 0){
        if(copyField.split("_").length > 0){
          froCopyFieldCustomType = copyField;
          var froCopyFieldValeurSplit = copyField.split("_");
          var froCopyFieldValeurSplitLength = Number(froCopyFieldValeurSplit.length);
          froCopyFieldValeur = froCopyFieldValeurSplit[froCopyFieldValeurSplitLength-1];
        }else{
          froCopyFieldCustomType = copyField.split("$")[0];
          froCopyFieldValeur = copyField.split("$")[1];
        }
      }else if(copyField.split("_").length > 0){
        froCopyFieldCustomType = copyField;
        var froCopyFieldSplit = copyField.split("_");
        var froCopyFieldSplitLength = Number(froCopyFieldSplit.length);
        froCopyFieldValeur = froCopyFieldSplit[froCopyFieldSplitLength-1];
      }else{
        msg += " / copyfield values not found";
        console.log(msg);
      }
    }else{
      if(copyField.search("MOTSCLES") != -1){
        froCopyFieldId = "MOTCLE";
      }else{
        msg += "no copyField found";
        console.log(msg);
      }
    }
    //get paste field type and valeur
    var froPasteFieldCustomType = "";
    var froPasteFieldValeur = "";
    var froPasteFieldId = "";
    if(pasteField.search("_") != -1){
      if(pasteField.split("$").length > 1){
        if(copyField.split("_").length > 0){
          froPasteFieldCustomType = pasteField;
          var froPasteFieldValeurSplit = pasteField.split("_");
          var froPasteFieldValeurSplitLength = Number(froPasteFieldValeurSplit.length);
          froPasteFieldValeur = froPasteFieldValeurSplit[froPasteFieldValeurSplitLength-1];
        }else{
          froPasteFieldCustomType = pasteField.split("$")[0];
          froPasteFieldValeur = pasteField.split("$")[1];
        }
      }else if(pasteField.split("_").length > 1){
        froPasteFieldCustomType = pasteField;
        var froPasteFieldSplit = pasteField.split("_");
        var froPasteFieldSplitLength = Number(froPasteFieldSplit.length);
        froPasteFieldValeur = froPasteFieldSplit[froPasteFieldSplitLength-1];
      }else{
        msg += " / pastefield values not found";
        console.log(msg);
      }
    }else{
      if(pasteField.search("MOTSCLES") != -1){
        froPasteFieldId = "MOTCLE";
      }else{
        msg += "no pasteField found";
        console.log(msg);
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
			url = url+RequestContext.ContactId;
		}
		//Create hyperlink on label
		var onclick = "window.open('"+url+"','_blank')";
		var createPopup = document.createElement("a");
		createPopup.setAttribute("onclick",onclick);
		var popupText;
		if(document.getElementById(fieldLabel)){
			popupText = document.getElementById(fieldLabel).innerHTML;
			var t = document.createTextNode(popupText);
			createPopup.appendChild(t);
			if(document.getElementById(fieldLabel).innerHTML.search("</a>") == -1){
				document.getElementById(fieldLabel).innerHTML = "";
				document.getElementById(fieldLabel).appendChild(createPopup);
			}
		}else{
			msg += "label du champ non trouvé "+fieldId;
			console.log(msg);
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
  console.log("FillCf_Production_Unit_Code : "+fieldValue);
  formulaire.INTERVENTIONS_EN_COURS$VALEUR11.value = fieldValue;
};
FillCf_Production_Unit_Desc = function(fieldValue){
  console.log("FillCf_Production_Unit_Desc : "+fieldValue);
  formulaire.INTERVENTIONS_EN_COURS$VALEUR13.value = fieldValue;
};
FillCf_Org_Unit_Code = function(fieldValue){
  console.log("FillCf_Org_Unit_Code : "+fieldValue);
  formulaire.INTERVENTIONS_EN_COURS$VALEUR15.value = fieldValue;
};
FillCf_Org_Unit_Desc = function(fieldValue){
  console.log("FillCf_Org_Unit_Desc : "+fieldValue);
  formulaire.INTERVENTIONS_EN_COURS$VALEUR17.value = fieldValue;
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
  formulaire.INTERVENTIONS_EN_COURS$VALEUR27.value = fieldValue;
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
/*
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
}; */
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
  disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR48);
  disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR46);
    
  //Job Type
  disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR54);
  disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR52);
  
  //Subarea
  disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR123);
  disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR121);
  
  //Management HR Delivery
  //disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR146);
  //disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR144);
  //disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR142);
  //Management Training
  //disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR152);
  //disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR150);
  //disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR148);
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

/******************************
* FUNCTIONS TO CALCULATE FIELDS
*******************************/
window.calculateCurrentPay = function(){
  //current pay
  formulaire.INTERVENTIONS_EN_COURS$VALEUR86.value = Number(formulaire.INTERVENTIONS_EN_COURS$VALEUR75.value)+Number(formulaire.INTERVENTIONS_EN_COURS$VALEUR82.value);
};
window.calculateNewPay = function(){
  //new pay
  formulaire.INTERVENTIONS_EN_COURS$VALEUR87.value = Number(formulaire.INTERVENTIONS_EN_COURS$VALEUR76.value)+Number(formulaire.INTERVENTIONS_EN_COURS$VALEUR83.value);
};
window.calculateCompensation = function(){
  //Compensation
  formulaire.INTERVENTIONS_EN_COURS$VALEUR193.value = Number(formulaire.INTERVENTIONS_EN_COURS$VALEUR88.value)+Number(formulaire.INTERVENTIONS_EN_COURS$VALEUR89.value);
};

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
        if(validator[v].id.search("question") != -1){
          msg += "\n- question";
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
    //update the alert message
    m_requiredFieldsUndefined = msg;
    console.log("var m_requiredFieldsUndefined updated : "+m_requiredFieldsUndefined);
  }
  
  //If all previous control are valid, the function return "true" to execute the Submit function
  return true;
};

//Execute the custom function before the submit function
Neocase.attachBefore(window, 'ValidatorAlertRequiredFieldsOnSubmit', function(){return Neocase.checkForm();});

//Replace the label
window.replaceField = function(field, replace){
  if(field){
    var currentLabel = field.getElementsByTagName('label');
    currentLabel[0].innerHTML = currentLabel[0].innerHTML.replace(' :', replace);
  }
};

/*************************************Begin Mod-002 *************************************
 ******************************************************************************************
To manage effective date for Probation period extension and Fixed Term Contract Extension
********************************************************************************************/
window.setEffectiveDate= function(subtopic){
    
  var finalDate = formulaire.INTERVENTIONS_EN_COURS$VALEUR5;
  if(subtopic.value == 2050 || subtopic.value == 2044){
    var dateFin = new Date();
    dateFin.setDate(dateFin.getDate());
    dateFin.setMonth(dateFin.getMonth());     
    var jourFin = dateFin.getDate();
    var moisFin = dateFin.getMonth()+1;
      if(parseInt(jourFin) > 10 ){
          //do nothing
      }else{
        jourFin = "0"+jourFin;
        console.log("date is" + jourFin.value);
        }
      if(moisFin == "10" || moisFin == "11" || moisFin == "12"){
                                              //do nothing
            }else{
                moisFin = "0"+moisFin;
                }
      var anneeFin = dateFin.getFullYear();
      var dateFinal = jourFin+"/"+moisFin+"/"+anneeFin;
      finalDate.value = dateFinal;
          //finalDate.className = " ";
          //disableField(finalDate);
          //finalDate.parentNode.getElementsByTagName("img")[0].style.display = "none";
        document.getElementById('divFieldINTERVENTIONS_EN_COURS_VALEUR5').style.visibility="hidden";
        var div = document.getElementById('divLblINTERVENTIONS_EN_COURS_VALEUR5');
        var str = dateFinal;
        var temp = document.createElement('div');
        temp.innerHTML = str;
        while (temp.firstChild) {
        div.appendChild(temp.firstChild);
        }
        //div.readOnly = true;
  }else{
      console.log("subtopic is not Probation period extension or Fixed Term Contract Extension");
      var div1 = document.getElementById('divFieldINTERVENTIONS_EN_COURS_VALEUR5');
          var str1 = '#Effective date is always 1st of a month';
          var temp1 = document.createElement('div1');
          temp1.innerHTML = str1;
          while (temp1.firstChild) {
          div1.appendChild(temp1.firstChild);
          }
    }

};

//************************************* Mod-002 *********************************

//*****************Begin of MOD-001 ++ ******************************************
//*****************Begin of MOD-003  ******************************************
window.calculateTargetVPNewHoursPeriod = function()
{
  var NewTargetVP = formulaire.INTERVENTIONS_EN_COURS$VALEUR78;
  var NewTargetVPHoursPeriod = formulaire.INTERVENTIONS_EN_COURS$VALEUR89;
  
  var d = new Date();
  var currMonth = d.getMonth();
  var remainingMonths = 12 - currMonth;
    if(NewTargetVP){
      var TargetVPNewHoursPeriod = (NewTargetVP.innerHTML/12)*(remainingMonths);
      NewTargetVPHoursPeriod.value = parseFloat(TargetVPNewHoursPeriod).toFixed(2);
    }
  
};
//*****************End of MOD-001 ++ ******************************************
//*****************End of MOD-003  ******************************************


/*************************
* ACTIONS ON LOAD COMPLETE
**************************/
window.onloadForm = function(){
  //Disable fields
  disableFields();
  manageJobType();
  
  //Manage effective date for fixed term contarct and break of probation 
  setEffectiveDate(formulaire.INTERVENTIONS_EN_COURS$ELEMENT);
  
  //CREATE POP-UPS LINKS
  //Cost Center
  popupLink(formulaire.INTERVENTIONS_EN_COURS$VALEUR17,"/Custom_Referential/CostCenter.aspx?Id_User=");
  //Community
  popupLink(formulaire.INTERVENTIONS_EN_COURS$VALEUR27,"/Custom_Referential/Specialty.aspx?Id_User=");
  //Job Name
  popupLink(formulaire.INTERVENTIONS_EN_COURS$VALEUR46,"/Custom_Referential/JobName.aspx?Id_User=");
  //Job Type - inutile ?
  //popupLink(formulaire.UTILISATEURS$CHAMPU178,"/Custom_Referential/JobType.aspx?Id_User=");
  //Work Location
  popupLink(formulaire.INTERVENTIONS_EN_COURS$VALEUR123,"/Custom_Referential/SubArea.aspx?Id_User=");
  //Management HR
  //popupLink(formulaire.INTERVENTIONS_EN_COURS$VALEUR142,"/Custom_Referential/ManagerHR.aspx");
  //Management Training
  //popupLink(formulaire.INTERVENTIONS_EN_COURS$VALEUR148,"/Custom_Referential/ManagerTraining.aspx");
  //Management Reviewer
  popupLink(formulaire.INTERVENTIONS_EN_COURS$VALEUR154,"/Custom_Referential/ManagerReviewer.aspx");
  //Management PayPlan
  popupLink(formulaire.INTERVENTIONS_EN_COURS$VALEUR160,"/Custom_Referential/ManagerPayPlan.aspx");
  //Management Supervisor
  popupLink(formulaire.INTERVENTIONS_EN_COURS$VALEUR183,"/Custom_Referential/ManageSupervisor.aspx");
  //Management Mentor
  popupLink(formulaire.INTERVENTIONS_EN_COURS$VALEUR166,"/Custom_Referential/ManageMentor.aspx");
  //Management Probation
  popupLink(formulaire.INTERVENTIONS_EN_COURS$VALEUR172,"/Custom_Referential/ManageProbation.aspx");
  //Local Grade
  popupLink(formulaire.INTERVENTIONS_EN_COURS$VALEUR41,"/Custom_Referential/LocalGrade.aspx?Id_User=");

  //Check label with ":"
  replaceField(document.getElementById('divLblINTERVENTIONS_EN_COURS_VALEUR205'),"");
  replaceField(document.getElementById('divLblINTERVENTIONS_EN_COURS_VALEUR206'),"");
};
ThisForm.Bind('loadcomplete', onloadForm);
