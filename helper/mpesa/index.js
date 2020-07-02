const axios=require("axios");

exports.authenticate =()=>{
    return new Promise((resolve,reject)=>{
        let base_safaricom_url = process.env.SANDBOX_URL
        if(process.env.ENV === "production") {
            base_safaricom_url = process.env.LIVE_URL;
        }
        let url = `${base_safaricom_url}/oauth/v1/generate?grant_type=client_credentials`;
        axios.get(url,{
            auth:{
                username: process.env.CONSUMER_KEY,
                password: process.env.CONSUMER_SECRET
            }
        }).then(resp=>{
            resolve(resp.data);
        }).catch(err=>{
            console.error(err.toString());
            reject(err);
        });
    });
};