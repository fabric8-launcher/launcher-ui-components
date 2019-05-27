import { DependenciesPicker, EnumLoader, MavenSettingsPicker, DependencyItem, Separator } from 'launcher-component';
import * as React from 'react';

interface QuarkusFormProps { }

const validator = () => true;

interface Project {
    metadata: {
        groupId: string;
        artifactId: string;
        version: string;
        name?: string;
        description?: string;
        packageName?: string;
    }
    dependencies: string[];
}

export function QuarkusForm(props: QuarkusFormProps) {
    const [project, setProject] = React.useState<Project>({
        metadata: {
            groupId: 'com.example',
            artifactId: 'quarkus-project',
            version: 'latest',
            name: 'quarkus-project',
            description: 'My project with Quarkus',
            packageName: 'com.example.quarkus-project',
        },
        dependencies: [],
    });


    const setMetadata = (metadata: any) => setProject((prev) => ({ ...prev, metadata }));
    const setDependencies = (val: { dependencies: string[] }) => setProject((prev) => ({ ...prev, dependencies: val.dependencies }));
    return (
        <div className="quarkus-form-container">
            <MavenSettingsPicker.Element value={project.metadata} onChange={setMetadata} />
            <Separator />
            <EnumLoader name="quarkus-extensions">
                {extensions => (<DependenciesPicker.Element items={extensions as DependencyItem[]} value={{ dependencies: project.dependencies }} onChange={setDependencies} />)}
            </EnumLoader>
        </div>
    );
}