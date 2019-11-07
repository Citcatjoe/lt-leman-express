var top5chart, incomeChart, banksChart;

$(document).ready(function(){

  /* 1 === avoirs */
  top5chart = c3.generate({
    bindto: '#top5chart',
    padding: {
      top: 2,
      right: 40,
      bottom: 2,
      left: 40,
    },
    size: {
      height: 300,
    },
    point: {r: 4},
    data: {
      url: 'data/assets-top5-no-usa.csv',
      type: 'line',
      x: 'Date',
      colors: {
        'États-Unis': '#3172B8',
        'Allemagne': '#E69200',
        'France': '#758B8F',
        'Italie': '#9D9200',
        'Royaume-Uni': '#C00D0D'
      },
    },
    axis: {
      x: {
        tick: {
          count: 5,
        }
      }
    },
    tooltip: {
      format: {
        title: function (d) { return d; },
        value: function (value, ratio, id) {
          return value + ' mds de CHF';
        }
      }
      /* pour le debug */
      /*
      position: function () {
      var position = c3.chart.internal.fn.tooltipPosition.apply(this, arguments);
      position.top = 0;
      return position;
    },*/
  }
  });
  /*
  var originalHideTooltip = top5chart.internal.hideTooltip
  top5chart.internal.hideTooltip = function () {
  setTimeout(originalHideTooltip, 100)
  };*/

  /* 2 === résultats */


	incomeChart = c3.generate({
    bindto: '#incomeChart',
    padding: {
      top: 2,
      right: 40,
      bottom: 2,
      left: 40,
    },
    size: {
      height: 300,
    },
		data: {
			x: 'x',
			columns: [
				['x', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'],
				['Bénéfice/perte', 9.79, -30.51, 2.39, 10.63, 12.996, 0.19, 10.52, 7.37, 15.79, 7.91, 9.77],
			]
		},
		axis: {
			x: {
				tick: {
          // TODO mobile?
				}
			}
		},
    tooltip: {
      format: {
        title: function (d) { return d; },
        value: function (value, ratio, id) {
          return value + ' mds de CHF';
        }
      }
      /* pour le debug */
      /*
      position: function () {
      var position = c3.chart.internal.fn.tooltipPosition.apply(this, arguments);
      position.top = 0;
      return position;
    },*/
  },
    grid: {
        y: {
            lines: [
                {value: 0, text: ""},
            ]
        }
    }
	});

  /* 3 === nb banques */


  	banksChart = c3.generate({
      bindto: '#banksChart',
      padding: {
        top: 2,
        right: 40,
        bottom: 2,
        left: 40,
      },
      size: {
        height: 300,
      },
      data: {
        type: 'bar',
  			x: 'x',
  			columns: [
  				['x', "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"],
  				['Total', 323, 327, 325, 320, 312, 297, 283, 275, 266, 261, 253],
  				['Banques étrangères', 152, 154, 156, 154, 148, 131, 120, 118, 111, 107,  99]
  			]
  		},
  		axis: {
  			x: {
  			}
  		}
  	});
  	console.log('income2...')


});
