

 /******************************
* LAUNCH DEPENDENCIES
****************************/

window.launchDependencies = function(field){
	if("createEvent" in document){
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent("change",false,true);
		field.elementHTML.dispatchEvent(evt);
	}else{
		field.elementHTML.fireEvent("onchange");
	}

};
 
window.onLoad = function(){
/***************************CODE FOR JS TO SET TOPIC ****************************************/
neocase.form.field("INTERVENTIONS_EN_COURS$MOTCLE").setValue("2297");

setTimeout(launchDependencies(neocase.form.field("INTERVENTIONS_EN_COURS$MOTCLE")),1000);

//console.log("set topic for loadcomplete event");
};
neocase.form.event.bind("init", onLoad);



