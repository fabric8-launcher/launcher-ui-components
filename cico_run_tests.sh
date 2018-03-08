#!/bin/bash

set -e

# Build
npm install
echo "NPM Install Complete: $(date) $line"
## Exec unit tests
npm test

if [ $? -ne 0 ]; then
  echo 'CICO: unit tests FAIL'
  exit 1
fi

echo "Build Complete: $(date) $line"

