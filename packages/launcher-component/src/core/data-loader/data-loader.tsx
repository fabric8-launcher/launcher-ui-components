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

export function DataLoader<T>(props: { loader: () => Promise<T>, default: T, children: ((T) => any) | React.ReactNode }) {
  const [data, setData] = useState<T>(props.default);
  const [loaded, setLoaded] = useState<boolean>(false);
  const loadData = async () => {
    const d = await props.loader();
    setData(d);
    setLoaded(true);
  };
  useEffect(() => {
    if (!loaded) {
      loadData().catch(err => console.error('Error while loading data.', err));
    }
  }, [loaded]);
  if (loaded) {
    if (props.children instanceof Function) {
      return props.children(data);
    }
    return props.children;
  }
  return (<div className={style.loader}><Spin><InProgressIcon/></Spin></div>);
}
