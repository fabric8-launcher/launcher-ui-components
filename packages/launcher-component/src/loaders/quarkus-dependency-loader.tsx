import React from "react";
import { DependencyItem } from "launcher-client";
import { useLauncherClient } from "../contexts/launcher-client-context";
import { DataLoader } from "..";

export function QuarkusDependencyLoader(props: { children: (items: DependencyItem[]) => any }) {
  const client = useLauncherClient();
  const itemsLoader = () => client.dependencyItems();
  return (
    <DataLoader loader={itemsLoader}>
      {props.children}
    </DataLoader>
  );
}