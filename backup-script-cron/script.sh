#!/bin/sh# 

#S3 bucket name
BUCKET=backup-name-bucket/backups-name-folder/

# Linux user account
USER=ubuntu   # use your user name

# Backup directory
DEST=/home/$USER/backups/dump


# Dump z2p & poststodos
mongodump --db demoDB --out $DEST   #change demoBD to your database-name

# File name
TIME=`/bin/date --date='+5 hour 30 minutes' '+%d-%m-%Y-%I-%M-%S-%p'`

# Tar file of backup directory
TAR=$DEST/../$TIME.tar

# Create tar of backup directory
/bin/tar cvf $TAR -C $DEST .

# Upload tar to s3
#/usr/bin/local/aws s3 cp $TAR s3://$BUCKET
/usr/local/bin/aws s3 cp $TAR s3://$BUCKET


# Remove tar file locally
/bin/rm -f $TAR

# Remove backup directory
/bin/rm -rf $DEST

# All done
#echo “Backup available at https://s3.amazonaws.com/$BUCKET/$TIME.tar