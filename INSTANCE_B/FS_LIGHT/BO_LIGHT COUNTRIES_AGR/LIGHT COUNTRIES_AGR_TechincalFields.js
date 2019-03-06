console.log('ce formulaire');
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
neocase.form.section("section418").hide();

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
		//alert("fieldName: " + fieldName + "   fieldValue: " + fieldValue);
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

//Management Popup - Reviewer
FillCf_Reviewer_PersonelNum = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR158.value = fieldValue;
    champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR158, false);
};

FillCf_Reviewer_First_Name = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR154.value = fieldValue;
	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR1').setValue(fieldValue); // MOD-002++
};

FillCf_Reviewer_LastName = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR154.value += " " + fieldValue;
    champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR154, false); 
};

//Management Popup - Supervisor
FillCf_Supervisor_First_Name = function(fieldValue) {
    //formulaire.INTERVENTIONS_EN_COURS$VALEUR183.value = fieldValue;// MOD-002--
	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR183').setValue(fieldValue); // MOD-002++
};
FillCf_Supervisor_LastName = function(fieldValue) {
    //formulaire.INTERVENTIONS_EN_COURS$VALEUR183.value += " " + fieldValue;// MOD-002--
	var currValue = neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR183').getValue(); // MOD-002++
	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR183').setValue(currValue + " " + fieldValue); // MOD-002++
    //champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR183, false);// MOD-002--
	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR183').noMandatory();// MOD-002++
};

FillCf_Supervisor_PersonelNum = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR187.value = fieldValue;
    champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR187, false);
};

//Management Popup - Mentor
FillCf_Mentor_First_Name = function(fieldValue) {
    //formulaire.INTERVENTIONS_EN_COURS$VALEUR166.value = fieldValue; // MOD-002--
	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR166').setValue(fieldValue); // MOD-002++
};
FillCf_Mentor_LastName = function(fieldValue) {
    //formulaire.INTERVENTIONS_EN_COURS$VALEUR166.value += " " + fieldValue; // MOD-002--
	var currValue = neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR166').getValue(); // MOD-002++
	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR166').setValue(currValue + " " + fieldValue); // MOD-002++
    //champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR166, false); // MOD-002--
	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR166').noMandatory();// MOD-002++
};

FillCf_Mentor_PersonelNum = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR170.value = fieldValue;
    champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR170, false); 
};



window.popupLinkFunction = function() {
	
	
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
};


/********************************
 * DISABLE and ENABLE FIELDS
 ********************************/
window.disableField = function(field) {
    var msg = "function disableField : ";
    if (field) {
        field.onkeydown = function() { return false; };
    } else {
        msg += "field undefined or readonly";
        console.log(msg);
    }
};
window.enableField = function(field) {
    var msg = "function disableField : ";
    if (field) {
        field.onkeydown = function() { return true; };
    } else {
        msg += "field undefined or readonly";
        console.log(msg);
    }
};

window.disableFields = function() {

	//Management Team
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR154);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR158);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR183);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR187);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR166);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR170);

	//Probation update
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR130);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR132);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR214);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR134);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR215);
  
	//Termination info
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR224);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR220);

	//Resignation info
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR225);
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR376);

	//Last working day
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR221);

	//Return from LOA
	disableField(formulaire.INTERVENTIONS_EN_COURS$VALEUR373);
};


var selectedSubtopicValue = -11;

window.resetAllFieldsForm = function(){
	
var selectedSubtopic = document.getElementById("ELEMENTS");
var CurselectedSubtopicValue = selectedSubtopic.options[selectedSubtopic.selectedIndex].value;

	if(selectedSubtopicValue !== CurselectedSubtopicValue) {
		jQuery("#tabpage154").find(':input').each(function() {

			if(this.tabindex !== "-1") {
				var fld = jQuery(this);
				//console.log(fld[0].id);
				var currID = fld[0].id;
				
					switch(currID) {
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
	}
	else {
		selectedSubtopicValue = CurselectedSubtopicValue;
	}
};


window.copyFunctions = function() {
	
	//copy FTC extension value
	neocase.form.field('UTILISATEURS$CHAMPU43').copyValueTo('INTERVENTIONS_EN_COURS$VALEUR124');

};


window.hideAllSection = function(){

neocase.form.section('section267').hide();//Effective date
neocase.form.section('section102').hide(); //Probation Update 
neocase.form.section('section970').hide(); //Management Team 
neocase.form.section('section365').hide();//Fix term contract
neocase.form.section('section2fecf6651c15581a0c6c').hide(); //Termination info
neocase.form.section('section60ceec25b46ed23641b9').hide(); //Resignation info
neocase.form.section('section71c805d9d30258ead277').hide(); //Last working day
neocase.form.section('section0799b13d6b658217979d').hide();//Return from LOA
neocase.form.section('section7a270b6eb274a6748adb').hide();//LOA details


};

window.showSectionSubtopicProbationUpdate = function(){
neocase.form.section('section267').show();//Effective date
neocase.form.section('section102').show(); //Provation Update
};

window.showSectionSubtopicManagement = function(){
neocase.form.section('section267').show();//Effective date
neocase.form.section('section970').show(); //Management Team 

};


window.showSectionSubtopicFixedTermContractExtension = function(){
neocase.form.section('section365').show(); // Fixed Term Contract
neocase.form.section('section2fecf6651c15581a0c6c').show(); //Termination info
neocase.form.section('section71c805d9d30258ead277').show(); //Last working day
};


window.showSectionSubtopicVoluntaryLeave = function(){

neocase.form.section('section71c805d9d30258ead277').show(); //Confirmed Leaving dates
neocase.form.section('section60ceec25b46ed23641b9').show(); //Resignation info

};

window.showSectionSubtopicInvoluntery = function(){
neocase.form.section('section2fecf6651c15581a0c6c').show(); //Termination info
neocase.form.section('section71c805d9d30258ead277').show(); //Last working day
};

window.showSectionSubtopicStartLOA = function(){
neocase.form.section('section7a270b6eb274a6748adb').show(); //LOA details
};

window.showSectionSubtopicReturnFromLOA = function(){
neocase.form.section('section0799b13d6b658217979d').show();//Return from LOA
};

window.manageSections = function()
{
	hideAllSection();
	var selectedSubtopic = document.getElementById("ELEMENTS");
	var selectedSubtopicValue = selectedSubtopic.options[selectedSubtopic.selectedIndex].value;

	if(selectedSubtopicValue == '0')
	{
		hideAllSection();
	}
	if(selectedSubtopicValue == '2170')		// Probation Period Display
	{
		showSectionSubtopicProbationUpdate();
	}
	if(selectedSubtopicValue == '2169')		// Only Management Section
	{
		showSectionSubtopicManagement();
	}
	if(selectedSubtopicValue == '2200')		// Fixed term contract extension 
	{
		showSectionSubtopicFixedTermContractExtension();
	}
	if(selectedSubtopicValue == '2316')		// Other Request
	{
		showSectionSubtopicOtherRequest();
	}
	if(selectedSubtopicValue == '2240')		// Voluntary leave 
	{
		showSectionSubtopicVoluntaryLeave();
	}
	if (selectedSubtopicValue == '2241')		// Involuntary leave
	{
		showSectionSubtopicInvoluntery();
	}
	if ((selectedSubtopicValue == '2375')||(selectedSubtopicValue == '2376'))		// Involuntary leave
	{
		showSectionSubtopicStartLOA();
	}
	if(selectedSubtopicValue == '2021')		// Return from LOA
	{
		showSectionSubtopicReturnFromLOA();
	}
};

/*************************
 * ACTIONS ON LOAD COMPLETE
 **************************/
window.onloadForm = function() {
	//DISABLE FIELDS
	disableFields();
	
	//To copy the fields from employee to request catalouge
/*	copyFunctions();
	
	subtopic.addEventListener('change', function() { resetAllFieldsForm(); }, false);
	
	var temp = "updateProperty('ELEMENTS');onChangeListValue('ELEMENTS');resetAllFieldsForm();";
	subtopic.setAttribute('onchange', temp);*/
	
	popupLinkFunction();
	
	manageSections();
	
};

neocase.form.event.bind('loadcomplete', onloadForm);
