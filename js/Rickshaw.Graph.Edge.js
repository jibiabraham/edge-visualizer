Rickshaw.namespace('Rickshaw.Graph.Edge');


/*
	Render a single/series of Edge series from a given time range
	This does not differ from Rickshaw.Graph.Ajax much
*/
Rickshaw.Graph.Edge = Rickshaw.Class.create( {

	initialize: function(args) {


		/*if (!args.params) throw "You need to specify the edges and time ranges in 'params'"*/

		this.dataURL = args.dataURL;
		this.params = args.params;

		this.onData = args.onData || this.processData.bind(this);
		this.onComplete = args.onComplete || function() {};
		this.onError = args.onError || function() {};

		this.args = args; // pass through to Rickshaw.Graph

		this.request();
	},

	request: function() {

		$.ajax( {
			url: this.dataURL,
			dataType: 'json',
			data: this.params,
			success: this.success.bind(this),
			error: this.error.bind(this)
		} );
	},

	error: function() {

		console.log("error loading dataURL: " + this.dataURL);
		this.onError(this);
	},

	success: function(data, status) {

		data = this.onData(data);
		this.args.series = this._splice({ data: data, series: this.args.series });

		this.graph = this.graph || new Rickshaw.Graph(this.args);
		this.graph.render();
		this.renderMeta();

		this.onComplete(this);
	},

	renderMeta: function (argument) {
		this.hoverDetail = new Rickshaw.Graph.HoverDetail( {
			graph: this.graph
		} );

		this.legend = new Rickshaw.Graph.Legend( {
			graph: this.graph,
			element: this.getLegendElement().get(0)

		} );

		this.shelving = new Rickshaw.Graph.Behavior.Series.Toggle( {
			graph: this.graph,
			legend: this.legend
		} );

		this.axes = new Rickshaw.Graph.Axis.X( {
			graph: this.graph
		} );
		this.axes.render();		
	},

	_splice: function(args) {

		var data = args.data;
		var series = args.series;

		if (!args.series) return data;

		series.forEach( function(s) {

			var seriesKey = s.key || s.name;
			if (!seriesKey) throw "series needs a key or a name";

			data.forEach( function(d) {

				var dataKey = d.key || d.name;
				if (!dataKey) throw "data needs a key or a name";

				if (seriesKey == dataKey) {
					var properties = ['color', 'name', 'data'];
					properties.forEach( function(p) {
						if (d[p]) s[p] = d[p];
					} );
				}
			} );
		} );

		return series;
	},

	getLegendElement: function(){
		var baseEl = $(this.graph.element), legend = baseEl.find(".legend");
		if (legend.length === 0){
			var legendContainer = $([
				'<div>',
					'<div title="Smoothing"></div>',
					'<div class="legend"></div>',
				'</div>'
			].join("")).appendTo(baseEl);
			legend = legendContainer.find(".legend");
		}
		return legend;
	},

	processData: function(d){
		return d;
	}

} );

