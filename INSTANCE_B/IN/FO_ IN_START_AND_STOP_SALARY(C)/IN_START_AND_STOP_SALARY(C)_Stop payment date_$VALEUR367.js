	var dateElement = neocase.form.field("INTERVENTIONS_EN_COURS_VALEUR367").elementHTML;
	$(dateElement).parent().find('span#wrongDate').remove();
	var dateSelected = "";

dateSelected = dateElement.value;
if( dateSelected != "" )
{
	var day = dateSelected.split("/");
	
	if(day[1] != "01" && day[1]!= "1")
	{	
	$(dateElement).parent().append("<span id='wrongDate' style='color:red;'>Date must be 1st day of a month - eg-> (12/1/2017)</span>");
	$(".submitSimpleRequestButton").eq(0).attr("disabled", "disabled");
	}
	else
	{
		if(day[1] == "01" || day[1]== "1")
		{
			$(".submitSimpleRequestButton").eq(0).removeAttr('disabled');
		}
	}
}
