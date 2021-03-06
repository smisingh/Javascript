/*************FR_AGR_PAYROLL(C) - FRONT END - Technical Field Code*************/
/*--------------------------------------------------------------------------
Developer   - Riya Dutta
Date	    - 02/07/2019 (MM/DD/YYYY)
Change No   - MOD-001
Description - JS started 1st time for this form
			  -Calculates 'Monthly refund amount' Fields for 2 sections
			  -Disable 'Monthly refund amount' Field for 2 sections
			  -Hide Technical Section
			  -Hide Hidden Section
----------------------------------------------------------------------------*/ 
/*--------------------------------------------------------------------------
Developer   - Smita Singh
Date	    - 02/15/2019 (MM/DD/YYYY)
Change No   - MOD-002
Description - JS started 1st time for this form
			- Manage topic and subtopic based on URL
			- Added timer for subtopic MOD-002.1
		
----------------------------------------------------------------------------*/ 
/*--------------------------------------------------------------------------
Developer   - Riya Dutta
Date	    - 03/05/2019 (MM/DD/YYYY)
Change No   - MOD-003
Description - Corrected calculation for France language too
----------------------------------------------------------------------------*/ 

//Hide Technical Section
neocase.form.section("section17d9e1e3613d919575f8").hide();
//Hide Hidden Section
//neocase.form.section("sectionfbdcfa0715d768bb875a").hide();

/*-------------------------- For FR_02_Province -----------------STARTS------------*/
window.calculate_monthlyRefndAmnt = function() {

	var subscripFreqncy = neocase.form.field("INTERVENTIONS_EN_COURS_VALEUR905");
	var totPaidAmnt = neocase.form.field("INTERVENTIONS_EN_COURS_VALEUR390");
	var monthlyRefndAmnt = neocase.form.field("INTERVENTIONS_EN_COURS_VALEUR909");
		
	if(monthlyRefndAmnt) {
		if (subscripFreqncy){
			if (totPaidAmnt){
			
			var val_subscripFreqncy=subscripFreqncy.getText();
			var val_totPaidAmnt=parseFloat(totPaidAmnt.getValue());
			
			if (isNaN(val_totPaidAmnt)) 
				{
				val_totPaidAmnt =0; 
				}
	
			if (val_subscripFreqncy == "Yearly" || val_subscripFreqncy == "Annuel") //MOD-003++
				{
				monthlyRefndAmnt.setValue((val_totPaidAmnt/24).toFixed(2));
				}
			else if(val_subscripFreqncy == "Monthly / Weekly" || val_subscripFreqncy == "Mensuel / Hebdomadaire")  //MOD-003++
				{
				monthlyRefndAmnt.setValue((val_totPaidAmnt/2).toFixed(2));
				}
			else{
				monthlyRefndAmnt.setValue("");
				}
			
			}
		}
	}
						
						
};
/*-------------------------- For FR_02_Province --------------ENDS---------------*/

/*--------------------- For FR_03_Bicycle allowance ---------------STARTS----------*/
window.calculate_monthlyRefndAmntByCycl = function() {

	var km_Mileage = neocase.form.field("INTERVENTIONS_EN_COURS_VALEUR908");
	var startDate = neocase.form.field("INTERVENTIONS_EN_COURS_VALEUR5");
	var endDate = neocase.form.field("INTERVENTIONS_EN_COURS_VALEUR261");
	var monthlyRefndAmnt_ByCycl = neocase.form.field("INTERVENTIONS_EN_COURS_VALEUR910");
	
	var val_monthlyRefndAmnt_ByCycl=monthlyRefndAmnt_ByCycl.getValue();
	var val_endDate=endDate.getDate();
	var val_startDate=startDate.getDate();
	var val_km_Mileage=parseFloat(km_Mileage.getValue());
	
	var calculation;
	var monthDiff;
	var monthMin;	
	var maxLimit;
	
	if(monthlyRefndAmnt_ByCycl) {
		if (endDate){
			if (startDate){
				if (km_Mileage){
								
				 calculation=0;
				 monthDiff=0;
				 monthMin=0;
				 maxLimit=16.67;
							
				if (isNaN(val_km_Mileage)) 
				{
				val_km_Mileage =0; 
				}
				
				var begMonth;
				var endMonth;
				if(val_startDate){
				begMonth=val_startDate.getMonth();
				}
				if(val_endDate){
				endMonth=val_endDate.getMonth();
				}
				if(val_startDate){
				begYear=val_startDate.getFullYear();
				}
				if(val_endDate){
				endYear=val_endDate.getFullYear();
				}
				if(endMonth && begMonth && endYear && begYear){
				monthDiff= endMonth - begMonth + (12 * (endYear - begYear));
				monthDiff=monthDiff+1;
				}
				
				
				if (monthDiff !== 0) {
					monthMin=Math.min(val_km_Mileage,800);
					calculation=((monthMin*0.25)/monthDiff).toFixed(2);
					//monthlyRefndAmnt_ByCycl.setValue(calculation);					
					
					if(calculation>maxLimit){
					monthlyRefndAmnt_ByCycl.setValue(maxLimit);
					}else{
					monthlyRefndAmnt_ByCycl.setValue(calculation);
					
					}
					
				}else
				{
					monthlyRefndAmnt_ByCycl.setValue("");
				}
				
				}
			}
		}
	}
	
				
};
/*--------------------- For FR_03_Bicycle allowance ---------------ENDS----------*/

window.disableFields = function(){

	disableField(neocase.form.field("INTERVENTIONS_EN_COURS$VALEUR909"));
	disableField(neocase.form.field("INTERVENTIONS_EN_COURS$VALEUR910"));
}; 


/**************************************************
* Set a timer to check topic after every 1 sec
**************************************************/
//var topicTimer;
 window.loadTopic = function(){
 console.log("topic is " + neocase.form.field("INTERVENTIONS_EN_COURS$MOTCLE").getValue());
 if(neocase.form.field("INTERVENTIONS_EN_COURS$MOTCLE").getValue() && neocase.form.field("INTERVENTIONS_EN_COURS$MOTCLE").getValue() !== null ){
		updateAndDisableField(neocase.form.field("INTERVENTIONS_EN_COURS$MOTCLE"),getParamFromUrl('topic')); // ++MOD-003++
		//clearInterval(topicTimer);
	}
};
/*********************************
* Set the subtopic from URL
*********************************/

 window.loadSubtopic = function(){
	console.log("Hello");
	if(neocase.form.field("INTERVENTIONS_EN_COURS$MOTCLE").getValue() && neocase.form.field("INTERVENTIONS_EN_COURS$MOTCLE").getValue() !== null ){
		if(neocase.form.field("INTERVENTIONS_EN_COURS$ELEMENT").getValue() && neocase.form.field("INTERVENTIONS_EN_COURS$ELEMENT").getValue() !== null ){ //MOD-002.1
		updateAndDisableField(neocase.form.field("INTERVENTIONS_EN_COURS$ELEMENT"),getParamFromUrl('subtopic')); // ++MOD-003++
		//clearInterval(topicTimer1); //MOD-002.1
		console.log("subtopic is " +neocase.form.field("INTERVENTIONS_EN_COURS$ELEMENT").getValue());
		}
	}
};
	
//Calling the function using 1000 msec timer	
//topicTimer = setInterval(loadTopic, 1000);


window.onloadForm = function () {
    mandatoryList();
    enableManageField = true;
    manageFields("ouverture");
	disableFields();
	//Calling the function using 1000 msec timer	
	//topicTimer = setInterval(loadTopic, 1000);
	//topicTimer = 
	setTimeout(function(){
		loadTopic();
	}, 500);

	//Calling the function using 1000 msec timer	
	//topicTimer1 = 
	setTimeout(function(){
		loadSubtopic();
	}, 1000); //MOD-002.1
	
};
neocase.form.event.bind('init', onloadForm);
