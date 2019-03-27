import { Alert, AlertVariant, Button, ButtonProps, Modal, ModalProps, Title } from '@patternfly/react-core';
import * as React from 'react';

import style from './stuff.module.scss';

export function optionalBool(val: (boolean | undefined), defaultValue: boolean): boolean {
  return val === undefined ? defaultValue : val!;
}

export function Separator() {
  return (
    <hr className={style.separator}/>
  );
}

export function ButtonLink(props: ButtonProps) {
  // @ts-ignore
  return (<Button component="a" {...props} />);
}

export function DescriptiveHeader(props: { title?: string, description: string }) {
  return (
    <div className={style.descriptiveHeader}>
      {props.title && (<Title size="lg">{props.title}</Title>)}
      <p>{props.description}</p>
    </div>
  );
}

export function SpecialValue(props: { children: string }) {
  return (
    <span className={style.specialValue}>{props.children}</span>
  );
}

export function AlertError(props: { error: any }) {
  return (
    <Alert variant={AlertVariant.danger} title="Something weird happened:" aria-label="error-in-hub-n-spoke" style={{margin: '40px'}}>
      {props.error.message || props.error.toString()}
    </Alert>
  );
}

export class FixedModal extends React.Component<ModalProps> {

  public componentWillUnmount(): void {
    document.body.classList.remove('pf-c-backdrop__open');
  }

  public render() {
    return <Modal {...this.props} />;
  }
}
