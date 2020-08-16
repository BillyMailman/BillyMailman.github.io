var resetAoEDisabling = function(){
  var checkboxState = $('#AoE').is(':checked');
  $('#range').prop("disabled", !checkboxState);
  $('#arc').prop("disabled", !checkboxState);
};
var recalculateResult = function(){
  var PPM = parseInt($('#PPM').val(), 0);
  var baseRecharge = parseInt($('#base-recharge').val(), 0);
  var enhancement = parseInt($('#enhancement').val(), 0);
  if(isNaN(PPM) || isNaN(baseRecharge) || isNaN(enhancement)){
    $('#result').val("");
    return;
  }
  if(PPM === 0){
    $('#result').val("");
    return;
  }
  var enhancedRecharge = (baseRecharge * 100) / (100 + enhancement);
  var expectedProcTime = 60 / PPM;
  var stProcRate = enhancedRecharge / expectedProcTime;
  var areaFactor = 1;
  if($('#AoE').is(':checked')){
    var range = parseInt($('#range').val());
    var arc = parseInt($('#arc').val());
    if(isNaN(range) || isNaN(arc)){
      $('#result').val("");
      return;
    }
    areaFactor = 1 + (range + (11 * (arc + 540)) / 30000);
  }
  var naiveProcRate = stProcRate / (0.25 + (0.75 * areaFactor));
  var minProcRate = 0.05 + (0.015 * PPM);
  var maxProcRate = 0.9;
  var realProcRate = Math.min(maxProcRate, Math.max(minProcRate, naiveProcRate));
  $('#result').val(realProcRate);
};
$('document').ready(function(){
  $('input').change(recalculateResult);
  $('#AoE').change(resetAoEDisabling);
});
