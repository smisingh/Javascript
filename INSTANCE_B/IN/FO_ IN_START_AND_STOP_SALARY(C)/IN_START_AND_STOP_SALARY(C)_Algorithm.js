/***************
* DISABLE FIELDS
****************/
window.disableTextField = function(field){
	if(document.getElementById("champsobligatoiresproprietes")){
	//BackOffice
		field.setAttribute("readonly","true");
		field.onmousedown = function(){return false;};
	}else{
	//FrontOffice
		field.setAttribute("readonly","true");
		field.onkeydown = function(){return false;};
		field.onmousedown = function(){return false;};
	}
};

window.disableBooleanField = function(field){
	field.onclick = function(){return false;};
	disableTextField(field);
};

window.disableDateField = function(field){
	if(document.getElementById("champsobligatoiresproprietes")){
	//BackOffice
		//hide calendar icon
		field.style.background = "none";
	}else{
	//FrontOffice
		//hide calendar icon
		if(field.parentNode.getElementsByTagName("img").length > 0){
			field.parentNode.getElementsByTagName("img")[0].style.display = "none";
		}
	}
	disableTextField(field);
};

window.disableFileField = function(field){
	if(document.getElementById("champsobligatoiresproprietes")){
	//BackOffice
		field.parentNode.parentNode.style.border = "none";
		//hide button browse file
		field.parentNode.style.display = "none";
		//hide button delete file
		if(field.parentNode.parentNode.getElementsByClassName("btn-delete").length > 0){
			field.parentNode.parentNode.getElementsByClassName("btn-delete")[0].style.display = "none";
		}
	}else{
	//FrontOffice
		field.parentNode.getElementsByClassName("fileinput-button")[0].style.display = "none";
	}
};

window.disableListField = function(field){
	if(document.getElementById("champsobligatoiresproprietes")){
	//BackOffice
		field.parentNode.style.border = "none";
	}
	disableTextField(field);
};

window.disableTextareaField = function(field){
	disableTextField(field);
};

window.disableField = function(field){
	var msg = "function disableField : ";
	if(field){
		field = field.elementHTML;
		if(field.type == "checkbox"){
		//Boolean custom fields
			disableBooleanField(field);
		}else if(field.className.search("hasDatepicker") != -1){
		//Date custom fields
			disableDateField(field);
		}else if(field.id.search("_display") != -1){
		//File custom fields
			disableFileField(field);
		}else if(field.tagName == "SELECT"){
		//List custom fields
			disableListField(field);
		}else if(field.tagName == "TEXTAREA"){
		//Textarea custom fields
			disableTextareaField(field);
		}else{
		//Text custom fields
			disableTextField(field);
		}
	}else{
		msg += "field undefined or readonly";
		console.log(msg);
	}
};
