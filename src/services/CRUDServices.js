const fs = require('fs');
const { s3, sts } = require('../config/Cloud');

/**
 * Upload file lên S3 kèm metadata uploader
 * @param {string} bucket 
 * @param {string} key 
 * @param {string} filePath 
 */
const uploadToS3 = async (bucket, key, filePath) => {
    try {
        const identity = await sts.getCallerIdentity().promise();
        const uploader = identity.Arn.split('/').pop();
        const fileBody = fs.readFileSync(filePath);

        const params = {
            Bucket: bucket,
            Key: key,
            Body: fileBody,
            ContentType: 'text/plain',
            Metadata: { uploader }
        };

        const result = await s3.putObject(params).promise();
        console.log("Upload thành công:", key);
        return result;
    } catch (err) {
        console.error("Upload lỗi:", err.message);
        throw err;
    }
}
const showUser = async () => {
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

};
module.exports = { uploadToS3, showUser };
