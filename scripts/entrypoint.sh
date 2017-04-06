#!/usr/bin/bash

SETTINGS="/usr/share/nginx/html/settings.json"
APP_JS="/usr/share/nginx/html/app*.js"

if [ -n "${LAUNCHPAD_BACKEND_URL}" ]; then
    sed -i.bckp 's#"backend_url": ".*"#"backend_url": "'${LAUNCHPAD_BACKEND_URL}'"#' ${SETTINGS}
fi

if [ -n "${LAUNCHPAD_KEYCLOAK_SKIP}" ]; then
    sed -i.bckp 's/keycloakSkip:!./keycloakSkip:'${LAUNCHPAD_KEYCLOAK_SKIP}'/g' ${APP_JS}
fi

if [ -n "${LAUNCHPAD_KEYCLOAK_URL}" ]; then
    sed -i.bckp 's#realm:.*,clientId#realm:"'${LAUNCHPAD_KEYCLOAK_REALM}'",url:"'${LAUNCHPAD_KEYCLOAK_URL}'",clientId#' ${APP_JS}
fi

exec /run.sh
