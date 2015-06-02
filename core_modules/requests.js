'use strict';

module.exports = function(StackSight, app) {

	var options = {
		skip: function(req, res) {

			 var data = {
                index: 'logs',
                type: 'request',
                method: req.method,
                url: req.originalUrl,
                status: res.statusCode
            };

            StackSight.index(data);
		}
	};

  	app.use(require('morgan')('dev', options));
};