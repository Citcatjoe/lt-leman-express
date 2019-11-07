
		var width = 570,
		    height = 520;

		var baseScale = 3000, translateX = 280, translateY = 268;

		var windowWidth = $( window ).width();
		if (windowWidth < 600){
		  // resize
		  width = windowWidth - 20;
		  ratio = width / 600;
		  console.log("Width is " + windowWidth + " -> resize to ratio " + ratio);
		  height *= ratio;
		  baseScale *= ratio;
		  translateX *= ratio;
		  translateY *= ratio;
		}

		var resultById = d3.map();

		var selectedRound = 't2';
		var showYouth = false;

		var colors = {
		    'Macron': 'orange',
		    'Le Pen': '#110c4e',
		    'Fillon': '#536797',
		    'Mélenchon': '#e80007',
		    'Hamon': '#c93d7c'
		}

		var list_keys = ["Nom", "Prenom", "Score",
		"Nom_1", "Prenom_1", "Score_1",
		"Nom_2", "Prenom_2", "Score_2",
		"Nom_3", "Prenom_3", "Score_3",
		"Nom_4", "Prenom_4", "Score_4",
		"Nom_5", "Prenom_5", "Score_5"];

		/* Tooltip */
		function showCaption(d, i) {
		    var depRow = resultById.get(d.id);
		    if(depRow && depRow.pop){
		      var liste = '<span class="value">' + depRow.pop + '</span> habitants<br>';
		      liste += '<span class="value">' + depRow.density + '</span> habitants au km<sup>2</sup><br>';
		      liste += '<span class="value">' + depRow.youth + '%</span> de 0-24 ans dans la population'
		    }else{
		      liste = 'En attente du dépouillement (dernière mise à jour: lundi 0h54).'
		    }
		    d3.select('#motherTip').html('<h3 class="statename">' + d.id + ' – ' + resultById.get(d.id).title + "</h3>" + liste + "</span>");
		}
		/* End tooltip */

		/*
		Note: great project for multiple projections:
		https://github.com/rveciana/d3-composite-projections
		var projection = d3.geoConicConformalFrance();
		*/

		var projection = d3.geoConicConformal()
		    .center([2.454071, 46.279229])
		    .scale(baseScale)
		    .translate([translateX, translateY]);

		var path = d3.geoPath()
		    .projection(projection);

		var svg = d3.select("#map").append("svg")
		    .attr("width", width)
		    .attr("height", height);

		var colorScaleDensity = d3.scaleThreshold()
		  .domain([50, 100, 200, 500])
		  .range(['#ffffb2','#fecc5c','#fd8d3c','#f03b20','#bd0026']);

		// colorScaleDensity = d3.scaleQuantize()
		//     .domain([3, 700])
		//     .range(['#ffffb2','#fecc5c','#fd8d3c','#f03b20','#bd0026']);

		var colorScalePop = d3.scaleLinear()
		  .domain([76309.0, 2605238.0])
		  .range(['#fff', '#110c4e']);

		var colorScaleYouth = d3.scaleThreshold()
		  .domain([22.5, 25, 25.5, 30])
		  .range(['#f2f0f7','#cbc9e2','#9e9ac8','#756bb1','#54278f']);

		// var colorScaleYouth = d3.scaleLinear()
		//   .domain([20, 50])
		//   .range(['#fff', 'orange']);

		var abstentionScale =  d3.scaleLinear()
		  .domain([15, 35])
		  .range(['#e2e2e2', 'black']);

		d3.queue()
		  .defer(d3.json, "data/departements.json") // geodonnees departements
		  .defer(d3.csv, "data/population-2015-departements.csv", function(d){ // data tour 2
		    resultById.set(d.id, d);
		  })
		  .await(ready);

		function ready(error, france, data) {
		  if (error){
		    console.log('Error:' + error);
		    throw error;
		  }

		  var france = topojson.feature(france, france.objects.departements);
		    svg.selectAll(".departements")
		      .data(france.features)
		      .enter()
		      .append("path")
		      .attr("d", path)
		      .attr("fill", function(d) {
		        d.id = d.properties.code_insee;
		        try{
		          if(d.id != '2A' && d.id != '2B')
		            d.id = parseInt(d.id);
		        }
		        catch(err) {
		          console.log('Could not parse as int ' + d.properties.code_insee)
		        }
		        var stateRow = resultById.get(d.id)

		        if (stateRow){
		          if(showYouth){
		            return colorScaleYouth(stateRow.youth);
		          }else{
		            return colorScaleDensity(stateRow.density);
		          }
		        }else{
		          console.log('No matching row for ' + d.properties.nom + ' | ' + d.properties.code_insee)
		        }
		      })
		      .attr("class", "departements")
		      .on('mouseover', showCaption);
		}

		/* Change from 1st to 2nd round */
		function changeData(target){
		  if(target=='youth'){
		    showYouth = true;
		  }else{
		    showYouth = false;
		  }

		  // nested function
		  function updateMap(){
		    switchLegend();

		    svg.selectAll(".departements")
		    .transition().duration(500)
		    .style("fill", function(d) {
		      var stateRow = resultById.get(d.id)
		      if (stateRow){
		        if(showYouth){
		          return colorScaleYouth(stateRow.youth);
		        }else{
		          return colorScaleDensity(stateRow.density);
		        }
		      }else{
		        console.log('No matching row for ' + d.properties.nom + ' | ' + d.properties.code_insee)
		      }
		    });
		  }
		  // end nested func
		updateMap();
		}

		/* Legends */
		// div container
		var mapLegend = d3.select("#mapLegend");

		mapLegend.append("g")
		  .attr("class", "legendDensity");
		mapLegend.append("g")
		  .attr("class", "legendYouth")
		  .style('opacity', '0');


		var legendYouth = d3.legendColor()
		  .labelFormat(function(d){ return d3.format(".1f")(d)} )
		  .labels(function(d){
		    return d3.legendHelpers.thresholdLabels(d).replace('to', 'à').replace('Less than', 'Moins de').replace('More than', 'Plus de') + '%'
		  })
		  .scale(colorScaleYouth);

		var legendDensity = d3.legendColor()
		  .labelFormat(d3.format(".0f"))
		    .labels(function(d){
		      return d3.legendHelpers.thresholdLabels(d).replace('to', 'à').replace('Less than', 'Moins de').replace('More than', 'Plus de')
		    })
		    .scale(colorScaleDensity)

		// var legendYouth = d3.legendColor()
		//   .labelFormat(function(d){ return d3.format(".0f")(d)} )
		//   .labels(function(d){
		//     return d3.legendHelpers.thresholdLabels(d).replace('to', 'à').replace('Less than', 'Moins de').replace('More than', 'Plus de') + '%'
		//   })
		//   .scale(colorScaleYouth);

		mapLegend.select(".legendDensity")
		  .call(legendDensity);

		mapLegend.select(".legendYouth")
		  .call(legendYouth);


		function switchLegend(){
			hideClassName = '.legendYouth';
			showClassName = '.legendDensity';
			if(showYouth){
				hideClassName = '.legendDensity';
				showClassName = '.legendYouth';
			}
		  mapLegend.select( hideClassName )
		    .transition().duration(500)
		    .style('opacity', 0);
		  mapLegend.select( showClassName )
		    .transition().duration(500)
		    .style('opacity', 1);
		}
		/* End legends */
