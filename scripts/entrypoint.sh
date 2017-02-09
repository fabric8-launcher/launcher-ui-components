#!/usr/bin/bash

SETTINGS="/usr/share/nginx/html/settings.json"

if [ -n "${OBSIDIAN_BACKEND_SERVICE_HOST}" ]; then
   BACKEND_URI="http://${OBSIDIAN_BACKEND_SERVICE_HOST}:${OBSIDIAN_BACKEND_SERVICE_PORT}/"
fi

if [ -n "${BACKEND_URI}" ]; then
    sed -i.bckp 's#"backend_url": ".*"#"backend_url": "'${BACKEND_URI}'"#' ${SETTINGS}
fi

exec /run.sh
