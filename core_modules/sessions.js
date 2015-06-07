'use strict';

var sh = require("shorthash");

module.exports = function(StackSight, sts) {

    function Sessions(name) {
        this.name = sh.unique(name);
    };


    Sessions.prototype.up = function() {
        sts.index({
            index: 'sessions',
            type: 'sessions',
            eId: this.name,
            action: 'up',
            up: new Date()
        });
    };

    Sessions.prototype.down = function(options, err) {

        console.log('*************************');
        console.log(Sessions.numInstances, options);
        console.log('*************************');

        
        console.log('----------- Session down --------------------', this.name);

        //  sts.index({
        //     index: 'sessions',
        //     type: 'sessions',
        //     action: 'down',
        //     eId: this.name,
        //     err: err,
        //     down: new Date()

        // });
        setTimeout(function() {
            console.log('##########################################');
            if (options.cleanup) console.log('clean');
            if (options.test) console.log('TEST');
            if (err) console.log(err.stack);
            if (options.exit) process.exit();
        }, 100);
    };

    function exitHandler(options, err) {
      console.log('))))))))))))', err, process.pid);
        // sts.index({
        //     index: 'sessions',
        //     type: 'sessions',
        //     action: 'down',
        //     pid: process.pid,
        //     err: err
        // });
        setTimeout(function() {
            console.log('##########################################');
            if (options.cleanup) console.log('clean');
            if (options.test) console.log('TEST');
            if (err) console.log(err.stack);
            if (options.exit) process.exit();
        }, 100);
    }

    //do something when app is closing
    // process.on('exit', exitHandler.bind(null,{cleanup:true}));
    // process.on('error', exitHandler.bind(null,{cleanup:true}));   

    var pname = Date.now() + '-' + sts.user + '-' + process.pid;

    StackSight.prototype.sessions = new Sessions(pname);

    // process.on('exit', sts.sessions.down.bind(sts.sessions, {cleanup:true}));
    // process.on('error', sts.sessions.down.bind(sts.sessions, {cleanup:true}));
     //catches uncaught exceptions
    // process.on('uncaughtException', sts.sessions.down.bind(sts.sessions, {exit:true}));
    //catches ctrl+c event
    // process.on('SIGINT', sts.sessions.down.bind(sts.sessions, {exit:true}));
    // process.on('beforeExit', sts.sessions.down.bind(sts.sessions, {'beforeExit':true}));

    // process.on('SIGKILL', sts.sessions.down.bind(sts.sessions, {'SIGKILL':true}));

    //killed event
    // process.on('SIGHUP', exitHandler.bind(null, {exit:true}));
};