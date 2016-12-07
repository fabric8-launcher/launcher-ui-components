#!/bin/bash

echo "building..."
npm run build:prod
echo "build..."
echo "copy..."
cp -r dist out
echo "copied"