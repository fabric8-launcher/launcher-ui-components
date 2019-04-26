import { Button, ButtonVariant } from '@patternfly/react-core';
import { ArrowAltCircleRightIcon, OutlinedCheckCircleIcon, LockIcon } from '@patternfly/react-icons';
import classNames from 'classnames';
import * as React from 'react';
import './wizard.scss';

export function WizardStepFooter(props: React.PropsWithChildren<{}>) {
  return (
    <div className="wizard-step-footer">
      {props.children}
    </div>
  );
}

interface WizardButtonProps {
  title?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function WizardButton({ title, onClick, disabled = false }: WizardButtonProps) {
  const text = title || 'Next';
  return (
    <Button className={'wizard-button'} aria-label={`${text} button`} onClick={onClick} isDisabled={disabled} variant={ButtonVariant.secondary}>
      <ArrowAltCircleRightIcon /> {text}
    </Button>
  );
};

interface WizardStepProps {
  title: string;
  completed?: boolean;
  summary?: string;
  selected?: boolean;
  locked?: boolean;
  onClick?: () => void;
}

export function WizardStep(props: React.PropsWithChildren<WizardStepProps>) {
  const { summary, title, completed = false, selected = false, locked = false, onClick, children } = props;
  const linkOnClick = locked || !onClick ? () => { } : () => onClick();
  const completedAndNotLocked = !locked && completed;
  let icon = (<OutlinedCheckCircleIcon style={{color: '#5cb85c'}} />);
  if(locked) {
    icon = (<LockIcon style={{color: '#bdc2ce'}}/>)
  }

  return (
    <li className={classNames({ completed: completedAndNotLocked, selected, locked })}>
      <a href="#" onClick={linkOnClick}>{title}
        {(completedAndNotLocked || locked) && icon}
      </a>
      {!locked && completed && !selected && summary && (
        <span className="summary">{summary}</span>
      )}
      {!locked && selected && (
        <span className="content">{children}</span>
      )}
    </li>
  );
}

export function Wizard(props: React.PropsWithChildren<{}>) {
  return (
    <div className="wizard">
      <ul>
        {props.children}
      </ul>
    </div>
  );
}
