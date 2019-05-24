import * as React from 'react';
import { MavenSettingsPicker } from 'launcher-component';

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
    return (
        <div className="quarkus-form-container">
            <MavenSettingsPicker.Element value={project.metadata} onChange={setMetadata} />
        </div>
    );
}