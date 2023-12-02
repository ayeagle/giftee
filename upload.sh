#!/bin/bash
set -e

source .env

PEM_CONTENTS="$CONNEX_PEM"

PEM_FILE=$(mktemp)
echo "$PEM_CONTENTS" > "$PEM_FILE"
chmod 400 "$PEM_FILE"

echo 'Here we a-uplooaaaaaddddd!'
scp -rp -i "$PEM_FILE" "server" "$AWS_ADDRESS"

rm "$PEM_FILE"
