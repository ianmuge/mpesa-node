const axios=require("axios");
module.exports = (agenda)=>{
    agenda.define('send text', {priority: 'high', concurrency: 10}, (job,done) => {
        let {to,message} = job.attrs.data;
        to=(process.env.ENV==="sandbox")?process.env.TEST_SMS_MSISDN:to;
        console.log(`Sending text to: ${to}`);
        let headers = {
            'Content-Type': "application/json"
        };
        let payload = {
            apikey:process.env.SMS_APIKEY,
            partnerID:process.env.SMS_PARTNER_ID,
            message:message,
            shortcode:process.env.SMS_SHORTCODE,
            mobile:to,
            pass_type:"plain"
        };
        let url = process.env.SMS_URL;
        axios.post(url,payload,{
            headers:headers
        }).then(resp=>{
            // if(resp.data.responses!==undefined){
            //     let response=resp.data.responses;
            //     data.notification_id=response[0].messageid;
            //     data.save();
            // }
        }).catch(err=>{
            console.error(err);
        }).then(()=>{
            console.log("Notification sent");
            done();
        });
    });
};