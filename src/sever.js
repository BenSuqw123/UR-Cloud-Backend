const AWS = require('aws-sdk');
require('dotenv').config();
const { s3, sts } = require('./config/Cloud');
const { uploadToS3, showUser } = require('./services/CRUDServices');
showUser();




// (async () => {
//     await uploadToS3(
//         "bensu-bucket",
//         "hello.txt",
//         "hello world",
//         "text/plain"
//     );
// })();
