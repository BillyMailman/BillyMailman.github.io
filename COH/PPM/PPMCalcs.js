function doPPMCalcs(){
  var type = $('#type-input').val();
  if(type !== 'Click'){
    $('#output-field').val('Non-Click Powers are not supported!');
    return;
  }
  var selectedPPMRate = 0;
  var selectedProcs = $('#proc-container input:checked').not(':disabled');
  selectedProcs.each(function(){
    if(selectedPPMRate === 0 || this.value < selectedPPMRate){
      selectedPPMRate = this.value;
    }
  });
  if(selectedPPMRate === 0){
    $('#output-field').val('No Proc Selected!');
    return;
  }
  var rechargeTime = +($('#recharge-time-input').val());
  var animTime = +($('#animation-time-input').val());
  var castTime = +($('#cast-time-input').val());
  var arcanaTime = Math.max(animTime, castTime);
  arcanaTime = (Math.ceil(arcanaTime / 0.132)+1)*0.132
  var areaMod = 1; //TODO!
  var currentChance = selectedPPMRate * (rechargeTime + castTime) / (60 * areaMod);
  var minChance = 0.05 + 0.015 * selectedPPMRate;
  currentChance = Math.max(minChance, Math.min(0.9, currentChance));
  var maxChanceTime = 0.9 * 60 * areaMod / selectedPPMRate;
  var maxChanceRechargeTime = maxChanceTime - castTime; //TODO: Is this just castTime? Arcana?
  outputString = "Unenhanced chance: " + (100 * currentChance) + "%";
  outputString += "\nRecharge time for max chance (90%): " + maxChanceRechargeTime + " seconds.";
  if(maxChanceRechargeTime > rechargeTime){
    outputString += " This is impossible! (would require negative recharge enhancement)";
  } else {
    var increaseRatio = rechargeTime / maxChanceRechargeTime;
    var enhancementAmount = increaseRatio - 1;
    if(enhancementAmount > 4){
      outputString += " This is impossible! (would require more enhancement than the hard cap)";
    } else{
      outputString += " This allows up to " + (100 * enhancementAmount) + "% +Recharge enhancement.";
    }
  }

  $('#output-field').val(outputString);
}
