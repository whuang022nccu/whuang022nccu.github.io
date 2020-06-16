
var indent = { top: 5, right: 5, bottom: 5, left: 5 },
    width = 450 - indent.left - indent.right,
    height = 450 - indent.top - indent.bottom;

var number_display = d3.select("#heat_map")
    .append("div")
    .style("opacity", 0)
    .attr("class", "number_display")
    .style("background-color", "white")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

var svg = d3.select("#heat_map")
    .append("svg")
    .attr("width", width + indent.left + indent.right)
    .attr("height", height + indent.top + indent.bottom)
    .append("g")
    .attr("transform",
        "translate(" + indent.left + "," + indent.top + ")");

var color = d3.scaleSequential().interpolator(d3.interpolateInferno).domain([0, 3])


var reader = new FileReader();

function load_f() {
    var file = document.querySelector('input[type=file]').files[0];
    reader.addEventListener("load", parse_csv, false);
    if (file) {
        reader.readAsText(file);
    }
}

function parse_csv() {
    d3.select("#heat_map").select("svg").remove();
    var svg = d3.select("#heat_map")
        .append("svg")
        .attr("width", width + indent.left + indent.right)
        .attr("height", height + indent.top + indent.bottom)
        .append("g")
        .attr("transform",
            "translate(" + indent.left + "," + indent.top + ")");

    var data = d3.csvParse(reader.result)

    svg.selectAll()
        .data(data, function (d) { return d.group + ':' + d.variable; })
        .enter()
        .append("rect")
        .attr("x", function (d) { return d.group })
        .attr("y", function (d) { return d.variable })
        .attr("width", 5)
        .attr("height", 5)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
        .style("fill", function (d) { return color(d.value) })
}

function demo() {
    var data = d3.csv('https://gist.githubusercontent.com/whuang022nccu/f24dcf99a241ac1c1c8f71e7ca68d90a/raw/7056117d6a8475f8550f648e9cb32da0175c21ce/SRR400264_sample1_1000000_iced.csv', function (data) {
        d3.select("#heat_map").select("svg").remove();
        var svg = d3.select("#heat_map")
            .append("svg")
            .attr("width", width + indent.left + indent.right)
            .attr("height", height + indent.top + indent.bottom)
            .append("g")
            .attr("transform",
                "translate(" + indent.left + "," + indent.top + ")");
        svg.selectAll()
            .data(data, function (d) { return d.group + ':' + d.variable; })
            .enter()
            .append("rect")
            .attr("x", function (d) { return d.group })
            .attr("y", function (d) { return d.variable })
            .attr("width", 5)
            .attr("height", 5)
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)
            .style("fill", function (d) { return color(d.value) })
    })
}


var mouseover = function (d) {
    number_display
        .style("opacity", 1)
    d3.select(this)
        .style("stroke", "black")
        .style("opacity", 1)
}
var mousemove = function (d) {
    number_display
        .html("loci chr1: " + d.group + "<br>" + "loci chr2: " + d.variable + "<br>" + "reads: " + d.value)
}
var mouseleave = function (d) {
    number_display
        .style("opacity", 0)
    d3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.6)
}
