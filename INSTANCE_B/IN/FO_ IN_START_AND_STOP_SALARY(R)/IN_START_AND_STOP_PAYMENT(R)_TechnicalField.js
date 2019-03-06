// JavaScript Document
//	IN_Start_Stop_Payment - FO - (R)
/*************************************
Developer   - Md Shahbaz Khan
Date	    - 24/11/2017 
Change No   - MOD-01
Description - Initial Create
**************************************/

/**************************
EN: ARRAY TO STORE SECTION CODE MAPPED WITH SUBTOPIC
------------------------------------------------
FR: CODE DE SECTION CARTOGRAPHIQUE AVEC SUBTOPIC
***************************/

//Hide Technical section
document.getElementById("section484c8440f8f43fa8cfd5").style.display = "none";

var arrSubtopic = { //Management team 
					'IN_Stop Payment': [ 
								'section628b7a6fa3969555524e' //Stop Payment								
							],
					//Contract change 
					'IN_Start Payment': [
								'sectionf1cf60fc41419e41f96f' //Start Payment								
							 ]
					};



/**************************
Fields and display settings
***************************/

window.hideAllSection = function(){

neocase.form.section('section628b7a6fa3969555524e').hide(); //Stop Payment
neocase.form.section('sectionf1cf60fc41419e41f96f').hide(); //Start Payment
neocase.form.section('section484c8440f8f43fa8cfd5').hide(); //Technical Section

};

/**************************
EN: MANAGES VISIBLITY OF SECTIONs BASED ON SUBTOPIC
------------------------------------------------
FR: GÉRER LA VISIBLITÉ DES SECTIONS BASÉES SUR SUBTOPIC
***************************/
window.manageSections = function(){

//Hiding all the sections first
hideAllSection();
//Fetching subtopic which is currently selected
var subtopicDiv = neocase.form.field("divFieldINTERVENTIONS_EN_COURS_ELEMENT").elementHTML;
var selectedSubtopic = $(subtopicDiv).children().eq(0).html();

//Fetching List of sections to be shown for selected subtopic
var sectionsToShow = arrSubtopic[selectedSubtopic];

if(sectionsToShow !== undefined)
{   
	var sectionsCount = sectionsToShow.length;
	for ( i = 0; i<sectionsCount;i++)
	{
		var sectionCode = sectionsToShow[i];
		neocase.form.section(sectionCode).show();		
		
	}	
	
}

};


/**************************
IMPLEMENTATION DE FONCTIONS
***************************/
//fonctions d'affichage des messages dans la console si elle est ouverte
window.msg = function(MESSAGE){
	if(console){
		console.log(MESSAGE);
	}
};


/**************************************************************************************
APPEL DES FONCTIONS GERANT L'AFFICHAGE DES CHAMPS UNE FOIS QUE LE FORMULAIRE EST CHARGE
***************************************************************************************/
ThisForm.Bind('loadcomplete', manageSections);

manageSections();
