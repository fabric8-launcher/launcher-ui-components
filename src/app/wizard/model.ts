
export class ProjectSettings {
    values: Object = {};
}

export class Gui {
    metadata: MetaData;
    state: State = new State();
    inputs: Input[];
    messages: Message[];
    results: Result[];
}

export class MetaData {
    category: string;
    name: string;
    description: string;
    deprecated: boolean;
}

export class State {
    valid: boolean;
    canExecute: boolean;
    canMoveToNextStep: boolean;
    canMoveToPreviousStep: boolean;
    wizard: boolean;
}

export class Input {
    name: string;
    shortName: string;
    label: string;
    valueType: string;
    valueChoices: string[];
    inputType: string;
    enabled: boolean;
    required: boolean;
    deprecated: boolean;
    class: string;
}

export class Result {
    message: string;
    status: string;
}

export class Message {
    description: string;
    input: string;
    severity: string;
    showError: boolean;
}

export enum Error {
    ERROR, WARN, INFO
}