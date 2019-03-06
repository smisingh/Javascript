//FR - Mas Upload(M)
/*************************************
	V 1.0 - Initial Version
*************************************
*************************************
Developer   - Smita Singh
Date	    - 16/06/2017
Change No   - MOD-002
Description - updated the subtopic in all front office form
**************************************
*/


/**************
* Hide Sections
***************/
//Technical section
ThisForm.HideSection("section995");

/***************************
 ACTIONS ON LOAD COMPLETE
**************************/
window.onloadForm = function(){
		formulaire.question.readOnly = "true"; 

};
ThisForm.Bind('loadcomplete', onloadForm);
