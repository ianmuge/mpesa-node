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
route.post("/validation",async (req, res, next) => {
    try{
        const transaction=await Transaction.create({
            TransactionType: req.body.TransactionType,
            TransID: req.body.TransID,
            TransTime: req.body.TransTime,
            TransAmount: req.body.TransAmount,
            BusinessShortCode: req.body.BusinessShortCode,
            BillRefNumber: req.body.BillRefNumber,
            InvoiceNumber: req.body.InvoiceNumber,
            OrgAccountBalance: req.body.OrgAccountBalance,
            ThirdPartyTransID: req.body.ThirdPartyTransID,
            MSISDN: req.body.MSISDN,
            FirstName: req.body.FirstName,
            MiddleName: req.body.MiddleName,
            LastName: req.body.LastName,
            validation_timestamp: Date.now()
        });
        let response = {"ResultCode": 0, "ResultDesc": "Accepted"}
    }
    catch (e) {
        next(error);
        let response = {"ResultCode": 1, "ResultDesc": "Rejected"}
    }finally {
        res.status(200).json(response);
    }
});
route.post("/confirmation",async (req, res, next) => {
    try{
        let transaction=await Transaction.findOne({TransID:req.body.TransID});
        transaction.confirmation_timestamp = Date.now();
        await transaction.save();
        let response={"ResultCode": 0,"ResultDesc": "Accepted"}
    }
    catch (e) {
        next(error)
        response = {"ResultCode": 1, "ResultDesc": "Rejected"}
    }finally {
        res.status(200).json(response);
    }
});
route.post("/reversal",async (req, res, next) => {
    try{}
    catch (e) {
        next(error)
    }
});
module.exports = route;