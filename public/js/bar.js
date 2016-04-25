function drawGraphs(dataset){
var outer_width = 330,
    outer_height = 200,
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

countries.forEach(function(entry){
 svg[entry] = d3.select("#" + entry).append("svg")
     .attr("width", outer_width)
     .attr("height", outer_height)
     .attr("class", "graph")
     .attr("id", entry + "-graph")
   .append("g")
     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
});

d3.csv(dataset, function(error, data){

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


        var y = d3.scale.linear()
            .domain([0,1])
            .range([0, height]);

        var bars = svg[entry].selectAll('rect')
            .data(data, key)
            .enter();

        bars.append('rect')
            .attr('class', 'bar')
            .attr('height', function(d) { return y(+d[entry]); })
            .attr('width', function(d) { return x.rangeBand(); })
            .attr('x', function(d, i) { return x(d.knowledgeType); })
            .attr('y', function(d) { return height - y(+d[entry]); })
            .append("svg:title")
              .text(function(d) { return d[entry]; });
    });
});
}

drawGraphs("domestic.csv");

$('#change-data').on('change', function(){
  $('.graph').hide();
  drawGraphs(this.value);
});
