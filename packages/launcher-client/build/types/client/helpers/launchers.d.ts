import { Enums, FieldProperty, Example, Catalog, ExampleMission, ExampleRuntime } from '../types';
export declare function fillPropsValuesWithEnums(propsContainer: {
    props?: FieldProperty[];
}, enums: Enums): any;
export declare function propsWithValuesMapper(enums: Enums): (c: {
    props?: FieldProperty[] | undefined;
}) => any;
export declare function filterExample(query: any, catalog: Catalog): Example[];
export declare function filterExampleMission(query: any, catalog: Catalog): ExampleMission[];
export declare function filterExampleRuntime(query: any, catalog: Catalog): ExampleRuntime[];
export declare function filter(query: any, catalog: Catalog): Example[] | ExampleMission[] | ExampleRuntime[];
export declare function filterExamples(examples: Example[], cluster?: string, missionId?: string, runtimeId?: string, versionId?: string): Example[];
