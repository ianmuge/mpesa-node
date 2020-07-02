const {agenda} =require("../../helper");
module.exports = (eventEmitter) => {
    eventEmitter.on('mpesa-validation', (data) => {
        console.log(`Transaction Validated: ${data.TransID}`);
    });
    eventEmitter.on('mpesa-confirmation', async (data) => {
        console.log(`Transaction Confirmed: ${data.TransID}`);
        let message=`${data.FirstName||data.LastName} your payment: ${data.TransID} of KES. ${data.TransAmount} has been received. Thank you.`;
        let to=data.MSISDN;
        await agenda.schedule('in 5 seconds', 'send text', {to: to,message:message});
        // await agenda.now('send text', {to: to,message:message});
    });
};