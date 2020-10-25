function loadEnhancements(){
  $.getJSON('PPM/ProcEnhancementList.json', function(data){
    console.log(data);
    var procContainer = $('#proc-container');
    data.forEach((type, i) => {
      var setName = type.name;
      var setId = setName.replace(' ', '_');
      var procs = type.procs;
      var setParagraph = $('<p></p>');
      setParagraph.append(setName);
      setParagraph.append(': ');
      setParagraph.append($('<br>'))
      procs.forEach((proc, i) => {
        var procName = proc.name;
        var procId = procName.replace(' ', '_');
        var rate = proc.rate;
        var checkbox = $('<input type="checkbox"></input>');
        checkbox.prop('id', procId);
        checkbox.prop('name', procId);
        checkbox.prop('value', rate);
        setParagraph.append(checkbox);
        var label = $('<label></label>');
        label.prop('for', procId);
        label.text(procName);
        setParagraph.append(label);
        setParagraph.append($('<br>'))
      });
      procContainer.append(setParagraph);
    });
  });
  resetEnhancementSelections();
}
$(document).ready(loadEnhancements);
