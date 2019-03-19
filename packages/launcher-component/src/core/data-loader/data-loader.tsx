import * as React from 'react';
import { useEffect, useState } from 'react';
import { InProgressIcon } from '@patternfly/react-icons';
import { AlertError } from '../stuff';

import style from './data-loader.module.scss';

export function Spin(props: { children: React.ReactNode }) {
  return (
    <span className={style.spin}>
      {props.children}
    </span>
  );
}

export function Loader(props?: { error?: any; }) {
  return (
    <div className={style.loader}>
      {!props || !props!.error &&
        <Spin><InProgressIcon /></Spin>
      }
      {props && props.error &&
        <AlertError error={props.error} />
      }
    </div>
  );
}

export function DataLoader<T>(props: { loader: () => Promise<T>, children: ((arg: T) => any) | React.ReactNode }) {
  const [data, setData] = useState<{ result: T } | undefined>(undefined);
  const [error, setError] = useState();
  const loadData = async () => {
    const result = await props.loader();
    setData({ result });
  };
  useEffect(() => {
    if (!data) {
      loadData().catch(err => setError(err));
    }
  }, [data]);
  if (!!data) {
    if (props.children instanceof Function) {
      return props.children(data.result);
    }
    return props.children;
  }
  return (<Loader error={error} />);
}
