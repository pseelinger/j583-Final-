var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 750 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var x = d3.scale.linear()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

var svg = d3.select("#bubble-chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("politicalKnowledge.csv", function(error, data){
  x.domain([0.5,1]);
  y.domain([0.5,d3.max(data, function(d){return d.AVG_INT;})]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .text("Year")
      .attr("transform", "translate(" + width/2 + ",60)")
      .style("font-size", "24px")
      .attr("text-anchor", "middle");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "translate(-80," + height/2 + ") rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "middle")
      .style("font-size", "24px")
      .text("Percent");

  svg.selectAll("point")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "point")
    .attr("cx", function(d){ return x(d.AVG) ;})
    .attr("cy", function(d){ return y(d.AVG_INT) ;})
    .attr("r", function(d){return d.PublicMediaPerCapita * .25;})
    .attr("id", function(d){return d.country;})
    .attr("fill", "#000")
});
