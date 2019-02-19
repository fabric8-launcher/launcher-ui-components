import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Grid,
  GridItem,
  Title
} from '@patternfly/react-core';
import * as React from 'react';
import { useState } from 'react';
import { CreateNewAppFlow } from './flows/create-new-app-flow';
import * as style from './launcher.module.scss';
import { CubesIcon } from '@patternfly/react-icons';

export function Launcher() {
  const [type, setType] = useState<string | undefined>(undefined);
  const createNewApp = () => setType('new');
  const createExampleApp = () => setType('example');
  const importApp = () => setType('import');
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
      {type && type === 'new' && (
        <CreateNewAppFlow onCancel={resetType}/>
      )}
      {type && type !== 'new' && (
        <EmptyState className={style.empty}>
          <EmptyStateIcon icon={CubesIcon} />
          <Title size="lg">Unavailable</Title>
          <EmptyStateBody>
            Sorry buddy, don't worry, this feature will be available soon...
          </EmptyStateBody>
          <Button variant="primary" onClick={resetType}>Back</Button>
        </EmptyState>
      )}

    </div>
  );
}
