const axios=require("axios");
const {authenticate}=require("../../helper/mpesa");
const randToken = require('rand-token');
module.exports=(program)=>{
    program
        .command("register")
        .alias("reg")
        .description("Register on MPesa")
        .action(async ()=>{
            let payload = {
                ShortCode: process.env.SHORTCODE,
                ResponseType: process.env.RESPONSE_TYPE,
                ConfirmationURL: process.env.CONFIRMATION_URL,
                ValidationURL: process.env.VALIDATION_URL
            };
            authenticate().then((data)=>{
                let headers = {
                    'Authorization': `Bearer ${data.access_token}`,
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

            }).catch(error=>{
                console.error(error);
            });


        });
    program
        .command("simulate")
        .alias("sim")
        .description("Simulate Transaction")
        .option('-a, --amount [amt]', 'Amount to simulate',"5")
        .action((cmdObj)=>{
            if(process.env.ENV==="production"){
                return console.error("Cannot simulate transaction in production")
            }
            let payload = {
                ShortCode: process.env.SHORTCODE,
                CommandID: "CustomerPayBillOnline", //CustomerPayBillOnline|CustomerBuyGoodsOnline
                Amount: cmdObj.amount,
                Msisdn: process.env.TEST_MSISDN,
                BillRefNumber: randToken.generator({ chars: 'default' }).generate(6)
            };

            authenticate().then((data)=>{
                let headers = {
                    'Authorization': `Bearer ${data.access_token}`,
                    'Content-Type': "application/json"
                };
                let base_safaricom_url = process.env.SANDBOX_URL
                if(process.env.ENV === "production") {
                    base_safaricom_url = process.env.LIVE_URL
                }
                let url = `${base_safaricom_url}/mpesa/c2b/v1/simulate`;
                axios.post(url,payload,{
                    headers:headers
                }).then(resp=>{
                    console.log(resp.data);
                }).catch(err=>{
                    console.error(err);
                }).then(()=>{

                });

            }).catch(error=>{
                console.error(error);
            });
        });
};