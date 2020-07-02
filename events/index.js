var event=require('events');
var eventEmitter = new event.EventEmitter();
exports.events =()=>{
    eventEmitter.on('test-created', (data) => {
        console.log(`test: ${data.answer}`);
    });

    require('./mpesa')(eventEmitter);
};
exports.eventEmitter=eventEmitter;
