// JavaScript Document
/************** IN_ADVANCED_GR_EMPLOYEE(M) *************
*****************************************
Version - MOD-001
Author - Itaï Rosilio
Date - 31/07/2017
Description - Put the question field read only
*******************************************************************
Version - MOD-002
Author - smita singh
Date - 21/09/2017
Description - To make the question field read only 
*******************************************************************
Version - MOD-003
Author - Md Shahbaz Khan	
Creation Date - 21/09/2017
Description - Hiding Concerned Employee Details Section for all pages
              other than manager pages.
******************************************************************
Version - MOD-003
Author - Smita Singh	
Creation Date - 27/09/2017
Description - Make the download option on modify form readOnly
********************************************************************
Version - MOD-004
Author - Riya Dutta	
Creation Date - 01/02/2019 (MM/DD/YYYY)
Description - Upgrading to New JS Framework (//need update)
********************************************************************/

/************************************
* Hide Technical Sections
************************************/
//ThisForm.HideSection("section616ee1dff413d0fdad43");  //MOD-004 --
neocase.form.section("section616ee1dff413d0fdad43").hide();  //MOD-004 ++

window.getParamFromUrl = function(param){

var vars = {};
  window.location.href.replace( location.hash, '' ).replace( 
    /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
    function( m, key, value ) { // callback
      vars[key] = value !== undefined ? value : '';
    }
  );

  if ( param ) {
    return vars[param] ? vars[param] : null;  
  }
  return vars;

};

//Function Added as a part of MOD-003
//Manage Visiblity of Concerned Employee Section
window.manageSection_EmployeeDetails = function(){

//Hide When employee tries to create a request for itself.
//Show when employee tries to create a request on behalf of someone.

var pageId = getParamFromUrl('PageId');

if(pageId != '1029'){

//Hide Technical section
neocase.form.section("sectionc6b9578fd7dce6ffb20f").hide();

}


};



/***************************************************************************
Manage download option on the HTML DOM and make it readonly for modify form
*****************************************************************************/

window.manageDownloadField = function(){

	var buttonId= document.getElementsByClassName("btn btn-upload fileinput-button")[0].childNodes[2].id;
		document.getElementById(buttonId).readOnly = true;
		console.log("The download button is not working");

};

/***************************
 ACTIONS ON LOAD COMPLETE
**************************/
window.onloadForm = function()
{

	//To make the Comment box as readOnly
	formulaire.question.readOnly = true; //MOD-002

	//Manage Visiblity of Concerned Employee Section
	manageSection_EmployeeDetails(); // MOD-003++ 

	//Manage download button in modify form
	manageDownloadField();
	
	};
neocase.form.event.bind('loadcomplete', onloadForm);

