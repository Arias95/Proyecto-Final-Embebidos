HOST = 192.168.100.7
DIR = /home/root/final

all: index.js
	scp -r . root@$(HOST):$(DIR)