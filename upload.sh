#!/bin/bash
# set -e

source .env

PEM_CONTENTS="$CONNEX_PEM"

# echo "$PEM_CONTENTS"
echo "$AWS_ADDRESS"

PEM_FILE=$(mktemp)

if [ -f "$PEM_FILE" ]; then
    echo "Temporary file created: $PEM_FILE"
else
    echo "Error: Temporary file creation failed."
    exit 1  # Exit the script with an error code
fi
echo "$PEM_CONTENTS" > "$PEM_FILE"
chmod 400 "$PEM_FILE"

echo 'Here we a-uplooaaaaaddddd!'
scp -rp -i "$PEM_FILE" "server" "$AWS_ADDRESS"

rm "$PEM_FILE"
