#!/usr/bin/env bash

cp template.header.yml template_generated.yml

OBJECTS=(bc is dc svc route)
APPS=(front-generator)

for i in ${OBJECTS[@]}; do
        printf "%s" "- " >> template.yml
        echo "$(oc get ${i}/${APPS[0]} --export -o yaml)" >> template_generated.yml
done

oc get is/node --export -o yaml >> template_generated.yml

# TO BE TESTED ->
# oc export is,bc,dc,svc,route -l name=front-generator --as-template=front-template -o json
# oc export is,bc,dc,svc,route --as-template=backend-template -o yml >> backend.yml