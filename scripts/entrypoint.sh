#!/usr/bin/bash

SETTINGS="/usr/share/nginx/html/settings.json"
APP_JS="/usr/share/nginx/html/app*.js"
INDEX="/usr/share/nginx/html/index.html"

if [ -n "${LAUNCHPAD_BACKEND_URL}" ]; then
    sed -i.bckp 's#"backend_url": ".*"#"backend_url": "'${LAUNCHPAD_BACKEND_URL}'"#' ${SETTINGS}
fi

if [ -n "${LAUNCHPAD_MISSIONCONTROL_URL}" ]; then
    sed -i.bckp 's#"mission_control_url": ".*"#"mission_control_url": "'${LAUNCHPAD_MISSIONCONTROL_URL}'"#' ${SETTINGS}
fi

if [ -n "${LAUNCHPAD_KEYCLOAK_URL}" ]; then
    sed -i.bckp 's#realm:.*,clientId#realm:"'${LAUNCHPAD_KEYCLOAK_REALM}'",url:"'${LAUNCHPAD_KEYCLOAK_URL}'",clientId#' ${APP_JS}
fi

if [ -n "${LAUNCHPAD_TRACKER_SEGMENT_TOKEN}" ]; then
    sed -i.bckp "s#{SegmentTrackerToken}#${LAUNCHPAD_TRACKER_SEGMENT_TOKEN}#" ${INDEX}
else
    # This is a pretty flaky way to remove the analytics script, any change to
    # the original script most likely will need changes here as well
    sed -i.bckp 's#<script>!function.*}}..<\/script>##' ${INDEX}
fi

exec /run.sh
