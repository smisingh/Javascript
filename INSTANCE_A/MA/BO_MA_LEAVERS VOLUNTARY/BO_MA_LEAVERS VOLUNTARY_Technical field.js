/*      MA_LEAVERS VOLUNTARY - technical - BO
**************************************************************
Initial version - 1.0
****************************************************************
Modified version - MOD-001
Developer Name: Smita Singh
Date: 25/05/2017
Description: To modify the existing code with the new requirement
****************************************************************
****************************************************************
Modified version - MOD-002
Developer Name: Surajit Dalal
Date: 27/05/2017
Description: To modify the existing code with the new requirement
*******************************************************************
*************************************************************************************
Modified version - MOD-003
Developer Name: Surajit Dalal
Date: 23/06/2017
Description: Removing internal saving option and enabling and disabling 3 fields
**************************************************************************************
*************************************
Developer   - Leconte Romain
Date        - 29/06/2017
Change No   - MOD-004
Description - Changed value to code for jobCode function
**************************************
*************************************
Developer   - COINTE Pierre
Date        - 30/06/2017
Change No   - MOD-005
Description - Update about the custom field list
**************************************/

/*******************
    * Hide Sections
********************/
//Technical section
ThisForm.HideSection("section345");
ThisForm.HideSection("section707");

/********************************************* Begin modifed version MOD-001 ********************************************
******************************************
Function to separate code from description
******************************************/

//Competition Clause
window.CompetitionClausedropBoxChng = function(){
     if(formulaire.INTERVENTIONS_EN_COURS$VALEUR218.options[formulaire.INTERVENTIONS_EN_COURS$VALEUR218.selectedIndex].getAttribute("code") == "350"){ //Yes
        document.getElementById('INTERVENTIONS_EN_COURS$VALEUR351').value = "X";
    }
     if(formulaire.INTERVENTIONS_EN_COURS$VALEUR218.options[formulaire.INTERVENTIONS_EN_COURS$VALEUR218.selectedIndex].getAttribute("code") == "351"){ //No
        document.getElementById('INTERVENTIONS_EN_COURS$VALEUR351').value = "";
    }
};


//Reason for resignation
window.ReasonForResignationDropBoxChng = function(){
     if(formulaire.INTERVENTIONS_EN_COURS$VALEUR222.options[formulaire.INTERVENTIONS_EN_COURS$VALEUR222.selectedIndex].getAttribute("code") == "352"){ //yes
        document.getElementById('INTERVENTIONS_EN_COURS$VALEUR355').value = "1";
    }
     if(formulaire.INTERVENTIONS_EN_COURS$VALEUR222.options[formulaire.INTERVENTIONS_EN_COURS$VALEUR222.selectedIndex].getAttribute("code") == "353"){ //No
        document.getElementById('INTERVENTIONS_EN_COURS$VALEUR355').value = "2";
    }
};


//Rehire eligible
window.RehireEligibleDropBoxChng = function(){
     if(formulaire.INTERVENTIONS_EN_COURS$VALEUR226.options[formulaire.INTERVENTIONS_EN_COURS$VALEUR226.selectedIndex].getAttribute("code") =="275"){ //yes
        document.getElementById('INTERVENTIONS_EN_COURS$VALEUR353').value = "1";
    }
     if(formulaire.INTERVENTIONS_EN_COURS$VALEUR226.options[formulaire.INTERVENTIONS_EN_COURS$VALEUR226.selectedIndex].getAttribute("code") =="276"){  //No
        document.getElementById('INTERVENTIONS_EN_COURS$VALEUR353').value = "2";
    }
};


//Leave regretted
window.LeaveRegrettedDropBoxChng = function(){
     if(formulaire.INTERVENTIONS_EN_COURS$VALEUR227.options[formulaire.INTERVENTIONS_EN_COURS$VALEUR227.selectedIndex].getAttribute("code") =="364"){ //Competitor
        document.getElementById('INTERVENTIONS_EN_COURS$VALEUR354').value = "01";
    }
     if(formulaire.INTERVENTIONS_EN_COURS$VALEUR227.options[formulaire.INTERVENTIONS_EN_COURS$VALEUR227.selectedIndex].getAttribute("code") =="365"){ //Industry
        document.getElementById('INTERVENTIONS_EN_COURS$VALEUR354').value = "02";
    }
     if(formulaire.INTERVENTIONS_EN_COURS$VALEUR227.options[formulaire.INTERVENTIONS_EN_COURS$VALEUR227.selectedIndex].getAttribute("code") =="366"){ //Alliances
        document.getElementById('INTERVENTIONS_EN_COURS$VALEUR354').value = "03";
    }
     if(formulaire.INTERVENTIONS_EN_COURS$VALEUR227.options[formulaire.INTERVENTIONS_EN_COURS$VALEUR227.selectedIndex].getAttribute("code") =="367"){ //Start up
        document.getElementById('INTERVENTIONS_EN_COURS$VALEUR354').value = "04";
    }
     if(formulaire.INTERVENTIONS_EN_COURS$VALEUR227.options[formulaire.INTERVENTIONS_EN_COURS$VALEUR227.selectedIndex].getAttribute("code") =="368"){ //own buisness
        document.getElementById('INTERVENTIONS_EN_COURS$VALEUR354').value = "05";
    }
     if(formulaire.INTERVENTIONS_EN_COURS$VALEUR227.options[formulaire.INTERVENTIONS_EN_COURS$VALEUR227.selectedIndex].getAttribute("code") =="369"){ //End of contract
        document.getElementById('INTERVENTIONS_EN_COURS$VALEUR354').value = "06";
    }
     if(formulaire.INTERVENTIONS_EN_COURS$VALEUR227.options[formulaire.INTERVENTIONS_EN_COURS$VALEUR227.selectedIndex].getAttribute("code") =="370"){ //Not disclosed
        document.getElementById('INTERVENTIONS_EN_COURS$VALEUR354').value = "07";
    }
};


//Moving to
window.MovingToDropBoxChng = function(){
    if(formulaire.INTERVENTIONS_EN_COURS$VALEUR225.options[formulaire.INTERVENTIONS_EN_COURS$VALEUR225.selectedIndex].getAttribute("code") == "398"){//Better Position
        document.getElementById('INTERVENTIONS_EN_COURS$VALEUR352').value = "01";
    } else if(formulaire.INTERVENTIONS_EN_COURS$VALEUR225.options[formulaire.INTERVENTIONS_EN_COURS$VALEUR225.selectedIndex].getAttribute("code") == "399"){ //Salary
        document.getElementById('INTERVENTIONS_EN_COURS$VALEUR352').value = "02";
    } else if(formulaire.INTERVENTIONS_EN_COURS$VALEUR225.options[formulaire.INTERVENTIONS_EN_COURS$VALEUR225.selectedIndex].getAttribute("code") == "400"){ //|Bad Capgemini line-management
        document.getElementById('INTERVENTIONS_EN_COURS$VALEUR352').value = "03";
    } else if(formulaire.INTERVENTIONS_EN_COURS$VALEUR225.options[formulaire.INTERVENTIONS_EN_COURS$VALEUR225.selectedIndex].getAttribute("code") == "401"){ //Something new
        document.getElementById('INTERVENTIONS_EN_COURS$VALEUR352').value = "04";
    } else if(formulaire.INTERVENTIONS_EN_COURS$VALEUR225.options[formulaire.INTERVENTIONS_EN_COURS$VALEUR225.selectedIndex].getAttribute("code") == "402"){ //|Balance work/private
        document.getElementById('INTERVENTIONS_EN_COURS$VALEUR352').value = "05";
    } else if(formulaire.INTERVENTIONS_EN_COURS$VALEUR225.options[formulaire.INTERVENTIONS_EN_COURS$VALEUR225.selectedIndex].getAttribute("code") == "403"){ //|Exit during trial-period
        document.getElementById('INTERVENTIONS_EN_COURS$VALEUR352').value = "06";
    } else if(formulaire.INTERVENTIONS_EN_COURS$VALEUR225.options[formulaire.INTERVENTIONS_EN_COURS$VALEUR225.selectedIndex].getAttribute("code") == "404"){ //|End of contract
        document.getElementById('INTERVENTIONS_EN_COURS$VALEUR352').value = "07";
    } else if(formulaire.INTERVENTIONS_EN_COURS$VALEUR225.options[formulaire.INTERVENTIONS_EN_COURS$VALEUR225.selectedIndex].getAttribute("code") == "405"){ //|Lack of confidence in Group/ industry's future
        document.getElementById('INTERVENTIONS_EN_COURS$VALEUR352').value = "08";
    } else if(formulaire.INTERVENTIONS_EN_COURS$VALEUR225.options[formulaire.INTERVENTIONS_EN_COURS$VALEUR225.selectedIndex].getAttribute("code") == "406"){ //|Personal reasons
        document.getElementById('INTERVENTIONS_EN_COURS$VALEUR352').value = "09";
    } else if(formulaire.INTERVENTIONS_EN_COURS$VALEUR225.options[formulaire.INTERVENTIONS_EN_COURS$VALEUR225.selectedIndex].getAttribute("code") == "407"){ //|Skill issues
        document.getElementById('INTERVENTIONS_EN_COURS$VALEUR352').value = "10";
        //document.getElementById("mainForm").reset();
    } else
    {
        document.getElementById('INTERVENTIONS_EN_COURS$VALEUR352').value = "09";
    }
    
};
/********************************************* End modifed version MOD-001 ********************************************/


/********************************************* start modifed version MOD-002++ ********************************************/

window.defaultResignationInfoSection = function(){
    
    var reasonforresignation = formulaire.INTERVENTIONS_EN_COURS$VALEUR225;
    var leaveregretted = formulaire.INTERVENTIONS_EN_COURS$VALEUR226;
    var movingto = formulaire.INTERVENTIONS_EN_COURS$VALEUR227;
    
    $(reasonforresignation).find('option[code*=406]').prop('selected',true);
    $(leaveregretted).find('option[code*=275]').prop('selected',true);
    $(movingto).find('option[code*=370]').prop('selected',true);
    
    
    // below hided section
    document.getElementById('INTERVENTIONS_EN_COURS$VALEUR353').value = "1";
    document.getElementById('INTERVENTIONS_EN_COURS$VALEUR354').value = "07";
    document.getElementById('INTERVENTIONS_EN_COURS$VALEUR352').value = "09";
};

/********************************************* End modifed version MOD-001++ ********************************************/

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

window.disableFields = function(){

    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR220);
    formulaire.INTERVENTIONS_EN_COURS$VALEUR220.className = "";
    //$("#INTERVENTIONS_EN_COURS$VALEUR220").datepicker("option","disabled",true);
	
	//Action Reason
	formulaire.INTERVENTIONS_EN_COURS$VALEUR1.onkeydown = function(){return false;};
	formulaire.INTERVENTIONS_EN_COURS$VALEUR2.onkeydown = function(){return false;};
	formulaire.INTERVENTIONS_EN_COURS$VALEUR3.onkeydown = function(){return false;};
	formulaire.INTERVENTIONS_EN_COURS$VALEUR4.onkeydown = function(){return false;};
};



/*************************************************
* Reset value on change of subtopic
**************************************************/
window.onChangeSubtopic = function(){
    var msg = "function on change of subtopic : ";
    var subtopicField = formulaire.INTERVENTIONS_EN_COURS$ELEMENT;
    var setLeaveRegrettedField = formulaire.INTERVENTIONS_EN_COURS$VALEUR226;
    var setReasonForResignField = formulaire.INTERVENTIONS_EN_COURS$VALEUR225;
    var setMovingToField = formulaire.INTERVENTIONS_EN_COURS$VALEUR227;
    var setRehireEligible = formulaire.INTERVENTIONS_EN_COURS$VALEUR222;
    var setDormantContract = formulaire.INTERVENTIONS_EN_COURS$VALEUR230;
    
    if(subtopicField){
        setLeaveRegrettedField.options[0].selected = true;
        setReasonForResignField.options[0].selected = true;
        setMovingToField.options[0].selected = true;
        setRehireEligible.options[0].selected = true;
        setDormantContract.options[0].selected = true;
    
    }else{
    console.log("function on change of subtopic not found");
    }

};

/*************************************************
* Manage Default Probation status code and Desc
**************************************************/

window.defaultProbationStatusCodeDesc = function(){
    var msg = "function default Pobation status code and desc : ";
    var subtopicField = formulaire.INTERVENTIONS_EN_COURS$ELEMENT;
    var probationStatusCodeField = formulaire.INTERVENTIONS_EN_COURS$VALEUR130;
    //var probationStatusCodeValue = "410|03 - Unsuccessful";
    var probationStatusDescField = formulaire.INTERVENTIONS_EN_COURS$VALEUR132;
    //var probationStatusDescValue = "415|Unsuccessful";
    
    /*********************************************Modified version MOD-001 *****************************************************/
    if(subtopicField && subtopicField.value == "2201"){
        if(probationStatusCodeField){
            if(probationStatusDescField){       
            $(probationStatusCodeField).find('option[code*=410]').prop('selected',true); //default to 03
            $(probationStatusDescField).find('option[code*=415]').prop('selected',true); //default to unsuccessful
            //probationStatusCodeField.value = probationStatusCodeValue;
            //probationStatusDescField.value = probationStatusDescValue;
    /*********************************************Modified version MOD-001 *****************************************************/
        
            }else{
            msg += "Probation status description field non found";
            console.log(msg);
            }
        }else{
        msg += "Probation status code field non found";
        console.log(msg);
        }
    }else{
     msg += "subtopic field non found";
    console.log(msg);
    }
};


/*************************************Modified version MOD-003 ****************************************/
window.capgDisable = function(fieldGotByID)
{
    $(fieldGotByID).parent().prepend("<div id=\"prependedid" + fieldGotByID.id + "\" style=\"width: 100%; height: 30px; position: absolute;\"></div>");
};


window.capgEnable = function(fieldGotByID)
{
    var el = document.getElementById("prependedid" + fieldGotByID.id);
    if(el){
        el.parentNode.removeChild(el);
    }
};
/*************************************Modified version MOD-003 ****************************************/



/***************************************************************
  Manage Resignation info with subtopic International transfer
****************************************************************/  

window.setResignInfoIntTransfer = function(){
    var msg = "function to set resignation info with Int transfer : ";
    var subtopicField = formulaire.INTERVENTIONS_EN_COURS$ELEMENT;
    var setReasonForResignField = formulaire.INTERVENTIONS_EN_COURS$VALEUR225;
    var setLeaveRegrettedField = formulaire.INTERVENTIONS_EN_COURS$VALEUR226;
    var setMovingToField = formulaire.INTERVENTIONS_EN_COURS$VALEUR227;
    if(subtopicField){
        if(setReasonForResignField){
            if(setLeaveRegrettedField){
                if(setMovingToField){
                    
                    if(subtopicField.value == "2244" ){
                    /*************************************Modified version MOD-001 ****************************************/
                    $(setReasonForResignField).find('option[code*=406]').prop('selected',true); //Default to personal reason
                    $(setLeaveRegrettedField).find('option[code*=275]').prop('selected',true);   //Default to Yes
                    $(setMovingToField).find('option[code*=370]').prop('selected',true); //Default to not disclosed
                    //setReasonForResignField.value = "406|Personal reasons";
                    //setLeaveRegrettedField.value = "275|Yes";
                    //setMovingToField.value = "370|Not disclosed";
                    /*************************************Modified version MOD-001 ****************************************/
                    /*************************************Modified version MOD-003 ****************************************/
                        //ThisCase.BackgroundMode.Begin();
                        //ThisCase.BackgroundMode.Execute('enregistreronly()');
                        //ThisCase.BackgroundMode.Stop();
                        //setReasonForResignField.disabled = true;
                        //setLeaveRegrettedField.disabled = true;
                        //setMovingToField.disabled = true;
                        capgDisable(formulaire.INTERVENTIONS_EN_COURS$VALEUR225);
                        capgDisable(formulaire.INTERVENTIONS_EN_COURS$VALEUR226);
                        capgDisable(formulaire.INTERVENTIONS_EN_COURS$VALEUR227);
                    } else {
                        //setReasonForResignField.disabled = false;
                        //setLeaveRegrettedField.disabled = false;
                        //setMovingToField.disabled = false;
                        capgEnable(formulaire.INTERVENTIONS_EN_COURS$VALEUR225);
                        capgEnable(formulaire.INTERVENTIONS_EN_COURS$VALEUR226);
                        capgEnable(formulaire.INTERVENTIONS_EN_COURS$VALEUR227);
                    /*************************************Modified version MOD-003 ****************************************/
                        //setLeaveRegrettedField.options[0].selected = true;
                        //setReasonForResignField.options[0].selected = true;
                        //setMovingToField.options[0].selected = true;
                        //console.log("field is not international transfer");
                    }
                }else{
                    
                    msg += "field "+setMovingToField+" not found";
                    console.log(msg);
                }
            }else{
                msg += "field"+setLeaveRegrettedField+" not found";
                console.log(msg);
            }
        }else{
            
            msg += "field"+setReasonForResignField+" not found";
            console.log(msg);
        }
    }else{
        msg += "subtopic not found";
        console.log(msg);
    }
};
                    
            

/*
*********************************
* Function to calculate date fields
***********************************/
window.calculDate = function(dateDebutChamp,dateFinChamp,dureeMois,dureeJours){
                //récupérer date d'embauche
                dateDebutChamp = dateDebutChamp.value;
                var splitDateDebut = dateDebutChamp.split("/");
                var jourDebut = parseFloat(splitDateDebut[0]);
                var moisDebut = parseFloat(splitDateDebut[1])-1;
                var anneeDebut = parseFloat(splitDateDebut[2]);
                var dateDebut = new Date(anneeDebut, moisDebut, jourDebut);
                var dateFin = new Date(anneeDebut, moisDebut, jourDebut);
                //calcul date de fin
                if(dureeMois > 0 || dureeJours > 0){
                               //ajouter durée en jours
                               if(dureeJours > 0){
                                               dateFin.setDate(dateFin.getDate() - dureeJours);
                               }
                               //ajouter durée en mois
                               if(dureeMois > 0){
                                               dateFin.setMonth(dateFin.getMonth() - dureeMois);
                               }
                               //renseigner le champ "date fin période d'essai"
                               var jourFin = dateFin.getDate();
                               var moisFin = dateFin.getMonth()+1;
                               if(moisFin == "10" || moisFin == "11" || moisFin == "12"){
                                               //do nothing
                               }else{
                                               moisFin = "0"+moisFin;
                               }
                               var anneeFin = dateFin.getFullYear();
                               var dateFinale = jourFin+"/"+moisFin+"/"+anneeFin;
                               dateFinChamp.value = dateFinale;
                }
};

/********************************************* Start modifed version MOD-002++ ********************************************/

window.resetAllFieldsForm = function(){

jQuery(".tab-page").find(':input').each(function() {
    switch(this.type) {
        case 'password':
        case 'text':
        case 'textarea':
        case 'file':
        case 'select-one':
        case 'select-multiple':
        case 'date':
        case 'number':
        case 'tel':
        case 'email':
            jQuery(this).val('');
            break;
        case 'checkbox':
        case 'radio':
            this.checked = false;
            break;
    }
  });
  
  if(document.getElementById('ELEMENTS').value == 2244) {
        document.getElementById('INTERVENTIONS_EN_COURS$VALEUR353').value = "1";
        document.getElementById('INTERVENTIONS_EN_COURS$VALEUR354').value = "07";
        document.getElementById('INTERVENTIONS_EN_COURS$VALEUR352').value = "09";
  }

};

/********************************************* End modifed version MOD-002++ ********************************************/

/************
* HIDE FIELDS
*************/
window.hideField = function(FIELD_STRING){
    var msg = "function hideField : ";
    var FIELD = "";
    //Si le champ est en lecture seule
    if(FIELD_STRING.search("getElementById") != -1){
        SPLIT_FIELD_STRING = FIELD_STRING.split("\"");
        FIELD = document.getElementById(SPLIT_FIELD_STRING[1]);
    }else{
        //Si le champ est en création
        SPLIT_FIELD_STRING = FIELD_STRING.split(".");
        if(SPLIT_FIELD_STRING.length == 3){
            FIELD_FILE = document.getElementById(SPLIT_FIELD_STRING[2]+"_display");
            if(FIELD_FILE){
                FIELD = FIELD_FILE;
            }else{
                FIELD = document.getElementById(SPLIT_FIELD_STRING[2]);
            }
        }else if(SPLIT_FIELD_STRING.length == 2){
            FIELD_FILE = document.getElementById(SPLIT_FIELD_STRING[1]+"_display");
            if(FIELD_FILE){
                FIELD = FIELD_FILE;
            }else{
                FIELD = document.getElementById(SPLIT_FIELD_STRING[1]);
            }
        }else{
            msg += "field "+FIELD_STRING+" is undefined";
            console.log(msg);
        }
    }
    if(FIELD != ""){
        affichageChamp(FIELD,false);
    }else{
        msg += "var FIELD is undefined";
        console.log(msg);
    }
};
window.hideFields = function(){
        
    //Probation period unit and dtime

    hideField("formulaire.INTERVENTIONS_EN_COURS$VALEUR215",false);
    hideField("formulaire.INTERVENTIONS_EN_COURS$VALEUR216",false);
    
};
//******************************************************* BEGIN MOD-006 ****************************************************************
/************************************************
* MANAGE BUTTON 'SAP UPDATE AUTMATICALLY' DISPLAY
*************************************************/

/************************************************
 * MANAGE BUTTON 'SAP UPDATE AUTMATICALLY' DISPLAY
 *************************************************/

window.hideButton = function() {
    var msg = "fonction hideButton : ";
  //  console.log("fonction hideButton champ ELEMENT : " + formulaire.INTERVENTIONS_EN_COURS$ELEMENT.value);
    //var field = formulaire.INTERVENTIONS_EN_COURS$ELEMENT;
    var field = document.getElementById("ELEMENTS");
    var button1 = document.getElementById("bouton_evenement2071");
	var button2 = document.getElementById("bouton_evenement2069");
    
	if (button1) {
    	if(field.value == "2239" || field.value == "2243" || field.value == "2241"|| field.value == "2244"){ //Hide button for End of fixed term contract(2239),retirement planned(2243),vol leave planned(2241),international transfer(2244)
			button1.style.display = "none";
		}else{
			button1.style.display = "";
		}
    } else if (button2) 
	{   
		if(field.value == "2239" || field.value == "2243" || field.value == "2241"|| field.value == "2244"){ //Hide button for End of fixed term contract(2239),retirement planned(2243),vol leave planned(2241),international transfer(2244)
			button2.style.display = "none";
		}else{
			button2.style.display = "";
		}
	}else
	{
		//nothing
	}
};

//bouton_evenement2271
//******************************************************* END MOD-006 ****************************************************************

/*************************
 ACTIONS ON LOAD COMPLETE
**************************/
window.onloadForm = function(){
    //To hide sap update automatically on page load
	hideButton();

    //Action Code
    popupLink(formulaire.INTERVENTIONS_EN_COURS$VALEUR3,"/Custom_Referential/ActionsCode.aspx?Id_User=");
    

    //Disable fields
    disableFields();
    
    // Manage Default Probation status code and Desc
    defaultProbationStatusCodeDesc();
    
    if(document.getElementById('ELEMENTS').value == 2244) {
		defaultResignationInfoSection();
	}
    
    //hide fields
    hideFields();
        
    //Manage international transfer with resignation info
    setResignInfoIntTransfer(); 
    
/********************************************* start modifed version MOD-002 ********************************************/

//Reason for resignation
var sel2 = document.getElementById('INTERVENTIONS_EN_COURS$VALEUR222');
sel2.addEventListener('change', function() { ReasonForResignationDropBoxChng(); }, false);

//Rehire eligible
var sel3 = document.getElementById('INTERVENTIONS_EN_COURS$VALEUR226');
sel3.addEventListener('change', function() { RehireEligibleDropBoxChng(); }, false);

//Leave regretted
var sel4 = document.getElementById('INTERVENTIONS_EN_COURS$VALEUR227');
sel4.addEventListener('change', function() { LeaveRegrettedDropBoxChng(); }, false);

//Moving to
var sel5 = document.getElementById('INTERVENTIONS_EN_COURS$VALEUR225');
sel5.addEventListener('change', function() { MovingToDropBoxChng(); }, false);

//Competition Clause
//var sel1 = document.getElementById('INTERVENTIONS_EN_COURS$VALEUR218');
//sel1.addEventListener('change', function() { CompetitionClausedropBoxChng(); }, false);



var subtopicdropdown = document.getElementById('ELEMENTS');
subtopicdropdown.addEventListener('change', function() { resetAllFieldsForm(); }, false);


/********************************************* End modifed version MOD-002 ********************************************/

};
ThisForm.Bind('loadcomplete', onloadForm);
