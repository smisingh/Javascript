//MA_EDC READ form

/**************
* Hide Sections
***************/
//Technical section
ThisForm.HideSection("section425");
/************
 * HIDE FIELDS
 *************/
window.hideField = function(GABBAR_STRING) {
    var msg = "function hideField : ";
	var FIELD_STRING = "document.getElementById(\""+GABBAR_STRING.id+"\")";
 
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
    hideField(formulaire.UTILISATEURS$CHAMPU331, false);
    //level
    hideField(formulaire.UTILISATEURS$CHAMPU240, false);
    hideField(formulaire.INTERVENTIONS_EN_COURS$VALEUR234, false);
    //Pay Region Code
    hideField(formulaire.UTILISATEURS$CHAMPU238, false);
    hideField(formulaire.INTERVENTIONS_EN_COURS$VALEUR236, false);
    //Pay Region Desc
    hideField(formulaire.UTILISATEURS$CHAMPU239, false);
    hideField(formulaire.INTERVENTIONS_EN_COURS$VALEUR237, false);
    //SBU Grade Code
    hideField(formulaire.UTILISATEURS$CHAMPU236, false);
    hideField(formulaire.INTERVENTIONS_EN_COURS$VALEUR241, false);
    //SBU Grade Desc
    hideField(formulaire.UTILISATEURS$CHAMPU237, false);
    hideField(formulaire.INTERVENTIONS_EN_COURS$VALEUR242, false);


    //JOB
    //Job Title Code
    hideField(formulaire.UTILISATEURS$CHAMPU177, false);
    hideField(formulaire.INTERVENTIONS_EN_COURS$VALEUR44, false);
    //Job Category Desc
    hideField(formulaire.UTILISATEURS$CHAMPU179, false);
    hideField(formulaire.INTERVENTIONS_EN_COURS$VALEUR50, false);

    //BASE LOCATION
    //Legal Entity Code
    //hideField("formulaire.INTERVENTIONS_EN_COURS$VALEUR350", false);
	hideField(formulaire.UTILISATEURS$CHAMPU22, false);              // MOD-007 
    hideField(formulaire.INTERVENTIONS_EN_COURS$VALEUR283, false);
    //Personal Area Code
    hideField(formulaire.UTILISATEURS$CHAMPU26, false);
    hideField(formulaire.INTERVENTIONS_EN_COURS$VALEUR284, false);
    //Personal Subarea Code
    hideField(formulaire.UTILISATEURS$CHAMPU28, false);
    hideField(formulaire.INTERVENTIONS_EN_COURS$VALEUR121, false);
    //Personal area description
    hideField(formulaire.INTERVENTIONS_EN_COURS$VALEUR285, false);

    //PROBATION UPDATE
    //Probation Code
    hideField(formulaire.UTILISATEURS$CHAMPU187, false);
    hideField(formulaire.INTERVENTIONS_EN_COURS$VALEUR130,false);

    //MANAGEMENT TEAM
    //Reviewer - PERN
    hideField(formulaire.INTERVENTIONS_EN_COURS$VALEUR158, false);
    //Supervisor - PERN
    hideField(formulaire.INTERVENTIONS_EN_COURS$VALEUR187, false);
    //Local Approver - PERN
    hideField(formulaire.INTERVENTIONS_EN_COURS$VALEUR287, false);
    //Default Approver - PERN
    hideField(formulaire.INTERVENTIONS_EN_COURS$VALEUR289, false);
    //Mentor - PERN
    hideField(formulaire.INTERVENTIONS_EN_COURS$VALEUR170, false);

    //Contract details
    //Contract Type
    hideField(formulaire.UTILISATEURS$CHAMPU43, false);
    hideField(formulaire.INTERVENTIONS_EN_COURS$VALEUR290, false);
    //Employee Notice Period
    hideField(formulaire.UTILISATEURS$CHAMPU274, false);
    hideField(formulaire.INTERVENTIONS_EN_COURS$VALEUR292, false);
    //Nature of Contract Code
    hideField(formulaire.UTILISATEURS$CHAMPU278, false);
    hideField(formulaire.INTERVENTIONS_EN_COURS$VALEUR310, false);
    //Qualification Code
    hideField(formulaire.UTILISATEURS$CHAMPU281, false);
    hideField(formulaire.INTERVENTIONS_EN_COURS$VALEUR312, false);

};


/*************************
 * ACTIONS ON LOAD COMPLETE
 **************************/
window.onloadForm = function() {
    console.log("onload form");
    //HIDE FIELDS FRONTOFFICE
    console.log("before hidefields");
    hideFields();
    console.log("after hidefields");

};
//ThisForm.Bind('loadcomplete', onloadForm);
$( document ).ready(function() {
    onloadForm();
});
