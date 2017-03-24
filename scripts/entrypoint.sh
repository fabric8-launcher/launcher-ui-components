#!/usr/bin/bash

SETTINGS="/usr/share/nginx/html/settings.json"
APP_JS="/usr/share/nginx/html/app*.js"

if [ -n "${BACKEND_URL}" ]; then
    sed -i.bckp 's#"backend_url": ".*"#"backend_url": "'${BACKEND_URL}'"#' ${SETTINGS}
fi

if [ -n "${KEYCLOAK_SKIP}"]; then
    sed -i.bckp 's/keycloakSkip:!./keycloakSkip:'${KEYCLOAK_SKIP}'/g' ${APP_JS}
fi

exec /run.sh
