import {DataLoader} from "../../core/data-loader/data-loader";
import React from "react";
import {RuntimeItem} from "./runtime-picker";
import {useLauncherClient} from "../../launcher-client-context";

export function runtimeMatcherByCategory(category: string) {
  return (r) => r.metadata.category.indexOf(category) >= 0;
}

export function RuntimesLoader(props: { category: string, children: (items: RuntimeItem[]) => any }) {
  const client = useLauncherClient();
  return (
    <DataLoader loader={() => client.enum('runtime.name')} default={[]}>
      { props.children }
    </DataLoader>
  );
}