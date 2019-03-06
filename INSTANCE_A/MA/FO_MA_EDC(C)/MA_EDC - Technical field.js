/**************		MA EDC Front Office (C) Technical Fields	*************
********************************************************************************
Developer   - Surajit Dalal
Date	    - 25/05/2017
Change No   - MOD-001
Description - Changed Description based checking to code based Checking
******************************************************************************
Developer   - Md Shahbaz Khan
Date	    - 12/06/2017
Change No   - MOD-002
Description - Change Popuplink function, and change labels which are getting set as Popuplink
			  from Label for current, to label for new.
******************************************************************************
Developer   - Smita Singh
Date	    - 20/06/2017
Change No   - MOD-003
Description - Modify 'Employee started the process field' according to page id 
******************************************************************************
Developer   - Benjamin Chesson
Date	    - 29/06/2017
Description - Change value attribute for functions by code

******************************************************************
*******************************************************************
Developer   - COINTE Pierre (Neocase)
Date        - 30/06/2017
Description - Correction about custom field list 
*******************************************************************
*******************************************************************
Developer   - Md Shahbaz Khan
Date	    - 10/07/2017 (dd/mm/yyyy)
Change No   - MOD-005
Description - Showing Label names while displaying warning message for mandatory fields
*******************************************************************
Developer   - Surajit Dalal
Date	    - 12/07/2017 (dd/mm/yyyy)
Change No   - MOD-006
Description - calculAnnualSalary
*******************************************************************
Developer   - Smita Singh
Date	    - 13/07/2017 (dd/mm/yyyy)
Change No   - MOD-007
Description - Changes legal entity to company code in current fields
*******************************************************************
Developer   - Smita Singh
Date	    - 20/09/2017 (dd/mm/yyyy)
Change No   - MOD-008
Description - Remove default value probation period code and description
***********************************************************/


/**************
 * Hide Sections
 ***************/
//Technical section
ThisForm.HideSection("section537");

/***********************************
 * COPY VALUE FROM 1 FIELD TO ANOTHER
 ************************************/
window.copyValue = function(copyField, pasteField) {
    var msg = "fonction copyValue : ";
    var fieldTd = document.getElementsByClassName("fieldTD");
    if (fieldTd.length > 0) {
        //BackOffice side
        msg += "backoffice side";
        //COPY BKO FIELD
        //--------------
        var bkoCopyFieldValue = "";
        if (document.getElementById(copyField) === null) {
            //if copy field not found
            console.log("field to copy " + copyField + " not found");
            //return false;
        } else {
            //if copy field exists
            //get field value
            if (document.getElementById(copyField).type == "select" || document.getElementById(copyField).type == "select-one") {
                //copy select field
                bkoCopyFieldValue = document.getElementById(copyField).options[document.getElementById(copyField).selectedIndex].text;
            } else {
                //copy text field
                bkoCopyFieldValue = document.getElementById(copyField).value;
            }
        }

        //PASTE BKO FIELD
        //---------------
        //Only paste value if copy field existes
        if (bkoCopyFieldValue != "") {
            var bkoPasteFieldValue = "";
            if (document.getElementById(pasteField) === null) {
                //if paste field not found
                console.log("field to paste " + pasteField + " not found");
                //return false;
            } else {
                //if both fields exists we paste the values
                //Read Only fields
                if (pasteField.readOnly === true) {
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
                } else {
                    //Standard custom fields
                    if (document.getElementById(pasteField).type == "select" || document.getElementById(pasteField).type == "select-one") {
                        //select fields
                    } else {
                        //text fields
                        document.getElementById(pasteField).value = bkoCopyFieldValue;
                    }
                }
            }
        }
    } else {
        //FrontOffice side
        msg += "frontOffice side";
        //get copy field type and valeur
        var froCopyFieldCustomType = "";
        var froCopyFieldValeur = "";
        var froCopyFieldId = "";
        if (copyField.search("_") != -1) {
            if (copyField.split("$").length > 0) {
                if (copyField.split("_").length > 0) {
                    froCopyFieldCustomType = copyField;
                    var froCopyFieldValeurSplit = copyField.split("_");
                    var froCopyFieldValeurSplitLength = Number(froCopyFieldValeurSplit.length);
                    froCopyFieldValeur = froCopyFieldValeurSplit[froCopyFieldValeurSplitLength - 1];
                } else {
                    froCopyFieldCustomType = copyField.split("$")[0];
                    froCopyFieldValeur = copyField.split("$")[1];
                }
            } else if (copyField.split("_").length > 0) {
                froCopyFieldCustomType = copyField;
                var froCopyFieldSplit = copyField.split("_");
                var froCopyFieldSplitLength = Number(froCopyFieldSplit.length);
                froCopyFieldValeur = froCopyFieldSplit[froCopyFieldSplitLength - 1];
            } else {
                msg += " / copyfield values not found";
                console.log(msg);
            }
        } else {
            if (copyField.search("MOTSCLES") != -1) {
                froCopyFieldId = "MOTCLE";
            } else {
                msg += "no copyField found";
                console.log(msg);
            }
        }
        //get paste field type and valeur
        var froPasteFieldCustomType = "";
        var froPasteFieldValeur = "";
        var froPasteFieldId = "";
        if (pasteField.search("_") != -1) {
            if (pasteField.split("$").length > 1) {
                if (copyField.split("_").length > 0) {
                    froPasteFieldCustomType = pasteField;
                    var froPasteFieldValeurSplit = pasteField.split("_");
                    var froPasteFieldValeurSplitLength = Number(froPasteFieldValeurSplit.length);
                    froPasteFieldValeur = froPasteFieldValeurSplit[froPasteFieldValeurSplitLength - 1];
                } else {
                    froPasteFieldCustomType = pasteField.split("$")[0];
                    froPasteFieldValeur = pasteField.split("$")[1];
                }
            } else if (pasteField.split("_").length > 1) {
                froPasteFieldCustomType = pasteField;
                var froPasteFieldSplit = pasteField.split("_");
                var froPasteFieldSplitLength = Number(froPasteFieldSplit.length);
                froPasteFieldValeur = froPasteFieldSplit[froPasteFieldSplitLength - 1];
            } else {
                msg += " / pastefield values not found";
                console.log(msg);
            }
        } else {
            if (pasteField.search("MOTSCLES") != -1) {
                froPasteFieldId = "MOTCLE";
            } else {
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
        if (sections.length > 0) {
            //loop on every sections
            for (s = 0; s< sections.length; s++) {
                var froSelect = sections[s].getElementsByTagName("select");

                //LOOP ON SELECT
                //--------------
                if (froSelect.length > 0) {
                    for (fs = 0; fs< froSelect.length; fs++) {
                        //search copy field
                        if (froCopyFieldId == "") {
                            //search type correspondance
                            if (froSelect[fs].id.search(froCopyFieldCustomType) != -1) {
                                //search valeur correspondance
                                var froSelectCopySplit = froSelect[fs].id.split("_");
                                var froSelectCopyValeur = Number(froSelectCopySplit.length);
                                var froSelectCopyLast = froSelectCopySplit[froSelectCopyValeur - 1];
                                if (froSelectCopyLast == froCopyFieldValeur) {
                                    //if correspondance is found, we stock the copy field
                                    froCopyField = froSelect[fs];
                                    froCopyFieldValue = froSelect[fs].options[froSelect[fs].selectedIndex].text;
                                }
                            }
                        } else {
                            if (froSelect[fs].id.search(froCopyFieldId) != -1) {
                                //if correspondance is found, we stock the copy field
                                froCopyField = froSelect[fs];
                                froCopyFieldValue = froSelect[fs].options[froSelect[fs].selectedIndex].text;
                            }
                        }

                        //search paste field
                        if (froPasteFieldId == "") {
                            //search type correspondance
                            if (froSelect[fs].id.search(froPasteFieldCustomType) != -1) {
                                //search valeur correspondance
                                var froSelectPasteSplit = froSelect[fs].id.split("_");
                                var froSelectPasteValeur = Number(froSelectPasteSplit.length);
                                var froSelectPasteLast = froSelectPasteSplit[froSelectPasteValeur - 1];
                                if (froSelectPasteLast == froPasteFieldValeur) {
                                    //if correspondance is found, we stock the paste field
                                    froPasteField = froSelect[fs];
                                    froPasteFieldType = "select";
                                }
                            }
                        } else {
                            if (froSelect[fs].id.search(froPasteFieldId) != -1) {
                                //if correspondance is found, we stock the paste field
                                froPasteField = froSelect[fs];
                                froPasteFieldType = "select";
                            }
                        }
                    }
                }
                //if one of the copy/paste field isn't found, we search on input
                if (froCopyField == "" || froPasteField == "") {
                    var froInput = sections[s].getElementsByTagName("input");

                    //LOOP ON INPUT
                    //-------------
                    if (froInput.length > 0) {
                        for (fi = 0; fi< froInput.length; fi++) {
                            //search copy field
                            if (froCopyFieldId == "") {
                                //search type correspondance
                                if (froInput[fi].id.search(froCopyFieldCustomType) != -1) {
                                    //search valeur correspondance
                                    var froTextCopySplit = froInput[fi].id.split("_");
                                    var froTextCopyValeur = Number(froTextCopySplit.length);
                                    var froTextCopyLast = froTextCopySplit[froTextCopyValeur - 1];
                                    if (froTextCopyLast == froCopyFieldValeur) {
                                        //if correspondance is found, we stock the copy field
                                        froCopyField = froInput[fi];
                                        froCopyFieldValue = froInput[fi].value;
                                    }
                                }
                            } else {
                                if (froInput[fi].id.search(froCopyFieldId) != -1) {
                                    //if correspondance is found, we stock the copy field
                                    froCopyField = froInput[fi];
                                    froCopyFieldValue = froInput[fi].value;
                                }
                            }

                            //search paste field
                            if (froPasteFieldId == "") {
                                //search type correspondance
                                if (froInput[fi].id.search(froPasteFieldCustomType) != -1) {
                                    //search valeur correspondance
                                    var froTextPasteSplit = froInput[fi].id.split("_");
                                    var froTextPasteValeur = Number(froTextPasteSplit.length);
                                    var froTextPasteLast = froTextPasteSplit[froTextPasteValeur - 1];
                                    if (froTextPasteLast == froPasteFieldValeur) {
                                        //if correspondance is found, we stock the paste field
                                        froPasteField = froInput[fi];
                                        froPasteFieldType = "text";
                                    }
                                }
                            } else {
                                if (froInput[fi].id.search(froPasteFieldId) != -1) {
                                    //if correspondance is found, we stock the paste field
                                    froPasteField = froInput[fi];
                                    froPasteFieldType = "text";
                                }
                            }
                        }
                    }
                }
                //if one of the copy/paste field isn't found, we search on readonly fields
                if (froCopyField == "" || froPasteField == "") {
                    var froSpan = sections[s].getElementsByTagName("span");

                    //LOOP ON SPAN
                    //------------
                    if (froSpan.length > 0) {
                        for (fsp = 0; fsp< froSpan.length; fsp++) {
                            //take away mandatory fields indicators span
                            if (froSpan[fsp].id.search("Validator") == -1) {
                                //search copy field
                                if (froCopyFieldId == "") {
                                    //search type correspondance
                                    if (froSpan[fsp].id.search(froCopyFieldCustomType) != -1) {
                                        //search valeur correspondance
                                        var froReadonlyCopySplit = froSpan[fsp].id.split("_");
                                        var froReadonlyCopyValeur = Number(froReadonlyCopySplit.length);
                                        var froReadonlyCopyLast = froReadonlyCopySplit[froReadonlyCopyValeur - 1];
                                        if (froReadonlyCopyLast == froCopyFieldValeur) {
                                            //if correspondance is found, we stock the copy field
                                            froCopyField = froSpan[fsp];
                                            froCopyFieldValue = froSpan[fsp].innerHTML;
                                        }
                                    }
                                } else {
                                    if (froSpan[fsp].id.search(froCopyFieldId) != -1) {
                                        //if correspondance is found, we stock the copy field
                                        froCopyField = froSpan[fsp];
                                        froCopyFieldValue = froSpan[fsp].innerHTML;
                                    }
                                }

                                //search paste field
                                if (froPasteFieldId == "") {
                                    //search type correspondance
                                    if (froSpan[fsp].id.search(froPasteFieldCustomType) != -1) {
                                        //search valeur correspondance
                                        var froReadonlyPasteSplit = froSpan[fsp].id.split("_");
                                        var froReadonlyPasteValeur = Number(froReadonlyPasteSplit.length);
                                        var froReadonlyPasteLast = froReadonlyPasteSplit[froReadonlyPasteValeur - 1];
                                        if (froReadonlyPasteLast == froPasteFieldValeur) {
                                            //if correspondance is found, we stock the paste field
                                            froPasteField = froSpan[fsp];
                                            froPasteFieldType = "readonly";
                                        }
                                    }
                                } else {
                                    if (froSpan[fsp].id.search(froPasteFieldId) != -1) {
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
        if (froCopyField == "") {
            //alert("field to copy "+copyField+" not found");
        } else if (froPasteField == "") {
            //alert("field to paste "+pasteField+" not found");
        } else {
            //If fields exist, we paste the value
            if (froPasteFieldType == "select") {
                //if paste field is a select
            } else if (froPasteFieldType == "text") {
                //if paste field is a text
                froPasteField.value = froCopyFieldValue;
            } else if (froPasteFieldType == "readonly") {
                //if paste field is in read only
                froPasteField.innerHTML = froCopyFieldValue;
            } else {
                //error, no matching type found for paste field
                alert("Unknown type for " + froPasteField);
            }
        }
    }
};


/******************************************
 * CREATE HYPERLINK ON LABEL TO OPEN A POPUP
 *******************************************/
window.popupLink = function(field, url) {
    var msg = "function popupLink : ";
    if (field) {
        //get field label
        var fieldId = field.id;
        var fieldLabel;
        if (fieldId.search("INTERVENTIONS") != -1) {
            fieldLabel = fieldId.replace("INTERVENTIONS", "lblINTERVENTIONS");
        } else if (fieldId.search("UTILISATEURS") != -1) {
            fieldLabel = fieldId.replace("UTILISATEURS", "lblUTILISATEURS");
        } else {
            msg += "type de champ non prit en compte " + fieldId;
            console.log(msg);
        }
        if (fieldLabel.search("_display") != -1) {
            fieldLabel = fieldLabel.replace("_display", "");
        }
        //add case number in the URL if needed
        if (url.search("Id_Demande") != -1) {
            //url = url.replace("Id_Demande=","Id_Demande="+RequestContext.RequestNumber);
            url = url.replace("Id_Demande=", "Id_Demande=" + RequestContext.ContactId);
        }
        //add contact ID in the URL if needed
        if (url.search("Id_User") != -1) {
            url = url.replace("Id_User=", "Id_User=" + RequestContext.ContactId);
        }
        //Create hyperlink on label
        var onclick = "window.open('" + url + "','_blank')";
        var createPopup = document.createElement("a");
        createPopup.setAttribute("onclick", onclick);

        //var popupText = document.getElementById(fieldLabel).innerHTML; //MOD-002 --
        var popupField = document.getElementById(fieldLabel); //MOD-002 ++

        if (popupField) { //MOD-002 ++
            popupText = popupField.innerHTML;
            var t = document.createTextNode(popupText);
            createPopup.appendChild(t);
            if (document.getElementById(fieldLabel).innerHTML.search("</a>") == -1) {
                document.getElementById(fieldLabel).innerHTML = "";
                document.getElementById(fieldLabel).appendChild(createPopup);
            }
        } //MOd-002++
    } else {
        msg += "champ non trouvé";
        console.log(msg);
    }
};


/************************************************
 * FUNCTIONS CALLED BY POPUP TO FILL CUSTOM FIELDS
 *************************************************/
FillCf = function(fieldValue, fieldName) {
    var msg = "function FillCf : ";
    //remove 0 before field number
    if (fieldName.search("VALEUR0") != -1) {
        fieldName = fieldName.replace("VALEUR0", "VALEUR");
    }
    var field;
    var fieldNameSplit = fieldName.split("$")[1];
    var neocaseFields = document.getElementsByClassName("form-control");
    for (nf = 0; nf< neocaseFields.length; nf++) {
        var neocaseFieldsId = neocaseFields[nf].id.split("_");
        if (neocaseFieldsId[neocaseFieldsId.length - 1] == fieldNameSplit) {
            field = neocaseFields[nf];
        }
    }
    if (field) {
        //fill field
        field.value = fieldValue;
        champObligatoire(field, false);
        //Exception for field Global Grade
        if (fieldName == "INTERVENTIONS_EN_COURS$VALEUR239") {
            manageGlobalGrade();
            //Exception for field 'Job Category Code'
        } else if (fieldName == "INTERVENTIONS_EN_COURS$VALEUR48") {
            //disable other fields
            if (fieldValue == "CSS" || fieldValue == "DSP") {
                formulaire.INTERVENTIONS_EN_COURS$VALEUR52.value = "";
                formulaire.INTERVENTIONS_EN_COURS$VALEUR52.disabled = true;
                formulaire.INTERVENTIONS_EN_COURS$VALEUR54.value = "";
                formulaire.INTERVENTIONS_EN_COURS$VALEUR54.disabled = true;
            } else {
                formulaire.INTERVENTIONS_EN_COURS$VALEUR52.disabled = false;
                formulaire.INTERVENTIONS_EN_COURS$VALEUR54.disabled = false;
            }
            //Exception for fields 'Total No. of days / Month'
        } else if (fieldName == "INTERVENTIONS_EN_COURS$VALEUR265") {
            if (formulaire.INTERVENTIONS_EN_COURS$VALEUR262.value == "W") {
                //empty field
                field.value = "";
                champObligatoire(field, false);
            }
            //Exception for fields 'Total No. of days / Week'
        } else if (fieldName == "INTERVENTIONS_EN_COURS$VALEUR266") {
            if (formulaire.INTERVENTIONS_EN_COURS$VALEUR262.value == "M") {
                //empty field
                field.value = "";
                champObligatoire(field, false);
            }
            //Exception for fields 'Personal Area Desc'
        } else if (fieldName == "INTERVENTIONS_EN_COURS$VALEUR285") {
            if (formulaire.INTERVENTIONS_EN_COURS$ELEMENT) {
                if (formulaire.INTERVENTIONS_EN_COURS$ELEMENT.value != "") {
                    //empty field
                    field.value = "";
                    champObligatoire(field, false);
                }
            } else {
                msg += "field subtopic not found or readonly";
                console.log(msg);
            }
        }
    } else {
        msg += "field " + fieldName + " not found";
        console.log(msg);
    }
};

//job name
FillCf_Job_code = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR44.value = fieldValue;
};
FillCf_Job_Desc = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR46.value = fieldValue;
};

FillCf_Job_Catg = function(fieldValue) {
    //fill field
    formulaire.INTERVENTIONS_EN_COURS$VALEUR48.value = fieldValue;
    //disable other fields
    if (formulaire.INTERVENTIONS_EN_COURS$VALEUR48.value == "CSS" || formulaire.INTERVENTIONS_EN_COURS$VALEUR48.value == "DSP") {
        formulaire.INTERVENTIONS_EN_COURS$VALEUR52.value = "";
        formulaire.INTERVENTIONS_EN_COURS$VALEUR52.disabled = true;
        formulaire.INTERVENTIONS_EN_COURS$VALEUR54.value = "";
        formulaire.INTERVENTIONS_EN_COURS$VALEUR54.disabled = true;
    } else {
        formulaire.INTERVENTIONS_EN_COURS$VALEUR52.disabled = false;
        formulaire.INTERVENTIONS_EN_COURS$VALEUR54.disabled = false;
    }
};
FillCf_Job_Catg_Desc = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR50.value = fieldValue;
};
//Subarea
SC_Nm_SubAreaCode = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR121.value = fieldValue;
};
SC_Nm_SubAreaDesc = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR123.value = fieldValue;
};
//Management Popup - Reviewer
FillCf_Reviewer_First_Name = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR154.value = fieldValue;
};
FillCf_Reviewer_LastName = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR154.value += " " + fieldValue;
    champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR154, false);
};
FillCf_Reviewer_LocalID = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR156.value = fieldValue;
    champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR156, false);
};
FillCf_Reviewer_PersonelNum = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR158.value = fieldValue;
    champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR158, false);
};
//Management Popup - Supervisor
FillCf_Supervisor_First_Name = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR183.value = fieldValue;
};
FillCf_Supervisor_LastName = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR183.value += " " + fieldValue;
    champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR183, false);
};
FillCf_Supervisor_LocalID = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR185.value = fieldValue;
    champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR185, false);
};
FillCf_Supervisor_PersonelNum = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR187.value = fieldValue;
    champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR187, false);
};
//Management Popup - Local
FillCf_LocalName_First_Name = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR286.value = fieldValue;
};
FillCf_LocalName_LastName = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR286.value += " " + fieldValue;
    champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR286, false);
};
/*
FillCf_LocalName_LocalID = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR168.value = fieldValue;
	champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR168, false);
};
*/
FillCf_LocalName_PersonelNum = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR287.value = fieldValue;
    champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR287, false);
};
//Management Popup - Default
FillCf_DefaultName_First_Name = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR288.value = fieldValue;
};
FillCf_DefaultName_LastName = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR288.value += " " + fieldValue;
    champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR288, false);
};
/*
FillCf_DefaultName_LocalID = function(fieldValue){
	formulaire.INTERVENTIONS_EN_COURS$VALEUR168.value = fieldValue;
	champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR168, false);
};
*/
FillCf_DefaultName_PersonelNum = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR289.value = fieldValue;
    champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR289, false);
};
//Management Popup - Mentor
FillCf_Mentor_First_Name = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR166.value = fieldValue;
};
FillCf_Mentor_LastName = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR166.value += " " + fieldValue;
    champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR166, false);
};
FillCf_Mentor_LocalID = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR168.value = fieldValue;
    champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR168, false);
};
FillCf_Mentor_PersonelNum = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR170.value = fieldValue;
    champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR170, false);
};

/************
 * HIDE FIELDS
 *************/
window.hideField = function(FIELD_STRING) {
    var msg = "function hideField : ";
    var FIELD = "";
    //Si le champ est en lecture seule
    if (FIELD_STRING.search("getElementById") != -1) {
        SPLIT_FIELD_STRING = FIELD_STRING.split("\"");
        FIELD = document.getElementById(SPLIT_FIELD_STRING[1]);
    } else {
        //Si le champ est en création
        SPLIT_FIELD_STRING = FIELD_STRING.split(".");
        if (SPLIT_FIELD_STRING.length == 3) {
            FIELD_FILE = document.getElementById(SPLIT_FIELD_STRING[2] + "_display");
            if (FIELD_FILE) {
                FIELD = FIELD_FILE;
            } else {
                FIELD = document.getElementById(SPLIT_FIELD_STRING[2]);
            }
        } else if (SPLIT_FIELD_STRING.length == 2) {
            FIELD_FILE = document.getElementById(SPLIT_FIELD_STRING[1] + "_display");
            if (FIELD_FILE) {
                FIELD = FIELD_FILE;
            } else {
                FIELD = document.getElementById(SPLIT_FIELD_STRING[1]);
            }
        } else {
            msg += "field " + FIELD_STRING + " is undefined";
            console.log(msg);
        }
    }
    if (FIELD != "") {
        affichageChamp(FIELD, false);
    } else {
        msg += "var FIELD is undefined";
        console.log(msg);
    }
};
window.hideFields = function() {
 
    //GRADES
    hideField("formulaire.UTILISATEURS$CHAMPU331", false);
    //level
    hideField("formulaire.UTILISATEURS$CHAMPU240", false);
    hideField("formulaire.INTERVENTIONS_EN_COURS$VALEUR234", false);
    //Pay Region Code
    hideField("formulaire.UTILISATEURS$CHAMPU238", false);
    hideField("formulaire.INTERVENTIONS_EN_COURS$VALEUR236", false);
    //Pay Region Desc
    hideField("formulaire.UTILISATEURS$CHAMPU239", false);
    hideField("formulaire.INTERVENTIONS_EN_COURS$VALEUR237", false);
    //SBU Grade Code
    hideField("formulaire.UTILISATEURS$CHAMPU236", false);
    hideField("formulaire.INTERVENTIONS_EN_COURS$VALEUR241", false);
    //SBU Grade Desc
    hideField("formulaire.UTILISATEURS$CHAMPU237", false);
    hideField("formulaire.INTERVENTIONS_EN_COURS$VALEUR242", false);


    //JOB
    //Job Title Code
    hideField("formulaire.UTILISATEURS$CHAMPU177", false);
    hideField("formulaire.INTERVENTIONS_EN_COURS$VALEUR44", false);
    //Job Category Desc
    hideField("formulaire.UTILISATEURS$CHAMPU179", false);
    hideField("formulaire.INTERVENTIONS_EN_COURS$VALEUR50", false);

    //BASE LOCATION
    //Legal Entity Code
    //hideField("formulaire.INTERVENTIONS_EN_COURS$VALEUR350", false);
	hideField("formulaire.UTILISATEURS$CHAMPU22", false);              // MOD-007 
    hideField("formulaire.INTERVENTIONS_EN_COURS$VALEUR283", false);
    //Personal Area Code
    hideField("formulaire.UTILISATEURS$CHAMPU26", false);
    hideField("formulaire.INTERVENTIONS_EN_COURS$VALEUR284", false);
    //Personal Subarea Code
    hideField("formulaire.UTILISATEURS$CHAMPU28", false);
    hideField("formulaire.INTERVENTIONS_EN_COURS$VALEUR121", false);
    //Personal area description
    hideField("formulaire.INTERVENTIONS_EN_COURS$VALEUR285", false);

    //PROBATION UPDATE
    //Probation Code
    hideField("formulaire.UTILISATEURS$CHAMPU187", false);
    hideField("formulaire.INTERVENTIONS_EN_COURS$VALEUR130",false);

    //MANAGEMENT TEAM
    //Reviewer - PERN
    hideField("formulaire.INTERVENTIONS_EN_COURS$VALEUR158", false);
    //Supervisor - PERN
    hideField("formulaire.INTERVENTIONS_EN_COURS$VALEUR187", false);
    //Local Approver - PERN
    hideField("formulaire.INTERVENTIONS_EN_COURS$VALEUR287", false);
    //Default Approver - PERN
    hideField("formulaire.INTERVENTIONS_EN_COURS$VALEUR289", false);
    //Mentor - PERN
    hideField("formulaire.INTERVENTIONS_EN_COURS$VALEUR170", false);

    //Contract details
    //Contract Type
    hideField("formulaire.UTILISATEURS$CHAMPU43", false);
    hideField("formulaire.INTERVENTIONS_EN_COURS$VALEUR290", false);
    //Employee Notice Period
    hideField("formulaire.UTILISATEURS$CHAMPU274", false);
    hideField("formulaire.INTERVENTIONS_EN_COURS$VALEUR292", false);
    //Nature of Contract Code
    hideField("formulaire.UTILISATEURS$CHAMPU278", false);
    hideField("formulaire.INTERVENTIONS_EN_COURS$VALEUR310", false);
    //Qualification Code
    hideField("formulaire.UTILISATEURS$CHAMPU281", false);
    hideField("formulaire.INTERVENTIONS_EN_COURS$VALEUR312", false);

};
/***************
 * DISABLE FIELDS
 ****************/
window.disableField = function(field) {
    var msg = "function disableField : ";
    if (field) {
        field.onkeydown = function() { return false; };
    } else {
        msg += "field undefined or readonly";
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

    //Base Location
    //disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR283);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR123);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR285);

    //Contract Detail - Contract type
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR290);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR291);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR310);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR311);
    //Contract Detail - Notice Period
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR292);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR293);
	//Mangement team
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR154);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR183);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR286);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR288);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR166);
 


};

window.getParamFromUrl = function(param) {
    var vars = {};
    window.location.href.replace(location.hash, '').replace(
        /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
        function(m, key, value) { // callback
            vars[key] = value !== undefined ? value : '';
        }
    );

    if (param) {
        return vars[param] ? vars[param] : null;
    }
    return vars;

};

/****************************
 * AUTOMATICALLY FILL SUBTOPIC
 *****************************/
window.manageSubtopic = function() {
    var msg = "function manageSubtopic : ";
    var getSubtopic = localStorage.getItem('subtopic');
    var field = formulaire.INTERVENTIONS_EN_COURS$ELEMENT;

    //if(field.value != "0"){
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
    //}
    /*
    if(getSubtopic){
    	if(field){
    		if(getSubtopic == "Promotion"){
    			field.value = "2148";
    		}else if(getSubtopic == "Contract"){
    			field.value = "2182";
    		}else if(getSubtopic == "Base loc. Transfer"){
    			field.value = "2164";
    		}else if(getSubtopic == "Pay (Annual Salary/TVC)"){
    			field.value = "2197";
    		}else if(getSubtopic == "Management Team"){
    			field.value = "2234";
    		}else if(getSubtopic == "Job/Grade"){
    			field.value = "2174";
    		}else if(getSubtopic == "Fixed Term Contract Extension"){
    			field.value = "2167";
    		}else if(getSubtopic == "Probation Period Update"){
    			field.value = "2170";
    		}
    		if(field.value != ""){
    			champObligatoire(formulaire.INTERVENTIONS_EN_COURS$ELEMENT, false);
    		}
    	}else{
    		msg += "field Subtopic undefined";
    		console.log(msg);
    	}
    	//launch dependencies
    	//INTERVENTIONS_EN_COURS_ELEMENT_onchange();
    	
    }else{
    	msg += "localStorage.getItem(subtopic) undefined";
    	console.log(msg);
    } */
};



/********************
 * MANAGE GLOBAL GRADE
 *********************/
window.manageGlobalGrade = function() {
    var msg = "function manageGlobalGrade : ";
    var globalGradeOld = document.getElementById("UTILISATEURS$CHAMPU34");
    var globalGradeNew = document.getElementById("INTERVENTIONS_EN_COURS$VALEUR239");
    var SBUtime = document.getElementById("INTERVENTIONS_EN_COURS$VALEUR244");
    var adjustmentSBUtime = document.getElementById("INTERVENTIONS_EN_COURS$VALEUR245");
    var adjustedSBUtime = document.getElementById("INTERVENTIONS_EN_COURS$VALEUR247");
    if (globalGradeOld) {
        if (globalGradeNew) {
            if (SBUtime) {
                if (adjustmentSBUtime) {
                    //Test if old and new value are different
                    if (globalGradeOld.innerHTML != globalGradeNew.options[globalGradeNew.selectedIndex].text) {
                        //Set SBU time to '0' and disable it
                        SBUtime.value = 0;
                        disableField(SBUtime);
                        //Set Adjustment SBU time to '0'
                        adjustmentSBUtime.value = 0;
                    }
                    //Calculate adjusted SBU
                    if (adjustedSBUtime) {
                        adjustedSBUtime.value = Number(SBUtime.value) + Number(adjustmentSBUtime.value);
                    } else {
                        msg += "field INTERVENTIONS_EN_COURS$VALEUR247 not found";
                        console.log(msg);
                    }
                } else {
                    msg += "field INTERVENTIONS_EN_COURS$VALEUR245 not found";
                    console.log(msg);
                }
            } else {
                msg += "field INTERVENTIONS_EN_COURS$VALEUR244 not found";
                console.log(msg);
            }
        } else {
            msg += "field INTERVENTIONS_EN_COURS$VALEUR239 not found";
            console.log(msg);
        }
    } else {
        msg += "field UTILISATEURS$CHAMPU34 not found";
        console.log(msg);
    }
};

//*********** Start of MOD-001 **************

/**********************************
 * MANAGE JOB DESCRIPTION DEPENDANCY
 ***********************************/
window.jobCodeToDesc = function() {
    //Définition des variables
    var msg = "fonction jobCodeToDesc : ";
    var jobCode = formulaire.INTERVENTIONS_EN_COURS$VALEUR52;
    var jobType = formulaire.INTERVENTIONS_EN_COURS$VALEUR54;

    if (jobCode) {
        if (jobType) {
            //Si les 2 champs concernés sont trouvés, on exécute la fonction
            if (jobCode.options[jobCode.selectedIndex].getAttribute("code") == "176") {
                $(jobType).find('option[code*=188]').prop('selected', true); //Administrative Support
                //jobType.code = "188ÞAdministrative Support";
            } else if (jobCode.options[jobCode.selectedIndex].getAttribute("code") == "177") {
                $(jobType).find('option[code*=189]').prop('selected', true);
                //jobType.code = "189ÞCommunication & Advertising";
            } else if (jobCode.options[jobCode.selectedIndex].getAttribute("code") == "178") {
                $(jobType).find('option[code*=190]').prop('selected', true);
                //jobType.code = "190ÞDeal Analyst";
            } else if (jobCode.options[jobCode.selectedIndex].getAttribute("code") == "179") {
                $(jobType).find('option[code*=191]').prop('selected', true);
                //jobType.code = "191ÞFacilities & Accomodation";
            } else if (jobCode.options[jobCode.selectedIndex].getAttribute("code") == "180") {
                $(jobType).find('option[code*=192]').prop('selected', true);
                //jobType.code = "192ÞFinance";
            } else if (jobCode.options[jobCode.selectedIndex].getAttribute("code") == "181") {
                $(jobType).find('option[code*=193]').prop('selected', true);
                //jobType.code = "193ÞGeneral Management";
            } else if (jobCode.options[jobCode.selectedIndex].getAttribute("code") == "182") {
                $(jobType).find('option[code*=194]').prop('selected', true);
                //jobType.code = "194ÞSupport IT & Telco";
            } else if (jobCode.options[jobCode.selectedIndex].getAttribute("code") == "183") {
                $(jobType).find('option[code*=195]').prop('selected', true);
                //jobType.code = "195ÞKnowledge Management";
            } else if (jobCode.options[jobCode.selectedIndex].getAttribute("code") == "184") {
                $(jobType).find('option[code*=196]').prop('selected', true);
                //jobType.code = "196ÞMarketing";
            } else if (jobCode.options[jobCode.selectedIndex].getAttribute("code") == "185") {
                $(jobType).find('option[code*=197]').prop('selected', true);
                //jobType.code = "197ÞManagement Services";
            } else if (jobCode.options[jobCode.selectedIndex].getAttribute("code") == "186") {
                $(jobType).find('option[code*=198]').prop('selected', true);
                //jobType.code = "198ÞPRM";
            } else if (jobCode.options[jobCode.selectedIndex].getAttribute("code") == "187") {
                $(jobType).find('option[code*=199]').prop('selected', true);
                //jobType.code = "199ÞProcurement";
            }
        } else {
            msg += "var jobType (formulaire.INTERVENTIONS_EN_COURS$VALEUR54) non trouvée > champ absent ou non chargé";
            console.log(msg);
        }
    } else {
        msg += "var jobCode (formulaire.INTERVENTIONS_EN_COURS$VALEUR52) non trouvée > champ absent ou non chargé";
        console.log(msg);
    }
};
window.jobDescToCode = function() {
    //Définition des variables
    var msg = "fonction jobDescToCode : ";
    var jobCode = formulaire.INTERVENTIONS_EN_COURS$VALEUR52;
    var jobType = formulaire.INTERVENTIONS_EN_COURS$VALEUR54;
    if (jobCode) {
        if (jobType) {
				//Si les 2 champs concernés sont trouvés, on exécute la fonction
			if(jobType.options[jobType.selectedIndex].getAttribute("code") == "188"){
				$(jobCode).find('option[code*=176]').prop('selected',true);
				//jobCode.value = "176ÞASO";
			}else if(jobType.options[jobType.selectedIndex].getAttribute("code") == "189"){
				$(jobCode).find('option[code*=177]').prop('selected',true);
				//jobCode.value = "177ÞCAG";
			}else if(jobType.options[jobType.selectedIndex].getAttribute("code") == "190"){
				$(jobCode).find('option[code*=178]').prop('selected',true);
				//jobCode.value = "178ÞDAN";
			}else if(jobType.options[jobType.selectedIndex].getAttribute("code") == "191"){
				$(jobCode).find('option[code*=179]').prop('selected',true);
				//jobCode.value = "179ÞFAN";
			}else if(jobType.options[jobType.selectedIndex].getAttribute("code") == "192"){
				$(jobCode).find('option[code*=180]').prop('selected',true);
				//jobCode.value = "180ÞFIN";
			}else if(jobType.options[jobType.selectedIndex].getAttribute("code") == "193"){
				$(jobCode).find('option[code*=181]').prop('selected',true);
				//jobCode.value = "181ÞGMT";
			}else if(jobType.options[jobType.selectedIndex].getAttribute("code") == "194"){
				$(jobCode).find('option[code*=182]').prop('selected',true);
				//jobCode.value = "182ÞITI";
			}else if(jobType.options[jobType.selectedIndex].getAttribute("code") == "195"){
				$(jobCode).find('option[code*=183]').prop('selected',true);
				//jobCode.value = "183ÞKMT";
			}else if(jobType.options[jobType.selectedIndex].getAttribute("code") == "196"){
				$(jobCode).find('option[code*=184]').prop('selected',true);
				//jobCode.value = "184ÞMKG";
			}else if(jobType.options[jobType.selectedIndex].getAttribute("code") == "197"){
				$(jobCode).find('option[code*=185]').prop('selected',true);
				//jobCode.value = "185ÞMSE";
			}else if(jobType.options[jobType.selectedIndex].getAttribute("code") == "198"){
				$(jobCode).find('option[code*=186]').prop('selected',true);
				//jobCode.value = "186ÞPRM";
			}else if(jobType.options[jobType.selectedIndex].getAttribute("code") == "199"){
				$(jobCode).find('option[code*=187]').prop('selected',true);
				//jobCode.value = "187ÞPRO";
		/*
            //Si les 2 champs concernés sont trouvés, on exécute la fonction
            if (jobCode.options[jobCode.selectedIndex].getAttribute("code") == "188") {
                $(jobCode).find('option[code*=176]').prop('selected', true);
                //jobCode.code = "176ÞASO";
            } else if (jobCode.options[jobCode.selectedIndex].getAttribute("code") == "189") {
                $(jobCode).find('option[code*=177]').prop('selected', true);
                //jobCode.code = "177ÞCAG";
            } else if (jobCode.options[jobCode.selectedIndex].getAttribute("code") == "190") {
                $(jobCode).find('option[code*=178]').prop('selected', true);
                //jobCode.code = "178ÞDAN";
            } else if (jobCode.options[jobCode.selectedIndex].getAttribute("code") == "191") {
                $(jobCode).find('option[code*=179]').prop('selected', true);
                //jobCode.code = "179ÞFAN";
            } else if (jobCode.options[jobCode.selectedIndex].getAttribute("code") == "192") {
                $(jobCode).find('option[code*=180]').prop('selected', true);
                //jobCode.code = "180ÞFIN";
            } else if (jobCode.options[jobCode.selectedIndex].getAttribute("code") == "193") {
                $(jobCode).find('option[code*=181]').prop('selected', true);
                //jobCode.code = "181ÞGMT";
            } else if (jobCode.options[jobCode.selectedIndex].getAttribute("code") == "194") {
                $(jobCode).find('option[code*=182]').prop('selected', true);
                //jobCode.code = "182ÞITI";
            } else if (jobCode.options[jobCode.selectedIndex].getAttribute("code") == "195") {
                $(jobCode).find('option[code*=183]').prop('selected', true);
                //jobCode.code = "183ÞKMT";
            } else if (jobCode.options[jobCode.selectedIndex].getAttribute("code") == "196") {
                $(jobCode).find('option[code*=184]').prop('selected', true);
                //jobCode.code = "184ÞMKG";
            } else if (jobCode.options[jobCode.selectedIndex].getAttribute("code") == "197") {
                $(jobCode).find('option[code*=185]').prop('selected', true);
                //jobCode.code = "185ÞMSE";
            } else if (jobCode.options[jobCode.selectedIndex].getAttribute("code") == "198") {
                $(jobCode).find('option[code*=186]').prop('selected', true);
                //jobCode.code = "186ÞPRM";
            } else if (jobCode.options[jobCode.selectedIndex].getAttribute("code") == "199") {
                $(jobCode).find('option[code*=187]').prop('selected', true);
                //jobCode.code = "187ÞPRO";
		*/
            }
        
		
		
		} else {
            msg += "var jobType (formulaire.INTERVENTIONS_EN_COURS$VALEUR54) non trouvée > champ absent ou non chargé";
            console.log(msg);
        }
    } else {
        msg += "var jobCode (formulaire.INTERVENTIONS_EN_COURS$VALEUR52) non trouvée > champ absent ou non chargé";
        console.log(msg);
    }
};


/*************************************
 * MANAGE PROBATION STATUS DEPENDANCIES
 **************************************/
window.probationCodeToDesc = function() {
    //Définition des variables
    var msg = "fonction probationCodeToDesc : ";
    var probationCode = formulaire.INTERVENTIONS_EN_COURS$VALEUR130;
    var probationType = formulaire.INTERVENTIONS_EN_COURS$VALEUR132;
    if (probationCode) {
        if (probationType) {
            //Si les 2 champs concernés sont trouvés, on exécute la fonction
            if (probationCode.options[probationCode.selectedIndex].getAttribute("code") == "408") {
                $(probationType).find('option[code*=413]').prop('selected', true);
                //probationType.code = "413";
            } else if (probationCode.options[probationCode.selectedIndex].getAttribute("code") == "409") {
                $(probationType).find('option[code*=414]').prop('selected', true);
                //probationType.code = "414";
            } else if (probationCode.options[probationCode.selectedIndex].getAttribute("code") == "410") {
                $(probationType).find('option[code*=415]').prop('selected', true);
                //probationType.code = "415";
            } else if (probationCode.options[probationCode.selectedIndex].getAttribute("code") == "411") {
                $(probationType).find('option[code*=416]').prop('selected', true);
                //probationType.code = "416";
            } else if (probationCode.options[probationCode.selectedIndex].getAttribute("code") == "227") {
                $(probationType).find('option[code*=228]').prop('selected', true);
                //probationType.code = "228";
            } else if (probationCode.options[probationCode.selectedIndex].getAttribute("code") == "412") {
                $(probationType).find('option[code*=417]').prop('selected', true);
                //probationType.code = "417";
            }
        } else {
            msg += "var probationType (formulaire.INTERVENTIONS_EN_COURS$VALEUR132) non trouvée > champ absent ou non chargé";
            console.log(msg);
        }
    } else {
        msg += "var probationCode (formulaire.INTERVENTIONS_EN_COURS$VALEUR130) non trouvée > champ absent ou non chargé";
        console.log(msg);
    }
};
window.probationDescToCode = function() {
    //Définition des variables
    var msg = "fonction probationDescToCode : ";
    var probationCode = formulaire.INTERVENTIONS_EN_COURS$VALEUR130;
    var probationType = formulaire.INTERVENTIONS_EN_COURS$VALEUR132;
    if (probationCode) {
        if (probationType) {
            //Si les 2 champs concernés sont trouvés, on exécute la fonction
            if (probationType.options[probationType.selectedIndex].getAttribute("code") == "413") {
                $(probationCode).find('option[code*=408]').prop('selected', true);
                //probationCode.code = "408Þ01";
            } else if (probationType.options[probationType.selectedIndex].getAttribute("code") == "414") {
                $(probationCode).find('option[code*=409]').prop('selected', true);
                //probationCode.code = "409Þ02";
            } else if (probationType.options[probationType.selectedIndex].getAttribute("code") == "415") {
                $(probationCode).find('option[code*=411]').prop('selected', true);
                //probationCode.code = "411Þ04";
            } else if (probationType.options[probationType.selectedIndex].getAttribute("code") == "416") {
                $(probationCode).find('option[code*=411]').prop('selected', true);
                //probationCode.code = "411Þ04";
            } else if (probationType.options[probationType.selectedIndex].getAttribute("code") == "228") {
                $(probationCode).find('option[code*=227]').prop('selected', true);
                //probationCode.code = "227Þ05";
            } else if (probationType.options[probationType.selectedIndex].getAttribute("code") == "417") {
                $(probationCode).find('option[code*=412]').prop('selected', true);
                //probationCode.code = "412Þ06";
            }
        } else {
            msg += "var probationType (formulaire.INTERVENTIONS_EN_COURS$VALEUR132) non trouvée > champ absent ou non chargé";
            console.log(msg);
        }
    } else {
        msg += "var probationCode (formulaire.INTERVENTIONS_EN_COURS$VALEUR130) non trouvée > champ absent ou non chargé";
        console.log(msg);
    }
};

/********** 
window.probationDefaultCodeDesc = function() {

    var probationCode = formulaire.INTERVENTIONS_EN_COURS$VALEUR130;
    var probationType = formulaire.INTERVENTIONS_EN_COURS$VALEUR132;

    $(probationCode).find('option[code*=411]').prop('selected', true);
    $(probationType).find('option[code*=416]').prop('selected', true);
};
*/

window.removeProbationValue = function() {
    var msg = "function removeProbationValue : ";
    var probationCode = formulaire.INTERVENTIONS_EN_COURS$VALEUR130;
    var probationDesc = formulaire.INTERVENTIONS_EN_COURS$VALEUR132;
    if (probationCode) {
        if (probationDesc) {
            var probationCodeOptions = probationCode.options;
            if (probationCodeOptions.length > 0) {
                for (o = probationCodeOptions.length - 1; o >= 0; o--) {
                    if (probationCodeOptions[o].text == "03") {
                        probationCode.remove(probationCodeOptions[o].index);
                    }
                }
            }
            var probationDescOptions = probationDesc.options;
            if (probationDescOptions.length > 0) {
                for (o = probationDescOptions.length - 1; o >= 0; o--) {
                    //	if(probationDescOptions[o].text == "Unsuccessful")
                    if (probationDescOptions[o].text == "Unsuccessful" || probationDescOptions[o].text == "Rupture période d'essai") { //MOD-004++{
                        probationDesc.remove(probationDescOptions[o].index);
                    }
                }
            }
        } else {
            msg += "field Probation Status Desc not found or readonly";
            console.log(msg);
        }
    } else {
        msg += "field Probation Status Code not found or readonly";
        console.log(msg);
    }
};



/************************
* CALCULATE ANNUAL SALARY
*************************/
window.calculAnnualSalary = function(){
    var msg = "function calculAnnualSalary : ";
	//var annualSalary = document.getElementById("INTERVENTIONS_EN_COURS$VALEUR76");
    var annualSalary = formulaire.INTERVENTIONS_EN_COURS$VALEUR76;
    var annualSalaryValue = annualSalary.value;
    if(annualSalaryValue == ""){
        annualSalaryValue = 0;
    }else{
        annualSalaryValue = Number(annualSalaryValue);
    }
    //var percent = document.getElementById("UTILISATEURS$CHAMPU248");
    var percent = formulaire.UTILISATEURS$CHAMPU248;
	var percentValue = "";
	if(percent){
		percentValue = percent.value;
	}
    if(percentValue == ""){
        percentValue = 0;
    }else{
        percentValue = Number(percentValue);
    }
    //var annualSalaryPercent = document.getElementById("INTERVENTIONS_EN_COURS$VALEUR278");
    var annualSalaryPercent = formulaire.INTERVENTIONS_EN_COURS$VALEUR278;
    if(annualSalary){
           if(annualSalaryPercent){
               if(percentValue !== 0){
                   //annualSalaryPercent.value = (annualSalaryValue/percentValue).toFixed(1);
				annualSalaryPercent.value = ((annualSalaryValue/percentValue).toFixed(1)) * 100; //M)D-002++
               }else{
                   annualSalaryPercent.value = annualSalaryValue;
               }
           }else{
               msg += "field annualSalaryPercent (INTERVENTIONS_EN_COURS$VALEUR76) not found";
               console.log(msg);
           }
    }else{
        msg += "field annualSalary (INTERVENTIONS_EN_COURS$VALEUR278) not found";
        console.log(msg);
    }
};


/***********************************
 * Manage qualification code to desc
 **************************************/
window.qualificationCodeToDesc = function() {
    //Définition des variables
    var msg = "";
    var qualificationCode = formulaire.INTERVENTIONS_EN_COURS$VALEUR312;
    var qualificationDesc = formulaire.INTERVENTIONS_EN_COURS$VALEUR313;
    if (qualificationCode) {
        if (qualificationDesc) {
            if (qualificationCode.options[qualificationCode.selectedIndex].getAttribute("code") == "378") {
                $(qualificationDesc).find('option[code*=382]').prop('selected', true);
                //qualificationDesc.code = "382ÞCorporate";
            } else if (qualificationCode.options[qualificationCode.selectedIndex].getAttribute("code") == "379") {
                $(qualificationDesc).find('option[code*=383]').prop('selected', true);
                //qualificationDesc.code = "383ÞEmployee";
            } else if (qualificationCode.options[qualificationCode.selectedIndex].getAttribute("code") == "380") {
                $(qualificationDesc).find('option[code*=384]').prop('selected', true);
                //qualificationDesc.code = "384ÞTrainee";
            } else if (qualificationCode.options[qualificationCode.selectedIndex].getAttribute("code") == "381") {
                $(qualificationDesc).find('option[code*=385]').prop('selected', true);
                //qualificationDesc.code = "385ÞExecutive and Managers";
            }
        } else {
            msg += "var qualificationDesc (formulaire.INTERVENTIONS_EN_COURS$VALEUR313) non trouvée > champ absent ou non chargé";
            console.log(msg);
        }
    } else {
        msg += "var qualificationCode (formulaire.INTERVENTIONS_EN_COURS$VALEUR312) non trouvée > champ absent ou non chargé";
        console.log(msg);

    }
};
window.qualificationDescToCode = function() {
    //Définition des variables
    var msg = "fonction qualificationDescToCode : ";
    var qualificationCode = formulaire.INTERVENTIONS_EN_COURS$VALEUR312;
    var qualificationDesc = formulaire.INTERVENTIONS_EN_COURS$VALEUR313;
    if (qualificationCode) {
        if(qualificationDesc) {
           //Si les 2 champs concernés sont trouvés, on exécute la fonction
           if (qualificationDesc.options[qualificationDesc.selectedIndex].getAttribute("code") == "382") {
               $(qualificationCode).find('option[code*=378]').prop('selected', true);
               //qualificationCode.code = "378ÞCAD";
           } else if (qualificationDesc.options[qualificationDesc.selectedIndex].getAttribute("code") == "383") {
               $(qualificationCode).find('option[code*=379]').prop('selected', true);
               //qualificationCode.code = "379ÞEMP";
           } else if (qualificationDesc.options[qualificationDesc.selectedIndex].getAttribute("code") == "384") {
               $(qualificationCode).find('option[code*=380]').prop('selected', true);
               //qualificationCode.code = "380ÞSTA";
           } else if (qualificationDesc.options[qualificationDesc.selectedIndex].getAttribute("code") == "385") {
               $(qualificationCode).find('option[code*=381]').prop('selected', true);
               //qualificationCode.code = "381ÞDIR";
           }
        }else {
            msg += "var qualificationDesc (formulaire.INTERVENTIONS_EN_COURS$VALEUR313) non trouvée > champ absent ou non chargé";
            console.log(msg);
        }
    } else {
        msg += "var qualificationCode (formulaire.INTERVENTIONS_EN_COURS$VALEUR312) non trouvée > champ absent ou non chargé";
        console.log(msg);
    }
};


//****************************************** Begin of MOD-005 ++ *************************************
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

//****************************************** End of MOD-005 ++ *************************************

window.popupLinkFunction = function() {
	
	
    //CREATE POPUPS
    //Grades
    //popupLink(document.getElementById("UTILISATEURS$CHAMPU35"),"/Custom_Referential/Grade.aspx?Id_User="); //MOD-002--
    popupLink(document.getElementById("INTERVENTIONS_EN_COURS$VALEUR41"), "/Custom_Referential/Grade.aspx?Id_User="); //MOD-002++

    //Job Name
    popupLink(document.getElementById("INTERVENTIONS_EN_COURS$VALEUR46"), "/Custom_Referential/JobName.aspx?Id_User=");

    //Base Location - Personal Area
    //popupLink(document.getElementById("UTILISATEURS$CHAMPU27"),"/Custom_Referential/PersonalArea.aspx"); //MOD-002--
    //popupLink(document.getElementById("UTILISATEURS$CHAMPU29"),"/Custom_Referential/SubArea.aspx?Id_User="); //MOD-002--
    //popupLink(document.getElementById("INTERVENTIONS_EN_COURS$VALEUR285"), "/Custom_Referential/PersonalArea.aspx"); //MOD-002++
    popupLink(document.getElementById("INTERVENTIONS_EN_COURS$VALEUR123"), "/Custom_Referential/SubArea.aspx?Id_User="); //MOD-002++



    //Management - Reviewer
    //popupLink(document.getElementById("UTILISATEURS$CHAMPU56"),"/Custom_Referential/ManagerReviewer.aspx"); //MOD-002--
    popupLink(document.getElementById("INTERVENTIONS_EN_COURS$VALEUR154"), "/Custom_Referential/ManagerReviewer.aspx"); //MOd-002++

    //Management - Supervisor
    //popupLink(document.getElementById("UTILISATEURS$CHAMPU152"),"/Custom_Referential/ManageSupervisor.aspx"); //MOD-002--	
    popupLink(document.getElementById("INTERVENTIONS_EN_COURS$VALEUR183"), "/Custom_Referential/ManageSupervisor.aspx"); //MOD-002++

    //Management - Local approver
    //popupLink(document.getElementById("UTILISATEURS$CHAMPU68"),"/Custom_Referential/ManagerLocalName.aspx"); //MOD-002--	
    popupLink(document.getElementById("INTERVENTIONS_EN_COURS$VALEUR286"), "/Custom_Referential/ManagerLocalName.aspx"); //MOD-002++

    //Management - Default approver	
    //popupLink(document.getElementById("UTILISATEURS$CHAMPU234"),"/Custom_Referential/ManagerDefaultName.aspx"); //MOD-002--	
    popupLink(document.getElementById("INTERVENTIONS_EN_COURS$VALEUR288"), "/Custom_Referential/ManagerDefaultName.aspx"); //MOD-002++

    //Management - Mentor	
    //popupLink(document.getElementById("UTILISATEURS$CHAMPU66"),"/Custom_Referential/ManageMentor.aspx"); //MOD-002--
    popupLink(document.getElementById("INTERVENTIONS_EN_COURS$VALEUR166"), "/Custom_Referential/ManageMentor.aspx"); //MOD-002++

    //Contract Details - Contract Type
    //popupLink(document.getElementById("UTILISATEURS$CHAMPU273"),"/Custom_Referential/ContratType.aspx"); //MOD-002--
    popupLink(document.getElementById("INTERVENTIONS_EN_COURS$VALEUR291"), "/Custom_Referential/ContratType.aspx"); //MOD-002++

    //Contract Details - Employee Notice
    //popupLink(document.getElementById("UTILISATEURS$CHAMPU275"),"/Custom_Referential/NoticePeriod.aspx?Id_User="); //MOD-002--
    popupLink(document.getElementById("INTERVENTIONS_EN_COURS$VALEUR293"), "/Custom_Referential/NoticePeriod.aspx?Id_User="); //MOD-002++

};


/*************************
 * ACTIONS ON LOAD COMPLETE
 **************************/
window.onloadForm = function() {
    console.log("onload form");
    //FILL SUBTOPIC
    manageSubtopic();
    manageFields();
	
	//manageGlobalGrade();
    //COPY/PASTE TOPIC&SUBTOPIC code
    copyValue("INTERVENTIONS_EN_COURS$MOTCLE", "INTERVENTIONS_EN_COURS$VALEUR203");
    copyValue("INTERVENTIONS_EN_COURS$ELEMENT", "INTERVENTIONS_EN_COURS$VALEUR204");

    //HIDE FIELDS FRONTOFFICE
    console.log("before hidefields");
    hideFields();
    console.log("after hidefields");

    //DISABLE FIELDS
    console.log("before disableFields");
    disableFields();
    console.log("after disableFields");

    //remove 'unsuccessful' value for probation
    removeProbationValue();
    probationCodeToDesc();
    probationDescToCode();
   // probationDefaultCodeDesc();
	
	
	popupLinkFunction();
	
    //**************************************************************** Begin MOD-003******************************************
    if (window.location.search.indexOf('PageId=1154') > -1) {
        //document.getElementById("ctl04_ctl06_ctl00_UTILISATEURS_CHAMPU331").selectedIndex = 2;
        formulaire.UTILISATEURS$CHAMPU331.selectedIndex = 2;
    } else {
        //document.getElementById("ctl04_ctl06_ctl00_UTILISATEURS_CHAMPU331").selectedIndex = 1;
        formulaire.UTILISATEURS$CHAMPU331.selectedIndex = 1;
    }

    if ((window.location.search.indexOf('PageId=1154') > -1) || (window.location.search.indexOf('PageId=1177') > -1)) {
        //document.getElementById("ctl04_ctl06_ctl00_UTILISATEURS_CHAMPU331").selectedIndex = 2;
        formulaire.UTILISATEURS$CHAMPU331.selectedIndex = 2;
    }

    if ((window.location.search.indexOf('PageId=1153') > -1) || (window.location.search.indexOf('PageId=1176') > -1)) {
        //document.getElementById("ctl04_ctl06_ctl00_UTILISATEURS_CHAMPU331").selectedIndex = 1;
        formulaire.UTILISATEURS$CHAMPU331.selectedIndex = 1;
    }
    //**************************************************************** END MOD-003******************************************
};
ThisForm.Bind('loadcomplete', onloadForm);
