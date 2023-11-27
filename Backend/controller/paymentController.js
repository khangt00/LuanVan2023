// const Flutterwave = require ("flutterwave-node-v3");

const moment = require('moment/moment');

// const flw = new Flutterwave(
//   process.env.FLW_PUBLIC_KEY,
//   process.env.FLW_SECRET_KEY
// );

// const checkout = async (req, res) => {
//   const option = {
//     name:"abuzar",
//     // amount: 2000,
//     currency: "NGN",
//     interval: "monthly",
//   };
//   const order = await flw.PaymentPlan.create(option);
//   console.log(order);
//   res.json({
//     success: true,
//     order,
//   });
// };

// const paymentVerification = async (req, res) => {
//   const { OrderId, paymentId } = req.body;
//   console.log("OrderId = ",OrderId, "paymentId =", paymentId);
//   res.json({
//     OrderId,
//     paymentId,
//   });
// };

// module.exports = {
//   checkout,
//   paymentVerification,
// };

function sortObject(obj) {
	let sorted = {};
	let str = [];
	let key;
	for (key in obj){
		if (obj.hasOwnProperty(key)) {
		str.push(encodeURIComponent(key));
		}
	}
	str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

exports.VNPayUrl = async(req, res) => {
  var ipAddr = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
    
        // var config = require('config');
        // var dateFormat = require('dateformat');
    
        
        var tmnCode = process.env.vnp_TmnCode;
        var secretKey = process.env.vnp_HashSecret;
        var vnpUrl = process.env.vnp_Url
        var returnUrl ="http://localhost:5000/";
    
        var date = new Date();
    
        var createDate = moment(date).format("YYYYMMDDHHmmss");
        // var orderId = "65642702930008d27f6c8938";
        var orderId = req.query.orderId;
        var amount = req.query.amount;
        // var amount = "3000000";
        // console.log(amount);
        // var bankCode = req.body.bankCode;
        
        // var orderInfo = req.body.orderDescription;
        // var orderType = req.body.orderType;
        var locale = req.body.language;
        if(locale === null || locale === ''){
            locale = 'vn';
        }
        // var currCode = 'VND';
        var vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        // vnp_Params['vnp_Merchant'] = ''
        vnp_Params['vnp_Locale'] = "vn";
        vnp_Params['vnp_CurrCode'] = "VND";
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = "Thanh Toan Cho Ma Giao Dich" + orderId;
        vnp_Params['vnp_OrderType'] = "140004";
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        // if(bankCode !== null && bankCode !== ''){
        //     vnp_Params['vnp_BankCode'] = bankCode;
        // }
    
        vnp_Params = sortObject(vnp_Params);
    
        var querystring = require('qs');
        var signData = querystring.stringify(vnp_Params, { encode: false });
        var crypto = require("crypto");     
        var hmac = crypto.createHmac("sha512", secretKey);
        var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
    
        res.status(200).json({
          vnpUrl,
        })
}


