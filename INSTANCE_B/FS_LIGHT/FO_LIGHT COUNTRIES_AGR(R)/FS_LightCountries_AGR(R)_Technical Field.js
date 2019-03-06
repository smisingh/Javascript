// JavaScript Document
/**************		FS_EDC Front Office (R) Technical Fields	*************
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
document.getElementById("sectiond468895ba7e076561ca9").style.display = "none";

/****************************
 * MANAGE SECTION
 *****************************/
window.hideAllSection = function() {

	neocase.form.section("section19a724421fa2bcf87255").hide(); //Effective date section
	neocase.form.section("section3ee5542f26a2def7f5bf").hide(); //Termination info
	neocase.form.section("section5da0b635bb7c2fa7da10").hide(); //Last working day section
	neocase.form.section("section9b742455774303306e72").hide();
	neocase.form.section("sectiona03e205dbc1585c07446").hide(); //Leave of absence details
	neocase.form.section("section3393ec064b2dcf13f2bf").hide(); //Return LOA
	neocase.form.section("section458").hide();
	neocase.form.section("section388").hide();
	neocase.form.section("section253").hide();
	neocase.form.section("section3ee5542f26a2def7f5bf").hide();
	neocase.form.section("section68c682c7983b6784dfdf").hide(); //Resignation info
	document.getElementById("section3ee5542f26a2def7f5bf").style.display = "none";
	document.getElementById("section68c682c7983b6784dfdf").style.display = "none";
	neocase.form.section("section978").hide();
	
};

window.manageSection = function() {
	
	hideAllSection();
	var topic = getTopicSubTopic("MOTCLE");
	var subtopic = getTopicSubTopic("ELEMENT");

	if(topic == "2237") {	//	Employment data change
		if(subtopic == "2169") {	//Management team FO
			neocase.form.section("section388").show();
		}
		if(subtopic == "2170") {	//Probation Period update
			neocase.form.section("section458").show();
		}
	}

	if(topic == "2239") {	//	Leave involuntary FO
		neocase.form.section("section3ee5542f26a2def7f5bf").show();	//Termination info section
		neocase.form.section("section5da0b635bb7c2fa7da10").show();//Last working day section
		if(subtopic == "2200") {	//End of Fixed Term Contract
			neocase.form.section("section253").show();	//Fixed Term Contract section 
			
		}
	}
  
if(topic == "2241") {	//Start LOA
		neocase.form.section("sectiona03e205dbc1585c07446").show();//Start LOA section
    }
    
if(topic == "2243") {	//Return LOA
		neocase.form.section("section3393ec064b2dcf13f2bf").show();//Return LOA section
    }

	if(topic == "2240") {	//	Resignation
		neocase.form.section("section68c682c7983b6784dfdf").show();	//Resignation info section
		neocase.form.section("section5da0b635bb7c2fa7da10").show();//Last working day section
  }
};

window.getTopicSubTopic = function(typeEle) {
	var storeString;
	var returnval = " ";
	var possibleElements = $('[id*="'+ typeEle +'"]');
	for(var i=0; i< possibleElements.length; ++i){
		if(possibleElements[i].localName === "span") {
			storeString = possibleElements[i].innerHTML;
			storeString = storeString.trim();
			storeString = storeString.toLowerCase();
		}
	}
	if(typeEle === "MOTCLE"){	// Topic
		switch(storeString) {
			case 'mass upload (light countries)':
				returnval = "2209";
				break;
			case 'employment data change (light countries)':
				returnval = "2237";
				break;
			case 'leave involuntary (light countries)':
				returnval = "2239";
				break;
			case 'resignation (light countries)':
				returnval = "2240";
				break;
			case 'general request':
				returnval = "2244";
				break;
			case 'start a leave of absence (light countries)':
				returnval = "2241";
				break;
			case 'return leave of absence (light countries)':
				returnval = "2243";
				break;
		}
	}
	if(typeEle === "ELEMENT"){	// Subtopic
		switch(storeString) {
			case 'supervisor / reviewer':
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
			case 'involuntary leave (light countries)':
				returnval = "2199";
				break;
			case 'end of fixed term contract (light countries)':
				returnval = "2200";
				break;
			case 'resignation (light countries)':
				returnval = "2240";
				break;
			case 'other request (ee)':
				returnval = "2316";
				break;
		}
	}
	
	return returnval;
};
/*************************
 * ACTIONS ON LOAD COMPLETE
 **************************/
manageSection();
