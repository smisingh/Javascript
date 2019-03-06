// JavaScript Document
/************** IN_ADVANCED_GR_EMPLOYEE(R) *************
*****************************************
Version - MOD-001
Author - Md Shahbaz Khan	
Creation Date - 22/09/2017
Description - Hiding Concerned Employee Details Section for all pages
              other than manager pages.
******************************************************************/
/**************
 * Hide Sections
 ***************/
//Technical section
//neocase.form.section("section484c8440f8f43fa8cfd5").hide();
document.getElementById("section484c8440f8f43fa8cfd5").style.display = "none";

window.getParamFromUrl = function (param) {

    var vars = {};
    window.location.href.replace(location.hash, '').replace(
        /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
        function (m, key, value) { // callback
            vars[key] = value !== undefined ? value : '';
        }
    );

    if (param) {
        return vars[param] ? vars[param] : null;
    }
    return vars;

};

//Function Added as a part of MOD-003
//Manage Visiblity of Concerned Employee Section
window.manageSection_EmployeeDetails = function () {

    //Hide When employee tries to create a request for itself.
    //Show when employee tries to create a request on behalf of someone.

    var pageId = getParamFromUrl('PageId');

    if (pageId != '1030' && pageId != '1029') {
        document.getElementById("section4e25f07eee4a6db8125d").style.display = "none";
        //Hide Technical section
        //neocase.form.section("section4e25f07eee4a6db8125d").hide();
        //
    }
};

/***************************
 ACTIONS ON LOAD COMPLETE
**************************/
window.onloadForm = function () {
    //Manage Visiblity of Concerned Employee Section
    manageSection_EmployeeDetails(); // MOD-002++ 

};
//neocase.form.event.bind('loadcomplete', onloadForm);
//manageSection_EmployeeDetails();

$(document).ready(function () {
    onloadForm();
    manageSection_EmployeeDetails();
});
