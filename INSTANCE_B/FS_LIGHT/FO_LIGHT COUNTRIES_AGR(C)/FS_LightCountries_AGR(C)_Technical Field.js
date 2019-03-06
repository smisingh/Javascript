// JavaScript Document
/**************		FS_EDC Front Office (C) Technical Fields	*************
********************************************************************************
Developer   - 
Date	    - 10/16/2017
Change No   - MOD-001
Description - 
***************************************************************************
***********************************************************/
/*****************
 * Hide Sections
 *****************/
//Technical section
//neocase.form.section("sectiond468895ba7e076561ca9").hide();
document.getElementById("sectiond468895ba7e076561ca9").style.display = "none";

window.findDropdownElementbyID = function(nameElement) {

    var possibleElements = $('[id*="' + nameElement + '"]');
    for (var i = 0; i< possibleElements.length; ++i) {
        if (possibleElements[i].localName === "select") {
            return possibleElements[i].id;
        }
    }

};

/************************************************
 * FUNCTIONS CALLED BY POPUP TO FILL CUSTOM FIELDS
 *************************************************/

//Management Popup - Reviewer
FillCf_Reviewer_First_Name = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR154.value = fieldValue;
};
FillCf_Reviewer_LastName = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR154.value += " " + fieldValue;
    champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR154, false);
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

FillCf_Supervisor_PersonelNum = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR187.value = fieldValue;
    champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR187, false);
};

//Management Popup - Mentor 
FillCf_Mentor_First_Name = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR166.value = fieldValue;
};
FillCf_Mentor_LastName = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR166.value += " " + fieldValue;
    champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR166, false);
};

FillCf_Mentor_PersonelNum = function(fieldValue) {
    formulaire.INTERVENTIONS_EN_COURS$VALEUR170.value = fieldValue;
    champObligatoire(formulaire.INTERVENTIONS_EN_COURS$VALEUR170, false);
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
 * MANAGE SECTION
 *****************************/
window.hideAllSection = function() {

    neocase.form.section("section19a724421fa2bcf87255").hide(); //Effective date section
    neocase.form.section("section3ee5542f26a2def7f5bf").hide();
    neocase.form.section("section5da0b635bb7c2fa7da10").hide(); //Last working day section
    neocase.form.section("section9b742455774303306e72").hide();
    neocase.form.section("sectiona03e205dbc1585c07446").hide(); //Leave of absence details
    neocase.form.section("section3393ec064b2dcf13f2bf").hide();
    neocase.form.section("section458").hide();
    neocase.form.section("section388").hide();
    neocase.form.section("section253").hide();
    neocase.form.section("section3ee5542f26a2def7f5bf").hide();
    neocase.form.section("section68c682c7983b6784dfdf").hide();
    document.getElementById("section3ee5542f26a2def7f5bf").style.display = "none";
    document.getElementById("section68c682c7983b6784dfdf").style.display = "none";
    neocase.form.section("section978").hide();

};

window.manageSection = function() {

    var topic = getParamFromUrl('topic');
    var subtopic = getParamFromUrl('subtopic');

    hideAllSection();


    if ((topic === null) && (subtopic === null)) {

        var selectedTopicid = findDropdownElementbyID("MOTCLE");
        var selectedTopic = document.getElementById(selectedTopicid);
        var selectedTopicValue = selectedTopic.options[selectedTopic.selectedIndex].value;

        var selectedSubtopicid = findDropdownElementbyID("ELEMENT");
        var selectedSubtopic = document.getElementById(selectedSubtopicid);
        var selectedSubtopicValue = selectedSubtopic.options[selectedSubtopic.selectedIndex].value;

        topic = selectedTopicValue;
        subtopic = selectedSubtopicValue;
    }


    if (topic == "2209") { //	Mass Upload
        if (subtopic == "2117") { // Supervisor / reviewer

        }
        if (subtopic == "2223") { //Personal data

        }
    }
    if (topic == "2237") { //Employment data change
        if (subtopic == "2169") { //Management team FO
            neocase.form.section("section19a724421fa2bcf87255").show();
            neocase.form.section("section388").show();
        }
        if (subtopic == "2170") { //Probation Period update
            neocase.form.section("section19a724421fa2bcf87255").show();
            neocase.form.section("section458").show();
        }
    }
    if (topic == "2239") { //	Leave involuntary FO
        if (subtopic == "2199") { //Involuntary leave
            neocase.form.section("section3ee5542f26a2def7f5bf").show(); //Termination info 
            neocase.form.section("section5da0b635bb7c2fa7da10").show(); //Last working day
            //document.getElementById("section3ee5542f26a2def7f5bf").style.display = "block";		//Termination info 
        }
        if (subtopic == "2200") { //End of Fixed Term Contract - MGR
            neocase.form.section("section253").show(); //Fixed Term Contract 
            neocase.form.section("section3ee5542f26a2def7f5bf").show(); //Termination info 
            neocase.form.section("section5da0b635bb7c2fa7da10").show(); //Last working day
            //document.getElementById("section3ee5542f26a2def7f5bf").style.display = "block";		//Confirmed Leaving dates 

        }
        /*if(subtopic == "2374") {	//Resignation withdrawn
			document.getElementById("section3ee5542f26a2def7f5bf").style.display = "block";		//Confirmed Leaving dates 
		} */
    }

    if (topic == "2241") {
        neocase.form.section("sectiona03e205dbc1585c07446").show();
        document.getElementById("sectiona03e205dbc1585c07446").style.display = "block"; //LOA details
    }
    if (topic == "2242") {
        if (subtopic == "2376") { //LOA Unpaid
            neocase.form.section("sectiona03e205dbc1585c07446").show();
            document.getElementById("sectiona03e205dbc1585c07446").style.display = "block"; //LOA details
        }
    }
    if (topic == "2243") {
        if (subtopic == "2021") { //Return from LOA
            neocase.form.section("section3393ec064b2dcf13f2bf").show();
            document.getElementById("section3393ec064b2dcf13f2bf").style.display = "block"; //Return from LOA details
        }
    }




    if (topic == "2240") { //	Leave voluntary FO
        if (subtopic == "2142") { //End of Fixed Term Contract - EE
            neocase.form.section("section253").show();
            neocase.form.section("section3ee5542f26a2def7f5bf").show(); //Confirmed Leaving dates 
            document.getElementById("section3ee5542f26a2def7f5bf").style.display = "block"; //Confirmed Leaving dates 
            neocase.form.section("section68c682c7983b6784dfdf").show(); //Resignation info
            document.getElementById("section68c682c7983b6784dfdf").style.display = "block"; //Resignation info
        }
        if (subtopic == "2143") { //Retirement
            document.getElementById("section3ee5542f26a2def7f5bf").style.display = "block"; //Confirmed Leaving dates 
            neocase.form.section("section3ee5542f26a2def7f5bf").show(); //Confirmed Leaving dates 
        }
        if (subtopic == "2240") { //	Voluntary leave
            neocase.form.section("section68c682c7983b6784dfdf").show(); //Resignation info
            document.getElementById("section68c682c7983b6784dfdf").style.display = "block"; //Resignation info
            //	document.getElementById("section3ee5542f26a2def7f5bf").style.display = "block";	//Confirmed Leaving dates 
            //	neocase.form.section("section3ee5542f26a2def7f5bf").show();	//Confirmed Leaving dates 
            //last working day section
            document.getElementById("section5da0b635bb7c2fa7da10").style.display = "block";
            neocase.form.section("section5da0b635bb7c2fa7da10").show();
        }
    }
    if (topic == "2244") { //	General request
        if (subtopic == "2316") { //Other request (EE)

        }
    }


    console.log("manageSection");
};


/****************************
 * AUTOMATICALLY FILL TOPIC
 *****************************/
window.manageTopic = function() {

    var msg = "function manageSubtopic : ";
    var field = neocase.form.field("INTERVENTIONS_EN_COURS_MOTCLE").elementHTML;

    var topic = getParamFromUrl('topic');

    if ((topic === '2239') || (topic === '2237') || (topic === '2240') || (topic === '2241') || (topic === '2242') || (topic === '2243')) {
        if (topic) {
            if (field) {
                field.value = topic;
            } else {
                msg += "field undefined";
                console.log(msg);
            }
        } else {

            msg += topic + " undefined";
            console.log(msg);
        }
    }

};


/****************************
 * AUTOMATICALLY FILL SUBTOPIC
 *****************************/
window.addSubTopic = function() {

    var x = formulaire.INTERVENTIONS_EN_COURS$ELEMENT;
    var option1 = document.createElement("option");
    var option2 = document.createElement("option");
    var option3 = document.createElement("option");
    var option4 = document.createElement("option");

    var topic = -11;
    topic = getParamFromUrl('topic');
    //Leave	
    if (topic === '2239') {
        option1.text = "Involuntary leave (Light countries)";
        option1.value = "2199";
        x.add(option1);

        option2.text = "End of Fixed Term Contract (Light countries)";
        option2.value = "2200";
        x.add(option2);
    }
    //Leave	
    if (topic === '2240') {
        option1.text = "Resignation withdrawn (Light countries)";
        option1.value = "2374";
        x.add(option1);
    }
    //Employment data change  
    if (topic === '2237') {
        option1.text = "Management team (Light countries)";
        option1.value = "2169";
        x.add(option1);
    }

    //LOA start 
    if (topic === '2242') {
        option1.text = "LOA Unpaid (Light countries)";
        option1.value = "2376";
        x.add(option1);
    }
    //LOA return
    if (topic === '2243') {
        option1.text = "Return Leave of Absence (Light countries)";
        option1.value = "2021";
        x.add(option1);
    }


};

/****************************
 * AUTOMATICALLY FILL SUBTOPIC
 *****************************/
window.manageSubtopic = function() {
    var msg = "function manageSubtopic : ";
    var field = neocase.form.field("INTERVENTIONS_EN_COURS$ELEMENT").elementHTML;

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

window.popupLinkFunction = function() {

    //neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR154').setLink('/Custom_Referential/SubArea.aspx?Id_User=','_blank','style-button');
    popupLink(document.getElementById("INTERVENTIONS_EN_COURS$VALEUR154"), "/Custom_Referential/ManagerReviewer.aspx");
    popupLink(document.getElementById("INTERVENTIONS_EN_COURS$VALEUR166"), "/Custom_Referential/ManageMentor.aspx");
    popupLink(document.getElementById("INTERVENTIONS_EN_COURS$VALEUR183"), "/Custom_Referential/ManageSupervisor.aspx");
};


window.disableFieldOLD = function(field) {
    var msg = "function disableFieldOLD : ";
    if (field) {
        field.onkeydown = function() {
            return false;
        };
    } else {
        msg += "field undefined or readonly";
        console.log(msg);
    }
};

window.disableFields = function() {

    //Mangement team
    /*
    disableField(neocase.form.field("INTERVENTIONS_EN_COURS_VALEUR154"));
    disableField(neocase.form.field("INTERVENTIONS_EN_COURS_VALEUR158"));
    disableField(neocase.form.field("INTERVENTIONS_EN_COURS_VALEUR183"));
    disableField(neocase.form.field("INTERVENTIONS_EN_COURS_VALEUR187"));
    disableField(neocase.form.field("INTERVENTIONS_EN_COURS_VALEUR170"));
    disableField(neocase.form.field("INTERVENTIONS_EN_COURS_VALEUR166"));
    */

    disableFieldOLD(formulaire.INTERVENTIONS_EN_COURS$VALEUR154);
    disableFieldOLD(formulaire.INTERVENTIONS_EN_COURS$VALEUR158);
    disableFieldOLD(formulaire.INTERVENTIONS_EN_COURS$VALEUR183);
    disableFieldOLD(formulaire.INTERVENTIONS_EN_COURS$VALEUR187);
    disableFieldOLD(formulaire.INTERVENTIONS_EN_COURS$VALEUR170);
    disableFieldOLD(formulaire.INTERVENTIONS_EN_COURS$VALEUR166);


};

//MANDATORY FIELDS
window.noMandatories = function() {
    neocase.form.field('INTERVENTIONS_EN_COURS_VALEUR5').noMandatory(); //Effective date / Start date
    neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR132').noMandatory(); //Probation status desc (new)
    neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR134').noMandatory(); //Last day of probation (new)
    neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR220').noMandatory(); //Confirmed Leaving dates -> Termination date
    neocase.form.field('INTERVENTIONS_EN_COURS_VALEUR225').noMandatory(); //Reason for resignation
    neocase.form.field('INTERVENTIONS_EN_COURS_VALEUR376').noMandatory(); //Resignation date
    neocase.form.field('INTERVENTIONS_EN_COURS_VALEUR221').noMandatory(); //Last working day (new)
};

window.manageMandatoryFields = function() {

    console.log("In Mandatory FIELDS");
    var topic = getParamFromUrl('topic');
    var subtopic = getParamFromUrl('subtopic');

    if ((topic === null) && (subtopic === null)) {

        var selectedTopicid = findDropdownElementbyID("MOTCLE");
        var selectedTopic = document.getElementById(selectedTopicid);
        var selectedTopicValue = selectedTopic.options[selectedTopic.selectedIndex].value;

        var selectedSubtopicid = findDropdownElementbyID("ELEMENT");
        var selectedSubtopic = document.getElementById(selectedSubtopicid);
        var selectedSubtopicValue = selectedSubtopic.options[selectedSubtopic.selectedIndex].value;

        topic = selectedTopicValue;
        subtopic = selectedSubtopicValue;
    }

    noMandatories();

    if (topic == "2237") { //Employment data change
        if (subtopic == "2170") { //Probation Period update
            setTimeout(function() {
                neocase.form.field('INTERVENTIONS_EN_COURS_VALEUR5').mandatory("Effective date / Start date"); //Effective date / Start date
                neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR132').mandatory("Probation status desc (new) Need to be filledup"); //Probation status desc (new)
                neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR134').mandatory("Last day of probation (new) Need to be filledup"); //Last day of probation (new)
            }, 1000);

        }
    }

    if ((topic == "2239")) { //	Leave involuntary FO
        setTimeout(function() {
            neocase.form.field('INTERVENTIONS_EN_COURS_VALEUR224').mandatory("Reason for termination"); //Reason for termination
            neocase.form.field('INTERVENTIONS_EN_COURS_VALEUR220').mandatory("Resignation date"); //Termination date
            neocase.form.field('INTERVENTIONS_EN_COURS_VALEUR221').mandatory("Last working day (new)"); //Last working day (new)
        }, 1000);
    }
    if ((topic == "2240")) { //Leave voluntary FO
        if ((subtopic == "2199") || (subtopic == "2200") || (subtopic == "2142") || (subtopic == "2143") || (subtopic == "2240")) { //Involuntary leave	||	End of Fixed Term Contract - MGR || End of Fixed Term Contract - EE || Retirement || Resignation info
            setTimeout(function() {
                neocase.form.field('INTERVENTIONS_EN_COURS_VALEUR225').mandatory("Reason for resignation"); //Reason for resignation
                neocase.form.field('INTERVENTIONS_EN_COURS_VALEUR376').mandatory("Resignation date"); //Resignation date
                neocase.form.field('INTERVENTIONS_EN_COURS_VALEUR221').mandatory("Last working day (new)"); //Last working day (new)
                //	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR220').mandatory("Confirmed Leaving dates");	//Confirmed Leaving dates -> Termination date
            }, 1000);
        }
    }

    console.log("manageMandatoryFields");
};


/***************
 * DISABLE FIELDS
 ****************/
window.disableTextField = function(field) {
    if (document.getElementById("champsobligatoiresproprietes")) {
        //BackOffice
        field.setAttribute("readonly", "true");
        field.onmousedown = function() {
            return false;
        };
    } else {
        //FrontOffice
        field.setAttribute("readonly", "true");
        field.onkeydown = function() {
            return false;
        };
        field.onmousedown = function() {
            return false;
        };
    }
};

window.disableBooleanField = function(field) {
    field.onclick = function() {
        return false;
    };
    disableTextField(field);
};

window.disableDateField = function(field) {
    if (document.getElementById("champsobligatoiresproprietes")) {
        //BackOffice
        //hide calendar icon
        field.style.background = "none";
    } else {
        //FrontOffice
        //hide calendar icon
        if (field.parentNode.getElementsByTagName("img").length > 0) {
            field.parentNode.getElementsByTagName("img")[0].style.display = "none";
        }
    }
    disableTextField(field);
};

window.disableFileField = function(field) {
    if (document.getElementById("champsobligatoiresproprietes")) {
        //BackOffice
        field.parentNode.parentNode.style.border = "none";
        //hide button browse file
        field.parentNode.style.display = "none";
        //hide button delete file
        if (field.parentNode.parentNode.getElementsByClassName("btn-delete").length > 0) {
            field.parentNode.parentNode.getElementsByClassName("btn-delete")[0].style.display = "none";
        }
    } else {
        //FrontOffice
        field.parentNode.getElementsByClassName("fileinput-button")[0].style.display = "none";
    }
};

window.disableListField = function(field) {
    if (document.getElementById("champsobligatoiresproprietes")) {
        //BackOffice
        field.parentNode.style.border = "none";
    }
    disableTextField(field);
};

window.disableTextareaField = function(field) {
    disableTextField(field);
};

window.disableField = function(field) {
    var msg = "function disableField : ";
    if (field) {
        field = field.elementHTML;
        if (field.type == "checkbox") {
            //Boolean custom fields
            disableBooleanField(field);
        } else if (field.className.search("hasDatepicker") != -1) {
            //Date custom fields
            disableDateField(field);
        } else if (field.id.search("_display") != -1) {
            //File custom fields
            disableFileField(field);
        } else if (field.tagName == "SELECT") {
            //List custom fields
            disableListField(field);
        } else if (field.tagName == "TEXTAREA") {
            //Textarea custom fields
            disableTextareaField(field);
        } else {
            //Text custom fields
            disableTextField(field);
        }
    } else {
        msg += "field undefined or readonly";
        console.log(msg);
    }
};

/********************
 * Launch dependencies
 *********************/
window.launchDependencies = function(field) {
    if ("createEvent" in document) {
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("change", false, true);
        field.elementHTML.dispatchEvent(evt);
    } else {
        field.elementHTML.fireEvent("onchange");
    }
};

/**************
 * update level1
 ***************/
window.updateAndDisableField = function(field, value) {
    //update 'level 1' value
    field.setValue(value);
    if (field.elementHTML.value !== "0" && field.elementHTML.value !== "") {
        //launch dependencies
        launchDependencies(field);

        //Disable field
        disableField(field);
    }
};


/*************************
 * ACTIONS ON LOAD COMPLETE
 **************************/
window.onloadForm = function() {

    manageSection();
    disableFields();
    manageMandatoryFields();
    var gettingval1 = neocase.form.field('INTERVENTIONS_EN_COURS$ELEMENT').getText();


    var topic = -11;
    topic = getParamFromUrl('topic');


    if ((topic === '2239') || (topic === '2237') || (topic === '2240') || (topic === '2241') || (topic === '2242') || (topic === '2243')) {

        manageTopic();
        addSubTopic();
        setTimeout(function() {
            manageSubtopic();
            var gettingval1 = neocase.form.field('INTERVENTIONS_EN_COURS$ELEMENT').getText();
            neocase.form.field('INTERVENTIONS_EN_COURS_VALEUR204').setValue(gettingval1);
            //document.getElementById("divINTERVENTIONS_EN_COURS_MOTCLE").style.display = "none";
        }, 1000);

        manageSection();

        var gettingval2 = neocase.form.field('INTERVENTIONS_EN_COURS_MOTCLE').getText();
        neocase.form.field('INTERVENTIONS_EN_COURS_VALEUR203').setValue(gettingval2);

        if ((topic === '2241') && (gettingval1 === 'Select...')) {
            updateAndDisableField(neocase.form.field("INTERVENTIONS_EN_COURS$MOTCLE"), getParamFromUrl('topic'));
            neocase.form.field('INTERVENTIONS_EN_COURS_VALEUR203').hide();
            neocase.form.field('INTERVENTIONS_EN_COURS_VALEUR204').hide();
            //console.log(findDropdownElementbyID("MOTCLE"));
        } else {
            if (topic !== '2241') {
                neocase.form.field('INTERVENTIONS_EN_COURS$ELEMENT').hide();
                neocase.form.field('INTERVENTIONS_EN_COURS_MOTCLE').hide();
            }
        }

    } else {
        neocase.form.field('INTERVENTIONS_EN_COURS_VALEUR203').hide();
        neocase.form.field('INTERVENTIONS_EN_COURS_VALEUR204').hide();
    }

    var sel1 = formulaire.INTERVENTIONS_EN_COURS_VALEUR130;
    var sel2 = formulaire.INTERVENTIONS_EN_COURS_VALEUR132;

    sel1.addEventListener('change', function() {
        probationCodeToDesc();
    }, false);
    sel2.addEventListener('change', function() {
        probationDescToCode();
    }, false);

    popupLinkFunction();

};
//ThisForm.Bind('loadcomplete', onloadForm);
neocase.form.event.bind('loadcomplete', onloadForm);
