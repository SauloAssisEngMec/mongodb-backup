# mondodb-backup

This repository was created to explain how automate MongoDB backup and restore using different ways. We can use automate Tools like cron job, Task Scheduler, aws lambda github actions all tools that allow you scheduler a trigger a event. Furthermore we can use nodejs or scripts bash to connect cloud with local machine. Lastly we need use a storage to save the database files e.g like s3 bucket, for instance. At the end theres more information and overview about different ways of backup e its characteristics.

## automate backup using cron job from linux or Task Scheduler (on Windows), aws S3 and aws EC2.

### Cron (cron utility is a job scheduler from linux)

Here we will use Cron jobs. Cron is a job scheduling utility present in linux (ubuntu here)like systems. The crond daemon enables cron functionality and runs in background. The cron reads the crontab for running predefined scripts. So you can configure a cron job to schedule scripts or other commands to run automatically. So there a little price to automate something different of other system of scheduling like lambda aws(triggered by events) or any other paid scheduler tool.

### cretae a s3 bucket

create a s3 bucket in a AWS

1 - open AWS account

2 - create s3

3 - create or use IAM rules

### Configure IAM user in EC2.

here we can use "Aws cli" or "s3cmd" for get a connection via ssh
with instance EC2. see articles abaixo.

### creating script (see e.g script in folder backup-script-cron)

Some code that will sync data from local(iin my case the local is an AWS EC2 instance that is hosting a mongoDB database) to s3 bucket.

note that to config create a user in CLI, you should connect ec2 to the local terminal via SSH (need add you Ip in inbound rules of aws securityGroup to get permission) then install AWS CLI, run some commands for these.

[[article about this approach](https://www.codeproject.com/Tips/547759/Automating-backup-for-MongoDB-using-CRON-and-S3CMD)

[[see more](https://www.linkedin.com/pulse/automate-backup-mongodb-amazon-s3-using-cron-tool-aws-shukla/)

### nodejs

npm init -y (start node env)

required libs:

npm install aws-sdk
npm install dontenv

yarn add aws-sdk
yarn add dontenv

### s3

create a s3 bucket in a AWS

1 - open AWS account

2 - create s3

3 - create or use IAM rules

### mongodump and mongorestore

mongodump is a utility that creates a binary export of a database's contents. mongodump can export data from:

1 - Standalone deployments
2 - Replica sets
3 - Sharded clusters
4 - Serverless instances

As you can see, its necessary install this tools mongodump e mongorestore to help us create a backup and restore using this functions bellow:

To backup (using mongodump)

mongodump --uri ${uri} --gzip --archive=${dumpPath}

To restore (using mongorestore )
mongorestore --uri ${uri} --gzip --archive=${dumpPath}

Command to install:

[See more about this tools](https://www.mongodb.com/docs/database-tools/mongodump/) AND
[install](https://www.mongodb.com/docs/database-tools/installation/installation-linux/)

### github actions

# Others Backups

## Using AWS backup or Amazon EBS snapshots

If you're running MongoDB on an EC2 instance in AWS, the AWS backup services, like Amazon EBS snapshots or AWS Backup, can be used to back up the entire EC2 instance, including the MongoDB data and configuration.

When you take a snapshot of the EBS volume attached to the EC2 instance, it captures the entire volume, including the MongoDB data files and configuration files. This allows you to restore the entire EC2 instance to a previous state, including the MongoDB data, if needed.

If you're using AWS Backup, it can also be configured to back up the entire EC2 instance, which would include the MongoDB data and configuration. You can set up backup policies to define how often backups are taken and how long they are retained.

In both cases, it's important to ensure that your MongoDB data is stored on a durable EBS volume so that it is included in the backu

pros: easier and more efficient
cons: high price

[see more](https://www.youtube.com/watch?v=37X_LjD54k4&t=11s)

[see more](https://www.youtube.com/watch?v=a0w-fc4WoTY&list=PLQHh55hXC4yr8HiX_8LHiu0UyPbLkg3Tv&index=1)

## Use a cron job (on Linux) or

1 - MongoDB Tools: Install the MongoDB tools, specifically mongodump, on the server where MongoDB is running. This tool is used to create a backup of the MongoDB database.
2 - Script the Backup Process: Write a script that uses mongodump to create a backup of the MongoDB database and then uploads the backup to Amazon S3 using the AWS CLI or an SDK
3 - Schedule the Script: Use a cron job (on Linux) or Task Scheduler (on Windows) to schedule the script to run at the desired frequency (e.g., daily, weekly).

pros: easier and cheaper

## Using aws lambda and cloudWatch

To automate MongoDB database backups to Amazon S3, you can use AWS Lambda along with CloudWatch Events to schedule the backups. Overview Steps:

1 - Create an AWS Lambda Function: Write a Lambda function that uses the mongodump command to create a backup of your MongoDB database and then uploads the backup to S3 using the AWS SDK.

2 - Set Up a CloudWatch Event Rule: Create a CloudWatch Event rule that triggers the Lambda function at the desired frequency (e.g., daily, weekly).

3 - Configure IAM Roles: Ensure that the Lambda function has the necessary permissions to access MongoDB (if it's running on an EC2 instance) and to write to the S3 bucket.

4 - Test and Monitor: Test the setup to ensure that backups are being created and uploaded correctly. Monitor the CloudWatch Logs for any errors or issues.

[see how do it](https://github.com/llangit/lambda-mongocluster-s3)
