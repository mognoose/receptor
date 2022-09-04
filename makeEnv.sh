#!/bin/bash

if [ -z $1 ]
  then
    read -p "Space ID: " spaceid
  else
    spaceid=$1
fi
if [ -z $2 ]
  then
    read -p "Environment: (Default: 'master')" env
    if [ -z $env ]
    then
      env="master"
    fi
  else
    env=$2
fi
if [ -z $3 ]
  then
    read -p "Content Delivery API - access token: " cda
  else
    cda=$3
fi
if [ -z $4 ]
  then
    read -p "Content Management API -access token: " cma
  else
    cma=$4
fi
echo "Creating .env file with following content:"
env="\nVUE_APP_CTF_SPACE_ID=$spaceid\nVUE_APP_CTF_ENVIRONMENT=$env\nVUE_APP_CTF_CDA_ACCESS_TOKEN=$cda\nVUE_APP_CTF_CMA_ACCESS_TOKEN=$cma"
echo -e $env

echo -e $env >> .env