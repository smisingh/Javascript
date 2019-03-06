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
//ThisForm.HideSection("section425");
//neocase.form.section("section425").hide();
document.getElementById("section425").style.display = "none";


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
			case 'mass upload':
				returnval = "2209";
				break;
			case 'employment data change':
				returnval = "2237";
				break;
			case 'leave involuntary':
				returnval = "2239";
				break;
			case 'leave voluntary':
				returnval = "2240";
				break;
			case 'general request':
				returnval = "2244";
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
			case 'management team':
				returnval = "2169";
				break;
			case 'probation period update':
				returnval = "2170";
				break;
			case 'involuntary leave':
				returnval = "2199";
				break;
			case 'end of fixed term contract - mgr':
				returnval = "2200";
				break;
			case 'end of fixed term contract - ee':
				returnval = "2142";
				break;
			case 'retirement':
				returnval = "2143";
				break;
			case 'voluntary leave':
				returnval = "2240";
				break;
			case 'other request (ee)':
				returnval = "2316";
				break;
		}
	}
	
	return returnval;
};

/****************************
 * MANAGE SECTION
 *****************************/
window.hideAllSection = function() {
	
	/*
	neocase.form.section("section458").hide();
	neocase.form.section("section388").hide();
	neocase.form.section("section253").hide();
	neocase.form.section("sectioncd695b1b2ae142f19256").hide();
	neocase.form.section("sectionc3c3157ec18b3b116bd8").hide();
	*/
	
	document.getElementById("section458").style.display = "none";
	document.getElementById("section388").style.display = "none";
	document.getElementById("section253").style.display = "none";
	document.getElementById("sectioncd695b1b2ae142f19256").style.display = "none";
	document.getElementById("sectionc3c3157ec18b3b116bd8").style.display = "none";
	
	
	console.log("hideAllSection");
	
};

window.manageSection = function() {
	
	console.log("as");
	
	hideAllSection();
	
	var topic = getTopicSubTopic("MOTCLE");
	var subtopic = getTopicSubTopic("ELEMENT");
	//var topic = neocase.form.field('INTERVENTIONS_EN_COURS$MOTCLE').getNumber();
	//var subtopic = neocase.form.field('INTERVENTIONS_EN_COURS$ELEMENT').getNumber();
	
	if(topic == "2209") {	//	Mass Upload
		if(subtopic == "2117") {	// Supervisor / reviewer
			
		}
		if(subtopic == "2223") {	//Personal data
			
		}
	}
	if(topic == "2237") {	//	Employment data change
		if(subtopic == "2169") {	//Management team FO
			//neocase.form.section("section388").show();
			document.getElementById("section388").style.display = "block";	
		}
		if(subtopic == "2170") {	//Probation Period update
			//neocase.form.section("section458").show();
			document.getElementById("section458").style.display = "block";	
		}
	}
	if(topic == "2239") {	//	Leave involuntary FO
		if(subtopic == "2199") {	//Involuntary leave
			//neocase.form.section("sectioncd695b1b2ae142f19256").show();	//Confirmed Leaving dates 
			document.getElementById("sectioncd695b1b2ae142f19256").style.display = "block";		//Confirmed Leaving dates 
		}
		if(subtopic == "2200") {	//End of Fixed Term Contract - MGR
			//neocase.form.section("section253").show();	//Fixed Term Contract 
			document.getElementById("section253").style.display = "block";
			//neocase.form.section("sectioncd695b1b2ae142f19256").show();	//Confirmed Leaving dates 
			document.getElementById("sectioncd695b1b2ae142f19256").style.display = "block";		//Confirmed Leaving dates 
			
		}
	}
	if(topic == "2240") {	//	Leave voluntary FO
		if(subtopic == "2142") {	//End of Fixed Term Contract - EE
			//neocase.form.section("section253").show();
			document.getElementById("section253").style.display = "block";
			
			//neocase.form.section("sectioncd695b1b2ae142f19256").show();	//Confirmed Leaving dates 
			document.getElementById("sectioncd695b1b2ae142f19256").style.display = "block";		//Confirmed Leaving dates 
			
			//neocase.form.section("sectionc3c3157ec18b3b116bd8").show();		//Resignation info
			document.getElementById("sectionc3c3157ec18b3b116bd8").style.display = "block";		//Resignation info
		}
		if(subtopic == "2143") {	//Retirement
			document.getElementById("sectioncd695b1b2ae142f19256").style.display = "block";	//Confirmed Leaving dates 
			//neocase.form.section("sectioncd695b1b2ae142f19256").show();	//Confirmed Leaving dates 
		}
		if(subtopic == "2240") {	//	Voluntary leave
			//neocase.form.section("sectionc3c3157ec18b3b116bd8").show();		//Resignation info
			document.getElementById("sectionc3c3157ec18b3b116bd8").style.display = "block";		//Resignation info
			
			document.getElementById("sectioncd695b1b2ae142f19256").style.display = "block";	//Confirmed Leaving dates 
			//neocase.form.section("sectioncd695b1b2ae142f19256").show();	//Confirmed Leaving dates 
		}
	}
	if(topic == "2244") {	//	General request
		if(subtopic == "2316") {	//Other request (EE)
			
		}
	}
	
	
	console.log("manageSection");
};


/*************************
 * ACTIONS ON LOAD COMPLETE
 **************************/
manageSection();
