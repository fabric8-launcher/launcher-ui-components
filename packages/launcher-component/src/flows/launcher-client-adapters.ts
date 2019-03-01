export function toNewAppPayload(app) {
  let parts: any[] = [];

  if (app.frontend.runtime) {
    parts.push({
      category: 'frontend',
      shared: {
        runtime: {name: app.frontend.runtime!.id, version: 'community'}
      },
      capabilities: [{
        module: 'web-app'
      }],
    });
  }

  if (app.backend.runtime) {
    parts.push({
      category: 'backend',
      shared: {
        runtime: {name: app.backend.runtime!.id, version: 'community'}
      },
      capabilities: app.backend.capabilities
        .filter(c => c.selected)
        .map(c => ({module: c.id, props: c.data}))
    });
  }

  if (parts.length > 1) {
    parts = [
      ...parts.map(p => ({...p, subFolderName: p.category})),
      {category: 'support', subFolderName: 'support', capabilities: {module: 'welcome-app'}}
    ];
  } else {
    parts[0].capabilities.push({module: 'welcome-app'});
  }

  return {
    project: {
      application: app.srcLocation.repository!.name,
      parts,
    },
    gitRepository: app.srcLocation.repository!.name,
    gitOrganization: app.srcLocation.repository!.org || '',
    clusterId: app.deployment.cluster.clusterId!,
    projectName: app.srcLocation.repository!.name,
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
      application: app.srcLocation.repository!.name,
      parts,
    },
    gitRepository: app.srcLocation.repository!.name,
    gitOrganization: app.srcLocation.repository!.org || '',
    clusterId: app.deployment.cluster.clusterId!,
    projectName: app.srcLocation.repository!.name,
  };
}

export function toImportAppPayload(app) {
  const parts: any[] = [];

  parts.push({
    category: 'import',
    shared: {
      buildImage: app.importApp.buildImage.imageName
    }
  });

  return {
    project: {
      application: app.srcLocation.repository!.name,
      parts,
    },
    gitRepository: app.importApp.repository!.name,
    gitOrganization: app.importApp.repository!.org || '',
    clusterId: app.deployment.cluster.clusterId!,
    projectName: app.importApp.repository!.name,
  };
}
