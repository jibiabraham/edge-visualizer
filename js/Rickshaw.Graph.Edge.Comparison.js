Rickshaw.namespace('Rickshaw.Graph.Edge.Comparison');


/*
	Render a single/series of Edge series from a given time range
	This does not differ from Rickshaw.Graph.Ajax much
*/
Rickshaw.Graph.Edge.Comparison = Rickshaw.Class.create(Rickshaw.Graph.Edge, {

	renderMeta: function ($super, args) {
		/*
			Process args.params here to a common format
			The server should be able to recongize it as two
			sets of data
		*/
		return $super(args)
	},

	_splice: function($super, args) {
		return $super(args);
	},

	processData: function($super, d){
		return $super(d);
	}

} );

