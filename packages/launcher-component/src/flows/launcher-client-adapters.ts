export function toNewAppPayload(app) {
  let parts: any[] = [];

  if (app.frontend.runtimePickerValue) {
    parts.push({
      category: 'frontend',
      shared: {
        runtime: {name: app.frontend.runtimePickerValue!.id, version: 'community'}
      },
      capabilities: [{
        module: 'web-app'
      }],
    });
  }

  if (app.backend.runtimePickerValue) {
    parts.push({
      category: 'backend',
      shared: {
        runtime: {name: app.backend.runtimePickerValue!.id, version: 'community'}
      },
      capabilities: app.backend.capabilities
        .filter(c => c.selected)
        .map(c => ({module: c.id, props: c.data}))
    });
  }

  if (parts.length > 1) {
    parts = [
      ...parts.map(p => ({...p, subFolderName: p.category})),
      {category: 'support', subFolderName: 'support', capabilities: [{module: 'welcome'}]}
    ];
  } else {
    parts[0].capabilities.push({module: 'welcome'});
  }

  return {
    project: {
      application: app.destRepository.userRepositoryPickerValue!.name,
      parts,
    },
    gitRepository: app.destRepository.userRepositoryPickerValue!.name,
    gitOrganization: app.destRepository.userRepositoryPickerValue!.org || '',
    clusterId: app.deployment.clusterPickerValue.clusterId!,
    projectName: app.destRepository.userRepositoryPickerValue!.name,
  };
}

export function toExamplePayload(app) {
  const parts: any[] = [];

  parts.push({
    category: 'example',
    shared: {
      mission: {id: app.example.missionId},
      runtime: {name: app.example.runtimeId, version: app.example.versionId}
    }
  });

  return {
    project: {
      application: app.destRepository.userRepositoryPickerValue!.name,
      parts,
    },
    gitRepository: app.destRepository.userRepositoryPickerValue!.name,
    gitOrganization: app.destRepository.userRepositoryPickerValue!.org || '',
    clusterId: app.deployment.clusterPickerValue.clusterId!,
    projectName: app.destRepository.userRepositoryPickerValue!.name,
  };
}

export function toImportAppPayload(app) {
  const parts: any[] = [];
  const url = app.srcRepository.gitUrlPickerValue.url;
  const name = url.substr(url.lastIndexOf('/') + 1);

  parts.push({
    category: 'import',
    shared: {},
    capabilities: [
      {
        module: 'import',
        props: {
          gitImportUrl: app.srcRepository.gitUrlPickerValue.url,
          builderImage: app.srcRepository.buildImagePickerValue.imageName,
        }
      }
    ]
  });

  return {
    project: {
      application: name,
      parts,
    },
    clusterId: app.deployment.clusterPickerValue.clusterId!,
    projectName: name,
  };
}
