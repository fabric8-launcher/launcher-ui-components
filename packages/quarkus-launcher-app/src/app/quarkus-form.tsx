import { DependenciesPicker, EnumLoader, MavenSettingsPicker, DependencyItem, Separator } from 'launcher-component';
import React, { useState } from 'react';
import { Button } from '@patternfly/react-core';

interface QuarkusFormProps {
  onSave: (project: Project) => void;
}

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
  const [project, setProject] = useState<Project>({
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
      <div className="row">
        <div className="header">
          <h3>Project Metadata</h3>
        </div>
        <div className="form">
          <MavenSettingsPicker.Element value={project.metadata} onChange={setMetadata} />
        </div>
      </div>
      <div className="row">
        <div className="header"></div>
        <div className="form">
          <Separator />
        </div>
      </div>
      <div className="row">
        <div className="header">
          <h3>Extensions</h3>
        </div>
        <div className="form">
          <EnumLoader name="quarkus-extensions">
            {extensions => (
              <DependenciesPicker.Element items={extensions as DependencyItem[]} value={{ dependencies: project.dependencies }} onChange={setDependencies} />
            )}
          </EnumLoader>
        </div>
      </div>
      <div className="row footer">
        <div className="header"></div>
        <div className="form">
          <Button onClick={() => props.onSave(project)}>Generate Project - alt + ⏎</Button>
        </div>
      </div>
    </div>
  );
}