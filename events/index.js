var event=require('events');
var eventEmitter = new event.EventEmitter();
exports.events =()=>{
    require('./transaction')(eventEmitter);
};
exports.eventEmitter=eventEmitter;
