const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TransactionSchema=new Schema({
    TransactionType: {type:String},
    TransID: {type:String},
    TransTime: {type:String},
    TransAmount: {type:String},
    BusinessShortCode: {type:String},
    BillRefNumber: {type:String},
    InvoiceNumber: {type:String},
    OrgAccountBalance: {type:String},
    ThirdPartyTransID: {type:String},
    MSISDN: {type:String},
    FirstName: {type:String},
    MiddleName: {type:String},
    LastName: {type:String},
    confirmation_timestamp : {type: Date},
    validation_timestamp:  {type: Date}
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
TransactionSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret.id;
        delete ret._id;

    }
});
const Transaction = mongoose.model('transaction', TransactionSchema);
module.exports = Transaction;