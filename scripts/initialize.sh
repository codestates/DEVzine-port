#!/bin/bash
cd /home/ubuntu/DEVzine-port/server
sudo apt install npm
npm install
npm install pm2@latest -g
sudo apt-get update
sudo apt-get upgrade
sudo apt install redis-server
sudo chown -R redis:redis /etc/redis/redis.conf
sudo apt-get install authbind
sudo touch /etc/authbind/byport/80
sudo chown ubuntu /etc/authbind/byport/80
sudo chmod 755 /etc/authbind/byport/80
