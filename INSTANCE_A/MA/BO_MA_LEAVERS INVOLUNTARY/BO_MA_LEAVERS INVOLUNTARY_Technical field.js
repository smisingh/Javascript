/***************************************************************
Initial version - 1.0
****************************************************************
Modified version - MOD-001
Developer Name: Smita Singh
Date: 25/05/2017
Description: To modify the existing code with the new requirement
****************************************************************/
/*************************************
    Developer   - SURAJIT DALAL
Date        - 26/05/2017
Change No   - MOD-002
Description - Changed code to Hide Perner Field which is visible in Management Team Section
***************************************

*************************************
Developer   - Leconte Romain
Date        - 29/06/2017
Change No   - MOD-003
Description - Changed value to code for jobCode function
*************************************
*************************************
Developer   - COINTE Pierre
Date        - 30/06/2017
Change No   - MOD-004
Description - Update about custom field list 
**************************************/

/**************
* Hide Sections
***************/
//Technical section
ThisForm.HideSection("section406");
ThisForm.HideSection("section68");

/********************************************* Begin modifed version MOD-001 ********************************************
******************************************
Function to separate code from description
******************************************/

//Rehire eligible
window.ReasonForResignationDropBoxChng = function(){
    if(formulaire.INTERVENTIONS_EN_COURS$VALEUR222.options[formulaire.INTERVENTIONS_EN_COURS$VALEUR222.selectedIndex].getAttribute("code") == "352"){// yes
        document.getElementById('INTERVENTIONS_EN_COURS$VALEUR355').value = "1";
    }
    if(formulaire.INTERVENTIONS_EN_COURS$VALEUR222.options[formulaire.INTERVENTIONS_EN_COURS$VALEUR222.selectedIndex].getAttribute("code") == "353"){// No
        document.getElementById('INTERVENTIONS_EN_COURS$VALEUR355').value = "2";
    }
};
/********************************************* End modifed version MOD-001 ********************************************/



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

    disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR220);
    formulaire.INTERVENTIONS_EN_COURS$VALEUR220.className = "";
    $( "#INTERVENTIONS_EN_COURS$VALEUR220" ).datepicker( "option", "disabled", true );
};




/*************************************************
* Reset value on change of subtopic
**************************************************/
window.onChangeSubtopic = function(){
    var msg = "function on change of subtopic : ";
    var subtopicField = formulaire.INTERVENTIONS_EN_COURS$ELEMENT;
    var probationStatusCodeField = formulaire.INTERVENTIONS_EN_COURS$VALEUR130;
    var probationStatusDescField = formulaire.INTERVENTIONS_EN_COURS$VALEUR132;
    
    if(subtopicField){
    probationStatusCodeField.options[0].selected = true;
    probationStatusDescField.options[0].selected = true;
        
    }else{
    console.log("function on change of subtopic not found");
    }

};

/************************************************
* Manage Default Probation status code and Desc
**************************************************/

window.defaultProbationStatusCodeDesc = function(){
    var msg = "function default Pobation status code and desc : ";
    var subtopicField = formulaire.INTERVENTIONS_EN_COURS$ELEMENT;
    var probationStatusCodeField = formulaire.INTERVENTIONS_EN_COURS$VALEUR130;
    //var probationStatusCodeValue = "410|03";
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
    
    probationStatusCodeField.options[0].selected = true;
    probationStatusDescField.options[0].selected = true;
     msg += "subtopic field non found";
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
                var newField = formulaire.INTERVENTIONS_EN_COURS$VALEUR220;
                
                //calcul date de fin
                if(dureeMois > 0 || dureeJours > 0){
                               //ajouter durée en jours
                               if(dureeJours > 0){
                                               dateFin.setDate(dateFin.getDate() - dureeJours);
                                              //formulaire.INTERVENTIONS_EN_COURS$VALEUR220.parentNode.getElementsByTagName("img")[0].style.display = "none";
                                                newField.readOnly = true;
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


//  MOD-002 START
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

};

// MOD-002 END

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
/************************************************
 * MANAGE BUTTON 'SAP UPDATE AUTMATICALLY' DISPLAY
 *************************************************/

window.hideButton = function() {
    var msg = "fonction hideButton : ";
  //  console.log("fonction hideButton champ ELEMENT : " + formulaire.INTERVENTIONS_EN_COURS$ELEMENT.value);
    //var field = formulaire.INTERVENTIONS_EN_COURS$ELEMENT;
    var field = document.getElementById("ELEMENTS");
    var button1 = document.getElementById("bouton_evenement2051");
	var button2 = document.getElementById("bouton_evenement2055");
    
	if (button1) {
    	if (field.value == "2198") 
		{ //involuntay leaver planned
            button1.style.display = "none";
        } else {
            button1.style.display = "";
        }
    } else if (button2) 
	{   
			if (field.value == "2198") 
		{ //involuntay leaver planned
            button2.style.display = "none";
        } else {
            button2.style.display = "";
        }
	
	}else
	{
		//nothing
	}
};

/*************************
 ACTIONS ON LOAD COMPLETE
**************************/
window.onloadForm = function(){
    //CREATE POP-UPS LINKS
    //Action Code
    popupLink(formulaire.INTERVENTIONS_EN_COURS$VALEUR3,"/Custom_Referential/ActionsCode.aspx?Id_User=");
    
    //Disable fields
    disableFields();
    
    // Manage Default Probation status code and Desc
    defaultProbationStatusCodeDesc();
    
     //hide fields
    hideFields();
    
   //To hide sap update automatically on page load
    hideButton();

//Rehire eligible
var sel2 = document.getElementById('INTERVENTIONS_EN_COURS$VALEUR222');
sel2.addEventListener('change', function() { ReasonForResignationDropBoxChng(); }, false);

    
var subtopicdropdown = document.getElementById('ELEMENTS');
subtopicdropdown.addEventListener('change', function() { resetAllFieldsForm(); }, false);

    
};
ThisForm.Bind('loadcomplete', onloadForm);
