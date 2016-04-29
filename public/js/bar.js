//Draws the bar graphs to the first page
function drawGraphs(dataset){
  console.log(dataset);
var outer_width = 400,
    outer_height = 400,
    margin = {top: 10, right: 10, bottom: 10, left: 10},
    padding = {top: 20, right: 20, bottom: 20, left: 20},
    inner_width = outer_width - margin.left - margin.right,
    inner_height = outer_height - margin.top - margin.bottom,
    width = inner_width - padding.left - padding.right,
    height = inner_height - padding.top - padding.bottom;

var key = function(d) {
        return d.knowledgeType;
    }

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var countries = ["US", "Finland", "Denmark", "UK"];

var svg = {};

var div = d3.select("body").append("div")
.attr("class", "info-box");

//Make an individual svg here for each country

countries.forEach(function(entry){
 svg[entry] = d3.select("#" + entry).append("svg")
     .attr("width", outer_width)
     .attr("height", outer_height)
     .attr("class", "graph")
     .attr("id", entry + "-graph")
   .append("g")
     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

     svg[entry].append('g')
     .append('text')
     .text(entry + " Scores")
     .attr('transform', 'translate(' + (width/2) + ', 20)')
     .attr('text-anchor', 'middle')
     .attr('fill', '#444444')
     .style('font-size', '21px');
});

//Fetch the data based on user input

d3.csv(dataset, function(error, data){
console.log(data);
x.domain(data.map(key));
   xAxis = d3.svg.axis()
        .scale(x)
        .orient('bottom')
        .ticks(data.length);

    countries.forEach(function(entry) {

        var g = svg[entry].append('g')
            .attr('transform', 'translate(0, ' + margin.bottom + ')')
            .append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0, ' + height + ')')
            .call(xAxis);


        var rectG = svg[entry].append('g');

        var y = d3.scale.linear()
            .domain([0,1])
            .range([0, height]);

        var bars = rectG.selectAll('rect')
            .data(data, key)
            .enter()
            .append('g');

        bars.append('rect')
            .attr('class', 'bar')
            .attr('height', function(d) { return y(+d[entry]); })
            .attr('width', function(d) { return x.rangeBand(); })
            .attr('x', function(d) { return x(d.knowledgeType); })
            .attr('y', function(d) { return height - y(+d[entry]); });

      bars.append('text')
            .text(function(d){return (d[entry] * 100).toFixed(1) + "%";})
            .attr('x', function(d) { return x(d.knowledgeType) + 27; })
            .attr('y', function(d) { return height - y(+d[entry]) + 20; })
            .attr('text-anchor', 'right')
            .attr('fill', 'white');
    });
});
}

drawGraphs("domestic.csv");

//Controls which csv file is being used to draw the graphs

$('#change-data').on('change', function(){
  $('.graph').hide();
  $('#blank').hide();
  $('.info-box').hide();
  drawGraphs(this.value);
});
