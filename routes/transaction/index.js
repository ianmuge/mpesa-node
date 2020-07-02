let route = require('express').Router();
const { eventEmitter } = require("../../events");
const Transaction=require("../../models/transaction");
route.get('/:page?', async (req, res, next) => {
    var perPage = 25;
    var page = req.params.page || 1;
    Transaction
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec((err, transactions) =>{
            Transaction.countDocuments().exec(function(err, count) {
                if (err) return next(err);
                res.render('transaction/index', {
                    transactions:transactions,
                    current:page,
                    pages:Math.ceil(count / perPage)
                });
            });
        });
});
module.exports = route;