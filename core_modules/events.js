'use strict';



module.exports = function(StackSight, sts) {

	var EventEmitter = require('events').EventEmitter,
		stsEvents = new EventEmitter();


	function Events() {}


	Events.prototype.publish = function(data) {
        if (!data.type || !data.action) return;

        stsEvents.emit(data.type + ' ' + data.action, data);

        data.eIndex = 'events';
        data.eType = 'event';
        data.icon_col = data.icon_col || '#176583';
        data.icon = data.icon || 'fa-bars';

		sts.index(data);
	   
	};

	Events.prototype.subscribe = function(name, cb) {
	    stsEvents.on(name, cb);
	};

	StackSight.prototype.events = new Events();

};

