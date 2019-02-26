import { Brand, Button, ButtonVariant, Page, PageHeader, Toolbar, ToolbarGroup, ToolbarItem } from '@patternfly/react-core';
import * as React from 'react';
import logo from './assets/logo/RHD-logo.svg';
import { CogIcon } from '@patternfly/react-icons';
import style from './layout.module.scss';

export function Layout(props: { children: React.ReactNode }) {
  const PageToolbar = (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarItem>
          <Button id="nav-toggle" aria-label="Overflow actions" variant={ButtonVariant.plain}>
            <CogIcon/>
          </Button>
        </ToolbarItem>
      </ToolbarGroup>
    </Toolbar>
  );

  const Header = (
    <PageHeader
      logo={<Brand src={logo} alt="Red Hat" className={style.brand}/>}
      toolbar={PageToolbar}
      className={style.header}
    />
  );

  return (
    <React.Fragment>
      <Page header={Header}>
        {props.children}
      </Page>
    </React.Fragment>
  );
}
