     
    function init() {

        d3.json('samples.json').then(function(data) {
            var names = data.names;
            var sample = data.samples;
            console.log(sample);
            
            var select = document.getElementById("selDataset");
      
        for(var i = 0; i < names.length; i++) {
          var opt = names[i];
          var el = document.createElement("option");
          el.textContent = opt;
          el.value = opt;
          select.appendChild(el);
        };
      });
    };
 
    
    function optionChanged(xyz) {

    d3.json('samples.json').then(function(data) {
    var sample = data.samples;
    var demo = data.metadata; 

    var filteredData_chart = sample.filter(name => name.id === xyz);
    var filteredData_table = demo.filter(name => name.id === parseInt(xyz));
    
    console.log(filteredData_table);
    console.log(filteredData_chart);

    // update table

    filteredData_table.forEach(function(xyz) {
    
      demo_info = d3.select("#sample-metadata");
      demo_info.html("");     
      
      Object.entries(xyz).forEach(function([key, value]) {
      console.log(key, value);
      var row = demo_info.append("p");
      row.text(`${key}: ${value}`);
      });
    });

    // build bar and bubble chart 

    var svs = filteredData_chart[0].sample_values;
    var ids = filteredData_chart[0].otu_ids;
    var labels = filteredData_chart[0].otu_labels;

    var svs_ten = svs.slice(0,10);
    var ids_ten = ids.slice(0,10);
    var labels_ten = labels.slice(0,10);

    var string_ids = ids_ten.map(String); // add foreach statement

    string_ids = string_ids.map(i => 'OTU ' + i);
    
  // build bar chart

    var trace1 = {
        x: svs_ten,
        y: string_ids,
        type: "bar",
        hovertext: labels_ten,
        orientation: 'h'
  };
    var data = [trace1];
    Plotly.newPlot("bar", data);

// build bubble chart
  var trace2 = {
    x: ids,
    y: svs,
    text: labels,
    mode: 'markers',
    marker: {
      size: svs,
      color: ids
    }
  };
  var data2 = [trace2];
  var layout = {xaxis: {title: "OTU ID"}};
  Plotly.newPlot('bubble', data2, layout);
  });

};


init();


