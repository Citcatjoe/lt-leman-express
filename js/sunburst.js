var formatNumber = d3.format(".1f");
var width = 932;
var radius = width / 6;
var year = "2017";
var data;
var opaque = false;
var testnode;

d3.select("#year-2007").on("click", function(){
  year = "2007";
  update();
});
d3.select("#year-2017").on("click", function(){
  year = "2017";
  update();
});

function sw(){
  year = year == "2017"? "2007" : "2017";
  update();
}

function getContinentByName(name){
  continentFound = false;
  $.each(data.children, function(i, item){
    if(item.name === name){
      continentFound = item;
      return;
    }
  });
  return continentFound;
}

var arc = d3.arc()
        .startAngle(d => d.x0)
        .endAngle(d => d.x1)
        .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
        .padRadius(radius * 1.5)
        .innerRadius(d => d.y0 * radius)
        .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1));

var partition = data => {
    var root = d3.hierarchy(data)
            .sum(d => d["size_"+year])
            // on  ne trie pas cette fois
            // .sort((a, b) => b.value - a.value);
    return d3.partition()
            .size([2 * Math.PI, root.height + 1])
            (root);
}

var svg = d3.select("#sunburst")
        .style("width", "98%")
        .style("height", "auto")
        .style("font", "10px sans-serif");

// On les «pose» par-dessous pour que le cercle cliquable (parent invisible) soit dessus
var label1 = svg.append("text")
  .attr("text-anchor", "middle")
  .attr("class", "label1")
  .attr("x", width/2)
  .attr("y", (width/2) - 30)
  .text("");

var label2 = svg.append("text")
  .attr("text-anchor", "middle")
  .attr("class", "label2")
  .attr("x", width/2)
  .attr("y", width/2)
  .text("");

var label3 = svg.append("text")
  .attr("text-anchor", "middle")
  .attr("class", "label3")
  .attr("x", width/2)
  .attr("y", (width/2) + 30)
  .text("");

var label4 = svg.append("text")
  .attr("text-anchor", "middle")
  .attr("class", "label4")
  .attr("x", width/2)
  .attr("y", (width/2) + 50)
  .text("");

var g = svg.append("g")
        .attr("transform", `translate(${width / 2},${width / 2})`);

var color;

function colors(key){
  color_dict = {"Amérique du Nord": "#3172B8",
    "Europe": "#E69200",
    "Asie": "#758B8F",
    "Afrique": "#9D9200",
    "Amérique du Sud": "#C00D0D",
    "Océanie": "#cdab02"
  }
  return color_dict[key];
}

function update(_data=data){
  data = _data;
  if(!color){
     color = d3.scaleOrdinal().range(d3.quantize(d3.interpolateRainbow, data.children.length + 1));
  }
  var t = d3.transition()
      .duration(250);

  // JOIN new data with old elements.
  var tree = g.selectAll("*")
    .data(data, function(d) { return d; });



  label1.text("");
  label2.text("");
  label3.text("");
  label4.text("");

  // EXIT old elements not present in new data.
  tree.exit()
      .attr("class", "exit")
    .transition(t)
      .attr("y", 60)
      .style("fill-opacity", 1e-6)
      .remove();

  tree.attr("class", "update")
      .attr("y", 0)
      .style("fill-opacity", 1)
    .transition(t)
      .attr("x", function(d, i) { return i * 32; });

  var root = partition(data);

  root.each(d => d.current = d);

  function formatChange(d){
    var percent = false;
    var percent_str = '';

    if(d.children){ // parent

      // horrible truc dans l’urgence a pas reprendre
      var cont = getContinentByName(d.data.name);
      testnode = cont;
      var sum_2007 = d3.hierarchy(cont).sum(d => d["size_2007"]).value;
      var sum_2017 = d3.hierarchy(cont).sum(d => d["size_2017"]).value;
      percent = (sum_2017 - sum_2007) / sum_2007;

    }else{ // enfant
      percent = (d.data.size_2017 - d.data.size_2007) / d.data.size_2007;
    }
    if(percent){
      percent_str = formatNumber(100*percent) + '% entre 2007 et 2017';
    }
    if(percent >= 0){
      percent_str = '+' + percent_str;
    }
    return percent_str;
  }
  function displayData(d){
    var value = d.value;
    if(value > 1000){
      unit = "milliards de CHF";
      value /= 1000;
    }else{
      unit = "millions de CHF";
    }
    label1.text(d.data.name );
    label2.text(formatNumber(value));
    label3.text(unit);
    label4.text( formatChange(d) );
  }

  var path = tree.enter()
          .append("path")
          .data(root.descendants().slice(1))
          .join("path")
          .attr("fill", d => {
              while (d.depth > 1)
                  d = d.parent;
              return colors(d.data.name);
          })
          // .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
          .attr("fill-opacity", d => {
            if(arcVisible(d.current)){
              if(opaque){
                return d.children ? 0.6 : 0.4;
              }else{

                // On met les US en évidence
                if(d.data.name == "Amérique du Nord"){
                  return 0.9;
                }else if(d.parent.data.name === "Amérique du Nord"){
                  return 0.8;
                }else{
                  return (d.children ? 0.15 : 0.1);
                }

              }
            }
            return 0;
          })
          .attr("d", d => arc(d.current))
          .on("mouseover", displayData);

  // click event sur parents
  path.filter(d => d.children)
          .style("cursor", "pointer")
          .on("click", parentClicked);


  // click sur childs
  path.filter(d => !d.children)
          .style("cursor", "pointer")
          .on("click", displayData);

  var label = g.append("g")
          .attr("pointer-events", "none")
          .attr("text-anchor", "middle")
          .style("user-select", "none")
          .selectAll("text")
          .data(root.descendants().slice(1))
          .join("text")
          .attr("dy", "0.35em")
          .attr("fill-opacity", d => +labelVisible(d.current))
          .attr("transform", d => labelTransform(d.current))
          .text(d => d.data.name);

  var parent = g.append("circle")
          .datum(root)
          .attr("r", radius)
          .attr('class', 'central-circle')
          .attr("fill", "none")
          .attr("pointer-events", "all")
          .on("click", parentClicked);


  function parentClicked(p) {
      parent.datum(p.parent || root);

      root.each(d => d.target = {
              x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
              x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
              y0: Math.max(0, d.y0 - p.depth),
              y1: Math.max(0, d.y1 - p.depth)
          });

      var t = g.transition().duration(750);

      // Transition the data on all arcs, even the ones that aren’t visible,
      // so that if this transition is interrupted, entering arcs will start
      // the next transition from the desired position.
      path.transition(t)
              .tween("data", d => {
                  var i = d3.interpolate(d.current, d.target);
                  return t => d.current = i(t);
              })
              .filter(function (d) {
                  return +this.getAttribute("fill-opacity") || arcVisible(d.target);
              })
              .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
              .attrTween("d", d => () => arc(d.current));

      label.filter(function (d) {
          return +this.getAttribute("fill-opacity") || labelVisible(d.target);
      }).transition(t)
              .attr("fill-opacity", d => +labelVisible(d.target))
              .attrTween("transform", d => () => labelTransform(d.current));
  }

  function arcVisible(d) {
      return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
  }

  function labelVisible(d) {
      return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
  }

  function labelTransform(d) {
      var x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
      var y = (d.y0 + d.y1) / 2 * radius;
      return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
  }
}

d3.json("data/data-2012-2017.json").then(update);
