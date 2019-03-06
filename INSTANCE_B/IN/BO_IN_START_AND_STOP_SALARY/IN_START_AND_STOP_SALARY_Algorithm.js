// JavaScript Document
//	FS_EDC - Algorithm - BO
/*************************************
Developer   - SURAJIT DALAL
Date	    - 26/05/2017
Change No   - MOD-01
Description - Initial Create
**************************************/

/**************************
EN: ARRAY TO STORE SECTION CODE MAPPED WITH SUBTOPIC
------------------------------------------------
FR: CODE DE SECTION CARTOGRAPHIQUE AVEC SUBTOPIC
***************************/
var arrSubtopic = { //Management team 
					'2366': [ 
								'section5ccba6601b43ce2ab1d5' //Stop Payment								
							],
					//Contract change 
					'2369' : [
								'section8b28abeeca0f12254b1f' //Start Payment								
							 ]
					};



/**************************
Fields and display settings
***************************/

window.hideAllSection = function(){

neocase.form.section('section5ccba6601b43ce2ab1d5').hide(); //Stop Payment
neocase.form.section('section8b28abeeca0f12254b1f').hide(); //Start Payment
neocase.form.section('section851bc05cf8d0dd0e7487').hide(); //Error Message
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
var selectedSubtopic = neocase.form.field("ELEMENTS").getValue();
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
