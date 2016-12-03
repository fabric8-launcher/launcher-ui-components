#!/usr/bin/env bash

cp template.bk.yml template.yml

OBJECTS=(bc is dc svc route)
APPS=(front-generator)

for i in ${OBJECTS[@]}; do
        printf "%s" "- " >> template.yml
        echo "$(oc get ${i}/${APPS[0]} --export -o yaml)" >> template.yml
done