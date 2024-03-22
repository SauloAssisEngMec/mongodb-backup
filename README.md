# mondodb-backup

This repository was created to explain how automate MongoDB backup and restore using node js AWS s3 bucket and github action.

## nodejs

npm init -y (start node env)
libs to:

aws-sdk
dontenv

## s3

create a s3 bucket in a AWS

1 - open AWS account
2 - search s3
3 -

## mongodump and mongorestore

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

[See more about this tools](https://www.mongodb.com/docs/database-tools/mongodump/)
[install](https://www.mongodb.com/docs/database-tools/installation/installation-linux/)

### github actions
