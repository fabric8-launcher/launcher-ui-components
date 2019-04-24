import * as React from 'react';
import { Console } from './Console';
import moment from 'moment';
// @ts-ignore
import JSONPretty from 'react-json-pretty';

import 'react-json-pretty/themes/monikai.css';

export interface RequestConsoleEntry {
  time: number;
  url: string;
  method: string;
  content?: any;
  error?: string;
}
type RequestMethod = 'GET' | 'POST' | 'DELETE' | 'PUT';
interface RequestResult { content?: any; time: number; error?: string; }
export type addResultFn = (type: RequestMethod, url: string, result: RequestResult) => void;

export function useConsoleState(): [RequestConsoleEntry[], addResultFn] {
  const [results, setResults] = React.useState<RequestConsoleEntry[]>([]);
  const addResult = (type: RequestMethod, url: string, result: RequestResult) => {
    setResults((prev) => [...prev, {
      method: type,
      ...result,
      url,
    }]);
  };
  return [results, addResult];
}

export function RequestConsole(props: { name: string, results: RequestConsoleEntry[] }) {

  const res = props.results.map((r, i) => (
    <React.Fragment key={i}>
      <div>
        <span className="prefix">$</span>&nbsp;
        <span className="time">{moment(r.time).format('LTS')}</span>&nbsp;
        <span className={`method method-${r.method.toLowerCase()}`}>{r.method}</span>&nbsp;
        <span className="url">{r.url}</span>:
      </div>
      {!r.error ? (
        <div aria-label={JSON.stringify(r.content!)}>
          {(typeof r.content! === 'string') ? r.content! : <JSONPretty json={r.content!} />}
        </div>
      ) : (
          <div className="error">{r.error}</div>
        )}
    </React.Fragment>
  ));

  return (
    <Console name={props.name} content={res} />
  );
}
