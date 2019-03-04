import * as React from 'react';
import { useEffect, useState } from 'react';
import { InProgressIcon } from '@patternfly/react-icons';
import style from './data-loader.module.scss';

export function Spin(props: { children: React.ReactNode }) {
  return (
    <span className={style.spin}>
      {props.children}
    </span>
  );
}

export function Loader() {
  return (
    <div className={style.loader}><Spin><InProgressIcon/></Spin></div>
  );
}

export function DataLoader<T>(props: { loader: () => Promise<T>, children: ((arg: T) => any) | React.ReactNode }) {
  const [data, setData] = useState<{ result: T } | undefined>(undefined);
  const loadData = async () => {
    const result = await props.loader();
    setData({ result });
  };
  useEffect(() => {
    if (!data) {
      loadData().catch(err => console.error('Error while loading data.', err));
    }
  }, [data]);
  if (!!data) {
    if (props.children instanceof Function) {
      return props.children(data.result);
    }
    return props.children;
  }
  return (<Loader />);
}
