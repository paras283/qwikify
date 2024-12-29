const express = require('express');
const PaytmChecksum = require('paytmchecksum');
const https = require('https');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

// Payment initiation route
router.post('/payment', async (req, res) => {
    const { amount, mobileNumber } = req.body;
    const paytmParams = {
        MID: process.env.PAYTM_MERCHANT_ID,
        ORDERID: `ORD_${new Date().getTime()}`,
        TXN_AMOUNT: amount.toString(),
        CUST_ID: mobileNumber,
        INDUSTRY_TYPE_ID: process.env.PAYTM_INDUSTRY_TYPE_ID,
        CHANNEL_ID: process.env.PAYTM_CHANNEL_ID,
        WEBSITE: process.env.PAYTM_WEBSITE,
        CALLBACK_URL: process.env.PAYTM_CALLBACK_URL,
    };

    const paytmChecksum = await PaytmChecksum.generateSignature(paytmParams, process.env.PAYTM_MERCHANT_KEY);
    paytmParams.CHECKSUMHASH = paytmChecksum;

    res.json({
        ...paytmParams,
        PAYTM_TXN_URL: 'https://securegw-stage.paytm.in/order/process',
    });
});

// Callback route for payment verification
router.post('/callback', async (req, res) => {
    const paytmParams = req.body;
    console.log('Callback Data:', paytmParams);
  
    if (!paytmParams || !paytmParams.CHECKSUMHASH) {
      return res.status(400).json({ error: 'Invalid callback data' });
    }
  
    const { CHECKSUMHASH, ...restParams } = paytmParams;
    const dataString = Object.keys(restParams)
      .sort()
      .map((key) => `${key}:${restParams[key]}`)
      .join('|');
  
    try {
      const isValidChecksum = PaytmChecksum.verifySignature(
        dataString,
        process.env.PAYTM_MERCHANT_KEY,
        CHECKSUMHASH
      );
  
      if (isValidChecksum) {
        // Process successful payment logic here
        res.status(200).json({ success: true, message: 'Checksum verified' });
      } else {
        res.status(400).json({ error: 'Checksum mismatch' });
      }
    } catch (error) {
      console.error('Verification error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

module.exports = router;
