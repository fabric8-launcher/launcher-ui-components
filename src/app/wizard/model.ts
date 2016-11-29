export class Gui {
    metadata: MetaData;
    state: State = new State();
    inputs: Input[];
    messages: Message[];
    results: Result[];
    stepIndex: number;
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
    value: any;
    valueType: string;
    valueChoices: string[];
    inputType: string;
    enabled: boolean;
    required: boolean;
    deprecated: boolean;
    class: string;
}

export class DownloadFile {
    filename: string;
    binary: Blob;
}

export class Result {
    message: string;
    status: string;
}

export class Message {
    constructor(desciption: string) {
        this.description = desciption;
    }
    description: string;
    input: string;
    severity: string;
    showError: boolean;
}

export enum Error {
    ERROR, WARN, INFO
}