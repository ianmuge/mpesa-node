let route = require('express').Router();
const { eventEmitter } = require("../../events");
const Transaction=require("../../models/transaction");
route.get('/', async (req, res, next) => {
    try {
        let data= {
            answer: 42
        };
        eventEmitter.emit('test-created', data);
        res.status(200).json(data);
    } catch (error) {
        next(error)
    }
});
module.exports = route;