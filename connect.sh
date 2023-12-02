#!/bin/bash

set -e

source .env

PEM_CONTENTS="$CONNEX_PEM"

PEM_FILE=$(mktemp)
echo "$PEM_CONTENTS" > "$PEM_FILE"
chmod 400 "$PEM_FILE"

echo 'Here we a-goooooooooo!'
ssh -i "$PEM_FILE" "$AWS_ADDRESS"

rm "$PEM_FILE"
