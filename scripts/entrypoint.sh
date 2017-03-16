#!/usr/bin/bash

SETTINGS="/usr/share/nginx/html/settings.json"

if [ -n "${BACKEND_URI}" ]; then
    sed -i.bckp 's#"backend_url": ".*"#"backend_url": "'${BACKEND_URI}'"#' ${SETTINGS}
fi

exec /run.sh
