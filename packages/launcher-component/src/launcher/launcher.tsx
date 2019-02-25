import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Grid,
  GridItem,
  Title
} from '@patternfly/react-core';
import * as React from 'react';
import { useState } from 'react';
import { CreateNewAppFlow } from '../flows/create-new-app-flow';
import { CreateExampleAppFlow } from '../flows/create-example-app-flow';
import style from './launcher.module.scss';
import { ImportExistingFlow } from '../flows/import-existing-flow';

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
              <CardHeader><Title size="lg">Create a new Application</Title></CardHeader>
              <CardBody>Pick the capabilities that you want your new application to have.</CardBody>
              <CardFooter>
                <Button variant="primary" onClick={createNewApp}>Go!</Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem span={4}>
            <Card className={style.card}>
              <CardHeader><Title size="lg">Deploy an Example Application</Title></CardHeader>
              <CardBody>Choose from a variety of Red Hat certified examples to generate the
                foundation for a new application in the OpenShift ecosystem.</CardBody>
              <CardFooter>
                <Button variant="primary" onClick={createExampleApp}>Go!</Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem span={4}>
            <Card className={style.card}>
              <CardHeader><Title size="lg">Import an existing Application</Title></CardHeader>
              <CardBody>Import your own existing application in the OpenShift ecosystem.</CardBody>
              <CardFooter>
                <Button variant="primary" onClick={importApp}>Go!</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
      )}
      {type && type === Type.NEW && (
        <CreateNewAppFlow onCancel={resetType}/>
      )}
      {type && type === Type.EXAMPLE && (
        <CreateExampleAppFlow onCancel={resetType}/>
      )}
      {type && type === Type.IMPORT && (
        <ImportExistingFlow onCancel={resetType}/>
      )}

    </div>
  );
}
