const AWS = require('aws-sdk');
require('dotenv').config();

const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region: 'eu-west-1'
});
const sts = new AWS.STS({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region: 'eu-west-1'
});

(async () => {
    try {
        const info = await s3.headObject({
            Bucket: 'bensu-bucket',
            Key: 'hello.txt'
        }).promise();

        console.log("Uploader:", info.Metadata.uploader);
    }
    catch (err) {
        console.error(`Upload thất bại: ${err.message}`);
        throw err;
    }

})();




// /*
// @param { string } bucket
// @param { string } key
// @param { Buffer | string } body
// @param { string } contentType
// */
// async function uploadToS3(bucket, key, body, contentType = 'application/octet-stream') {


//     try {
//         const identity = await sts.getCallerIdentity().promise();
//         const uploader = identity.Arn.split('/').pop();
//         const params = {
//             Bucket: bucket,
//             Key: key,
//             Body: body,
//             ContentType: contentType,
//             Metadata: {
//                 uploader: uploader
//             }
//         };
//         const result = await s3.putObject(params).promise();
//         console.log(`Upload thành công: ${key}`);
//         return result;
//     } catch (err) {
//         console.error(`Upload thất bại: ${err.message}`);
//         throw err;
//     }
// }

// (async () => {
//     await uploadToS3(
//         "bensu-bucket",
//         "hello.txt",
//         "hello world",
//         "text/plain"
//     );
// })();
