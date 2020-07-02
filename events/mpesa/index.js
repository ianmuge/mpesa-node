const axios=require("axios");
module.exports = (eventEmitter) => {
    eventEmitter.on('mpesa-validation', (data) => {
        console.log(`Transaction Validated: ${data.TransID}`);
    });
    eventEmitter.on('mpesa-confirmation', (data) => {
        console.log(`Transaction Confirmed: ${data.TransID}`);
        let headers = {
            'Content-Type': "application/json"
        };
        let message=`${data.FirstName||data.LastName} your payment: ${data.TransID} of KES. ${data.TransAmount} has been received. Thank you.`;
        let payload = {
            apikey:process.env.SMS_APIKEY,
            partnerID:process.env.SMS_PARTNER_ID,
            message:message,
            shortcode:process.env.SMS_SHORTCODE,
            mobile:data.MSISDN,
            pass_type:"plain"
        };
        let url = process.env.SMS_URL;
        axios.post(url,payload,{
            headers:headers
        }).then(resp=>{
            // console.log(resp.data.responses[0].mobile);
            if(resp.data.responses!==undefined){
                let response=resp.data.responses;
                data.notification_id=response[0].messageid;
                data.save();
            }
        }).catch(err=>{
            console.error(err);
        }).then(()=>{
            console.log("Notification sent");
        });
    });
};