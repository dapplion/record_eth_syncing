#!/bin/bash

export URL=$1

git clone https://github.com/dapplion/record_eth_syncing.git
cd record_eth_syncing
docker-compose up -d --build