#!/usr/bin/bash

SETTINGS="/usr/share/nginx/html/settings.json"

if [ -n "${BACKEND_URL}" ]; then
    sed -i.bckp 's#"backend_url": ".*"#"backend_url": "'${BACKEND_URL}'"#' ${SETTINGS}
fi

if [ -n "${KEYCLOAK_SKIP}"]; then
    sed -i.bckp 's/keycloakSkip:!./keycloakSkip:'${KEYCLOAK_SKIP}'/g' app*.js
fi

exec /run.sh
