module.exports = (eventEmitter) => {
    eventEmitter.on('test-created', (data) => {
        console.log(`test: ${data.answer}`);
    });
};