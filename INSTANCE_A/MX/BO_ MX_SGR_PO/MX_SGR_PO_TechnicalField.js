
/* --- MX_SGR_PO(BO)Technical Fields --- */
/*--------------------------------------------------------------------------
Developer   - Smita Singh
Date	    - 06/27/2018 (MM/DD/YYYY)
Change No   - MOD-001
Description - Hide Technical Section
			
----------------------------------------------------------------------------
Developer   - Smita Singh
Date	    - 07/02/2018 (MM/DD/YYYY)
Change No   - MOD-002
Description - Popup and fill up on legal entity
			- Disable legal entity field
----------------------------------------------------------------------------*/ 
//hide technical section
neocase.form.section("sectionee35a09cd97ac7d74457").hide();

/******************************************
* CREATE HYPERLINK ON LABEL TO OPEN A POPUP
*******************************************/
window.popupLink = function(field, url) {
    var msg = "function popupLink : ";
    if (field) {
        //get field label
        var fieldId = field.id;
        var fieldLabel;
        if (fieldId.search("INTERVENTIONS") != -1) {
            fieldLabel = fieldId.replace("INTERVENTIONS", "lblINTERVENTIONS");
        } else if (fieldId.search("UTILISATEURS") != -1) {
            fieldLabel = fieldId.replace("UTILISATEURS", "lblUTILISATEURS");
        } else {
            msg += "type de champ non pris en compte " + fieldId;
            console.log(msg);
        }
        if (fieldLabel.search("_display") != -1) {
            fieldLabel = fieldLabel.replace("_display", "");
        }
        //add case number in the URL if needed
        if (url.search("Id_Demande") != -1) {
            //url = url.replace("Id_Demande=","Id_Demande="+RequestContext.RequestNumber);
            url = url.replace("Id_Demande=", "Id_Demande=" + RequestContext.ContactId);
        }
        //add contact ID in the URL if needed
        if (url.search("Id_User") != -1) {
            url = url.replace("Id_User=", "Id_User=" + RequestContext.ContactId);
        }
        //Create hyperlink on label
        var onclick = "window.open('" + url + "','_blank')";
        var createPopup = document.createElement("a");
        createPopup.setAttribute("onclick", onclick);
        var popupText;
        if (document.getElementById(fieldLabel)) {
            popupText = document.getElementById(fieldLabel).innerHTML;
            var t = document.createTextNode(popupText);
            createPopup.appendChild(t);
            if (document.getElementById(fieldLabel).innerHTML.search("</a>") == -1) {
                document.getElementById(fieldLabel).innerHTML = "";
                document.getElementById(fieldLabel).appendChild(createPopup);
            }
        } else {
            msg += "label du champ non trouvé " + fieldId;
            console.log(msg);
        }
    } else {
        msg += "champ non trouvé";
        console.log(msg);
    }
};
/************************************************
* FUNCTIONS CALLED BY POPUP TO FILL CUSTOM FIELDS
*************************************************/
window.getASPid = function(fieldName){
	//Only on FrontOffice Side
	if(document.getElementsByClassName("bloc-content").length > 0){
		var label = document.getElementsByClassName("bloc-content")[0].getElementsByTagName("label");
		for(lbl=0; lbl<label.length; lbl++){
			
			//if we find an ASP.NET id we return the dynamic ID number
			if(label[lbl].id.search("_lbl") != -1){
				fieldName = label[lbl].id.split("lbl")[0]+fieldName;
				fieldName = fieldName.replace("$","_");
				return fieldName;
			}

		}
	}
	return fieldName;
};

/************************************************
* FUNCTIONS CALLED BY POPUP TO FILL CUSTOM FIELDS
*************************************************/
FillCf = function(fieldValue,fieldName){
    var msg = "function FillCf : ";

    //properly target field
    if(fieldName.search("VALEUR0") != -1){
        fieldName = fieldName.replace("VALEUR0","VALEUR");
    }
	fieldName = getASPid(fieldName);
    var field = neocase.form.field(fieldName);

    if(field){
		/*if(fieldValue == "Stagiaire" )
			{
				neocase.form.field('INTERVENTIONS_EN_COURS_VALEUR305').setValue("Stagiaire"); //Annual working time (new)"
				capgDisable(formulaire.INTERVENTIONS_EN_COURS_VALEUR305);

			} */
		field.setValue(fieldValue);
		
    }else{
        msg += "field "+fieldName+" not found";
        console.log(msg);
    }
};

//------------------------ Capgemini Developed Enable and Disable Code --------------------- //MOD-002
window.capgDisable = function(fieldGotByID) {
	$(fieldGotByID).parent().prepend("<div id=\"prependedid" + fieldGotByID.id + "\" style=\"width: 100%; height: 37px; position: absolute;cursor: no-drop;\"></div>");
};

/**************************
* Launch Javascript on init
***************************/
window.launchOnInit = function(){
	
	popupLink(formulaire.INTERVENTIONS_EN_COURS$VALEUR283,"/Custom_Referential/PersonalArea.aspx");
	capgDisable(formulaire.INTERVENTIONS_EN_COURS$VALEUR283); //MOD-002
};
neocase.form.event.bind("init",launchOnInit);
