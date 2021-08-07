#!/bin/bash
cd /home/ubuntu/DEVzine-port/server

export MONGO_STRING=$(aws ssm get-parameters --region ap-northeast-2 --names MONGO_STRING --query Parameters[0].Value | sed 's/"//g')
export MONGO_DATABASE=$(aws ssm get-parameters --region ap-northeast-2 --names MONGO_DATABASE --query Parameters[0].Value | sed 's/"//g')
export SESSION_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names SESSION_SECRET --query Parameters[0].Value | sed 's/"//g')

authbind --deep pm2 start app.js
