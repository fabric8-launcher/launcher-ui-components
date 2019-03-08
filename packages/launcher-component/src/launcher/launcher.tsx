import { Button, Card, CardBody, CardFooter, CardHeader, Grid, GridItem } from '@patternfly/react-core';
import * as React from 'react';
import { useState } from 'react';
import { CreateNewAppFlow } from '../flows/create-new-app-flow';
import { DeployExampleAppFlow } from '../flows/deploy-example-app-flow';
import style from './launcher.module.scss';
import { ImportExistingFlow } from '../flows/import-existing-flow';
import { CatalogIcon, FileImportIcon, TopologyIcon } from '@patternfly/react-icons';

enum Type {
  NEW = 'NEW', EXAMPLE = 'EXAMPLE', IMPORT = 'IMPORT'
}

export function Launcher() {
  const [type, setType] = useState<Type | undefined>(undefined);
  const createNewApp = () => setType(Type.NEW);
  const createExampleApp = () => setType(Type.EXAMPLE);
  const importApp = () => setType(Type.IMPORT);
  const resetType = () => setType(undefined);
  return (
    <div id="launcher-component" className={style.launcher}>
      {!type && (
        <Grid gutter="md" className={style.menu}>
          <GridItem span={4}>
            <Card className={style.card}>
              <CardHeader className={style.flowHeader}><TopologyIcon /></CardHeader>
              <CardBody>You start your own new application
                by picking the capabilities you want (Http Api, Persistence, ...).
                We take care of setting everything's up to get you started.</CardBody>
              <CardFooter>
                <Button variant="primary" onClick={createNewApp}>Create a New Application</Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem span={4}>
            <Card className={style.card}>
              <CardHeader className={style.flowHeader}><CatalogIcon /></CardHeader>
              <CardBody>Choose from a variety of Red Hat certified examples to generate the
                foundation for a new application in the OpenShift ecosystem.</CardBody>
              <CardFooter>
                <Button variant="primary" onClick={createExampleApp}>Deploy an Example Application</Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem span={4}>
            <Card className={style.card}>
              <CardHeader className={style.flowHeader}><FileImportIcon /></CardHeader>
              <CardBody>Import your own existing application in the OpenShift ecosystem.</CardBody>
              <CardFooter>
                <Button variant="primary" onClick={importApp}>Import an Existing Application</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
      )}
      {type && type === Type.NEW && (
        <CreateNewAppFlow onCancel={resetType}/>
      )}
      {type && type === Type.EXAMPLE && (
        <DeployExampleAppFlow onCancel={resetType}/>
      )}
      {type && type === Type.IMPORT && (
        <ImportExistingFlow onCancel={resetType}/>
      )}

    </div>
  );
}
