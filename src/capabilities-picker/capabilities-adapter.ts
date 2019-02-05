import {Capability} from "launcher-client";

export function capabilityToItem(c: Capability) {
  return {
    id: c.module,
    name: c.name,
    description: c.description,
    category: c.metadata.category,
    icon: c.metadata.icon,
    fields: c.props,
    selected: c.module === 'welcome',
    disabled: c.module === 'welcome'
  };
}