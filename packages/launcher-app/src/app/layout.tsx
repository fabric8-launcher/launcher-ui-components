import {
  Brand,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  Page,
  PageHeader,
  Toolbar,
  ToolbarGroup,
  ToolbarItem
} from '@patternfly/react-core';
import * as React from 'react';
import { useState } from 'react';
import logo from './assets/logo/RHD-logo.svg';
import style from './layout.module.scss';
import { useAuthApi } from 'keycloak-react';
import { createRouterLink, useRouter } from './use-router';
import { BaseSyntheticEvent } from 'react';
import { ReactNode } from 'react';

export function Layout(props: { children: React.ReactNode }) {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const router = useRouter();
  const rootLink = createRouterLink(router, '/');
  const auth = useAuthApi();
  const logout = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    auth.logout();
  };
  let PageToolbar: ReactNode;
  if(auth.enabled && auth.user) {
    const userDropdownItems = [
      <DropdownItem onClick={logout} key="logout">Logout</DropdownItem>,
    ];
    if (auth.getAccountManagementLink()) {
      userDropdownItems.push(
        <DropdownItem component="a" href={auth.getAccountManagementLink()} target="_blank" key="manage">Manage Account</DropdownItem>
      );
    }
    PageToolbar = auth.enabled && auth.user && (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarItem>
            <Dropdown
              isPlain
              position="right"
              onSelect={() => setIsUserDropdownOpen((prev) => !prev)}
              isOpen={isUserDropdownOpen}
              toggle={<DropdownToggle onToggle={setIsUserDropdownOpen}>{auth.user.userPreferredName}</DropdownToggle>}
              dropdownItems={userDropdownItems}
            />
          </ToolbarItem>
        </ToolbarGroup>
      </Toolbar>
    );
  }

  const Header = (
    <PageHeader
      logo={<Brand src={logo} alt="Red Hat" className={style.brand} href={rootLink.href} onClick={rootLink.onClick}/>}
      logoProps={{href:process.env.PUBLIC_URL}}
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
