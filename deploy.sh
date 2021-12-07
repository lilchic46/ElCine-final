#!/bin/bash

echo "Step 1: Push the source up server ..."
# copy multi file from local to remote

#scp -r app/* truongtx@139.59.106.245:/home/truongtx/wefunder/app
rsync -rav -e ssh --exclude=*/__pycache__ --exclude=*/migrations --exclude=env --exclude=docs \
  ./* truongtx@139.59.106.245:/home/truongtx/elcine/

