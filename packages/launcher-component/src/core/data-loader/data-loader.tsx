import { useEffect, useState } from 'react';
import * as React from 'react';
import { InProgressIcon } from '@patternfly/react-icons';
import style from './data-loader.module.scss';

export function Spin(props: { children: React.ReactNode }) {
  return (
    <span className={style.spin}>
      {props.children}
    </span>
  );
}

export function DataLoader<T>(props: { loader: () => Promise<T>, default: T, children: (T) => any }) {
  const [data, setData] = useState<T>(props.default);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!loaded) {
      props.loader().then((d) => {
        setData(d);
        setLoaded(true);
      });
    }
  }, [loaded]);
  if (loaded) {
    return props.children(data);
  }
  return (<div className={style.loader}><Spin><InProgressIcon/></Spin></div>);
}
