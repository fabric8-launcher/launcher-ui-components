import { Button } from '@patternfly/react-core';
import * as React from 'react';
import { ReactNode } from 'react';
import './HttpRequest.scss';
import ShellCommand from './ShellCommand';

interface HttpRequestProps {
  readonly method: string;
  readonly name?: string;
  readonly path: string;
  readonly curlCommand?: string;
  readonly children?: ReactNode;

  onExecute(): Promise<any>;
}

const HttpRequest: React.SFC<HttpRequestProps> = ({method, name, path, curlCommand, children, onExecute}: HttpRequestProps) => {
  const title = `Execute ${(name || 'the request')}`;
  const safeExecute = () => {
    onExecute().catch(e => console.error('Unhandled error', e));
  };
  return (
    <div className={`http-request method-${method.toLowerCase()}`}>
      <div className="definition">
        <div className="http-request-def">
          <span className="http-request-method">{method}</span> <span className="http-request-path">{path}</span>
          {children}
          {curlCommand && (<ShellCommand onlyButton={true} buttonText="Copy as curl" command={curlCommand}/>)}
        </div>
      </div>
      <div className="action">
        <Button
          className={'http-request-button'}
          onClick={safeExecute}
          title={title}
          aria-label={title}
        >
          Execute
        </Button>
      </div>
    </div>
  );
};

export default HttpRequest;
