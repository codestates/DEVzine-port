#!/bin/bash
cd /home/ubuntu/DEVzine-port/server
sudo apt install npm
npm install
npm install pm2@latest -g
sudo apt-get update
sudo apt-get upgrade
sudo apt install redis-server
sudo mkdir -p /var/log/redis/ 
sudo touch /var/log/redis/redis-server.log 
sudo chown redis:redis /var/log/redis/redis-server.log
sudo apt-get install authbind
sudo touch /etc/authbind/byport/80
sudo chown ubuntu /etc/authbind/byport/80
sudo chmod 755 /etc/authbind/byport/80
