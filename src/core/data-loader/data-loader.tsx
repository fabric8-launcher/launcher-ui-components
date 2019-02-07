import {useEffect, useState} from "react";
import * as React from "react";
import {InProgressIcon} from "@patternfly/react-icons";
import * as style from './data-loader.module.scss';

export function DataLoader<T>(props: { loader: () => Promise<T>, default: T, children: any }) {
  const [data, setData] = useState<T>(props.default);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if(!loaded) {
      props.loader().then((d) => {
        setData(d);
        setLoaded(true);
      });
    }
  });
  if(loaded) {
    return props.children(data);
  }
  return (<div className={style.loader}><InProgressIcon/></div>);
}