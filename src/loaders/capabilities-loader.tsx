import { Capability, propsWithValuesMapper } from 'launcher-client';
import { useLauncherClient } from '../launcher-client-context';
import { DataLoader } from '../core/data-loader/data-loader';
import { CapabilityItem } from '../pickers/capabilities-picker/capabilities-picker';
import * as React from 'react';

export function capabilityToItem(c: Capability): CapabilityItem {
  return {
    id: c.module,
    name: c.name,
    description: c.description,
    category: c.metadata.category,
    icon: c.metadata.icon,
    fields: c.props,
    disabled: c.module === 'welcome'
  };
}

export function capabilityMatcherByCategories(...categories: string[]) {
  return (c: Capability) => categories.indexOf(c.metadata.category) >= 0;
}

export function CapabilitiesLoader(props: { categories: string[], children: (capabilities: Capability[]) => any }) {
  const client = useLauncherClient();
  const itemsLoader = () => client.capabilities().then(c => {
    return client.enums().then(e => {
      return c.filter(capabilityMatcherByCategories(...props.categories))
        .map(propsWithValuesMapper(e));
    });
  });
  return (
    <DataLoader loader={itemsLoader} default={[]} >
      {props.children}
    </DataLoader>
  );
}

export function CapabilitiesByModuleLoader(props: { categories: string[], children: (capabilitiesById: Map<string, Capability>) => any }) {
  return (
    <CapabilitiesLoader categories={props.categories} >
      {(capabilities) => props.children(new Map(capabilities.map(c => [c.module, c] as [string, Capability])))}
    </CapabilitiesLoader>
  );
}
