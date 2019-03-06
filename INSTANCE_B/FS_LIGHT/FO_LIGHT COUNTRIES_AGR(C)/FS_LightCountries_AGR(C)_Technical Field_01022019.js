// JavaScript Document
/**************		FS_EDC Front Office (C) Technical Fields	*************
********************************************************************************
Developer   - 
Date	    - 10/16/2017
Change No   - MOD-001
Description - 
***************************************************************************
Developer   - Smita singh
Date	    - 01/24/2019
Change No   - MOD-002
Description - Rewriting JS
***************************************************************************
***********************************************************/
/*****************
 * Hide Sections
 *****************/
//Technical section
//neocase.form.section("sectiond468895ba7e076561ca9").hide();
document.getElementById('sectiond468895ba7e076561ca9').style.display = 'none';

window.findDropdownElementbyID = function(nameElement) {
	try {
		var possibleElements = $('[id*="' + nameElement + '"]');
		for (var i = 0; i< possibleElements.length; ++i) {
			if (possibleElements[i].localName === 'select') {
				return possibleElements[i].id;
			}
		}
	} catch (error) {
		console.log(error.message);
	}
};

window.getParamFromUrl = function(param) {
	try {
		var vars = {};
		window.location.href.replace(location.hash, '').replace(/[?&]+([^=&]+)=?([^&]*)?/gi, function(m, key, value) {
			// regexp
			// callback
			vars[key] = value !== undefined ? value : '';
		});

		if (param) {
			return vars[param] ? vars[param] : null;
		}
		return vars;
	} catch (error) {
		console.log(error.message);
	}
};

/****************************
 * MANAGE SECTION
 *****************************/
window.hideAllSection = function() {
	try {
		// neocase.form.section("section19a724421fa2bcf87255").hide(); //Effective date section
		neocase.form.section('section3ee5542f26a2def7f5bf').hide(); //Termination info
		neocase.form.section('section5da0b635bb7c2fa7da10').hide(); //Last working day section
		neocase.form.section('sectiona03e205dbc1585c07446').hide(); //Leave of absence details
		neocase.form.section('section3393ec064b2dcf13f2bf').hide(); //Return from leave of absence
		neocase.form.section('section458').hide(); //Probation Update
		neocase.form.section('section253').hide(); //Fixed Term Contract
		neocase.form.section('section68c682c7983b6784dfdf').hide(); //Resignation info
		document.getElementById('section3ee5542f26a2def7f5bf').style.display = 'none'; //Termination info is repeated
		document.getElementById('section68c682c7983b6784dfdf').style.display = 'none'; //Resignation info
	} catch (error) {
		console.log(error.message);
	}
};

window.manageSection = function() {
	try {
		var topic = getParamFromUrl('topic');
		var subtopic = getParamFromUrl('subtopic');

		hideAllSection();

		if (topic === null && subtopic === null) {
			var selectedTopicid = findDropdownElementbyID('MOTCLE');
			var selectedTopic = document.getElementById(selectedTopicid);
			var selectedTopicValue = selectedTopic.options[selectedTopic.selectedIndex].value;

			var selectedSubtopicid = findDropdownElementbyID('ELEMENT');
			var selectedSubtopic = document.getElementById(selectedSubtopicid);
			var selectedSubtopicValue = selectedSubtopic.options[selectedSubtopic.selectedIndex].value;

			topic = selectedTopicValue;
			subtopic = selectedSubtopicValue;
		}

		if (topic == '2209') {
			//	Mass Upload
			if (subtopic == '2117') {
				// Supervisor / reviewer
			}
			if (subtopic == '2223') {
				//Personal data
			}
		}
		if (topic == '2237') {
			//Employment data change
			if (subtopic == '2169') {
				//Management team FO
			}
			if (subtopic == '2170') {
				//Probation Period update
				neocase.form.section('section458').show();
			}
		}


		if (topic == '2241') {
			neocase.form.section('sectiona03e205dbc1585c07446').show();
			document.getElementById('sectiona03e205dbc1585c07446').style.display = 'block'; //LOA details
		}
	
		if (topic == '2239') {
			//	Leave involuntary FO
			if (subtopic == '2199') {
				//Involuntary leave
				neocase.form.section('section3ee5542f26a2def7f5bf').show(); //Termination info
				neocase.form.section('section5da0b635bb7c2fa7da10').show(); //Last working day
				//document.getElementById("section3ee5542f26a2def7f5bf").style.display = "block";		//Termination info
			}
			if (subtopic == '2200') {
				//End of Fixed Term Contract - MGR
				neocase.form.section('section253').show(); //Fixed Term Contract
				neocase.form.section('section3ee5542f26a2def7f5bf').show(); //Termination info
				neocase.form.section('section5da0b635bb7c2fa7da10').show(); //Last working day
				//document.getElementById("section3ee5542f26a2def7f5bf").style.display = "block";		//Confirmed Leaving dates
			}
			if (subtopic == '2143') {
			//Retirement 
				neocase.form.section('section5da0b635bb7c2fa7da10').show(); //Last working day
				//document.getElementById("section3ee5542f26a2def7f5bf").style.display = "block";		//Confirmed Leaving dates
			}
			/*if(subtopic == "2374") {	//Resignation withdrawn
			document.getElementById("section3ee5542f26a2def7f5bf").style.display = "block";		//Confirmed Leaving dates 
		} */
		}
		if (topic == '2242') {
			if (subtopic == '2376') {
				//LOA Unpaid
				neocase.form.section('sectiona03e205dbc1585c07446').show();
				document.getElementById('sectiona03e205dbc1585c07446').style.display = 'block'; //LOA details
			}
		}
		if (topic == '2243') {
			if (subtopic == '2021') {
				//Return from LOA
				neocase.form.section('section3393ec064b2dcf13f2bf').show();
				document.getElementById('section3393ec064b2dcf13f2bf').style.display = 'block'; //Return from LOA details
			}
		}

		if (topic == '2240') {
			//	Leave voluntary FO
			if (subtopic == '2142') {
				//End of Fixed Term Contract - EE
				neocase.form.section('section253').show();
				neocase.form.section('section3ee5542f26a2def7f5bf').show(); //Confirmed Leaving dates
				document.getElementById('section3ee5542f26a2def7f5bf').style.display = 'block'; //Confirmed Leaving dates
				neocase.form.section('section68c682c7983b6784dfdf').show(); //Resignation info
				document.getElementById('section68c682c7983b6784dfdf').style.display = 'block'; //Resignation info
			}
			if (subtopic == '2143') {
				//Retirement
				//document.getElementById('section3ee5542f26a2def7f5bf').style.display = 'block'; //Confirmed Leaving dates
				//neocase.form.section('section3ee5542f26a2def7f5bf').show(); //Confirmed Leaving dates
				neocase.form.section('section5da0b635bb7c2fa7da10').show(); //Last working day
			}
			if (subtopic == '2240') {
				//	Voluntary leave
				neocase.form.section('section68c682c7983b6784dfdf').show(); //Resignation info
				document.getElementById('section68c682c7983b6784dfdf').style.display = 'block'; //Resignation info
				//	document.getElementById("section3ee5542f26a2def7f5bf").style.display = "block";	//Confirmed Leaving dates
				//	neocase.form.section("section3ee5542f26a2def7f5bf").show();	//Confirmed Leaving dates
				//last working day section
				//document.getElementById("section5da0b635bb7c2fa7da10").style.display = "block";
				neocase.form.section('section5da0b635bb7c2fa7da10').show();
			}
		}
		if (topic == '2244') {
			//	General request
			if (subtopic == '2316') {
				//Other request (EE)
			}
		}

		console.log('manageSection');
	} catch (error) {
		console.log(error.message);
	}
};

/************************
MANDATORY FIELDS
***************************/
window.noMandatories = function() {
	try {
		// neocase.form.field('INTERVENTIONS_EN_COURS_VALEUR130').noMandatory(); //Effective date / Start date
		neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR132').noMandatory(); //Probation status desc (new)
		neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR134').noMandatory(); //Last day of probation (new)
		neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR224').noMandatory(); //Confirmed Leaving dates -> Termination date
		neocase.form.field('INTERVENTIONS_EN_COURS_VALEUR220').noMandatory(); //Reason for resignation
		neocase.form.field('INTERVENTIONS_EN_COURS_VALEUR376').noMandatory(); //Resignation date
		// neocase.form.field('INTERVENTIONS_EN_COURS_VALEUR221').noMandatory(); //Last working day (new)
		neocase.form.field('INTERVENTIONS_EN_COURS_VALEUR225').noMandatory(); //Reason for resignation
		//  neocase.form.field('INTERVENTIONS_EN_COURS_VALEUR375').noMandatory(); //Reason for resignation
		//   neocase.form.field('INTERVENTIONS_EN_COURS_VALEUR333').noMandatory(); //Reason for resignation
		//    neocase.form.field('INTERVENTIONS_EN_COURS_VALEUR334').noMandatory(); //Reason for resignation
		//	 neocase.form.field('INTERVENTIONS_EN_COURS_VALEUR373').noMandatory(); //Reason for resignation
	} catch (error) {
		console.log(error.message);
	}
};

window.manageMandatoryFields = function() {
	try {
		console.log('In Mandatory FIELDS');
		var topic = getParamFromUrl('topic');
		var subtopic = getParamFromUrl('subtopic');

		if (topic === null && subtopic === null) {
			var selectedTopicid = findDropdownElementbyID('MOTCLE');
			var selectedTopic = document.getElementById(selectedTopicid);
			var selectedTopicValue = selectedTopic.options[selectedTopic.selectedIndex].value;

			var selectedSubtopicid = findDropdownElementbyID('ELEMENT');
			var selectedSubtopic = document.getElementById(selectedSubtopicid);
			var selectedSubtopicValue = selectedSubtopic.options[selectedSubtopic.selectedIndex].value;

			topic = selectedTopicValue;
			subtopic = selectedSubtopicValue;
		}

		noMandatories();

		if (topic == '2237') {
			//Employment data change
			if (subtopic == '2170') {
				//Probation Period update
				setTimeout(function() {
					neocase.form.field('INTERVENTIONS_EN_COURS_VALEUR5').mandatory('Effective date / Start date'); //Effective date / Start date
					neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR132').mandatory('Probation status desc (new) Need to be filledup'); //Probation status desc (new)
					neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR134').mandatory('Last day of probation (new) Need to be filledup'); //Last day of probation (new)
				}, 1000);
			}
		}

		if (topic == '2239') {
			//	Leave involuntary FO
			if (subtopic == '2143'){
				setTimeout(function() {
						neocase.form.field('INTERVENTIONS_EN_COURS_VALEUR221').mandatory('Last working day (new)'); //Last working day (new)
				}, 1000);
			}else{
				setTimeout(function() {
					neocase.form.field('INTERVENTIONS_EN_COURS_VALEUR224').mandatory('Reason for termination'); //Reason for termination
					neocase.form.field('INTERVENTIONS_EN_COURS_VALEUR220').mandatory('Resignation date'); //Termination date
					neocase.form.field('INTERVENTIONS_EN_COURS_VALEUR221').mandatory('Last working day (new)'); //Last working day (new)
				}, 1000);
			}
		}
		if (topic == '2240') {
			//Leave voluntary FO
			if (subtopic == '2199' || subtopic == '2200' || subtopic == '2142' || subtopic == '2240') {
				//Involuntary leave	||	End of Fixed Term Contract - MGR || End of Fixed Term Contract - EE || Retirement || Resignation info
				setTimeout(function() {
					neocase.form.field('INTERVENTIONS_EN_COURS_VALEUR225').mandatory('Reason for resignation'); //Reason for resignation
					neocase.form.field('INTERVENTIONS_EN_COURS_VALEUR376').mandatory('Resignation date'); //Resignation date
					neocase.form.field('INTERVENTIONS_EN_COURS_VALEUR221').mandatory('Last working day (new)'); //Last working day (new)
					//	neocase.form.field('INTERVENTIONS_EN_COURS$VALEUR220').mandatory("Confirmed Leaving dates");	//Confirmed Leaving dates -> Termination date
				}, 1000);
			}
		}

		console.log('manageMandatoryFields');
	} catch (error) {
		console.log(error.message);
	}
};

/****************************
 * AUTOMATICALLY FILL TOPIC
 *****************************/
window.manageTopic = function() {
	try {
		var msg = 'function manageSubtopic : ';
		var field = neocase.form.field('INTERVENTIONS_EN_COURS_MOTCLE').elementHTML;

		var topic = getParamFromUrl('topic');

		if (topic === '2239' || topic === '2237' || topic === '2240' || topic === '2241' || topic === '2242' || topic === '2243') {
			if (topic) {
				if (field) {
					field.value = topic;
				} else {
					msg += 'field undefined';
					console.log(msg);
				}
			} else {
				msg += topic + ' undefined';
				console.log(msg);
			}
		}
	} catch (error) {
		console.log(error.message);
	}
};

/****************************
 * AUTOMATICALLY FILL SUBTOPIC
 *****************************/
window.addSubTopic = function() {
	try {
		var x = formulaire.INTERVENTIONS_EN_COURS$ELEMENT;
		var option1 = document.createElement('option');
		var option2 = document.createElement('option');
		var option3 = document.createElement('option');
		var option4 = document.createElement('option');

		var topic = -11;
		topic = getParamFromUrl('topic');
		//Leave
		if (topic === '2239') {
			option1.text = 'Involuntary leave (Light countries)';
			option1.value = '2199';
			x.add(option1);

			option2.text = 'End of Fixed Term Contract (Light countries)';
			option2.value = '2200';
			x.add(option2);
			
			option3.text = 'Retirement(Light countries)';
			option3.value = '2143';
			x.add(option3);

		}
		//Leave
		if (topic === '2240') {
			option1.text = 'Resignation withdrawn (Light countries)';
			option1.value = '2374';
			x.add(option1);
		}
		//Employment data change
		if (topic === '2237') {
			option1.text = 'Management team (Light countries)';
			option1.value = '2169';
			x.add(option1);
		}

		//LOA unpaid
		if (topic === '2242') {
			option1.text = 'LOA Unpaid (Light countries)';
			option1.value = '2376';
			x.add(option1);
		}
		//LOA return
		if (topic === '2243') {
			option1.text = 'Return Leave of Absence (Light countries)';
			option1.value = '2021';
			x.add(option1);
		}
		

	} catch (error) {
		console.log(error.message);
	}
};

/****************************
 * AUTOMATICALLY FILL SUBTOPIC
 *****************************/
window.manageSubtopic = function() {
	try {
		var msg = 'function manageSubtopic : ';
		var field = neocase.form.field('INTERVENTIONS_EN_COURS$ELEMENT').elementHTML;

		var subtopic = getParamFromUrl('subtopic');

		if (subtopic) {
			if (field) {
				field.value = subtopic;
			} else {
				msg += 'field undefined';
				console.log(msg);
			}
		} else {
			msg += subtopic + ' undefined';
			console.log(msg);
		}
	} catch (error) {
		console.log(error.message);
	}
};
/**************
* update level1
***************/
window.updateAndDisableField = function(field,value){
	//update 'level 1' value
	field.setValue(value);
	if(field.elementHTML.value !== "0" && field.elementHTML.value !== ""){
		//launch dependencies
		launchDependencies(field);

		//Disable field
		disableField(field);
	}
};

/********************
* Launch dependencies
*********************/
window.launchDependencies = function(field){
	if("createEvent" in document){
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent("change",false,true);
		field.elementHTML.dispatchEvent(evt);
	}else{
		field.elementHTML.fireEvent("onchange");
	}
};



/***************
* DISABLE FIELDS
****************/
window.disableTextField = function(field){
	if(document.getElementById("champsobligatoiresproprietes")){
	//BackOffice
		field.setAttribute("readonly","true");
		field.onmousedown = function(){return false;};
	}else{
	//FrontOffice
		field.setAttribute("readonly","true");
		field.onkeydown = function(){return false;};
		field.onmousedown = function(){return false;};
	}
};

window.disableBooleanField = function(field){
	field.onclick = function(){return false;};
	disableTextField(field);
};

window.disableDateField = function(field){
	if(document.getElementById("champsobligatoiresproprietes")){
	//BackOffice
		//hide calendar icon
		field.style.background = "none";
	}else{
	//FrontOffice
		//hide calendar icon
		if(field.parentNode.getElementsByTagName("img").length > 0){
			field.parentNode.getElementsByTagName("img")[0].style.display = "none";
		}
	}
	disableTextField(field);
};

window.disableFileField = function(field){
	if(document.getElementById("champsobligatoiresproprietes")){
	//BackOffice
		field.parentNode.parentNode.style.border = "none";
		//hide button browse file
		field.parentNode.style.display = "none";
		//hide button delete file
		if(field.parentNode.parentNode.getElementsByClassName("btn-delete").length > 0){
			field.parentNode.parentNode.getElementsByClassName("btn-delete")[0].style.display = "none";
		}
	}else{
	//FrontOffice
		field.parentNode.getElementsByClassName("fileinput-button")[0].style.display = "none";
	}
};

window.disableListField = function(field){
	if(document.getElementById("champsobligatoiresproprietes")){
	//BackOffice
		field.parentNode.style.border = "none";
	}
	disableTextField(field);
};

window.disableTextareaField = function(field){
	disableTextField(field);
};

window.disableField = function(field){
	var msg = "function disableField : ";
	if(field){
		field = field.elementHTML;
		if(field.type == "checkbox"){
		//Boolean custom fields
			disableBooleanField(field);
		}else if(field.className.search("hasDatepicker") != -1){
		//Date custom fields
			disableDateField(field);
		}else if(field.id.search("_display") != -1){
		//File custom fields
			disableFileField(field);
		}else if(field.tagName == "SELECT"){
		//List custom fields
			disableListField(field);
		}else if(field.tagName == "TEXTAREA"){
		//Textarea custom fields
			disableTextareaField(field);
		}else{
		//Text custom fields
			disableTextField(field);
		}
	}else{
		msg += "field undefined or readonly";
		console.log(msg);
	}
};


/*************************
 * ACTIONS ON LOAD COMPLETE
 **************************/
window.onInitForm = function() {
	manageSection();
	manageMandatoryFields();

	var gettingval1 = neocase.form.field('INTERVENTIONS_EN_COURS$ELEMENT').getText();
	var topic = -11;
	topic = getParamFromUrl('topic');
	if (topic === '2239' || topic === '2237' || topic === '2240' || topic === '2241' || topic === '2242' || topic === '2243') {
		manageTopic();
		addSubTopic();
		setTimeout(function() {
			manageSubtopic();
			var gettingval1 = neocase.form.field('INTERVENTIONS_EN_COURS$ELEMENT').getText();
			neocase.form.field('INTERVENTIONS_EN_COURS_VALEUR204').setValue(gettingval1);
			//document.getElementById("divINTERVENTIONS_EN_COURS_MOTCLE").style.display = "none";
		}, 500);
		manageSection();
		var gettingval2 = neocase.form.field('INTERVENTIONS_EN_COURS_MOTCLE').getText();
		neocase.form.field('INTERVENTIONS_EN_COURS_VALEUR203').setValue(gettingval2);

		if (topic === '2241' && gettingval1 === 'Select...') {
			updateAndDisableField(neocase.form.field('INTERVENTIONS_EN_COURS$MOTCLE'), getParamFromUrl('topic'));
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

	//popupLinkFunction();
};
//ThisForm.Bind('loadcomplete', onloadForm);
neocase.form.event.bind('init', onInitForm);

/*************************
 * ACTIONS ON LOAD COMPLETE
 **************************/
window.onloadForm = function() {
	manageSection();
	manageMandatoryFields();

};
//ThisForm.Bind('loadcomplete', onloadForm);
neocase.form.event.bind('loadcomplete', onloadForm);