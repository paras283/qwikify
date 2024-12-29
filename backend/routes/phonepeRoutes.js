const express = require("express");
const router = express.Router();
const crypto = require('crypto');
const axios = require('axios');

function generateTransactionID() {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random()* 1000000);
    const merchantPrefix = 'T';
    const transactionID = `${merchantPrefix}${timestamp}${randomNum}`;
    return transactionID
}

// payment route

router.post("/payment", async (req, res) =>{
    try{
        const {number, amount} = req.body
        const data = {
            merchantId: 'PGTESTPAYUAT',
            merchantTransactionId: generateTransactionID(),
            merchantUserId: 'MUID9EFW8E9F89EWF8C',
            mobileNumber: number,
            amount: amount*100,
            redirectUrl: `http://localhost:5000/api/phonepe/status`,
            redirectMode: 'POST',
            paymentInstrument: {
                type: 'PAY_PAGE'
            }

        };
        const payload = JSON.stringify(data);
        const payloadMain = Buffer.from(payload).toString('base64');
        const key = '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399';
        const keyIndex = 1;
        const string = payloadMain + '/pg/v1/pay' + key;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###' + keyIndex;
        console.log(checksum)
        const URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";


        const options = {
            method: 'POST',
            url: URL,
            headers: {
                accept: 'application/json',
                'Content-Type' : 'application/json',
                'X-VERIFY': checksum
            },
            data: {
                request: payloadMain
            }
        };

        axios
        .request(options)
        .then(function (response){
            return res.status(200).send(response.data.data.instrumentResponse.redirectInfo.url)
        })
        .catch(function(error){
            console.error(error);
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        })
    }
})

// payment status

router.post('/status', async(req,res) => {
    return console.log(res.req.body)
})

module.exports = router;