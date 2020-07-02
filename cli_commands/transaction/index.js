const axios=require("axios");
const {authenticate}=require("../../helper/transaction");
register=()=>{
    let payload = {
        ShortCode: process.env.SHORTCODE,
        ResponseType: process.env.RESPONSE_TYPE,
        ConfirmationURL: process.env.CONFIRMATION_URL,
        ValidationURL: process.env.VALIDATION_URL
    };
    let headers = {
        'Authorization': `Bearer ${authenticate()}`,
        'Content-Type': "application/json"
    };
    let base_safaricom_url = process.env.SANDBOX_URL
    if(process.env.ENV === "production") {
        base_safaricom_url = process.env.LIVE_URL
    }
    let url = `${base_safaricom_url}/mpesa/c2b/v1/registerurl`;
    axios.post(url,payload,{
        headers:headers
    }).then(resp=>{
        console.log(resp.data);
    }).catch(err=>{
        console.error(err);
    }).then(()=>{

    });
};
simulate=()=>{
    let payload = {
        ShortCode: process.env.SHORTCODE,
        CommandID: "CustomerPayBillOnline", //CustomerPayBillOnline|CustomerBuyGoodsOnline
        Amount: 5,
        Msisdn: process.env.TEST_MSISDN,
        BillRefNumber: fake.text(max_nb_chars=10)
    };
    let headers = {
        'Authorization': `Bearer ${authenticate()}`,
        'Content-Type': "application/json"
    };
    let base_safaricom_url = process.env.SANDBOX_URL;
    if(process.env.ENV === "production") {
        base_safaricom_url = process.env.LIVE_URL
    }
    let url = `${base_safaricom_url}{/mpesa/c2b/v1/simulate}`;
    axios.post(url,payload,{
        headers:headers
    }).then(resp=>{
        console.log(resp.data);
    }).catch(err=>{
        console.error(err);
    }).then(()=>{

    });
};