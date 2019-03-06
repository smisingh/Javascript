/**************		UK EDC STEP 1 (R) FO Algorithm Fields	**************
******************************************************************
Developer   - 
Date	    - 14/06/2017
Change No   - MOD-001
Description - 
******************************************************************

*******************************************************************/

/*
V2 - PJU - 12/10/2015
	- Manage fields visibilities
	- Add file fields management
	- Add only mandatory fields conditions
	- update function 'champObligatoire' to work on backoffice
	- add 'ETATS' field exception
V3 - PJU - 11/02/2016
	- don't launch mandatory function when mandatory conditions are undefined
V3.1 - PJU - 25/02/2016
	- add ID management and 'ETATS' field exception in section 6A
V3.2 - PJU - 22/04/2016
	- add file fields mandatory exception
	- add 'PROVENANCE' field exception
	- add 'champsobligatoiresclient' update for backoffice mandatory fields
V4.0 - PJU - 13-05-2016
	- update 'manageField' & 'affichageChamp' functions : test if label exist before doing action on it
v5.0 - PJU - 18/05/2016
	- update 'champObligatoire' function : apply label red style only when mandatory field is requested + check if mandatory field was originaly set before activate it
v6.0 - PJU - 26/05/2016
	- create manageCheckbox function : checkbox always have value "on" when opening a form. The function give the value 0 or 1.
V7.0 - PJU - 29/06/2016
	- add variable 'enableManageField' to prevent '(M) forms' unwilling function launch on the 'onchange'
V8.0 - PJU - 28/11/2016
	- add 'ELEMENT' field exception
V9.0 - PJU - 08/12/2016
	- add 'iframe' management
*/

/**************************
Fields and display settings
***************************/
var Tableau = [
    //Display Cost Center sections
    'section666#formulaire.INTERVENTIONS_EN_COURS$ELEMENT|Cost Centre (PU)',
    //Display Orginization Details sections
    'section136#formulaire.INTERVENTIONS_EN_COURS$ELEMENT|Cost Centre (PU)',
    //Display Local Grade sections
    'section921#formulaire.INTERVENTIONS_EN_COURS$ELEMENT|Cost Centre (PU)',
    //Display Job sections
    'section579#formulaire.INTERVENTIONS_EN_COURS$ELEMENT|Cost Centre (PU);Job',
    //Display Working Hours sections
    'section813#formulaire.INTERVENTIONS_EN_COURS$ELEMENT|Working hours',
    //Display Work Location sections
    'section832#formulaire.INTERVENTIONS_EN_COURS$ELEMENT|Work Location',
    //Display Fixed Term Contract sections
    'section292#formulaire.INTERVENTIONS_EN_COURS$ELEMENT|Fixed Term Contract Extension',
    //Display Probation Period sections
    'section842#formulaire.INTERVENTIONS_EN_COURS$ELEMENT|Probation period extension',
    //Display Management Team sections
    'section867#formulaire.INTERVENTIONS_EN_COURS$ELEMENT|Management Team;Cost Centre (PU)'
];

var algorithmField = formulaire.INTERVENTIONS_EN_COURS$VALEUR202;

/**************************
IMPLEMENTATION DE FONCTIONS
***************************/
//fonctions d'affichage des messages dans la console si elle est ouverte
window.msg = function (MESSAGE) {
    if (console) {
        console.log(MESSAGE);
    }
};

/*********************************
FONCTION AFFICHER/MASQUER UN CHAMP
**********************************/
window.affichageChamp = function (FIELD, VALID) {
    if (document.getElementById(FIELD.id)) {
        //ID du champ et de son libellé
        var FIELD_ID = FIELD.id;
        var LABEL_FIELD_ID;
        if (FIELD_ID.search("INTERVENTIONS") != -1) {
            LABEL_FIELD_ID = FIELD_ID.replace("INTERVENTIONS", "lblINTERVENTIONS");
        } else if (FIELD_ID.search("UTILISATEURS") != -1) {
            LABEL_FIELD_ID = FIELD_ID.replace("UTILISATEURS", "lblUTILISATEURS");
        }
        if (LABEL_FIELD_ID.search("_display") != -1) {
            LABEL_FIELD_ID = LABEL_FIELD_ID.replace("_display", "");
        }
        if (VALID === true) {
            //afficher le champ
            if (document.getElementById(LABEL_FIELD_ID) !== null) {
                document.getElementById(LABEL_FIELD_ID).parentNode.style.display = "";
            }
            if (document.getElementById(FIELD_ID).parentNode.tagName == "TD" || document.getElementById(FIELD_ID).parentNode.tagName == "DIV") {
                document.getElementById(FIELD_ID).parentNode.style.display = "";
            } else if (document.getElementById(FIELD_ID).parentNode.parentNode.tagName == "TD" || document.getElementById(FIELD_ID).parentNode.parentNode.tagName == "DIV") {
                document.getElementById(FIELD_ID).parentNode.parentNode.style.display = "";
            } else if (document.getElementById(FIELD_ID).parentNode.parentNode.parentNode.tagName == "TD" || document.getElementById(FIELD_ID).parentNode.parentNode.parentNode.tagName == "DIV") {
                document.getElementById(FIELD_ID).parentNode.parentNode.parentNode.style.display = "";
            } else if (document.getElementById(FIELD_ID).parentNode.parentNode.parentNode.parentNode.tagName == "TD" || document.getElementById(FIELD_ID).parentNode.parentNode.parentNode.parentNode.tagName == "DIV") {
                document.getElementById(FIELD_ID).parentNode.parentNode.parentNode.parentNode.style.display = "";
            }
        } else {
            //masquer le champ
            if (document.getElementById(LABEL_FIELD_ID) !== null) {
                document.getElementById(LABEL_FIELD_ID).parentNode.style.display = "none";
            }
            if (document.getElementById(FIELD_ID).parentNode.tagName == "TD" || document.getElementById(FIELD_ID).parentNode.tagName == "DIV") {
                document.getElementById(FIELD_ID).parentNode.style.display = "none";
            } else if (document.getElementById(FIELD_ID).parentNode.parentNode.tagName == "TD" || document.getElementById(FIELD_ID).parentNode.parentNode.tagName == "DIV") {
                document.getElementById(FIELD_ID).parentNode.parentNode.style.display = "none";
            } else if (document.getElementById(FIELD_ID).parentNode.parentNode.parentNode.tagName == "TD" || document.getElementById(FIELD_ID).parentNode.parentNode.parentNode.tagName == "DIV") {
                document.getElementById(FIELD_ID).parentNode.parentNode.parentNode.style.display = "none";
            } else if (document.getElementById(FIELD_ID).parentNode.parentNode.parentNode.parentNode.tagName == "TD" || document.getElementById(FIELD_ID).parentNode.parentNode.parentNode.parentNode.tagName == "DIV") {
                document.getElementById(FIELD_ID).parentNode.parentNode.parentNode.parentNode.style.display = "none";
            }
        }
    }
};

/**************************************
FONCTION GERANT LES CHAMPS OBLIGATOIRES
***************************************/
window.champObligatoire = function (FIELD, VALID) {
    if (document.getElementById(FIELD.id)) {
        //ID du champ obligatoire
        var FIELD_ID = FIELD.id;
        var LBL_FIELD_ID;
        if (FIELD_ID.search("INTERVENTIONS") != -1) {
            LBL_FIELD_ID = FIELD_ID.replace("INTERVENTIONS", "lblINTERVENTIONS");
        } else if (FIELD_ID.search("UTILISATEURS") != -1) {
            LBL_FIELD_ID = FIELD_ID.replace("UTILISATEURS", "lblUTILISATEURS");
        }
        /**************
        CÔTE BACKOFFICE
        ***************/
        var BACKOFFICE_MANDATORY = document.getElementById("champsobligatoiresproprietes");
        if (BACKOFFICE_MANDATORY) {
            BM_FIELD = FIELD_ID.replace("$", "\\$");
            BM_SEARCH = "!" + BM_FIELD + "!";
            BM_REPLACE = "!" + FIELD_ID + "!";
            var BM_VALUES = document.getElementById("champsobligatoiresproprietes").value;
            var BM_CLIENT = document.getElementById("champsobligatoiresclient").value;
            if (algorithmField.value == "" || algorithmField.value == " ") {
                if (BM_VALUES != "" && BM_VALUES != " ") {
                    algorithmField.value = BM_VALUES;
                } else if (BM_CLIENT != "" && BM_CLIENT != " ") {
                    algorithmField.value = BM_CLIENT;
                }
            }
            if (VALID === false) {
                //disable mandatory field
                if (BM_VALUES.search(BM_SEARCH) != -1 || BM_CLIENT.search(BM_SEARCH) != -1) {
                    BM_CLIENT = BM_CLIENT.replace(BM_REPLACE, "");
                    BM_VALUES = BM_VALUES.replace(BM_REPLACE, "");
                    if (document.getElementById(LBL_FIELD_ID) !== null) {
                        document.getElementById(LBL_FIELD_ID).className = "label";
                    }
                }
                document.getElementById("champsobligatoiresproprietes").value = BM_VALUES;
                document.getElementById("champsobligatoiresclient").value = BM_CLIENT;
            } else {
                //enable mandatory field
                if (algorithmField.value.search(BM_SEARCH) != -1) {
                    if (BM_VALUES.search(BM_SEARCH) == -1 && BM_CLIENT.search(BM_SEARCH) == -1) {
                        if (BM_VALUES != "" && BM_VALUES != " ") {
                            BM_VALUES = BM_VALUES + BM_REPLACE;
                            document.getElementById("champsobligatoiresproprietes").value = BM_VALUES;
                        } else if (BM_CLIENT != "" && BM_CLIENT != " ") {
                            BM_CLIENT = BM_CLIENT + BM_REPLACE;
                            document.getElementById("champsobligatoiresclient").value = BM_CLIENT;
                        }
                        if (document.getElementById(LBL_FIELD_ID) !== null) {
                            document.getElementById(LBL_FIELD_ID).className = "label req";
                        }
                    }
                }
            }
        }

        /*******************************
        VALIDATOR DES CHAMPS FORMULAIRES
        ********************************/
        var VALIDATOR_FIELD_ID;
        if (FIELD_ID.search("INTERVENTIONS") != -1) {
            VALIDATOR_FIELD_ID = FIELD_ID.replace("INTERVENTIONS", "Validator_INTERVENTIONS");
        } else if (FIELD_ID.search("UTILISATEURS") != -1) {
            VALIDATOR_FIELD_ID = FIELD_ID.replace("UTILISATEURS", "Validator_UTILISATEURS");
        } else if (FIELD_ID.search("n_question") != -1) {
            VALIDATOR_FIELD_ID = FIELD_ID.replace("n_question", "n_questionvalidator");
        }
        //manage file fields
        if (VALIDATOR_FIELD_ID.search("_display") != -1) {
            VALIDATOR_FIELD_ID = VALIDATOR_FIELD_ID.replace("_display", "");
        }
        //on vérifie que le validator existe avant d'activer/désactiver champ obligatoire
        if (document.getElementById(VALIDATOR_FIELD_ID)) {
            ValidatorEnable(document.getElementById(VALIDATOR_FIELD_ID), VALID);
        }

        /*********************************
        VALIDATOR DES BOUTONS RADIO CUSTOM
        **********************************/
        if (document.getElementById(FIELD.id + "_radio_Validator")) {
            var RADIO_VALIDATOR_ID = FIELD.id + "_radio_Validator";
            if (VALID === true) {
                document.getElementById(RADIO_VALIDATOR_ID).style.display = "";
            } else {
                document.getElementById(RADIO_VALIDATOR_ID).style.display = "none";
            }
        }
    }
};

/*************************
FONCTION VIDANT LES CHAMPS
**************************/
window.viderChamp = function (FIELD) {
    /****************************
    DECOCHER BOUTONS RADIO CUSTOM
    *****************************/
    if (document.getElementsByName(FIELD.name + "_radio").length > 0) {
        //récupérer les boutons radio
        var RADIO_NAME = document.getElementsByName(FIELD.name + "_radio");
        //décocher tous les boutons radio
        for (e = 0; e< RADIO_NAME.length; e++) {
            RADIO_NAME[e].checked = false;
        }
        //mettre la valeur par défaut au champ select masqué
        FIELD.value = "";
    } else {
        /**************************
        DECOCHER LES CASES A COCHER
        ***************************/
        if (FIELD.type == "checkbox") {
            FIELD.checked = false;
            FIELD.value = 0;
        } else if (FIELD.type == "text") {
            //vider un champ text
            FIELD.value = "";
        } else if (FIELD.type == "select-one") {
            //valeur par défaut sur un champ select
            FIELD.selectedIndex = 0;
        }
    }
};

/************************************************************
FONCTION PERMETTANT DE TRANSFORMER UNE LISTE EN BOUTONS RADIO
*************************************************************/
window.boutonRadio = function (FIELD) {
    //récupérer l'ID/le name du champ
    var CHAMP_SELECT_ID = FIELD.id;
    var CHAMP_SELECT_NAME = FIELD.name;
    var CHAMP_SELECT_VALUE = FIELD.value;
    //récupérer l'ID du label
    var SELECT_LABEL_ID;
    var SELECT_OBLIGATOIRE_ID;
    if (CHAMP_SELECT_ID.search("INTERVENTIONS") != -1) {
        SELECT_LABEL_ID = CHAMP_SELECT_ID.replace("INTERVENTIONS", "lblINTERVENTIONS");
        SELECT_OBLIGATOIRE_ID = CHAMP_SELECT_ID.replace("INTERVENTIONS", "Validator_INTERVENTIONS");
    } else if (CHAMP_SELECT_ID.search("UTILISATEURS") != -1) {
        SELECT_LABEL_ID = CHAMP_SELECT_ID.replace("UTILISATEURS", "lblUTILISATEURS");
        SELECT_OBLIGATOIRE_ID = CHAMP_SELECT_ID.replace("UTILISATEURS", "Validator_UTILISATEURS");
    }
    //Si le champ est obligatoire, on masque simplement l'étoile d'origine et on cré une nouvelle étoile à côté du label
    if (document.getElementById(SELECT_OBLIGATOIRE_ID)) {
        //document.getElementById(SELECT_OBLIGATOIRE_ID).style.display = "none";
        //document.getElementById(SELECT_LABEL_ID).outerHTML += "<span style='color: Red; visibility: visible;' class='ValidatorCautionBox' id='"+CHAMP_SELECT_ID+"_radio_Validator' title='Champ obligatoire'></span>";
    }
    //faire une boucle sur les options à partir de 1 pour ne pas prendre la valeur nulle
    window[CHAMP_SELECT_ID].onloadcomplete = function () {
        var selectObject = FIELD;
        var ajaxList = selectObject.id;
        var SELECT_OPTIONS = selectObject.options;
        for (var o = SELECT_OPTIONS.length - 1; o >= 1; o--) {
            var RADIO_ID = selectObject.id + "_radio" + o;
            var RADIO_NAME = selectObject.name + '_radio';
            var RADIO_ID_LBL = RADIO_ID + '_lbl';
            var RADIO_NAME_LBL = RADIO_NAME + '_lbl';
            var OPTION_VALUE = SELECT_OPTIONS[o].value;
            selectObject.insertAdjacentHTML("afterend", "<span class='radio_button'><input type='radio' value = '" + OPTION_VALUE + "' id='" + RADIO_ID + "' name='" + RADIO_NAME + "' onchange='getSelectValue(this)' class='radio_input'><span id='" + RADIO_ID_LBL + "' name='" + RADIO_NAME_LBL + "' class='radio_label'>" + OPTION_VALUE + "</span></span>");
            if (OPTION_VALUE == selectObject.value) {
                document.getElementById(RADIO_ID).checked = true;
            }
        }
    };

    //eval(CHAMP_SELECT_ID).onloadcomplete = new Function("var selectObject = FIELD;var ajaxList = eval(selectObject.id);msg(ajaxList);var SELECT_OPTIONS = selectObject.options;msg(SELECT_OPTIONS);for(var o=SELECT_OPTIONS.length-1; o>=1; o--){var RADIO_ID = selectObject.id+\"_radio\"+o;var RADIO_NAME = selectObject.name+\'_radio\';var RADIO_ID_LBL = RADIO_ID+\'_lbl\';var RADIO_NAME_LBL = RADIO_NAME+\'_lbl\';var OPTION_VALUE = SELECT_OPTIONS[o].value;selectObject.insertAdjacentHTML(\"afterend\", \"<input type=\'radio\' value = \'\"+OPTION_VALUE+\"\' id=\'\"+RADIO_ID+\"\' name=\'\"+RADIO_NAME+\"\' onchange=\'getSelectValue(this)\'><span id=\'\"+RADIO_ID_LBL+\"\' name=\'\"+RADIO_NAME_LBL+\"\'>\"+OPTION_VALUE+\"</span>\");if(OPTION_VALUE == selectObject.value){document.getElementById(RADIO_ID).checked = true;}}");
    //Une fois les boutons créés, on masque le SELECT
    FIELD.style.display = "none";
};

/**************************************************************
 * FONCTION MASQUANT UNE SECTION SI TOUS SES CHAMPS SONT MASQUES
 ***************************************************************/
window.masquerSection = function (SECTION) {
    /*var ST_TD = SECTION.getElementsByTagName("td");
    var FIELD_DISPLAY;
    //boucle sur les TD d'une section
    for(z=0; z<ST_TD.length; z++){
      if(ST_TD[z].childNodes.length > 1){
        //on élimine les TDs vides
        if(ST_TD[z].style.display != "none"){
          FIELD_DISPLAY = true;

        }
      }
    }
    if(FIELD_DISPLAY !== true){
      SECTION.style.display = "none";
    }else{
      SECTION.style.display = "";
    }*/
};

/****************************************
 * FONCTION AFFICHANT/MASQUANT UNE SECTION
 *****************************************/
window.affichageSection = function (SECTION, VALID) {
    //déclarer les variables
    var SECTION_INPUT = SECTION.getElementsByTagName("input");
    var SECTION_SELECT = SECTION.getElementsByTagName("select");

    if (VALID === true) {
        //Afficher la section
        SECTION.style.display = "";
        //Rendre champs obligatoires
        for (i = 0; i< SECTION_INPUT.length; i++) {
            champObligatoire(SECTION_INPUT[i], true);
        }
        for (s = 0; s< SECTION_SELECT.length; s++) {
            champObligatoire(SECTION_SELECT[s], true);
        }
    } else {
        //Masquer la section
        SECTION.style.display = "none";
        //Rendre champs non obligatoires et les vider
        for (i = 0; i< SECTION_INPUT.length; i++) {
            champObligatoire(SECTION_INPUT[i], false);
            viderChamp(SECTION_INPUT[i]);
        }
        for (s = 0; s< SECTION_SELECT.length; s++) {
            champObligatoire(SECTION_SELECT[s], false);
            viderChamp(SECTION_SELECT[s]);
        }
    }
};

/******************************************
FONCTION ATTRIBUANT UNE VALEUR AUX CHECKBOX
*******************************************/
window.manageCheckbox = function () {
    //detect frontOffice form
    var form = document.getElementById("panelstable");
    if (form) {
        //get input fields
        var formInput = form.getElementsByTagName("input");
        for (i = 0; i< formInput.length; i++) {
            //get checkboxes
            if (formInput[i].type == "checkbox") {
                var checkbox = formInput[i];
                //gives the value 0 or 1 based on the 'checked' attribute
                if (checkbox.checked === true) {
                    checkbox.value = 1;
                } else {
                    checkbox.value = 0;
                }
            }
        }
    }
};

/*************************************************
ALGORITHME GERANT L'AFFICHAGE DYNAMIQUE DES CHAMPS
**************************************************/
window.manageFields = function () {

};

/******************************************************************
PASSER LA VALEUR DU BOUTON RADIO SUR LE SELECT MASQUE CORREPSONDANT
*******************************************************************/
window.getSelectValue = function (RADIO_BUTTON) {
    var SPLIT_RADIO_ID = RADIO_BUTTON.id.split("_radio");
    var SELECT_ID = SPLIT_RADIO_ID[0];
    var RADIO_VALIDATOR_ID = SELECT_ID + "_radio_Validator";
    var RADIO_INDEX = RADIO_BUTTON.index;
    if (RADIO_BUTTON.value == "") {
        champObligatoire(document.getElementById(SELECT_ID), true);
    } else {
        champObligatoire(document.getElementById(SELECT_ID), false);
    }
    document.getElementById(SELECT_ID).selectedIndex = RADIO_BUTTON.index;
    document.getElementById(SELECT_ID).value = RADIO_BUTTON.value;
    if (document.getElementById(SELECT_ID).fireEvent) {
        document.getElementById(SELECT_ID).fireEvent('onchange');
    } else if (document.getElementById(SELECT_ID).dispatchEvent) {
        var oEvent = document.createEvent("HTMLEvents");
        oEvent.initEvent("change", true, true);
        document.getElementById(SELECT_ID).dispatchEvent(oEvent);
    }

};


window.checkSectionDisplay = function (sectionID) {
    document.getElementById(sectionID).style.display = "block";
};


window.displaySectionSpecific = function () {
    var interElement = formulaire.INTERVENTIONS_EN_COURS$ELEMENT;
    switch (typeof interElement !== undefined && interElement !== null) {
        case interElement.innerHTML === 'Cost Centre (PU)':
            checkSectionDisplay("section666");
            checkSectionDisplay("section136");
            checkSectionDisplay("section921");
            checkSectionDisplay("section579");
            checkSectionDisplay("section867");
            break;
        case interElement.innerHTML === 'Job':
            checkSectionDisplay("section579");
            break;
        case interElement.innerHTML === 'Working hours':
            checkSectionDisplay("section813");
            break;
        case interElement.innerHTML === 'Work Location':
            checkSectionDisplay("section832");
            break;
        case interElement.innerHTML === 'Fixed Term Contract Extension':
            checkSectionDisplay("section292");
            break;
        case interElement.innerHTML === 'Probation period extension':
            checkSectionDisplay("section842");
            break;
        case interElement.innerHTML === 'Management Team':
            checkSectionDisplay("section867");
    }
};

window.checkSectionHide = function (sectionID) {

    var hideAnswersSection = document.getElementsByClassName('answers');
    if (typeof hideAnswersSection !== undefined && hideAnswersSection !== null) {
        if (typeof document.getElementById(sectionID) !== undefined && document.getElementById(sectionID) !== null) {
            document.getElementById(sectionID).style.display = "none";
        }
    }

    displaySectionSpecific();
};

checkSectionHide("section666");
checkSectionHide("section217");
checkSectionHide("section136");
checkSectionHide("section921");
checkSectionHide("section579");
checkSectionHide("section813");
checkSectionHide("section832");
checkSectionHide("section292");
checkSectionHide("section842");
checkSectionHide("section867");
checkSectionHide("section754");
checkSectionHide("section955");


/**************************************************************************************
APPEL DES FONCTIONS GERANT L'AFFICHAGE DES CHAMPS UNE FOIS QUE LE FORMULAIRE EST CHARGE
***************************************************************************************/
ThisForm.Bind('loadcomplete', manageFields);
