function buildMetadata(sample) {
  d3.csv("data.csv").then(function(data) {
    var resultArray = data.filter(sampleObj => sampleObj.state_name === sample);
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");

    var totalpopulation = 0;
    var rental = 0;

    resultArray.forEach(function(d) {
    totalpopulation = totalpopulation + d.tot_population_cen_2010; 
    rental = rental + d.renter_occp_hu_cen_2010;
    });
    PANEL.append("h6").text('Population: ' + `${totalpopulation}`);
    PANEL.append("h6").text(`Number Rented: ` + `${rental}`);
  });
}


function visualize(sample) {
 d3.csv("data.csv").then(function(data) {
  
var resultArray = data.filter(sampleObj => sampleObj.state_name === sample);
  console.log(resultArray.length);
    var state = resultArray.map(data => data.state_name);
    console.log(state);
    var score = resultArray.map(data => data.site_score);
    var health = resultArray.map(data => data.pct_no_health_ins_acs_09_13);
    var POC =  resultArray.map(data => data.pct_poc);
    var income = resultArray.map(data => data.med_hhd_inc_bg_acs_09_13);
    
var trace1 = [{
   
  x: score,
  y: health,
  mode: "markers",
  type: "scatter"
}];

var layout1 = {
  title: "Score vs Health"
};

Plotly.newPlot("bar", trace1, layout1);

var trace2 = [{
   
  x: score,
  y: POC,
  mode: "markers",
  type: "scatter",
}];

var layout2 = {
  title: "Score vs POC"
};

Plotly.newPlot("bar2", trace2, layout2);

var trace3 = [{
   
  x: score,
  y: income,
  mode: "markers",
  type: "scatter",
}];

var layout3 = {
  title: "Score vs Income"
};


Plotly.newPlot("bar3", trace3, layout3);
  });
}

function init() {
  var selector = d3.select("#selDataset");

  d3.csv("states.csv").then(function(data) {

    var state = data.map(data => data.state_name);

    state.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    var firstSample = selector.property("value");
    visualize(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  visualize(newSample);
  buildMetadata(newSample);
}

init();
