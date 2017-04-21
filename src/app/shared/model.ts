export class Gui {
    metadata: MetaData;
    state: State = new State();
    inputs: SubmittableInput[];
    private _messages: Message[];
    results: Result[];
    stepIndex: number;

    get messages(): Message[] {
        if (!this._messages) {
            this._messages = [];
        }
        return this._messages;
    }
    set messages(messages: Message[]) {
        this._messages = messages;
    }
}

export class History {
    private state: Gui[] = [];

    add(gui: Gui) {
      this.state.push(gui);
      gui.stepIndex = this.stepIndex;
    }

    apply(state: string) {
        if (state) {
            let submittableGui = JSON.parse(atob(state));
            for (let input of submittableGui.inputs) {
                for (let gui of this.state) {
                    for (let guiInput of gui.inputs) {
                        if (guiInput.name == input.name) {
                            guiInput.value = input.value;
                        }
                    }
                }
            }
        }
    }

    get(index: number): Gui {
        return this.state[index - 1];
    }

    currentGui(): Gui {
        let gui = this.state[this.stepIndex - 1];
        return gui || new Gui();
    }

    get stepIndex(): number {
        return Math.max(0, this.state.length);
    }

    resetTo(index: number) {
        this.state.splice(--index, this.state.length);
    }

    convert(stepIndex = this.stepIndex - 1): Gui {
        let submittableGui = new Gui();
        submittableGui.stepIndex = stepIndex;
        submittableGui.inputs = [];
        for (let gui of this.state) {
            let inputs = gui.inputs;
            if (inputs) {
                let submittableInputs = this.convertToSubmittable(inputs as Input[]);
                submittableGui.inputs = submittableGui.inputs.concat(submittableInputs);
            }
        }
        return submittableGui;
    }

    private convertToSubmittable(inputs: Input[]): SubmittableInput[] {
        let array: SubmittableInput[] = [];
        if (inputs) {
            for (let input of inputs) {
                array.push(new SubmittableInput(input));
            }
        }
        return array;
    }

    toString(): string {
        return btoa(JSON.stringify(this.convert()));
    }
}

export class MetaData {
    category: string;
    name: string;
    description: string;
    deprecated: boolean;
    intro: string;
}

export class State {
    valid: boolean;
    canExecute: boolean;
    canMoveToNextStep: boolean;
    canMoveToPreviousStep: boolean;
    wizard: boolean;
    steps: string[];
}

export class SubmittableInput {
    name: string;
    value: any;

    constructor(input: SubmittableInput) {
        this.name = input.name;
        this.value = input.value;
    }
}

export class Input extends SubmittableInput {
    shortName: string;
    label: string;
    valueType: string;
    valueChoices: Option[];
    inputType: string;
    enabled: boolean;
    required: boolean;
    deprecated: boolean;
    class: string;
}

export class Option {
    id: string;
    description: string;
    name: string;
}

export class DownloadFile {
    filename: string;
    binary: Blob;
}

export class Result {
    message: string;
    status: string;

    constructor(message: string) {
        this.message = message;
    }
}

export class StatusResult {
    uuid_link: string;
}

export class StatusEvent {
    messageKey: string;
    data: Map<string, any>;
}

export class StatusMessage {
    messageKey: string;
    message: string;
    data: Map<string, any>;
    done: boolean;

    constructor(messageKey: string, message: string) {
        this.messageKey = messageKey;
        this.message = message;
    }
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

export class Version {
    forgeVersion: string;
    backendVersion: string;
}

export enum Error {
    ERROR, WARN, INFO
}