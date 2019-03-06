// Workaround 14.2.6 PCO 07/04/2017
if(formulaire.INTERVENTIONS_EN_COURS$VALEUR93.selectedIndex === 0)
{
	formulaire.INTERVENTIONS_EN_COURS$VALEUR201.value = 'CV93-VoluntaryChange';
}
else
{
	formulaire.INTERVENTIONS_EN_COURS$VALEUR201.value = 'CV93-InVoluntaryChange';
}
