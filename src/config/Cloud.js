const AWS = require('aws-sdk');


const awsConfig = {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region: 'eu-west-1'
};

const s3 = new AWS.S3(awsConfig);
const sts = new AWS.STS(awsConfig);

module.exports = { s3, sts };