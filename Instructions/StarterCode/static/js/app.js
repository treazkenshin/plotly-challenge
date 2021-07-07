//populate drop down menu
function dropdown(){
    var drop = d3.select("#selDataset")
    d3.json("samples.json").then((sampledata)=>{
        // console.log(sampledata);
        var names = sampledata.names;
        names.forEach((data)=>{
            drop.append("option")
            .text(data)
            .property("value",data);
        })
        var sample = names[0];
        metadata(sample);
        buildChart(sample);
    }
    )
  }
  dropdown();
  
  //build metadata using d3 library
  function metadata(sampleid){
    d3.json("samples.json").then((sampledata)=>{
        var metaData = sampledata.metadata;
        var dataArray = metaData.filter(row=>row.id==sampleid);
        console.log(dataArray);
        var mainData = dataArray[0];
        var demoDisplay = d3.select("#sample-metadata");
        demoDisplay.html("");
        Object.entries(mainData).forEach(([key,value])=>{
            demoDisplay.append("h6").text(`${key} ${value}`);
  
        })
  })
  }
  
  //Setup Dropdown menu click
  function optionChanged(newData){
    metadata(newData);
    buildChart(newData);
  }
  
  //Building Chart function using presribed labels and styling
  function buildChart(sampleid){
    d3.json("samples.json").then((sampledata)=>{
        var samples = sampledata.samples;
        var dataArray = samples.filter(row=>row.id==sampleid);
        console.log(dataArray);
        var sample = dataArray[0];
        var otu_ids = sample.otu_ids;
        var sample_values = sample.sample_values;
        var otu_labels = sample.otu_labels;
        var bubbledata = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        }];
        Plotly.newPlot("bubble", bubbledata);
        var bardata = [{
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).map(otu_ids=>`OTU${otu_ids}`).reverse(),
            text: otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        }];
        Plotly.newPlot("bar", bardata);
  
    })
  }
