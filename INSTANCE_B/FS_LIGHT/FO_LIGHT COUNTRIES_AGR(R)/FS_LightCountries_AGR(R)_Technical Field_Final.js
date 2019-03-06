// JavaScript Document
/**************		LC_AGR Front Office (R) Technical Fields	*************
********************************************************************************
Developer   - smita singh
Date	    - 02/26/2017 (MM/DD/YYYY)
Change No   - MOD-001
Description - Removing 'neocase' and adding jquery to get ids
***************************************************************************
***********************************************************/

/*****************
 * Hide Sections
 *****************/
document.getElementById("sectiond468895ba7e076561ca9").style.display = "none";

//-------------------------------------------------- START MOD-001 ------------------------------------------------------------//
/****************************
 * MANAGE SECTION
 *****************************/
window.hideAllSection = function() {

	//neocase.form.section("section19a724421fa2bcf87255").hide(); //Effective date section
	//neocase.form.section("section3ee5542f26a2def7f5bf").hide(); //Termination info
	//neocase.form.section("section5da0b635bb7c2fa7da10").hide(); //Last working day section
	//neocase.form.section("section9b742455774303306e72").hide();
	//neocase.form.section("sectiona03e205dbc1585c07446").hide(); //Leave of absence details
	//neocase.form.section("section3393ec064b2dcf13f2bf").hide(); //Return LOA
	//neocase.form.section("section458").hide();
	//neocase.form.section("section388").hide();
	//neocase.form.section("section253").hide();
	//neocase.form.section("section3ee5542f26a2def7f5bf").hide();
	//neocase.form.section("section68c682c7983b6784dfdf").hide(); //Resignation info
	
	// document.getElementById("section458").style.display = "none"; //For Survey Page
	// document.getElementById("section253").style.display = "none"; //For Survey Page
	// document.getElementById("section3ee5542f26a2def7f5bf").style.display = "none"; //For Survey Page
	// document.getElementById("section68c682c7983b6784dfdf").style.display = "none"; //For Survey Page
	// document.getElementById("section5da0b635bb7c2fa7da10").style.display = "none"; //For Survey Page
	// document.getElementById("sectiona03e205dbc1585c07446").style.display = "none"; //For Survey Page
	// document.getElementById("section3393ec064b2dcf13f2bf").style.display = "none"; //For Survey Page
	
	$("#section458").hide();//Probation Update
	$("#section253").hide();//Fixed Term Contract
	$("#section3ee5542f26a2def7f5bf").hide();//Termination info
	$("#section68c682c7983b6784dfdf").hide();//Resignation info
	$("#section5da0b635bb7c2fa7da10").hide();//Last working day
	$("#sectiona03e205dbc1585c07446").hide();//Leave of absence details
	$("#section3393ec064b2dcf13f2bf").hide();//Return from leave of absence
	//neocase.form.section("section978").hide();
	
};

window.manageSection = function() {
	
	hideAllSection();
	var topic = getTopicSubTopic("MOTCLE");
	var subtopic = getTopicSubTopic("ELEMENT");

	if(topic == "2237") {	//	Employment data change
		if(subtopic == "2170") {	//Probation Period update
			$("#section458").show();
		}
	}

	if(topic == "2239") {	//	Leave involuntary FO
		if (subtopic == '2199') {
			$("#section3ee5542f26a2def7f5bf").show(); 	//Termination info section
			$("#section5da0b635bb7c2fa7da10").show(); //Last working day section
		}
		if(subtopic == "2200") {	//End of Fixed Term Contract
			$("#section253").show(); //Fixed Term Contract
			$("#section3ee5542f26a2def7f5bf").show(); //Termination info section
			$("#section5da0b635bb7c2fa7da10").show(); //Last working day section
		}
		if (subtopic == '2143') {
			//Retirement 
			//neocase.form.section('section5da0b635bb7c2fa7da10').show(); //Last working day
			$("#section5da0b635bb7c2fa7da10").show();
			
		}
	}
  
	if(topic == "2241") {	//Start LOA
		//neocase.form.section("sectiona03e205dbc1585c07446").show();//Start LOA section
			$("#sectiona03e205dbc1585c07446").show();
    }
    
	if(topic == "2243") {	//Return LOA
		//neocase.form.section("section3393ec064b2dcf13f2bf").show();//Return LOA section
			$("#section3393ec064b2dcf13f2bf").show();
    }

	if(topic == "2240") {	//	Resignation
		if (subtopic == '2240') {
		//neocase.form.section("section68c682c7983b6784dfdf").show();	//Resignation info section
			$("#section68c682c7983b6784dfdf").show();
		//neocase.form.section("section5da0b635bb7c2fa7da10").show();//Last working day section
			$("#section5da0b635bb7c2fa7da10").show();
		}
		if (subtopic == '2374') {
		//do nothing
		}
		
  }
};

//-------------------------------------------------- END MOD-001 ------------------------------------------------------------//

window.getTopicSubTopic = function(typeEle) {
	var storeString;
	var returnval = " ";
	var possibleElements = $('[id*="'+ typeEle +'"]');
	for(var i=0; i< possibleElements.length; ++i){
		if(possibleElements[i].localName === "span") {
			storeString = possibleElements[i].innerHTML;
			storeString = storeString.trim();
			//storeString = storeString.toLowerCase();
		}
	}
	if(typeEle === "MOTCLE"){	// Topic
		switch(storeString) {
			case 'Mass Upload (Light countries)':
				returnval = "2209";
				break;
			case 'Employment data change (Light countries)':
				returnval = "2237";
				break;
			case 'Involuntary leaver (Light countries)':
				returnval = "2239";
				break;
			case 'Resignation (Light countries)':
				returnval = "2240";
				break;
			case 'General request (Light countries)':
				returnval = "2244";
				break;
			case 'Start a leave of absence (Light countries)':
				returnval = "2241";
				break;
			case 'Return leave of absence (Light countries)':
				returnval = "2243";
				break;
			case 'Leave of absence Unpaid (Light countries)':
				returnval = "2242";
				break;
		}
	}
	if(typeEle === "ELEMENT"){	// Subtopic
		switch(storeString) {
			case 'Supervisor / reviewer (Light countries)':
				returnval = "2117";
				break;
			case 'personal data':
				returnval = "2223";
				break;
			case 'management team (light countries)':
				returnval = "2169";
				break;
			case 'probation period update (light countries)':
				returnval = "2170";
				break;
			case 'Involuntary leaver (Light countries)':
				returnval = "2199";
				break;
			case 'End of Fixed Term Contract (Light countries)':
				returnval = "2200";
				break;
			case 'Resignation (Light countries)':
				returnval = "2240";
				break;
			case 'Other request (EE) (Light countries)':
				returnval = "2316";
				break;
			case 'LOA Paid (Light countries)':
				returnval = "2375";
				break;
			case 'LOA Unpaid (Light countries)':
				returnval = "2376";
				break;
			case 'Return Leave of Absence (Light countries)':
				returnval = "2021";
				break;
			case 'Retirement (Light countries)':
				returnval = "2143";
				break;
			case 'Resignation withdrawn (Light countries)':
				returnval = "2374";
				break;
		}
	}
	
	return returnval;
};
/*************************
 * ACTIONS ON LOAD COMPLETE
 **************************/
manageSection();
