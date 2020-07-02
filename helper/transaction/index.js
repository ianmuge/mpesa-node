const axios=require("axios");

module.authenticate =()=>{
    let base_safaricom_url = process.env.SANDBOX_URL
    if(process.env.ENV === "production") {
        base_safaricom_url = process.env.LIVE_URL;
    }
    let authenticate_url = `${base_safaricom_url}/oauth/v1/generate?grant_type=client_credentials`;
    axios.get(authenticate_url,{
        auth:{
            username: process.env.CONSUMER_KEY,
            password: process.env.CONSUMER_SECRET
        }
    }).then(resp=>{
        return resp.data.access_token;
    }).catch(err=>{
        console.error(err);
    }).then(()=>{

    });
};