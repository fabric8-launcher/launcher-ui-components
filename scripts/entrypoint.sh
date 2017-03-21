#!/usr/bin/bash

SETTINGS="/usr/share/nginx/html/settings.json"

if [ -n "${BACKEND_URL}" ]; then
    sed -i.bckp 's#"backend_url": ".*"#"backend_url": "'${BACKEND_URL}'"#' ${SETTINGS}
fi

exec /run.sh
