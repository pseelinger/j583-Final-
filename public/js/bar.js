var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 300 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var key = function(d) {
        return d.knowledgeType;
    }

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var countries = ["US", "Finland", "Denmark", "UK"];

var svg = {};

countries.forEach(function(entry){
 svg[entry] = d3.select("#" + entry).append("svg")
     .attr("width", width + margin.left + margin.right)
     .attr("height", height + margin.top + margin.bottom)
     .attr("id", entry + "-graph")
   .append("g")
     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
});

d3.csv('domestic.csv', function(error, data){

x.domain(data.map(key));
    xAxis = d3.svg.axis()
        .scale(x)
        .orient('bottom')

    countries.forEach(function(entry) {
        var g = svg[entry].append('g')
            .attr('transform', 'translate(0, ' + margin.bottom + ')')
            .append('g')
            .attr('class', 'axis')
            .attr('transform', 'translate(0, ' + height + ')')
            .call(xAxis);


        var y = d3.scale.linear()
            .domain([d3.min(data, function(d) { return +d[entry]; }),
                  d3.max(data, function(d) { return +d[entry]; })])
            .range([height*0.2, height*0.8]);

        var bars = svg[entry].selectAll('rect')
            .data(data, key)
            .enter();

        bars.append('rect')
            .attr('class', 'bar')
            .attr('height', function(d) { return y(+d[entry]); })
            .attr('width', function(d) { return x.rangeBand(); })
            .attr('x', function(d, i) { return x(d.knowledgeType); })
            .attr('y', function(d) { return height-y(+d[entry]); })
    });
});
