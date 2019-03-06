/**************		FR_MASS_UPLOAD(C) - FO Technical Fields	*************
******************************************************************
Developer   - Surajit Dalal
Date	    - 
Change No   - 
Description - 
******************************************************************

*******************************************************************/

/**************
* Hide Sections
***************/
neocase.form.section("section3fe9dd8b37b7178894a5").hide();

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



/*************************
 * ACTIONS ON LOAD COMPLETE
 **************************/
window.onloadForm = function() {
	
	//Populate subtopic in dropdown from URL
	manageSubtopic();
	
	var gettingval = neocase.form.field('INTERVENTIONS_EN_COURS$ELEMENT').getText();
	neocase.form.field('INTERVENTIONS_EN_COURS_VALEUR204').setValue(gettingval);
	
	console.log(gettingval);
};

neocase.form.event.bind('loadcomplete', onloadForm);
