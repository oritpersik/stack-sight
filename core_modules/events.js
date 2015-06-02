'use strict';



module.exports = function(StackSight) {

	var EventEmitter = require('events').EventEmitter,
		stsEvents = new EventEmitter();


	function Events() {}


	Events.prototype.publish = function(name, data) {

	    stsEvents.emit(name, data);

		var options = {
			index: 'events',
			type: 'events',
			name: name,
			data: data
		};

		StackSight.index(options);
	   
	};

	Events.prototype.subscribe = function(name, cb) {
	    stsEvents.on(name, cb);
	};

	StackSight.prototype.events = new Events();

};

