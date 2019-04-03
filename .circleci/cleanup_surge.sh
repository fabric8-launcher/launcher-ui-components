#!/bin/bash
# Split on "/" to get last part of URL, ref: http://stackoverflow.com/a/5257398/689223
URL_SPLIT=(${CIRCLE_PULL_REQUEST//\// })
PR_NUM=$(printf %s\\n "${URL_SPLIT[@]:(-1)}")
# Domain names follow the RFC1123 spec [a-Z] [0-9] [-] limited to 253 characters
# https://en.wikipedia.org/wiki/Domain_Name_System#Domain_name_syntax
# So, just replace "/" or "." with "-"

DEPLOY_APP_SUBDOMAIN=`echo "$PR_NUM-pr-app-${CIRCLE_PROJECT_REPONAME}-${CIRCLE_PROJECT_USERNAME}" | tr '[\/|\.]' '-' | cut -c1-253`
DEPLOY_APP_DOMAIN="https://${DEPLOY_APP_SUBDOMAIN}.surge.sh"

yarn surge teardown ${DEPLOY_APP_DOMAIN}

DEPLOY_STORYBOOK_SUBDOMAIN=`echo "$PR_NUM-pr-storybook-${CIRCLE_PROJECT_REPONAME}-${CIRCLE_PROJECT_USERNAME}" | tr '[\/|\.]' '-' | cut -c1-253`
DEPLOY_STORYBOOK_DOMAIN="https://${DEPLOY_STORYBOOK_SUBDOMAIN}.surge.sh"

yarn surge teardown ${DEPLOY_STORYBOOK_DOMAIN}