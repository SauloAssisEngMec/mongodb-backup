const path = require("path");
const fs = require("fs");
const AWS = require("aws-sdk");
const exec = require("./execFunction.js");

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const uri = process.env.NEW_DATABASE_URI || process.env.URI;
const backupName = process.env.BACKUP_NAME;
const bucket = process.env.BUCKET;

(async () => {
  const s3 = new AWS.S3();
  const __dirname = path.resolve();

  const dumpPath = path.resolve(__dirname, backupName);

  const input = `mongodump --uri '${uri}' --gzip --archive=${dumpPath}`;

  try {
    await exec(input);

    const readStream = fs.createReadStream(dumpPath);
    const params = {
      Bucket: bucket,
      Key: backupName,
      Body: readStream,
    };

    await s3.putObject(params).promise();

    console.log("Successful backup to s3!");
  } catch (err) {
    console.log(`Backup failed: ${err}`);
  }
})();
