#!/usr/bin/bash

SETTINGS="/usr/share/nginx/html/launch/settings.json"
APP_JS="/usr/share/nginx/html/launch/app*.js"
INDEX="/usr/share/nginx/html/launch/index.html"

if [ -n "${LAUNCHER_BACKEND_URL}" ]; then
    sed -i.bckp 's#"backend_url": ".*"#"backend_url": "'${LAUNCHER_BACKEND_URL}'"#' ${SETTINGS}
fi

if [ -n "${LAUNCHER_MISSIONCONTROL_URL}" ]; then
    sed -i.bckp 's#"mission_control_url": ".*"#"mission_control_url": "'${LAUNCHER_MISSIONCONTROL_URL}'"#' ${SETTINGS}
fi

if [ -n "${LAUNCHER_KEYCLOAK_URL}" ]; then
    sed -i.bckp 's#realm:.*,clientId#realm:"'${LAUNCHER_KEYCLOAK_REALM}'",url:"'${LAUNCHER_KEYCLOAK_URL}'",clientId#' ${APP_JS}
fi

if [ -n "${LAUNCHER_TRACKER_SEGMENT_TOKEN}" ]; then
    sed -i.bckp "s#{SegmentTrackerToken}#${LAUNCHER_TRACKER_SEGMENT_TOKEN}#" ${INDEX}
else
    # This is a pretty flaky way to remove the analytics script, any change to
    # the original script most likely will need changes here as well
    sed -i.bckp 's#<script>!function.*}}..<\/script>##' ${INDEX}
fi

exec /run.sh
