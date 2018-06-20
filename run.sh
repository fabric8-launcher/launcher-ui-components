#!/bin/bash

#################################################
# Here you can find basic setup for this script #
#################################################

if [ -z "$BACKEND" ]; then

    # Default backend will be used if BACKEND variable is not set before.
    # Choose (uncomment) one of the 3 backend options below.

    BACKEND=LOCAL
    #BACKEND=PROD_PREVIEW
    #BACKEND=PROD

fi

case "$BACKEND" in
"LOCAL")
    # Local backend
    export LAUNCHER_BACKEND_URL=http://localhost:8080/api/
    if [ -z "$KEYCLOAK" ]; then

        # Default KeyCloak will be used if KEYCLOAK variable is not set before.
        # Choose (uncomment) one of the 3 KeyCloak options below.

        KEYCLOAK=NO
        #KEYCLOAK=OFFICIAL
        #KEYCLOAK=LOCAL

    fi
    ;;
"PROD_PREVIEW")
    # Official KeyCloak
    export KEYCLOAK=OFFICIAL
    export LAUNCHER_BACKEND_URL=https://forge.api.prod-preview.openshift.io/api
    ;;
"PROD")
    # Local KeyCloak
    export KEYCLOAK=OFFICIAL
    export LAUNCHER_BACKEND_URL=https://forge.api.openshift.io/api
    ;;
*)
    echo ERROR: Failed to setup environment. Please choose a BACKEND mode.
    [ $PS1 ] && return || exit;
    ;;
esac

case "$KEYCLOAK" in
"NO")
    # No KeyCloak
    unset LAUNCHER_KEYCLOAK_URL
    unset LAUNCHER_KEYCLOAK_REALM
    ;;
"OFFICIAL")
    # Official KeyCloak
    export LAUNCHER_KEYCLOAK_URL=https://sso.openshift.io/auth
    export LAUNCHER_KEYCLOAK_REALM=rh-developers-launch
    ;;
"LOCAL")
    # Local KeyCloak
    export LAUNCHER_KEYCLOAK_URL=http://localhost:8280/auth
    export LAUNCHER_KEYCLOAK_REALM=launch
    ;;
*)
    echo ERROR: Failed to setup environment. Please choose a KEYCLOAK mode.
    [ $PS1 ] && return || exit;
    ;;
esac



yarn install
yarn start

