let route = require('express').Router();
const { eventEmitter } = require("../../events");
const Transaction=require("../../models/transaction");
route.post("/validation",async (req, res, next) => {
    try{
        console.log(req.body);
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
        eventEmitter.emit('mpesa-validation', transaction);
        res.status(200).json(response);
    }
    catch (e) {
        next(error);
        let response = {"ResultCode": 1, "ResultDesc": "Rejected"}
        res.status(200).json(response);
    }finally {

    }
});
route.post("/confirmation",async (req, res, next) => {
    try{
        console.log(req.body);
        let transaction=await Transaction.findOne({TransID:req.body.TransID});
        transaction.confirmation_timestamp = Date.now();
        await transaction.save();
        eventEmitter.emit('mpesa-confirmation', transaction);
        let response={"ResultCode": 0,"ResultDesc": "Accepted"}
        res.status(200).json(response);
    }
    catch (e) {
        let response = {"ResultCode": 1, "ResultDesc": "Rejected"}
        res.status(200).json(response);
    }finally {

    }
});
route.post("/reversal",async (req, res, next) => {
    try{}
    catch (e) {
        next(error)
    }
});
module.exports = route;