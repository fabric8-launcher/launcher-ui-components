
export class ProjectSettings {

}

export class Gui {
    metadata: MetaData;
    state: State = new State();
    inputs: Input[];
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
    inputType: string;
    enabled: boolean;
    required: boolean;
    deprecated: boolean;
    class: string;
}