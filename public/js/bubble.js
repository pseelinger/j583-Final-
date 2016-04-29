var margin = {top: 100, right: 30, bottom: 80, left: 100},
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

    var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

d3.csv("politicalKnowledge.csv", function(error, data){
  x.domain([0.5,.85]);
  y.domain([0.4,.75]);

svg.append('g')
  .append('text')
  .text('Public Spending on Media Versus Knowledge of Current Events')
    .attr('transform', 'translate(' + (width/2) + ', -70)')
    .attr('text-anchor', 'middle')
    .style('font-size', '21px');

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .text("Domestic Knowledge Test Score")
      .attr("transform", "translate(" + width/2 + ",60)")
      .style("font-size", "18px")
      .attr("text-anchor", "middle")
      .attr('fill', '#333333');

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "translate(-80," + height/2 + ") rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "middle")
      .style("font-size", "18px")
      .text("International Knowledge Test Score")
      .attr('fill', '#333333');

  var circles = svg.selectAll("point")
    .data(data)
    .enter()
    .append('g')
    .on("click", function(d) {
      div.transition()
          .style("opacity", .9);
      div .html(d.country + ": $" + d.PublicMediaPerCapita)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY) - 75 + "px");
      });

    circles.append("circle")
    .attr("class", "point")
    .attr("cx", function(d){ return x(d.AVG) ;})
    .attr("cy", function(d){ return y(d.AVG_INT) ;})
    .attr("r", function(d){return d.PublicMediaPerCapita ;})
    .attr("id", function(d){return d.country;});


  circles.append('text')
    .text(function(d){return d.country;})
    .attr('x', function(d){return x(d.AVG) - 10;})
    .attr('y', function(d){return y(d.AVG_INT) - 5;})
    .attr('fill', '#f0f0f0');
});
