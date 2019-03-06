//MA_EDC - Technical field BACKOFFICE
/*************************************
V 1.0 - Initial Version
*************************************/
/*************************************
Developer   - Md Shahbaz khan
Date        - 01/06/2017
Change No   - MOD-001
Description - Changed code to Hide Perner Field which is visible in Management Team Section
**************************************

*************************************
Developer   - SURAJIT DALAL
Date        - 26/05/2017
Change No   - MOD-002
Description - Changed code to Hide Perner Field which is visible in Management Team Section
**************************************
Developer   - Smita Singh
Date        - 20/06/2017
Change No   - MOD-003
Description - Manage pop up according to mock up
**************************************

*************************************
Developer   - Leconte Romain
Date        - 29/06/2017
Change No   - MOD-004
Description - Changed value to code for jobCode function
**************************************
*************************************
Developer   - COINTE Pierre (Neocase)
Date        - 30/06/2017
Change No   - MOD-005
Description - Update about custom field list 
**************************************
Developer   - Smita Singh
Date        - 05/07/2017
Change No   - MOD-006
Description - Not to display the button SAP update automatically for 'Promotion','mangement team' 
*******************************************************************************************
*
eveloper   - Smita Singh
Date        - 10/07/2017
Change No   - MOD-006
Description - To hide legal entity current and new,personal are code and description new for subtopic 'Base Location' 
*******************************************************************************************
*/



/**************
 * Hide Sections
 ***************/
//Technical section
ThisForm.HideSection("section418");

/***********************************
 * COPY VALUE FROM 1 FIELD TO ANOTHER
 ************************************/
window.copyValue = function(copyField, pasteField) {
    var fieldTd = document.getElementsByClassName("fieldTD");
    if (fieldTd.length > 0) {
        //BackOffice side
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
        //get copy field type and valeur
        var froCopyFieldCustomType = "";
        var froCopyFieldValeur = "";
        var froCopyFieldId = "";
        if (copyField.search("_") != -1) {
            if (copyField.split("$").length > 0) {
                froCopyFieldCustomType = copyField.split("$")[0];
                froCopyFieldValeur = copyField.split("$")[1];
            } else if (copyField.split("_").length > 0) {
                froCopyFieldCustomType = copyField;
                var froCopyFieldSplit = copyField.split("_");
                var froCopyFieldSplitLength = Number(froCopyFieldSplit.length);
                froCopyFieldValeur = froCopyFieldSplit[froCopyFieldSplitLength - 1];
            }
        } else {
            if (copyField.search("MOTSCLES") != -1) {
                froCopyFieldId = "MOTCLE";
            }
        }
        //get paste field type and valeur
        var froPasteFieldCustomType = "";
        var froPasteFieldValeur = "";
        var froPasteFieldId = "";
        if (pasteField.search("_") != -1) {
            if (pasteField.split("$").length > 1) {
                froPasteFieldCustomType = pasteField.split("$")[0];
                froPasteFieldValeur = pasteField.split("$")[1];
            } else if (pasteField.split("_").length > 1) {
                froPasteFieldCustomType = pasteField;
                var froPasteFieldSplit = pasteField.split("_");
                var froPasteFieldSplitLength = Number(froPasteFieldSplit.length);
                froPasteFieldValeur = froPasteFieldSplit[froPasteFieldSplitLength - 1];
            }
        } else {
            if (pasteField.search("MOTSCLES") != -1) {
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
            url = url.replace("Id_Demande=", "Id_Demande=" + numeroIntervention);
        }
        //add contact ID in the URL if needed
        if (url.search("Id_User") != -1) {
            url = url.replace("Id_User=", "Id_User=" + CodeUtilisateurBis);
        }
        //Create hyperlink on label
        var onclick = "window.open('" + url + "','_blank')";
        var createPopup = document.createElement("a");
        createPopup.setAttribute("onclick", onclick);
        var popupText = document.getElementById(fieldLabel).innerHTML;
        var t = document.createTextNode(popupText);
        createPopup.appendChild(t);
        if (document.getElementById(fieldLabel).innerHTML.search("</a>") == -1) {
            document.getElementById(fieldLabel).innerHTML = "";
            document.getElementById(fieldLabel).appendChild(createPopup);
        }
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
    console.log(fieldName);
    var field = document.getElementById(fieldName);
    if (field) {
        console.log("field id found");
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
                if (formulaire.INTERVENTIONS_EN_COURS$ELEMENT.value != "2194") {
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
//Action reason
FillCf_type_code = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR1.value = fieldValue;
};
FillCf_type_name = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR2.value = fieldValue;
};
FillCf_reason_code = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR3.value = fieldValue;
};
FillCf_reason_name = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR4.value = fieldValue;
};
//Organization detail - Service Line
SC_Nm_ServiceLineCode = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR37.value = fieldValue;
};
SC_Nm_ServiceLineDesc = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR39.value = fieldValue;
};
//Organization detail - Industry
SC_Nm_IndustryCode = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR29.value = fieldValue;
};
SC_Nm_IndustryDesc = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR31.value = fieldValue;
};
//Organization detail - Community
FillCf_CommunityCode = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR33.value = fieldValue;
};
FillCf_CommunityDescription = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR35.value = fieldValue;
};
//Organization detail - Affiliated Community
SC_Nm_SpecialtyCode = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR25.value = fieldValue;
};
SC_Nm_SpecialtyDesc = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR27.value = fieldValue;
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

//Contract
FillCf_MA_Nature_code = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR310.value = fieldValue;
};

FillCf_MA_Nature_Desc = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR311.value = fieldValue;
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
FillCf_Employee_Group_code = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR363.value = fieldValue;
};
FillCf_Employee_Group_desc = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR315.value = fieldValue;
};
FillCf_Employee_Sub_Group_code = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR364.value = fieldValue;
};
FillCf_Employee_Sub_Group_desc = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR365.value = fieldValue;
};
/***************
 * DISABLE FIELDS
 ****************/

window.capgDisable = function(fieldGotByID) {
    $(fieldGotByID).parent().prepend("<div id=\"prependedid" + fieldGotByID.id + "\" style=\"width: 100%; height: 30px; position: absolute;\"></div>");
};


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
    //Cost Center
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR15);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR17);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR231);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR232);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR233);
    //Organization Unit
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR11);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR13);

    //Organization Detail - Service Line /!\ MISSING
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR37);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR39);
    //Organization Detail - Industry
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR29);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR31);
    //Organization Detail - Community
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR33);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR35);
    //Organization Detail - Affiliated
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR25);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR27);

    //Grade
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR41);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR234);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR236);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR237);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR239);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR240);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR241);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR242);

    //Job
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR44);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR46);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR48);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR50);

    //Working Hours - PT Work Schedule
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR255);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR256);
    if (formulaire.INTERVENTIONS_EN_COURS$VALEUR249) {
        if (formulaire.INTERVENTIONS_EN_COURS$VALEUR57) {
            if (formulaire.INTERVENTIONS_EN_COURS$VALEUR249.value != "") {
                disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR57);
                formulaire.INTERVENTIONS_EN_COURS$VALEUR57.value = "";
                //Senor Code
                var employmentPercent = Number(formulaire.INTERVENTIONS_EN_COURS$VALEUR249.value);
                var weeklyWorkingHours = Number(formulaire.INTERVENTIONS_EN_COURS$VALEUR57.value);
                if (employmentPercent< 100 || weeklyWorkingHours< 35) {
                    if (formulaire.INTERVENTIONS_EN_COURS$VALEUR257) {
                        formulaire.INTERVENTIONS_EN_COURS$VALEUR257.disabled = true;
                    }
                    if (formulaire.INTERVENTIONS_EN_COURS$VALEUR258) {
                        formulaire.INTERVENTIONS_EN_COURS$VALEUR258.disabled = true;
                    }
                } else {
                    if (formulaire.INTERVENTIONS_EN_COURS$VALEUR257) {
                        formulaire.INTERVENTIONS_EN_COURS$VALEUR257.disabled = false;
                    }
                    if (formulaire.INTERVENTIONS_EN_COURS$VALEUR258) {
                        formulaire.INTERVENTIONS_EN_COURS$VALEUR258.disabled = false;
                    }
                }
            } else if (formulaire.INTERVENTIONS_EN_COURS$VALEUR57.value != "") {
                disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR249);
                formulaire.INTERVENTIONS_EN_COURS$VALEUR249.value = "";
            }
        }
    }

    //Work From Home
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR262);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR263);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR264);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR265);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR266);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR267);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR268);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR269);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR270);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR271);

    //Base Location
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR283);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR284);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR285);

    //Management Team /!\ MISSING

    //Contract Detail - Contract type
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR290);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR291);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR310);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR311);
    //Contract Detail - Notice Period
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR292);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR293);
    //Contract Detail - Qualification/Status/Position/Coef
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR298);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR299);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR300);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR301);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR302);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR303);

    //Employee Group
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR314);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR315);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR179);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR181);

    //Mandate Details
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR316);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR317);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR320);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR325);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR326);

    // Emplyee Sub Group
    /*
    capgDisable(formulaire.INTERVENTIONS_EN_COURS$VALEUR314);
    capgDisable(formulaire.INTERVENTIONS_EN_COURS$VALEUR315);
    capgDisable(formulaire.INTERVENTIONS_EN_COURS$VALEUR179);
    capgDisable(formulaire.INTERVENTIONS_EN_COURS$VALEUR181);
    */
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR363);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR315);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR364);
    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR365);

    // HEADER
    formulaire.INTERVENTIONS_EN_COURS$VALEUR1.onkeydown = function() { return false; };
    formulaire.INTERVENTIONS_EN_COURS$VALEUR2.onkeydown = function() { return false; };
    formulaire.INTERVENTIONS_EN_COURS$VALEUR3.onkeydown = function() { return false; };
    formulaire.INTERVENTIONS_EN_COURS$VALEUR4.onkeydown = function() { return false; };

};


/********************
 * MANAGE GLOBAL GRADE
 *********************/
window.manageGlobalGrade = function() {
    var msg = "function manageGlobalGrade : ";
    var globalGradeOld = document.getElementById("INTERVENTIONS_EN_COURS$VALEUR238");
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
                $(jobType).find('option[code*=188]').prop('selected', true);
                //jobType.value = "188|Administrative Support";
            } else if (jobCode.options[jobCode.selectedIndex].getAttribute("code") == "177") {
                $(jobType).find('option[code*=189]').prop('selected', true);
                //jobType.value = "189|Communication & Advertising";
            } else if (jobCode.options[jobCode.selectedIndex].getAttribute("code") == "178") {
                $(jobType).find('option[code*=190]').prop('selected', true);
                //jobType.value = "190|Deal Analyst";
            } else if (jobCode.options[jobCode.selectedIndex].getAttribute("code") == "179") {
                $(jobType).find('option[code*=191]').prop('selected', true);
                //jobType.value = "191|Facilities & Accomodation";
            } else if (jobCode.options[jobCode.selectedIndex].getAttribute("code") == "180") {
                $(jobType).find('option[code*=192]').prop('selected', true);
                //jobType.value = "192|Finance";
            } else if (jobCode.options[jobCode.selectedIndex].getAttribute("code") == "181") {
                $(jobType).find('option[code*=193]').prop('selected', true);
                //jobType.value = "193|General Management";
            } else if (jobCode.options[jobCode.selectedIndex].getAttribute("code") == "182") {
                $(jobType).find('option[code*=194]').prop('selected', true);
                //jobType.value = "194|Support IT & Telco";
            } else if (jobCode.options[jobCode.selectedIndex].getAttribute("code") == "183") {
                $(jobType).find('option[code*=195]').prop('selected', true);
                //jobType.value = "195|Knowledge Management";
            } else if (jobCode.options[jobCode.selectedIndex].getAttribute("code") == "184") {
                $(jobType).find('option[code*=196]').prop('selected', true);
                //jobType.value = "196|Marketing";
            } else if (jobCode.options[jobCode.selectedIndex].getAttribute("code") == "185") {
                $(jobType).find('option[code*=197]').prop('selected', true);
                //jobType.value = "197|Management Services";
            } else if (jobCode.options[jobCode.selectedIndex].getAttribute("code") == "186") {
                $(jobType).find('option[code*=198]').prop('selected', true);
                //jobType.value = "198|PRM";
            } else if (jobCode.options[jobCode.selectedIndex].getAttribute("code") == "187") {
                $(jobType).find('option[code*=199]').prop('selected', true);
                //jobType.value = "199|Procurement";
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
            if (jobType.options[jobType.selectedIndex].getAttribute("code") == "188") { //
                $(jobCode).find('option[code*=176]').prop('selected', true);
                //jobCode.value = "176|ASO";
            } else if (jobType.options[jobType.selectedIndex].getAttribute("code") == "189") { //Communication & Advertising
                $(jobCode).find('option[code*=177]').prop('selected', true);
                //jobCode.value = "177|CAG";
            } else if (jobType.options[jobType.selectedIndex].getAttribute("code") == "190") { //Deal Analyst
                $(jobCode).find('option[code*=178]').prop('selected', true);
                //jobCode.value = "178|DAN";
            } else if (jobType.options[jobType.selectedIndex].getAttribute("code") == "191") { //Facilities & Accomodation
                $(jobCode).find('option[code*=179]').prop('selected', true);
                //jobCode.value = "179|FAN";
            } else if (jobType.options[jobType.selectedIndex].getAttribute("code") == "192") { //Finance
                $(jobCode).find('option[code*=180]').prop('selected', true);
                //jobCode.value = "180|FIN";
            } else if (jobType.options[jobType.selectedIndex].getAttribute("code") == "193") {
                $(jobCode).find('option[code*=181]').prop('selected', true);
                //jobCode.value = "181|GMT";
            } else if (jobType.options[jobType.selectedIndex].getAttribute("code") == "194") {
                $(jobCode).find('option[code*=182]').prop('selected', true);
                //jobCode.value = "182|ITI";
            } else if (jobType.options[jobType.selectedIndex].getAttribute("code") == "195") {
                $(jobCode).find('option[code*=183]').prop('selected', true);
                //jobCode.value = "183|KMT";
            } else if (jobType.options[jobType.selectedIndex].getAttribute("code") == "196") {
                $(jobCode).find('option[code*=184]').prop('selected', true);
                //jobCode.value = "184|MKG";
            } else if (jobType.options[jobType.selectedIndex].getAttribute("code") == "197") {
                $(jobCode).find('option[code*=185]').prop('selected', true);
                //jobCode.value = "185|MSE";
            } else if (jobType.options[jobType.selectedIndex].getAttribute("code") == "198") {
                $(jobCode).find('option[code*=186]').prop('selected', true);
                //jobCode.value = "186|PRM";
            } else if (jobType.options[jobType.selectedIndex].getAttribute("code") == "199") {
                $(jobCode).find('option[code*=187]').prop('selected', true);
                //jobCode.value = "187|PRO";
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



/************************
 * CALCULATE ANNUAL SALARY
 *************************/
window.calculAnnualSalary = function() {
    var msg = "function calculAnnualSalary : ";
    var annualSalary = document.getElementById("INTERVENTIONS_EN_COURS$VALEUR76");
    var annualSalaryValue = annualSalary.value;
    if (annualSalaryValue == "") {
        annualSalaryValue = 0;
    } else {
        annualSalaryValue = Number(annualSalaryValue);
    }
    var percent = document.getElementById("UTILISATEURS$CHAMPU248");
    var percentValue = percent.value;
    if (percentValue == "") {
        percentValue = 0;
    } else {
        percentValue = Number(percentValue);
    }
    var annualSalaryPercent = document.getElementById("INTERVENTIONS_EN_COURS$VALEUR278");
    if (annualSalary) {
        if (percent) {
            if (annualSalaryPercent) {
                if (percentValue !== 0) {
                    //annualSalaryPercent.value = (annualSalaryValue/percentValue).toFixed(1);
                    annualSalaryPercent.value = ((annualSalaryValue / percentValue).toFixed(1)) * 100; //M)D-002++
                } else {
                    annualSalaryPercent.value = annualSalaryValue;
                }
            } else {
                msg += "field annualSalaryPercent (INTERVENTIONS_EN_COURS$VALEUR76) not found";
                console.log(msg);
            }
        } else {
            msg += "field percent (UTILISATEURS$CHAMPU248) not found";
            console.log(msg);
        }
    } else {
        msg += "field annualSalary (INTERVENTIONS_EN_COURS$VALEUR278) not found";
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
                //probationType.value = "413|Not Applicable";
            } else if (probationCode.options[probationCode.selectedIndex].getAttribute("code") == "409") {
                $(probationType).find('option[code*=414]').prop('selected', true);
                //probationType.value = "414|Successful";
            } else if (probationCode.options[probationCode.selectedIndex].getAttribute("code") == "410") {
                $(probationType).find('option[code*=415]').prop('selected', true);
                //probationType.value = "415|Unsuccessful";
            } else if (probationCode.options[probationCode.selectedIndex].getAttribute("code") == "411") {
                $(probationType).find('option[code*=416]').prop('selected', true);
                //probationType.value = "416|In Progress";
            } else if (probationCode.options[probationCode.selectedIndex].getAttribute("code") == "227") {
                $(probationType).find('option[code*=228]').prop('selected', true);
                //probationType.value = "228|Extended";
            } else if (probationCode.options[probationCode.selectedIndex].getAttribute("code") == "412") {
                $(probationType).find('option[code*=417]').prop('selected', true);
                //probationType.value = "417|In Progress - No extension";
            } else {}
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
                //probationCode.value = "408|01";
            } else if (probationType.options[probationType.selectedIndex].getAttribute("code") == "414") {
                $(probationCode).find('option[code*=409]').prop('selected', true);
                //probationCode.value = "409|02";
            } else if (probationType.options[probationType.selectedIndex].getAttribute("code") == "415") {
                $(probationCode).find('option[code*=410]').prop('selected', true);
                //probationCode.value = "410|03";
            } else if (probationType.options[probationType.selectedIndex].getAttribute("code") == "416") {
                $(probationCode).find('option[code*=411]').prop('selected', true);
                //probationCode.value = "411|04";
            } else if (probationType.options[probationType.selectedIndex].getAttribute("code") == "228") {
                $(probationCode).find('option[code*=227]').prop('selected', true);
                //probationCode.value = "227|05";
            } else if (probationType.options[probationType.selectedIndex].getAttribute("code") == "417") {
                $(probationCode).find('option[code*=412]').prop('selected', true);
                //probationCode.value = "412|06";
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
window.probationDefaultCodeDesc = function() {

    var probationCode = formulaire.INTERVENTIONS_EN_COURS$VALEUR130;
    var probationType = formulaire.INTERVENTIONS_EN_COURS$VALEUR132;

    $(probationCode).find('option[code*=411]').prop('selected', true);
    $(probationType).find('option[code*=416]').prop('selected', true);
};
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
                    if (probationDescOptions[o].text == "Unsuccessful") {
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

/* *********    MOD-002     ******************/

/*******************************************
MANAGE CONTARCT-QUALIFICATION CODE AND DESC
********************************************/
window.qualificationCodeToDesc = function() {
    //Définition des variables
    var msg = "fonction contractCodeToDesc : ";
    var qualificationCode = formulaire.INTERVENTIONS_EN_COURS$VALEUR312;
    var qualificationType = formulaire.INTERVENTIONS_EN_COURS$VALEUR313;
    if (qualificationCode) {
        if (qualificationType) {
            //Si les 2 champs concernés sont trouvés, on exécute la fonction
            if (qualificationCode.options[qualificationCode.selectedIndex].getAttribute("code") == "378") {
                $(qualificationType).find('option[code*=382]').prop('selected', true);
                //qualificationType.value = "382";
            } else if (qualificationCode.options[qualificationCode.selectedIndex].getAttribute("code") == "379") {
                $(qualificationType).find('option[code*=383]').prop('selected', true);
                //qualificationType.value = "383";
            } else if (qualificationCode.options[qualificationCode.selectedIndex].getAttribute("code") == "380") {
                $(qualificationType).find('option[code*=384]').prop('selected', true);
                //qualificationType.value = "384";
            } else if (qualificationCode.options[qualificationCode.selectedIndex].getAttribute("code") == "381") {
                $(qualificationType).find('option[code*=385]').prop('selected', true);
                //qualificationType.value = "385";
            }
        } else {
            msg += "var qualificationType (formulaire.INTERVENTIONS_EN_COURS$VALEUR312) non trouvée > champ absent ou non chargé";
            console.log(msg);
        }
    } else {
        msg += "var qualificationCode (formulaire.INTERVENTIONS_EN_COURS$VALEUR313) non trouvée > champ absent ou non chargé";
        console.log(msg);
    }
};
window.qualificationDescToCode = function() {
    //Définition des variables
    var msg = "fonction probationDescToCode : ";
    var qualificationCode = formulaire.INTERVENTIONS_EN_COURS$VALEUR312;
    var qualificationType = formulaire.INTERVENTIONS_EN_COURS$VALEUR313;
    if (qualificationCode) {
        if (qualificationType) {
            //Si les 2 champs concernés sont trouvés, on exécute la fonction
            if (qualificationType.options[qualificationType.selectedIndex].getAttribute("code") == "382") {
                $(qualificationCode).find('option[code*=378]').prop('selected', true);
                //qualificationCode.value = "378|CAD";
            } else if (qualificationType.options[qualificationType.selectedIndex].getAttribute("code") == "383") {
                $(qualificationCode).find('option[code*=379]').prop('selected', true);
                //qualificationCode.value = "379|EMP";
            } else if (qualificationType.options[qualificationType.selectedIndex].getAttribute("code") == "384") {
                $(qualificationCode).find('option[code*=380]').prop('selected', true);
                //qualificationCode.value = "380|STA";
            } else if (qualificationType.options[qualificationType.selectedIndex].getAttribute("code") == "385") {
                $(qualificationCode).find('option[code*=381]').prop('selected', true);
                //qualificationCode.value = "381|DIR";
            }
        } else {
            msg += "var qualificationType (formulaire.INTERVENTIONS_EN_COURS$VALEUR312) non trouvée > champ absent ou non chargé";
            console.log(msg);
        }
    } else {
        msg += "var qualificationCode (formulaire.INTERVENTIONS_EN_COURS$VALEUR313) non trouvée > champ absent ou non chargé";
        console.log(msg);
    }
};


/************
 * HIDE FIELDS
 *************/
window.hideField = function(fieldName) {
    var msg = "function hideField : ";
    var field = document.getElementById(fieldName);
    if (field) {
        affichageChamp(field, false);
    } else {
        msg += "field " + field + " is not found";
        console.log(msg);
    }
};
window.hideFields = function() {
    hideField("INTERVENTIONS_EN_COURS$VALEUR158", false);
    hideField("INTERVENTIONS_EN_COURS$VALEUR287", false);
    hideField("INTERVENTIONS_EN_COURS$VALEUR187", false);
    hideField("INTERVENTIONS_EN_COURS$VALEUR289", false);
    hideField("INTERVENTIONS_EN_COURS$VALEUR170", false);
    //****************************BEGIN MOD-006********************************
    hideField("INTERVENTIONS_EN_COURS$VALEUR350", false);
    hideField("INTERVENTIONS_EN_COURS$VALEUR283", false);
    hideField("INTERVENTIONS_EN_COURS$VALEUR284", false);
    hideField("INTERVENTIONS_EN_COURS$VALEUR285", false);
    //****************************END MOD-006********************************
};

/**********************************************
To Copy value from employee to request catlogue
***********************************************/

window.copyFunctions = function() {


    //copy Job title desc value
    copyValue("UTILISATEURS$CHAMPU40", "INTERVENTIONS_EN_COURS$VALEUR45");

    //copy Global grade Code value
    copyValue("UTILISATEURS$CHAMPU26", "INTERVENTIONS_EN_COURS$VALEUR118");
    //copy personal area desc value
    copyValue("UTILISATEURS$CHAMPU27", "INTERVENTIONS_EN_COURS$VALEUR119");
    //copy personal sub area code value
    copyValue("UTILISATEURS$CHAMPU28", "INTERVENTIONS_EN_COURS$VALEUR120");
    //copy personal sub area desc value
    copyValue("UTILISATEURS$CHAMPU29", "INTERVENTIONS_EN_COURS$VALEUR122");

    //copy FTC extension value
    copyValue("UTILISATEURS$CHAMPU43", "INTERVENTIONS_EN_COURS$VALEUR124");

    //copy Employee working hours value
    copyValue("UTILISATEURS$CHAMPU36", "INTERVENTIONS_EN_COURS$VALEUR6");
    //copy EE group desc value
    copyValue("UTILISATEURS$CHAMPU37", "INTERVENTIONS_EN_COURS$VALEUR8");
    //copy EE subgroup code value
    copyValue("UTILISATEURS$CHAMPU38", "INTERVENTIONS_EN_COURS$VALEUR178");
    //copy EE subgroup desc value
    copyValue("UTILISATEURS$CHAMPU39", "INTERVENTIONS_EN_COURS$VALEUR180");

    //copy Global grade Code value
    copyValue("UTILISATEURS$CHAMPU34", "INTERVENTIONS_EN_COURS$VALEUR238");
};

//******************************************************* BEGIN MOD-006 ****************************************************************
/************************************************
 * MANAGE BUTTON 'SAP UPDATE AUTMATICALLY' DISPLAY
 *************************************************/

window.hideButton = function() {
    var msg = "fonction hideButton : ";
  //  console.log("fonction hideButton champ ELEMENT : " + formulaire.INTERVENTIONS_EN_COURS$ELEMENT.value);
    //var field = formulaire.INTERVENTIONS_EN_COURS$ELEMENT;
    var field = document.getElementById("ELEMENTS");
    var button1 = document.getElementById("bouton_evenement2271");
	var button2 = document.getElementById("bouton_evenement2292");
    
	if (button1) {
    	if (field.value == "2234" || field.value == "2148" ||field.value == "2182" ||field.value == "2174") 
		{ //Hide button for Promotion(2148),Mangement Team(2234),contract,change in pay
            button1.style.display = "none";
        } else {
            button1.style.display = "";
        }
    } else if (button2) 
	{   
			if (field.value == "2234" || field.value == "2148" ||field.value == "2182" ||field.value == "2174") 
		{ //Hide button for Promotion(2148),Mangement Team(2234),contract,change in pay
            button2.style.display = "none";
        } else {
            button2.style.display = "";
        }
	
	}else
	{
		//nothing
	}
};

window.popupLinkFunction = function() {


    //*********************************** BEGIN MOD-003********************************
    //CREATE POP-UPS LINKS
    //Action Code
    //Action Code
    popupLink(formulaire.INTERVENTIONS_EN_COURS$VALEUR4, "/Custom_Referential/ActionsCode.aspx?Id_User=");

    //Grades
    popupLink(document.getElementById("INTERVENTIONS_EN_COURS$VALEUR40"), "/Custom_Referential/Grade.aspx?Id_User=");

    //Job Name
    popupLink(document.getElementById("INTERVENTIONS_EN_COURS$VALEUR45"), "/Custom_Referential/JobName.aspx?Id_User=");
    //popupLink(document.getElementById("UTILISATEURS$CHAMPU177"),"/Custom_Referential/JobName.aspx?Id_User=");

    //Base Location - Personal Area
    //popupLink(document.getElementById("INTERVENTIONS_EN_COURS$VALEUR118"),"/Custom_Referential/PersonalArea.aspx");
    //popupLink(document.getElementById("INTERVENTIONS_EN_COURS$VALEUR122"),"/Custom_Referential/SubArea.aspx?Id_User=");
    //popupLink(document.getElementById("INTERVENTIONS_EN_COURS$VALEUR119"),"/Custom_Referential/PersonalArea.aspx"); ******* MOD-006 *******
    popupLink(document.getElementById("INTERVENTIONS_EN_COURS$VALEUR122"), "/Custom_Referential/SubArea.aspx?Id_User=");

    //Management - Reviewer
    popupLink(document.getElementById("UTILISATEURS$CHAMPU56"), "/Custom_Referential/ManagerReviewer.aspx");
    //Management - Supervisor
    popupLink(document.getElementById("UTILISATEURS$CHAMPU152"), "/Custom_Referential/ManageSupervisor.aspx");
    //Management - Local approver
    popupLink(document.getElementById("UTILISATEURSBIS$CHAMPU68"), "/Custom_Referential/ManagerLocalName.aspx");
    //Management - Default approver
    popupLink(document.getElementById("UTILISATEURSBIS$CHAMPU234"), "/Custom_Referential/ManagerDefaultName.aspx");
    //Management - Mentor
    popupLink(document.getElementById("UTILISATEURS$CHAMPU66"), "/Custom_Referential/ManageMentor.aspx");

    //COntract Details - Contract Type
    //popupLink(document.getElementById("INTERVENTIONS_EN_COURS$VALEUR124"),"/Custom_Referential/ContratType.aspx");
    popupLink(document.getElementById("UTILISATEURS$CHAMPU273"), "/Custom_Referential/ContratType.aspx");

    //Contract Details - Employee Notice
    popupLink(document.getElementById("UTILISATEURS$CHAMPU275"), "/Custom_Referential/NoticePeriod.aspx?Id_User=");
    //COntract Details - Qualification
    //popupLink(document.getElementById("UTILISATEURS$CHAMPU281"),"/Custom_Referential/Qualification.aspx");

    //Employee Group SubGroup
    //popupLink(document.getElementById("INTERVENTIONS_EN_COURS$VALEUR6"),"/Custom_Referential/EmployeeGroup.aspx?Id_User=");
    popupLink(document.getElementById("INTERVENTIONS_EN_COURS$VALEUR8"), "/Custom_Referential/EmployeeGroup.aspx?Id_User=");
    //popupLink(document.getElementById("INTERVENTIONS_EN_COURS$VALEUR180"),"/Custom_Referential/EmployeeGroup.aspx?Id_User=");

    //*********************************** END MOD-003********************************

};

//bouton_evenement2271
//******************************************************* END MOD-006 ****************************************************************
/*************************
 * ACTIONS ON LOAD COMPLETE
 **************************/
window.onloadForm = function() {
 
    //To copy the fields from employee to request catalouge
    copyFunctions();

    //DISABLE FIELDS
    disableFields();

    //Hide FIELDS
    hideFields();

    //remove 'unsuccessful' value for probation
    removeProbationValue();
    //probationCodeToDesc();
    //probationDescToCode();
    probationDefaultCodeDesc();

    popupLinkFunction();

   //To hide sap update automatically on page load
    hideButton();

    //To manage fields
    manageFields();
};
ThisForm.Bind('loadcomplete', onloadForm);
